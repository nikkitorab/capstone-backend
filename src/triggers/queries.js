//GET
const getTriggers = "SELECT * FROM triggers";
const getTriggerById = "SELECT * FROM triggers WHERE id = $1";

//post
const addTrigger = "INSERT INTO triggers (name, rating_type) VALUES ($1, $2)";

module.exports = {
  getTriggers,
  getTriggerById,
  addTrigger,
};
