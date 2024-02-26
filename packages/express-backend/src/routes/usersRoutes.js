import express from "express";
import userServices from "../models/usersServices.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = req.body;
  const newUser = await userServices.addUser(user);
  res.send(newUser);
});

router.get("/", async (req, res) => {
  console.log("users");
  const users = await userServices.getUsers();
  res.send(users);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userServices.deleteUser(id);
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userServices.findUserById(id);
  res.send(user);
});

export default router;
