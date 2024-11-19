import { Paragraph, TextRun, AlignmentType, TabStopType, TabStopPosition } from "docx";
import { sections } from "../../components/businessPlan/planSections";
import { fields } from "../../components/businessPlan/planFields";

export const addConfidentialHeader = () => {
  return new Paragraph({
    style: "confidential",
    children: [new TextRun({ text: "CONFIDENTIAL" })]
  });
};

export const addPageNumber = (currentPage: number, totalPages: number) => {
  return new Paragraph({
    style: "pageNumber",
    children: [new TextRun({ text: `Page ${currentPage} of ${totalPages}` })]
  });
};

export const createCoverPage = (formData: { [key: string]: any }) => {
  const coverPage = formData.coverPage || {};
  
  return [
    addConfidentialHeader(),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 2400 },
      children: [
        new TextRun({
          text: coverPage.businessName || "BUSINESS PLAN",
          bold: true,
          size: 48
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 400 },
      children: [
        new TextRun({
          text: `Prepared by: ${coverPage.userName || ""}`,
          size: 28
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 300 },
      children: [
        new TextRun({
          text: coverPage.date ? 
            new Date(coverPage.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : "",
          size: 24
        })
      ]
    })
  ];
};

export const createTableOfContents = () => {
  return [
    addConfidentialHeader(),
    new Paragraph({
      style: "heading1",
      children: [new TextRun({ text: "TABLE OF CONTENTS" })]
    }),
    ...sections
      .filter(section => section.id !== 'preview')
      .map((section, index) => 
        new Paragraph({
          spacing: { before: 300 },
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          children: [
            new TextRun({
              text: section.title,
              size: 24
            }),
            new TextRun({
              text: `\t${index + 1}`,
              size: 24
            })
          ]
        })
      )
  ];
};

export const createContentSections = (formData: { [key: string]: any }) => {
  return sections
    .filter(section => section.id !== 'preview' && section.id !== 'tableOfContents')
    .flatMap(section => {
      const sectionFields = fields[section.id] || [];
      const sectionData = formData[section.id] || {};
      
      const sectionContent = [
        addConfidentialHeader(),
        new Paragraph({
          style: "heading1",
          children: [new TextRun({ text: section.title })]
        })
      ];

      if (hasContent(sectionData)) {
        sectionContent.push(
          ...sectionFields.flatMap(field => {
            const value = sectionData[field.id];
            if (!value) return [];

            return [
              new Paragraph({
                style: "normal",
                children: [new TextRun({ text: value.toString() })]
              })
            ];
          })
        );
      }

      return sectionContent;
    });
};

export const hasContent = (sectionData: { [key: string]: any } = {}) => {
  return Object.values(sectionData).some(value => 
    value !== null && value !== undefined && value !== ''
  );
};