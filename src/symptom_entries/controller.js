const pool = require("../../db");
const queries = require("./queries");

// const getSymptomEntriesQuery = "SELECT * FROM symptom_entries";

// const getSymptomEntryByIdQuery = "SELECT * FROM symptom_entries WHERE id = $1";

// const addSymptomEntryQuery =
//   "INSERT INTO symptom_entries (rating, entry_time, symptom_id) VALUES ($1, $2, $3)";

//GET

// GET ALL symptom_entries: query database, get json response from symptom_entries, send it back
const getSymptomEntries = (request, response) => {
  pool.query(queries.getSymptomEntries, (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

// GET ONE symptom_entry by id:
const getSymptomEntryById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(queries.getSymptomEntryById, [id], (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

//POST

//POST: add symptom
const addSymptomEntry = (request, response) => {
  const rating = request.body.rating;
  // const symptom_id = request.body.symptom_id;
  //GET SYMPTOM ID FROM SYMPTOM NAME
  const entry_time = new Date(Date.now()).toISOString();

  //add symptom entry to db:i
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

module.exports = {
  getSymptomEntries,
  getSymptomEntryById,
  addSymptomEntry,
};
