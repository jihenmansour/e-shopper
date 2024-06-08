const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword;
}

const comparePassword = async (password, user) => {
    const isMatch =  bcrypt.compare(password, user)
    return isMatch;
}

module.exports = {hashPassword, comparePassword}