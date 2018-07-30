const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
const path = require("path");
const debug = process.env.NODE_ENV !== "production";
const io = require("socket.io")(server);
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const EventEmitter = require("events");
const Schema = mongoose.Schema;

class Event extends EventEmitter {}
const dbCheck = new Event();
let validateEmail = email => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
let getAcademicYear = () => {
  let academicYear;
  if (new Date().getMonth + 1 < 7) {
    academicYear = `${new Date().getFullYear() -
      1} - ${new Date().getFullYear()}`;
  } else {
    academicYear = `${new Date().getFullYear()} - ${new Date().getFullYear() +
      1}`;
  }
  return academicYear;
};
academicYear = getAcademicYear();
console.log(academicYear);
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const dburl = "mongodb://test:test@ds135537.mlab.com:35537/eapproval";

const port_number = process.env.PORT || 2000;

server.listen(port_number, () => {
  console.log("Listening on 2000");
});

mongoose.connect(dburl);

let db = mongoose.connection;

let Users = mongoose.model(
  "Users",
  new Schema({
    _id: String,
    email: String,
    password: String,
    type: String,
    level: Number
  }),
  "Users"
);
let UserDetails = mongoose.model(
  "UserDetails",
  new Schema({
    _id: String,
    details: {
      name: String,
      regNo: String,
      mothersName: String,
      fathersName: String,
      dob: Date,
      gender: String,
      dateOfAdmission: Date,
      aadhar: String,
      passport: String,
      religion: String,
      lang: String,
      deg: String,
      department: String,
      courseDuration: String,
      currentYear: String,
      academicYear: String
    },
    faculties: {
      incharge: {
        name: String,
        id: String
      },
      hod: {
        name: String,
        id: String
      },
      acc: {
        name: String,
        id: String
      },
      dean: {
        name: String,
        id: String
      },
      dir: {
        name: String,
        id: String
      },
      coe: {
        name: String,
        id: String
      }
    },
    students: [String],
    docID: {
      BTL: Number,
      BTH: Number,
      BEL: Number,
      BEH: Number,
      BAB: Number,
      BVA: Number,
      BTC: Number,
      BAP: Number,
      BLB: Number,
      BPV: Number,
      BSA: Number,
      BCE: Number,
      CTC: Number,
      CCC: Number,
      CNO: Number,
      CMI: Number,
      CFP: Number,
      CNA: Number,
      CNS: Number,
      FCE: Number,
      CMQ: Number,
      CSC: Number,
      CVL: Number
    }
  }),
  "UserDetails"
);

let Reports = mongoose.model(
  "Reports",
  new Schema({
    _id: String,
    from: String,
    to: [String],
    name: String,
    status: [Number],
    date: Date,
    content: [String]
  }),
  "Reports"
);
let SampReports = mongoose.model(
  "StudentReports",
  new Schema({
    _id: String,
    documents: [
      {
        name: String,
        status: Number,
        date: Date
      }
    ]
  }),
  "StudentReports"
);
let validateLogin = (acc, content, e) => {
  console.log(content);
  if (acc != null) {
    if (acc.password == content.pass) {
      e.emit("success", acc);
    }
  }
};
db.on("open", () => {
  console.log("connected to database");
});
io.on("connection", socket => {
  console.log('user connected');
  const loginCheck = new Event();
  let isLoggedIn = false;
  socket.on("det", content => {
    console.log("details recieved");
    if (validateEmail(content.email)) {
      Users.findOne({ email: content.email }, (err, acc) => {
        validateLogin(acc, content, loginCheck);
      });
    } else {
      Users.findById(content.email, (err, acc) => {
        validateLogin(acc, content, loginCheck);
      });
    }
    loginCheck.on("success", acc => {
      console.log("login success");
      UserDetails.findById(acc._id, (err, details) => {
        socket.emit("validateLogin", {
          validate: true,
          details: details,
          level: acc.level,
          type: acc.type
        });
      });
      Reports.find(
        { $or: [{ from: acc._id }, { to: { $in: [acc._id] } }] },
        (err, docs) => {
          socket.emit("docs", [docs, acc._id]);
        }
      );
      dbCheck.on("new", () => {
        Reports.find(
          { $or: [{ from: acc._id }, { to: { $in: [acc._id] } }] },
          (err, docs) => {
            socket.emit("docs", [docs, acc._id]);
          }
        );
      });

      socket.on("approval", a => {
        Reports.findOne({ _id: a.id }, (err, report) => {
          console.log(a);
          if (a.action == 0) {
            report.status.map((d, k) => {
              k > a.cl ? (d = 0) : null;
            });
          } else {
            !a.exe ? report.to.push(a.to) : null;
          }
          report.status[a.cl] = a.action;
          report.markModified("status");
          report.save((err, rep) => {
            dbCheck.emit("new");
          });
        });
        //loginCheck.emit('success', acc)
      });
      socket.on("add", a => {
        Reports.count({ _id: a.certNo }, (err, count) => {
          if (count > 0) {
            // Already exists
          } else {
            console.log(a);
            Reports.create(
              {
                _id: a.certNo,
                from: a.from,
                to: a.to,
                name: a.type,
                status: a.status,
                date: new Date(),
                content: a.fields
              },
              (err, report) => {
                UserDetails.findById(acc._id, (err, details) => {
                  details.docID[a.type]++;
                  console.log(details.docID);
                  details.markModified("docID");
                  details.save((err, det) => {
                    loginCheck.emit("success", acc);
                    dbCheck.emit("new");
                  });
                });
              }
            );
          }
        });
      });
    });
  });
  socket.on("reg", r => {
    console.log(r);
    Users.findOne({ email: r.email }, (err, acc) => {
      if (acc == null) {
        Users.findById(r.email, (err, accid) => {
          if (accid == null) {
            loginCheck.emit("canRegister");
          }
        });
      }
    });
    loginCheck.on("canRegister", () => {
      let user = new Users({
        _id: r.regNo,
        email: r.email,
        password: r.password,
        type: "Student",
        level: 0
      });
      let details = new UserDetails({
        _id: r.regNo,
        details: {
          name: r.name,
          regNo: r.regNo,
          mothersName: r.mothersName,
          fathersName: r.fathersName,
          dob: r.dob,
          gender: r.gender,
          dateOfAdmission: r.doa,
          aadhar: r.aadhar,
          passport: r.passport,
          religion: r.nationality,
          lang: r.medium,
          deg: r.deg,
          department: r.branch,
          courseDuration: r.courseDuration,
          currentYear: r.currentYear,
          academicYear: academicYear
        },
        faculties: {
          incharge: {
            name: "Dr. Admin Admin",
            id: "213213213"
          },
          hod: {
            name: "Dr. B",
            id: "214214214"
          },
          acc: {
            name: "Accounts Dept.",
            id: "215215215"
          },
          dean: {
            name: "Dr. Dean",
            id: "216216216"
          },
          dir: {
            name: "Dr. Director",
            id: "217217217"
          },
          coe: {
            name: "Dr. Controller",
            id: "218218218"
          }
        },
        students: [],
        docID: {
          BTL: 0001,
          BTH: 0001,
          BEL: 0001,
          BEH: 0001,
          BAB: 0001,
          BVA: 0001,
          BTC: 0001,
          BAP: 0001,
          BLB: 0001,
          BPV: 0001,
          BSA: 0001,
          BCE: 0001,
          CTC: 0001,
          CCC: 0001,
          CNO: 0001,
          CMI: 0001,
          CFP: 0001,
          CNA: 0001,
          CNS: 0001,
          FCE: 0001,
          CMQ: 0001,
          CSC: 0001,
          CVL: 0001
        }
      });
      details.save();
      user.save();
    });
  });
});
