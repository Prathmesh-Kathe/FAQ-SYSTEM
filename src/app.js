const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db");
const faqRoutes = require("./routes/faqRoutes");
const faqRoutes2 = require('./routes/adminRoute')

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure correct path

app.use("/api", faqRoutes);
app.use("/" , faqRoutes2)


module.exports = app;
