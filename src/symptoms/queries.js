//GET
const getSymptoms = "SELECT * FROM symptoms";
const getSymptomById = "SELECT * FROM symptoms WHERE id = $1";

//post
const addSymptom = "INSERT INTO symptoms (name, rating_type) VALUES ($1, $2)";

module.exports = {
  getSymptoms,
  getSymptomById,
  addSymptom,
};
