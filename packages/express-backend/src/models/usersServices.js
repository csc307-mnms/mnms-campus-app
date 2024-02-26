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

export default {
  addUser,
  getUsers,
  deleteUser,
  findUserById,
};
