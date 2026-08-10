import React, { createContext, useContext, useState, useEffect } from 'react';

const SreeVriddhiContext = createContext();

const INITIAL_STATE = {
  // Brand & Contact Information (Editable via Admin Settings)
  brandSettings: {
    name: 'Sree Vriddhi',
    tagline: 'Your Value. Our Responsibility. Your Returns.',
    philosophy: 'Your Value. Our Responsibility. Your Returns.',
    alternativeQuotes: [
      'Where Value Finds Growth.',
      'Preserve Value. Create Growth.',
      'Your Value, Working for You.',
      'విలువకు వృద్ధి — వృద్ధికి విశ్వాసం'
    ],
    phone: '+91 9640352929',
    email: 'liveasyourlike@gmail.com',
    whatsappUrl: 'https://wa.me/919640352929',
    primaryLogo: '/brand/logo-primary.jpeg',
    darkLogo: '/brand/logo-dark.jpeg',
    lightLogo: '/brand/logo-light.jpeg',
    logoMark: '/brand/logo-mark.jpeg',
    favicon: '/brand/favicon.jpeg',
    participantLimit: 10,
    commercialDisclaimer: 'Illustrative/proposed commercial terms are subject to legal, regulatory, product and contract approval. Eligible assets are subject to verification, valuation, risk assessment and final contractual terms.'
  },

  // Dynamic Products Catalogue & Config
  products: [
    {
      id: 'prod-001',
      name: 'Sree Vriddhi Value Prime',
      slug: 'sree-vriddhi-value-prime',
      status: 'Compliance Approved', // Draft | Under Legal Review | Compliance Approved | Active | Temporarily Suspended | Retired
      tenure: '12 Months',
      settlementFrequency: 'Monthly',
      proposedMonthlyReturn: 5.0, // Proposed assumption %
      proposedFortnightlyReturn: 2.5,
      noticePeriodDays: 60,
      minAssetValue: 25000, // INR 0.25 Lakhs (25,000)
      maxAssetValue: 5000000, // INR 50 Lakhs
      eligibleAssets: ['Capital / Money', 'Gold / Bullion', 'Commercial Land & Property'],
      description: 'Structured value-preservation and growth framework tailored for high-value liquid capital, physical gold, and commercial real estate assets.',
      legalStatus: 'Approved by Legal Review Committee',
      riskDisclaimer: 'Final settlement terms and periodic payouts are strictly governed by the executed legal agreement following professional asset valuation.',
      lastUpdated: '2026-08-10'
    },
    {
      id: 'prod-002',
      name: 'Sree Vriddhi Heritage Gold Shield',
      slug: 'sree-vriddhi-heritage-gold-shield',
      status: 'Active',
      tenure: '12 Months',
      settlementFrequency: 'Monthly / Fortnightly',
      proposedMonthlyReturn: 5.0,
      proposedFortnightlyReturn: 2.5,
      noticePeriodDays: 60,
      minAssetValue: 25000, // INR 0.25 Lakhs (25,000)
      maxAssetValue: 5000000,
      eligibleAssets: ['Gold / Bullion / Jewellery'],
      description: 'Dedicated custody, insurance, and periodic value growth structure engineered specifically for physical gold holdings.',
      legalStatus: 'Compliance Verified & Active',
      riskDisclaimer: 'Physical gold custody requires independent biometric purity verification and secure vault storage arrangement.',
      lastUpdated: '2026-08-08'
    },
    {
      id: 'prod-003',
      name: 'Sree Vriddhi Land & Realty Growth',
      slug: 'sree-vriddhi-land-realty-growth',
      status: 'Under Legal Review',
      tenure: '24 Months',
      settlementFrequency: 'Quarterly / Monthly',
      proposedMonthlyReturn: 4.5,
      proposedFortnightlyReturn: 2.25,
      noticePeriodDays: 90,
      minAssetValue: 25000, // INR 0.25 Lakhs (25,000)
      maxAssetValue: 5000000,
      eligibleAssets: ['Non-encumbered Land', 'Residential & Commercial Real Estate'],
      description: 'Structured real estate value evaluation framework transforming unencumbered property equity into periodic contractual value.',
      legalStatus: 'Under Final Regulatory Review',
      riskDisclaimer: 'Property title deeds are subject to 30-year legal search reports and independent surveyor valuation.',
      lastUpdated: '2026-08-05'
    }
  ],

  // Asset Categories Config & Status
  assetCategories: [
    {
      id: 'ast-cat-1',
      type: 'Capital / Money',
      slug: 'capital',
      status: 'Approved', // Draft | Under Review | Approved | Conditional | Not Accepted | Suspended
      icon: 'Banknote',
      description: 'Eligible liquid capital deposited through verifiable banking channels.',
      documentation: ['Bank Statements (12 Months)', 'Source of Funds Declaration', 'PAN & Aadhaar KYC'],
      verificationReq: 'Banking trail & AML screening',
      valuationReq: 'Direct bank statement reconciliation'
    },
    {
      id: 'ast-cat-2',
      type: 'Physical Gold',
      slug: 'gold',
      status: 'Approved',
      icon: 'Coins',
      description: 'Hallmarked gold coins, bars, or certified gold jewellery.',
      documentation: ['Original Purchase Invoices', 'Purity Certification', 'Ownership Declaration'],
      verificationReq: 'Biometric & XRF spectrometer assaying',
      valuationReq: 'Independent IBJA benchmark valuation'
    },
    {
      id: 'ast-cat-3',
      type: 'Land & Property',
      slug: 'property',
      status: 'Conditional',
      icon: 'Building2',
      description: 'Clear-title residential, commercial, or agricultural land holdings.',
      documentation: ['Title Deed / Sale Deed', 'Encumbrance Certificate (30 Yrs)', 'Tax Receipts & EC'],
      verificationReq: 'Senior Legal Panel search report',
      valuationReq: 'Govt approved Valuer inspection report'
    },
    {
      id: 'ast-cat-4',
      type: 'Securities / Financial Assets',
      slug: 'securities',
      status: 'Under Review',
      icon: 'FileSpreadsheet',
      description: 'Permitted demat securities subject to separate regulatory eligibility.',
      documentation: ['Demat Holding Statement', 'PAN Verification'],
      verificationReq: 'Depository verification',
      valuationReq: 'Market price 30-day VWAP'
    }
  ],

  // CRM Leads
  leads: [
    {
      id: 'SV-LEAD-2026-001',
      name: 'Ramesh Varma',
      mobile: '+91 98480 12345',
      email: 'ramesh.varma@example.com',
      location: 'Hyderabad, Telangana',
      assetType: 'Physical Gold',
      approxValue: 1500000,
      stage: 'Eligibility Submitted', // New | Contacted | Qualified | Eligibility Submitted | Application Started | Application Submitted | Converted | Lost | Nurture
      source: 'Website Eligibility Checker',
      score: 85,
      createdAt: '2026-08-09T10:30:00Z',
      notes: 'Submitted 300g gold eligibility check. Wants monthly settlement payout.',
      assignedTo: 'Sreekanth Sharma'
    },
    {
      id: 'SV-LEAD-2026-002',
      name: 'Priyanka Reddy',
      mobile: '+91 97001 98765',
      email: 'priyanka.r@example.com',
      location: 'Vijayawada, AP',
      assetType: 'Capital / Money',
      approxValue: 5000000,
      stage: 'Application Started',
      source: 'Direct Phone',
      score: 92,
      createdAt: '2026-08-08T14:15:00Z',
      notes: 'High net-worth client seeking 12-month capital value protection agreement.',
      assignedTo: 'Vikram Raju'
    },
    {
      id: 'SV-LEAD-2026-003',
      name: 'K. Venkat Rao',
      mobile: '+91 94402 54321',
      email: 'venkat.k@example.com',
      location: 'Visakhapatnam, AP',
      assetType: 'Land & Property',
      approxValue: 12000000,
      stage: 'Contacted',
      source: 'WhatsApp',
      score: 65,
      createdAt: '2026-08-10T09:00:00Z',
      notes: 'Has commercial plot in Vizag. Needs title document legal check.',
      assignedTo: 'Sreekanth Sharma'
    }
  ],

  // Customer 360 Records
  customers: [
    {
      id: 'SV-CUST-2026-089',
      name: 'Ramesh Varma',
      email: 'ramesh.varma@example.com',
      phone: '+91 98480 12345',
      location: 'Hyderabad, Telangana',
      kycStatus: 'Verified', // Pending | Submitted | Verified | Rejected
      riskRating: 'LOW',
      totalActiveValue: 1500000,
      activeContractsCount: 1,
      createdAt: '2026-08-01',
      panNumber: 'ABCDE1234F',
      aadhaarLast4: '9876',
      bankName: 'HDFC Bank',
      accountNumber: 'XXXXXX54321',
      timeline: [
        { date: '2026-08-01 10:00', event: 'Lead Created from Website Enquiry', user: 'System' },
        { date: '2026-08-02 11:30', event: 'KYC Documents Uploaded (PAN & Aadhaar)', user: 'Ramesh Varma' },
        { date: '2026-08-03 16:00', event: 'KYC Verified by Compliance Officer', user: 'Compliance Officer' },
        { date: '2026-08-04 14:00', event: 'Gold Asset Valuation Completed (300g 24K)', user: 'Senior Valuer' },
        { date: '2026-08-05 10:15', event: 'Legal Agreement Executed SV-CON-2026-001', user: 'Legal Head' }
      ]
    }
  ],

  // Submitted Applications (10-Step Wizard Submissions)
  applications: [
    {
      id: 'SV-APP-2026-00041',
      customerId: 'SV-CUST-2026-089',
      customerName: 'Ramesh Varma',
      mobile: '+91 98480 12345',
      assetType: 'Physical Gold',
      assetDescription: '300 grams 24K Certified Gold Bars',
      estimatedValue: 1500000,
      verifiedValue: 1500000,
      status: 'Activated', // Draft | Submitted | KYC Pending | KYC Verified | Asset Verification | Valuation Pending | Risk Review | Legal Review | Proposal Generated | Customer Accepted | Contract Pending | Activated | Matured | Closed | Rejected
      submittedAt: '2026-08-02T11:00:00Z',
      tenure: '12 Months',
      settlementFrequency: 'Monthly',
      nomineeName: 'Sunita Varma (Spouse)',
      bankDetails: { bank: 'HDFC Bank', ifsc: 'HDFC0001234', accNo: 'XXXXXX54321' }
    }
  ],

  // Executed Contracts
  contracts: [
    {
      id: 'SV-CON-2026-001',
      applicationId: 'SV-APP-2026-00041',
      customerName: 'Ramesh Varma',
      assetType: 'Physical Gold (300g)',
      contractValue: 1500000,
      startDate: '2026-08-05',
      maturityDate: '2027-08-05',
      settlementFrequency: 'Monthly',
      noticePeriodDays: 60,
      agreedMonthlyPayout: 75000, // 5% indicative assumption
      status: 'Active', // Draft | Legal Review | Ready for Signature | Customer Signed | Company Signed | Active | Suspended | Matured | Closed
      lastSettlementDate: '2026-09-05',
      nextSettlementDate: '2026-09-05',
      totalPaidToDate: 0
    }
  ],

  // Scheduled Settlements
  settlements: [
    {
      id: 'SV-SET-2026-901',
      contractId: 'SV-CON-2026-001',
      customerName: 'Ramesh Varma',
      amount: 75000,
      dueDate: '2026-09-05',
      status: 'Scheduled', // Scheduled | Processing | Completed | Failed | Pending Review
      paymentRef: 'TRN-PENDING-0905',
      method: 'Direct Bank NEFT / RTGS'
    }
  ],

  // Gallery Assets (Admin uploadable)
  galleryItems: [
    {
      id: 'gal-1',
      title: 'Corporate Headquarters & Secure Asset Vault',
      category: 'Facilities',
      imageUrl: '/brand/gallery-facilities.svg',
      caption: 'State-of-the-art administrative center equipped with biometric high-security vaulting systems.',
      featured: true,
      published: true,
      createdAt: '2026-08-01'
    },
    {
      id: 'gal-2',
      title: 'Valuation & Legal Advisory Summit',
      category: 'Events',
      imageUrl: '/brand/gallery-events.svg',
      caption: 'Annual legal compliance and asset protection symposium with certified valuation experts.',
      featured: true,
      published: true,
      createdAt: '2026-08-03'
    },
    {
      id: 'gal-3',
      title: 'Value Protection Framework Workshop',
      category: 'Customer Education',
      imageUrl: '/brand/gallery-education.svg',
      caption: 'Interactive workshop helping asset owners understand title clearance and risk mitigation.',
      featured: false,
      published: true,
      createdAt: '2026-08-05'
    }
  ],

  // Insights & Blog CMS Articles
  insights: [
    {
      id: 'art-001',
      title: 'Preserving Asset Value in Dynamic Economic Climates',
      slug: 'preserving-asset-value-dynamic-economic-climates',
      category: 'Value Management',
      author: 'Senior Legal & Risk Panel',
      date: '2026-08-08',
      excerpt: 'Discover how structured value-management frameworks protect tangible assets against inflation while delivering consistent contractual productivity.',
      content: `At Sree Vriddhi, we believe that wealth preservation begins with structural clarity. Unproductive assets—whether idle capital, non-yielding physical gold, or unencumbered real estate—represent latent value. By subjecting these assets to rigorous valuation, legal verification, and compliant contractual structures, asset owners can achieve predictable economic outcomes without exposing their core value to market volatility.`,
      featuredImage: '/brand/insight-visual.svg',
      readTime: '5 min read',
      published: true
    },
    {
      id: 'art-002',
      title: 'Understanding Physical Gold Custody & Verification Standards',
      slug: 'understanding-physical-gold-custody-verification',
      category: 'Gold Awareness',
      author: 'Assay & Custody Bureau',
      date: '2026-08-04',
      excerpt: 'A comprehensive guide to non-destructive XRF assaying, IBJA benchmark valuation, and insured vault custody for gold assets.',
      content: `Physical gold remains one of the most trusted stores of value across generations. However, converting physical gold into a periodic income-generating asset requires absolute clarity in purity testing, title verification, and insurance coverage. Learn about the multi-tiered verification protocols enforced at Sree Vriddhi.`,
      featuredImage: '/brand/hero-visual.svg',
      readTime: '4 min read',
      published: true
    }
  ],

  // Support & Grievance Tickets
  tickets: [
    {
      id: 'SV-TKT-2026-101',
      customerName: 'K. Venkat Rao',
      email: 'venkat.k@example.com',
      phone: '+91 94402 54321',
      category: 'Asset Valuation',
      priority: 'Medium', // Low | Medium | High | Critical
      status: 'Open', // Open | Assigned | In Progress | Waiting for Customer | Resolved | Closed
      subject: 'Query regarding Land Survey Valuation process in Vizag',
      message: 'I would like to know if independent valuation officers can visit my commercial plot on weekends.',
      createdAt: '2026-08-10T11:20:00Z',
      assignedEmployee: 'Valuation Desk'
    }
  ],

  // Audit Logs
  auditLogs: [
    { id: 'aud-1', timestamp: '2026-08-10 12:45', user: 'Admin System', action: 'UPDATED_BRAND_SETTINGS', details: 'Configured WhatsApp direct link & support phone number.' },
    { id: 'aud-2', timestamp: '2026-08-10 11:10', user: 'Compliance Officer', action: 'APPROVED_PRODUCT_STATUS', details: 'Product SV-VALUE-PRIME updated to Compliance Approved.' }
  ]
};

export const SreeVriddhiProvider = ({ children }) => {
  const TEST_MODE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_TEST_MODE === 'true';

  const [store, setStore] = useState(() => {
    if (TEST_MODE) return INITIAL_STATE;
    try {
      const saved = localStorage.getItem('sree_vriddhi_store_v1');
      const st = saved ? JSON.parse(saved) : INITIAL_STATE;
      // Normalize any old SVG brand paths to the uploaded JPEGs for consistent rendering
      if (st && st.brandSettings) {
        ['primaryLogo', 'darkLogo', 'lightLogo', 'logoMark', 'favicon'].forEach((k) => {
          if (st.brandSettings[k] && st.brandSettings[k].endsWith('.svg')) {
            st.brandSettings[k] = st.brandSettings[k].replace('.svg', '.jpeg');
          }
        });
      }
      return st;
    } catch (e) {
      console.error('Failed to load local storage store', e);
      return INITIAL_STATE;
    }
  });

  const [theme, setTheme] = useState('dark'); // 'dark' | 'light' | 'reading'
  // UI language for translations (ISO codes, default 'en')
  const [language, setLanguage] = useState(() => {
    try {
      const s = localStorage.getItem('sree_vriddhi_lang');
      return s || 'en';
    } catch (e) {
      return 'en';
    }
  });

  useEffect(() => {
    if (TEST_MODE) return; // do not persist during test runs
    try {
      localStorage.setItem('sree_vriddhi_store_v1', JSON.stringify(store));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [store]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'reading';
      return 'dark';
    });
  };

  const toggleLanguage = (lang) => {
    if (lang && typeof lang === 'string') {
      setLanguage(lang);
      try { localStorage.setItem('sree_vriddhi_lang', lang); } catch (e) {}
      return;
    }
    setLanguage(prev => {
      const next = prev === 'en' ? 'hi' : prev === 'hi' ? 'te' : 'en';
      try { localStorage.setItem('sree_vriddhi_lang', next); } catch (e) {}
      return next;
    });
  };

  // Helper Actions
  const addLead = (leadData) => {
    const newLead = {
      id: `SV-LEAD-2026-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      stage: 'New',
      source: 'Website Form',
      score: 75,
      assignedTo: 'Unassigned',
      ...leadData
    };
    setStore(prev => ({
      ...prev,
      leads: [newLead, ...prev.leads],
      auditLogs: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          user: 'Public Visitor',
          action: 'NEW_LEAD_SUBMITTED',
          details: `New enquiry lead created for ${newLead.name} (${newLead.assetType})`
        },
        ...prev.auditLogs
      ]
    }));
    return newLead;
  };

  const updateLeadStage = (leadId, newStage) => {
    setStore(prev => ({
      ...prev,
      leads: prev.leads.map(l => (l.id === leadId ? { ...l, stage: newStage } : l)),
      auditLogs: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          user: 'Admin User',
          action: 'LEAD_STAGE_UPDATED',
          details: `Lead ${leadId} moved to stage ${newStage}`
        },
        ...prev.auditLogs
      ]
    }));
  };

  const submitApplication = (appData) => {
    const newApp = {
      id: `SV-APP-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      submittedAt: new Date().toISOString(),
      status: 'Submitted',
      ...appData
    };
    setStore(prev => ({
      ...prev,
      applications: [newApp, ...prev.applications],
      auditLogs: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          user: appData.customerName || 'Customer Portal',
          action: 'APPLICATION_SUBMITTED',
          details: `Submitted application ${newApp.id} for ${newApp.assetType}`
        },
        ...prev.auditLogs
      ]
    }));
    return newApp;
  };

  const updateProduct = (productId, updatedFields) => {
    setStore(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === productId ? { ...p, ...updatedFields, lastUpdated: new Date().toISOString().split('T')[0] } : p)),
      auditLogs: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          user: 'Admin System',
          action: 'PRODUCT_CONFIG_UPDATED',
          details: `Product ${productId} updated (Status/Rate/Tenure modified)`
        },
        ...prev.auditLogs
      ]
    }));
  };

  const addGalleryItem = (item) => {
    const newItem = {
      id: `gal-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      published: true,
      featured: false,
      ...item
    };
    setStore(prev => ({
      ...prev,
      galleryItems: [newItem, ...prev.galleryItems],
      auditLogs: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          user: 'Admin Media Manager',
          action: 'GALLERY_ITEM_ADDED',
          details: `Added new gallery photo/media: ${newItem.title}`
        },
        ...prev.auditLogs
      ]
    }));
  };

  const deleteGalleryItem = (id) => {
    setStore(prev => ({
      ...prev,
      galleryItems: prev.galleryItems.filter(g => g.id !== id)
    }));
  };

  const addTicket = (ticketData) => {
    const newTicket = {
      id: `SV-TKT-2026-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'Open',
      assignedEmployee: 'Support Desk',
      ...ticketData
    };
    setStore(prev => ({
      ...prev,
      tickets: [newTicket, ...prev.tickets],
      auditLogs: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          user: ticketData.customerName || 'Public Grievance Form',
          action: 'TICKET_CREATED',
          details: `Support/Grievance ticket created ${newTicket.id}`
        },
        ...prev.auditLogs
      ]
    }));
    return newTicket;
  };

  const updateBrandSettings = (newSettings) => {
    setStore(prev => ({
      ...prev,
      brandSettings: { ...prev.brandSettings, ...newSettings }
    }));
  };

  return (
    <SreeVriddhiContext.Provider value={{
      ...store,
      theme,
      language,
      toggleTheme,
      toggleLanguage,
      addLead,
      updateLeadStage,
      submitApplication,
      updateProduct,
      addGalleryItem,
      deleteGalleryItem,
      addTicket,
      updateBrandSettings
    }}>
      {children}
    </SreeVriddhiContext.Provider>
  );
};

export const useSreeVriddhi = () => {
  const context = useContext(SreeVriddhiContext);
  if (!context) {
    throw new Error('useSreeVriddhi must be used within a SreeVriddhiProvider');
  }
  return context;
};
