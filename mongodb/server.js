
const express = require("express");
const cors = require("cors");

const app = express();

const initRoutes = require("./app/routes/picture.routes");

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// let port = 8080;
// app.listen(port, () => {
//   console.log(`Running at localhost:${port}`);
// });


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome Kopro mongodb connector" });
});

require("./app/routes/skill_human.routes")(app);
require("./app/routes/skill_robot.routes")(app);
require("./app/routes/criteria.routes")(app);
require("./app/routes/assembly_sequence_plan_details.routes")(app);
require("./app/routes/dimension_per_component.routes")(app);
require("./app/routes/working_area.routes")(app);
require("./app/routes/assembly_sequence_step_detail.routes")(app);
require("./app/routes/heart_rate_sensor.routes")(app);
require("./app/routes/imu_sensor.routes")(app);
require("./app/routes/brain_sensor.routes")(app);
require("./app/routes/skin_sensor.routes")(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {  
  console.log(`Server is running on port ${PORT}.`);
});


