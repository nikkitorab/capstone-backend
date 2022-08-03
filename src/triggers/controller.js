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
  const id = parseInt(request.params.id);
  pool.query(queries.getTriggerById, [id], (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

// GET ALL triggers for USER (from user_id fk):
const getAllTriggersForUser = (request, response) => {
  const user_id = parseInt(request.params.user_id);
  pool.query(queries.getAllTriggersForUser, [user_id], (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

//POST

//POST: add symptom
const addTrigger = (request, response) => {
  const { name, rating_type, user_id } = request.body;
  //add trigger to db
  pool.query(
    queries.addTrigger,
    [name, rating_type, user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("trigger created successfully!");
    }
  );
};

//DELETE
const deleteTriggerById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(queries.deleteTrigger, [id], (error, results) => {
    if (error) throw error;
    response.status(200).send("Trigger deleted successfully!");
  });
};

module.exports = {
  getTriggers,
  getTriggerById,
  getAllTriggersForUser,
  addTrigger,
  deleteTriggerById,
};