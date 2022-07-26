const pool = require("../../db");
const queries = require("./queries");
// const entry_controller = require("./symptom_entry/controller");
// const entriesForSymptom = require("./entryController");
const relatedEntriesController = require("../related_entries/controller");

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

const getNames = (request, response) => {
  //sql query:
  pool.query(queries.getSymptoms, (error, results) => {
    if (error) throw error;
    const output = {};
    for (const row of results.rows) {
      output[row.id] = row.name;
    }

    //if response status is OK, return all rows in symptoms table
    response.status(200).json(output);
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

const getSymptomNameById = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const id = parseInt(request.params.id);

  pool.query(queries.getSymptomNameById, [id], (error, results) => {
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
  console.log(name);
  pool.query(
    queries.addSymptom,
    [name, rating_type, user_id],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(201).send("symptom created successfully!");
    }
  );
};

//DELETE   deleteEntryDataFK
const deleteSymptomById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(queries.deleteDataSymptomID, [id], (error, results) => {
    pool.query(queries.deleteAllEntriesForSymptom, [id], (error, results) => {
      // pool.query(queries.deleteEntryDataFK, [id], (error, results) => {
      if (error) throw error;

      pool.query(queries.deleteSymptomEntriesFK, [id], (error, results) => {
        if (error) throw error;

        pool.query(queries.deleteSymptom, [id], (error, results) => {
          if (error) throw error;

          response.status(200).send("Symptom deleted successfully!");
        });
      });
    });
  });
};

module.exports = {
  getSymptoms,
  getSymptomById,
  getAllSymptomsForUser,
  addSymptom,
  deleteSymptomById,
  getSymptomNameById,
  getNames,
};
