/**
 * LocalStorage Service
 * @module services/storage/localStorage
 */

import { STORAGE_KEY, STORAGE_VERSION, PROJECTS_STORAGE_KEY } from '../../core/constants.js';
import { projectData, currentStep, setLastSaveTime } from '../../core/state.js';

let autosaveTimeout = null;

/**
 * Shows the autosave indicator
 * @param {string} status - 'saving' or 'saved'
 */
export function showAutosaveIndicator(status) {
    const indicator = document.getElementById('autosave-indicator');
    const icon = document.getElementById('autosave-icon');
    const text = document.getElementById('autosave-text');

    if (!indicator) return;

    indicator.classList.remove('saving', 'saved');

    if (status === 'saving') {
        indicator.classList.add('visible', 'saving');
        icon.textContent = '◐';
        text.textContent = 'Saving...';
    } else if (status === 'saved') {
        indicator.classList.add('visible', 'saved');
        icon.textContent = '✓';
        text.textContent = 'Saved';
        setTimeout(() => {
            indicator.classList.remove('visible');
        }, 2000);
    }
}

/**
 * Saves project data to localStorage
 */
export function saveToLocalStorage() {
    try {
        showAutosaveIndicator('saving');

        const saveData = {
            version: STORAGE_VERSION,
            timestamp: Date.now(),
            currentStep: currentStep,
            projectData: projectData,
            formState: {
                phases: document.getElementById('phases-input')?.value || '',
                packages: document.getElementById('packages-input')?.value || ''
            }
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
        setLastSaveTime(Date.now());

        setTimeout(() => showAutosaveIndicator('saved'), 300);
        console.log('Project autosaved:', new Date().toLocaleTimeString());
    } catch (error) {
        console.error('Autosave failed:', error);
    }
}

/**
 * Debounced autosave function
 */
export function autosave() {
    clearTimeout(autosaveTimeout);
    autosaveTimeout = setTimeout(saveToLocalStorage, 1000);
}

/**
 * Triggers autosave on any data change
 */
export function triggerAutosave() {
    autosave();
}

/**
 * Loads saved data from localStorage
 * @returns {object|null} The saved data or null if none exists
 */
export function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return null;

        const data = JSON.parse(saved);

        if (data.version !== STORAGE_VERSION) {
            console.warn('Saved data version mismatch, discarding');
            return null;
        }

        return data;
    } catch (error) {
        console.error('Failed to load saved data:', error);
        return null;
    }
}

/**
 * Clears saved data from localStorage
 */
export function clearLocalStorage() {
    localStorage.removeItem(STORAGE_KEY);
}

/**
 * Checks if saved data has meaningful content
 * @param {object} data - Saved data
 * @returns {boolean}
 */
export function hasMeaningfulData(data) {
    if (!data || !data.projectData) return false;

    const pd = data.projectData;
    return (
        pd.phases.length > 0 ||
        pd.disciplines.length > 0 ||
        pd.packages.length > 0 ||
        Object.keys(pd.budgets).length > 0 ||
        pd.projectScope
    );
}

/**
 * Saves a named project
 * @param {string} name - Project name
 * @param {object} data - Project data
 */
export function saveNamedProject(name, data) {
    try {
        const projects = getNamedProjects();
        const id = `proj_${Date.now()}`;
        
        projects[id] = {
            id,
            name,
            timestamp: Date.now(),
            data: JSON.parse(JSON.stringify(data))
        };
        
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
        return id;
    } catch (error) {
        console.error('Failed to save project:', error);
        return null;
    }
}

/**
 * Gets all named projects
 * @returns {object} Projects object
 */
export function getNamedProjects() {
    try {
        const saved = localStorage.getItem(PROJECTS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch {
        return {};
    }
}

/**
 * Loads a named project
 * @param {string} id - Project ID
 * @returns {object|null}
 */
export function loadNamedProject(id) {
    const projects = getNamedProjects();
    return projects[id] || null;
}

/**
 * Deletes a named project
 * @param {string} id - Project ID
 */
export function deleteNamedProject(id) {
    const projects = getNamedProjects();
    delete projects[id];
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

// Export for legacy compatibility
if (typeof window !== 'undefined') {
    window.saveToLocalStorage = saveToLocalStorage;
    window.loadFromLocalStorage = loadFromLocalStorage;
    window.triggerAutosave = triggerAutosave;
}

