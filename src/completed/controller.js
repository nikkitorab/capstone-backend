const pool = require("../../db");
const queries = require("./queries");

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

module.exports = {
  getCompletedSymptomEntries,
  getCompletedTriggerEntries,
};
