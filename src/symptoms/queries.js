//GET
const getSymptoms = "SELECT * FROM symptoms";
const getSymptomById = "SELECT * FROM symptoms WHERE id = $1";

const getAllSymptomsForUser = "SELECT * FROM symptoms WHERE user_id = $1";

//post
const addSymptom =
  "INSERT INTO symptoms (name, rating_type, user_id) VALUES ($1, $2, $3)";

module.exports = {
  getSymptoms,
  getSymptomById,
  getAllSymptomsForUser,
  addSymptom,
};
