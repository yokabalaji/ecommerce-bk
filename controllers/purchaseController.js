const { countUsersCreatedBy } = require("../models/userModel");
const { createPurchase } = require("../models/purchaseModel");
const calculateDiscount = require("../utils/discountCalculator");

exports.purchaseItem = async (req, res) => {
  const { item_name, original_price } = req.body;
  try {
    const countResult = await countUsersCreatedBy(req.user.id);
    const userCount = parseInt(countResult.rows[0].count);

    const { discountPercent, finalPrice } = calculateDiscount(userCount, original_price);

    const result = await createPurchase(
      req.user.id,
      item_name,
      original_price,
      discountPercent,
      finalPrice
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
