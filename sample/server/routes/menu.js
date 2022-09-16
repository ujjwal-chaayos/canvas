const express = require("express");
<<<<<<< HEAD
const {uploadTemplate, uploadProductImages, setItemMapping, getUnitMenu, setAllItemMapping,getCafeGenerated } = require("../controllers/menu");
=======
const {uploadTemplate, uploadProductImages, setItemMapping, getUnitMenu, setAllItemMapping, cafeGenerated } = require("../controllers/menu");
>>>>>>> ritvik-dev

const router = express.Router();

router.post("/uploadTemplate", uploadTemplate);

router.post("/uploadProducts", uploadProductImages);

router.post("/setItemMapping", setItemMapping);

router.post("/getUnitMenu", getUnitMenu);

router.post("/setAllItemMapping", setAllItemMapping);

<<<<<<< HEAD
router.post("/cafeGenerated",getCafeGenerated);
=======
router.post("/cafeGenerated", cafeGenerated)
>>>>>>> ritvik-dev

module.exports = router;