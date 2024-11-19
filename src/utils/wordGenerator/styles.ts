import { StylesOptions, AlignmentType } from "docx";

export const documentStyles: StylesOptions = {
  paragraphStyles: [
    {
      id: "confidential",
      name: "Confidential Header",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: 24,
        color: "666666"
      },
      paragraph: {
        spacing: { before: 240, after: 240 },
        alignment: AlignmentType.RIGHT
      }
    },
    {
      id: "pageNumber",
      name: "Page Number",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: 20,
        color: "666666"
      },
      paragraph: {
        spacing: { before: 240 },
        alignment: AlignmentType.RIGHT
      }
    },
    {
      id: "heading1",
      name: "Heading 1",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: 32,
        bold: true
      },
      paragraph: {
        spacing: { before: 400, after: 200 }
      }
    },
    {
      id: "normal",
      name: "Normal",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: 24
      },
      paragraph: {
        spacing: { before: 200, after: 200 }
      }
    }
  ]
};