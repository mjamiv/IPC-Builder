/**
 * CSV Export Service
 * @module services/export/csv
 */

import { projectData } from '../../core/state.js';
import { formatCurrency } from '../../utils/format.js';

/**
 * Generates CSV content from WBS data
 * @returns {string} CSV content
 */
export function generateWBSCSV() {
    const rows = [];
    
    // Header row
    rows.push(['Phase', 'Discipline', 'Package', 'Budget', 'Claim %', 'Amount', 'Start Date', 'End Date'].join(','));
    
    // Data rows
    projectData.phases.forEach(phase => {
        projectData.disciplines.forEach(disc => {
            projectData.packages.forEach(pkg => {
                const budget = projectData.budgets[disc] || 0;
                const claimPct = projectData.claiming[disc]?.[pkg] || 0;
                const amount = budget * (claimPct / 100);
                const dates = projectData.dates[disc]?.[pkg] || {};
                
                rows.push([
                    `"${phase}"`,
                    `"${disc}"`,
                    `"${pkg}"`,
                    budget,
                    claimPct,
                    amount.toFixed(2),
                    dates.start || '',
                    dates.end || ''
                ].join(','));
            });
        });
    });
    
    return rows.join('\n');
}

/**
 * Generates full project data CSV
 * @returns {string} CSV content
 */
export function generateFullDataCSV() {
    const data = {
        projectData,
        exportDate: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
}

/**
 * Downloads content as a file
 * @param {string} content - File content
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
export function downloadFile(content, filename, mimeType = 'text/csv') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Exports WBS table as CSV
 */
export function exportCSV() {
    const csv = generateWBSCSV();
    const filename = `wbs-export-${new Date().toISOString().split('T')[0]}.csv`;
    downloadFile(csv, filename, 'text/csv');
}

/**
 * Exports all project data as JSON
 */
export function exportAllDataJSON() {
    const data = generateFullDataCSV();
    const filename = `wbs-full-export-${new Date().toISOString().split('T')[0]}.json`;
    downloadFile(data, filename, 'application/json');
}

/**
 * Parses CSV content
 * @param {string} csv - CSV content
 * @returns {Array} Parsed rows
 */
export function parseCSV(csv) {
    const lines = csv.split('\n');
    const result = [];
    
    for (const line of lines) {
        if (!line.trim()) continue;
        
        const row = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                row.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        row.push(current.trim());
        result.push(row);
    }
    
    return result;
}

// Export for legacy compatibility
if (typeof window !== 'undefined') {
    window.exportCSV = exportCSV;
    window.exportAllDataJSON = exportAllDataJSON;
}

