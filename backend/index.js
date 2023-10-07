import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//use middlewares for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// 1. Allow all origin
app.use(cors());
// 2. Allow Custom Origins
// cors({
//   origin: "http://localhost:9000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"],
// });

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
