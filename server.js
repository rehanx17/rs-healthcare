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

// API route
app.post("/api/book", (req, res) => {
  const formData = req.body;
  const filePath = path.join(__dirname, "appointments.json");

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  let appointments = JSON.parse(fs.readFileSync(filePath));
  appointments.push(formData);
  fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2));

  res.json({ message: "Appointment saved!" });
});

// Serve the main HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
