// //GET
// const getSymptomEntries = "SELECT * FROM symptom_entries";

// const getSymptomEntryById = "SELECT * FROM symptom_entries WHERE id = $1";

// // get symptom_entries by symptom_id (fk)
// const getAllEntriesForSymptom =
//   "SELECT * FROM symptom_entries WHERE symptom_id = $1";

// //DELETE ALL ENTRIES WITH SYMPTOM_ID (FK)
// const deleteAllEntriesForSymptom =
//   "DELETE * FROM symptom_entries WHERE id = $1";

// const deleteSymptomEntry = "DELETE FROM symptom_entries WHERE id = $1";

// //post
// const addSymptomEntry =
//   "INSERT INTO symptom_entries (rating, entry_time, symptom_id) VALUES ($1, $2, $3)";

// const get table of entries:
const getRelatedEntries =
  "SELECT * FROM symptom_entries CROSS JOIN trigger_entries WHERE symptom_entries.symptom_id = $1 AND (date_part('epoch', symptom_entries.entry_time)- 1) <= date_part('epoch', trigger_entries.entry_time) AND (date_part('epoch', trigger_entries.entry_time)+12) >= date_part('epoch', symptom_entries.entry_time) ";

// "SELECT * FROM symptom_entries CROSS JOIN trigger_entries WHERE symptom_entries.symptom_id = $1 AND (symptom_entries.entry_time - 1) <= trigger_entries.entry_time AND (trigger_entries.entry_time+12) >= symptom_entries.entry_time ";
// to_timestamp(extract(epoch from DATE)/2)
module.exports = {
  getRelatedEntries,
  // getSymptomEntries,
  // getSymptomEntryById,
  // addSymptomEntry,
  // getAllEntriesForSymptom,
  // deleteAllEntriesForSymptom,
  // deleteSymptomEntry,
};

// t1 = symptom_entries
// t2 = trigger_entries

// SELECT id,id FROM symptom_entries
// CROSS JOIN trigger_entries
// WHERE (symptom_entries.entry_time - 1) <= trigger_entries.entry_time AND (trigger_entries.entry_time+12) >= symptom_entries.entry_time;

// SELECT id, id
// FROM symptom_entries
// INNER JOIN trigger_entries WHERE (symptom_entries.entry_time - 1) <= trigger_entries.entry_time AND (trigger_entries.entry_time+12) >= symptom_entries.entry_time
// ON table1.common_filed = table2.common_field;

// WHERE condition1 OR condition2 OR condition3 ...;
