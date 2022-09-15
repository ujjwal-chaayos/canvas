const express = require("express");
const {uploadTemplate, uploadProductImages, setItemMapping, getUnitMenu, setAllItemMapping,getCafeGenerated } = require("../controllers/menu");

const router = express.Router();

router.post("/uploadTemplate", uploadTemplate);

router.post("/uploadProducts", uploadProductImages);

router.post("/setItemMapping", setItemMapping);

router.post("/getUnitMenu", getUnitMenu);

router.post("/setAllItemMapping", setAllItemMapping);

router.post("/getCafeGenerated",getCafeGenerated);

module.exports = router;