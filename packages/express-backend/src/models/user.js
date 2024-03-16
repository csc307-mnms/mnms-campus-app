import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  schedules: [
    {
      schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, user.salt);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
