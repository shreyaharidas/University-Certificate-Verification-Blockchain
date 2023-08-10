import Instascan from "instascan-v2";

export default function QRCodeScanner(){

   var element=document.getElementById("start");
   element.remove();

   var vid=document.createElement('video');
   document.getElementById('scannerP').appendChild(vid);
   vid.setAttribute("id","scanner");
   vid.setAttribute("height",'500');
   vid.setAttribute("width",'500');


    let scanner = new Instascan.Scanner({ video: document.getElementById('scanner') });
      scanner.addListener('scan', function (content) {
        console.log(content);
        var contentJson=JSON.parse(content);
        var ipfs=contentJson.IPFShash;

        localStorage.setItem("tnHash",contentJson. TransactionHash) 

     
        document.getElementById("ipfshash").value=ipfs;
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
              scanner.stop(cameras[0]);}});

              document.getElementById("scanner").remove();

      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
    }