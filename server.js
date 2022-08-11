const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

// const Statistics = require("statistics");

// const datesRoutes = require("./src/dates/routes");
const symptomsRoutes = require("./src/symptoms/routes");
const triggersRoutes = require("./src/triggers/routes");
const symptomEntryRoutes = require("./src/symptom_entries/routes");
const triggerEntryRoutes = require("./src/trigger_entries/routes");

const usersRoutes = require("./src/users/routes");
const entryDataRoutes = require("./src/entries/routes");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(Statistics());

// ROUTES
// app.use("/dates", datesRoutes);
app.use("/symptoms", symptomsRoutes);
app.use("/triggers", triggersRoutes);
app.use("/symptom-entries", symptomEntryRoutes);
app.use("/trigger-entries", triggerEntryRoutes);

app.use("/users", usersRoutes);
app.use("/entries", entryDataRoutes);

const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}`));
