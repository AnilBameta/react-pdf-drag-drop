import { PDFDocument, rgb } from "pdf-lib";

export async function downloadPdf(pdfFile, field) {
  const buffer = await pdfFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer);

  const page = pdfDoc.getPages()[0];

  page.drawText(field.value, {
    x: field.x,
    y: page.getHeight() - field.y,
    size: 12,
    color: rgb(0, 0, 0),
  });

  const bytes = await pdfDoc.save();
  const blob = new Blob([bytes], { type: "application/pdf" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "updated.pdf";
  link.click();
}
