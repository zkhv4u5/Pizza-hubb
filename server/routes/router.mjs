import express from "express";
import db from "../db/conn.mjs";
import { ObjectId, MongoClient } from "mongodb";

const router = express.Router();

const order = router.get("/api/order/:id", async (req, res) => {
    let collection = await db.collection("Order");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });
  
const pizza = router.get("/api/menu/:id", async (req, res) => {
    let collection = db.collection("Menu");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});
  
const user = router.get("/api/user/:id", async (req, res) => {
    let collection = await db.collection("user");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});  
  

// This section will help you get a list of all the menu items.
//   router.get("/menu", async (req, res) => {
//   let collection = await db.collection("menu");
//   let results = await collection.find({}).toArray();
//   res.send(results).status(200);
// });

router.get("/api/menu", async (req, res) => {
    const client = new MongoClient(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    await client.connect();
    const db = client.db("web-pizza");
    let collection = db.collection("Menu");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  });

// This section will help you get a single menu item by id
router.get("/api/menu/:id", async (req, res) => {
  let collection = await db.collection("Menu");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new menu item.
router.post("/api/menu", async (req, res) => {
  let newDocument = {
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [String],
    price: { type: Number, required: true },
    image_url: { type: String, required: true },
  };
  let collection = await db.collection("Menu");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a menu item by id.
router.patch("/api/menu/:id", async (req, res) => {
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

  let collection = await db.collection("Menu");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/api/menu/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("Menu");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

  // This section will help you get a list of all the orders.
  router.get("/api/order", async (req, res) => {
    let collection = await db.collection("Order");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  });
  
  // This section will help you get a single record by id
  router.get("/api/order/:id", async (req, res) => {
    let collection = await db.collection("Order");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });
  
  // This section will help you create a new record.
  router.post("/api/order", async (req, res) => {
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
  router.patch("/api/order/:id", async (req, res) => {
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
  router.delete("/api/order/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
  
    const collection = db.collection("Order");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
  });


  // This section will help you get a list of all the users.
  router.get("/api/user", async (req, res) => {
    let collection = await db.collection("user");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  });
  
  // This section will help you get a single record by id
  router.get("/api/user/:id", async (req, res) => {
    let collection = await db.collection("user");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });
  
  // This section will help you create a new record.
  router.post("/api/user", async (req, res) => {
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
  router.patch("/api/user/:id", async (req, res) => {
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
  router.delete("/api/user/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
  
    const collection = db.collection("user");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
  });
  
export default router;