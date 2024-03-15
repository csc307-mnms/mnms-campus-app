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

  findUserByEmail: function (email) {
    return userModel.findOne({ email: email });
  },

  uploadSchedule: function (username, schedule) {
    console.log("username", username);
    return new Promise((resolve, reject) => {
      this.findUserByUsername(username)
        .then((user) => {
          if (!user) {
            resolve(null);
            return;
          }
          const id = user._id;
          return userModel.updateOne(
            { _id: id },
            {
              $push: {
                schedules: schedule,
              },
            },
          );
        })
        .then((result) => {
          console.log(result);
          resolve(result);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },

  updatePass: function (username, newPassword) {
    let newSalt;

    return new Promise((resolve, reject) => {
      this.findUserByUsername(username)
        .then((user) => {
          if (!user) {
            resolve(null);
            return;
          }
          return bcrypt
            .genSalt(10)
            .then((generatedSalt) => {
              newSalt = generatedSalt;
              return bcrypt.hash(newPassword, newSalt);
            })
            .then((hashedPassword) => {
              const id = user._id;
              return userModel.updateOne(
                { _id: id },
                {
                  $set: {
                    password: hashedPassword,
                    salt: newSalt,
                  },
                },
              );
            })
            .then((result) => {
              resolve(result);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
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
