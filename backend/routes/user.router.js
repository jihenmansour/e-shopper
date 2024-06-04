
const {Router} = require('express');
const { signUp, login, authentification, getUsers, deleteUser } = require("../controllers/user.controller");


const router = Router();

router.post('/signup', signUp)
router.post('/login', login)
router.post('/auth', authentification)
router.get('/users', getUsers)
router.delete("/user/:id", deleteUser);

module.exports = router;