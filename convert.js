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
const dburl = "mongodb://test:test@ds135537.mlab.com:35537/eapproval";
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
let validateLogin = (acc, content, e) => {
  console.log(content);
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
  csv()
    .fromFile("./qsimport-template.csv")
    .then(jsonObj => {
      jsonObj.map((k, i) => {
        console.log(i);
        let obj = {
          category: {
            _id: 1,
            name: "Category 1"
          },
          label: [],
          topic: {
            _id: "101",
            name: "asd"
          },
          number: i,
          answer: k.Answer,
          options: {
            a: k["Option A"],
            b: k["Option B"],
            c: k["Option C"],
            d: k["Option D"]
          },
          qname: k["Question Name"],
          qdef: k.Question,
          hints: k["Explanation"]
        };
        let q = new Questions(obj);
        q.save();
      });
      /**
       * [
       * 	{a:"1", b:"2", c:"3"},
       * 	{a:"4", b:"5". c:"6"}
       * ]
       */
    });
});
