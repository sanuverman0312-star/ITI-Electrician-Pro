export const chaptersData = {
  firstYear: [
    {
      id: 'fy-1',
      title: 'Tools & Equipment',
      category: 'Trade Theory',
      year: '1st',
      icon: '🔧',
      description: 'बेसिक इलेक्ट्रिकल tools और उनका उपयोग',
      topics: [
        'Screwdriver (Flat & Phillips)',
        'Pliers (Combination, Long Nose, Cutting)',
        'Wire Stripper',
        'Crimping Tool',
        'Hammer',
        'Chisel',
        'File',
        'Hacksaw',
        'Measuring Tape',
        'Spirit Level'
      ],
      content: `
# Tools & Equipment

## परिचय (Introduction)

Electrician trade में काम करने के लिए सही tools का ज्ञान और उपयोग बहुत जरूरी है। हर tool का अपना specific उपयोग होता है।

## मुख्य बिंदु (Key Points)

- ✓ हमेशा insulated tools का उपयोग करें
- ✓ काम से पहले tools की condition check करें
- ✓ Damaged tools कभी use न करें
- ✓ काम के बाद tools को साफ करके रखें
- ✓ Sharp tools को carefully handle करें

## Important Tools

### 1. Screwdriver
**Types:**
- Flat (Slotted) - सामान्य screws के लिए
- Phillips (Cross) - Cross head screws के लिए
- Stubby - Tight spaces के लिए

**Safety:**
- Handle insulated होना चाहिए
- Tip sharp और clean होना चाहिए
- सही size का screwdriver use करें

### 2. Pliers
**Types:**
- Combination Pliers - General purpose
- Long Nose Pliers - Wire bending, tight spaces
- Cutting Pliers - Wire cutting
- Stripping Pliers - Insulation removal

**Safety:**
- Insulated handle जरूरी
- Live wires पर use न करें
- Regular maintenance करें

## याद रखें (Remember)

💡 "सही tool सही काम के लिए - Right tool for right job"

सभी tools का proper maintenance करें और safety के साथ use करें।
      `,
      images: ['tools-basic.jpg', 'screwdrivers.jpg', 'pliers-types.jpg'],
      relatedTopics: ['Safety Equipment', 'Workshop Practice'],
      readingTime: 5
    },
    {
      id: 'fy-2',
      title: 'Basic Electricity',
      category: 'Trade Theory',
      year: '1st',
      icon: '⚡',
      description: 'बिजली के मूल सिद्धांत और concepts',
      topics: [
        'What is Electricity',
        'Electric Current',
        'Voltage',
        'Resistance',
        'Conductors',
        'Insulators',
        'Electric Circuit',
        'Open & Closed Circuit',
        'Series & Parallel Connection'
      ],
      content: `
# Basic Electricity

## बिजली क्या है? (What is Electricity?)

Electricity electrons का flow है जो conductor में होता है। यह energy का एक form है।

## मुख्य Components

### 1. Electric Current (I)
**Definition:** Electrons के flow की rate को current कहते हैं।

**Unit:** Ampere (A)

**Symbol:** I

**Types:**
- DC (Direct Current) - एक ही direction में flow
- AC (Alternating Current) - Direction बदलता रहता है

### 2. Voltage (V)
**Definition:** Electric pressure जो electrons को move करता है।

**Unit:** Volt (V)

**Symbol:** V or E

**Example:** 
- Battery: 1.5V, 9V, 12V
- Home Supply: 230V AC
- Industrial: 440V AC

### 3. Resistance (R)
**Definition:** Current के flow में रुकावट।

**Unit:** Ohm (Ω)

**Symbol:** R

**Factors:**
- Material (Conductor/Insulator)
- Length (लंबाई बढ़ने से R बढ़ता है)
- Cross-section area (Area बढ़ने से R घटता है)
- Temperature

## Important Formulas

### Ohm's Law
\`\`\`
V = I × R

Where:
V = Voltage (Volts)
I = Current (Amperes)
R = Resistance (Ohms)
\`\`\`

### Power Formula
\`\`\`
P = V × I
P = I² × R
P = V² / R

Where:
P = Power (Watts)
\`\`\`

## उदाहरण (Example)

**Problem:** एक circuit में 230V supply है और 10Ω resistance है। Current कितना होगा?

**Solution:**
Using Ohm's Law: V = I × R
I = V / R
I = 230 / 10
I = 23 Amperes

text


## Conductors vs Insulators

### Conductors (सुचालक)
Materials जो current को आसानी से pass करते हैं:
- Copper (सबसे common)
- Aluminum
- Silver
- Gold
- Iron

### Insulators (कुचालक)
Materials जो current को रोकते हैं:
- Rubber
- Plastic
- Glass
- Wood (dry)
- Porcelain

## याद रखें (Remember)

💡 **V = I × R** - यह electrical का सबसे important formula है!

⚠️ **Safety:** Live wires को कभी direct touch न करें।
      `,
      images: ['electricity-basics.jpg', 'circuit-diagram.jpg', 'ohms-law.jpg'],
      relatedTopics: ["Ohm's Law", 'Series & Parallel Circuits'],
      readingTime: 8
    },
    {
      id: 'fy-3',
      title: "Ohm's Law",
      category: 'Trade Theory',
      year: '1st',
      icon: '📐',
      description: 'Voltage, Current और Resistance का relation',
      topics: [
        "Ohm's Law Statement",
        'V = I × R Formula',
        'Practical Applications',
        'Problem Solving',
        'Limitations',
        'Verification Methods'
      ],
      content: `
# Ohm's Law

## Statement (कथन)

"एक conductor में current, उसके양ों के बीच potential difference के directly proportional होता है, जब temperature constant रहे।"

**English:** Current through a conductor is directly proportional to the voltage across it, provided temperature remains constant.

## Formula

\`\`\`
V = I × R

या इसके variants:
I = V / R
R = V / I

Where:
V = Voltage (Volts)
I = Current (Amperes)  
R = Resistance (Ohms)
\`\`\`

## Triangle Diagram

\`\`\`
    V
   ---
  | R |
   ---
    I
\`\`\`

**याद करने का तरीका:**
- V को ढूंढना है → I × R
- I को ढूंढना है → V / R
- R को ढूंढना है → V / I

## Examples (उदाहरण)

### Example 1: Find Current
**Question:** 230V supply पर 50Ω resistor connect है। Current कितना होगा?

**Solution:**
Given: V = 230V, R = 50Ω
Find: I = ?

Formula: I = V / R
I = 230 / 50
I = 4.6 A

Answer: 4.6 Amperes

text


### Example 2: Find Voltage
**Question:** 5A current flow हो रहा है 10Ω resistance में। Voltage कितना है?

**Solution:**
Given: I = 5A, R = 10Ω
Find: V = ?

Formula: V = I × R
V = 5 × 10
V = 50 V

Answer: 50 Volts

text


### Example 3: Find Resistance
**Question:** 230V पर 10A current draw हो रहा है। Resistance कितना है?

**Solution:**
Given: V = 230V, I = 10A
Find: R = ?

Formula: R = V / I
R = 230 / 10
R = 23 Ω

Answer: 23 Ohms

text


## Practical Applications

1. **Wire Selection**
   - Load current calculate करके सही wire size चुनें

2. **Fuse Rating**
   - Circuit current से fuse rating decide करें

3. **Voltage Drop Calculation**
   - Long distance wiring में voltage drop पता करें

4. **Load Testing**
   - Appliance की actual resistance measure करें

## Important Points

✓ Temperature constant होना चाहिए
✓ Ohmic materials के लिए valid है
✓ DC और AC दोनों में apply होता है
✓ Non-linear devices (Diode, LED) में apply नहीं होता

## Practice Problems

1. V = 12V, R = 4Ω, I = ?
   Answer: I = 3A

2. I = 15A, R = 20Ω, V = ?
   Answer: V = 300V

3. V = 440V, I = 20A, R = ?
   Answer: R = 22Ω

## याद रखें (Remember)

💡 Ohm's Law electrical engineering का foundation है। हर calculation में इसका use होता है!
      `,
      images: ['ohms-law-diagram.jpg', 'voltage-current-graph.jpg'],
      relatedTopics: ['Basic Electricity', 'Series Circuits', 'Parallel Circuits'],
      readingTime: 6
    },
    // Add more first year chapters...
  ],
  
  secondYear: [
    {
      id: 'sy-1',
      title: 'DC Motors',
      category: 'Electrical Machines',
      year: '2nd',
      icon: '⚙️',
      description: 'DC मोटर के प्रकार और working principle',
      topics: [
        'DC Motor Principle',
        'Types of DC Motors',
        'Series Motor',
        'Shunt Motor',
        'Compound Motor',
        'Speed Control',
        'Starting Methods',
        'Applications',
        'Maintenance'
      ],
      content: `
# DC Motors

## Working Principle

DC Motor electrical energy को mechanical energy में convert करती है।

**Principle:** जब current carrying conductor को magnetic field में रखा जाता है, तो उस पर force लगता है।

## Formula

\`\`\`
F = B × I × L

Where:
F = Force (Newtons)
B = Magnetic Field (Tesla)
I = Current (Amperes)
L = Length of conductor (meters)
\`\`\`

## Types of DC Motors

### 1. DC Series Motor

**Connection:** Field winding, armature के साथ series में

**Characteristics:**
- High starting torque
- Variable speed
- No-load पर dangerous (बहुत तेज घूमती है)

**Applications:**
- Electric trains
- Cranes
- Hoists
- Traction work

### 2. DC Shunt Motor

**Connection:** Field winding, armature के साथ parallel में

**Characteristics:**
- Constant speed
- Low starting torque
- Safe at no-load

**Applications:**
- Lathes
- Drilling machines
- Fans
- Centrifugal pumps

### 3. DC Compound Motor

**Connection:** Series और shunt दोनों windings

**Types:**
- Cumulative Compound
- Differential Compound

**Applications:**
- Punching machines
- Shears
- Elevators
- Rolling mills

## Speed Control Methods

1. **Field Control Method**
   - Field current को vary करके
   - Speed control above normal speed

2. **Armature Control Method**
   - Armature voltage को vary करके
   - Speed control below normal speed

3. **Voltage Control Method**
   - Supply voltage vary करना

## Motor Starting

DC motor को directly start करने पर high current draw होता है, इसलिए starter use करते हैं:

**Types of Starters:**
1. Three Point Starter
2. Four Point Starter

## Maintenance Tips

✓ Regular cleaning
✓ Bearing lubrication
✓ Brush inspection
✓ Commutator cleaning
✓ Connection tightness check

## याद रखें (Remember)

💡 Series motor में high starting torque होता है, इसलिए traction work में use होती है।
      `,
      images: ['dc-motor-diagram.jpg', 'motor-types.jpg', 'starter-circuit.jpg'],
      relatedTopics: ['AC Motors', 'Motor Control', 'Starters'],
      readingTime: 10
    },
    // Add more second year chapters...
  ]
};

// Quick access arrays
export const allChapters = [
  ...chaptersData.firstYear,
  ...chaptersData.secondYear
];

export const getChapterById = (id) => {
  return allChapters.find(chapter => chapter.id === id);
};

export const getChaptersByYear = (year) => {
  return year === '1st' ? chaptersData.firstYear : chaptersData.secondYear;
};

export const getChaptersByCategory = (category) => {
  return allChapters.filter(chapter => chapter.category === category);
};