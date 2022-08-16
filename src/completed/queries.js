const getCompletedSymptomEntries =
  "SELECT * FROM symptom_entries WHERE entry_time >= NOW() - '1 day'::INTERVAL";

const getCompletedTriggerEntries =
  "SELECT * FROM trigger_entries WHERE entry_time >= NOW() - '1 day'::INTERVAL";
module.exports = {
  getCompletedSymptomEntries,
  getCompletedTriggerEntries,
};
