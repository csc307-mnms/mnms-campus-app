import express from "express";
import userServices from "../models/usersServices.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = req.body;
  userServices.addUser(user).then((user) => {
    if (user) {
      res.status(201).send(user);
    } else {
      res.status(409).send("User already exists");
    }
  });
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
  userServices.authenticateUser(username, password).then((user) => {
    if (user) {
      const token = jwt.sign({ username: user.username }, "secretKey");
      res.status(200).json({ token });
    } else {
      res.status(401).send("Invalid username or password");
    }
  });
});

router.post("/pass", async (req, res) => {
  const { username, password, newpass } = req.body;
  userServices.authenticateUser(username, password).then((user) => {
    if (user) {
      userServices.updatePass(username, newpass);
      res.status(200).send(newpass);
    } else {
      res.status(401).send("Invalid username or current password");
    }
  });
});

export default router;
