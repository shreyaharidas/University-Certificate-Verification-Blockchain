
import Web3 from "web3";


import reroute from './../utils/reroute'



   async function fetchJSON () {
    try {
        let res = await fetch("myContractBuild.json",
        {
         headers : { 
           'Content-Type': 'application/json',
           'Accept': 'application/json'
          }
   
       });
        let json = res.json();
        return json;
   } catch (error) {
       console.log(error);
 }
}

async function loadABI(){

    let ContractArtifact = await fetchJSON();
    const ABI = ContractArtifact.abi;
    const ContractAddress = ContractArtifact.networks['80001'].address;
    const byte=ContractArtifact.bytecode;
     console.log("ABI is", ABI);
     console.log("Contract Address is", ContractAddress);
     //console.log("bytecode is", byte);
     localStorage.setItem("bytecode",byte);

 localStorage.setItem("contractAddress", ContractAddress);
return ABI;
}


export default async function handleDetails(ev){

ev.preventDefault();
const formData = new FormData(ev.target);
  
   
    const hash=formData.getAll('IPFSInfo');

    localStorage.setItem("newIPFShash",hash);

  const ABI= await loadABI();

   const ContractAddress= localStorage.getItem("contractAddress" );

   const  web3 = new Web3(window.ethereum);
   const MyContract = new web3.eth.Contract(ABI, ContractAddress);
   console.log(MyContract);
   
var hashLink= 'https://ipfs.io/ipfs/'+hash;

 var IPFSHashLink=hashLink.toString();

 console.log(IPFSHashLink);
 


if (window.ethereum.selectedAddress!=null){

        

  document.getElementById("display").innerHTML="Sending data to Polygon... ";
  document.getElementById("hash").innerHTML="Please Wait..."
  document.getElementById("balance").innerHTML=" "

 const estimate=await MyContract.methods.createToken(IPFSHashLink).estimateGas({from: window.ethereum.selectedAddress});
 var WEB3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/v1/9daec381a026d2c4f7667ae71b81d1aa5110780f'));
       
 var gasPrice= (await WEB3.eth.getGasPrice()).toString();

 console.log(typeof gasPrice)

 var gasPriceEther=web3.utils.fromWei(gasPrice,'ether')

 var estimatedGasPriceEther=(estimate*gasPriceEther).toString();

 var sendingEthers=9000000*gasPriceEther

 
 document.getElementById("gas").innerHTML="Estimated gas Cost is "+estimatedGasPriceEther+". But we are sending "+ sendingEthers;

 
try{

   const create= await MyContract.methods.createToken(IPFSHashLink).send({ from: window.ethereum.selectedAddress, gasLimit:"927000"}); 
   console.log(create);
   console.log("created/exists");

   
   var event=create.events;
   console.log(event);

   
   if(event.tokenCreated){
    console.log("created");
    document.getElementById("display").innerHTML="Token CREATED! "
    document.getElementById("hash").innerHTML="Transaction hash is  "+ create.transactionHash
    localStorage.setItem('txnHash',create.transactionHash);

    var elementP=document.getElementById("finalPDF");
  var genButton=document.createElement('button');
  genButton.setAttribute('id','genButton');
  genButton.setAttribute("class","btn text-white ms-5");
  genButton.setAttribute("style", "background-color: #70b502;");
  var text=document.createTextNode("Click to Generate Final PDF");
  elementP.appendChild(genButton);
  genButton.appendChild(text);
  genButton.onclick= function () { reroute(); }; 

 

   }

   if(event.tokenExists){
    console.log("exists");
    document.getElementById("display").innerHTML="Token already EXISTS! "
    document.getElementById("hash").innerHTML="Sorry!"

    
  }
}
  catch(err){
    console.log(err)
    document.getElementById("display").innerHTML=err
    document.getElementById("hash").innerHTML="try again "
  }

 

};

}


 
    

            export async  function handleVerification(ev){
              ev.preventDefault();
            
              document.getElementById("display").innerHTML="Verifying with Polygon Scan... Please wait..."
              document.getElementById("link").innerHTML=" ";
            
            
                 const formData = new FormData(ev.target);
                 const IPFS=formData.getAll('IPFSInfo');
                 var hashLink= 'https://ipfs.io/ipfs/'+IPFS;
      
                 var IPFSHashLink=hashLink.toString();
            
            
                 const ABI= await loadABI();
                 const ContractAddress= localStorage.getItem("contractAddress" );

              
                var web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/v1/9daec381a026d2c4f7667ae71b81d1aa5110780f'));
                 const MyContract = new web3.eth.Contract(ABI, ContractAddress); 


                 const returnTrans=await MyContract.methods.verify_with_ipfsLink(IPFSHashLink).call();

                 console.log(returnTrans)

                 if(returnTrans.IPFShashLink!=='nil'){
                  document.getElementById("display").innerHTML="Letter EXISTS! "
                  var link= returnTrans.IPFShashLink;
                  document.getElementById("link").innerHTML=link;
                  document.getElementById("link").setAttribute('href',link);
                  document.getElementById("hash").innerHTML="transaction hash was: " + localStorage.getItem('tnHash');

                 }

                 else{
                  document.getElementById("display").innerHTML="Letter DOES NOT EXIST! "
                  document.getElementById("link").innerHTML=" "
                  document.getElementById("hash").innerHTML=" "
                 }


    
            }

