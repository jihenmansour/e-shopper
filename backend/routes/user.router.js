
const {Router} = require('express');
const { signUp, login, authentification, getUsers, deleteUser, preventSelfDeletion, upload} = require("../controllers/user.controller");


const router = Router();

router.post('/signup', upload.single('image'), signUp)
router.post('/login', login)
router.post('/auth', authentification)
router.get('/users', getUsers)
router.delete("/user",preventSelfDeletion, deleteUser);



module.exports = router;