const { Router } = require("express");
const {
  register,
  login,
  authentification
} = require("../controllers/auth.controller");
const { upload } = require("../utils/multer.config")


const router = Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/auth", authentification);

module.exports = router;