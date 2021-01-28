const { Router } = require("express");
const { getDetailById, getUserGraphById } = require("./tableau.controller");

const router = Router();

router.get("", getUserGraphById);

module.exports = router;
