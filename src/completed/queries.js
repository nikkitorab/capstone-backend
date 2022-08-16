const getCompletedSymptomEntries =
  "SELECT symptom_id FROM symptom_entries WHERE entry_time >= NOW() - '1 day'::INTERVAL";

const getCompletedTriggerEntries =
  "SELECT trigger_id FROM trigger_entries WHERE entry_time >= NOW() - '1 day'::INTERVAL";
module.exports = {
  getCompletedSymptomEntries,
  getCompletedTriggerEntries,
};
