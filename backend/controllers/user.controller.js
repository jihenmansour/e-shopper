const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const saltRounds = 10;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const signUp = async (req, res) => {
  try {
    const parsedData = JSON.parse(req.body.data);

    const password = parsedData.password;
    const isValid = await User.findOne({ email: parsedData.email }).exec();

    if (isValid) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

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
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const { password, ...userInfo } = user.toObject();

        const token = jwt.sign(
          { user: userInfo },
          process.env.JWT_LOGIN_TOKEN,
          {
            expiresIn: "1d",
          }
        );

        res.json({
          message: "Login Successful",
          token,
        });
      } else {
        res.status(400).json({ message: "Username or Password incorrect" });
      }
    } else {
      res.status(400).json({ message: "Username or Password incorrect" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const authentification = (req, res) => {
  const { token } = req.body;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
      res.json({
        auth: true,
        user: decode,
      });
    } catch (error) {
      res.json({
        auth: false,
        message: error.message,
      });
    }
  } else {
    res.json({
      auth: false,
      data: "No token found in request",
    });
  }
};

const getUsers = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const preventSelfDeletion = (req, res, next) => {
  const { id, loggedId } = req.body;

  if (id === loggedId) {
    return res.status(400).json({ message: "Cannot delete this user" });
  }

  next();
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  login,
  authentification,
  getUsers,
  deleteUser,
  preventSelfDeletion,
  upload,
};
