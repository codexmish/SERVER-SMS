const express = require("express");
const { getUserController } = require("../../controllers/adminController");
const router = express.Router();

router.get("/users", getUserController)


module.exports = router;