function calculateDiscount(userCount, price) {
  const discountPercent = Math.min(userCount * 2, 30);
  const finalPrice = price - (price * discountPercent) / 100;
  return { discountPercent, finalPrice };
}

module.exports = calculateDiscount;
