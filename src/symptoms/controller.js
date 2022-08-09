const pool = require("../../db");
const queries = require("./queries");
// const entry_controller = require("./symptom_entry/controller");

//GET

//query database, get json response from symptoms, send it back
const getSymptoms = (request, response) => {
  //sql query:
  pool.query(queries.getSymptoms, (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptoms table
    response.status(200).json(results.rows);
  });
};

// GET ONE symptom by id:
const getSymptomById = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const id = parseInt(request.params.id);
  pool.query(queries.getSymptomById, [id], (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptom_entries table
    response.status(200).json(results.rows);
  });
};

// GET ALL symptoms for USER (from user_id fk):
const getAllSymptomsForUser = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const user_id = parseInt(request.params.user_id);
  pool.query(queries.getAllSymptomsForUser, [user_id], (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptom_entries table
    response.status(200).json(results.rows);
  });
};

//POST

//POST: add symptom
const addSymptom = (request, response) => {
  //get request body by destructuring request object body
  const { name, rating_type, user_id } = request.body;
  //add symptom to db
  pool.query(
    queries.addSymptom,
    [name, rating_type, user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      //if response status is OK, date has been created successfully:
      response.status(201).send("symptom created successfully!");
    }
  );
};

//DELETE
const deleteSymptomById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(queries.deleteSymptom, [id], (error, results) => {
    if (error) throw error;
    //delete entries with id as fk:
    // const entries = entry_controller.getSymptomEntryById();
    // for(const item of entries){

    // }

    response.status(200).send("Symptom deleted successfully!");
  });

  // then delete everything with the fk
};

module.exports = {
  getSymptoms,
  getSymptomById,
  getAllSymptomsForUser,
  addSymptom,
  deleteSymptomById,
};
