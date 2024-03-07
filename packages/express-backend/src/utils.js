import mongoose from "mongoose";
import process from "process";
import dotenv from "dotenv";

function getAtlasURI() {
  if (process.env.NODE_ENV === "production") {
    return process.env.ATLAS_URI;
  } else {
    dotenv.config();
    return process.env.ATLAS_URI;
  }
}

function connectToDatabase() {
  mongoose.set("debug", true);
  const uri = getAtlasURI();
  console.log("ATLAS_URI: ", uri);
  if (!uri) {
    console.error("ATLAS_URI not set");
    console.error("Please run `npm run upload-atlas-uri` to set it.");
    throw new Error("ATLAS_URI not set.");
  }
  mongoose.connect(uri, {});
  const connection = mongoose.connection;
  connection.on("error", console.error.bind(console, "connection error:"));
  connection.once("open", () => {
    console.log("Connected to database");
  });
}

export default {
  connectToDatabase,
};
