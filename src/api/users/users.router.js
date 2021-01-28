const { Router } = require("express");
const { loginUser } = require("./users.controller");

const router = Router();

router.post("/login", loginUser);
router.post("/signup");

module.exports = router;
