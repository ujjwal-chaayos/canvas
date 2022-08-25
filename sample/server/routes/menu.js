const express = require("express");
const {uploadTemplate, setImageMapping, setItemMapping } = require("../controllers/menu");

const router = express.Router();

router.post("/uploadTemplate", uploadTemplate);

router.post("/uploadProducts", setImageMapping);

router.post("/setItemMapping", setItemMapping);

module.exports = router;