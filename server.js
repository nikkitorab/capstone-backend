const express = require("express");
const bodyParser = require("body-parser");

const datesRoutes = require("./src/dates/routes");
const symptomsRoutes = require("./src/symptoms/routes");
const triggersRoutes = require("./src/triggers/routes");
const symptomEntryRoutes = require("./src/symptom_entries/routes");
const triggerEntryRoutes = require("./src/trigger_entries/routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

app.get("/", (request, response) => {
  response.send("Hello world");
});

//route that leads to dates routes
app.use("/api/v1/dates", datesRoutes);

//route that leads to symptoms routes
app.use("/api/v1/symptoms", symptomsRoutes);

//route that leads to triggers routes
app.use("/api/v1/triggers", triggersRoutes);

//route that leads to symptom_entries routes
app.use("/api/v1/symptom-entries", symptomEntryRoutes);

//route that leads to trigger_entries routes
app.use("/api/v1/trigger-entries", triggerEntryRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
