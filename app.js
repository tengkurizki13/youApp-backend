const env = require("dotenv").config();
const express = require("express");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 3030;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  
