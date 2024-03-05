import mongoose from "mongoose";
import process from "process";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.ATLAS_URI;
// const uri = "mongodb+srv://mmontemurno:fB5NxVFMoMaVFKa4@polybuddycluster.caslhkv.mongodb.net/?retryWrites=true&w=majority&appName=PolyBuddyCluster";

function connectToDatabase() {
  mongoose.set("debug", true);
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
