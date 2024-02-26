import express from "express";
import buildingsServices from "../models/buildingsServices.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const building = req.body;
  const newBuilding = await buildingsServices.addBuilding(building);
  res.send(newBuilding);
});

router.get("/", async (req, res) => {
  const buildings = await buildingsServices.getBuildings();
  res.send(buildings);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const building = await buildingsServices.deleteBuilding(id);
  res.send(building);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const building = await buildingsServices.findBuildingById(id);
  res.send(building);
});

router.get("/:number", async (req, res) => {
  const number = req.params.number;
  const building = await buildingsServices.findBuildingByNumber(number);
  res.send(building);
});

router.get("/:name", async (req, res) => {
  const name = req.params.name;
  const building = await buildingsServices.findBuildingByName(name);
  res.send(building);
});

export default router;
