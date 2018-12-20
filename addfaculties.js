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
const _ = require("lodash");
const dburl = require("./config.json").dburl;
const csv = require("csvtojson");
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
    level: Number
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
let branches = [
  "Computer Science and Engineering",
  "Electronics and Communications Engineering",
  "Mechanical Engineering",
  "Electrical and Electronics Engineering",
  "Information Technology",
  "Civil Engineering"
];
let abbr = ["CSE", "ECE", "MECH", "EEE", "IT", "CIVIL"];
let colleges = {
  "SRM Ramapuram": { id: "40000", a: "RMP" },
  "SRM NCR": { id: "50000", a: "NCR" },
  "SRM Amaravathi": { id: "60000", a: "AMR" }
};
db.on("open", () => {
  console.log("connected to database");
  UserDetails.find({ "details.branch": { $exists: false } }, (err, users) => {
    users.map(user => {
      switch (user._id.slice(0, 1)) {
        case 4:
          user.details.branch = "SRM Ramapuram";
          break;
        case 5:
          user.details.branch = "SRM NCR";
          break;
        case 6:
          user.details.branch = "SRM Amaravathi";
          break;
      }
      user.markModified("details");
      user.save(err => {
        console.log(user._id.slice(0, 1), user.details.branch);
      });
    });
  });
});
