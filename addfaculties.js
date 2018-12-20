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
      problems: Array,
      branch: String
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
      if (user._id.slice(0, 1) == "4") {
        user.details.branch = "SRM Ramapuram";
      } else if (user._id.slice(0, 1) == "5") {
        user.details.branch = "SRM NCR";
      } else if (user._id.slice(0, 1) == "6") {
        user.details.branch = "SRM Amaravathi";
      }
      user.markModified("details");
      user.save(err => {
        console.log(user._id.slice(0, 1), user.details.branch);
      });
    });
  });
});
