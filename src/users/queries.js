// //GET
const getUsers = "SELECT * FROM users";

const getUserByEmail = "SELECT * FROM users WHERE email = $1";

//post
const addUser = "INSERT INTO users (email, password) VALUES ($1, $2)";

module.exports = {
  getUsers,
  getUserByEmail,
  addUser,
};
