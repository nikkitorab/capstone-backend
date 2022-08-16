const pool = require("../../db");
const queries = require("./queries");

const getAllRelatedEntries = (request, response) => {
  pool.query(queries.getAllRelatedEntries, (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

// addEntries
//POST: add symptom symptom_id, trigger_id, rating, trigger_present
const postEntries = (request, response) => {
  const rating = request.body.rating;
  const symptom_id = request.body.symptom_id;
  const trigger_id = request.body.trigger_id;
  const trigger_present = request.body.trigger_present;
  //add symptom to db
  pool.query(
    queries.addEntriesManually,
    [symptom_id, trigger_id, rating, trigger_present],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(201).send("related entry created successfully!");
    }
  );
};

let getRelatedTriggerEntries = function () {
  return pool.query(queries.getTriggerEntries).then((results) => {
    return results.rows;
  });
};

let getEntriesForTrigger = getRelatedTriggerEntries();

//*******************************************************************************************
// THIS IS CALLED EVERY TIME A NEW symptom_entry IS MADE
// --> GETS ALL RELATED trigger_entries (BASED ON ENTRY_TIME) & ADDS THEM TO related_entries
//*******************************************************************************************
const addRelatedEntries = (symptomID, rating) => {
  getEntriesForTrigger.then(function (result) {
    // console.log(result); // list of objects

    for (const triggerEntry of result) {
      // console.log(`in the loop: ${triggerEntry}`);
      const triggerID = triggerEntry.trigger_id;
      const triggerPresent = triggerEntry.occurred;
      pool
        .query(queries.addEntries, [
          symptomID,
          triggerID,
          rating,
          triggerPresent,
        ])
        .then((postResult) => {
          // if (error) throw error;
          // console.log(postResult.rows);
          // return results.rows;
        });
    }
  });
};

// get symptom_entry id = ...
const getSymptomEntryById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(queries.getSymptomEntryById, [id], (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

const getRelatedEntriesSymptomID = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(queries.getRelatedEntriesSymptomID, [id], (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

//*******************************************************************************************
// GET SIGNIFICANT SYMPTOM IDS/NAMES
//*******************************************************************************************
let getSymptomNames = function (id) {
  return pool.query(queries.getSymptomNameById, [id]).then((results) => {
    return results.rows;
  });
};

let getSymptomNamesByIds = getSymptomNames();
// console.log(getEntriesForTrigger); // Promise { <pending> }

const getSignifSymptomNames = () => {
  pool.query(queries.getSignificantSymptomIDs, (error, results) => {
    if (error) throw error;

    const names = {};
  });
};

//*******************************************************************************************
// GET VALUES FROM PROMISE:
//*******************************************************************************************

// let selectEntriesForTrigger = function (triggerID, occurred) {
//   return pool
//     .query(queries.getRelatedEntriesTriggerID, [triggerID, occurred])
//     .then((results) => {
//       return results.rows;
//     });
// };

// let getEntriesForTrigger = selectEntriesForTrigger(triggerID);
// console.log(getEntriesForTrigger); // Promise { <pending> }

// getEntriesForTrigger.then(function (result) {
//   console.log(result); // list of objects
// });

// CREATE TABLE related_entries (
//   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   symptom_id INT,
//   trigger_id INT,
//   rating INT,
//   trigger_present BOOLEAN,
//   FOREIGN KEY (symptom_id) REFERENCES symptoms(id),
//   FOREIGN KEY (trigger_id) REFERENCES triggers(id)
// );

module.exports = {
  addRelatedEntries,
  getAllRelatedEntries,
  // addRelatedEntriesFromTime,
  getSymptomEntryById,
  getRelatedEntriesSymptomID,
  getRelatedTriggerEntries,
  postEntries,
  getSignifSymptomNames,
};
