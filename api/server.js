const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// require("dotenv").config();
dotenv.config({
  path: "./.env",
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Kết nối MongoDB
//Check change
const PASSWORD = process.env.DB_PASSWORD;
const USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
console.log(PASSWORD);
const URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.t8ywafb.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Định nghĩa schema và model
const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

// Định nghĩa các route
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
