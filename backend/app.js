const express = require("express");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Node.js Backend!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
