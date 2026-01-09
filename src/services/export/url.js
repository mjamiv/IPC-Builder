/**
 * URL Sharing Service
 * @module services/export/url
 */

import { projectData } from '../../core/state.js';

/**
 * Compresses project data for URL sharing
 * @returns {string} Base64 encoded compressed data
 */
export function compressProjectData() {
    const minimalData = {
        p: projectData.phases,
        d: projectData.disciplines,
        k: projectData.packages,
        b: projectData.budgets,
        c: projectData.claiming,
        t: projectData.dates
    };
    
    const json = JSON.stringify(minimalData);
    return btoa(encodeURIComponent(json));
}

/**
 * Decompresses URL data back to project format
 * @param {string} compressed - Base64 encoded data
 * @returns {object} Project data
 */
export function decompressProjectData(compressed) {
    try {
        const json = decodeURIComponent(atob(compressed));
        const data = JSON.parse(json);
        
        return {
            phases: data.p || [],
            disciplines: data.d || [],
            packages: data.k || [],
            budgets: data.b || {},
            claiming: data.c || {},
            dates: data.t || {}
        };
    } catch (error) {
        console.error('Failed to decompress URL data:', error);
        return null;
    }
}

/**
 * Generates a shareable URL
 * @returns {string} Shareable URL
 */
export function generateShareableURL() {
    const compressed = compressProjectData();
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?data=${compressed}`;
}

/**
 * Copies shareable URL to clipboard
 */
export async function copyShareableURL() {
    const url = generateShareableURL();
    
    try {
        await navigator.clipboard.writeText(url);
        alert('Share link copied to clipboard!');
    } catch (error) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Share link copied to clipboard!');
    }
}

/**
 * Loads project data from URL parameters
 * @returns {object|null} Project data if found in URL
 */
export function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    
    if (data) {
        return decompressProjectData(data);
    }
    
    return null;
}

// Export for legacy compatibility
if (typeof window !== 'undefined') {
    window.shareProjectUrl = copyShareableURL;
    window.loadFromURL = loadFromURL;
}

