const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./Config/db");
const { AmazonRouter } = require("./Routers/AmazonRoutes");
const {ProductRouter} = require("./Routers/AmazonProductsRouter")
const cors = require("cors");
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors())
app.use("/", AmazonRouter);
app.use("/", ProductRouter);
app.get("/", (req, res) => {
  req.send("HomePage");
});

app.listen(PORT, async () => {
  await connection;
  try {
    console.log("Connected to db");
  } catch {
    console.log("error in db");
  }
  console.log(`running on port ${PORT}`);
});
