const { Client } = require("pg");
const client = new Client({
  host: "timworx.com",
  user: "challenge1",
  port: 5433,
  password: "challenge1",
  database: "challenge1",
});
module.exports = client;
