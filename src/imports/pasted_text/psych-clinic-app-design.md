Design a complete desktop application UI (1440x900px) for a 
**Psychiatric Clinic Management System** with AI-powered emotion 
detection via webcam. The app will be converted to PySide6 
(Python desktop app). Use a professional medical theme with a 
dark sidebar and clean white content areas.

═══════════════════════════════════════
COLOR PALETTE & DESIGN SYSTEM
═══════════════════════════════════════
Primary: #1A6B8A (medical teal-blue)
Secondary: #2ECC71 (calm green for positive states)
Danger/Alert: #E74C3C (red for distress alerts)
Warning: #F39C12 (amber for moderate states)
Sidebar Background: #0F2B3D (deep navy)
Content Background: #F5F7FA (light gray)
Card Background: #FFFFFF
Text Primary: #1A1A2E
Text Secondary: #6B7280
Border: #E5E7EB

Typography:
- Font: Inter or Segoe UI (Windows-native feel)
- Headers: 24px Bold
- Subheaders: 18px SemiBold
- Body: 14px Regular
- Labels: 12px Medium
- Sidebar items: 14px Medium

Design style: Clean, minimal, clinical — similar to modern 
hospital software. Rounded corners (8px radius on cards). 
Subtle shadows on cards (0 2px 8px rgba(0,0,0,0.08)).

═══════════════════════════════════════
LAYOUT STRUCTURE (ALL PAGES)
═══════════════════════════════════════
Fixed left sidebar: 240px wide, dark navy (#0F2B3D)
Top header bar: 60px tall, white, with breadcrumb + user info
Main content area: remaining space, #F5F7FA background

Sidebar contains:
- Clinic logo + name at top (60px logo area)
- Navigation items with icons:
  · Dashboard (grid icon)
  · Patients (person icon)
  · Live Monitor (camera icon) — with live badge
  · Sessions (calendar icon)
  · Alerts (bell icon) — with red badge counter
  · Reports (chart icon)
  · Cameras (video icon)
  · Staff Management (people icon)
  · Settings (gear icon)
- At bottom: logged-in user avatar + name + role + logout button
- Active state: teal left border + light teal background on nav item

═══════════════════════════════════════
PAGE 1 — LOGIN SCREEN (Full screen, no sidebar)
═══════════════════════════════════════
Full screen: #0F2B3D dark navy background
Centered card: 440px wide, white, 16px radius, heavy shadow

Card contents (top to bottom):
- Clinic logo placeholder (80x80px circle) centered
- App name: "MindWatch Clinic" — 28px Bold, primary color
- Subtitle: "Clinic Management & Emotion Monitoring" — 13px gray
- Divider line
- Label: "Email Address" + email input field (full width)
- Label: "Password" + password input with show/hide eye icon
- "Remember Me" checkbox (left) + "Forgot Password?" link (right)
- Large primary button: "Sign In" (full width, 48px height, teal)
- Bottom text: system version + clinic name in small gray text
- Show an error state variant: red border on fields + error 
  message banner at top of card saying "Invalid credentials. 
  Please try again."

═══════════════════════════════════════
PAGE 2 — DASHBOARD (Main home after login)
═══════════════════════════════════════
Top stats row — 4 cards side by side:
  Card 1: "Total Patients Today" — large number (e.g. 24) + 
          small person icon, teal accent
  Card 2: "Active Sessions" — number (e.g. 3) + green dot 
          indicator, green accent
  Card 3: "Pending Alerts" — number (e.g. 2) + bell icon, 
          red accent, urgent feel
  Card 4: "Cameras Online" — number (e.g. 4/5) + camera icon, 
          blue accent

Middle row — two panels side by side:
  Left panel (60% width): "Today's Emotion Overview"
    - Horizontal bar chart showing emotion distribution:
      HAPPY (green), NEUTRAL (gray), ANXIOUS (orange), 
      SAD (blue), ANGRY (red), FEARFUL (purple)
    - Each bar shows percentage + patient count
    - Title + date filter dropdown (Today / This Week)

  Right panel (40% width): "Recent Alerts"
    - List of 4-5 alert items, each showing:
      · Red/orange severity dot
      · Patient name
      · Detected emotion (e.g. "Extreme Anxiety")
      · Time ago (e.g. "5 min ago")
      · "View" button (small, outlined)
    - "View All Alerts" link at bottom

Bottom row — two panels:
  Left panel (50%): "Upcoming Sessions Today"
    - Timeline list: time slot + patient name + status badge 
      (Scheduled/In Progress/Done)
    - Each row has a small colored emotion indicator from 
      last known state

  Right panel (50%): "Patients Requiring Attention"
    - List of patients flagged by AI as high-distress
    - Each item: patient avatar circle + name + emotion tag 
      (red/orange chip) + "Prioritize" button in red

═══════════════════════════════════════
PAGE 3 — LIVE MONITOR (Camera Emotion Feed)
═══════════════════════════════════════
This is the most important and complex page.

Top bar below header: camera selector tabs 
(Camera 1 — Waiting Room | Camera 2 — Hall | + Add Camera)

Main content split into two columns:
LEFT COLUMN (65% width) — Live Feed Area:
  - Large video feed placeholder (dark #1a1a1a background, 
    16:9 ratio, rounded 12px)
  - Overlay on video: 
    · Face detection bounding box (green rectangle drawn on face)
    · Patient name tag above box: "Ahmed Al-Rashidi"
    · Emotion badge on box: large chip showing current emotion 
      with color (e.g. red chip "ANXIOUS 87%")
    · Body pose skeleton overlay (subtle lines on body)
  - Below video: camera controls bar:
    · Camera name + location label
    · Status dot (green = Online)
    · Snapshot button | Pause button | Fullscreen button
  - Below controls: "Detected Patients in Frame" 
    mini-cards row showing 2-3 patient thumbnails with 
    their name + current emotion chip

RIGHT COLUMN (35% width) — Emotion Analysis Panel:
  Top section: "Current Patient Analysis"
    - Patient avatar (large 64px circle) + name + ID
    - "Current Emotion" — large colored emotion badge 
      (e.g. ANXIOUS in orange-red, 32px)
    - Confidence score: "Confidence: 87%" with progress bar
    - Last updated: "2 seconds ago" with refresh icon

  Emotion Breakdown section:
    - Donut chart or horizontal bars showing all emotion 
      percentages for this patient:
      ANXIOUS: 87% (red-orange bar)
      NEUTRAL: 8%
      SAD: 5%
    - Small legend below chart

  Body Language section:
    - "Posture: Tense" with icon
    - "Movement: Restless" with icon  
    - "Eye Contact: Avoidant" with icon
    Each with a small colored indicator dot

  Action buttons (bottom of right panel):
    - "🔔 Trigger Alert" — large red button
    - "📋 Add Note" — outlined secondary button
    - "📊 View Full Report" — text link

  Recent Emotion History (scrollable):
    - Mini timeline showing last 10 minutes
    - Each entry: time + emotion chip + percentage

═══════════════════════════════════════
PAGE 4 — PATIENTS LIST
═══════════════════════════════════════
Top action bar:
  - Search input (full text search by name/ID)
  - Filter dropdowns: Status | Last Emotion | Date Range
  - "Add New Patient" button (teal, right side)

Patients table (card with table inside):
Columns: # | Patient Name | ID | Age | Phone | 
         Last Session | Last Emotion | Status | Actions

Each row:
  - Avatar circle (initials or photo) + full name
  - Patient ID badge
  - Last emotion chip with color coding:
    GREEN chip = Happy/Neutral
    ORANGE chip = Anxious/Sad  
    RED chip = Angry/Fearful/Distressed
  - Status badge: Active / Inactive
  - Actions: eye icon (View) | edit icon | three-dot menu

Show pagination at bottom (Previous | 1 2 3 ... | Next)
Show row count selector (10 / 25 / 50 per page)

Highlighted row variant: if patient has active alert, 
entire row has subtle red-tinted background

═══════════════════════════════════════
PAGE 5 — PATIENT PROFILE / DETAIL PAGE
═══════════════════════════════════════
Top section — Patient Header Card (full width):
  Left: Large avatar (96px) + Full Name (24px bold) + 
        Patient ID + Age + Phone
  Right: Current emotion large badge + "In Session" or 
         "Not in Session" status + "Start Session" button

Below header — 3 column layout:
  LEFT COLUMN (30%): Patient Info Card
    - Personal details list:
      Full Name / Date of Birth / Phone / Status
    - Face Enrollment Status: 
      Green checkmark "Face Registered" or 
      Red "Not Registered — Enroll Now" button
    - Assigned Doctor name
    - Registration date

  MIDDLE COLUMN (40%): Emotion History Chart
    - Line chart showing emotion trends over time 
      (last 7 days or 30 days — toggle)
    - X-axis: dates, Y-axis: emotion intensity 0-100%
    - Multiple colored lines per emotion type
    - Hover tooltip showing exact values
    - Below chart: emotion frequency summary 
      (most frequent emotion this week)

  RIGHT COLUMN (30%): Sessions List
    - Scrollable list of past sessions
    - Each session card:
      Date + time range
      Status badge (Completed/Cancelled)
      Dominant emotion detected
      "View Report" link

Bottom section — Alerts History (full width):
  Table of all alerts triggered for this patient
  Columns: Date | Time | Severity | Emotion | Status | Action

═══════════════════════════════════════
PAGE 6 — ALERTS CENTER
═══════════════════════════════════════
Top filter bar:
  - Status filter tabs: All | Triggered | Acknowledged | Resolved
  - Severity filter: All | Critical | High | Medium | Low
  - Date range picker
  - Search by patient name

Alert cards list (not table — use cards for visual impact):
Each alert card (full width, white, 8px radius):
  LEFT: Severity indicator (thick colored left border + icon):
    CRITICAL = #E74C3C red
    HIGH = #E67E22 orange
    MEDIUM = #F1C40F yellow
    LOW = #3498DB blue
  
  CONTENT:
    Row 1: Severity badge + "CRITICAL ALERT" text (bold) + 
           time stamp (right aligned)
    Row 2: Patient name (link) + Camera location
    Row 3: Detected emotion with percentage 
           (e.g. "😰 Extreme Anxiety — 94%")
    Row 4: Small emotion breakdown chips
  
  RIGHT SIDE: Action buttons column:
    "Acknowledge" button (primary outlined)
    "Resolve" button (green)
    "View Patient" link

Show empty state design when no alerts:
  Large centered illustration placeholder + 
  "No Active Alerts" text + "All patients are stable" subtitle

═══════════════════════════════════════
PAGE 7 — SESSIONS MANAGEMENT
═══════════════════════════════════════
Top: Date navigation (← Previous Day | Today | Next Day →)
     + "Schedule New Session" button (teal, right)

Two-column layout:
LEFT (35%): Today's Schedule (timeline view)
  - Vertical timeline with time slots (8AM to 6PM)
  - Each session block shows:
    Patient name + doctor + status color
    Scheduled = gray | In Progress = green pulse | 
    Done = light gray | Cancelled = strikethrough

RIGHT (65%): Session Detail Panel
  (shows when a session is selected from timeline)
  - Patient info header
  - Session timing + duration
  - Assigned camera
  - Real-time emotion feed during active session:
    Large emotion gauge/meter (circular progress)
    Current dominant emotion
    Live emotion timeline (scrolling mini chart)
  - Session notes text area (editable)
  - Emotion results table (timestamp | emotion | confidence)
  - "End Session" button (red) | "Generate Report" button (teal)

═══════════════════════════════════════
PAGE 8 — REPORTS & ANALYTICS
═══════════════════════════════════════
Top: Date range picker + Patient selector (optional) + 
     "Export PDF" button + "Export CSV" button

Row 1 — Summary metric cards (5 small cards):
  Total Sessions | Avg Session Duration | 
  Most Common Emotion | Alerts Triggered | 
  Patients Monitored

Row 2 — Two charts side by side:
  Left: "Emotion Trends Over Time" — 
        multi-line chart (daily averages per emotion)
  Right: "Emotion Distribution" — 
         pie/donut chart with legend

Row 3 — Two charts side by side:
  Left: "Alerts by Severity" — 
        bar chart (grouped by week)
  Right: "Sessions per Day" — 
         bar chart with color-coded status

Bottom: "Top Distressed Patients This Week" table
  Columns: Rank | Patient | Sessions | 
           Dominant Emotion | Alert Count | Action

═══════════════════════════════════════
PAGE 9 — CAMERA MANAGEMENT
═══════════════════════════════════════
Top action bar: "Add New Camera" button + search input

Camera grid (2 columns of cards):
Each camera card:
  - Top: mini live feed placeholder (16:9, dark bg)
  - Status badge overlaid top-right: 
    Green "ONLINE" or Red "OFFLINE"
  - Below feed: Camera name (bold) + Location
  - Stats row: Patients detected today | Alerts triggered
  - Bottom buttons: "Configure" | "View Feed" | 
    three-dot menu (Edit/Disable/Delete)

Offline camera card has:
  - Grayed out feed area with camera-slash icon centered
  - "Last seen: 2 hours ago" text
  - "Reconnect" button in orange

═══════════════════════════════════════
PAGE 10 — STAFF MANAGEMENT
═══════════════════════════════════════
Top: Search + Role filter (All/Doctor/Staff/Admin) + 
     "Add Staff Member" button

Staff table:
Columns: Avatar+Name | Employee# | Role | Department | 
         Email | Status | Actions

Role badges with colors:
  DOCTOR = teal | STAFF = blue | ADMIN = purple

Show "Add Staff" slide-over panel (right side drawer):
  Form fields: Full Name | Date of Birth | Phone |
  Email | Password | Role selector | Department |
  Employee Number | Specialization (if Doctor)
  Save button + Cancel

═══════════════════════════════════════
PAGE 11 — SETTINGS
═══════════════════════════════════════
Left sub-navigation tabs (vertical, inside content area):
  General | Account | Notifications | 
  Camera Settings | AI Model | Security | System

Each settings section as a card:

GENERAL:
  - Clinic name input
  - Clinic address
  - Language selector (Arabic / English)
  - Theme toggle (Light / Dark mode)

CAMERA SETTINGS:
  - Default resolution dropdown (720p/1080p)
  - Frame capture rate slider (1-30 fps)
  - Face detection sensitivity slider
  - Auto-start camera toggle switch

AI MODEL SETTINGS:
  - Emotion detection model selector (dropdown)
  - Minimum confidence threshold slider (0-100%)
  - Alert trigger emotion selector (multi-select chips)
  - Alert severity threshold per emotion

NOTIFICATIONS:
  - Toggle switches for each alert type
  - Sound alert toggle
  - Desktop notification toggle
  - Alert cooldown time input

SECURITY:
  - Session timeout duration
  - Password requirements display
  - Change password section
  - Login history table

═══════════════════════════════════════
COMPONENT LIBRARY (Design System Page)
═══════════════════════════════════════
Create a separate Figma page called "Components" with:

Buttons:
  Primary (teal filled) | Secondary (outlined) | 
  Danger (red filled) | Ghost | Disabled state for each

Emotion Chips/Badges (all 7 emotions with colors):
  HAPPY #2ECC71 | NEUTRAL #95A5A6 | SAD #3498DB |
  ANXIOUS #E67E22 | ANGRY #E74C3C | 
  FEARFUL #9B59B6 | DISGUSTED #8B4513

Alert Severity Badges:
  CRITICAL red | HIGH orange | MEDIUM yellow | LOW blue

Status Badges:
  ACTIVE green | INACTIVE gray | IN_SESSION teal | 
  ONLINE green | OFFLINE red

Form Elements:
  Text input (default/focus/error/disabled)
  Dropdown select
  Toggle switch (on/off)
  Checkbox (checked/unchecked/indeterminate)
  Slider
  Date picker

Cards: default card + alert card + patient card + camera card

Navigation sidebar item states:
  Default | Hover | Active | With badge

Notification/Toast:
  Success | Error | Warning | Info

Modal dialog: confirmation dialog example

Empty states: no data illustration placeholder + text

Loading state: skeleton loader for table rows

═══════════════════════════════════════
ADDITIONAL DESIGN NOTES
═══════════════════════════════════════
- Design for 1440x900 as base, ensure key panels 
  work at 1280x720 too
- Use 8px grid system throughout
- All interactive elements must have hover states
- Real-time elements (live emotion, camera feed) 
  should have a subtle green "live" pulsing dot indicator
- Arabic RTL variant note: all layouts should be 
  mirreable for RTL (sidebar on right, text right-aligned)
- All camera/face areas use dark placeholder backgrounds
  with a camera icon centered (no real faces)
- Patient data shown is fictional/placeholder only
- Include both light mode (default) and note where 
  dark mode would apply (mainly the live monitor page)