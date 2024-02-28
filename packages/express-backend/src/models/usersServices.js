import utils from "../utils.js";
import userModel from "./user.js";

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
  return userModel.findOne({ username: username, password: password });
}

export default {
  addUser,
  getUsers,
  deleteUser,
  findUserById,
  findUserByUsername,
  authenticateUser,
};
