const fs = require("fs");

const uploadFile = async (PDF) => {
  const ipfsClient = await import("ipfs-core");

  const projectId = "2BcYcbOMtL4LEnwYVTXDdbIxddC";
  const projectSecret = "a9a1bf99f72d44e571f0ce414d17b2fa";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  const client = await ipfsClient.create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
      "content-type": "application/pdf",
    },
  });

  // const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });

  fs.writeFileSync("University_Certificate.pdf", PDF, "base64", function (err) {
    console.log(err);
  });

  let filePath =
    "C:\\Users\\shreya.haridas\\Desktop\\University Certificate Verification\\Back-end-Certificate-Verification\\University_Certificate.pdf";

  let fileToUpload = Buffer.from(fs.readFileSync(filePath), () => {});

  let filehashDetails = await client.add(fileToUpload);

  let filehash = JSON.stringify(filehashDetails.path);

  return filehash;
};

module.exports = { uploadFile };
