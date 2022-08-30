const express = require("express");
const {uploadTemplate, uploadProductImages, setItemMapping } = require("../controllers/menu");

const router = express.Router();

router.post("/uploadTemplate", uploadTemplate);

router.post("/uploadProducts", uploadProductImages);

router.post("/setItemMapping", setItemMapping);

module.exports = router;