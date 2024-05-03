// const fs = require("fs");
import fs from "fs";

const gen = () => {
  let temp = [];
  let letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  for (let i = 1; i <= 100; i++) {
    let name = "";
    for (let i = 0; i < 5; i++) {
      let x = Math.ceil(Math.random() * 100) % 26;
      name += letters[x];
    }
    let obj = {};
    let m = Math.ceil(Math.random() * 100);
    obj.id = i;
    obj.name = name;
    obj.totalMarks = m;

    temp.push(obj);
  }

  fs.writeFile("userdata.json", JSON.stringify(temp), (error) => {
    console.log(error);
  });
};

gen();
