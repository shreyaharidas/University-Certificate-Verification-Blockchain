
 export default async function generateQRCodePDF(e){

    e.preventDefault();


    var fullname= localStorage.getItem("name");
    var id=localStorage.getItem("empId");
    var reliefDate=localStorage.getItem("date");
    var letterId= localStorage.getItem("newletterID");
    var IPFSHash=localStorage.getItem('newIPFShash');
    var txnhash=localStorage.getItem('txnHash')


    var data={
       
        EmpName:fullname,
        EmpId:id,
        RelievingDate:reliefDate,
        letterID:letterId,
        fileHash:IPFSHash,
        transaction:txnhash

    }

    console.log(JSON.stringify(data))

  var response= await fetch('http://localhost:3000/getPdf', {
         method: 'POST', 
         mode: 'cors',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data)
       })

      var base64pdf= await response.text();
      var pdf="data:application/pdf;base64,"+base64pdf;
      console.log(pdf);

      var frame=document.getElementById("finalFrame");
      frame.setAttribute("typeof","application/pdf");
      frame.setAttribute("src",pdf);
      
      const pdfstr = await fetch(pdf);
      const blobFromFetch= await pdfstr.blob();

    
      var blob = new Blob([blobFromFetch], {type: "application/pdf"});
      
      const blobUrl = URL.createObjectURL(blob);
     
      window.open(blobUrl,"_blank");
         
         

       } 
