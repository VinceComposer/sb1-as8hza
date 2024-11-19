import { jsPDF } from 'jspdf';
import { sections } from '../components/businessPlan/planSections';
import { fields } from '../components/businessPlan/planFields';

export const generatePDF = async (formData: { [key: string]: any }) => {
  const doc = new jsPDF();
  let pageNumber = 1;
  const totalPages = sections.length + 1; // +1 for table of contents

  // Helper function to add header and footer
  const addHeaderFooter = () => {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('CONFIDENTIAL', doc.internal.pageSize.width - 20, 20, { align: 'right' });
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Page ${pageNumber} of ${totalPages}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, { align: 'right' });
  };

  // Cover Page
  doc.setFontSize(40);
  doc.setFont('helvetica', 'bold');
  doc.text('BUSINESS PLAN', 20, 80);

  doc.setFontSize(24);
  doc.text(formData.coverPage?.businessName || 'BUSINESS PLAN', 20, 120);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  if (formData.coverPage?.date) {
    doc.text(`Date Prepared: ${new Date(formData.coverPage.date).toLocaleDateString()}`, 20, 150);
  }

  addHeaderFooter();
  pageNumber++;
  doc.addPage();

  // Table of Contents
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('TABLE OF CONTENTS', 20, 40);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  let yPosition = 60;

  sections.forEach((section, index) => {
    if (section.id !== 'preview') {
      const title = `${index + 1}. ${section.title}`;
      doc.text(title, 20, yPosition);
      doc.text((index + 1).toString(), 190, yPosition);
      yPosition += 15;
    }
  });

  addHeaderFooter();
  pageNumber++;

  // Content Pages
  sections.forEach((section, index) => {
    if (section.id !== 'preview') {
      doc.addPage();
      
      // Section Header
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${section.title}`, 20, 40);

      // Section Content
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      let contentY = 60;

      const sectionFields = fields[section.id] || [];
      sectionFields.forEach(field => {
        const value = formData[section.id]?.[field.id];
        if (value) {
          doc.setFont('helvetica', 'bold');
          doc.text(field.label + ':', 20, contentY);
          contentY += 10;

          doc.setFont('helvetica', 'normal');
          const lines = doc.splitTextToSize(value.toString(), 170);
          lines.forEach((line: string) => {
            if (contentY > 250) {
              doc.addPage();
              contentY = 40;
              pageNumber++;
              addHeaderFooter();
            }
            doc.text(line, 20, contentY);
            contentY += 10;
          });
          contentY += 5;
        }
      });

      addHeaderFooter();
      pageNumber++;
    }
  });

  // Save the PDF
  doc.save(`${formData.coverPage?.businessName || 'Business-Plan'}.pdf`);
};