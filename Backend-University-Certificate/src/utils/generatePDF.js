async function generatePDF(Name, EnrollmentNumber, GPA, qrcode) {
  const fs = require("fs");
  const PDFDocument = require("pdfkit");
  const { Base64Encode } = require("base64-stream");

  const doc = new PDFDocument();

  doc.fontSize(18).text(Name, 50, 130);
  doc
    .fontSize(18)
    .text(
      `You have graduated with a GPA of ${GPA}. We wish you a very wonderful future ahead. Thanks for studying with us!`,
      50,
      170
    );
  doc.fontSize(18).text("Name: ", 50, 250);
  doc.fontSize(18).text(Name, 200, 250);
  doc.fontSize(18).text("EnrollmentNumber: ", 50, 280);
  doc.fontSize(18).text(EnrollmentNumber, 200, 280);
  doc.fontSize(18).text("Issual Date: ", 50, 310);
  doc.fontSize(18).text(new Date(), 200, 310);
  if (qrcode != undefined) {
    doc.fontSize(18).text("QR Code:", 50, 370);
    doc.fontSize(18).image(qrcode, 200, 370, {
      fit: [200, 200],
      align: "left",
      valign: "center",
    });
  }

  var finalString = ""; // contains the base64 string
  var stream = doc.pipe(new Base64Encode());

  doc.end(); // will trigger the stream to end

  for await (chunk of stream) {
    finalString += chunk;
  }

  let finalPDF = finalString;
  return finalPDF;
}

module.exports = { generatePDF };
