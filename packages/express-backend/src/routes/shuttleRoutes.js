import express from "express";
import shuttleServices from "../models/shuttleServices.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const location = req.body;
  const newLocation = await shuttleServices.addLocation(location);
  res.send(newLocation);
});

router.get("/", async (req, res) => {
  const location = await shuttleServices.findMostRecentLocation();
  res.send(location);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await shuttleServices.deleteLocation(id);
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await shuttleServices.findLocationById(id);
  res.send(user);
});

export default router;
