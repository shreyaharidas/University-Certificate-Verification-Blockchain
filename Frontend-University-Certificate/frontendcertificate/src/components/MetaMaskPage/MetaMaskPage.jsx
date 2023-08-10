import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connectToMetaMask} from "../../utils/ConToMM.js";
import { reroute } from "../../utils/ConToMM.js";



const btnStyle={backgroundColor:"#70b502"}

const MetaMaskPage = () => {

    return (
  
    <div className="row">    
     
            <div className="col m-5" id="col-1"><button id="connect to metamask"  style={btnStyle}  className="btn text-white m-5" onClick={connectToMetaMask}> Connect to MetaMask</button>
            <p id="address"></p>
            </div>

            <div className="col" id="col-2"></div>    

            <div className="col m-5" id="col-3"><button id ="Details Page" style={btnStyle}  className="btn text-white m-5" onClick={reroute}>Click to fill in Details</button></div> 
    
    </div>);};

    export default MetaMaskPage;