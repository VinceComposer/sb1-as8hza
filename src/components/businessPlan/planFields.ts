import { BusinessPlanField } from '../../types/businessPlan';

export const fields: { [key: string]: BusinessPlanField[] } = {
  coverPage: [
    {
      id: 'businessName',
      label: 'Business Name',
      type: 'text',
      tooltip: 'Enter the official name of your business. This name should reflect your brand identity and be easy for customers to remember.',
      placeholder: 'eg. ABC Innovations Ltd',
      prepopulate: false
    },
    {
      id: 'sector',
      label: 'Sector or Industry',
      type: 'text',
      tooltip: 'Enter the main sector or industry your business operates in. This helps contextualize your business plan for readers.',
      placeholder: 'eg. Technology, Healthcare, Retail, Manufacturing',
      prepopulate: false
    },
    {
      id: 'userName',
      label: 'User\'s Name',
      type: 'text',
      tooltip: 'Enter your full name as the business owner or primary contact person for this plan.',
      placeholder: 'eg. John Smith',
      prepopulate: false
    },
    {
      id: 'email',
      label: 'Contact Information: Email',
      type: 'text',
      tooltip: 'Enter your personal or business main email address',
      placeholder: 'eg. contact@abcinnovations.com',
      prepopulate: false
    },
    {
      id: 'phone',
      label: 'Contact Information: Phone',
      type: 'text',
      tooltip: 'Enter your personal or business main phone number',
      placeholder: 'eg. +44 123 456 7890',
      prepopulate: false
    },
    {
      id: 'address',
      label: 'Business Location',
      type: 'text',
      tooltip: 'Enter your business main address or location',
      placeholder: 'eg. 1234 Innovation Drive, Edinburgh, Scotland',
      prepopulate: false
    },
    {
      id: 'website',
      label: 'Website',
      type: 'text',
      tooltip: 'Enter your business Website URL',
      placeholder: 'eg. www.abcinnovations.com',
      prepopulate: false
    },
    {
      id: 'date',
      label: 'Business Plan Creation Date',
      type: 'date',
      tooltip: 'Select the date when you are creating this business plan.',
      placeholder: 'eg. 31 October 2024',
      prepopulate: false
    },
    {
      id: 'briefDescription',
      label: 'Brief Description of Your Business',
      type: 'textarea',
      tooltip: 'Provide one or two paragraphs with a concise overview of your business. Describe the main problem your business solves, your solution, and why your offer is of value to customers.',
      placeholder: 'eg. ABC Innovations Ltd is a tech startup focused on developing AI-driven software solutions for small businesses. Our flagship product simplifies accounting, saving time and reducing errors for small business owners.',
      prepopulate: false
    },
    {
      id: 'howItWorks',
      label: 'How It Works',
      type: 'textarea',
      tooltip: 'Explain how your product or service works. Describe the key features and how they help solve a specific problem for your target customers.',
      placeholder: 'eg. Our AI-powered software automatically categorizes expenses, generates financial reports, and provides insights, allowing small businesses to manage their finances effortlessly.',
      prepopulate: false
    }
  ],
  tableOfContents: [],
  executiveSummary: [
    {
      id: 'missionStatement',
      label: 'Mission Statement',
      type: 'textarea',
      tooltip: 'Summarize your business\'s mission in a single paragraph. Explain the core purpose of your business and the impact you want to make.',
      placeholder: 'eg. Our mission is to empower small businesses by providing affordable, accessible financial management tools, enabling them to thrive in a competitive market.',
      prepopulate: false
    },
    {
      id: 'uniqueValueProposition',
      label: 'Unique Value Proposition',
      type: 'textarea',
      tooltip: 'Describe what makes your business stand out from competitors. Highlight the features or services that give you an advantage.',
      placeholder: 'eg. ABC Innovations provides the only AI accounting software designed exclusively for non-finance professionals, making it easy for small business owners to manage their finances without prior experience.',
      prepopulate: false
    },
    {
      id: 'goalsObjectives',
      label: 'Goals and Objectives',
      type: 'textarea',
      tooltip: 'List 3-5 key goals for your business in the short and long term. Specify what you aim to achieve and how you will measure success.',
      placeholder: 'eg. Short-term goals: Achieve 500 subscribers within the first year. Long-term goals: Expand to two additional countries by 2026.',
      prepopulate: false
    }
  ],
  companyDescription: [
    {
      id: 'companyHistory',
      label: 'Company History',
      type: 'textarea',
      tooltip: 'Provide a short history of your business and the founders\' professional background. Mention when it was founded, any significant moments, and major milestones.',
      placeholder: 'eg. Founded in 2022, ABC Innovations began as a project to automate accounting tasks for small business owners. Co-founders Jane Doe and John Smith bring 20 years of combined experience in finance and software engineering.',
      prepopulate: false
    },
    {
      id: 'businessStructure',
      label: 'Business Structure',
      type: 'text',
      tooltip: 'Specify the legal structure of your business (e.g., LLC, Sole Proprietorship, Corporation).',
      placeholder: 'eg. Limited Liability Company (LLC)',
      prepopulate: false
    },
    {
      id: 'ownershipInfo',
      label: 'Ownership Information',
      type: 'textarea',
      tooltip: 'List the business\'s owners or major stakeholders. Include the percentage of ownership if applicable.',
      placeholder: 'eg. Jane Doe (60%) and John Smith (40%)',
      prepopulate: false
    }
  ],
  managementTeam: [
    {
      id: 'teamMembers',
      label: 'Team Member Names + Roles + Skills',
      type: 'textarea',
      tooltip: '1. Enter the names of each team member 2. Specify the primary role or responsibility of this team member and 3. Summarize the relevant qualifications, experience, and skills of this team member.',
      placeholder: 'eg. Jane Doe, CEO - Experienced financial analyst with 15 years in the tech industry.',
      prepopulate: false
    }
  ],
  marketAnalysis: [
    {
      id: 'industryOverview',
      label: 'Industry Overview',
      type: 'textarea',
      tooltip: 'Describe the industry in which your business operates. Highlight trends, size, and any relevant economic factors.',
      placeholder: 'eg. The accounting software industry is growing due to the increasing adoption of digital tools among small businesses.',
      prepopulate: false
    },
    {
      id: 'targetMarket',
      label: 'Target Market',
      type: 'textarea',
      tooltip: 'Specify your ideal customers, including demographics, location, and needs.',
      placeholder: 'eg. Small business owners aged 25-45, primarily based in the UK, who seek easy-to-use financial tools.',
      prepopulate: false
    },
    {
      id: 'marketNeeds',
      label: 'Market Needs',
      type: 'textarea',
      tooltip: 'Describe the primary needs of your target market and how your business meets them.',
      placeholder: 'eg. Business owners need user-friendly software to manage finances without hiring an accountant.',
      prepopulate: false
    },
    {
      id: 'competitiveAnalysis',
      label: 'Competitive Analysis',
      type: 'textarea',
      tooltip: 'Analyse your main competitors, their strengths, and weaknesses, and compare them to your business.',
      placeholder: 'eg. Competitors like QuickBooks offer similar features but are more expensive and complex for non-finance professionals.',
      prepopulate: false
    }
  ],
  businessModel: [
    {
      id: 'revenueModel',
      label: 'Revenue Model',
      type: 'textarea',
      tooltip: 'Explain how your business generates income (e.g., product sales, services, subscriptions).',
      placeholder: 'eg. Our revenue comes from a mix of monthly subscription fees for premium features, one-time purchases for digital goods, and affiliate commissions on partnered products.',
      prepopulate: false
    },
    {
      id: 'pricingStrategy',
      label: 'Pricing Strategy',
      type: 'textarea',
      tooltip: 'Describe how you determine pricing for your products or services.',
      placeholder: 'eg. Pricing is based on market research and competitor analysis, with a goal to remain affordable while covering costs. The subscription model allows for tiered pricing, providing different features at varied price points.',
      prepopulate: false
    },
    {
      id: 'keyPartners',
      label: 'Key Partners',
      type: 'textarea',
      tooltip: 'List any key partners or suppliers involved in your business.',
      placeholder: 'eg. Our key partners include a logistics company for fast delivery, a software vendor for tech support, and local suppliers for ethically sourced materials.',
      prepopulate: false
    }
  ],
  productLine: [
    {
      id: 'productServiceOfferings',
      label: 'Product/Service Offerings',
      type: 'textarea',
      tooltip: 'Describe the products or services you offer, including specific features.',
      placeholder: 'eg. An AI-powered accounting software with automatic expense categorization and tax calculations.',
      prepopulate: false
    },
    {
      id: 'uniqueFeatures',
      label: 'Unique Features',
      type: 'textarea',
      tooltip: 'Explain what makes your product unique or innovative.',
      placeholder: 'eg. First software in the UK that includes built-in guidance for tax deductions.',
      prepopulate: false
    },
    {
      id: 'futureProductPlans',
      label: 'Future Product Plans',
      type: 'textarea',
      tooltip: 'Outline any future products or improvements you plan to make.',
      placeholder: 'eg. We plan to add payroll management features in 2025.',
      prepopulate: false
    }
  ],
  marketingStrategy: [
    {
      id: 'marketingChannels',
      label: 'Marketing Channels',
      type: 'textarea',
      tooltip: 'List the channels you will use to reach your audience (e.g., social media, email, partnerships).',
      placeholder: 'eg. Social media ads, partnerships with small business organizations, email marketing.',
      prepopulate: false
    },
    {
      id: 'brandPositioning',
      label: 'Brand Positioning',
      type: 'textarea',
      tooltip: 'Describe how you want your brand to be perceived by customers.',
      placeholder: 'eg. Trusted, user-friendly software for small business owners.',
      prepopulate: false
    },
    {
      id: 'promotionalActivities',
      label: 'Promotional Activities',
      type: 'textarea',
      tooltip: 'List your promotional efforts to increase brand awareness.',
      placeholder: 'eg. Launching a referral program and hosting free webinars on small business accounting.',
      prepopulate: false
    }
  ],
  salesStrategy: [
    {
      id: 'salesProcess',
      label: 'Sales Process',
      type: 'textarea',
      tooltip: 'Describe how you will engage, convert, and retain customers.',
      placeholder: 'eg. We offer a free trial and support onboarding for new users.',
      prepopulate: false
    },
    {
      id: 'salesPricing',
      label: 'Pricing Strategy',
      type: 'textarea',
      tooltip: 'Explain how you price your product and why.',
      placeholder: 'eg. Pricing is competitive to attract small business owners while maintaining profitability.',
      prepopulate: false
    },
    {
      id: 'salesProjections',
      label: 'Sales Projections',
      type: 'textarea',
      tooltip: 'Provide estimated sales figures for the next 1-3 years.',
      placeholder: 'eg. Expecting 500 subscriptions in the first year, 1,200 in the second year.',
      prepopulate: false
    }
  ],
  operationsOverview: [
    {
      id: 'operationalProcesses',
      label: 'Operational Processes',
      type: 'textarea',
      tooltip: 'Describe your daily operations, including customer service, production, and logistics.',
      placeholder: 'eg. Daily data backup, customer support, and regular updates to the software.',
      prepopulate: false
    },
    {
      id: 'keyResources',
      label: 'Key Resources',
      type: 'textarea',
      tooltip: 'List essential resources such as technology, team members, or equipment.',
      placeholder: 'eg. Cloud servers, AI software development kits, and support team.',
      prepopulate: false
    },
    {
      id: 'supplyChain',
      label: 'Supply Chain',
      type: 'textarea',
      tooltip: 'Describe your supply chain if you have one, or outline your service delivery model.',
      placeholder: 'eg. Service delivery through our online platform, with secure cloud storage.',
      prepopulate: false
    }
  ],
  financialProjections: [
    {
      id: 'revenueProjections',
      label: 'Revenue Projections',
      type: 'textarea',
      tooltip: 'Estimate your expected revenue for the next 3 years.',
      placeholder: 'eg. Year 1: £100,000; Year 2: £250,000; Year 3: £400,000.',
      prepopulate: false
    },
    {
      id: 'costProjections',
      label: 'Cost Projections',
      type: 'textarea',
      tooltip: 'Estimate key expenses for the next 3 years.',
      placeholder: 'eg. Year 1: £60,000; Year 2: £150,000; Year 3: £200,000.',
      prepopulate: false
    },
    {
      id: 'fundingNeeds',
      label: 'Funding Needs',
      type: 'textarea',
      tooltip: 'Specify the amount of funding needed and how it will be used.',
      placeholder: 'eg. Seeking £50,000 for marketing and product development.',
      prepopulate: false
    },
    {
      id: 'profitabilityAnalysis',
      label: 'Profitability Analysis',
      type: 'textarea',
      tooltip: 'Analyse when your business is expected to become profitable based on your projections.',
      placeholder: 'eg. Based on our financial projections, we expect to break even within 18 months of launch, with profitability anticipated in Year 2 as our customer base grows and operational costs stabilize.',
      prepopulate: false
    }
  ],
  riskAnalysis: [
    {
      id: 'potentialRisks',
      label: 'Potential Risks',
      type: 'textarea',
      tooltip: 'List potential risks, such as market competition, regulatory issues, or financial challenges.',
      placeholder: 'eg. Increased competition from established software companies, regulatory changes affecting financial data storage.',
      prepopulate: false
    },
    {
      id: 'riskMitigation',
      label: 'Risk Mitigation Strategies',
      type: 'textarea',
      tooltip: 'Describe how you plan to reduce or manage these risks.',
      placeholder: 'eg. Continued innovation to stay ahead of competitors and compliance audits to meet regulatory standards.',
      prepopulate: false
    },
    {
      id: 'contingencyPlans',
      label: 'Contingency Plans',
      type: 'textarea',
      tooltip: 'Outline your backup plans for each risk, if possible.',
      placeholder: 'eg. If regulations change, we have partnerships with legal consultants to ensure compliance quickly.',
      prepopulate: false
    }
  ],
  growthPlan: [
    {
      id: 'growthOpportunities',
      label: 'Growth Opportunities',
      type: 'textarea',
      tooltip: 'Identify areas where your business can expand, such as new markets or product lines.',
      placeholder: 'eg. Our business has identified several growth opportunities, including expanding into international markets, launching a new product line that targets eco-conscious consumers.',
      prepopulate: false
    },
    {
      id: 'expansionStrategies',
      label: 'Expansion Strategies',
      type: 'textarea',
      tooltip: 'Outline how you plan to achieve growth, including marketing and operational strategies.',
      placeholder: 'eg. To achieve growth, we plan to implement a multi-channel marketing strategy, utilizing social media, influencer partnerships, and targeted online advertising.',
      prepopulate: false
    },
    {
      id: 'growthGoals',
      label: 'Growth Goals',
      type: 'textarea',
      tooltip: 'Specify your growth objectives, such as expanding customer base or entering new markets.',
      placeholder: 'eg. To increase user base by 50% annually and expand into EU markets by Year 3.',
      prepopulate: false
    }
  ],
  conclusion: [
    {
      id: 'summaryStatement',
      label: 'Summary Statement',
      type: 'textarea',
      tooltip: 'Summarize your business plan, focusing on key strengths and the value your business offers.',
      placeholder: 'eg. Our innovative software offers small businesses an affordable, user-friendly accounting solution with room to grow alongside emerging technology trends.',
      prepopulate: false
    }
  ],
  appendix: [
    {
      id: 'additionalDocuments',
      label: 'Additional Documents',
      type: 'file',
      tooltip: 'Upload any files or resources that support your business plan, such as financial spreadsheets or market research data.',
      prepopulate: false
    },
    {
      id: 'businessPlanCanvas',
      label: 'Business Plan Canvas',
      type: 'file',
      tooltip: 'Upload your Business Plan Canvas in a PDF format',
      prepopulate: false
    },
    {
      id: 'additionalResources',
      label: 'Additional Resources',
      type: 'textarea',
      tooltip: 'List any extra resources or references, such as links to industry articles or studies.',
      placeholder: 'eg. Link to market analysis study, industry trend reports, or governmental business statistics.',
      prepopulate: false
    }
  ]
};