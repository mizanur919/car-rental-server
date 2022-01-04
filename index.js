const express = require("express");
const app = express();
const port = process.env.port || 5000;
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

//Middleware
app.use(cors());
app.use(express.json());

// Database Configuration
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4b6iz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
    const servicesCollection = database.collection("services");
    const brandsCollection = database.collection("brands");
    const modelsCollection = database.collection("models");
    const rentsCollection = database.collection("rents");
    const reviewsCollection = database.collection("reviews");
    const usersCollection = database.collection("users");

    ///////////////////////////////
    ////// Brands API Starts //////
    ///////////////////////////////

    /// Get All Brands ///
    app.get("/brands", async (req, res) => {
      const cursor = brandsCollection.find({});
      const brands = await cursor.toArray();
      res.send(brands);
    });

    /// Get Single Brand Data ///
    app.get("/brands/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const singleBrand = await brandsCollection.findOne(query);
      res.json(singleBrand);
    });

    /// Post Brand Data ///
    app.post("/brands/add", async (req, res) => {
      const brand = req.body;
      const result = await brandsCollection.insertOne(brand);
      res.json(result);
    });

    /// Delete Single Brand Data ///
    app.delete("/brands/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await brandsCollection.deleteOne(query);
      res.json(result);
    });

    /// Update Single Brand ///
    app.put("/brands/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBrand = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedData = {
        $set: {
          name: updatedBrand.name,
          image: updatedBrand.image,
          origin: updatedBrand.origin,
        },
      };
      const result = await brandsCollection.updateOne(
        filter,
        updatedData,
        options
      );
      res.json(result);
    });

    //////////////////////////////
    ////// Model API Starts //////
    //////////////////////////////

    /// Get All Brands ///
    app.get("/models", async (req, res) => {
      const cursor = modelsCollection.find({});
      const models = await cursor.toArray();
      res.send(models);
    });

    /// Get Single Brand Data ///
    app.get("/models/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const singleModel = await modelsCollection.findOne(query);
      res.json(singleModel);
    });

    /// Post Brand Data ///
    app.post("/models/add", async (req, res) => {
      const model = req.body;
      const result = await modelsCollection.insertOne(model);
      res.json(result);
    });

    /// Delete Single Brand Data ///
    app.delete("/models/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await modelsCollection.deleteOne(query);
      res.json(result);
    });

    /// Update Single Brand ///
    app.put("/models/:id", async (req, res) => {
      const id = req.params.id;
      const updatedModel = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedData = {
        $set: {
          brandName: updatedModel.brandName,
          modelName: updatedModel.modelName,
        },
      };
      const result = await modelsCollection.updateOne(
        filter,
        updatedData,
        options
      );
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("I am from server port 5000");
});

app.listen(port, () => {
  console.log("Listening port ", port);
});
