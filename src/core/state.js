/**
 * Application State Management
 * @module core/state
 */

import { STORAGE_KEY, STORAGE_VERSION } from './constants.js';

// Global application state
export const projectData = {
    phases: [],
    disciplines: [],
    packages: [],
    budgets: {},
    claiming: {},
    dates: {},
    calculator: {
        totalConstructionCost: 0,
        designFeePercent: 15,
        projectType: 'Highway/Roadway',
        totalDesignFee: 0,
        complexityOverrides: {},
        isCalculated: false,
        manualEdits: {}
    },
    projectScope: '',
    scheduleNotes: '',
    disciplineScopes: {}
};

// UI state
export let currentStep = 1;
export let chart = null;
export let autosaveTimeout = null;
export let lastSaveTime = null;

// State setters
export function setCurrentStep(step) {
    currentStep = step;
}

export function setChart(chartInstance) {
    chart = chartInstance;
}

export function setLastSaveTime(time) {
    lastSaveTime = time;
}

/**
 * Updates project data with new values
 * @param {object} updates - Partial project data to merge
 */
export function updateProjectData(updates) {
    Object.assign(projectData, updates);
}

/**
 * Resets project data to initial state
 */
export function resetProjectData() {
    projectData.phases = [];
    projectData.disciplines = [];
    projectData.packages = [];
    projectData.budgets = {};
    projectData.claiming = {};
    projectData.dates = {};
    projectData.calculator = {
        totalConstructionCost: 0,
        designFeePercent: 15,
        projectType: 'Highway/Roadway',
        totalDesignFee: 0,
        complexityOverrides: {},
        isCalculated: false,
        manualEdits: {}
    };
    projectData.projectScope = '';
    projectData.scheduleNotes = '';
    projectData.disciplineScopes = {};
}

/**
 * Gets a copy of current project data
 * @returns {object} Copy of project data
 */
export function getProjectData() {
    return JSON.parse(JSON.stringify(projectData));
}

/**
 * Loads state from a saved data object
 * @param {object} savedData - Saved project data
 */
export function loadFromSavedData(savedData) {
    if (savedData.projectData) {
        Object.assign(projectData, savedData.projectData);
    }
    if (savedData.currentStep) {
        currentStep = savedData.currentStep;
    }
}

// Make state available globally for legacy code compatibility
if (typeof window !== 'undefined') {
    window.projectData = projectData;
    window.currentStep = currentStep;
}

