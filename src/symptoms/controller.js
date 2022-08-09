const pool = require("../../db");
const queries = require("./queries");
// const entry_controller = require("./symptom_entry/controller");
// const entriesForSymptom = require("./entryController");
const entriesController = require("../entries/controller");
// const { getEntriesForSymptom } = require("../entries/controller");

// { Router }

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

  // const x = [];
  // entriesController.getEntriesForSymptom(id);
  // const d = await entriesController.getEntriesForSymptom().catch((err) => {
  //   console.log(err); // handle error
  // });
  // console.log(d);
  // entriesController.getEntriesForSymptom.then((data) => {
  //   console.log(data);
  // });

  // entriesController.getEntriesForSymptom(id);
  // entriesController.selectEntriesForSymptom(id);
  // const first = entriesController.selectEntriesForSymptom(id);
  // // console.log(first); // Promise { <pending> }

  // const x = first.then(function (result) {
  //   // console.log(result); // "Some User token"
  //   return result;
  // });
  // console.log(x);
  // let second = entriesController.getEntriesForSymptom(id);
  // console.log(second); // Promise { <pending> }

  // second.then(function (result) {
  //   console.log(result); // "Some User token"
  // });
  // entriesController.getEntriesForSymptom(id).then((res) => console.log(res));
  // entriesController.selectEntriesForSymptom.then(function (result) {
  //   console.log(result); // "Some User token"
  // });
  let getEntriesForSymptom = entriesController.selectEntriesForSymptom(id);
  console.log(getEntriesForSymptom); // Promise { <pending> }

  getEntriesForSymptom.then(function (result) {
    console.log(result); // "Some User token"
  });

  // selectEntriesForSymptom;
  // console.log(x);

  // entriesController.getEntriesForSymptom(id, (err, data) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   return data;
  //   // console.log(data);
  // });
  // console.log(data);
  // console.log(z);
  // console.log(`******************** ${x.length}`);

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
      console.log(results);
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
