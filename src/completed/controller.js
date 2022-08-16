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

const getCompletedSymptomEntries = (request, response) => {
  pool.query(queries.getCompletedSymptomEntries, (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

const getCompletedTriggerEntries = (request, response) => {
  pool.query(queries.getCompletedTriggerEntries, (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

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