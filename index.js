const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASSWORD}@cluster0.fbqmywm.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client
      .db("cleaningService")
      .collection("services");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });
    app.get("/allservices", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);

      app.get("/allservices/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const services = await serviceCollection.findOne(query);
        // const services = serviceCollection.find(
        //   (service) => service._id === id
        // );
        res.send(services);
      });
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", (resq, res) => {
  res.send("All cleaner ruever is running");
});

app.listen(port, (req, res) => {
  console.log(`service server is running on port ${port}`);
});
