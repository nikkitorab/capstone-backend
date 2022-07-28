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

// GET ONE trigger by id:
const getTriggerById = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const id = parseInt(request.params.id);
  pool.query(queries.getTriggerById, [id], (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptom_entries table
    response.status(200).json(results.rows);
  });
};

//POST

//POST: add symptom
const addTrigger = (request, response) => {
  //get request body by destructuring request object body
  const { name, rating_type, user_id } = request.body;
  //add trigger to db
  pool.query(
    queries.addTrigger,
    [name, rating_type, user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      //if response status is OK, trigger has been created successfully:
      response.status(201).send("trigger created successfully!");
    }
  );
};

module.exports = {
  getTriggers,
  getTriggerById,
  addTrigger,
};
