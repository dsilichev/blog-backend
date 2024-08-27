const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require('../helpers/generateToken');

//register

async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });

  return user;
}

//login

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = generateToken({ id: user.id });

  return { user, token };
}

//delete

// edit (roles)

module.exports = {
  register,
  login,
};
