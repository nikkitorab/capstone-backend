//GET
const getSymptomEntries = "SELECT * FROM symptom_entries";

const getSymptomEntryById = "SELECT * FROM symptom_entries WHERE id = $1";

// get symptom_entries by symptom_id (fk)
const getAllEntriesForSymptom =
  "SELECT * FROM symptom_entries WHERE symptom_id = $1";

//DELETE ALL ENTRIES WITH SYMPTOM_ID (FK)
const deleteAllEntriesForSymptom =
  "DELETE * FROM symptom_entries WHERE id = $1";

const deleteSymptomEntry = "DELETE FROM symptom_entries WHERE id = $1";

//post
const addSymptomEntry =
  "INSERT INTO symptom_entries (rating, entry_time, symptom_id) VALUES ($1, $2, $3)";

module.exports = {
  getSymptomEntries,
  getSymptomEntryById,
  addSymptomEntry,
  getAllEntriesForSymptom,
  deleteAllEntriesForSymptom,
  deleteSymptomEntry,
};
