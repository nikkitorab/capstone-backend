const pool = require("../../db");
const queries = require("./queries").default;
const bcrypt = require("bcrypt");

//GET

//query database, get json response from users, send it back
const getUsers = (request, response) => {
  //sql query:
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    //if response status is OK, return all rows in triggers table
    response.status(200).json(results.rows);
  });
};

//POST: CREATE NEW user
const addUser = async (request, response) => {
  //************ PASSWORD: **********************
  // 1. create salt 2. use the salt and the password to create a hashed password
  // Purpose of salt: if we hash a normal password, any repeat passwords between ...
  // ... users will have the same hash in the db --> NOT SECURE
  // So add some kind of salt to the beginning of the password before hashing it
  // salt is different for every single user (so hash will be different even is password is the same)
  // ********************************************
  // generate salt for password (use await bc its an asynchronous function)
  // create hashed password + append salt (10 is default for salt)
  const hashedPassword = await bcrypt.hash(request.body.password, 10);

  const email = request.body.email;
  //add user to db
  pool.query(queries.addUser, [email, hashedPassword], (error, results) => {
    if (error) {
      throw error;
    }
    //if response status is OK, user has been created successfully:
    response.status(201).send("user created successfully!");
  });
};

// POST - EXISTING USER LOGIN
const loginUser = (request, response) => {
  const email = request.body.email;

  pool.query(queries.getUserByEmail, [email], async (error, results) => {
    if (error) {
      throw error;
    } else {
      const user = results.rows[0];
      console.log("***");
      console.log(user);

      if (user == null) {
        //user with that email doesn't exist
        return response.status(400).send("User not found");
      } else {
        //check if request.body.password == user.password
        if (await bcrypt.compare(request.body.password, user.password)) {
          //passwords match
          response.status(201).send("User logged in successfully!");
        } else {
          response.send("Incorrect password"); // status code?
        }
      }
    }
  });
};

module.exports = {
  getUsers,
  addUser,
  loginUser,
};
