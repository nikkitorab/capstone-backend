//GET
const getTriggers = "SELECT * FROM triggers";

//post
const addTrigger = "INSERT INTO triggers (name, rating_type) VALUES ($1, $2)";

module.exports = {
  getTriggers,
  addTrigger,
};
