# 📱 ITI Electrician Learning App - Product Requirement Document (PRD)

## 🎯 Project Overview

**Project Name:** ITI Electrician Pro Learning App  
**Version:** 1.0.0  
**Platforms:** Android App + Progressive Web App (PWA)  
**Developer:** Shashank  
**Target Audience:** ITI Electrician Students (1st & 2nd Year)

---

## 🏗️ Recommended Tech Stack

### **Frontend (Web + Android)**
- **Framework:** React.js with Next.js 14+ (For Web + PWA)
- **Android:** React Native / Flutter (Share codebase with web)
- **Alternative:** Flutter (Single codebase for both platforms)
- **UI Library:** Tailwind CSS + Framer Motion
- **State Management:** Redux Toolkit / Zustand
- **Database:** Firebase Firestore (Real-time updates)
- **Authentication:** Firebase Auth (Future scope)
- **Hosting:** Vercel (Web) + Firebase Hosting
- **SEO:** Next.js SEO + React Helmet

### **Why This Stack?**
✅ Single codebase for Web + Android (if using Flutter)  
✅ Easy updates without errors  
✅ Best SEO optimization (Next.js)  
✅ Modern UI capabilities  
✅ Future-proof and scalable  
✅ Easy to add new sections/trades  
✅ Google AdSense ready  

---

## 📋 Detailed Feature Requirements

### **1. HOME PAGE** 🏠

#### **Layout Components:**
```
┌─────────────────────────────────────┐
│  🔍 Search Bar (Glowing border)     │
├─────────────────────────────────────┤
│  📚 Featured Cards (Transparent)    │
│  - Quick Access to Chapters         │
│  - Latest Mock Tests                │
│  - Safety Tips of the Day           │
├─────────────────────────────────────┤
│  📊 Stats Section                   │
│  - Total Chapters: XX               │
│  - Mock Tests: XX                   │
│  - Calculators: XX                  │
├─────────────────────────────────────┤
│  🎓 Quick Links Grid                │
│  (All menu items with icons)        │
└─────────────────────────────────────┘
```

#### **Design Requirements:**
- Gradient background (Blue to Purple or Electric theme)
- Transparent glass-morphism cards
- Glowing button effects on hover/tap
- Smooth animations (Page transitions)
- Responsive grid layout
- Bottom navigation (Android)
- Top search bar with autocomplete

---

### **2. CHAPTERS SECTION** 📚

#### **Structure:**
```
Chapters
├── 1st Year
│   ├── Trade Theory
│   │   ├── Tools & Equipment
│   │   ├── Basic Electricity
│   │   ├── Conductors & Insulators
│   │   ├── Ohm's Law
│   │   ├── Series & Parallel Circuits
│   │   ├── Magnetism
│   │   ├── AC & DC Current
│   │   ├── Transformers Basics
│   │   ├── Electrical Wiring
│   │   └── Earthing & Safety
│   │
│   └── Workshop Calculation & Science
│       ├── Units & Measurements
│       ├── Fractions & Decimals
│       ├── Percentage
│       ├── Ratio & Proportion
│       ├── Area & Volume
│       ├── Pythagoras Theorem
│       └── Simple Equations
│
└── 2nd Year
    ├── Trade Theory
    │   ├── Advanced Circuits
    │   ├── Electrical Machines
    │   │   ├── DC Motors
    │   │   ├── AC Motors
    │   │   ├── Generators
    │   │   └── Alternators
    │   ├── Transformers (Detailed)
    │   ├── Switchgear & Protection
    │   ├── MCB, ELCB, RCCB
    │   ├── Residential Wiring
    │   ├── Industrial Wiring
    │   ├── PLC Basics
    │   └── Energy Meters
    │
    └── Workshop Calculation & Science
        ├── Trigonometry
        ├── Power Calculations
        ├── Algebra
        └── Mensuration
```

#### **Each Chapter Page Contains:**
1. **Topic Title** with icon
2. **Main Topics List** (expandable accordion)
3. **Visual Diagrams/Images** (minimum 2-3 per chapter)
4. **Key Points** (bullet format)
5. **Mathematical Formulas** (with examples)
6. **Related Videos** (YouTube embed - future scope)
7. **Download PDF** option (future scope)
8. **Progress Tracker** (mark as completed)

#### **Example Chapter Content Format:**

**Topic:** Ohm's Law
- **Definition:** Current through a conductor is directly proportional to voltage
- **Formula:** V = I × R
  - V = Voltage (Volts)
  - I = Current (Amperes)
  - R = Resistance (Ohms)
- **Example:** Calculate current when V=230V, R=50Ω
  - I = V/R = 230/50 = 4.6A
- **Diagram:** Circuit diagram image
- **Applications:** Used in all electrical calculations

---

### **3. CALCULATOR SECTION** 🧮

#### **Required Calculators:**

#### **3.1 Load Calculator**
```javascript
Inputs:
- Appliance selection (dropdown)
  - LED Bulb (5-20W)
  - CFL (10-40W)
  - Tube Light (40-50W)
  - Fan (60-80W)
  - AC (1000-2000W)
  - Refrigerator (100-300W)
  - TV (50-150W)
  - Motor (500-3000W)
  - Custom Watt Input
- Quantity
- Running Hours

Output:
- Total Load (Watts)
- Total Load (kW)
- Current Required (A)
- Daily Units (kWh)
- Monthly Cost (₹)
- Recommended MCB Size
```

#### **3.2 Power Calculator**
```
Input Options:
- Calculate Power (P = V × I)
- Calculate Voltage (V = P / I)
- Calculate Current (I = P / V)

Fields:
- Enter any 2 values
- Auto-calculate 3rd value
```

#### **3.3 Current Calculator**
```
Single Phase: I = P / V
Three Phase: I = P / (√3 × V × PF)

Inputs:
- Load (Watts/kW)
- Voltage (V)
- Power Factor (for 3-phase)
- Phase Type (Single/Three)

Output:
- Current in Amperes
```

#### **3.4 Conduit Calculator**
```
Input:
- Number of wires
- Wire size (sq.mm)

Output:
- Recommended conduit size (mm)
- Fill ratio (%)
- Explanation of standard sizes
```

#### **3.5 Cable Sizing Calculator**
```
Inputs:
- Load Current (A)
- Distance (meters)
- Voltage Drop allowed (%)
- Installation Method (surface/conduit)

Output:
- Minimum cable size (sq.mm)
- Recommended cable
- Voltage drop calculation
- Explanation
```

#### **3.6 Wire Diameter Calculator**
```
Input:
- Wire cross-section (sq.mm)
  OR
- Wire diameter (mm)

Output:
- Converted value
- Current carrying capacity
- Where to use this wire:
  * 0.75 sq.mm - Light circuits (6A)
  * 1.0 sq.mm - Light & fan (10A)
  * 1.5 sq.mm - Power sockets (16A)
  * 2.5 sq.mm - AC, Geysers (20A)
  * 4.0 sq.mm - Heavy loads (25A)
  * 6.0 sq.mm - Sub-mains (32A)
```

#### **3.7 MCB Calculator**
```
Input:
- Total Load (W)
- Voltage (V)
- Safety Factor (1.25 default)

Output:
- Required Current (A)
- Recommended MCB Rating (6A/10A/16A/20A/32A/40A/63A)
- Explanation of why this rating
```

#### **3.8 RCCB Calculator**
```
Input:
- Circuit Type (Residential/Commercial/Industrial)
- Total Load (A)

Output:
- Recommended RCCB Rating
- Sensitivity (30mA/100mA/300mA)
- Type (AC/A)
- Explanation
```

#### **3.9 Voltage Drop Calculator**
```
Inputs:
- Cable length (m)
- Current (A)
- Cable size (sq.mm)
- Material (Copper/Aluminum)

Output:
- Voltage drop (V)
- Voltage drop (%)
- Acceptable or Not
```

#### **3.10 Earthing Resistance Calculator**
```
Inputs:
- Rod diameter (mm)
- Rod length (m)
- Soil resistivity

Output:
- Earth resistance (Ω)
- Acceptable range
- Suggestions
```

#### **Calculator UI Features:**
- Input validation
- Clear/Reset button
- Copy result button
- Share result option
- History of last 5 calculations
- Explanation section (expandable)
- Related formulas
- Visual representation (gauge/graph where applicable)

---

### **4. MOCK TEST SECTION** 📝

#### **Structure:**
```
Mock Tests
├── Practice Tests
│   ├── 1st Year - Set 1 (25 Questions)
│   ├── 1st Year - Set 2 (25 Questions)
│   ├── 2nd Year - Set 1 (25 Questions)
│   └── 2nd Year - Set 2 (25 Questions)
│
├── Chapter-wise Tests
│   ├── Basic Electricity (15 Q)
│   ├── Motors & Generators (15 Q)
│   ├── Transformers (15 Q)
│   └── ... (All major chapters)
│
├── Full Mock Exam
│   └── 100 Questions (Mix 1st + 2nd Year)
│
└── Previous Tests
    └── History with scores
```

#### **Question Format:**
```javascript
{
  "id": 1,
  "question": "Ohm's law का formula क्या है?",
  "image": "optional_diagram.jpg", // if applicable
  "options": [
    "A. V = I × R",
    "B. P = V × I",
    "C. I = V + R",
    "D. R = V - I"
  ],
  "correctAnswer": "A",
  "explanation": "Ohm's Law के अनुसार, Voltage (V) = Current (I) × Resistance (R). यह electrical circuits का basic formula है।",
  "category": "Basic Electricity",
  "difficulty": "easy",
  "year": "1st"
}
```

#### **Test Features:**
- Timer (optional on/off)
- Question navigation (jump to any question)
- Mark for review option
- Pause test
- Submit with confirmation
- **Result Screen:**
  - Score (X/Total)
  - Percentage
  - Time taken
  - Correct answers (green)
  - Wrong answers (red) with correct answer shown
  - Explanation for each question
  - Review test option
  - Share score option
  - Retry option

#### **Question Bank (Minimum 500 Questions):**

**Sample Categories:**
1. Basic Electricity (50 Q)
2. AC/DC Circuits (40 Q)
3. Electrical Machines (60 Q)
4. Transformers (40 Q)
5. Wiring & Installation (50 Q)
6. Safety & Earthing (40 Q)
7. Measuring Instruments (30 Q)
8. MCB/RCCB/Protection (40 Q)
9. Workshop Calculations (80 Q)
10. Tools & Equipment (30 Q)
11. PLC & Automation (20 Q)
12. General Knowledge (20 Q)

---

### **5. SAFETY SECTION** ⚠️

#### **Content Structure:**

```
Safety Tips
├── General Electrical Safety
│   ├── 5 Golden Rules of Electrical Safety
│   │   1. Disconnect completely
│   │   2. Secure against reconnection
│   │   3. Verify dead (Test)
│   │   4. Earth and short circuit
│   │   5. Cover nearby live parts
│   │   [Visual diagram for each]
│   │
│   ├── Personal Protective Equipment (PPE)
│   │   - Safety Helmet [Image]
│   │   - Safety Shoes [Image]
│   │   - Hand Gloves (Insulated) [Image]
│   │   - Safety Goggles [Image]
│   │   - Ear Plugs [Image]
│   │   - Insulated Mat [Image]
│   │   [Explanation of each]
│   │
│   └── Dos and Don'ts
│       ✅ DO:
│       - Use proper tools
│       - Check voltage before touching
│       - Use insulated tools
│       - Work in dry conditions
│       - Inform before working on live circuits
│       
│       ❌ DON'T:
│       - Work on live circuits
│       - Use damaged cables
│       - Overload circuits
│       - Touch with wet hands
│       - Bypass safety devices
│
├── Work-Specific Safety
│   ├── Wiring Safety
│   ├── Panel Work Safety
│   ├── Motor Installation Safety
│   ├── Height Work Safety (Ladder/Scaffolding)
│   └── Underground Cable Safety
│
├── Emergency Procedures
│   ├── Electric Shock Treatment
│   │   - Step 1: Switch off power [Image]
│   │   - Step 2: Use wooden stick to separate
│   │   - Step 3: Check breathing
│   │   - Step 4: CPR if needed [Diagram]
│   │   - Step 5: Call emergency (108)
│   │
│   ├── Fire Safety
│   │   - Class of fires
│   │   - Fire extinguisher types
│   │   - CO2 extinguisher for electrical [Image]
│   │   - Never use water on electrical fire
│   │
│   └── First Aid Basics
│       - Burn treatment
│       - Cut/Wound treatment
│       - Eye injury
│
├── Safety Signs & Symbols
│   - High Voltage Sign [Image]
│   - Danger Sign [Image]
│   - Earthing Symbol [Image]
│   - No Entry Sign [Image]
│   - Mandatory Safety Gear Signs [Images]
│   [20+ safety signs with meanings]
│
└── Safety Quiz
    └── Test your safety knowledge (20 Q)
```

#### **Visual Requirements:**
- Minimum 50+ images/diagrams
- Step-by-step illustrated guides
- Color-coded sections (Red for danger, Green for safe)
- Video tutorials (future scope)
- Downloadable PDF checklists

---

### **6. MORE ITI LINKS** 🔗

#### **Links to Include:**

```
More ITI Resources
├── NCVT/SCVT Results
│   ├── NCVT Official Portal
│   ├── State-wise Result Links
│   │   - UP ITI Result
│   │   - Bihar ITI Result
│   │   - MP ITI Result
│   │   - Rajasthan ITI Result
│   │   - (All major states)
│   └── Semester-wise Results
│
├── Certificate Services
│   ├── Download ITI Certificate
│   ├── Verify Certificate
│   ├── Duplicate Certificate Apply
│   └── Certificate Correction
│
├── Admission & Forms
│   ├── ITI Admission Portal
│   ├── NCVT MIS Portal
│   ├── Apprenticeship Registration
│   └── AITT Exam Registration
│
├── Syllabus Downloads
│   ├── Electrician Trade Syllabus
│   ├── All Trades Syllabus
│   └── Exam Pattern
│
├── Jobs & Recruitment
│   ├── Government Job Portals
│   ├── Railway Recruitment
│   ├── State Electricity Boards
│   └── Apprentice Opportunities
│
├── Study Materials
│   ├── NCVT eBooks
│   ├── Previous Year Papers
│   ├── Sample Papers
│   └── Reference Books
│
└── Official Websites
    ├── NCVT Official
    ├── DGT Website
    ├── NAPS Portal
    └── State ITI Boards
```

#### **Link Card Design:**
```
┌─────────────────────────────┐
│ 🔗 Link Title               │
│ Brief description           │
│ [VISIT →] (Glowing button)  │
└─────────────────────────────┘
```

- Open in WebView (in-app browser) for Android
- Open in new tab for Web
- Disclaimer: "External link - We are not responsible for content"

---

### **7. ABOUT US PAGE** ℹ️

#### **Content:**

```markdown
# About ITI Electrician Pro App

## 🎓 About This Platform

ITI Electrician Pro is a comprehensive learning platform designed specifically for ITI Electrician trade students. Our mission is to provide quality education and resources to help students excel in their trade and career.

## 📚 What We Offer

- **Comprehensive Chapters:** Complete syllabus coverage for 1st and 2nd year
- **Practice Tests:** 500+ questions with detailed explanations
- **Practical Calculators:** 10+ professional electrical calculators
- **Safety First:** Detailed safety guidelines and procedures
- **Quick Resources:** Direct links to official ITI portals and services

## 👨‍🔧 About Electrician Trade

The Electrician trade is one of the most sought-after trades in ITI. It's a 2-year course under NCVT/SCVT that provides comprehensive training in:

- Electrical installations
- Maintenance of electrical equipment
- Industrial and residential wiring
- Electrical machine operations
- Safety procedures

**Duration:** 2 Years (4 Semesters)  
**Certification:** National Council for Vocational Training (NCVT)  
**Career Opportunities:**
- Government sector (Railways, Electricity Boards)
- Private sector (Manufacturing, Construction)
- Self-employment (Electrical Contractor)
- Supervisor positions after experience

## 🎯 Our Vision

To empower every ITI Electrician student with accessible, quality education and practical knowledge that helps them build a successful career.

## 📧 Contact Us

For queries, suggestions, or feedback:
- Email: support@itielectricianpro.com
- Website: www.itielectricianpro.com

## 👨‍💻 Developer

**Made with ❤️ by Shashank**

---

*Version 1.0.0*  
*Last Updated: [Current Date]*
```

---

### **8. PRIVACY POLICY PAGE** 🔒

#### **Content (Real & Compliant):**

```markdown
# Privacy Policy

**Last updated:** [Date]

## Introduction

Welcome to ITI Electrician Pro ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.

## Information We Collect

### ✅ Information We DO Collect:

1. **Device Information** (Non-Personal)
   - Device type
   - Operating system version
   - App version
   - Language preference

2. **Usage Analytics** (Anonymous)
   - Pages visited
   - Time spent on app
   - Features used
   - Test scores (stored locally only)

3. **Crash Reports** (Automatic)
   - To improve app stability
   - No personal data included

### ❌ Information We DON'T Collect:

- ❌ Personal names or email addresses
- ❌ Phone numbers
- ❌ Location data
- ❌ Photos or media files
- ❌ Contact lists
- ❌ Any personally identifiable information (PII)

## How We Use Information

- Improve app performance
- Fix bugs and crashes
- Understand feature usage
- Enhance user experience

## Data Storage

- All study progress is stored **locally on your device only**
- We do not store any user data on our servers
- Test results and bookmarks are saved in your device's local storage

## Third-Party Services

We may use the following third-party services:

1. **Firebase Analytics** (Google)
   - For anonymous usage statistics
   - Privacy Policy: https://firebase.google.com/support/privacy

2. **Google AdMob** (Future - For advertisements)
   - Privacy Policy: https://support.google.com/admob/answer/6128543

## Children's Privacy

This app does not knowingly collect information from children under 13. The content is designed for ITI students (typically 15+ years).

## Your Rights

You have the right to:
- Use the app without providing personal information
- Clear app data anytime from device settings
- Request information about data usage

## Changes to This Policy

We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.

## Contact Us

If you have questions about this Privacy Policy:
- Email: privacy@itielectricianpro.com

---

**Made by Shashank**
```

---

## 🎨 UI/UX Design Specifications

### **Color Scheme (Electric Theme)**

```css
/* Primary Colors */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

/* Background */
--bg-dark: #0f0f23;
--bg-card: rgba(255, 255, 255, 0.1); /* Transparent glass effect */
--bg-hover: rgba(255, 255, 255, 0.15);

/* Text */
--text-primary: #ffffff;
--text-secondary: #b8b8d1;

/* Accent */
--accent-glow: #00d9ff;
--border-glow: rgba(0, 217, 255, 0.5);
```

### **Card Design (Glass-morphism)**

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 217, 255, 0.3);
  border-color: var(--accent-glow);
}
```

### **Glowing Button Effect**

```css
.glow-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  color: white;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
  transition: all 0.3s ease;
}

.glow-button:hover {
  box-shadow: 0 0 30px rgba(102, 126, 234, 0.8),
              0 0 60px rgba(102, 126, 234, 0.4);
  transform: scale(1.05);
}

.glow-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}
```

### **Navigation Menu (Bottom Navigation for Android)**

```
┌─────────────────────────────────┐
│                                 │
│       CONTENT AREA              │
│                                 │
│                                 │
└─────────────────────────────────┘
┌─────┬─────┬─────┬─────┬─────┐
│ 🏠  │ 📚  │ 🧮  │ 📝  │ ⚙️  │
│Home │Chap │Calc │Test │More │
└─────┴─────┴─────┴─────┴─────┘
```

### **Search Bar Design**

```css
.search-bar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  border-radius: 25px;
  padding: 12px 20px;
  color: white;
  transition: all 0.3s ease;
}

.search-bar:focus {
  border-color: var(--accent-glow);
  box-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
  background: rgba(255, 255, 255, 0.15);
}
```

### **Animation Specifications**

```javascript
// Page Transition
pageTransition: {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 }
}

// Card Hover Animation
cardHover: {
  whileHover: { 
    scale: 1.03,
    rotateY: 5,
    transition: { duration: 0.2 }
  }
}

// Button Press
buttonTap: {
  whileTap: { scale: 0.95 }
}
```

---

## 📱 Navigation Structure

```
App Structure
│
├── Bottom Navigation (Android) / Top Menu (Web)
│   ├── Home
│   ├── Chapters
│   ├── Calculator
│   ├── Mock Test
│   └── More
│       ├── Safety
│       ├── ITI Links
│       ├── About Us
│       └── Privacy Policy
│
├── Search (Global)
│   ├── Search in Chapters
│   ├── Search in Tests
│   └── Search in Calculators
│
└── Settings (Future)
    ├── Theme (Dark/Light)
    ├── Language (Hindi/English)
    ├── Notifications
    └── Clear Data
```

---

## 🔍 SEO Optimization (Web App)

### **Meta Tags Structure**

```html
<head>
  <title>ITI Electrician Pro - Complete Learning App | Mock Tests & Calculators</title>
  
  <meta name="description" content="Complete ITI Electrician learning app with chapters, mock tests, 10+ calculators, safety tips. Free resources for 1st & 2nd year students.">
  
  <meta name="keywords" content="ITI Electrician, Electrician course, ITI mock test, electrical calculator, NCVT, electrician syllabus, ITI exam, electrical safety">
  
  <!-- Open Graph -->
  <meta property="og:title" content="ITI Electrician Pro - Complete Learning App">
  <meta property="og:description" content="Free learning platform for ITI Electrician students">
  <meta property="og:image" content="/og-image.jpg">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="ITI Electrician Pro">
  
  <!-- PWA -->
  <meta name="theme-color" content="#667eea">
  <link rel="manifest" href="/manifest.json">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    "name": "ITI Electrician Pro",
    "applicationCategory": "EducationalApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  }
  </script>
</head>
```

### **URL Structure (SEO Friendly)**

```
/
/chapters
/chapters/first-year
/chapters/first-year/ohms-law
/chapters/second-year
/chapters/second-year/dc-motors
/calculator
/calculator/load-calculator
/calculator/mcb-calculator
/mock-test
/mock-test/first-year-set-1
/safety
/safety/ppe
/iti-links
/about
/privacy
```

### **Sitemap.xml Generation**
- Auto-generate sitemap for all pages
- Submit to Google Search Console
- Update frequency: Weekly

### **robots.txt**
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 💰 Monetization Strategy (Future)

### **Ad Placements (Google AdMob / AdSense)**

```
Recommended Ad Positions:
├── Home Page
│   └── Banner ad at bottom (above navigation)
│
├── Chapter Page
│   ├── Small banner after intro
│   └── Interstitial ad after every 3 chapters viewed
│
├── Calculator Results
│   └── Small banner below result
│
├── Mock Test
│   ├── Banner ad on test selection page
│   └── Interstitial ad after test completion
│
└── Frequency Capping
    ├── Max 1 interstitial per 3 minutes
    └── Banner refresh: 60 seconds
```

### **Ad-Free Features** (Future Premium)
- Remove all ads
- Download PDF materials
- Offline mock tests
- Priority support

---

## 🔄 Update & Scalability Plan

### **Phase 1 (Launch) - Current PRD**
✅ All features mentioned above

### **Phase 2 (3 months post-launch)**
- Add more trades:
  - Fitter
  - Welder
  - Mechanic
  - Plumber
- Video tutorials
- Discussion forum
- Bookmark feature

### **Phase 3 (6 months)**
- User accounts (optional)
- Progress sync across devices
- Certificates for test completion
- Leaderboard
- Daily challenges

### **Phase 4 (1 year)**
- Live classes
- Doubt clearing section
- Job portal integration
- Mentorship program

### **Scalable Architecture**

```javascript
// Modular Structure for Easy Updates

/src
├── /components (Reusable UI components)
├── /features
│   ├── /home
│   ├── /chapters
│   │   ├── /firstYear
│   │   ├── /secondYear
│   │   └── /newTrade (Easy to add)
│   ├── /calculators
│   │   └── /calculatorComponents (Add new calculator here)
│   ├── /mockTest
│   ├── /safety
│   └── /more
├── /data
│   ├── chapters.json (Edit without code changes)
│   ├── questions.json
│   ├── safety.json
│   └── links.json
├── /utils (Helper functions)
├── /services (API calls, Firebase)
└── /styles (Global styles)

// Adding New Trade:
1. Create folder: /features/fitter
2. Add data: /data/fitter-chapters.json
3. Add route: /fitter
4. No UI changes needed - uses same components
```

---

## 📦 Database Structure (Firebase Firestore)

```javascript
// Collections Structure

users (optional - future)
├── userId
    ├── name
    ├── email
    ├── progress
    └── testScores[]

chapters
├── firstYear[]
│   ├── id
│   ├── title
│   ├── content
│   ├── images[]
│   └── formulas[]
└── secondYear[]

mockTests
├── testId
    ├── title
    ├── questions[]
    │   ├── question
    │   ├── options[]
    │   ├── correctAnswer
    │   └── explanation
    ├── category
    └── year

safety
├── categoryId
    ├── title
    ├── content
    ├── images[]
    └── steps[]

analytics (for admin)
├── totalUsers
├── activeUsers
├── popularCalculators
└── testAttempts
```

---

## 🚀 Deployment Plan

### **Web App (PWA)**
```
Platform: Vercel / Netlify
Steps:
1. Build Next.js project
2. Configure environment variables
3. Deploy to Vercel
4. Connect custom domain
5. Enable PWA features
6. Submit to Google Search Console
7. Generate sitemap
8. Monitor Core Web Vitals
```

### **Android App**
```
Platform: Google Play Store

Steps:
1. Generate APK/AAB from React Native/Flutter
2. Create developer account ($25 one-time)
3. Prepare store listing:
   - App name: ITI Electrician Pro
   - Short description (80 chars)
   - Full description (4000 chars)
   - Screenshots (minimum 2)
   - Feature graphic (1024x500)
   - App icon (512x512)
4. Set category: Education
5. Content rating: Everyone
6. Privacy policy link (required)
7. Upload APK/AAB
8. Internal testing → Closed testing → Production
9. Submit for review
```

### **Required Assets**

```
Graphics Needed:
├── App Icon (512x512 PNG)
├── Splash Screen (1080x1920)
├── Feature Graphic (1024x500)
├── Screenshots
│   ├── Phone (min 2, recommended 8)
│   └── Tablet (optional, recommended 2)
├── Promotional Images
│   └── For social media
└── Diagrams/Illustrations
    ├── Circuit diagrams (50+)
    ├── Safety illustrations (30+)
    ├── Tool images (20+)
    └── PPE images (10+)
```

---

## 🎯 Success Metrics (KPIs)

### **Track These Metrics:**

```
User Engagement:
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Average session duration
- Pages per session
- Return visitor rate

Feature Usage:
- Most used calculators
- Chapters most viewed
- Test completion rate
- Average test score
- Safety section views

Technical:
- App crash rate (should be <1%)
- Load time (should be <3 seconds)
- Bounce rate (should be <40%)
- Core Web Vitals scores

Monetization (Future):
- Ad impressions
- Click-through rate (CTR)
- Revenue per user (RPU)
```

---

## ⚠️ Error Handling & Edge Cases

### **Handle These Scenarios:**

```javascript
// No Internet Connection
if (!navigator.onLine) {
  showOfflineMessage();
  loadCachedData(); // PWA cache
}

// Calculator Input Validation
if (inputValue <= 0) {
  showError("Please enter a positive value");
  return;
}

// Test Timer Edge Cases
- Handle browser refresh during test
- Save progress locally
- Resume option available

// Image Load Failure
<img 
  src={imageUrl} 
  onError={(e) => e.target.src = '/placeholder.svg'}
  alt="description"
/>

// API Failure (if using external APIs)
try {
  const data = await fetchData();
} catch (error) {
  showErrorMessage("Unable to load data. Using cached version.");
  loadFromLocalStorage();
}

// Search No Results
if (searchResults.length === 0) {
  show("No results found. Try different keywords.");
}
```

---

## 📱 Progressive Web App (PWA) Configuration

### **manifest.json**

```json
{
  "name": "ITI Electrician Pro - Complete Learning App",
  "short_name": "ITI Electrician",
  "description": "Complete learning platform for ITI Electrician students",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f0f23",
  "theme_color": "#667eea",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "categories": ["education", "learning"],
  "shortcuts": [
    {
      "name": "Mock Test",
      "url": "/mock-test",
      "description": "Start a new mock test"
    },
    {
      "name": "Calculators",
      "url": "/calculator",
      "description": "Open electrical calculators"
    },
    {
      "name": "Safety",
      "url": "/safety",
      "description": "View safety guidelines"
    }
  ]
}
```

### **Service Worker Features**
- Cache all static assets
- Offline support for chapters
- Background sync for test results
- Push notifications (future)

---

## 🧪 Testing Checklist

### **Before Launch:**

```
Functionality Testing:
☐ All calculators working correctly
☐ Mock test scoring accurate
☐ Search functioning properly
☐ All links opening correctly
☐ Images loading properly
☐ Formulas rendering correctly

UI/UX Testing:
☐ Responsive on all screen sizes (320px to 1920px)
☐ Navigation working smoothly
☐ Animations not causing lag
☐ Buttons providing haptic feedback (mobile)
☐ Color contrast meeting accessibility standards
☐ Text readable on all backgrounds

Performance Testing:
☐ Page load time < 3 seconds
☐ Lighthouse score > 90
☐ No memory leaks
☐ Smooth 60fps animations
☐ App size < 20MB (Android)

Cross-Browser Testing:
☐ Chrome (Desktop + Mobile)
☐ Firefox
☐ Safari (iOS)
☐ Edge
☐ Samsung Internet

Android Testing:
☐ Android 8.0+
☐ Different screen sizes
☐ Back button navigation
☐ Deep linking working
☐ App not crashing

SEO Testing:
☐ All meta tags present
☐ Sitemap generated
☐ robots.txt configured
☐ Structured data valid
☐ Open Graph working
☐ Google Search Console verified

Security Testing:
☐ HTTPS enabled
☐ No sensitive data exposed
☐ Privacy policy compliant
☐ Third-party scripts safe
```

---

## 📄 Content Writing Requirements

### **Chapters Content (Total: ~100 Topics)**

Each chapter needs:
- 300-500 words explanation
- 2-3 diagrams/images
- 3-5 key points
- 2-3 formulas (if applicable)
- 1-2 real-world examples

### **Mock Test Questions (Total: 500+ Questions)**

Format for each:
- Clear question (Hindi + English both acceptable)
- 4 options (A, B, C, D)
- 1 correct answer
- 100-150 words explanation
- Difficulty level (Easy/Medium/Hard)
- Category tag

### **Safety Content (Total: 50+ Topics)**

Each topic needs:
- Clear instructions
- Step-by-step procedure
- Warning/caution notes
- Relevant images
- What to do / What not to do

---

## 🎨 Design Assets Required

### **Icons Needed (100+)**

```
Category Icons:
- Chapters (book icon)
- Calculator (calculator icon)
- Mock Test (document icon)
- Safety (shield icon)
- Links (link icon)

Tool Icons:
- Screwdriver, Pliers, Tester, Multimeter, etc.

Component Icons:
- Motor, Transformer, MCB, RCCB, etc.

UI Icons:
- Search, Menu, Back, Share, Download, etc.

Safety Icons:
- Helmet, Gloves, Goggles, Shoes, etc.
```

### **Illustrations (50+)**

```
Technical Diagrams:
- Circuit diagrams
- Wiring layouts
- Motor connections
- Transformer diagrams

Safety Illustrations:
- PPE usage
- Emergency procedures
- Correct working postures

Infographics:
- Comparison charts
- Flow diagrams
- Decision trees
```

---

## 🔐 Security Considerations

```
Implement:
✅ HTTPS only
✅ Content Security Policy (CSP)
✅ No inline scripts
✅ Sanitize user inputs (search, calculator)
✅ Regular dependency updates
✅ Secure third-party integrations
✅ Rate limiting on API calls
✅ XSS protection
✅ CORS properly configured
```

---

## 📞 Support & Maintenance Plan

### **User Support:**
- Email support: support@itielectricianpro.com
- FAQ section (future)
- In-app feedback form
- Response time: Within 24-48 hours

### **Maintenance Schedule:**
```
Daily:
- Monitor crash reports
- Check user feedback

Weekly:
- Review analytics
- Update content if needed

Monthly:
- Dependency updates
- Security patches
- New questions addition

Quarterly:
- Feature updates
- UI improvements
- Performance optimization
```

---

## 🏆 Competitive Advantages

### **What Makes This App Unique:**

1. ✅ **Completely Free** - No subscriptions
2. ✅ **No Login Required** - Instant access
3. ✅ **Offline Support** - PWA capabilities
4. ✅ **Modern UI** - Best-in-class design
5. ✅ **10+ Calculators** - Most comprehensive
6. ✅ **Detailed Explanations** - Not just answers
7. ✅ **Visual Learning** - Images & diagrams
8. ✅ **Safety Focus** - Unique safety section
9. ✅ **Regular Updates** - Fresh content
10. ✅ **Hindi + English** - Bilingual support

---

## 📊 Launch Checklist

### **Pre-Launch (Week -2)**
```
☐ Complete all content writing
☐ Gather all images/diagrams
☐ Finalize UI designs
☐ Complete development
☐ Testing (all devices)
☐ Fix all bugs
☐ Setup Firebase
☐ Configure analytics
☐ Prepare store listings
☐ Create promotional graphics
```

### **Launch Week**
```
☐ Deploy web app to production
☐ Submit Android app to Play Store
☐ Setup domain & SSL
☐ Submit to Google Search Console
☐ Create social media accounts
☐ Prepare launch announcement
☐ Monitor for issues
☐ Gather initial feedback
```

### **Post-Launch (Week +1)**
```
☐ Monitor analytics daily
☐ Fix critical bugs ASAP
☐ Respond to user reviews
☐ Share on relevant forums/groups
☐ Track app ranking
☐ Plan first update
```

---

## 🎓 Sample Content Templates

### **Chapter Template:**

```markdown
# [Chapter Title]

## परिचय (Introduction)
[150-200 words explanation in simple language]

## मुख्य बिंदु (Key Points)
- ✓ Point 1
- ✓ Point 2
- ✓ Point 3
- ✓ Point 4

## सूत्र (Formulas)
**Formula 1:**
```
V = I × R
Where:
V = Voltage (Volts)
I = Current (Amperes)
R = Resistance (Ohms)
```

## उदाहरण (Example)
**Problem:** Calculate current when V=230V and R=50Ω
**Solution:** 
I = V/R
I = 230/50
I = 4.6 Amperes

## चित्र (Diagram)
[Insert relevant circuit diagram]

## प्रयोग (Applications)
- Use case 1
- Use case 2

## याद रखें (Remember)
💡 Important tip or shortcut

---

**Related Topics:** [Links to related chapters]
**Practice Questions:** [Link to related mock test]
```

---

### **Calculator Result Template:**

```
┌──────────────────────────────┐
│  ⚡ RESULT                    │
├──────────────────────────────┤
│  Total Load: 2500 W          │
│  Total Load: 2.5 kW          │
│  Current: 10.87 A            │
│  Daily Units: 6 kWh          │
│  Monthly Cost: ₹360          │
│  Recommended MCB: 16A        │
└──────────────────────────────┘

📝 Explanation:
For a 2500W load at 230V:
- Current = Power/Voltage = 2500/230 = 10.87A
- MCB rating should be 1.25 times current
- 10.87 × 1.25 = 13.58A
- Next standard size = 16A MCB

⚠️ Safety Note:
Always use proper cable size (minimum 1.5 sq.mm for this load)

[Copy Result] [Share] [Calculate Again]
```

---

### **Mock Test Question Template:**

```json
{
  "id": 101,
  "question": "एक सर्किट में 230V पर 10A करंट flow हो रहा है। Total Power क्या होगी?",
  "questionEnglish": "In a circuit, 10A current is flowing at 230V. What will be the total power?",
  "image": null,
  "options": [
    "A. 2300 Watts",
    "B. 23 Watts",
    "C. 230 Watts",
    "D. 2.3 Watts"
  ],
  "correctAnswer": "A",
  "explanation": "Power (P) = Voltage (V) × Current (I)\nP = 230V × 10A = 2300 Watts या 2.3 kW\n\nयह formula electrical circuits का basic formula है जो हर calculation में use होता है।",
  "category": "Basic Calculations",
  "difficulty": "easy",
  "year": "1st",
  "relatedTopic": "Ohm's Law & Power"
}
```

---

## 🔄 VERSION CONTROL & UPDATES

### **Version Naming Convention:**
```
Major.Minor.Patch
Example: 1.2.5

Major (1.x.x): Breaking changes, complete redesign
Minor (x.2.x): New features, new calculators, new sections
Patch (x.x.5): Bug fixes, content updates, small improvements
```

### **Update Strategy:**
```
Monthly Updates:
- New mock test questions (50+ per month)
- Bug fixes
- Content improvements

Quarterly Updates:
- New calculators
- UI enhancements
- New features

Yearly Updates:
- Major version bump
- Complete content review
- New trade additions
```

---

## 🎁 BONUS FEATURES (Future Scope)

### **Phase 2+ Features:**

```
1. Dark/Light Theme Toggle
2. Font Size Adjustment
3. Night Mode with Blue Light Filter
4. Voice Search
5. Text-to-Speech for chapters
6. Bookmark/Favorite System
7. Notes Taking Feature
8. Share Progress on Social Media
9. Daily Quote/Tip Notification
10. Offline Download (Chapters PDF)
11. Print Feature
12. Multi-language (Hindi, English, Regional)
13. Doubt Clearing Forum
14. Live Chat Support
15. Video Tutorials Integration
16. AR-based Circuit Learning
17. Gamification (Badges, Levels)
18. Referral System
19. Certificate Generation
20. Job Alerts Section
```

---

## 📝 FOOTER DESIGN

```html
<footer class="app-footer">
  <div class="footer-content">
    <div class="footer-logo">
      <img src="/logo.svg" alt="ITI Electrician Pro">
      <p>Learn. Practice. Excel.</p>
    </div>
    
    <div class="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/chapters">Chapters</a></li>
        <li><a href="/mock-test">Mock Tests</a></li>
        <li><a href="/calculator">Calculators</a></li>
        <li><a href="/safety">Safety</a></li>
      </ul>
    </div>
    
    <div class="footer-legal">
      <h4>Legal</h4>
      <ul>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/about">About Us</a></li>
      </ul>
    </div>
    
    <div class="footer-social">
      <h4>Follow Us</h4>
      <div class="social-icons">
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
        <a href="#"><i class="fab fa-telegram"></i></a>
      </div>
    </div>
  </div>
  
  <div class="footer-bottom">
    <p>&copy; 2024 ITI Electrician Pro. All rights reserved.</p>
    <p class="made-by">
      Made with <span class="heart">❤️</span> by 
      <strong class="developer-name">Shashank</strong>
    </p>
    <p class="version">Version 1.0.0</p>
  </div>
</footer>

<style>
.made-by {
  font-size: 14px;
  margin-top: 10px;
}

.developer-name {
  color: var(--accent-glow);
  font-weight: 700;
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
  transition: all 0.3s ease;
}

.developer-name:hover {
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.8);
  letter-spacing: 1px;
}

.heart {
  color: #ff0055;
  animation: heartbeat 1.5s infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
</style>
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### **Image Optimization:**
```javascript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/diagram.jpg"
  width={800}
  height={600}
  alt="Circuit Diagram"
  loading="lazy"
  placeholder="blur"
  quality={85}
/>

// Implement WebP format
// Use CDN for images (Cloudinary/ImageKit)
// Compress all images (TinyPNG)
// Use SVG for icons
```

### **Code Splitting:**
```javascript
// Lazy load components
import dynamic from 'next/dynamic'

const Calculator = dynamic(() => import('./Calculator'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})

// Route-based code splitting (automatic in Next.js)
```

### **Caching Strategy:**
```javascript
// Service Worker Cache
const CACHE_NAME = 'iti-electrician-v1';
const urlsToCache = [
  '/',
  '/chapters',
  '/calculator',
  '/styles.css',
  '/app.js',
  '/offline.html'
];

// Cache First Strategy for static assets
// Network First for dynamic content
// Stale While Revalidate for images
```

---

## 🎯 MARKETING STRATEGY (Post-Launch)

### **Organic Growth:**
```
1. SEO Optimization (Ongoing)
   - Blog posts on electrical topics
   - YouTube tutorials linking to app
   - Guest posts on education sites

2. Social Media
   - Daily tips on Instagram/Facebook
   - YouTube Shorts with quick lessons
   - Telegram group for students
   - WhatsApp status marketing

3. Community Engagement
   - Answer on Quora related to ITI
   - Reddit posts in r/India, r/ITI
   - Facebook groups for ITI students
   - College partnerships

4. App Store Optimization (ASO)
   - Keyword research
   - Compelling description
   - Regular updates
   - Encourage reviews

5. Word of Mouth
   - Referral program (future)
   - Share feature in app
   - Student testimonials
```

---

## 🛠️ DEVELOPMENT WORKFLOW

### **Git Workflow:**
```
main (production)
├── develop (staging)
    ├── feature/chapters
    ├── feature/calculators
    ├── feature/mock-test
    ├── feature/safety
    └── bugfix/calculator-validation

Commit Message Format:
feat: Add load calculator
fix: Correct MCB calculation formula
docs: Update README
style: Improve button hover effect
refactor: Optimize search algorithm
test: Add unit tests for calculators
```

### **Development Phases:**

```
Phase 1: Setup & Design (Week 1-2)
- Setup project (Next.js + Tailwind)
- Create design system
- Build reusable components
- Setup Firebase

Phase 2: Core Features (Week 3-6)
- Home page
- Chapters section
- Navigation
- Search functionality

Phase 3: Calculators (Week 7-8)
- All 10 calculators
- Input validation
- Result display
- Explanations

Phase 4: Mock Tests (Week 9-10)
- Question bank integration
- Test interface
- Result calculation
- Explanations

Phase 5: Additional Sections (Week 11-12)
- Safety section
- ITI Links
- About & Privacy pages

Phase 6: Testing & Polish (Week 13-14)
- Bug fixing
- Performance optimization
- Cross-browser testing
- Content review

Phase 7: Launch Preparation (Week 15-16)
- Android build
- Play Store listing
- Web deployment
- SEO setup
- Marketing materials

Total Timeline: 16 weeks (4 months)
```

---

## 📱 ANDROID-SPECIFIC FEATURES

### **AndroidManifest.xml (React Native)**

```xml
<manifest>
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  
  <application
    android:name=".MainApplication"
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:allowBackup="true"
    android:theme="@style/AppTheme">
    
    <!-- Deep Linking -->
    <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data android:scheme="itielectrician" />
    </intent-filter>
    
    <!-- Splash Screen -->
    <activity
      android:name=".SplashActivity"
      android:theme="@style/SplashTheme">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>
    
  </application>
</manifest>
```

### **Build Configuration:**
```gradle
android {
    compileSdkVersion 33
    
    defaultConfig {
        applicationId "com.shashank.itielectrician"
        minSdkVersion 21  // Android 5.0+
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt')
        }
    }
}
```

---

## 🎨 SAMPLE SCREENS LAYOUT

### **Home Screen:**
```
╔══════════════════════════════════╗
║ 🔍 Search chapters, tests...    ║
╠══════════════════════════════════╣
║                                  ║
║  👋 Welcome Back!                ║
║  Continue your learning journey  ║
║                                  ║
║ ┌──────────────┐ ┌────────────┐ ║
║ │ 📚 Chapters  │ │ 🧮 Calc    │ ║
║ │ 50 Topics    │ │ 10 Tools   │ ║
║ └──────────────┘ └────────────┘ ║
║                                  ║
║ ┌──────────────┐ ┌────────────┐ ║
║ │ 📝 Mock Test │ │ ⚠️ Safety  │ ║
║ │ 500+ Ques    │ │ 50 Tips    │ ║
║ └──────────────┘ └────────────┘ ║
║                                  ║
║ 📊 Your Progress                 ║
║ [████████░░] 80%                 ║
║                                  ║
║ 🔥 Streak: 7 days                ║
║ 🏆 Tests Completed: 12           ║
║                                  ║
╠══════════════════════════════════╣
║ 🏠  📚  🧮  📝  ⚙️              ║
╚══════════════════════════════════╝
```

### **Calculator Screen:**
```
╔══════════════════════════════════╗
║ ← Load Calculator                ║
╠══════════════════════════════════╣
║                                  ║
║ Select Appliances:               ║
║                                  ║
║ ┌────────────────────────────┐  ║
║ │ LED Bulb (10W) [+] [-]  3  │  ║
║ └────────────────────────────┘  ║
║ ┌────────────────────────────┐  ║
║ │ Fan (75W)      [+] [-]  4  │  ║
║ └────────────────────────────┘  ║
║ ┌────────────────────────────┐  ║
║ │ AC (1500W)     [+] [-]  1  │  ║
║ └────────────────────────────┘  ║
║                                  ║
║ [+ Add Custom Load]              ║
║                                  ║
║ Running Hours: [8] hrs/day       ║
║                                  ║
║ ┌────────────────────────────┐  ║
║ │  [CALCULATE] ⚡            │  ║
║ └────────────────────────────┘  ║
║                                  ║
║ ═══════ RESULT ═══════          ║
║ Total Load: 1830 W              ║
║ Current: 7.96 A                  ║
║ Daily Units: 14.64 kWh          ║
║ Monthly Cost: ₹878               ║
║ MCB Size: 16A                    ║
║                                  ║
║ 📖 [View Explanation]            ║
║ 📤 [Share Result]                ║
║                                  ║
╠══════════════════════════════════╣
║ 🏠  📚  🧮  📝  ⚙️              ║
╚══════════════════════════════════╝
```

### **Mock Test Screen:**
```
╔══════════════════════════════════╗
║ Question 15/25        ⏱️ 18:45   ║
╠══════════════════════════════════╣
║                                  ║
║ Ohm's Law का formula क्या है?   ║
║                                  ║
║ ┌────────────────────────────┐  ║
║ │ ○ A. V = I × R             │  ║
║ └────────────────────────────┘  ║
║ ┌────────────────────────────┐  ║
║ │ ○ B. P = V × I             │  ║
║ └────────────────────────────┘  ║
║ ┌────────────────────────────┐  ║
║ │ ○ C. I = V + R             │  ║
║ └────────────────────────────┘  ║
║ ┌────────────────────────────┐  ║
║ │ ○ D. R = V - I             │  ║
║ └────────────────────────────┘  ║
║                                  ║
║ [🚩 Mark for Review]             ║
║                                  ║
║ ┌─────────┐         ┌─────────┐ ║
║ │ ← PREV  │         │  NEXT → │ ║
║ └─────────┘         └─────────┘ ║
║                                  ║
║ Question Navigator:              ║
║ [1][2][3][4][5]...[24][25]      ║
║ ✅✅❌⬜⬜     ⬜🚩          ║
║                                  ║
║ [⏸️ Pause] [📋 Review] [✓ Submit]║
║                                  ║
╚══════════════════════════════════╝
```

---

## 📊 ANALYTICS TO TRACK

### **Firebase Analytics Events:**

```javascript
// Track user behavior
analytics.logEvent('calculator_used', {
  calculator_type: 'load_calculator',
  result_value: '2500W'
});

analytics.logEvent('test_completed', {
  test_id: 'first_year_set_1',
  score: 18,
  total: 25,
  time_taken: '15:30'
});

analytics.logEvent('chapter_viewed', {
  chapter_name: 'Ohms Law',
  year: '1st',
  time_spent: 180 // seconds
});

analytics.logEvent('search_performed', {
  search_term: 'transformer',
  results_found: 5
});

// Custom dimensions
- User Segment (New/Returning)
- Device Type (Mobile/Tablet/Desktop)
- OS (Android/iOS/Web)
- Language Preference
```

---

## 🔒 DATA PRIVACY & COMPLIANCE

### **GDPR/Privacy Compliance:**

```
Data Minimization:
✅ Collect only necessary data
✅ Anonymous analytics only
✅ No personal information required
✅ Local storage for progress
✅ No third-party data sharing
✅ Clear privacy policy
✅ User control over data

Google Play Requirements:
✅ Privacy policy link
✅ Data safety section filled
✅ Permissions explained
✅ No deceptive practices
✅ Content rating appropriate
```

---

## 🎓 CONTENT ROADMAP

### **Initial Launch Content:**
```
Chapters: 50 topics (1st + 2nd year)
Questions: 500 MCQs
Calculators: 10 tools
Safety Tips: 30 topics
Images: 100+
ITI Links: 20+
```

### **Post-Launch Content Addition:**
```
Month 2: +100 questions
Month 3: +2 calculators
Month 4: +20 chapter topics
Month 6: Add Fitter trade
Month 9: Add Welder trade
Month 12: Video tutorials
```

---

## 🚨 IMPORTANT NOTES FOR CODE IMPLEMENTATION

### **⚠️ WORD LIMIT HANDLING IN CODE GENERATION:**

```
यदि code लिखते समय word/character limit आ जाए, तो:

1. मैं यह message दूंगा:
   "CODE CONTINUE FROM: [exact function/section name]"

2. आप respond करें:
   "Continue from [section name]"

3. Main code यहाँ से resume होगा बिना repetition के

4. हर file का clear marker होगा:
   // === PART 1 END ===
   // === PART 2 START ===

5. Breaking points logical होंगे:
   - Function के बीच में नहीं
   - Component के complete hone पर
   - File boundaries पर

6. Context maintain करने के लिए:
   - Previous file ka naam
   - Current section
   - Next expected section
   
Example:
"
// ============================================
// FILE: Calculator.jsx - PART 2 of 3
// Previous: Import statements & state setup
// Current: Calculator logic functions
// Next: UI components & return statement
// ============================================
"
```

---

## ✅ FINAL PRD SUMMARY

### **Complete App Structure:**

```
ITI Electrician Pro App
│
├── 🏠 HOME
│   ├── Search Bar
│   ├── Quick Access Cards
│   ├── Stats Dashboard
│   └── Navigation Menu
│
├── 📚 CHAPTERS
│   ├── 1st Year (25 topics)
│   │   ├── Trade Theory
│   │   └── Workshop Calculation
│   └── 2nd Year (25 topics)
│       ├── Trade Theory
│       └── Workshop Calculation
│
├── 🧮 CALCULATORS (10 Tools)
│   ├── Load Calculator
│   ├── Power Calculator
│   ├── Current Calculator
│   ├── Conduit Calculator
│   ├── Cable Sizing Calculator
│   ├── Wire Diameter Calculator
│   ├── MCB Calculator
│   ├── RCCB Calculator
│   ├── Voltage Drop Calculator
│   └── Earthing Resistance Calculator
│
├── 📝 MOCK TEST
│   ├── Practice Tests (Chapter-wise)
│   ├── Full Tests (Year-wise)
│   ├── Custom Tests
│   └── Previous Attempts
│
├── ⚠️ SAFETY
│   ├── General Safety (5 Golden Rules)
│   ├── PPE Guide
│   ├── Work-Specific Safety
│   ├── Emergency Procedures
│   └── Safety Signs & Symbols
│
├── 🔗 MORE ITI LINKS
│   ├── Results Portal
│   ├── Certificate Services
│   ├── Admission Links
│   ├── Syllabus Downloads
│   └── Job Portals
│
├── ℹ️ ABOUT US
│   └── App & Trade Information
│
└── 🔒 PRIVACY POLICY
    └── GDPR Compliant Policy

FOOTER: Made with ❤️ by Shashank
```

---

### **Tech Stack Summary:**
- **Framework:** Next.js 14 (Web) + React Native/Flutter (Android)
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** Firebase Firestore
- **Hosting:** Vercel (Web) + Google Play (Android)
- **Analytics:** Firebase Analytics + Google Search Console

---

### **Timeline:** 16 weeks (4 months)
### **Budget:** ~₹0 (Using free tiers + One-time $25 for Play Store)
### **Target Users:** 1,00,000+ in Year 1

---

## 🎯 SUCCESS CRITERIA

```
Launch Goals:
✅ 0 critical bugs
✅ 90+ Lighthouse score
✅ <3s load time
✅ 500+ questions ready
✅ All calculators functional
✅ 100+ images/diagrams
✅ SEO optimized
✅ Play Store approved

3-Month Goals:
✅ 10,000+ installs
✅ 4.5+ star rating
✅ 50+ reviews
✅ 5000+ web visitors/month
✅ Top 10 in "ITI Electrician" searches

6-Month Goals:
✅ 50,000+ installs
✅ Ad revenue started
✅ 2nd trade added
✅ Featured on Play Store
✅ 20,000+ web visitors/month

1-Year Goals:
✅ 1,00,000+ installs
✅ ₹10,000+ monthly revenue
✅ 5+ trades covered
✅ Mobile app + Web app parity
✅ Community of 50,000+ active users
```

---

## 📞 NEXT STEPS AFTER PRD APPROVAL

1. ✅ **Approve this PRD**
2. 📝 **Start content writing** (Chapters, Questions, Safety)
3. 🎨 **Gather/Create images** (Diagrams, Icons, Screenshots)
4. 💻 **Begin development** (Setup project)
5. 🧪 **Continuous testing**
6. 🚀 **Launch preparation**
7. 📈 **Marketing & Growth**

---

## 💬 QUESTIONS BEFORE STARTING?

```
Before I start coding, please confirm:

1. Language preference: Hindi+English bilingual? ✓
2. Primary platform: Android first or Web first?
3. Domain name: Do you have one already?
4. Content: Will you provide or need help?
5. Images: Need help with design/diagrams?
6. Timeline: 4 months acceptable?
7. Budget: Free tier or any budget?
8. Additional features needed?
```

---

# 🎉 PRD COMPLETE!

## **⚠️ IMPORTANT NOTE FOR CODE GENERATION:**

```
जब मैं इस app का code generate करूंगा और character limit 
आ जाएगी, तो:

1. मैं clear marker दूंगा कहाँ रुका हूँ
2. आप बस लिखें: "continue" या "अगला part"
3. मैं वहीं से शुरू करूंगा बिना दोहराए
4. सभी files sequential order में मिलेंगी
5. Complete app बनकर तैयार होगी

Example flow:
Me: "// === HomePage.jsx PART 1/3 END ==="
You: "continue"
Me: "// === HomePage.jsx PART 2/3 START ==="
```

---

**Document Prepared By:** AI Assistant  
**For:** Shashank  
**Project:** ITI Electrician Pro Learning App  
**Version:** 1.0  
**Date:** 2024  
**Status:** Ready for Development ✅

---