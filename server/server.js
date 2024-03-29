import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
// import data from './data.js';
import productRouter from "./Router/ProductRouter.js";
import userRouter from "./Router/userRouter.js";
import orderRouter from "./Router/OrderRouter.js";
import uploadRouter from "./Router/UploadRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB is Ready"))
  .catch((err) => console.error(err));

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.get('/', (req, res) => {
//     res.send('<h1>Server is Ready one one</h1>');
// });
app.use(express.static(path.join(__dirname, "..", "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client/build/index.html"));
});
// async-handler middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Server is ready at https://localhost:${port}`)
);
