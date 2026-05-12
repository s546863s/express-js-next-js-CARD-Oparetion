 require('dotenv').config();
const express = require("express");

const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 8000;
app.use(cors())
app.use(express.json());
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run = async ()=>{

try{
    await client.connect();
  // Get the database and collection on which to run the operation
    // const database = client.db("sample_mflix");
    // const movies = database.collection("movies");

  // Get the database and collection on which to run the operation

    const db = client.db("simpleCrud");
    const userCollection = db.collection("users");
    
app.get('/users', async(req, res) =>{

    
    // Execute query Cursor added here
    const cursor =  userCollection.find();
    const result = await cursor.toArray();
    res.send(result);



})




    await client.db("admin").command({ping: 1});
    console.log("Connected to MongoDB")
}
finally{

// await client.close();

}
}
run().catch(console.dir)


app.get("/", (req, res) =>{
    res.send("Simple CRUD server is serving You!")
})



app.listen(port, ()=>{
    console.log(`Simple CRUD server is running on port http://localhost:${port}`)
})




