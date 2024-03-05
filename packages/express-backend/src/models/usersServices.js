import utils from "../utils.js";
import userModel from "./user.js";
import bcrypt from "bcrypt";

utils.connectToDatabase();

function addUser(user) {
  return new Promise((resolve, reject) => {
    findUserByUsername(user.username)
      .then((foundUser) => {
        if (foundUser) {
          resolve(null);
        } else {
          resolve(userModel.create(user));
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

function getUsers() {
  return userModel.find();
}

function deleteUser(id) {
  return userModel.findByIdAndDelete(id);
}

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByUsername(username) {
  console.log("finding user by username...");
  const user = userModel.findOne({ username: username });
  return user;
}

function authenticateUser(username, password) {
  console.log("authenticating user...");
  return new Promise((resolve, reject) => {
    findUserByUsername(username)
      .then((user) => {
        if (!user) {
          resolve(null);
        }
        console.log("user found: ", user, " comparing passwords...");
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            resolve(null);
          }
        });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export default {
  addUser,
  getUsers,
  deleteUser,
  findUserById,
  findUserByUsername,
  authenticateUser,
};
