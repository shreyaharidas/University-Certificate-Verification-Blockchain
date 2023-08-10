const read = async (limit, offset, CertiStatus, GPA, searchTerm) => {
  const {
    connectionString,
    connectionParams,
    StudentSchema,
  } = require("./mongooseSetup");
  const mongoose = require("mongoose");

  const Student = mongoose.model("student", StudentSchema, "StudentData");

  const readDocs = async (limit, offset, CertiStatus, GPA, searchTerm) => {
    let filter = {};

    if (CertiStatus !== undefined)
      filter = {
        ...filter,
        "Certificate Status": CertiStatus.toString() === "true" ? true : false,
      };

    if (GPA && GPA?.length)
      filter = { ...filter, GPA: { $in: JSON.parse(GPA) } };

    if (searchTerm) {
      let reg = new RegExp(searchTerm);

      filter = {
        ...filter,

        Name: { $regex: reg, $options: "i" },
      };
    }

    const total = await Student.collection.find(filter).count();
    let result = Student.collection
      .find(filter)
      .skip(parseInt(offset))
      .limit(parseInt(limit));
    const resultArray = await result.toArray();
    //console.log({ resultArray, total });
    return { resultArray, total };
  };

  try {
    await mongoose.connect(connectionString, connectionParams);

    console.log("Connected to database");

    let data = await readDocs(limit, offset, CertiStatus, GPA, searchTerm);

    return data;
  } catch (err) {
    console.log("error relating to database is", err);
  }
};

module.exports = { read };
