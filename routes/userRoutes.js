const express = require("express");
const {
  getAllTeachersController,
  teachersController,
  allDayTimetableController,
  updateTeacher,
  deleteScheduleEntry,
} = require("../controllers/timeTableController");
const dummyAuthorization = require("../middlewares/adminMiddleware");

//router onject
const router = express.Router();

router.get("/getAllTeachers", getAllTeachersController);
router.get("/getAllDays", allDayTimetableController);
router.post("/teachers", dummyAuthorization, teachersController);
router.post("/update/:teacherId", dummyAuthorization, updateTeacher);
router.delete("/delete/:teacherId/", dummyAuthorization, deleteScheduleEntry);

module.exports = router;
