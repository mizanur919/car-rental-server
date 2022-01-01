const express = require("express");
const app = express();
const port = process.env.port || 5000;
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const { listen } = require("express/lib/application");

// Middleware
app.use(cors());
app.use(express.json());

// Database Configuration
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4b6iz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Run Function
async function run() {
  try {
    await client.connect();
    const database = client.db("car_rental");

    // Collections
  } finally {
    // await client.close();
  }
}

app.get("/", (req, res) => {
  res.send("I am from server port 5000");
});

app.listen(port, () => {
  console.log("Listening port ", port);
});
