const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = (password) => {
    const hashedPassword = bcrypt.hash(password, saltRounds)
    return hashPassword;
}

module.exports = {hashPassword}