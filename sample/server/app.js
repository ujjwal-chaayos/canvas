require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const database = require("./db.js");

app.disable('x-powered-by');
app.use(express.json([]));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_ATLAS || process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("useCreateIndex", true);

app.listen(8000, function () {
    console.log("server running on port 8000");
  });