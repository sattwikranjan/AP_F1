const express = require("express");
const router = express.Router();
const teacherModel = require("../models/teacherModel");

//Save teacher details
const teachersController = async (req, res) => {
  try {
    const { name, email, schedule, location, pickDays, dropDays, contact } =
      req.body;
    const newTeacher = new teacherModel({
      name,
      email,
      schedule,
      location,
      pickDays,
      dropDays,
      contact,
    });

    const savedTeacher = await newTeacher.save();
    console.log("Well Done Sattwik");
    res
      .status(201)
      .json({ message: "Teacher saved successfully", teacher: savedTeacher });
  } catch (error) {
    console.error("Error saving teacher:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET timetable by day showing all classes, teachers, and subjects
const allDayTimetableController = async (req, res) => {
  try {
    const teachers = await teacherModel.find();

    const timetableByDay = {};

    teachers.forEach((teacher) => {
      const teacherName = teacher.name;
      const teacherId = teacher._id;
      teacher.schedule.forEach((entry) => {
        const { class: className, day, subject, _id } = entry;

        if (!timetableByDay[day]) {
          timetableByDay[day] = {};
        }
        if (!timetableByDay[day][className]) {
          timetableByDay[day][className] = [];
        }

        timetableByDay[day][className].push({
          //class: className,
          teacher: teacherName,
          subject,
          scheduleId: _id,
          teacherId: teacherId,
        });
      });
    });
    console.log("Well Done Sattwik");
    res.json({ timetableByDay });
  } catch (error) {
    console.error("Error retrieving timetable by day:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET timetable teacherwise for each class for each teacher
const getAllTeachersController = async (req, res) => {
  try {
    const teachers = await teacherModel.find();

    const timetableByTeacher = {};

    teachers.forEach((teacher) => {
      const teacherId = teacher._id;
      const teacherName = teacher.name;

      timetableByTeacher[teacherName] = {};

      teacher.schedule.forEach((entry) => {
        const { class: className, day, subject } = entry;

        if (!timetableByTeacher[teacherName][className]) {
          timetableByTeacher[teacherName][className] = {};
        }

        if (!timetableByTeacher[teacherName][className][day]) {
          timetableByTeacher[teacherName][className][day] = [];
        }

        timetableByTeacher[teacherName][className][day].push({
          subject,
          teacherId,
          scheduleId: _id,
        });
      });
    });
    console.log("Well Done Sattwik");
    res.json({ timetableByTeacher });
  } catch (error) {
    console.error(
      "Error retrieving timetable daywise for each teacher:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST to update timetable details for a specific teacher and day
const updateTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const { schedule } = req.body;

    const teacher = await teacherModel.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    schedule.forEach((newEntry) => {
      const existingEntryIndex = teacher.schedule.findIndex(
        (entry) => entry.day === newEntry.day && entry.class === newEntry.class
      );

      if (existingEntryIndex !== -1) {
        teacher.schedule[existingEntryIndex] = newEntry;
      } else {
        teacher.schedule.push(newEntry);
      }
    });

    const updatedTeacher = await teacher.save();

    res.json({
      message: "Timetable details updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error("Error updating timetable details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete to delete a schedule of any teacher
const deleteScheduleEntry = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { scheduleIds } = req.body;

    const teacher = await teacherModel.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Filter out the schedule entries to delete
    const schedulesToDelete = teacher.schedule.filter((entry) =>
      scheduleIds.includes(entry.id)
    );

    // Check if any schedule entries were found
    if (schedulesToDelete.length === 0) {
      return res
        .status(404)
        .json({ error: "No matching schedule entries found" });
    }

    // Remove the schedule entries from the array
    teacher.schedule = teacher.schedule.filter(
      (entry) => !scheduleIds.includes(entry.id)
    );

    // Save the updated teacher document
    await teacher.save();

    res.json({ message: "Schedule entries deleted successfully", teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllTeachersController,
  teachersController,
  allDayTimetableController,
  updateTeacher,
  deleteScheduleEntry,
};
