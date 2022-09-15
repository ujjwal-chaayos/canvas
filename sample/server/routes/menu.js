const express = require("express");
const {uploadTemplate, uploadProductImages, setItemMapping, getUnitMenu, setAllItemMapping, cafeGenerated } = require("../controllers/menu");

const router = express.Router();

router.post("/uploadTemplate", uploadTemplate);

router.post("/uploadProducts", uploadProductImages);

router.post("/setItemMapping", setItemMapping);

router.post("/getUnitMenu", getUnitMenu);

router.post("/setAllItemMapping", setAllItemMapping);

router.post("/cafeGenerated", cafeGenerated)

module.exports = router;