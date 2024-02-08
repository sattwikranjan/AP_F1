const mongoose = require("mongoose");

const allowedSubjects = ["Math", "English", "Science", "History"];
const allowedClasses = ["Nur", "1", "2", "3"];
const allowedDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  schedule: [
    {
      class: {
        type: String,
        required: true,
        enum: allowedClasses,
      },
      day: {
        type: String,
        required: true,
        enum: allowedDays,
      },
      subject: {
        type: String,
        required: true,
        enum: allowedSubjects,
      },
    },
  ],
  location: {
    type: String,
    default: "",
  },
  pickDays: {
    type: Array,
    default: [],
  },
  dropDays: {
    type: Array,
    default: [],
  },
  contact: {
    type: String,
    required: [true, "contact is required"],
  },
});

const teacherModel = mongoose.model("Teachers", teacherSchema);

// const createDocument = async () => {
//   try {
//     const data = new teacherModel({
//       name: "Sattwik Ranjan",
//       email: "sattwikranjan@gmail.com",
//       contact: "9749556671",
//       class: ["1", "2"],
//       location: "chilla",
//       pickDays: ["sat", "sun"],
//       dropDays: ["mon", "tue"],
//     });
//     const result = await data.save();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// createDocument();

module.exports = teacherModel;
