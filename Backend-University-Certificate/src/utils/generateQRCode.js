async function generateQRCode(file,EmpName,EmpId,IDate,letterId,txnHash){
    
    const QRCode = require('qrcode')


    IPFSlink= encodeURI('https://ipfs.io/ipfs/'+file);
    
// Creating the data
let data = {
     EmployeeName:EmpName,
     EmployeeID:EmpId,
     DateIssued: IDate,
     LetterID:letterId,
     IPFShash:file,
     FileLink: IPFSlink,
     TransactionHash:txnHash
}

// Converting the data into String format
let stringdata = JSON.stringify(data)
   
const qrcode64 = await QRCode.toDataURL(stringdata,{width: 20,height: 20});

return qrcode64;

}
module.exports={generateQRCode}