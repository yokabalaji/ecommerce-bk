const express = require("express");
const { createNewUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createNewUser);

module.exports = router;
