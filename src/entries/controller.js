const pool = require("../../db");
const queries = require("./queries");
// const symptomsQueries = require("../symptoms/queries");

// RUN ALL OF THESE EVERY TIME NEW ENTRY IS ADDED
// --> call from POST functions in symptom_entries & trigger_entries (main function, analyzeEntryData only)

const getEntriesData = (request, response) => {
  //sql query:
  pool.query(queries.getEntriesData, (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptoms table
    response.status(200).json(results.rows);
  });
};

//*******************************************************************************************
// WHEN A NEW symptom_entry is posted: actually maybe only do stuff when a trigger entry is posted?
//*******************************************************************************************
// if a new symptom_entry is added: --> selectEntriesForSymptom
// if a new trigger_entry is added: update only rows
let selectEntriesForSymptom = function (symptomID) {
  return pool
    .query(queries.getRelatedEntriesSymptomID, [symptomID])
    .then((results) => {
      return results.rows;
    });
};
//*******************************************************************************************
// CALLS selectEntriesForSymptom: GETS ALL RELATED TRIGGER/SYMPTOM ENTRIES BY symptom_id
//*******************************************************************************************
// let getEntriesForSymptom = selectEntriesForSymptom(symptomID);
// console.log(getEntriesForSymptom); // Promise { <pending> }

// getEntriesForSymptom.then(function (result) {
//   console.log(result); // list of objects
// });

// gets all entries with trigger id with same occurred value (true/false) & the related symptoms
let selectEntriesForTrigger = function (triggerID) {
  return pool
    .query(queries.getRelatedEntriesTriggerID, [triggerID])
    .then((results) => {
      return results.rows;
    });
};
const triggerEntryAdded = (triggerID) => {
  let getEntriesForTrigger = selectEntriesForTrigger(triggerID);
  // console.log(getEntriesForTrigger); // Promise { <pending> }

  getEntriesForTrigger.then(function (result) {
    //result = list of the objects
    console.log(result); // list of objects
    //redo math for all of these

    // find all records in entries_data table that have trigger_id. update all of them:
  });
};
//*******************************************************************************************
// CALLS selectEntriesForTrigger: GETS ALL RELATED TRIGGER/SYMPTOM ENTRIES BY trigger_id
//*******************************************************************************************
// let getEntriesForTrigger = selectEntriesForTrigger(triggerID);
// console.log(getEntriesForTrigger); // Promise { <pending> }

// getEntriesForTrigger.then(function (result) {
//   console.log(result); // list of objects
// });

module.exports = {
  selectEntriesForSymptom,
  selectEntriesForTrigger,
  getEntriesData,
  // selectEntriesForSymptom,
  // testing,
  // analyzeEntryData,
};
