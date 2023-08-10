const mongoose = require("mongoose");

const connectionString = `mongodb+srv://shreyaharidas15:Sh1509${encodeURIComponent(
  "@"
)}mdb@cluster0.zahegyj.mongodb.net/Certificate-Blockchain-Project?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const StudentSchema = new mongoose.Schema({
  "Enrollment number": { type: Number },
  Name: { type: String },
  GPA: { type: Number },
  "Certificate Status": { type: Boolean },
});

module.exports = { connectionString, connectionParams, StudentSchema };
