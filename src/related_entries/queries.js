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

module.exports = {
  getRelatedEntriesSymptomID,
  addEntries,
  getAllRelatedEntries,
  getAllEntriesForSymptom,
  getlastSymptomEntry,
  getSymptomEntryById,
  getTriggerEntries,
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
