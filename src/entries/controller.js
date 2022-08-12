const pool = require("../../db");
const queries = require("./queries");
const symptomQueries = require("../symptoms/queries");
const math = require("mathjs");

const triggerQueries = require("../triggers/queries");

const getEntriesData = (request, response) => {
  //sql query:
  pool.query(queries.getEntriesData, (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptoms table
    response.status(200).json(results.rows);
  });
};

// when a new symptom is added, this is called by symptoms in the post request to add symptom to entries db
let addNewSymptomToEntries = function (symptomID) {
  console.log(`in the function, id is ${symptomID}`);
  // loop trhough list of all triggers, add to to entries_data table with symptom_id that was passed in
  return pool.query(triggerQueries.getTriggers).then((results) => {
    console.log(results.rows);

    for (const trigger of results.rows) {
      const trigger_id = trigger.id;
      console.log(trigger_id);
      // const z = 0;
      pool
        .query(queries.addEntryData, [symptomID, trigger_id, 0, 0, 0, 0])
        .then((results) => {
          // if (error) throw error;
          console.log(results.rows);
          // return results.rows;
        });
    }

    return results.rows;
  });
};

// when a new trigger is added, this is called by triggers in the post request to add trigger to entries db
let addNewTriggerToEntries = function (triggerID) {
  console.log(`in the function, id is ${triggerID}`);
  // loop trhough list of all triggers, add to to entries_data table with symptom_id that was passed in
  return pool.query(symptomQueries.getSymptoms).then((results) => {
    console.log(results.rows);

    for (const symptom of results.rows) {
      const symptom_id = symptom.id;
      console.log(symptom_id);
      pool
        .query(queries.addEntryData, [symptom_id, triggerID, 0, 0, 0, 0])
        .then((results) => {
          // if (error) throw error;
          console.log(results.rows);
          // return results.rows;
        });
    }
    // console.log(`******** U: ${us}`);

    return results.rows;
  });
};

// // get entries_data by symptom_id:
// let getEntriesBySymptom = function (symptomID) {
//   return pool
//     .query(queries.getEntriesBySymptomID, [symptomID])
//     .then((results) => {
//       console.log(`in get entries: ${results.rows}`);
//       console.log(`len: ${results.rows.length}`);
//       return results.rows;
//     });
// };

const getEntriesBySymptom = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const symptom_id = parseInt(request.params.symptom_id);
  pool.query(queries.getEntriesBySymptomID, [symptom_id], (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptom_entries table
    response.status(200).json(results.rows);
  });
};

const getEntriesByTrigger = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const trigger_id = parseInt(request.params.trigger_id);
  pool.query(queries.getEntriesByTriggerID, [trigger_id], (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptom_entries table
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
      console.log(`in get entries: ${results.rows}`);
      console.log(`len: ${results.rows.length}`);
      return results.rows;
    });
};
//*******************************************************************************************
// CALLED WHEN NEW SYMPTOM_ENTRY IS ADDED: UPDATES ENTRIES_DATA
//*******************************************************************************************




let symptomEntryAdded = function (symptomID, rating) {
  // loop trhough list of all triggers, add to to entries_data table with symptom_id that was passed in
  return pool
    .query(queries.getRelatedEntriesSymptomID, [symptomID])
    .then((results) => {
      console.log(results.rows);

      for (const entry of results.rows) {
        const triggerID = entry.trigger_id;
        const occurred = entry.occurred;

        if (occurred) {
          pool
            .query(queries.updateEntryDataTriggerPresent, [
              rating,
              symptomID,
              triggerID,
            ])
            .then((updatedResults) => {
              // if (error) throw error;
              console.log(updatedResults.rows);
              // return results.rows;
            });
        } else {
          pool
            .query(queries.updateEntryDataTriggerAbsent, [
              rating,
              symptomID,
              triggerID,
            ])
            .then((updatedResults) => {
              // if (error) throw error;
              console.log(updatedResults.rows);
              // return results.rows;
            });
        }
      }

      return results.rows;
    });
};

// gets all entries with trigger id with same occurred value (true/false) & the related symptoms
let selectEntriesForTrigger = function (triggerID, occurred) {
  return pool
    .query(queries.getRelatedEntriesTriggerID, [triggerID, occurred])
    .then((results) => {
      return results.rows;
    });
};
const triggerEntryAdded = (triggerID, occurred) => {
  let getEntriesForTrigger = selectEntriesForTrigger(triggerID, occurred);
  // console.log(getEntriesForTrigger); // Promise { <pending> }

  getEntriesForTrigger.then(function (result) {
    //result = list of the objects
    console.log(result); // list of objects
    //redo math for all of these
    //MAYBE PATCH? --> find all entries

    // - loop result, see if entries_data has a row with current list item's trigger_id and symptom_id -->
    // if occurred === true: update trigger_present (avg symptom rating)
    // update: trigger_present (if occurred is true) or trigger_absent(if occurred is true)
  });
};
//*******************************************************************************************
// CALLS selectEntriesForTrigger: GETS ALL RELATED TRIGGER/SYMPTOM ENTRIES BY trigger_id
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

//*******************************************************************************************
// ANALYSIS: DIFFERENCE OF MEANS, COHENS D FOR EFFECT SIZE
//*******************************************************************************************
// let getStandardDeviations = function (symptomID) {
//   return pool
//     .query(queries.getRelatedEntriesSymptomID, [symptomID])
//     .then((results) => {
//       const present = [];
//       // let presentSum = 0;
//       const absent = [];
//       // let absentSum = 0;

//       for (const entry of results.rows) {
//         if (entry.occurred) {
//           present.push(entry);
//           // presentSum += entry.rating;
//         } else {
//           absent.push(entry);
//           // absentSum += entry.rating;
//         }
//       }
//       // get means:
//       const presentMean = math.mean(present);
//       const absentMean = math.mean(absent);

//       const presentSd = math.std(present);
//       const absentSd = math.std(absent)

//       console.log(`in get entries: ${results.rows}`);
//       console.log(`len: ${results.rows.length}`);
//       return results.rows;
//     });
// };

// const getMeans = (entriesData) => {
//   const output = []

//   for(const pair in entriesData){
//     const temp = {
//       "symptomID" : pair.symptom_id,
//       "triggerID" : pair.trigger_id,
//     }

//   }

// }

const deleteEntryData = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(queries.deleteEntryData, [id], (error, results) => {
    if (error) throw error;

    response.status(200).send("Symptom entrydeleted successfully!");
  });
};

module.exports = {
  selectEntriesForSymptom,
  selectEntriesForTrigger,
  getEntriesData,
  symptomEntryAdded,
  addNewSymptomToEntries,
  addNewTriggerToEntries,
  getEntriesBySymptom,
  getEntriesByTrigger,
  deleteEntryData,
  // selectEntriesForSymptom,
  // testing,
  // analyzeEntryData,
};
