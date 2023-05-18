import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

const pizza = router.get("/menu/:id", async (req, res) => {
  let collection = await db.collection("menu");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
})

const order = router.get("/order/:id", async (req, res) => {
  let collection = await db.collection("Order");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


// This section will help you get a list of all the users.
router.get("/user", async (req, res) => {
  let collection = await db.collection("user");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/user/:id", async (req, res) => {
  let collection = await db.collection("user");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/user", async (req, res) => {
  let newDocument = {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    orders: [
      {
        order_id: order.ObjectId,
        date: { type: Date, default: Date.now },
        items: [
          {
            item_id: pizza.ObjectId,
            name: pizza.name,
            quantity: Number,
            price: pizza.price,
          },
        ],
        total: Number,
        status: String,
      },
    ],
  };
  let collection = await db.collection("user");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/user/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
    }
  };

  let collection = await db.collection("user");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/user/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("user");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;