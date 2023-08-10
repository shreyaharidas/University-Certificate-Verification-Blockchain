const ipfsAPI = require("ipfs-api");
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const Buffer = require("buffer");

var bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const PDFDocument = require("pdfkit");
const { Base64Encode } = require("base64-stream");

const upload = require("./utils/uploadFile.js");
const pdf = require("./utils/generatePDF.js");
const qr = require("./utils/generateQRCode.js");
const { read } = require("./database/read");

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/getStudents", async (req, res) => {
  limit = req.query.limit;
  offset = req.query.offset;
  CertiStatus = req.query.CS;
  GPA = req.query.GPA;
  searchTerm = req.query.searchTerm;

  const studentData = await read(limit, offset, CertiStatus, GPA, searchTerm);

  res.status(200).send(studentData);
});

app.post("/addfile", async function (req, res) {
  let pdfBase64 = req.body.pdf;
  const filehash = await upload.uploadFile(pdfBase64);

  res.status(200).send({ filehash });
});
//Getting the uploaded file via hash code.

// app.get("/getfile", function (req, res) {
//   //This hash is returned hash of addFile router.
//   const validCID = file;

//   ipfs.files.get(validCID, function (err, files) {
//     files.forEach((files) => {});
//   });
// });

app.post("/generatePdf", async function (req, res) {
  // endpoint used for generating sample pdf, generating final pdf with QR code

  res.set({
    "Content-Type": "application/text",
    "Access-Control-Allow-Origin": "*",
  });

  var Name = req.body.data.Name;
  var EnrollmentNumber = req.body.data.EnrollmentNumber;
  var GPA = req.body.data.GPA;
  var ipfs = req.body.data.fileHash;
  var txnHash = req.body.data.transaction;

  if (ipfs != undefined)
    var qrcode = await qr.generateQRCode(
      ipfs,
      Name,
      EnrollmentNumber,
      GPA,
      txnHash
    );

  var finalstringpdf = await pdf.generatePDF(
    Name,
    EnrollmentNumber,
    GPA,
    qrcode
  );

  res.send(finalstringpdf);
});

app.listen(3000, () => console.log("App listening on port 3000!"));
