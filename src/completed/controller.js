const pool = require("../../db");
const queries = require("./queries");

// const getCompletedEntries = (request, response) => {
//   const tableParam = parseInt(request.params.table);
//   console.log(tableParam);
//   // let table = "";
//   if (tableParam == "symptom") {
//     pool.query(queries.getCompletedSymptomEntries, (error, results) => {
//       if (error) throw error;
//       response.status(200).json(results.rows);
//     });
//   } else {
//     pool.query(queries.getCompletedTriggerEntries, (error, results) => {
//       if (error) throw error;
//       response.status(200).json(results.rows);
//     });
//   }
//   // console.log("hello");
// };

// let getRelatedTriggerEntries = function () {
//   return pool.query(queries.getTriggerEntries).then((results) => {
//     return results.rows;
//   });
// };

// let getEntriesForTrigger = getRelatedTriggerEntries();
// // // console.log(getEntriesForTrigger); // Promise { <pending> }

// const addRelatedEntries = (symptomID, rating) => {
//   getEntriesForTrigger.then(function (result) {

let getSymptoms = function () {
  return pool.query(queries.getSymptoms).then((results) => {
    return results.rows;
  });
};

let getSymptomsData = getSymptoms();

const getCompletedSymptomEntries = (request, response) => {
  getSymptomsData.then(function (symptomsResults) {
    pool.query(queries.getCompletedSymptomEntries, (error, results) => {
      if (error) throw error;
      const output = {};
      for (const row of results.rows) {
        output[row.symptom_id] = "a";
      }
      for (const row of symptomsResults) {
        const id = row.id.toString();
        if (output[id]) {
          output[row.id] = row.name;
        }
      }

      response.status(200).json(output);
    });
  });
};

let getTriggers = function () {
  return pool.query(queries.getTriggers).then((results) => {
    return results.rows;
  });
};

let getTriggersData = getTriggers();

const getCompletedTriggerEntries = (request, response) => {
  getTriggersData.then(function (triggersResults) {
    pool.query(queries.getCompletedTriggerEntries, (error, results) => {
      if (error) throw error;
      const output = {};
      for (const row of results.rows) {
        output[row.trigger_id] = "a";
      }
      for (const row of triggersResults) {
        const id = row.id.toString();
        if (output[id]) {
          output[row.id] = row.name;
        }
      }

      response.status(200).json(output);
    });
  });
};

// const getCompletedTriggerEntries = (request, response) => {
//   pool.query(queries.getCompletedTriggerEntries, (error, results) => {
//     if (error) throw error;

//     const output = {};
//     for (const row of results.rows) {
//       output[row.trigger_id] = row.name;
//     }

//     response.status(200).json(output);
//   });

//   //   response.status(200).json(results.rows);
//   // });
// };

// const getSymptomEntryById = (request, response) => {
//   const id = parseInt(request.params.id);
//   pool.query(queries.getSymptomEntryById, [id], (error, results) => {
//     if (error) throw error;
//     response.status(200).json(results.rows);
//   });
// };

module.exports = {
  // getCompletedEntries,
  getCompletedSymptomEntries,
  getCompletedTriggerEntries,
};
