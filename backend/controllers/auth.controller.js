const User = require("../models/user.model");
const CustomError = require("../error/custom.error");
const { createJWT, isTokenValid } = require("../utils/jwt");
const { hashPassword, comparePassword } = require("../utils/password");



// Register User
const register = async (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  const password = parsedData.password;

  const hashedPassword = await hashPassword(password);

  const imageUrl = req.file ? req.file.filename : "";

  const userData = {
    ...parsedData,
    password: hashedPassword,
    image: imageUrl,
  };

  const user = new User(userData);
  await user.validate();

  await user.save();

  const { password: Password, ...userInfo } = user.toObject();

  res.json({
    message: "Account created successfully",
    user: userInfo,
  });
};



// Login User
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const match = await comparePassword(password, user.password);

    if (match) {
      const { password, ...userInfo } = user.toObject();
      const token = createJWT(userInfo);

      res.json({
        message: "Login Successful",
        token: token,
      });
    } else {
      throw new CustomError("Password incorrect");
    }
  } else {
    throw new CustomError("Username incorrect");
  }
};



// get authenticated User
const authentification = (req, res) => {
  const token = req.body.token;
  let user;
  if (token && isTokenValid(token)) {
    user = isTokenValid(token);
    res.json({
      auth: true,
      user,
    });
  } else {
    throw new CustomError("No token found");
  }
};

module.exports = { register, login, authentification };
