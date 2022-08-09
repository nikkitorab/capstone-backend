const pool = require("../../db");
const queries = require("./queries");
// const symptomsQueries = require("../symptoms/queries");

// RUN ALL OF THESE EVERY TIME NEW ENTRY IS ADDED
// --> call from POST functions in symptom_entries & trigger_entries (main function, analyzeEntryData only)

// const getEntriesForSymptom = (symptomID) => {
//   const x = [];
//   pool.query(queries.getRelatedEntries, [symptomID], (error, results) => {
//     if (error) throw error;
//     console.log(results.rows);
//     for (const res of results.rows) {
//       x.push(res);
//     }
//     // return results.rows;
//     // this is the response:
//     //the function got EVERY symptom_entry for symptom with id symptomID
//     // then gets EVERY trigger_entry that falls into time window of each symptom_entry
//     // each object has the symptom_id (symptomID), that^ trigger_entry_id, and that^ symptom_entry_id
//   });
//   console.log(x);
//   return x;
// };

let selectEntriesForSymptom = function (symptomID) {
  return pool.query(queries.getRelatedEntries, [symptomID]).then((results) => {
    return results.rows;
  });
};
//*******************************************************************************************
// CALLS selectEntriesForSymptom: GETS ALL RELATED TRIGGER/SYMPTOM ENTRIES
//*******************************************************************************************
// let getEntriesForSymptom = selectEntriesForSymptom(symptomID);
// console.log(getEntriesForSymptom); // Promise { <pending> }

// getEntriesForSymptom.then(function (result) {
//   console.log(result); // "Some User token"
// });

module.exports = {
  selectEntriesForSymptom,
  // selectEntriesForSymptom,
  // testing,
  // analyzeEntryData,
};
