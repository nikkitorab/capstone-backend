const pool = require("../../db");
const queries = require("./queries");

//GET

//query database, get json response from symptom_entries, send it back
const getSymptomEntries = (request, response) => {
  //sql query:
  pool.query(queries.getSymptomEntries, (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptom_entries table
    response.status(200).json(results.rows);
  });
};

//POST

//POST: add symptom
const addSymptomEntry = (request, response) => {
  //get request body by destructuring request object body
  //make helper function to get current date/time and then find id of date record within 18 hours of current
  //get symptom_id based on the symptom they clicked on
  //for now just manually enter date_id and symptom_id into postman:
  const { rating, date_id, symptom_id } = request.body;
  //add symptom to db
  pool.query(
    queries.addSymptomEntry,
    [rating, date_id, symptom_id],
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
  addSymptomEntry,
};
