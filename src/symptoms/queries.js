//GET
const getSymptoms = "SELECT * FROM symptoms";
const getSymptomById = "SELECT * FROM symptoms WHERE id = $1";

const getAllSymptomsForUser = "SELECT * FROM symptoms WHERE user_id = $1";

//post
const addSymptom =
  "INSERT INTO symptoms (name, rating_type, user_id) VALUES ($1, $2, $3) RETURNING id";
// put this in post request:
// when new symptom is created, update entries_data table to have rows for it

//delete
// const deleteEntryDataFK = "DELETE FROM entries_data WHERE symptom_id = $1";
const deleteDataSymptomID = "DELETE FROM data_output WHERE symptom_id = $1";

const deleteSymptomEntriesFK =
  "DELETE FROM symptom_entries WHERE symptom_id = $1";

const deleteAllEntriesForSymptom =
  "DELETE FROM related_entries WHERE symptom_id = $1";

const deleteSymptom = "DELETE FROM symptoms WHERE id = $1";

module.exports = {
  getSymptoms,
  getSymptomById,
  getAllSymptomsForUser,
  addSymptom,
  deleteSymptomEntriesFK,
  deleteSymptom,
  deleteDataSymptomID,
  deleteAllEntriesForSymptom,
};
