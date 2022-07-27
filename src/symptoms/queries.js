//GET
const getSymptoms = "SELECT * FROM symptoms";

//post
const addSymptom = "INSERT INTO symptoms (name, rating_type) VALUES ($1, $2)";

module.exports = {
  getSymptoms,
  addSymptom,
};
