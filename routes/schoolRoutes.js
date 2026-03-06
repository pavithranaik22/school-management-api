const express = require("express");
const router = express.Router();
const db = require("../db");


// ADD SCHOOL API
router.post("/addSchool", (req, res) => {

  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({ message: "Latitude and Longitude must be numbers" });
  }

  const query = "INSERT INTO schools (name,address,latitude,longitude) VALUES (?,?,?,?)";

  db.query(query, [name, address, latitude, longitude], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "School added successfully",
      schoolId: result.insertId
    });
  });
});



// LIST SCHOOLS API
router.get("/listSchools", (req, res) => {

  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (!userLat || !userLon) {
    return res.status(400).json({ message: "User latitude and longitude required" });
  }

  const query = "SELECT * FROM schools";

  db.query(query, (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    const schoolsWithDistance = results.map((school) => {

      const distance = Math.sqrt(
        Math.pow(userLat - school.latitude, 2) +
        Math.pow(userLon - school.longitude, 2)
      );

      return { ...school, distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  });

});

module.exports = router;