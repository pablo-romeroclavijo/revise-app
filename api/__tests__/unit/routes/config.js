const { Pool } = require('pg');
const fs = require('fs');

const dotenv = require('dotenv')
dotenv.config()


const reset = fs.readFileSync(__dirname + '/reset.sql').toString();
console.log(reset)
console.log(process.env.DB_TEST_URL)

const resetTestDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = new Pool({
        connectionString: process.env.DB_TEST_URL
      });
      await db.query(reset)
      resolve('Test DB reset')
    } catch (err) {
      reject('Could not reset TestDB')
    }
  })
}

module.exports = { resetTestDB }