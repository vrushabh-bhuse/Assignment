const express = require("express");
const mongoose = require("mongoose");
PORT = 1212;
const app = express();
require("dotenv").config();

//Environment variables which are declared in dotenv files



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

//db Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Product_TT")
  .then((res) => console.log("database connected"))
  .catch((err) => console.log("Error: " + err));
// db End

const mainRoutes = require("./routes/userRoutes");

//User routes for all crud operatins
app.use("/", mainRoutes);

//Error handling for wrong route
app.use("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`work on ${PORT}`);
});
