const pool = require("../../db");
const queries = require("./queries");

const { std, mean, sqrt } = require("mathjs");

const getAllOutputData = (request, response) => {
  //sql query:
  pool.query(queries.getAllOutputData, (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptoms table
    response.status(200).json(results.rows);
  });
};

// get all data where |cohens_d| >= 0.5 --> significant
const getSignificantData = (request, response) => {
  //sql query:
  pool.query(queries.getSignificantData, (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptoms table
    console.log(results.rows);
    response.status(200).json(results.rows);
  });
};

const getSignificantTriggers = (request, response) => {
  //sql query:
  pool.query(queries.getSignificantTriggers, (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptoms table
    console.log(results.rows);
    response.status(200).json(results.rows);
  });
};

const getSignificantDataForTrigger = (request, response) => {
  //query params are strings, so to get it as an int we need to parse:
  const id = parseInt(request.params.id);

  pool.query(queries.getSignificantDataForTrigger, [id], (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in symptom_entries table
    response.status(200).json(results.rows);
  });
};

let getBySymptomAndTrigger = function (symptomID, triggerID) {
  return pool
    .query(queries.getAllForSymptomAndTrigger, [symptomID, triggerID])
    .then((results) => {
      return results.rows;
    });
};

// GET SYMPTOM AND TRIGGER IDS

let getAllSymptomIDs = function () {
  return pool.query(queries.getAllSymptomIDs).then((symptomResults) => {
    return symptomResults.rows;
  });
};

let getSymptomIDs = getAllSymptomIDs();
// console.log(getEntriesForTrigger); // Promise { <pending> }

let getAllTriggerIDs = function () {
  return pool.query(queries.getAllTriggerIDs).then((triggerResults) => {
    return triggerResults.rows;
  });
};

let getTriggerIDs = getAllTriggerIDs();

const getAllIDs = () => {
  getSymptomIDs.then(function (symptomResults) {
    // console.log(`symptomResults: ${symptomResults}`); // list of objects
    const symptomIDs = [];
    const triggerIDs = [];
    for (const s of symptomResults) {
      symptomIDs.push(s.id);
    }

    getTriggerIDs.then(function (triggerResults) {
      // console.log(`triggerResults: ${triggerResults}`); // list of objects

      for (const t of triggerResults) {
        triggerIDs.push(t.id);
      }

      getStats(symptomIDs, triggerIDs);

      // console.log(`symp: ${symptomIDs}`);
      // console.log(`trig: ${triggerIDs}`);
    });
  });
};

// CALCULATE POOLED STANDARD DEVIATION FOR COHENS D --> using pooled bc sample sizes might not be equal
// M1 = absent M2 = present
const pooledStandardDev = (
  absentRatings,
  absentMean,
  presentRatings,
  presentMean
) => {
  const absentSD = std(absentRatings);
  const presentSD = std(presentRatings);
  const topLeft = (absentRatings.length - 1) * Math.pow(absentSD, 2);
  const topRight = (presentRatings.length - 1) * Math.pow(presentSD, 2);
  const bottom = absentRatings.length + presentRatings.length - 2;
  const beforeSqrt = (topLeft + topRight) / bottom;
  const pooledSD = Math.sqrt(beforeSqrt);
  return pooledSD;
};

// USING COHENS DS INSTEAD OF D BECAUSE POSSIBLE UNEQUAL GROUP SIZE
const cohensDs = (absentMean, presentMean, pooledSD) => {
  if (absentMean === presentMean) {
    return 0;
  }
  const cD = (presentMean - absentMean) / pooledSD;
  return cD;
};

const getStats = (symptomIDs, triggerIDs) => {
  for (const symptom of symptomIDs) {
    for (const trigger of triggerIDs) {
      pool.query(
        queries.getAllForSymptomAndTrigger,
        [symptom, trigger],
        (error, results) => {
          if (error) throw error;
          const presentRatings = [];
          const absentRatings = [];
          for (const result of results.rows) {
            if (result.trigger_present) {
              presentRatings.push(result.rating);
            } else {
              absentRatings.push(result.rating);
            }
          }
          if (presentRatings.length > 0 && absentRatings.length > 0) {
            const presentMean = mean(presentRatings);
            const absentMean = mean(absentRatings);

            const pooled = pooledStandardDev(
              absentRatings,
              absentMean,
              presentRatings,
              presentMean
            );
            const cd = cohensDs(absentMean, presentMean, pooled);
            // const effectSize = effectSize(cd);
            // see if there is already a row in the data_output table with this symptom/trigger:
            pool.query(
              queries.getData,
              [symptom, trigger],
              (error, results) => {
                if (error) throw error;
                if (results.rows.length > 0) {
                  // row already exists, update it instead of adding a new row: updateData
                  pool.query(
                    queries.updateData,
                    [presentMean, absentMean, cd, symptom, trigger],
                    (error, results) => {
                      if (error) throw error;
                    }
                  );
                } else {
                  pool.query(
                    queries.addData,
                    [symptom, trigger, presentMean, absentMean, cd],
                    (error, results) => {
                      if (error) throw error;
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  }
};

const deleteData = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(queries.deleteData, [id], (error, results) => {
    if (error) throw error;

    response.status(200).send("data deleted successfully!");
  });
};

module.exports = {
  getBySymptomAndTrigger,
  getAllIDs,
  getAllOutputData,
  getSignificantData,
  deleteData,
  getSignificantDataForTrigger,
  getSignificantTriggers,
};
