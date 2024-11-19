import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import { sections } from "../components/businessPlan/planSections";
import { fields } from "../components/businessPlan/planFields";

export const generateWordDocument = (formData: any) => {
  try {
    const doc = new Document({
      sections: [{
        properties: {},
        children: generateDocumentContent(formData)
      }]
    });

    // Generate and save document
    doc.save("business-plan.docx", {
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    }).then((blob) => {
      saveAs(blob, "business-plan.docx");
    });
  } catch (error) {
    console.error("Error generating Word document:", error);
    throw error;
  }
};

const generateDocumentContent = (formData: any) => {
  const children: any[] = [];

  // Add confidential header
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({
          text: "CONFIDENTIAL",
          size: 24,
          bold: true
        })
      ]
    })
  );

  // Add title page
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        before: 2400,
        after: 400
      },
      children: [
        new TextRun({
          text: "BUSINESS PLAN",
          size: 48,
          bold: true
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        before: 400,
        after: 400
      },
      children: [
        new TextRun({
          text: formData.coverPage?.businessName || "COMPANY NAME",
          size: 36,
          bold: true
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        before: 800
      },
      children: [
        new TextRun({
          text: `Date Prepared: ${formData.coverPage?.date || new Date().toLocaleDateString()}`,
          size: 24
        })
      ]
    }),
    new Paragraph({
      children: [new PageBreak()]
    })
  );

  // Add table of contents
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: {
        before: 400,
        after: 400
      },
      children: [
        new TextRun({
          text: "TABLE OF CONTENTS",
          size: 32,
          bold: true
        })
      ]
    })
  );

  const tocTable = new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE
    },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE }
    },
    rows: sections
      .filter(section => section.id !== 'preview')
      .map((section, index) => new TableRow({
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            },
            children: [new Paragraph({
              children: [new TextRun({ text: section.title, size: 24 })]
            })]
          }),
          new TableCell({
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            },
            width: {
              size: 10,
              type: WidthType.PERCENTAGE
            },
            children: [new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: (index + 1).toString(), size: 24 })]
            })]
          })
        ]
      }))
  });

  children.push(tocTable);
  children.push(new Paragraph({ children: [new PageBreak()] }));

  // Add sections content
  sections
    .filter(section => section.id !== 'preview')
    .forEach(section => {
      const sectionFields = fields[section.id] || [];
      const sectionData = formData[section.id] || {};
      const hasContent = sectionFields.some(field => sectionData[field.id]);

      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: {
            before: 400,
            after: 400
          },
          children: [
            new TextRun({
              text: section.title,
              size: 32,
              bold: true
            })
          ]
        })
      );

      if (hasContent) {
        sectionFields.forEach(field => {
          const value = sectionData[field.id];
          if (value) {
            children.push(
              new Paragraph({
                spacing: {
                  before: 200,
                  after: 200
                },
                children: [
                  new TextRun({
                    text: field.label + ": ",
                    size: 24,
                    bold: true
                  }),
                  new TextRun({
                    text: value.toString(),
                    size: 24
                  })
                ]
              })
            );
          }
        });
      }

      children.push(new Paragraph({ children: [new PageBreak()] }));
    });

  return children;
};