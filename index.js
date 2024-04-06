const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, './frontend')));

app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "./frontend/index.html"));
});

app.listen(port, () => {
  console.log(`Sucessfully available at ${port}`);
});
