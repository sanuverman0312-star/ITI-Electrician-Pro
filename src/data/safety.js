export const safetyData = {
  goldenRules: [
    {
      id: 'gr-1',
      number: 1,
      title: 'Disconnect Completely',
      titleHindi: 'पूरी तरह से Disconnect करें',
      description: 'काम शुरू करने से पहले सभी power sources को disconnect करें',
      steps: [
        'Main switch OFF करें',
        'Isolator open करें',
        'All phases को disconnect करें',
        'Neutral को भी disconnect करें'
      ],
      icon: '🔌',
      image: 'disconnect.jpg'
    },
    {
      id: 'gr-2',
      number: 2,
      title: 'Secure Against Reconnection',
      titleHindi: 'दोबारा Connection से बचाएं',
      description: 'यह सुनिश्चित करें कि कोई दूसरा व्यक्ति switch ON न कर सके',
      steps: [
        'Switch पर Lock लगाएं',
        'Warning board लगाएं "Men at Work"',
        'Fuse निकाल दें',
        'Key अपने पास रखें'
      ],
      icon: '🔒',
      image: 'lockout.jpg'
    },
    {
      id: 'gr-3',
      number: 3,
      title: 'Verify Dead',
      titleHindi: 'मृत सर्किट की पुष्टि करें',
      description: 'Tester से check करें कि circuit में कोई voltage नहीं है',
      steps: [
        'Approved voltage tester use करें',
        'सभी phases को test करें',
        'Phase to neutral test करें',
        'Phase to earth test करें'
      ],
      icon: '🔍',
      image: 'testing.jpg'
    },
    {
      id: 'gr-4',
      number: 4,
      title: 'Earth and Short Circuit',
      titleHindi: 'अर्थिंग और शॉर्ट सर्किट करें',
      description: 'सभी conductors को earth से connect करें',
      steps: [
        'Earthing rod लगाएं',
        'सभी phases को earth करें',
        'Short circuit device use करें',
        'Proper connection verify करें'
      ],
      icon: '⚡',
      image: 'earthing-short.jpg'
    },
    {
      id: 'gr-5',
      number: 5,
      title: 'Cover Nearby Live Parts',
      titleHindi: 'आस-पास के Live Parts को Cover करें',
      description: 'काम की जगह के पास जो live parts हैं उन्हें cover करें',
      steps: [
        'Insulating covers use करें',
        'Barriers लगाएं',
        'Warning signs display करें',
        'Safe working distance maintain करें'
      ],
      icon: '🛡️',
      image: 'cover-parts.jpg'
    }
  ],

  ppe: [
    {
      id: 'ppe-1',
      name: 'Safety Helmet',
      nameHindi: 'सुरक्षा हेलमेट',
      purpose: 'सिर को गिरती वस्तुओं और बिजली के झटके से बचाता है',
      features: [
        'High impact resistant',
        'Non-conductive material',
        'Adjustable chin strap',
        'Ventilation holes'
      ],
      usage: 'हमेशा site पर पहनें',
      color: 'Yellow/White',
      icon: '⛑️',
      image: 'helmet.jpg'
    },
    {
      id: 'ppe-2',
      name: 'Safety Shoes',
      nameHindi: 'सुरक्षा जूते',
      purpose: 'पैरों को electrical shock और heavy objects से बचाता है',
      features: [
        'Steel toe cap',
        'Insulated sole',
        'Anti-slip',
        'Water resistant'
      ],
      usage: 'Electrical काम के दौरान अनिवार्य',
      color: 'Black',
      icon: '👞',
      image: 'safety-shoes.jpg'
    },
    {
      id: 'ppe-3',
      name: 'Insulated Gloves',
      nameHindi: 'इंसुलेटेड दस्ताने',
      purpose: 'हाथों को electric shock से बचाता है',
      features: [
        'Rubber insulation',
        'Tested for voltage rating',
        'Good grip',
        'Different voltage classes'
      ],
      usage: 'Live circuit के पास काम करते समय',
      voltageClass: '1000V / 11kV',
      icon: '🧤',
      image: 'gloves.jpg'
    },
    {
      id: 'ppe-4',
      name: 'Safety Goggles',
      nameHindi: 'सुरक्षा चश्मा',
      purpose: 'आंखों को sparks और debris से बचाता है',
      features: [
        'Impact resistant lens',
        'Anti-fog coating',
        'UV protection',
        'Adjustable strap'
      ],
      usage: 'Welding, grinding, drilling के समय',
      icon: '🥽',
      image: 'goggles.jpg'
    },
    {
      id: 'ppe-5',
      name: 'Insulated Mat',
      nameHindi: 'इंसुलेटेड चटाई',
      purpose: 'खड़े होने के लिए insulated surface provide करता है',
      features: [
        'High dielectric strength',
        'Non-slip surface',
        'Oil resistant',
        'Easy to clean'
      ],
      usage: 'Switchboard के सामने रखें',
      voltageRating: '33kV',
      icon: '🟥',
      image: 'insulated-mat.jpg'
    }
  ],

  dosAndDonts: {
    dos: [
      '✅ Use proper insulated tools',
      '✅ Wear complete PPE',
      '✅ Check voltage before touching',
      '✅ Work in dry conditions',
      '✅ Inform supervisor before working',
      '✅ Use proper ladder for height work',
      '✅ Keep first aid kit nearby',
      '✅ Follow lockout/tagout procedures',
      '✅ Maintain safe distance from live parts',
      '✅ Regular inspection of tools',
      '✅ Use proper size of wire',
      '✅ Install ELCB/RCCB for safety',
      '✅ Keep fire extinguisher handy',
      '✅ Work in well-lit area'
    ],
    donts: [
      '❌ Never work on live circuits without permission',
      '❌ Don\'t use damaged cables/wires',
      '❌ Don\'t overload circuits',
      '❌ Don\'t touch electrical equipment with wet hands',
      '❌ Don\'t bypass safety devices',
      '❌ Don\'t work alone on high voltage',
      '❌ Don\'t use metal ladder near electrical work',
      '❌ Don\'t wear loose clothing',
      '❌ Don\'t use damaged tools',
      '❌ Don\'t ignore warning signs',
      '❌ Don\'t create temporary connections',
      '❌ Don\'t leave tools on energized equipment',
      '❌ Don\'t work in adverse weather (outdoor)',
      '❌ Don\'t remove earth connection'
    ]
  },

  emergencyProcedures: {
    electricShock: {
      title: 'Electric Shock Treatment',
      titleHindi: 'बिजली के झटके का उपचार',
      steps: [
        {
          step: 1,
          action: 'Switch OFF power immediately',
          actionHindi: 'तुरंत बिजली बंद करें',
          details: 'Main switch या MCB को OFF करें',
          image: 'power-off.jpg'
        },
        {
          step: 2,
          action: 'Separate victim from source',
          actionHindi: 'पीड़ित को स्रोत से अलग करें',
          details: 'Dry wooden stick या insulated material use करें',
          warning: 'खुद को touch न करें!',
          image: 'separate-victim.jpg'
        },
        {
          step: 3,
          action: 'Check breathing',
          actionHindi: 'सांस की जांच करें',
          details: 'Chest movement देखें, नाक के पास हाथ रखें',
          image: 'check-breathing.jpg'
        },
        {
          step: 4,
          action: 'Start CPR if needed',
          actionHindi: 'जरूरत हो तो CPR शुरू करें',
          details: '30 chest compressions, 2 rescue breaths',
          image: 'cpr.jpg'
        },
        {
          step: 5,
          action: 'Call emergency (108)',
          actionHindi: 'आपातकालीन नंबर (108) पर कॉल करें',
          details: 'Ambulance के आने तक CPR जारी रखें',
          image: 'call-emergency.jpg'
        }
      ],
      importantPoints: [
        '⚠️ खुद को electric shock से बचाएं',
        '⚠️ Dry insulated material ही use करें',
        '⚠️ Victim को तुरंत hospital ले जाएं',
        '⚠️ CPR trained person को बुलाएं'
      ]
    },
    
    fireSafety: {
      title: 'Electrical Fire Safety',
      titleHindi: 'विद्युत आग से सुरक्षा',
      classOfFires: [
        {
          class: 'Class A',
          type: 'Solid materials (Wood, Paper, Cloth)',
          extinguisher: 'Water, Foam',
          notForElectrical: true
        },
        {
          class: 'Class B',
          type: 'Liquid fires (Oil, Petrol, Grease)',
          extinguisher: 'Foam, CO₂, Dry Powder',
          notForElectrical: false
        },
        {
          class: 'Class C',
          type: 'Gas fires (LPG, CNG)',
          extinguisher: 'Dry Powder',
          notForElectrical: false
        },
        {
          class: 'Class E',
          type: 'Electrical fires',
          extinguisher: 'CO₂, Dry Powder',
          recommended: 'CO₂ extinguisher'
        }
      ],
      steps: [
        'Switch OFF electrical supply',
        'Use CO₂ extinguisher (electrical के लिए)',
        'Never use water on electrical fire',
        'Evacuate if fire spreads',
        'Call fire brigade (101)'
      ],
      image: 'fire-extinguisher.jpg'
    }
  },

  safetySigns: [
    {
      id: 'sign-1',
      name: 'High Voltage',
      nameHindi: 'उच्च वोल्टेज',
      type: 'Warning',
      color: 'Yellow triangle with black border',
      meaning: 'Danger of electric shock',
      image: 'high-voltage-sign.jpg'
    },
    {
      id: 'sign-2',
      name: 'Danger',
      nameHindi: 'खतरा',
      type: 'Prohibition',
      color: 'Red circle with white background',
      meaning: 'Immediate danger - Do not enter',
      image: 'danger-sign.jpg'
    },
    {
      id: 'sign-3',
      name: 'Earthing Symbol',
      nameHindi: 'अर्थिंग चिन्ह',
      type: 'Mandatory',
      color: 'Green',
      meaning: 'Earthing point',
      image: 'earth-symbol.jpg'
    },
    {
      id: 'sign-4',
      name: 'First Aid',
      nameHindi: 'प्राथमिक चिकित्सा',
      type: 'Safe Condition',
      color: 'Green with white cross',
      meaning: 'First aid available here',
      image: 'first-aid-sign.jpg'
    },
    {
      id: 'sign-5',
      name: 'Fire Extinguisher',
      nameHindi: 'अग्निशामक यंत्र',
      type: 'Fire Equipment',
      color: 'Red',
      meaning: 'Fire extinguisher location',
      image: 'fire-ext-sign.jpg'
    },
    {
      id: 'sign-6',
      name: 'Wear Safety Helmet',
      nameHindi: 'हेलमेट पहनें',
      type: 'Mandatory',
      color: 'Blue circle',
      meaning: 'Mandatory to wear helmet',
      image: 'helmet-sign.jpg'
    }
  ]
};

export const getSafetyByCategory = (category) => {
  return safetyData[category] || [];
};