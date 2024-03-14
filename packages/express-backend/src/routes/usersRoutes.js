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

router.get("/email/:email", async (req, res) => {
  const email = req.params.email;
  const user = await userServices.findUserByEmail(email);
  if (user === null) {
    res.status(401).send("Invalid email");
  } else {
    res.send(user);
  }
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
      userServices.updatePass(username, newpass).then((res) => {
        if (res) {
          res.status(200).send("Password updated");
        } else {
          res.status(401).send("Invalid username or current password");
        }
      });
    } else {
      res.status(401).send("Invalid username or current password");
    }
  });
});

router.post("/overwritePass", async (req, res) => {
  const { username, newpass } = req.body;
  userServices
    .updatePass(username, newpass)
    .then(() => {
      res.status(200).send("Password updated successfully");
    })
    .catch((error) => {
      console.error("Error updating password:", error);
      res.status(500).send("Internal Server Error");
    });
});

export default router;
