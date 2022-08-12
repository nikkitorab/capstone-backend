const pool = require("../../db");
const queries = require("./queries");
// const entry_controller = require("./symptom_entry/controller");
// const entriesForSymptom = require("./entryController");
const entriesController = require("../entries/controller");
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

// GET ONE symptom by id:
const getSymptomById = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const id = parseInt(request.params.id);

  //*******************************************************************************************
  // CALLS FUNCTION IN ENTRIES: GETS ALL RELATED TRIGGER/SYMPTOM ENTRIES
  //*******************************************************************************************
  // let getEntriesForSymptom = entriesController.selectEntriesForSymptom(id);
  // console.log(getEntriesForSymptom); // Promise { <pending> }

  // getEntriesForSymptom.then(function (result) {
  //   console.log(result); // "Some User token"
  // });

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
  console.log(name);
  pool.query(
    queries.addSymptom,
    [name, rating_type, user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      // console.log(results);
      // console.log("***");
      // console.log(results.rows[0].id);
      entriesController.addNewSymptomToEntries(results.rows[0].id);
      // result.rows[0].id;
      //if response status is OK, date has been created successfully:
      response.status(201).send("symptom created successfully!");
    }
  );
};

//DELETE   deleteEntryDataFK
const deleteSymptomById = (request, response) => {
  const id = parseInt(request.params.id);

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
};
// const deleteSymptomById = (request, response) => {
//   const id = parseInt(request.params.id);
//   pool.query(queries.deleteSymptom, [id], (error, results) => {
//     if (error) throw error;

//     response.status(200).send("Symptom deleted successfully!");
//   });

//   // then delete everything with the fk
// };

module.exports = {
  getSymptoms,
  getSymptomById,
  getAllSymptomsForUser,
  addSymptom,
  deleteSymptomById,
};
