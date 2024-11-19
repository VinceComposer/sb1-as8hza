import { BusinessPlanSection } from '../../types/businessPlan';

export const sections: BusinessPlanSection[] = [
  {
    id: 'coverPage',
    title: 'Cover Page',
    description: 'The Cover Page captures essential details about your business, including the business name, owner\'s name, and a brief description of your business. It provides the first impression of your plan.',
    objectives: [
      'Provide the official business name',
      'Describe the nature and purpose of your business',
      'Explain how your product or service benefits users'
    ]
  },
  {
    id: 'tableOfContents',
    title: 'Table of Contents',
    description: 'The Table of Contents provides a clear roadmap of your business plan, making it easy for readers to navigate through different sections. It helps stakeholders quickly locate specific information and understand the overall structure of your plan.',
    objectives: [
      'Present a clear overview of the business plan structure',
      'Enable quick navigation to specific sections',
      'Demonstrate professional organization and thoroughness'
    ]
  },
  {
    id: 'executiveSummary',
    title: 'Executive Summary',
    description: 'The Executive Summary is a high-level overview of your business, summarizing its purpose, target market, unique selling proposition, and goals. It is often the first section potential investors or stakeholders will read.',
    objectives: [
      'Summarize the key points of your business',
      'Highlight what makes your business unique',
      'State your business\'s goals and objectives'
    ]
  },
  {
    id: 'companyDescription',
    title: 'Company Description',
    description: 'The Company Description provides more detailed information about your company\'s background, history, and structure. This section explains why your business exists and how it operates.',
    objectives: [
      'Provide background information on your company',
      'Describe your business\'s legal structure and ownership',
      'Highlight the unique aspects of your company\'s history'
    ]
  },
  {
    id: 'managementTeam',
    title: 'Management Team',
    description: 'The Management Team section provides details on the people running your business. This section highlights the experience, skills, and roles of each key team member.',
    objectives: [
      'Introduce key members of your team',
      'Highlight their qualifications and experience',
      'Describe the roles they play in your business'
    ]
  },
  {
    id: 'marketAnalysis',
    title: 'Market Analysis',
    description: 'The Market Analysis section assesses your industry, target market, and competitors. It demonstrates your understanding of the market\'s needs, trends, and competitive landscape.',
    objectives: [
      'Define your industry and describe its characteristics',
      'Identify your target audience and customer needs',
      'Analyse your competition and any barriers to entry'
    ]
  },
  {
    id: 'businessModel',
    title: 'Business Model',
    description: 'The Business Model section outlines how your business generates revenue and delivers value to your customers. It details your business strategy, pricing, and revenue streams.',
    objectives: [
      'Explain your revenue model',
      'Define your pricing strategy',
      'Identify key partnerships or distribution channels'
    ]
  },
  {
    id: 'productLine',
    title: 'Products and Services',
    description: 'The Products and Services section describes your offerings in detail. It explains the features, benefits, and unique aspects of what you provide to customers.',
    objectives: [
      'List your products or services',
      'Highlight key features and benefits',
      'Explain how your offerings meet customer needs'
    ]
  },
  {
    id: 'marketingStrategy',
    title: 'Marketing Strategy',
    description: 'This section outlines your plan to reach your target audience, including promotional channels and branding efforts.',
    objectives: [
      'Identify marketing strategies and channels',
      'Explain your brand positioning and messaging',
      'Outline your promotional activities'
    ]
  },
  {
    id: 'salesStrategy',
    title: 'Sales Strategy',
    description: 'The Sales Strategy section explains how you will sell your product, including your sales process, pricing, and projections.',
    objectives: [
      'Describe your sales process and approach',
      'Outline your pricing strategy',
      'Provide a sales forecast or projection'
    ]
  },
  {
    id: 'operationsOverview',
    title: 'Operations Overview',
    description: 'The Operations Overview details your daily business activities, production process, and any key resources or suppliers.',
    objectives: [
      'Describe daily operations and processes',
      'Identify resources needed for production',
      'Outline your supply chain or production plan'
    ]
  },
  {
    id: 'financialProjections',
    title: 'Financial Projections',
    description: 'The Financial Projections section provides estimates of revenue, costs, and profitability for the next few years.',
    objectives: [
      'Provide revenue and cost projections',
      'Outline startup costs and funding needs',
      'Show profitability timelines'
    ]
  },
  {
    id: 'riskAnalysis',
    title: 'Risk Analysis',
    description: 'The Risk Analysis section identifies potential risks your business might face and the strategies you have in place to mitigate them.',
    objectives: [
      'Identify major risks to your business',
      'Describe risk management strategies',
      'Outline contingency plans for unexpected situations'
    ]
  },
  {
    id: 'growthPlan',
    title: 'Growth Plan',
    description: 'The Growth Plan outlines your strategy for scaling your business, including key milestones and long-term goals.',
    objectives: [
      'Define growth goals and timelines',
      'Identify key milestones for expansion',
      'Describe strategies for scaling operations and revenue'
    ]
  },
  {
    id: 'conclusion',
    title: 'Conclusion',
    description: 'The Conclusion summarizes your business plan, reinforcing your mission, vision, and the viability of your strategy.',
    objectives: [
      'Reiterate your business\'s purpose and potential',
      'Emphasize the key strengths of your plan',
      'Leave a final positive impression for readers'
    ]
  },
  {
    id: 'appendix',
    title: 'Appendix',
    description: 'The Appendix provides additional documents, data, or resources that support your business plan, such as charts, resumes, or legal documents.',
    objectives: [
      'Include any supporting documents or supplementary information',
      'Organize additional data to enhance plan credibility',
      'Provide references and supporting materials'
    ]
  },
  {
    id: 'preview',
    title: 'Preview',
    description: 'Preview your complete business plan in a formatted document style. Review all sections together before finalizing.',
    objectives: [
      'Review the complete business plan',
      'Ensure consistency across all sections',
      'Prepare for export or presentation'
    ]
  }
];