//GET
const getTriggerEntries = "SELECT * FROM trigger_entries";
const getTriggerEntryById = "SELECT * FROM trigger_entries WHERE id = $1";

//post
const addTriggerEntry =
  "INSERT INTO trigger_entries (occurred, date_id, trigger_id) VALUES ($1, $2, $3)";

module.exports = {
  getTriggerEntries,
  getTriggerEntryById,
  addTriggerEntry,
};
