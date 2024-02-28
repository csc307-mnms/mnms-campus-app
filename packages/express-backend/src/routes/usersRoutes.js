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

router.get("/username/:username", async (req, res) => {
  const username = req.params.username;
  const user = await userServices.findUserByUsername(username);
  res.send(user);
});

router.post("/authenticate", async (req, res) => {
  const { username, password } = req.body;
  const user = await userServices.authenticateUser(username, password);
  if (user) {
    res.status(200).send(user);
  }
  else {
    res.status(401).send("Invalid username or password");
  }
});


export default router;
