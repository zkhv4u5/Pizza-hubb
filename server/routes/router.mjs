import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

const order = router.get("/order/:id", async (req, res) => {
    let collection = await db.collection("Order");
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
  
const user = router.get("/user/:id", async (req, res) => {
    let collection = await db.collection("user");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});  
  

// This section will help you get a list of all the menu items.
  router.get("/menu", async (req, res) => {
  let collection = await db.collection("menu");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single menu item by id
router.get("/menu/:id", async (req, res) => {
  let collection = await db.collection("menu");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new menu item.
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

  // This section will help you get a list of all the orders.
  router.get("/order", async (req, res) => {
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