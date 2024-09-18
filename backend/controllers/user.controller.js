const User = require("../models/user.model");
const CustomError = require("../error/custom.error");
const { hashPassword } = require("../utils/password");


// Get All Users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users)
}


// Get Users
const getUsers = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search?.toLowerCase() || "";
  const skip = limit * (page - 1);
  const total = await User.find().count();

  const totalPages = Math.ceil(total / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  const data = await User.aggregate( [
    {
      $match: {
        $expr: {
          $regexMatch: {
            input: {$toLower: "$fullname"},
            regex: search
          }
        }
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);
 

  res.status(200).json({
    data,
    page,
    total,
    totalPages,
    nextPage,
    previousPage
  });
};



//Get User
const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });
  if (!user) {
    throw new CustomError("No user found");
  }

  res.status(200).json({ user });
};



// Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  const parsedData = JSON.parse(req.body.data);

  const updatedUser = {
    ...parsedData,
  };

  if (parsedData.password) {
    const password = parsedData.password;
    updatedUser.password = await hashPassword(password);
  }

  const user = await User.findOneAndUpdate({ _id: id }, updatedUser, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new CustomError(`No user found`);
  }
  res.status(200).json({ 
    message:"User updated successfully", 
    user 
  });
};



// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new CustomError("User not found");
  }
  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
  getAllUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
