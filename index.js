const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (resq, res) => {
  res.send("All cleaner ruever is running");
});

app.listen(port, (req, res) => {
  console.log(`service server is running on port ${port}`);
});
