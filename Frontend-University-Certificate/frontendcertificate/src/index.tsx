import React from "react";
// import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import MetaMaskPage from "./components/MetaMaskPage/MetaMaskPage";
import PdfPage from "./components/PdfPage/PdfPage";
// import DetailsPage from "./components/DetailsPage/DetailsPage";
// import FinalPage from "./components/FinalPage/FinalPage";
// import VerificationPage from "./components/VerificationPage/VerificationPage";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pdfPage" element={<PdfPage />} />
      {/* // 
          // <Route path="/metamask" element={<MetaMaskPage />} />
          // <Route path="/details" element={<DetailsPage />} />
          // <Route path="/final" element={<FinalPage />} />
          // <Route path="/verify" element={<VerificationPage />} /> */}
    </Routes>
  </Router>,
  document.getElementById("root")
);
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<App />} />
//           {/* // <Route path="/pdfPage" element={<PdfPage />} />
//           // <Route path="/metamask" element={<MetaMaskPage />} />
//           // <Route path="/details" element={<DetailsPage />} />
//           // <Route path="/final" element={<FinalPage />} />
//           // <Route path="/verify" element={<VerificationPage />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
