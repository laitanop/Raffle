/**
 * Formats an Ethereum address to a shortened version
 * Example: 0x1234567890123456789012345678901234567890 -> 0x12..890
 *
 * @param {string} address - The full Ethereum address
 * @param {number} startChars - Number of characters to show at the start (default: 4)
 * @param {number} endChars - Number of characters to show at the end (default: 3)
 * @returns {string} Formatted address string
 */
function formatAddress(address, startChars = 4, endChars = 3) {
  if (!address || typeof address !== "string") {
    return "";
  }

  if (address.length <= startChars + endChars) {
    return address;
  }

  return (
    address.substring(0, startChars) +
    ".." +
    address.substring(address.length - endChars)
  );
}
