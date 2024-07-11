const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models/index");
const v1 = require("./routes/v1");
require("dotenv").config();

const port = process.env.PORT || 6005;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/api/v1',v1())

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
