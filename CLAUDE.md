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
    dates: {}          // { "discipline-package": { start, end } }
}
```

## Key Features

### 6-Step Wizard Interface
1. **PHASES** - Define project phases (comma-separated)
2. **DISCIPLINES** - Select engineering disciplines (grid selection)
3. **PACKAGES** - Define deliverable packages/milestones
4. **BUDGET** - Set total budget per discipline
5. **CLAIMING** - Set claiming % per package (must total 100% per discipline)
6. **SCHEDULE** - Set start/end dates for each package

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

The following updates were made to the application defaults:

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

## Color Palette

Terminal/console theme with gold accents:
- **Background:** `#0a0a0a` (body), `#0d0d0d` (terminal)
- **Primary accent:** `#ffd700` (gold)
- **Text:** `#ffd700` (gold), `#fff` (white), `#888` (gray)
- **Borders:** `#333`, `#444`
- **Status indicators:** `#00ff00` (ok), `#ff4444` (error)

## Key Functions

### Navigation
- `goToStep(step)` - Jump to specific step (line 748)
- `nextStep()` - Validate and advance (line 811)
- `prevStep()` - Go back (line 825)
- `showStep(step)` - Display step content (line 736)

### Data Building
- `buildBudgetTable()` - Generate budget input table (line 833)
- `buildClaimingTable()` - Generate claiming % grid (line 874)
- `buildDatesTable()` - Generate schedule table (line 930)
- `buildWBSTable()` - Generate final WBS output (line 1035)

### Chart Management
- `createChart()` - Initialize Chart.js (line 1113)
- `getChartData()` - Calculate chart data points (line 1180)
- `updateChart()` - Refresh chart with filters (line 1241)

### Utilities
- `validate()` - Step validation (line 787)
- `saveCurrentStep()` - Persist current data (line 756)
- `exportCSV()` - Generate CSV download (line 1253)
- `updateKPIs()` - Calculate summary metrics (line 1008)

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

## Responsive Design

Breakpoint: `768px` (line 364)
- KPI grid: 4 columns → 2 columns
- Filters: 4 columns → 2 columns
- Disciplines grid: auto-fill → 2 columns

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

### Testing Checklist
- [ ] All 6 steps navigate correctly
- [ ] Budget totals calculate properly
- [ ] Claiming percentages validate (100% per discipline)
- [ ] Date ranges calculate duration correctly
- [ ] WBS table generates with correct numbering
- [ ] Chart displays with filters working
- [ ] CSV export downloads correctly
- [ ] Responsive breakpoints work
- [ ] Edit mode returns to wizard

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
