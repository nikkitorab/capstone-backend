// this is for ONE symptom
const getRelatedEntriesSymptomID =
  "SELECT * FROM symptom_entries CROSS JOIN trigger_entries WHERE symptom_entries.symptom_id = $1 AND (date_part('epoch', symptom_entries.entry_time)- 1) <= date_part('epoch', trigger_entries.entry_time) AND (date_part('epoch', trigger_entries.entry_time)+12) >= date_part('epoch', symptom_entries.entry_time) ";

const getRelatedEntriesTriggerID =
  "SELECT * FROM trigger_entries CROSS JOIN symptom_entries WHERE trigger_entries.trigger_id = $1 AND (date_part('epoch', symptom_entries.entry_time)- 1) <= date_part('epoch', trigger_entries.entry_time) AND (date_part('epoch', trigger_entries.entry_time)+12) >= date_part('epoch', symptom_entries.entry_time) ";
// get ALL related entries for ALL symptoms

const getEntriesData = "SELECT * FROM entries_data";

//post
const addEntryData =
  "INSERT INTO entries_data (symptom_id, trigger_id, trigger_present, trigger_absent, trigger_present_count, trigger_absent_count) VALUES ($1, $2, $3, $4, $5, $6)";

// "SELECT * FROM symptom_entries CROSS JOIN trigger_entries WHERE symptom_entries.symptom_id = $1 AND (symptom_entries.entry_time - 1) <= trigger_entries.entry_time AND (trigger_entries.entry_time+12) >= symptom_entries.entry_time ";
// to_timestamp(extract(epoch from DATE)/2)
module.exports = {
  getRelatedEntriesSymptomID,
  getRelatedEntriesTriggerID,
  getEntriesData,
  addEntryData,
  // getSymptomEntries,
  // getSymptomEntryById,
  // addSymptomEntry,
  // getAllEntriesForSymptom,
  // deleteAllEntriesForSymptom,
  // deleteSymptomEntry,
};
