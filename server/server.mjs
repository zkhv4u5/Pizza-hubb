import express from "express";
import cors from "cors";
import pizza from "./routes/menu.mjs";
import user from "./routes/user.mjs";
import order from "./routes/order.mjs";
import router from "./routes/router.mjs";
import out from "./db/conn.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// app.use("/menu", pizza);
// app.use("/user", user);
// app.use("/order", order);

app.use("/",router)

// start the Express server
out.connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});