const express = require("express");
const router = express.Router();
const { getHomePage, getSample } = require("../controllers/homeController");

router.get("/", getHomePage);

router.get("/sample", getSample);

module.exports = router;
