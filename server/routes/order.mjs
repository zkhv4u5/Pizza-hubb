import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";


const router = express.Router();

const user = router.get("/user/:id", async (req, res) => {
  let collection = await db.collection("user");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

const pizza = router.get("/menu/:id", async (req, res) => {
  let collection = await db.collection("menu");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});



// This section will help you get a list of all the orders.
router.get("/", async (req, res) => {
  let collection = await db.collection("Order");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/order/:id", async (req, res) => {
  let collection = await db.collection("Order");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/order", async (req, res) => {
  let newDocument = {
    user: { type: user, required: true },
    date: { type: Date, default: Date.now },
    items: [
      {
        pizza: { type: pizza.name, required: true },
        quantity: { type: Number, required: true },
        price: { type: pizza.price, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, required: true },
  };
  let collection = await db.collection("Order");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/order/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
    }
  };

  let collection = await db.collection("Order");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/order/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("Order");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;