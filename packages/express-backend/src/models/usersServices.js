import utils from "../utils.js";
import userModel from "./user.js";
import bcrypt from "bcrypt";

utils.connectToDatabase();

function addUser(user) {
  return userModel.create(user);
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
  return userModel.findOne({ username: username });
}

function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    findUserByUsername(username)
      .then((user) => {
        if (!user) {
          resolve(null);
        }
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
