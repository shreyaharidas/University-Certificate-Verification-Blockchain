import React from 'react';

import generateQRCodePDF from '../../utils/generateQRCodePDF';

const btnStyle={backgroundColor:"#70b502"}

const FinalPage = () => {

    return (
  
    <div className="row m-5">    


            <div>

            

<button className='btn text-white m-5' style={btnStyle} onClick={generateQRCodePDF}>GENERATE FINAL PDF</button>
<p id="trial"></p>
<iframe title="finalPDF" id="finalFrame" height={500} width={500}> </iframe>
<a id="download" download={"final.pdf"} ></a>


</div>

            
    </div>);};

    export default FinalPage;
