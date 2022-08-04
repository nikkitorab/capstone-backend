const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "capstone",
  port: 5432,
});

//export pool to make queries:
module.exports = pool;
