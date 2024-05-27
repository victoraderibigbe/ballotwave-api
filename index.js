const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");

const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

const userRoute = require("./Routes/user.route");
app.use("/", userRoute);

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

