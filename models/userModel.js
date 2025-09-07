const pool = require("../config/db");

async function findUserByEmailOrRef(identifier) {
  return pool.query("SELECT * FROM users WHERE email=$1 OR reference_no=$1", [identifier]);
}

async function createUser({ name, email, password, created_by }) {
  return pool.query(
    "INSERT INTO users (name, email, password, created_by) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, email, password, created_by]
  );
}

async function countUsersCreatedBy(userId) {
  return pool.query("SELECT COUNT(*) FROM users WHERE created_by=$1", [userId]);
}

module.exports = { findUserByEmailOrRef, createUser, countUsersCreatedBy  };
