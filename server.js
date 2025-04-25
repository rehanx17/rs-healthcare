
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// POST route to handle form data
app.post("/api/book", (req, res) => {
  const formData = req.body;
  const filePath = path.join(__dirname, "appointments.json");

  let appointments = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    appointments = JSON.parse(fileData);
  }

  appointments.push(formData);
  fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2));

  res.json({ message: "Appointment saved!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
