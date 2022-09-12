const express = require("express");
const {uploadTemplate, uploadProductImages, setItemMapping, getUnitMenu } = require("../controllers/menu");

const router = express.Router();

router.post("/uploadTemplate", uploadTemplate);

router.post("/uploadProducts", uploadProductImages);

router.post("/setItemMapping", setItemMapping);

router.post("/getUnitMenu", getUnitMenu);

module.exports = router;