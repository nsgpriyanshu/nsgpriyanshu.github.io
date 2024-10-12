const express = require("express");
const path = require("path");
const RateLimit = require("express-rate-limit");

const app = express();
const port = 3000;

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// Apply rate limiter to all requests
app.use(limiter);

app.use("/", express.static(path.join(__dirname, "./frontend")));

app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "./frontend/index.html"));
});

app.listen(port, () => {
  console.log(`Successfully available at ${port}`);
});
