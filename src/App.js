/**
 * Main Application Controller
 * @module App
 */

import { projectData, currentStep, setCurrentStep, setChart, loadFromSavedData } from './core/state.js';
import { PROJECT_TEMPLATES, AVAILABLE_DISCIPLINES } from './core/constants.js';
import { loadFromLocalStorage, hasMeaningfulData, triggerAutosave } from './services/storage/localStorage.js';
import { loadFromURL } from './services/export/url.js';
import { formatCurrency } from './utils/format.js';
import { $, show, hide, addClass, removeClass, setHTML } from './utils/dom.js';

/**
 * Main Application Class
 */
export class App {
    constructor() {
        this.initialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        console.log('Initializing WBS Terminal v2.0...');
        
        try {
            // Load benchmark data
            await this.loadBenchmarkData();
            
            // Initialize UI components
            this.initUI();
            
            // Check for data recovery
            this.checkForSavedData();
            
            // Attach event listeners
            this.attachEventListeners();
            
            this.initialized = true;
            console.log('WBS Terminal initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }

    /**
     * Load benchmark data files
     */
    async loadBenchmarkData() {
        // Benchmark data is loaded on-demand by the MH estimator
        console.log('Benchmark data will be loaded on-demand');
    }

    /**
     * Initialize UI components
     */
    initUI() {
        // Populate disciplines grid
        this.populateDisciplinesGrid();
        
        // Populate template selector
        this.populateTemplates();
        
        // Set default date for AI schedule
        const startDateInput = $('ai-schedule-start');
        if (startDateInput) {
            startDateInput.value = new Date().toISOString().split('T')[0];
        }
        
        // Update step display
        this.updateStepDisplay();
    }

    /**
     * Populate the disciplines selection grid
     */
    populateDisciplinesGrid() {
        const grid = $('disciplines-grid');
        if (!grid) return;

        grid.innerHTML = AVAILABLE_DISCIPLINES.map(disc => `
            <div class="disc-item" onclick="toggleDiscipline(this, '${disc}')">
                <span class="disc-checkbox">☐</span>
                <span>${disc}</span>
            </div>
        `).join('');
    }

    /**
     * Populate template selector
     */
    populateTemplates() {
        const grid = $('template-grid');
        if (!grid) return;

        grid.innerHTML = Object.entries(PROJECT_TEMPLATES).map(([key, template]) => `
            <div class="template-card" onclick="applyTemplate('${key}')">
                <div class="template-icon">${template.icon}</div>
                <div class="template-name">${template.name}</div>
                <div class="template-desc">${template.disciplines.length} disciplines, ${template.packages.length} packages</div>
            </div>
        `).join('');
    }

    /**
     * Check for saved data and show recovery modal if needed
     */
    checkForSavedData() {
        // First check URL for shared data
        const urlData = loadFromURL();
        if (urlData) {
            loadFromSavedData({ projectData: urlData });
            this.updateUIFromState();
            return;
        }

        // Check localStorage for autosaved data
        const savedData = loadFromLocalStorage();
        if (savedData && hasMeaningfulData(savedData)) {
            this.showRecoveryModal(savedData);
        }
    }

    /**
     * Show recovery modal
     * @param {object} savedData - Saved data to recover
     */
    showRecoveryModal(savedData) {
        const modal = $('recovery-modal');
        if (modal) {
            show(modal);
        }
    }

    /**
     * Update UI from current state
     */
    updateUIFromState() {
        // Update phase input
        const phasesInput = $('phases-input');
        if (phasesInput && projectData.phases.length > 0) {
            phasesInput.value = projectData.phases.join(', ');
        }

        // Update packages input
        const packagesInput = $('packages-input');
        if (packagesInput && projectData.packages.length > 0) {
            packagesInput.value = projectData.packages.join(', ');
        }

        // Update disciplines selection
        projectData.disciplines.forEach(disc => {
            const items = document.querySelectorAll('.disc-item');
            items.forEach(item => {
                if (item.textContent.includes(disc)) {
                    item.classList.add('selected');
                    item.querySelector('.disc-checkbox').textContent = '☑';
                }
            });
        });

        this.updateStepDisplay();
    }

    /**
     * Update step navigation display
     */
    updateStepDisplay() {
        // Update progress bar
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            removeClass(step, 'active', 'completed');
            if (index + 1 === currentStep) {
                addClass(step, 'active');
            } else if (index + 1 < currentStep) {
                addClass(step, 'completed');
            }
        });

        // Show/hide step content
        for (let i = 1; i <= 6; i++) {
            const stepEl = $(`step${i}`);
            if (stepEl) {
                if (i === currentStep) {
                    show(stepEl);
                } else {
                    hide(stepEl);
                }
            }
        }

        // Update navigation buttons
        const prevBtn = $('prev-btn');
        const nextBtn = $('next-btn');
        const generateBtn = $('generate-btn');

        if (prevBtn) {
            if (currentStep > 1) {
                show(prevBtn);
            } else {
                hide(prevBtn);
            }
        }

        if (nextBtn && generateBtn) {
            if (currentStep === 6) {
                hide(nextBtn);
                show(generateBtn);
            } else {
                show(nextBtn);
                hide(generateBtn);
            }
        }

        // Update status text
        const statusText = $('status-text');
        if (statusText) {
            const stepNames = ['PHASES', 'DISCIPLINES', 'PACKAGES', 'BUDGET', 'CLAIMING', 'SCHEDULE'];
            statusText.textContent = `STEP ${currentStep}: ${stepNames[currentStep - 1]}`;
        }
    }

    /**
     * Attach global event listeners
     */
    attachEventListeners() {
        // Input change listeners for autosave
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('change', () => triggerAutosave());
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+S to save
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                triggerAutosave();
            }
        });
    }
}

// Create and export app instance
export const app = new App();

// Initialize on DOM ready
if (typeof window !== 'undefined') {
    window.app = app;
}

