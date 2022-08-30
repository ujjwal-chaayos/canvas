const express = require("express");
const {uploadTemplate, uploadProductImages, generateGenericMenu } = require("../controllers/menu");

const router = express.Router();

router.post("/uploadTemplate", uploadTemplate);

router.post("/uploadProducts", uploadProductImages);

router.post("/generateGenericMenu", generateGenericMenu);

module.exports = router;