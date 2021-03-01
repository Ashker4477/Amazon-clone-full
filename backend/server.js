import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

//app.use('/register',express.static("front-end/build"));
//app.use('/signin',express.static("front-end/build"));
//app.use('/orderhistory',express.static("front-end/build"));
//app.use('/order/:id',express.static("front-end/build"));
//app.use('/orders',express.static("front-end/build"));          
//app.use('/shipping',express.static("front-end/build"));
//app.use('/payment',express.static("front-end/build"));
//app.use('/placeorder',express.static("front-end/build"));
//app.use('/cart/:id?',express.static("front-end/build"));
//app.use('/cart',express.static("front-end/build"));
//app.use('/product/:id',express.static("front-end/build"));
//app.use("/",express.static("front-end/build"));

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});
