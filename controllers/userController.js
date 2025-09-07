const bcrypt = require('bcrypt')
const { createUser } = require('../models/userModel')

exports.createNewUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const hash = await bcrypt.hash(password, 10)
    const result = await createUser({
      name,
      email,
      password: hash,
      created_by: req.user.id
    })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
