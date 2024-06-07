const { Router } = require("express");
const {
  signUp,
  login,
  authentification,
  getUser,
  getUsers,
  deleteUser,
  upload,
  updateUser
} = require("../controllers/user.controller");


const router = Router();

router.post("/signup", upload.single("image"), signUp);
router.post("/login", login);
router.post("/auth", authentification);
router.get("/user/:id", getUser);
router.get("/users", getUsers);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/upload", upload.single("image"));

module.exports = router;
