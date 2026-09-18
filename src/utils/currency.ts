/**
 * Currency utility for Indian Rupees (INR)
 * Formats numbers using the Indian numbering system with the ₹ currency symbol
 * e.g., 4400 -> "₹4,400", 125000 -> "₹1,25,000"
 */
export const formatINR = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const CURRENCY_SYMBOL = '₹';
export const CURRENCY_CODE = 'INR';
