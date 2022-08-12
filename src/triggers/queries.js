//GET
const getTriggers = "SELECT * FROM triggers";
const getTriggerById = "SELECT * FROM triggers WHERE id = $1";

const getAllTriggersForUser = "SELECT * FROM triggers WHERE user_id = $1";

//post
const addTrigger =
  "INSERT INTO triggers (name, rating_type, user_id) VALUES ($1, $2, $3) RETURNING id";

//delete
// const deleteEntryDataFK = "DELETE FROM entries_data WHERE trigger_id = $1";
const deleteDataTriggerID = "DELETE FROM data_output WHERE trigger_id = $1";

const deleteAllEntriesForTrigger =
  "DELETE FROM related_entries WHERE trigger_id = $1";
const deleteTriggerEntriesFK =
  "DELETE FROM trigger_entries WHERE trigger_id = $1";
const deleteTrigger = "DELETE FROM triggers WHERE id = $1";

module.exports = {
  getTriggers,
  getTriggerById,
  getAllTriggersForUser,
  addTrigger,
  deleteTriggerEntriesFK,
  deleteTrigger,
  deleteAllEntriesForTrigger,
  deleteDataTriggerID,
  // deleteEntryDataFK,
};
