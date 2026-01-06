# CLAUDE.md - IPC Builder

This file provides guidance to Claude Code when working with the IPC Builder (WBS Terminal) codebase.

## Project Overview

**WBS Terminal v1.0** is a zero-build, single-page web application for generating Work Breakdown Structures (WBS) for engineering projects. It provides a terminal-themed interface for project planning, budgeting, and schedule management.

**Location:** `/Volumes/mjamiv_2/claude-code/ipc-builder/`
**GitHub:** https://github.com/mjamiv/IPC-Builder
**Live URL:** https://mjamiv.github.io/IPC-Builder/

## Tech Stack

- **HTML5** - Single-file application
- **CSS3** - Terminal/console theme with dark background and gold accents
- **Vanilla JavaScript** - No frameworks
- **Chart.js** (via CDN) - Data visualization
- **Google Fonts** - JetBrains Mono (monospace)

## Running the Application

```bash
# No build step required
open index.html
```

Or serve via local server:
```bash
python3 -m http.server 8000
# Navigate to http://localhost:8000
```

Or access the live deployment at: https://mjamiv.github.io/IPC-Builder/

## Application Architecture

### Single-File Structure
All code is contained in `index.html`:
- Lines 1-396: HTML structure and CSS styles
- Lines 397-603: HTML markup (terminal UI, forms, tables)
- Lines 604-1279: JavaScript application logic

### Data Model

```javascript
projectData = {
    phases: [],        // Project phases (e.g., "Base", "ESDC", "TSCD")
    disciplines: [],   // Engineering disciplines (e.g., "Structures", "Civil")
    packages: [],      // Deliverable milestones (e.g., "Preliminary", "Interim", "Final", "RFC")
    budgets: {},       // { discipline: totalBudget }
    claiming: {},      // { "discipline-package": claimPercentage }
    dates: {},         // { "discipline-package": { start, end } }
    calculator: {      // Cost estimator data (NEW)
        totalConstructionCost: 0,
        designFeePercent: 15,
        projectType: 'Highway/Roadway',
        totalDesignFee: 0,
        complexityOverrides: {},  // Manual complexity settings per discipline
        isCalculated: false,
        manualEdits: {}          // Track which budgets were manually edited
    }
}
```

## Key Features

### 6-Step Wizard Interface
1. **PHASES** - Define project phases (comma-separated)
2. **DISCIPLINES** - Select engineering disciplines (grid selection)
3. **PACKAGES** - Define deliverable packages/milestones
4. **BUDGET** - Set total budget per discipline (with cost estimator)
5. **CLAIMING** - Set claiming % per package (must total 100% per discipline)
6. **SCHEDULE** - Set start/end dates for each package

### Cost Estimator (Step 4: Budget)

**Purpose:** Calculate discipline budgets based on industry standards with real-time variance indicators.

**Calculator Inputs:**
- Total Construction Cost ($)
- Design Fee (% of Construction)
- Project Type (Bridge, Highway/Roadway, Drainage/Utilities)
- Project Complexity (Low, Medium, High - reference only)

**Calculation Method:**
```
Total Design Fee = Construction Cost × Design Fee %
Budget per Discipline = Total Design Fee × (Normalized Distribution %)
```

**Project Types & Auto-Complexity:**
- **Bridge:** Structures=High, Civil=High, Geotechnical=High, Electrical=Low, Traffic=Low
- **Highway/Roadway:** Civil=High, Traffic=High, Pavement=High, Drainage=High, Survey=High
- **Drainage/Utilities:** Drainage=High, Utilities=High, Environmental=High, Civil=Medium

**Industry Distribution Percentages:**
- 3 project types × 18 disciplines × 3 complexity levels
- Percentages automatically normalized to sum to 100% based on selected disciplines
- Example: Bridge → Structures → High = 28% (before normalization)

**Industry Comparison Indicators:**
- **↑** (red) - Above industry range (tooltip shows variance %)
- **↓** (green) - Below industry range (tooltip shows variance %)
- **•** (gold) - Within industry range
- Indicators update in real-time when budgets manually edited

**User Experience:**
- Collapsible calculator section (expands on first visit)
- Advanced Settings for per-discipline complexity overrides
- Manual edits preserved during recalculation
- Click header to re-expand and recalculate
- Calculator collapses after calculation with status update

**Key Features:**
- Smart manual edit tracking (excludes edited disciplines from recalculation)
- Percentage normalization ensures budgets sum to total design fee
- Benchmark variance tracking for major disciplines
- Responsive 2-column layout (1-column on mobile)
- Smooth collapse/expand animations

### WBS Generation
- Hierarchical WBS numbering: `phase.discipline.package` (e.g., 1.1.1)
- Budget distribution based on claiming percentages
- Automatic calculations and validations

### Data Visualization
- **Chart Types:** Line or bar charts
- **Views:** Cumulative or monthly
- **Filters:** By phase, discipline
- **Data:** BCWS (Planned) vs ACWP (Actual - TBD)

### Export
- CSV export of complete WBS table
- Filename: `wbs_structure.csv`

## Recent Changes

### Latest: Cost Estimator Feature (January 2026)

**Major new feature:** Added cost estimator/pricing calculator to Budget tab (Step 4).

**What's New:**
- Collapsible calculator with 4 inputs (Construction Cost, Design Fee %, Project Type, Complexity)
- 3 project types with auto-complexity mapping for 18 disciplines
- Industry-standard distribution percentages (54 unique combinations)
- Real-time budget calculation with percentage normalization
- Industry comparison indicators (↑↓•) with hover tooltips showing variance
- Advanced settings for per-discipline complexity overrides
- Smart manual edit tracking preserves user changes during recalculation
- +598 lines of code added to index.html

**Technical Details:**
- New `calculator` property in `projectData` object
- 3 new data constants: `projectComplexityMap`, `industryDistribution`, `industryBenchmarks`
- 9 new functions for calculator logic and UI
- Modified `buildBudgetTable()` to include indicator column
- Added calculator CSS with tooltip system

### Previous Updates (Application Defaults)

1. **Simplified default phases** - Changed from full list to minimal `"Base,"` to encourage customization
2. **Updated phase quick tags** - Replaced "Construction Support" with "As-Builts"
3. **Revised package defaults** - Changed from percentage-based (50%, 90%) to milestone-based (Preliminary, Interim, Final, RFC, As-Buit)
4. **Reduced pre-selected disciplines** - Only "Structures" and "Design Management" are now pre-selected (down from 7 disciplines)
5. **Added database roadmap note** - Code comment indicates future database integration for budget values
6. **Updated README** - Added live app URL: https://mjamiv.github.io/IPC-Builder/

## Default Values

### Default Phases
- **Input default:** `"Base,"` - Minimal default, user expected to customize
- **Quick-add tags:** Base, ESDC, TSCD, As-Builts, Closeout

### Default Packages
- **Input default:** `"Preliminary, Interim, Final, RFC, As-Buit"` (Note: "As-Buit" has a typo)
- **Quick-add tags:** Preliminary, Interim, Final, RFC, As-Built

### Pre-selected Disciplines
Only 2 disciplines are pre-selected by default:
- Structures
- Design Management

All other disciplines (Civil, Drainage, Electrical, Environmental, Traffic, ITS, Mechanical, Geotechnical, Survey, Landscape, Utilities, Lighting, Pavement, Bridges, Safety, QA/QC) are available but not pre-selected.

### Example Budgets
Hardcoded in `exampleBudgets` object (lines 639-660):
- Structures: $450,000
- Design Management: $180,000
- Civil: $320,000
- (etc.)

**Note:** Comment in code indicates future plan to use database for budgets instead of hardcoded values.

### Default Claiming Scheme
`[10, 15, 25, 30, 20]` - Distribution across 5 packages

### Cost Estimator Data (NEW)

**Project Complexity Map** (lines 673-699)
- 3 project types × 18 disciplines
- Auto-assigns Low/Medium/High complexity per discipline based on project type
- Example: Bridge projects auto-assign Structures=High, Traffic=Low

**Industry Distribution Percentages** (lines 701-763)
- 3 project types × 18 disciplines × 3 complexity levels = 162 data points
- Base percentages before normalization
- Example distributions:
  - Bridge → Structures → High: 28%
  - Highway/Roadway → Civil → High: 22%
  - Drainage/Utilities → Drainage → High: 26%

**Industry Benchmarks** (lines 765-788)
- Variance calculation ranges for major disciplines
- Structure: `{ min, max, typical }` as ratios (0.0-1.0)
- Currently covers ~6 key disciplines per project type
- Used for ↑↓• indicator determination

**Calculator Defaults:**
- Design Fee %: 15%
- Project Type: "Highway/Roadway"
- Project Complexity: "Medium" (reference only)

## Color Palette

Terminal/console theme with gold accents:
- **Background:** `#0a0a0a` (body), `#0d0d0d` (terminal)
- **Primary accent:** `#ffd700` (gold)
- **Text:** `#ffd700` (gold), `#fff` (white), `#888` (gray)
- **Borders:** `#333`, `#444`
- **Status indicators:** `#00ff00` (ok), `#ff4444` (error)

## Key Functions

### Navigation
- `goToStep(step)` - Jump to specific step
- `nextStep()` - Validate and advance
- `prevStep()` - Go back
- `showStep(step)` - Display step content

### Data Building
- `buildBudgetTable()` - Generate budget input table with indicator column (line 1163)
- `buildClaimingTable()` - Generate claiming % grid
- `buildDatesTable()` - Generate schedule table
- `buildWBSTable()` - Generate final WBS output

### Cost Estimator Functions (NEW)
- `initCalculator()` - Initialize calculator inputs and event listeners (line 1299)
- `updateCalculatorTotal()` - Calculate and display total design fee (line 1288)
- `toggleCalculator()` - Expand/collapse calculator section (line 1210)
- `showComplexityOverrides()` - Show/hide advanced settings (line 1223)
- `buildComplexityOverrideGrid()` - Generate complexity override controls (line 1234)
- `saveComplexityOverride()` - Save manual complexity settings (line 1260)
- `updateComplexityDefaults()` - Reset overrides when project type changes (line 1274)
- `calculateBudgets()` - Main calculation logic with normalization (line 1305)
- `updateIndustryIndicators()` - Calculate variance and display indicators (line 1377)
- `updateTotalBudget()` - Sum budget inputs, trigger indicator updates (line 1196)

### Chart Management
- `createChart()` - Initialize Chart.js
- `getChartData()` - Calculate chart data points
- `updateChart()` - Refresh chart with filters

### Utilities
- `validate()` - Step validation
- `saveCurrentStep()` - Persist current data
- `exportCSV()` - Generate CSV download
- `updateKPIs()` - Calculate summary metrics

## UI Components

### Progress Bar
- 6-step indicator at top
- States: `active`, `completed`, default
- Click to navigate back to completed steps

### Terminal Header
- Application title: "WBS TERMINAL v1.0"
- Status indicator (right side)

### Forms & Inputs
- Dark inputs with gold borders on focus
- Quick-add tags for common values
- Real-time validation and totals

### Tables
- Sticky headers/footers for scrollable tables
- Inline editing with `table-input` class
- Color-coded status (green/red)

### KPI Cards
- 4-card grid showing:
  - Total Budget
  - WBS Elements count
  - Disciplines count
  - Project duration (months)

### Cost Estimator Calculator (NEW)
- Collapsible section with header (click to expand/collapse)
- 2-column grid layout for inputs (responsive)
- Total Design Fee display box
- Action buttons: "Advanced Settings" and "Calculate Estimates"
- Advanced settings section (hidden by default):
  - 3-column grid of complexity overrides
  - Asterisk (*) indicates manual overrides
- Status indicator in header shows calculation state

### Industry Indicators (NEW)
- Small symbols in "IND" column of budget table
- Color-coded: Red (above), Green (below), Gold (within)
- Tooltip on hover with benchmark details
- Real-time updates on budget changes

## Responsive Design

Breakpoint: `768px` (line 530)
- KPI grid: 4 columns → 2 columns
- Filters: 4 columns → 2 columns
- Disciplines grid: auto-fill → 2 columns
- **Calculator grid: 2 columns → 1 column** (NEW)
- **Complexity override grid: 3 columns → 1 column** (NEW)

## Code Conventions

### Indentation
- 4 spaces for HTML/CSS
- 4 spaces for JavaScript

### Naming Conventions
- `kebab-case` for IDs and classes
- `camelCase` for JavaScript variables/functions
- `UPPERCASE` for constants and button labels

### Comments
- Section markers: `// Data`, `// Navigation`, etc.
- Inline comments for complex logic

## Development Guidelines

### Making Changes

1. **UI Styling**
   - All styles in `<style>` block (lines 9-395)
   - Use existing color variables
   - Maintain terminal aesthetic

2. **Business Logic**
   - Modify functions in `<script>` block (lines 604-1277)
   - Maintain data model structure
   - Update validation as needed

3. **Default Values**
   - Edit phases input default value (line 425)
   - Edit packages input default value (line 459)
   - Edit `allDisciplines` array (line 618) - controls pre-selected disciplines
   - Edit `exampleBudgets` object (line 639) - hardcoded budget values
   - Edit `defaultClaiming` array (line 663) - claiming percentage distribution
   - Modify quick-add tags for phases (lines 427-432) and packages (lines 461-467)

4. **Cost Estimator Data (NEW)**
   - Edit `projectComplexityMap` (lines 673-699) - auto-complexity assignments
   - Edit `industryDistribution` (lines 701-763) - distribution percentages
   - Edit `industryBenchmarks` (lines 765-788) - variance calculation ranges
   - Modify calculator HTML inputs (lines 618-676) for different options
   - Adjust calculator CSS (lines 396-537) for styling changes

### Testing Checklist

**Basic Navigation:**
- [ ] All 6 steps navigate correctly
- [ ] Budget totals calculate properly
- [ ] Claiming percentages validate (100% per discipline)
- [ ] Date ranges calculate duration correctly
- [ ] WBS table generates with correct numbering
- [ ] Chart displays with filters working
- [ ] CSV export downloads correctly
- [ ] Responsive breakpoints work
- [ ] Edit mode returns to wizard

**Cost Estimator (NEW):**
- [ ] Calculator expands on first visit to Step 4
- [ ] Construction cost × design fee % = correct total
- [ ] All 3 project types calculate correctly
- [ ] Percentages sum to total design fee
- [ ] Calculator collapses after calculation
- [ ] Click header re-expands calculator
- [ ] Status updates correctly ("Configure inputs" → "Estimates applied")
- [ ] Industry indicators (↑↓•) appear after calculation
- [ ] Tooltips display correct ranges and variance
- [ ] Manual budget edits update indicators immediately
- [ ] Manual edits preserved during recalculation
- [ ] Advanced settings show/hide complexity grid
- [ ] Complexity overrides affect calculations
- [ ] Asterisk (*) marks manual complexity overrides
- [ ] Project type change clears overrides
- [ ] Calculator validates construction cost (required, > 0)
- [ ] Calculator validates design fee (1-30%)
- [ ] Responsive layout: 2-col → 1-col on mobile

## Known Limitations

1. **No persistence** - Data lost on page refresh
2. **No actual cost tracking** - ACWP always shows $0
3. **No user authentication** - Client-side only
4. **No validation rules** - Beyond basic required fields
5. **No undo/redo** - Changes are immediate

## Future Enhancement Ideas

- LocalStorage persistence
- Import CSV functionality
- Multiple project management
- Actual cost tracking integration
- **Database integration for budgets** (noted in code comments)
- Gantt chart visualization
- Resource allocation
- Template library
- Print/PDF export
- Fix typo in default packages ("As-Buit" → "As-Built")
- **Expand industry benchmarks** - Add benchmark ranges for all 18 disciplines
- **Custom project types** - Allow users to create and save custom project type profiles
- **Export calculator settings** - Save/load calculator configurations
- **Historical comparison** - Compare current project budgets to past projects

## Performance Considerations

- All calculations happen client-side
- Chart re-renders on filter change
- No optimization needed for typical project sizes (< 100 WBS elements)
- Scrollable containers for large tables (max-height with overflow)

## Accessibility

- Semantic HTML elements
- Keyboard navigation supported
- Color contrast: Gold (#ffd700) on black (#0a0a0a) meets WCAG AA
- Hover states for interactive elements
- Focus states for inputs

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ support
- Chart.js loaded via CDN
- No polyfills included

## Deployment

### GitHub Pages
- Push to main branch
- Enable GitHub Pages from repository settings
- No build process required

### Custom Domain
- Add CNAME file if needed
- Configure DNS settings

## Key Files

- `index.html` - Complete application (only file needed)
- `README.md` - Basic project description

## Related Projects

This project is part of the mjamiv/claude-code repository which also includes:
- btcyoy - Bitcoin historical price tracker
- rorimartello - Author website
- pile-designer - Pile design tool (in development)
