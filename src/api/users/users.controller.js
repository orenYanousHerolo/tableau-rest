const userService = require("./users.service");

module.exports = {
    loginUser,
};

async function loginUser(req, res, next) {
    const { username, password } = req.body;
    const user = await userService.authenticate(next, username, password);
    if (!user) {
        return;
    }
    // res.cookie('token', token, { httpOnly: true });
    return res.status(200).json(user);
}
