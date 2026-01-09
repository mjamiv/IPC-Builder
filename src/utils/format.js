/**
 * Formatting Utilities
 * @module utils/format
 */

/**
 * Formats a number as US currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
    return '$' + Math.round(amount || 0).toLocaleString('en-US');
}

/**
 * Formats a number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
    return Math.round(num || 0).toLocaleString('en-US');
}

/**
 * Formats a timestamp as relative time
 * @param {number} ts - Timestamp in milliseconds
 * @returns {string} Relative time string
 */
export function formatTimestamp(ts) {
    const date = new Date(ts);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
}

/**
 * Formats a date as YYYY-MM-DD
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}

/**
 * Formats a date for display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDisplayDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Parses a currency string to number
 * @param {string} str - Currency string (e.g., "$1,234.56")
 * @returns {number} Parsed number
 */
export function parseCurrency(str) {
    if (!str) return 0;
    return parseFloat(String(str).replace(/[$,]/g, '')) || 0;
}

/**
 * Parses a number string with commas
 * @param {string} str - Number string (e.g., "1,234")
 * @returns {number} Parsed number
 */
export function parseNumber(str) {
    if (!str) return 0;
    return parseFloat(String(str).replace(/,/g, '')) || 0;
}

/**
 * Formats percentage
 * @param {number} value - Value to format
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted percentage
 */
export function formatPercent(value, decimals = 1) {
    return (value || 0).toFixed(decimals) + '%';
}

/**
 * Truncates text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, maxLength = 50) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

