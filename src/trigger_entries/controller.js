const pool = require("../../db");
const queries = require("./queries");

//GET

//query database, get json response from trigger_entries, send it back
const getTriggerEntries = (request, response) => {
  //sql query:
  pool.query(queries.getTriggerEntries, (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptom_entries table
    response.status(200).json(results.rows);
  });
};

// GET ONE trigger_entries by id:
const getTriggerEntryById = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const id = parseInt(request.params.id);
  pool.query(queries.getTriggerEntryById, [id], (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptom_entries table
    response.status(200).json(results.rows);
  });
};

//POST

//POST: add symptom
const addTriggerEntry = (request, response) => {
  //get request body by destructuring request object body
  //make helper function to get current date/time and then find id of date record within 18 hours of current
  //get trigger_id based on the trigger they clicked on
  //for now just manually enter date_id and trigger_id into postman:
  const occurred = request.body.occurred;
  //change trigger_id so it gets value from button click, not request body
  const trigger_id = request.body.trigger_id;
  const entry_time = new Date(Date.now()).toISOString();

  //add trigger entry to db
  pool.query(
    queries.addTriggerEntry,
    [occurred, entry_time, trigger_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      //if response status is OK, trigger_entry has been created successfully:
      response.status(201).send("trigger entry created successfully!");
    }
  );
};

module.exports = {
  getTriggerEntries,
  getTriggerEntryById,
  addTriggerEntry,
};
