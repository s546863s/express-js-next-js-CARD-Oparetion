require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

// env
const uri = process.env.MONGODB_URI;

// Mongo client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// global collection
let userCollection;

// main function
const run = async () => {
  try {
    await client.connect();

    const db = client.db("simpleCrud");
    userCollection = db.collection("users");

    console.log("MongoDB Connected");

// GET all users
    app.get("/users", async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

// GET single user
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;

      const user = await userCollection.findOne({
        _id: new ObjectId(id),
      });

      res.send(user);
    });
    // data Post
    app.post('/users', async (req, res)=>{

      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    })
    // data Delete 
    app.delete('/users/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const result = await userCollection.deleteOne(query);
      res.send(result); 


    })

// server check
    await client.db("admin").command({ ping: 1 });
    console.log("Ping success ✅");

  } catch (error) {
    console.error(error);
  }
};

run().catch(console.dir);

// root route
app.get("/", (req, res) => {
  res.send("Simple CRUD server is running 🚀");
});



// server listen
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});