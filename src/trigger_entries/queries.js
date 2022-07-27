//GET
const getTriggerEntries = "SELECT * FROM trigger_entries";

//post
const addTriggerEntry =
  "INSERT INTO trigger_entries (occurred, date_id, trigger_id) VALUES ($1, $2, $3)";

module.exports = {
  getTriggerEntries,
  addTriggerEntry,
};
