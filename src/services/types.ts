export interface GeneratedContent {
  success: boolean;
  content?: string[];
  error?: string;
}

export interface ContentContext {
  businessName?: string;
  userName?: string;
  date?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  sector?: string;
  existingContent?: string;
  previousDescriptions?: string[];
  [key: string]: any;
}