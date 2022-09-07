const express = require("express");
const {loginService} = require("../controllers/auth");

const router = express.Router();

router.post("/auth", loginService);

module.exports = router;