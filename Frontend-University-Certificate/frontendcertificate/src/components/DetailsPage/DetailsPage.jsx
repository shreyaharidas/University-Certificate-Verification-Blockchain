import React from'react';
import handleDetails from '../../utils/handleDetails';
import { useForm } from 'react-hook-form';
import reroute from '../../utils/reroute';

const btnStyle={backgroundColor:"#70b502"}

   function DetailsPage () { 

     
    
    var letter=localStorage.getItem("letterId");
    var hash=localStorage.getItem('filehash');
    
    console.log(letter);
    
    
    const {register, handleSubmit}=useForm({
         defaultValues:{
            letterInfo:letter,
            IPFSInfo: hash
        }
  })
     
  
    return(<div className='m-5'>



 <form id="detailsForm" name="Relieving_Letter_Details" onSubmit={handleDetails}>  
    <fieldset>
   
    <legend> Letter Information   </legend>
    
    <p>
        <label className="info"  >IPFSHash:</label>
        <input size="60" name="IPFSInfo" type="text" {...register("IPFSInfo", { required: true })}  placeholder="Enter the IPFS Hash" />
    </p>

    </fieldset>
    <div>
        <input type="submit" value="Click to Enter to Blockchain" className='btn text-white m-5' style={btnStyle} ></input>
    </div>
    
</form > 

<p id="gas" className='m-5'></p>
<p id= "display" className='m-5'></p>
<p id="hash" className='m-5'></p>
<p id='balance' className='m-5'></p>

<p id="finalPDF"></p>



</div>

);};

export default DetailsPage;


//<button id="genButton" type="submit" value="Click to Generate Final PDF" className="btn btn-primary m-5" onClick={reroute}>Click to Generate Final PDF</button>