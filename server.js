const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
const path = require("path");
const debug = process.env.NODE_ENV !== "production";
const io = require("socket.io")(server);
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const EventEmitter = require("events");
const nodemailer = require("nodemailer");

const Schema = mongoose.Schema;
const _ = require("lodash");
class Event extends EventEmitter {}
let mode = false;

const dbCheck = new Event();
dbCheck.setMaxListeners(2000000);
function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
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
let notifications = [];
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
app.use(express.static(path.resolve(__dirname, "dist")));

let config = require("./config.json");
let { dburl, email: emailid, password } = config;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailid,
    pass: password
  }
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
    notifications: Array,
    details: {
      name: String,
      regNo: String,
      dob: Date,
      gender: String,
      department: String,
      students: Array,
      problems: Array
    }
  }),
  "UserDetails"
);
let Category = mongoose.model(
  "Category",
  new Schema({
    _id: Number,
    name: String,
    topics: Array,
    notified: Boolean
  }),
  "Category"
);
db.on("notify", name => {
  UserDetails.find((err, accounts) => {
    accounts.map(account => {
      if ([0, 4].includes(account.level)) {
        if (
          account.notifications == undefined ||
          account.notifications.length == 0
        ) {
          account.notifications = notifications;
        }
        if (_.find(account.notifications, { name: name }) == undefined) {
          account.notifications.push({ name: name, unread: true });
        }
        if (_.find(notifications, { name: name }) == undefined) {
          notifications.push({ name: name, unread: true });
        }
        console.log(account.notifications);
        account.markModified("notifications");
        account.save(err => {
          if (!err) {
            dbCheck.emit("change", account._id);
          }
        });
      }
    });
  });
});
let validateLogin = (acc, content, e) => {
  if (acc != null) {
    bcrypt.compare(content.pass, acc.password, function(err, res) {
      if (res) {
        e.emit("success", acc);
      } else {
        e.emit("fail", "np");
      }
    });
  } else {
    e.emit("fail", "nu");
  }
};
db.on("open", () => {
  console.log("connected to database");

  dbconnect = true;
});
let resetArray = [];
io.on("connection", socket => {
  let loggedIn = false,
    level = 0,
    account = { _id: "" };
  socket.emit("mode", mode);

  dbCheck.on("change", idlist => {
    if (idlist.includes(account._id)) {
      UserDetails.findById(account._id, (err, details) => {
        socket.emit("changeDetails", {
          details: details
        });
        if (account.level == 0) {
          Users.findById(account._id, (err, newacc) => {
            socket.emit("q", newacc.questions);
          });
        }
      });
    }
  });

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
      account = acc;
      console.log("login success");

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
          socket.on("categoryNotify", c => {
            console.log(c);
            Category.findById(c._id, (err, cate) => {
              console.log(cate);
              cate.notified = true;
              cate.save(err => {
                Category.find()
                  .sort({ $natural: 1 })
                  .exec((err, cats) => {
                    socket.emit("categories", cats);
                    db.emit("notify", cate.name);
                  });
              });
            });
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
          socket.on("updateNoti", det => {
            details.notifications = det.notifications;
            details.markModified("notifications");
            details.save(err => {
              dbCheck.emit("change", acc._id);
            });
          });
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
                  if (acc.questions == undefined) {
                    acc.questions = {};
                  }
                  acc.questions[cat] = {
                    a: false,
                    q: [],
                    cid: cid,
                    pid: fac._id
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
            console.log(acc.questions[cat].pid);
            acc.markModified("questions");
            acc.save(err => {
              if (!err) {
                socket.emit("q", acc.questions);
                dbCheck.emit("change", [acc.questions[cat].pid]);
              }
            });
          });
          socket.on("addProblem", report => {
            let { cat, n, pid, sid, name, desc } = report;
            UserDetails.findById(pid, (err, fac) => {
              if (fac.details.problems == undefined) {
                fac.details.problems = [];
              }
              fac.details.problems.push(report);
              fac.markModified("details");
              fac.save(err => {
                if (!err) {
                  console.log("problem added");
                  dbCheck.emit("change", [pid]);
                }
              });
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
                        if (count > 100) {
                          while (q.length < 100) {
                            var r = Math.floor(Math.random() * count);
                            if (q.indexOf(r) === -1) q.push(r);
                          }
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
      bcrypt.hash(r.password, 10, function(err, hash) {
        if (!mode) {
          user = new Users({
            _id: r.regNo,
            email: r.email,
            password: hash,
            type: "Student",
            questions: {},
            level: 0
          });
          details = new UserDetails({
            _id: r.regNo,
            level: 0,
            details: {
              name: r.name,
              regNo: r.regNo,
              department: r.branch
            }
          });
        } else {
          user = new Users({
            _id: r.regNo,
            email: r.email,
            password: hash,
            type: "Faculty",
            level: 4
          });
          details = new UserDetails({
            _id: r.regNo,
            level: 4,
            details: {
              name: r.name,
              regNo: r.regNo,
              department: r.branch,
              students: []
            }
          });
        }
        details.save();
        user.save();
      });
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
                    topics: [],
                    notified: false
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
                    topics: [],
                    notified: false
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
  socket.on("forgot", details => {
    console.log(details);
    let fid = "/reset/" + makeid();
    resetArray.push(fid);
    let email = details.email;
    transporter.sendMail({
      from: emailid,
      to: email,
      subject: "eSkill Password Reset",
      html: `<p>In Order to reset the password, please click the link below: </p><p><a href="http://localhost:5000${fid}">Reset Password</a></p>`
    });
    console.log(fid);
    setTimeout(() => {
      resetArray = resetArray.filter(k => k != fid);
    }, 1800000);
    app.get(fid, (req, res) => {
      res.sendFile(path.resolve(__dirname, "forgot", "index.html"));
    });
    app.post(fid, (req, res) => {
      console.log(req.body.p);
      Users.findOne({ email: email }, (err, resetacc) => {
        bcrypt.hash(req.body.p, 10, function(err, hash) {
          console.log(req.body.p);
          resetacc.password = hash;
          resetArray = resetArray.filter(k => k != fid);
          resetacc.save();
        });
      });
    });
  });
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

app.use(express.static("forgot"));
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
  UserDetails.find(
    { "details.department": `${branch}`, level: 4 },
    (err, fac) => {
      res.json(fac);
    }
  );
});
app.get("*", (req, res, next) => {
  if (resetArray.includes(req.url)) {
    next();
  } else {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  }
});
server.listen(5000, () => {
  console.log("Listening on 5000");
});
