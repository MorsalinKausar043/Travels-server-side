const express = require('express');
const { MongoClient } = require('mongodb');
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
      // create a document to insert
      const doc = {
        title: "hello world this is express js new database and updata api get data",
        content: "No bytes, no problem. Just insert a document, in MongoDB",
        }
        
        // post api data --------------------------> 
        app.post("/services", async (req, res) => {
            const result = await ServiceCollection.insertOne(req.body);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result);
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