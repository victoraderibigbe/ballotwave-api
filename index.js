const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
let URI = process.env.MONGO_URI;
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
const userRoute = require("./Routes/user.route");
app.use("/user", userRoute);
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Port has started at ${PORT}`);
});

console.log("I Am working");
