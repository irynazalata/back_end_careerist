import express from "express";
import cors from "cors";
import logger from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

import commentsRoutes from "./comments/comment.routes.js";

dotenv.config();

const PORT = process.env.port || 8000;

function start() {
  const app = initServer();
  connectMiddlewares(app);
  declareRoutes(app);
  connectToDb();
  listen(app);
}

function initServer() {
  return express();
}

function connectMiddlewares(app) {
  app.use(express.json());
  app.use(cors({ origin: "*" }));
  app.use(logger("dev"));
  app.use("/hello", express.static("./index.html"));
}

function declareRoutes(app) {
  app.use("", commentsRoutes);
}

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useMongoClient: true,
    });
    console.log("Database connection successful");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

function listen(app) {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

start();
