//GET
const getTriggers = "SELECT * FROM triggers";
const getTriggerById = "SELECT * FROM triggers WHERE id = $1";

const getAllTriggersForUser = "SELECT * FROM triggers WHERE user_id = $1";

//post
const addTrigger =
  "INSERT INTO triggers (name, rating_type, user_id) VALUES ($1, $2, $3)";

//delete
const deleteTrigger = "DELETE FROM triggers WHERE id = $1";

module.exports = {
  getTriggers,
  getTriggerById,
  getAllTriggersForUser,
  addTrigger,
  deleteTrigger,
};
