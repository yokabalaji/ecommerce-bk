const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

exports.registerSuperadmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name,email,password,role,reference_no) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, email, hash, "superadmin", "000"] // fixed reference number
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email=$1 OR reference_no=$1",[identifier]);

    if (userResult.rowCount === 0) return res.status(400).json({ error: "User not found" });
    const user = userResult.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, reference_no: user.reference_no });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
