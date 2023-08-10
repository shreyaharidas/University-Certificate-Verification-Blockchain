
 export async function connectToMetaMask  () {

if (typeof window.ethereum!== 'undefined') {
    console.log('MetaMask is installed!');
  }

let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

  let account = accounts[0];

   console.log("Connected to ", account);

   document.getElementById("address").innerHTML="You are connected to the following Polygon Account: "+account;
  
     };



export function reroute(){
  window.location.replace("http://localhost:8080/details");
}

