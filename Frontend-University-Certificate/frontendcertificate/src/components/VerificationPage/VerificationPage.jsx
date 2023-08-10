import React from 'react';

import { handleVerification } from '../../utils/handleDetails';
import QRCodeScanner from '../../utils/QRCodeScanner';


const btnStyle={backgroundColor:"#70b502"}

const VerificationPage = () => {

    return(<div className='m-5' id="main-div">
        <button id="start" className='btn text-white' style={btnStyle}  onClick={QRCodeScanner}>Start Scanning QR Code</button>
<p id="scannerP"></p>


        <form id="verificationForm" name="Verification_Details"  onSubmit={handleVerification}>  
           <fieldset>
          
           <legend> IPFS Information  </legend>
           
           <p>
               <label className="info"  >IPFSHash:</label>
               <input id="ipfshash" size="60" name="IPFSInfo" type="text" placeholder="Enter the IPFS Hash" />
           </p>
       
           </fieldset>
           <div>
               <input type="submit" className='btn text-white' style={btnStyle} value="Click to verify with Blockchain" ></input>
           </div>
           
       </form > 
       
       <p id= "display" className='m-5'></p>
       <a id="link" className='m-5'></a>

       <p id="hash" className='m-5'></p>
       
       </div>
       
       );};

    export default VerificationPage;

    