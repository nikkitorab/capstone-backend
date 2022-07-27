const pool = require("../../db");
const queries = require("./queries");

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

//POST

//POST: add symptom
const addSymptom = (request, response) => {
  //get request body by destructuring request object body
  const { name, rating_type } = request.body;
  //add symptom to db
  pool.query(queries.addSymptom, [name, rating_type], (error, results) => {
    if (error) {
      throw error;
    }
    //if response status is OK, date has been created successfully:
    response.status(201).send("symptom created successfully!");
  });
};

module.exports = {
  getSymptoms,
  addSymptom,
};
