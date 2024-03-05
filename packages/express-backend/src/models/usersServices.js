import userModel from "./user.js";
import bcrypt from "bcrypt";

const usersServices = {
  addUser: function (user) {
    return new Promise((resolve, reject) => {
      this.findUserByUsername(user.username)
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
  },

  getUsers: function () {
    return userModel.find();
  },

  deleteUser: function (id) {
    return userModel.findByIdAndDelete(id);
  },

  findUserById: function (id) {
    return userModel.findById(id);
  },

  findUserByUsername: function (username) {
    return userModel.findOne({ username: username });
  },

  authenticateUser: function (username, password) {
    return new Promise((resolve, reject) => {
      this.findUserByUsername(username)
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
  },
};

export default usersServices;
