//GET
const getSymptomEntries = "SELECT * FROM symptom_entries";

const getSymptomEntryById = "SELECT * FROM symptom_entries WHERE id = $1";

//post
const addSymptomEntry =
  "INSERT INTO symptom_entries (rating, date_id, symptom_id) VALUES ($1, $2, $3)";

module.exports = {
  getSymptomEntries,
  getSymptomEntryById,
  addSymptomEntry,
};
