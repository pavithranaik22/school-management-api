const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", schoolRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/listSchools", (req, res) => {
  res.json({
    message: "API working on Render",
    status: "success"
  });
});