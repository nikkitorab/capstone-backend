const getCompletedSymptomEntries =
  "SELECT * FROM symptom_entries WHERE entry_time >= NOW() - '1 day'::INTERVAL";

const getSymptoms = "SELECT * FROM symptoms";
const getTriggers = "SELECT * FROM triggers";

const getCompletedTriggerEntries =
  "SELECT * FROM trigger_entries WHERE entry_time >= NOW() - '1 day'::INTERVAL";
module.exports = {
  getCompletedSymptomEntries,
  getCompletedTriggerEntries,
  getSymptoms,
  getTriggers,
};
