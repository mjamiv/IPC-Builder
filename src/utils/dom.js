/**
 * DOM Utilities
 * @module utils/dom
 */

/**
 * Gets an element by ID with null safety
 * @param {string} id - Element ID
 * @returns {HTMLElement|null}
 */
export function $(id) {
    return document.getElementById(id);
}

/**
 * Query selector shorthand
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Context element
 * @returns {HTMLElement|null}
 */
export function qs(selector, context = document) {
    return context.querySelector(selector);
}

/**
 * Query selector all shorthand
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Context element
 * @returns {NodeList}
 */
export function qsa(selector, context = document) {
    return context.querySelectorAll(selector);
}

/**
 * Shows an element
 * @param {HTMLElement|string} el - Element or ID
 */
export function show(el) {
    const element = typeof el === 'string' ? $(el) : el;
    if (element) {
        element.classList.remove('hidden');
        element.style.display = '';
    }
}

/**
 * Hides an element
 * @param {HTMLElement|string} el - Element or ID
 */
export function hide(el) {
    const element = typeof el === 'string' ? $(el) : el;
    if (element) {
        element.classList.add('hidden');
    }
}

/**
 * Toggles element visibility
 * @param {HTMLElement|string} el - Element or ID
 * @param {boolean} [force] - Force state
 */
export function toggle(el, force) {
    const element = typeof el === 'string' ? $(el) : el;
    if (element) {
        if (force !== undefined) {
            element.classList.toggle('hidden', !force);
        } else {
            element.classList.toggle('hidden');
        }
    }
}

/**
 * Adds class to element
 * @param {HTMLElement|string} el - Element or ID
 * @param {...string} classes - Classes to add
 */
export function addClass(el, ...classes) {
    const element = typeof el === 'string' ? $(el) : el;
    if (element) {
        element.classList.add(...classes);
    }
}

/**
 * Removes class from element
 * @param {HTMLElement|string} el - Element or ID
 * @param {...string} classes - Classes to remove
 */
export function removeClass(el, ...classes) {
    const element = typeof el === 'string' ? $(el) : el;
    if (element) {
        element.classList.remove(...classes);
    }
}

/**
 * Checks if element has class
 * @param {HTMLElement|string} el - Element or ID
 * @param {string} className - Class to check
 * @returns {boolean}
 */
export function hasClass(el, className) {
    const element = typeof el === 'string' ? $(el) : el;
    return element ? element.classList.contains(className) : false;
}

/**
 * Sets element's inner HTML safely
 * @param {HTMLElement|string} el - Element or ID
 * @param {string} html - HTML content
 */
export function setHTML(el, html) {
    const element = typeof el === 'string' ? $(el) : el;
    if (element) {
        element.innerHTML = html;
    }
}

/**
 * Sets element's text content
 * @param {HTMLElement|string} el - Element or ID
 * @param {string} text - Text content
 */
export function setText(el, text) {
    const element = typeof el === 'string' ? $(el) : el;
    if (element) {
        element.textContent = text;
    }
}

/**
 * Gets element's value (for inputs)
 * @param {HTMLElement|string} el - Element or ID
 * @returns {string}
 */
export function getValue(el) {
    const element = typeof el === 'string' ? $(el) : el;
    return element ? element.value : '';
}

/**
 * Sets element's value (for inputs)
 * @param {HTMLElement|string} el - Element or ID
 * @param {string} value - Value to set
 */
export function setValue(el, value) {
    const element = typeof el === 'string' ? $(el) : el;
    if (element) {
        element.value = value;
    }
}

/**
 * Creates an element with attributes
 * @param {string} tag - Tag name
 * @param {object} attrs - Attributes
 * @param {string|HTMLElement} children - Children
 * @returns {HTMLElement}
 */
export function createElement(tag, attrs = {}, children = null) {
    const el = document.createElement(tag);
    
    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'className') {
            el.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(el.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            el.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
            el.setAttribute(key, value);
        }
    });
    
    if (children) {
        if (typeof children === 'string') {
            el.innerHTML = children;
        } else if (children instanceof HTMLElement) {
            el.appendChild(children);
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (child instanceof HTMLElement) {
                    el.appendChild(child);
                }
            });
        }
    }
    
    return el;
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function}
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in ms
 * @returns {Function}
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

