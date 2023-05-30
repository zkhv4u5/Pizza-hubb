import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the menu items.
const allItems = router.get("/menu", async (req, res) => {
  let collection = await db.collection("menu");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/menu/:id", async (req, res) => {
  let collection = await db.collection("menu");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/menu", async (req, res) => {
  let newDocument = {
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [String],
    price: { type: Number, required: true },
    image_url: { type: String, required: true },
  };
  let collection = await db.collection("menu");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a menu item by id.
router.patch("/menu/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [String],
    price: { type: Number, required: true },
    image_url: { type: String, required: true },
  }
  };

  let collection = await db.collection("menu");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/menu/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("menu");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

const routes = {router, allItems}
export default router;