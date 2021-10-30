const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require("dotenv").config();
const app = express();
const cors = require('cors');
const port = process.env.DB_PORT || 5000;

// used middleware ---------------------------------->

app.use(cors());
app.use(express.json());

// mongodb start ------------------------------->

app.get("/", (req, res) => {
    res.send("hello world this is home page at express js!")
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lvyry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
        const database = client.db("Tevily");
        const ServiceCollection = database.collection("Services");
        const cartColletcion = database.collection("cart");
        
        // post api data --------------------------> 
        app.post("/services", async (req, res) => {
            const result = await ServiceCollection.insertOne(req.body);
            res.json(result);
        })

        // cart post data -------------------------->

        app.post("/cart", async (req, res) => {
            const result = await cartColletcion.insertOne(req.body)
            res.json(result);
        })
        
        // delete cart data ---------------->

        app.delete("/cart/:id", async (req, res) => {
            const id = req.params.id;
            const query = {_id : ObjectId(id)}
            const result = await cartColletcion.deleteOne(query);
            res.json(result);
        })

        // update cart data --------------------------->

        app.put("/cart/:id", async (req, res) => {
            const id = req.params.id;
            const updateStatus = req.body;
            const options = { upsert: true };
            const query = { _id: ObjectId(id) };
            const updatePackage = {
                $set: { status: "Approved" }
            }
            const result = await cartColletcion.updateOne(query,updatePackage,options);
            res.json(result);
        })

        // cart get ----------------->

        app.get("/cart", async (req, res) => {
            const show_result = await cartColletcion.find({}).toArray();
            res.send(show_result);
        })

        // get api data ------------------------->

        app.get("/services", async (req, res) => {
            const show_api = await ServiceCollection.find({}).toArray();
            res.send(show_api);
        })
    //  
    }
    finally
    {
        // await client.close();
    }
  }
  run().catch(console.dir);


// express server listened ------------------------>

app.listen(port, () => console.log(`express port is ${port}`));