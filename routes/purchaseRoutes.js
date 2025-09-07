const express = require("express");
const { purchaseItem } = require("../controllers/purchaseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, purchaseItem);

module.exports = router;
