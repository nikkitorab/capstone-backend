//sql queries

//get
const getDates = "SELECT * FROM dates";
const getDateById = "SELECT * FROM dates WHERE id = $1";

//post
const addDate = "INSERT INTO dates (date) VALUES ($1)";

module.exports = {
  getDates,
  getDateById,
  addDate,
};
