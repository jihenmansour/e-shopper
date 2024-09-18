const { Router } = require("express");
const {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  getAllUsers
} = require("../controllers/user.controller");
const { upload } = require("../utils/multer.config")


const router = Router();

router.get("/users/all", getAllUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", upload.single("image"), updateUser);
router.delete("/user/:id", deleteUser);
module.exports = router;
