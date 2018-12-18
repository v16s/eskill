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
// mongoose.connect(
//   dburl,
//   { useNewUrlParser: true }
// );

//let db = mongoose.connection;

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
const fs = require("fs");

db.on("open", () => {
  console.log("connected to database");
  fs.readdir("./questions", (err, files) => {
    files.map(file => {
      let filename = file;
      let name = file.replace("_", " ").split("+");
      let cid = parseInt(name[1].slice(0, 1)),
        cname = name[0],
        tid = name[1],
        tname = name[2].split(".").shift();
      console.log(cid, cname, tid, tname);
      csv()
        .fromFile("./questions/" + filename)
        .then(jsonObj => {
          jsonObj.map((k, i) => {
            console.log(i);
            let obj = {
              category: {
                _id: cid,
                name: cname
              },
              label: [],
              topic: {
                _id: tid,
                name: tname
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
  });
});
