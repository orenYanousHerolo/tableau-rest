require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomError = require("../../errors/custom-error");

const users = [{ id: "1", username: "test1", password: "test" }];

module.exports = {
    authenticate,
    getAll,
};

async function authenticate(next, username, password) {
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        next(new CustomError("Username or password is incorrect", 400));
        return;
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
    });

    return {
        // ...omitPassword(user),
        token,
    };
}

async function getAll() {
    return users.map((u) => omitPassword(u));
}

// helper functions
// function omitPassword(user) {
//     const { password, ...userWithoutPassword } = user;
//     return userWithoutPassword;
// }
