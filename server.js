const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const symptomsRoutes = require("./src/symptoms/routes");
const triggersRoutes = require("./src/triggers/routes");
const symptomEntryRoutes = require("./src/symptom_entries/routes");
const triggerEntryRoutes = require("./src/trigger_entries/routes");

const usersRoutes = require("./src/users/routes");

const completedRoutes = require("./src/completed/routes");

const relatedEntriesRoutes = require("./src/related_entries/routes");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use("/symptoms", symptomsRoutes);
app.use("/triggers", triggersRoutes);
app.use("/symptom-entries", symptomEntryRoutes);
app.use("/trigger-entries", triggerEntryRoutes);

app.use("/users", usersRoutes);
app.use("/related-entries", relatedEntriesRoutes);

app.use("/completed", completedRoutes);

// const port = 3000;

// app.listen(port, () => console.log(`app listening on port ${port}`));

app.listen(process.env.PORT, () =>
  console.log(`app listening on port ${process.env.PORT}`)
);
