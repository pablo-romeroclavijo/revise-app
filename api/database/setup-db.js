const fs = require('fs');
require("dotenv").config();

const { parse } = require("csv-parse")

const db = require("./connect");
const sql = fs.readFileSync('./database/db.sql').toString();



db.query(sql)
    .then(data => {
        console.log("Set-up complete.");
    })
    .catch(error => console.log(error));
