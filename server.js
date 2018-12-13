const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
const path = require("path");
const debug = process.env.NODE_ENV !== "production";
const io = require("socket.io")(server);
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const EventEmitter = require("events");
const Schema = mongoose.Schema;
const _ = require("lodash");
class Event extends EventEmitter {}
let mode = false;
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
let dbconnect = false;
academicYear = getAcademicYear();
console.log(academicYear);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static(path.resolve(__dirname, "build")));

const dburl = "mongodb://test:test@ds135537.mlab.com:35537/eapproval";

const port_number = process.env.PORT || 2000;

server.listen(port_number, () => {
  console.log("Listening on 2000");
});

mongoose.connect(
  dburl,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

let Users = mongoose.model(
  "Users",
  new Schema({
    _id: String,
    email: String,
    password: String,
    type: String,
    level: Number,
    questions: Object
  }),
  "Users"
);
let Label = mongoose.model(
  "Label",
  new Schema({
    _id: String,
    name: String
  })
);
let Tags = mongoose.model(
  "Tags",
  new Schema({
    group: String,
    name: String
  }),
  "Tags"
);
let Questions = mongoose.model(
  "Questions",
  new Schema({
    category: Object,
    label: Array,
    topic: Object,
    answer: String,
    options: Object,
    qname: String,
    qdef: String,
    hints: String,
    number: Number
  }),
  "Questions"
);
let UserDetails = mongoose.model(
  "UserDetails",
  new Schema({
    _id: String,
    level: Number,
    details: {
      name: String,
      regNo: String,
      dob: Date,
      gender: String,
      department: String,
      students: Array
    }
  }),
  "UserDetails"
);
let Category = mongoose.model(
  "Category",
  new Schema({
    _id: Number,
    name: String,
    topics: Array
  }),
  "Category"
);
let validateLogin = (acc, content, e) => {
  if (acc != null) {
    if (acc.password == content.pass) {
      e.emit("success", acc);
    } else {
      e.emit("fail", "np");
    }
  } else {
    e.emit("fail", "nu");
  }
};
db.on("open", () => {
  console.log("connected to database");

  dbconnect = true;
});
app.post("/api/student", (req, res) => {
  let { sid, cat } = req.body;
  Users.findById(sid, (err, student) => {
    let { questions } = student;
    let q = {};

    let at = 0,
      cm = 0;
    questions[cat].q.map(qa => {
      if (qa.a > 0) {
        at++;
        if (qa.a < 3) {
          cm++;
        }
      }
    });
    q.a = at;
    q.c = cm;

    res.json(q);
  });
});
app.post("/api/question", (req, res) => {
  let { n, cat } = req.body;
  if (dbconnect) {
    Questions.findOne({ "category.name": cat, number: n }, (err, q) => {
      if (!err) {
        res.json({ question: q, err: false });
      } else {
        res.json({ err: true });
      }
    });
  }
});

app.post("/api/faculty", (req, res) => {
  let { branch } = req.body;
  console.log("faculty requested");
  UserDetails.find({ "details.branch": branch, level: 4 }, (err, fac) => {
    res.json(fac);
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
io.on("connection", socket => {
  let loggedIn = false,
    level = 0;
  socket.emit("mode", mode);
  console.log("user connected");
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
      dbCheck.on("change", idlist => {
        console.log("reemit");
        if (idlist.includes(acc._id)) {
          UserDetails.findById(acc._id, (err, details) => {
            socket.emit("changeDetails", {
              details: details
            });
            if (acc.level == 0) {
              Users.findById(acc._id, (err, newacc) => {
                socket.emit("q", newacc.questions);
              });
            }
          });
        }
      });
      loggedIn = true;
      UserDetails.findById(acc._id, (err, details) => {
        socket.emit("validateLogin", {
          validate: true,
          details: details,
          level: acc.level,
          type: acc.type
        });

        level = acc.level;
        if (level == 2) {
          socket.on("changeMode", checked => {
            mode = !mode;
            console.log("mode changed");
            socket.emit("mode", mode);
          });
        }
        Category.find()
          .sort({ $natural: 1 })
          .exec((err, cats) => {
            socket.emit("categories", cats);
          });
        Tags.find().exec((err, tags) => {
          socket.emit("tags", tags);
        });

        if (level == 0) {
          socket.emit("q", acc.questions);
          socket.on("requestCourse", det => {
            let { cat, faculty: pid, student: sid, cid } = det;
            UserDetails.findOne({ _id: pid }, (err, fac) => {
              if (
                _.find(fac.details.students, { _id: sid, cat: cat }) ==
                undefined
              ) {
                fac.details.students.push({
                  cat: cat,
                  _id: sid,
                  a: false,
                  name: details.details.name
                });
                fac.markModified("details");
                fac.save(err => {
                  acc.questions[cat] = {
                    a: false,
                    q: [],
                    cid: cid
                  };
                  acc.markModified("questions");
                  acc.save(err => {
                    socket.emit("q", acc.questions);
                    dbCheck.emit("change", [sid, pid]);
                  });
                });
              }
            });
          });
          socket.on("changeQuestion", opts => {
            let [q, cat] = opts;
            acc.questions[cat] = q;
            console.log("questions changed");
            acc.markModified("questions");
            acc.save(err => {
              if (!err) {
                socket.emit("q", acc.questions);
              }
            });
          });
        }
        if (level == 4) {
          socket.on("acceptCourse", ([user, cat, action, d]) => {
            console.log(user, action, d, cat);
            details.details = d.details;
            details.markModified("details");
            details.save(err => {
              if (!err) {
                dbCheck.emit("change", [acc._id]);
                console.log("details saved");
                Users.findOne({ _id: user }, (err, student) => {
                  if (!err && action === true && student != null) {
                    student.questions[cat].a = true;
                    let q = [],
                      count = 0;
                    Questions.countDocuments(
                      { "category.name": cat },
                      (err, c) => {
                        count = c;
                        while (q.length < 100) {
                          var r = Math.floor(Math.random() * count);
                          if (q.indexOf(r) === -1) q.push(r);
                        }

                        student.questions[cat].q = q.map(k => {
                          return { n: k, a: 0 };
                        });
                        student.markModified("questions");
                        student.save(err => {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("saved");

                            dbCheck.emit("change", [student._id]);
                          }
                        });
                      }
                    );
                  } else if (!err && student != null) {
                    student.questions[cat].a = "rejected";
                    student.markModified("questions");
                    student.save(err => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("saved");
                        dbCheck.emit("change", [student._id]);
                      }
                    });
                  }
                });
              } else {
                console.log(err);
              }
            });
          });
        }
      });
    });
    loginCheck.on("fail", reason => {
      console.log(reason);
      socket.emit("fail", reason);
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
      let user, details;
      if (!mode) {
        user = new Users({
          _id: r.regNo,
          email: r.email,
          password: r.password,
          type: "Student",
          questions: {},
          level: 0
        });
        details = new UserDetails({
          _id: r.regNo,
          details: {
            name: r.name,
            regNo: r.regNo,
            dob: r.dob,
            gender: r.gender,
            department: r.branch
          }
        });
      } else {
        user = new Users({
          _id: r.regNo,
          email: r.email,
          password: r.password,
          type: "Faculty",
          level: 4
        });
        details = new UserDetails({
          _id: r.regNo,
          details: {
            name: r.name,
            regNo: r.regNo,
            dob: r.dob,
            gender: r.gender,
            department: r.branch,
            students: []
          }
        });
      }

      details.save();
      user.save();
    });
  });
  socket.on("addCategory", cat => {
    if (loggedIn && level == 2) {
      console.log("new category details:", cat);
      Category.findOne(
        {
          name: {
            $regex: new RegExp(`(${cat})\\b`, "gi")
          }
        },
        (err, presentCat) => {
          console.log(presentCat);
          if (presentCat == null) {
            socket.emit("catError", "");
            Category.find()
              .sort({ $natural: -1 })
              .limit(1)
              .exec((err, el) => {
                console.log(el);
                if (el.length == 0) {
                  let newCat = new Category({
                    _id: 1,
                    name: `${cat}`,
                    topics: []
                  });
                  newCat.save(err => {
                    if (err == null) {
                      socket.emit("success", "category");
                      Category.find()
                        .sort({ $natural: 1 })
                        .exec((err, cats) => {
                          socket.emit("categories", cats);
                        });
                    } else {
                      console.log(err);
                    }
                  });
                } else {
                  let id = parseInt(el[0]._id);
                  id++;
                  let newCat = new Category({
                    _id: id,
                    name: `${cat}`,
                    topics: []
                  });
                  console.log(newCat);
                  newCat.save(err => {
                    if (err == null) {
                      socket.emit("success", "category");
                      Category.find()
                        .sort({ $natural: 1 })
                        .exec((err, cats) => {
                          socket.emit("categories", cats);
                        });
                    } else {
                      console.log(err);
                    }
                  });
                }
              });
          } else {
            socket.emit("catError", "Category already exists!");
            console.log("exists");
          }
        }
      );
    }
  });
  socket.on("addTag", info => {
    if (loggedIn && level == 2) {
      Tags.findOne(
        {
          name: {
            $regex: new RegExp(`(${info.name})\\b`, "gi")
          }
        },
        (err, presentTag) => {
          if (presentTag == null) {
            socket.emit("tagError", "");
            let tag = new Tags({
              name: info.name,
              group: info.group
            });
            tag.save(err => {
              if (err == null) {
                socket.emit("success", "tag");
                Tags.find().exec((err, tags) => {
                  socket.emit("tags", tags);
                });
              }
            });
          } else {
            socket.emit("tagError", "Tag already Exists!");
          }
        }
      );
    }
  });
  socket.on("addTopic", info => {
    if (loggedIn && level == 2) {
      Category.findOne(
        {
          name: {
            $regex: new RegExp(`(${info.category})\\b`, "gi")
          }
        },
        (err, cat) => {
          if (_.findIndex(cat.topics, { name: info.topic }) == -1) {
            cat.topics.push({
              id: `${cat._id * 100 + cat.topics.length + 1}`,
              name: info.topic
            });
            cat.markModified("topics");
            cat.save((err, sct) => {
              console.log(sct);
              socket.emit("success", "topic");
              Category.find()
                .sort({ $natural: 1 })
                .exec((err, cats) => {
                  socket.emit("categories", cats);
                });
            });
          } else {
            socket.emit("topError", "Topic already exists!");
            console.log("exists");
          }
        }
      );
    }
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.on("addQuestion", q => {
    console.log(q);
    let question = new Questions({
      category: q.category,
      qname: q.qname,
      qdef: q.qdef,
      options: q.options,
      answer: q.answer,
      hints: q.hints,
      topic: q.topic
    });
    question.save(err => {
      if (err == null) {
        socket.emit("added", "success");
      } else {
        socket.emit("added", "error");
      }
    });
  });
});
