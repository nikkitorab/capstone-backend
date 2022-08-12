//GET
const getSymptomEntries = "SELECT * FROM symptom_entries";

const getSymptomEntryById = "SELECT * FROM symptom_entries WHERE id = $1";

// get symptom_entries by symptom_id (fk)
const getAllEntriesForSymptom =
  "SELECT * FROM symptom_entries WHERE symptom_id = $1";

//DELETE ALL ENTRIES WITH SYMPTOM_ID (FK)
const deleteAllEntriesForSymptom =
  "DELETE * FROM symptom_entries WHERE id = $1";

const getlastSymptomEntry =
  "SELECT * FROM symptom_entries WHERE id = (SELECT MAX(id) FROM symptom_entries)";

const deleteSymptomEntry = "DELETE FROM symptom_entries WHERE id = $1";

const getRelatedEntriesSymptomTime =
  // "SELECT * FROM symptom_entries CROSS JOIN trigger_entries WHERE symptom_entries.id = $1 AND (date_part('epoch', symptom_entries.entry_time)- 1) <= date_part('epoch', trigger_entries.entry_time) AND (date_part('epoch', trigger_entries.entry_time)+12) >= date_part('epoch', symptom_entries.entry_time) ";

  "SELECT * FROM trigger_entries WHEREdate_part('epoch', $1) >= (date_part('epoch', trigger_entries.entry_time)-1) AND (date_part('epoch', trigger_entries.entry_time)+12) >= date_part('epoch', $1) ";

const addEntries =
  "INSERT INTO related_entries (symptom_id, trigger_id, rating, trigger_present) VALUES ($1, $2, $3,$4)";

//post
const addSymptomEntry =
  "INSERT INTO symptom_entries (rating, entry_time, symptom_id) VALUES ($1, $2, $3) RETURNING id";

module.exports = {
  getSymptomEntries,
  getSymptomEntryById,
  addSymptomEntry,
  getAllEntriesForSymptom,
  deleteAllEntriesForSymptom,
  deleteSymptomEntry,
  getlastSymptomEntry,
  getRelatedEntriesSymptomTime,
  addEntries,
};
