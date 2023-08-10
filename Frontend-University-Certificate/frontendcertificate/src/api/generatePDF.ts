import { PDFDetails } from "../types";
import http from "./apibase";

export type data = PDFDetails;

const generatePDF = (data: data) => {
  return http.post(`/generatePDF`, { data }).then((data) => data.data);
};

export default generatePDF;
