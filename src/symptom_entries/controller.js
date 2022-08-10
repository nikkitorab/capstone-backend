const pool = require("../../db");
const queries = require("./queries");
const entriesController = require("../entries/controller");

//GET

// GET ALL symptom_entries: query database, get json response from symptom_entries, send it back
const getSymptomEntries = (request, response) => {
  // console.log("hello");
  pool.query(queries.getSymptomEntries, (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

// GET all symptom_entries for symptom_id (FK!!!):
// const getSymptomEntryByFK = (request, response) => {
//   const id = parseInt(request.params.id);
//   pool.query(queries.getSymptomEntryByFK, [symptom_id], (error, results) => {
//     if (error) throw error;
//     response.status(200).json(results.rows);
//   });
// };

// GET ONE symptom_entry by id:
const getSymptomEntryById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(queries.getSymptomEntryById, [id], (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

// GET ALL entries for SYMPTOM (from symptom_id fk):
const getAllEntriesForSymptom = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const symptom_id = parseInt(request.params.symptom_id);
  pool.query(
    queries.getAllEntriesForSymptom,
    [symptom_id],
    (error, results) => {
      if (error) throw error;
      //if response status is OK, return all rows in symptom_entries table
      response.status(200).json(results.rows);
    }
  );
};

//POST

//POST: add symptom
const addSymptomEntry = (request, response) => {
  const rating = request.body.rating;
  const symptom_id = request.body.symptom_id;
  const entry_time = new Date(Date.now()).toISOString();

  entriesController.symptomEntryAdded(symptom_id);
  //add symptom entry to db:
  pool.query(
    queries.addSymptomEntry,
    [rating, entry_time, symptom_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      //if response status is OK, symptom_entry has been created successfully:
      response.status(201).send("symptom entry created successfully!");
    }
  );
};

// DELETE ALL entries for SYMPTOM (from symptom_id fk):
const deleteAllEntriesForSymptom = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const symptom_id = parseInt(request.params.symptom_id);
  pool.query(
    queries.getAllEntriesForSymptom,
    [symptom_id],
    (error, results) => {
      if (error) throw error;
      //if response status is OK, return all rows in symptom_entries table
      response.status(200).json(results.rows);
    }
  );
};

// const deleteSymptomEntry = (request, response) => {
//   const id = parseInt(request.params.id);
//   pool.query(queries.deleteSymptomEntry, [id], (error, results) => {
//     if (error) throw error;
//     response.status(200).send("Symptom entry deleted successfully!");
//   });
// };

const deleteSymptomEntry = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(queries.deleteSymptomEntry, [id], (error, results) => {
    if (error) throw error;

    response.status(200).send("Symptom entrydeleted successfully!");
  });

  // then delete everything with the fk
};

// const x = (id) => {
//   const deleteSymptomEntry = (request, response) => {
//     const id = parseInt(request.params.id);
//     pool.query(queries.deleteSymptomEntry, [id], (error, results) => {
//       if (error) throw error;
//       response.status(200).send("Symptom entry deleted successfully!");
//     });
//   };
// };
module.exports = {
  getSymptomEntries,
  getSymptomEntryById,
  addSymptomEntry,
  getAllEntriesForSymptom,
  // deleteAllEntriesForSymptom,
  deleteSymptomEntry,
};
