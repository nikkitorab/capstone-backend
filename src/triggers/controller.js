const pool = require("../../db");
const queries = require("./queries");

//GET

//query database, get json response from triggers, send it back
const getTriggers = (request, response) => {
  //sql query:
  pool.query(queries.getTriggers, (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in triggers table
    response.status(200).json(results.rows);
  });
};

//POST

//POST: add symptom
const addTrigger = (request, response) => {
  //get request body by destructuring request object body
  // const { name } = request.body.name;
  // const { rating_type } = request.body.rating_type;
  const { name, rating_type } = request.body;
  // in request body: date = "2001-02-16";
  //add date to db
  pool.query(queries.addTrigger, [name, rating_type], (error, results) => {
    if (error) {
      throw error;
    }
    //if response status is OK, date has been created successfully:
    response.status(201).send("trigger created successfully!");
  });
};

module.exports = {
  getTriggers,
  addTrigger,
};
