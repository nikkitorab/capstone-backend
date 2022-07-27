//logic related to each route
//import db from pool
const pool = require("../../db");
//import quieries
const queries = require("./queries");

//query database, get json response from dates, send it back
const getDates = (request, response) => {
  //sql query:
  pool.query(queries.getDates, (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in dates table
    response.status(200).json(results.rows);
  });
};

//get date by id
const getDateById = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const id = parseInt(request.params.id);
  pool.query(queries.getDateById, [id], (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in dates table
    response.status(200).json(results.rows);
  });
};

//POST: add date
const addDate = (request, response) => {
  //get request body by destructuring request object body
  const { date } = request.body.date;
  // in request body: date = "2001-02-16";
  //add date to db
  pool.query(queries.addDate, [date], (error, results) => {
    if (error) {
      console.log("Date:");
      console.log(date);
      throw error;
    }
    //if response status is OK, date has been created successfully:
    response.status(201).send("date created successfully!");
  });
};

module.exports = {
  getDates,
  getDateById,
  addDate,
};
