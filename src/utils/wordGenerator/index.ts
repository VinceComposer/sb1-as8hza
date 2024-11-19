import { Document, Paragraph } from "docx";
import { saveAs } from "file-saver";
import { documentStyles } from "./styles";
import { 
  addPageNumber,
  createCoverPage,
  createTableOfContents,
  createContentSections
} from "./sections";

export const generateWordDocument = async (formData: { [key: string]: any }) => {
  try {
    const doc = new Document({
      styles: documentStyles,
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children: [
          // Cover Page
          ...createCoverPage(formData),
          addPageNumber(1, 17),
          new Paragraph({ pageBreakBefore: true }),

          // Table of Contents
          ...createTableOfContents(),
          addPageNumber(2, 17),
          new Paragraph({ pageBreakBefore: true }),

          // Content Sections
          ...createContentSections(formData)
        ]
      }]
    });

    const buffer = await doc.save();
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    
    const fileName = formData.coverPage?.businessName 
      ? `${formData.coverPage.businessName.replace(/[^a-zA-Z0-9]/g, '-')}-Business-Plan.docx`
      : 'Business-Plan.docx';
      
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error details:', error);
    throw new Error('Failed to generate Word document. Please try again.');
  }
};