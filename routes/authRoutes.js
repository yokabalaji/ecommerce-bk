const express = require("express");
const { registerSuperadmin, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register-superadmin", registerSuperadmin);
router.post("/login", login);

module.exports = router;
