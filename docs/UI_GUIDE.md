# IPC-Builder UI Guide

**WBS Terminal v2.0** - Complete User Interface Documentation

This guide describes every screen, pane, and data element in the IPC-Builder application.

---

## Table of Contents

1. [Application Layout](#application-layout)
2. [Step 1: Phases](#step-1-phases)
3. [Step 2: Disciplines](#step-2-disciplines)
4. [Step 3: Packages](#step-3-packages)
5. [Step 4: Budget](#step-4-budget)
6. [Step 5: Claiming](#step-5-claiming)
7. [Step 6: Schedule](#step-6-schedule)
8. [Results Page](#results-page)
9. [Modals & Panels](#modals--panels)

---

## Application Layout

### Terminal Header
| Element | Description |
|---------|-------------|
| **Title** | "WBS TERMINAL v1.0" - Application branding |
| **Reports Button** | Opens reports dropdown (visible on results page) |
| **Autosave Indicator** | Shows save status with timestamp |

### Progress Bar
| Element | Description |
|---------|-------------|
| **6 Step Indicators** | Shows current step (1-6) with labels |
| **Completed Steps** | Filled/highlighted when completed |
| **Active Step** | Currently active with accent color |
| **Click Navigation** | Click completed steps to return |

### Navigation Buttons
| Button | Location | Description |
|--------|----------|-------------|
| **← BACK** | Top-left | Return to previous step |
| **NEXT →** | Top-right | Advance to next step (validates current) |
| **GENERATE WBS** | Step 6 | Final generation button |

---

## Step 1: Phases

**Purpose:** Define the project phases (timeline segments for the WBS)

### Input Field
| Field | Type | Description |
|-------|------|-------------|
| **Project Phases** | Text input | Comma-separated phase names |
| **Default Value** | `"Base,"` | Minimal starting point |

### Quick Add Tags
Clickable tags to quickly add common phases:
- **Base** - Base design phase
- **ESDC** - Early System Design Configuration
- **TSCD** - Technical System Configuration Design
- **As-Builts** - As-built documentation
- **Closeout** - Project closeout phase

### Template Selector Panel
Collapsible panel with 6 pre-configured project templates:

| Template | Phases | Disciplines | Construction Cost |
|----------|--------|-------------|-------------------|
| **Highway Reconstruction** | Base, ESDC, TSCD, As-Builts | 8 | $50M |
| **Bridge Replacement** | Base, ESDC, TSCD | 6 | $25M |
| **Drainage Improvement** | Base, Final, As-Builts | 5 | $15M |
| **Intersection Improvement** | Base, ESDC, Final | 4 | $8M |
| **Multi-Discipline Infrastructure** | Base, ESDC, TSCD, As-Builts | 12 | $100M |
| **Transit/Rail Station** | Base, ESDC, TSCD, As-Builts | 10 | $75M |

Each template card shows:
- Template name and description
- Phase count, discipline count, package count
- "USE TEMPLATE" button

---

## Step 2: Disciplines

**Purpose:** Select engineering disciplines to include in the WBS

### Discipline Grid
18+ selectable discipline buttons arranged in a grid:

| Discipline | Description |
|------------|-------------|
| **Civil** | Civil engineering (roadway, grading) |
| **Structures** | Bridges, retaining walls, misc structures |
| **Drainage** | Stormwater management, culverts |
| **Traffic** | Traffic signals, signing, striping |
| **Utilities** | Utility relocations and coordination |
| **Environmental** | Environmental compliance, permitting |
| **Geotechnical** | Soil analysis, foundation design |
| **Survey** | Field surveys, mapping |
| **ROW** | Right-of-way acquisition |
| **Electrical** | Lighting, electrical systems |
| **Landscape** | Landscaping, aesthetics |
| **QA/QC** | Quality assurance/control |
| **Design Management** | Project management, coordination |
| **Systems** | ITS, communications systems |
| **Track** | Rail track design |
| **MOT** | Maintenance of traffic |
| **Digital Delivery** | BIM, digital models |
| **Noise Walls** | Sound barrier design |

### Selection State
- **Selected:** Gold/accent background
- **Unselected:** Dark background with border
- **Click:** Toggle selection

### Actions
| Button | Description |
|--------|-------------|
| **Select All** | Selects all disciplines |
| **+ Add Custom** | Opens input for custom discipline name |

---

## Step 3: Packages

**Purpose:** Define deliverable milestones/packages

### Input Field
| Field | Type | Description |
|-------|------|-------------|
| **Deliverable Packages** | Text input | Comma-separated package names |
| **Default Value** | `"Preliminary, Interim, Final, RFC, As-Built"` |

### Quick Add Tags
- **Preliminary** - Initial design package (30%)
- **Interim** - Progress design (60%)
- **Final** - Final design (90%)
- **RFC** - Released for Construction (100%)
- **As-Built** - As-built documentation

---

## Step 4: Budget

**Purpose:** Set total budget per discipline with cost estimation tools

### Budget Table
| Column | Description |
|--------|-------------|
| **Discipline** | Discipline name |
| **Total Budget** | Currency input for total discipline budget |
| **Industry Indicator** | Variance from industry standards (↑/↓/•) |

### Cost Estimator Calculator (Collapsible)

**Input Fields:**
| Field | Type | Description |
|-------|------|-------------|
| **Total Construction Cost** | Currency | Project construction cost |
| **Design Fee %** | Percentage | Typically 10-20% |
| **Project Type** | Dropdown | Bridge / Highway/Roadway / Drainage/Utilities |
| **Project Complexity** | Dropdown | Low / Medium / High (reference) |

**Output:**
| Field | Description |
|-------|-------------|
| **Total Design Fee** | Calculated: Construction Cost × Design Fee % |

**Industry Comparison Indicators:**
| Symbol | Color | Meaning |
|--------|-------|---------|
| **↑** | Red | Above industry range |
| **↓** | Green | Below industry range |
| **•** | Gold | Within industry range |

### MH Benchmark Estimator (Collapsible)

**Purpose:** Estimate man-hours based on historical project data

**Features:**
| Element | Description |
|---------|-------------|
| **Discipline Rows** | One row per selected discipline |
| **Quantity Input** | Enter quantity (LF, SF, EA, etc.) |
| **Unit of Measure** | Discipline-specific (from benchmarking data) |
| **Calculated MH** | Estimated man-hours with confidence range |
| **Apply Button** | Transfer estimates to budget table |

**Statistical Display:**
- **Estimate:** Mean × Quantity
- **Range:** (Mean - StdDev) to (Mean + StdDev) × Quantity
- **Tooltip:** Shows detailed statistics

---

## Step 5: Claiming

**Purpose:** Set claiming percentage per package per discipline

### Claiming Table
| Column | Description |
|--------|-------------|
| **Discipline** | Discipline name |
| **Package 1-N** | Percentage input for each package |
| **Total** | Must equal 100% (validated) |

### Claiming Scheme Presets (Collapsible)

**Available Schemes:**
| Scheme | Distribution | Example (5 packages) |
|--------|--------------|---------------------|
| **Linear/Even** | Equal | 20%, 20%, 20%, 20%, 20% |
| **Front-Loaded** | Descending | 30%, 25%, 20%, 15%, 10% |
| **Back-Loaded** | Ascending | 10%, 15%, 20%, 25%, 30% |
| **Bell Curve** | Center-weighted | 15%, 25%, 30%, 20%, 10% |

**Actions:**
| Button | Description |
|--------|-------------|
| **Preview** | Shows distribution table before applying |
| **Apply Scheme** | Applies to all disciplines |

---

## Step 6: Schedule

**Purpose:** Set start/end dates for each discipline-package combination

### Schedule Table
| Column | Description |
|--------|-------------|
| **Discipline** | Discipline name |
| **Package** | Package name |
| **Start Date** | Date picker |
| **End Date** | Date picker |
| **Duration** | Auto-calculated days |

### AI Schedule Generation (Collapsible)

**Input Fields:**
| Field | Type | Description |
|-------|------|-------------|
| **Project Start Date** | Date picker | When project begins |
| **Project Duration** | Number | Total months |

**Actions:**
| Button | Description |
|--------|-------------|
| **Generate AI Schedule** | Uses GPT to create optimized schedule |
| **Apply Schedule** | Applies AI-generated dates to table |

**AI Considerations:**
- Discipline dependencies (e.g., Survey before Civil)
- Typical phase durations
- Parallel vs sequential work
- Industry standards

---

## Results Page

**Purpose:** Display generated WBS with visualization and export options

### KPI Cards (4-card grid)
| Card | Description |
|------|-------------|
| **Total Budget** | Sum of all discipline budgets |
| **WBS Elements** | Total count of WBS line items |
| **Disciplines** | Number of disciplines |
| **Duration** | Project duration in months |

### Performance Chart

**Chart Types:**
| Type | Description |
|------|-------------|
| **Line Chart** | Time series of budget claims |
| **Bar Chart** | Stacked monthly claims by discipline |

**Views:**
| View | Description |
|------|-------------|
| **Cumulative** | Running total over time |
| **Monthly** | Period-by-period values |

**Filters:**
| Filter | Options |
|--------|---------|
| **Phase** | All phases / specific phase |
| **Discipline** | All disciplines / specific discipline |

### Gantt Chart (Collapsible)

**Elements:**
| Element | Description |
|---------|-------------|
| **Timeline Header** | Month columns across project duration |
| **Discipline Rows** | Collapsible parent rows |
| **Package Bars** | Horizontal bars showing duration |
| **Current Date Marker** | Red vertical line |
| **Tooltips** | Hover for dates and budget |

**Actions:**
| Button | Description |
|--------|-------------|
| **Expand All** | Show all package rows |
| **Collapse All** | Show only discipline rows |

### WBS Table

**Columns:**
| Column | Description |
|--------|-------------|
| **WBS #** | Hierarchical numbering (1.1.1) |
| **Phase** | Phase name |
| **Discipline** | Discipline name |
| **Package** | Package name |
| **Budget** | Dollar amount |
| **Start** | Start date |
| **End** | End date |
| **Duration** | Days |

**Edit Mode:**
| Action | Description |
|--------|-------------|
| **Toggle Edit Mode** | Enable inline editing |
| **Edit Budget** | Click to modify budget |
| **Edit Dates** | Click to modify dates |
| **Add/Remove** | Add or remove disciplines, packages, phases |
| **Recalculate** | Recalculate from industry standards |

### AI Insights Panel (Collapsible)

**Cards:**
| Card | Description |
|------|-------------|
| **Risk Score** | Low/Medium/High with factors |
| **Cost Forecast** | Projected final cost with contingency |
| **Schedule Forecast** | Estimated completion with buffer |
| **Budget Health** | Analysis of budget distribution |

**AI Suggestions:**
- Requires OpenAI API key
- Generates recommendations based on project data
- Includes risk mitigation strategies

---

## Modals & Panels

### AI Chat Assistant

**Location:** Floating panel (draggable)

**Elements:**
| Element | Description |
|---------|-------------|
| **Header** | "AI Assistant" with close button |
| **Context Badge** | Shows current step/state |
| **Message History** | Scrollable chat messages |
| **Input Field** | Text input for questions |
| **Send Button** | Submit message |
| **Settings Button** | API key management |

**Capabilities:**
- Natural language WBS editing
- Budget adjustments
- Schedule modifications
- What-if analysis
- Project summaries

### RFP Wizard Modal

**Stage 1: Upload**
| Element | Description |
|---------|-------------|
| **Drop Zone** | Drag & drop PDF area |
| **File Input** | Browse button |
| **File Info** | Shows selected file name/size |

**Stage 2: Configure**
| Element | Description |
|---------|-------------|
| **Page Range** | Start/end page inputs |
| **Text Preview** | Extracted text preview |
| **Process Button** | Start AI analysis |

**Stage 3: Review**
| Element | Description |
|---------|-------------|
| **Extracted Quantities** | Grid of extracted values |
| **AI Reasoning** | Explanation for each extraction |
| **Confidence Scores** | Accuracy indicators |
| **Usage Statistics** | API calls, tokens, cost |
| **Apply Button** | Apply to estimators |

### Project Manager Modal

**Save Section:**
| Element | Description |
|---------|-------------|
| **Project Name** | Text input |
| **Save Button** | Save current project |

**Project List:**
| Column | Description |
|--------|-------------|
| **Name** | Project name |
| **Modified** | Last modified date |
| **Disciplines** | Discipline count |
| **Budget** | Total budget |
| **Actions** | Load / Duplicate / Delete |

**Compare View:**
- Toggle to enable side-by-side comparison
- Select two projects to compare

### Recovery Modal

**Shown:** On page load if unsaved data exists

**Elements:**
| Element | Description |
|---------|-------------|
| **Preview** | Summary of saved data |
| **Restore Button** | Restore saved session |
| **Dismiss Button** | Keep modal but don't restore |
| **Discard Button** | Delete saved data |

### Reports Dropdown

**Available Reports:**
| Report | Description |
|--------|-------------|
| **Comprehensive Project Report** | PDF with cover, executive summary, charts, full WBS |
| **Export CSV** | WBS table as CSV |
| **Export Full Data CSV** | Complete project data |
| **Import CSV** | Import from exported file |
| **Share URL** | Generate shareable link |
| **RFP Analysis Report** | PDF of extracted RFP data |

---

## Design System Reference

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0a0a` | Body |
| Terminal | `#0d0d0d` | Main container |
| Cards | `#1a1a1a` | Card backgrounds |
| Primary | `#ffd700` | Gold accent |
| Success | `#00ff00` | Positive states |
| Error | `#ff4444` | Negative states |
| Warning | `#ffaa00` | Caution states |
| Text Primary | `#ffd700` | Headings |
| Text Secondary | `#ffffff` | Body text |
| Text Muted | `#888888` | Secondary text |
| Border | `#333333` | Borders |

### Typography

| Element | Font | Size |
|---------|------|------|
| Body | JetBrains Mono | 14px |
| Headings | JetBrains Mono | 18-24px |
| Buttons | JetBrains Mono | 12-14px |
| Labels | JetBrains Mono | 11-12px |

### Components

| Component | Class | Description |
|-----------|-------|-------------|
| Button Primary | `.btn-primary` | Gold background |
| Button Secondary | `.btn-secondary` | Outline style |
| Card | `.card-base` | Dark background with border |
| Modal | `.modal-base` | Centered overlay |
| Input | Standard | Dark background, gold focus |
| Table | Standard | Striped rows |

---

*For screenshots, open the live application at https://mjamiv.github.io/IPC-Builder/ and capture each step.*

