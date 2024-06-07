const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const multer = require("multer");
const path = require("path");
const CustomError = require("../error/custom.error");
const { createJWT, isTokenValid } = require("../utils/jwt");
const { hashPassword } = require("../utils/password");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const signUp = async (req, res) => {
  const parsedData = JSON.parse(req.body.data);

  const password = parsedData.password;

  const hashedPassword = hashPassword(password);

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

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("cookies", "cookies", {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: true,
    sameSite: "None",
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);

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

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });
  if (!user) {
    throw new CustomError("No user found");
  }

  res.status(200).json({ user });
};

const getUsers = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;

  const total = await User.find().count();

  const totalPages = Math.ceil(total / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;
  const data = await User.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * (page - 1));

  res.status(200).json({
    data,
    page,
    total,
    totalPages,
    nextPage,
    previousPage,
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const parsedData = JSON.parse(req.body.data);
  console.log(parsedData)

  const password = parsedData.password;

  const hashedPassword = hashPassword(password);

  const imageUrl = req.file ? req.file.filename : "";

  const updatedUser = {
    ...parsedData,
    password: hashedPassword,
    image: imageUrl,
  };

  const user = await User.findOneAndUpdate({ _id: id }, updatedUser, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new CustomError.BadRequestError(`No user found`);
  }
  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new CustomError("User not found");
  }
  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
  signUp,
  login,
  authentification,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  upload,
};
