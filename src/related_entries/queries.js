// this is for ONE symptom ENTRY
const getRelatedEntriesSymptomID =
  "SELECT * FROM symptom_entries CROSS JOIN trigger_entries WHERE symptom_entries.id = $1 AND date_part('epoch', symptom_entries.entry_time) >= (date_part('epoch', trigger_entries.entry_time)-1) AND (date_part('epoch', trigger_entries.entry_time)+12) >= date_part('epoch', symptom_entries.entry_time) ";

// "SELECT * FROM symptom_entries CROSS JOIN trigger_entries WHERE symptom_entries.id = $1 AND (date_part('epoch', symptom_entries.entry_time)- 1) <= date_part('epoch', trigger_entries.entry_time) AND (date_part('epoch', trigger_entries.entry_time)+12) >= date_part('epoch', symptom_entries.entry_time) ";
// "SELECT * FROM trigger_entries WHERE trigger_entries.entry_time < (CURRENT_TIMESTAMP - 3600)

// "SELECT * FROM symptom_entries CROSS JOIN trigger_entries WHERE symptom_entries.id = $1 AND symptom_entries.symptom_id = $2 AND (date_part('epoch', symptom_entries.entry_time)- 1) <= date_part('epoch', trigger_entries.entry_time) AND (date_part('epoch', trigger_entries.entry_time)+12) >= date_part('epoch', symptom_entries.entry_time) ";
// "SELECT * FROM trigger_entries WHERE (date_part('epoch', $1)- 1) <= date_part('epoch', trigger_entries.entry_time) AND (date_part('epoch', trigger_entries.entry_time)+12) >= date_part('epoch', $1) ";
const getAllRelatedEntries = "SELECT * FROM related_entries";

const getAllEntriesForSymptom =
  "SELECT * FROM symptom_entries WHERE symptom_id = $1";

const addEntries =
  "INSERT INTO related_entries (symptom_id, trigger_id, rating, trigger_present) VALUES ($1, $2, $3,$4)";

const addEntriesManually =
  "INSERT INTO related_entries (symptom_id, trigger_id, rating, trigger_present) VALUES ($1, $2, $3,$4)";

const getlastSymptomEntry =
  "SELECT * FROM symptom_entries WHERE id = (SELECT MAX(id) FROM symptom_entries)";
// const deleteAllEntriesForSymptom =
//   "DELETE * FROM related_entries WHERE symptom_id = $1";

// const deleteAllEntriesForTrigger =
//   "DELETE * FROM related_entries WHERE trigger_id = $1";

const getRelatedEntriesSymptomTime =
  // "SELECT * FROM symptom_entries CROSS JOIN trigger_entries WHERE symptom_entries.id = $1 AND (date_part('epoch', symptom_entries.entry_time)- 1) <= date_part('epoch', trigger_entries.entry_time) AND (date_part('epoch', trigger_entries.entry_time)+12) >= date_part('epoch', symptom_entries.entry_time) ";

  "SELECT * FROM trigger_entries WHERE date_part('epoch', $1) >= (date_part('epoch', trigger_entries.entry_time)-1) AND (date_part('epoch', trigger_entries.entry_time)+12) >= date_part('epoch', $1) ";

const getSymptomEntryById = "SELECT * FROM symptom_entries WHERE id = $1";

const getTriggerEntries =
  // "SELECT * FROM trigger_entries";
  "SELECT * FROM trigger_entries WHERE entry_time >= NOW() - '1 day'::INTERVAL";

// "SELECT * FROM trigger_entries WHERE (date_part('epoch', $1)-1) <= date_part('epoch', entry_time)";
// "SELECT * FROM trigger_entries WHERE entry_time < (CURRENT_TIMESTAMP - 3600)";
// "SELECT * FROM trigger_entries WHERE entry_time >= NOW() - INTERVAL 1 HOUR ORDER BY entry_time DESC";

const getAllSymptomIDs = "SELECT id FROM symptoms";
const getAllTriggerIDs = "SELECT id FROM triggers";

// get ALL entries with symptom_id and trigger_id
const getAllForSymptomAndTrigger =
  "SELECT * FROM related_entries WHERE symptom_id = $1 AND trigger_id = $2";

// get ALL entries with symptom_id and trigger_id where trigger_present == true
const getAllTriggerPresent =
  "SELECT * FROM related_entries WHERE symptom_id = $1 AND trigger_id = $2 AND trigger_present = true";

// get ALL entries with symptom_id and trigger_id where trigger_present == false
const getAllTriggerAbsent =
  "SELECT * FROM related_entries WHERE symptom_id = $1 AND trigger_id = $2 AND trigger_present = false";

const addData =
  "INSERT INTO data_output (symptom_id, trigger_id, present_mean, absent_mean, cohens_d) VALUES ($1, $2, $3, $4, $5)";

const getData =
  "SELECT * FROM data_output WHERE symptom_id = $1 AND trigger_id = $2";

const updateData =
  "UPDATE data_output SET present_mean = $1, absent_mean = $2, cohens_d = $3 WHERE symptom_id = $4 AND trigger_id = $5";

const getAllOutputData = "SELECT * FROM data_output";

const getSignificantData =
  // "SELECT * FROM data_output WHERE cohens_d>=0.5 OR cohens_d <= -0.5";
  "SELECT * FROM data_output WHERE cohens_d>=0.5 ORDER BY cohens_d DESC"; // IF COHENS D IS NEGATIVE ITS HAVING THE OPPOSITE EFFECT????

const getSignificantDataForTrigger =
  "SELECT * FROM data_output WHERE trigger_id = $1 AND cohens_d>=0.5 ORDER BY cohens_d DESC";

const deleteData = "DELETE FROM data_output WHERE id = $1";

const getSignificantTriggers =
  "SELECT trigger_id FROM data_output ORDER BY cohens_d DESC";

const getSignificantSymptomIDs =
  "SELECT symptom_id FROM data_output ORDER BY cohens_d DESC";

const getSymptomNameById = "SELECT name FROM symptoms WHERE id = $1";

const getCompletedSymptomEntries =
  "SELECT * FROM symptom_entries WHERE entry_time >= NOW() - '1 day'::INTERVAL";

module.exports = {
  getRelatedEntriesSymptomID,
  addEntries,
  getAllRelatedEntries,
  getAllEntriesForSymptom,
  getlastSymptomEntry,
  getSymptomEntryById,
  getTriggerEntries,
  getAllForSymptomAndTrigger,
  getAllSymptomIDs,
  getAllTriggerIDs,
  getAllTriggerPresent,
  getAllTriggerAbsent,
  addData,
  getData,
  updateData,
  getAllOutputData,
  getSignificantData,
  deleteData,
  getSignificantDataForTrigger,
  addEntriesManually,
  getSignificantTriggers,
  getSignificantSymptomIDs,
  getSymptomNameById,
  getCompletedSymptomEntries,
  // getRelatedEntriesSymptomTime,
  // deleteAllEntriesForSymptom,
  // deleteAllEntriesForTrigger,
};

// CREATE TABLE related_entries (
//   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   symptom_id INT,
//   trigger_id INT,
//   rating INT,
//   trigger_present BOOLEAN,
//   FOREIGN KEY (symptom_id) REFERENCES symptoms(id),
//   FOREIGN KEY (trigger_id) REFERENCES triggers(id)
// );

// CREATE TABLE data_output (
//   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   symptom_id INT,
//   trigger_id INT,
//   present_mean FLOAT(8),
//   absent_mean FLOAT(8),
//   cohens_d FLOAT(8),
//   FOREIGN KEY (symptom_id) REFERENCES symptoms(id),
//   FOREIGN KEY (trigger_id) REFERENCES triggers(id)
// );
