const pool = require("../config/db");

async function createPurchase(user_id, item_name, original_price, discount, final_price) {
  return pool.query(
    "INSERT INTO purchases (user_id, item_name, original_price, discount, final_price) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [user_id, item_name, original_price, discount, final_price]
  );
}

module.exports = { createPurchase };
