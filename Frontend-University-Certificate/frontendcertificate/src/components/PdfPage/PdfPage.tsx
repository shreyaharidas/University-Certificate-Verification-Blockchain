import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import addFile from "../../api/addFile";
import generatePDF from "../../api/generatePDF";

export type PDFDetails = {
  Name: string;
  EnrollmentNumber: number;
  GPA: number;
};

const PdfPage = () => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [srcURL, setSrcURL] = useState<string>("");
  const [pdf, setPdf] = useState<string>("");

  const convertBase64toPDFBlob = async (base64PDF: string) => {
    const pdfstr = await fetch(base64PDF);
    const blobFromFetch = await pdfstr.blob();

    let blob = new Blob([blobFromFetch], { type: "application/pdf" });

    let blobUrl = URL.createObjectURL(blob);
    setSrcURL(blobUrl);
  };

  const genPDF = async () => {
    let studentData = JSON.parse(
      localStorage?.getItem("studentData") ?? ""
    ) as PDFDetails;
    let pdfbase64 = await generatePDF(studentData);
    convertBase64toPDFBlob("data:application/pdf;base64," + pdfbase64);
    setPdf(pdfbase64);
  };

  useEffect(() => {
    genPDF();
  }, []);

  const uploadPDF = async () => {
    await addFile(pdf);
  };

  return (
    <Modal show={true} height="500px" width="200px">
      <ModalHeader> Here is your certificate </ModalHeader>
      <ModalBody>
        <iframe src={srcURL} title={"University Certificate"} ref={ref} />
      </ModalBody>
      <ModalFooter>
        <Button type="submit" variant="primary" onClick={uploadPDF}>
          Upload to Blockchain
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PdfPage;
