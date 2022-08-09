const pool = require("../../db");
const queries = require("./queries");
const symptomsQueries = require("../symptoms/queries");

// RUN ALL OF THESE EVERY TIME NEW ENTRY IS ADDED
// --> call from POST functions in symptom_entries & trigger_entries (main function, analyzeEntryData only)

const getEntriesForSymptom = (symptomID) => {
  pool.query(queries.getRelatedEntries, [symptomID], (error, results) => {
    if (error) throw error;

    const x = results.rows; // this is the response:
    //the function got EVERY symptom_entry for symptom with id symptomID
    // then gets EVERY trigger_entry that falls into time window of each symptom_entry
    // each object has the symptom_id (symptomID), that^ trigger_entry_id, and that^ symptom_entry_id
  });
};

//THIS IS THE MAIN ONE THAT WILL CALL THE OTHER FUNCTIONS IN THIS FILE
// --> call from POST functions in symptom_entries and trigger_entries
// const analyzeEntryData = () => {

// }

module.exports = {
  getEntriesForSymptom,
  // analyzeEntryData,
};
