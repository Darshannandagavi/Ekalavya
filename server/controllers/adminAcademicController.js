import University from "../models/University.js";
import Course from "../models/Course.js";
import Subject from "../models/Subject.js";

// ── UNIVERSITY ────────────────────────────────────────────────────────────────
export const addUniversity = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await University.findOne({ name });
    if (exists) return res.status(400).json({ message: "University already exists" });
    const university = await University.create({ name });
    res.status(201).json(university);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUniversity = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await University.findOne({ name, _id: { $ne: req.params.id } });
    if (exists) return res.status(400).json({ message: "University name already taken" });
    const university = await University.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!university) return res.status(404).json({ message: "University not found" });
    res.status(200).json(university);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    if (!university) return res.status(404).json({ message: "University not found" });
    // Cascade delete courses and subjects under this university
    await Course.deleteMany({ university: req.params.id });
    await Subject.deleteMany({ university: req.params.id });
    res.status(200).json({ message: "University and all related data deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find().sort({ name: 1 });
    res.status(200).json(universities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── COURSE ────────────────────────────────────────────────────────────────────
export const addCourse = async (req, res) => {
  try {
    const { name, universityId, totalSemesters } = req.body;
    const university = await University.findById(universityId);
    if (!university) return res.status(404).json({ message: "University not found" });
    const course = await Course.create({ name, university: universityId, totalSemesters });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { name, totalSemesters } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, totalSemesters },
      { new: true, runValidators: true }
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    // Cascade delete subjects under this course
    await Subject.deleteMany({ course: req.params.id });
    res.status(200).json({ message: "Course and its subjects deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCoursesByUniversity = async (req, res) => {
  try {
    const courses = await Course.find({ university: req.params.universityId });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── SUBJECT ───────────────────────────────────────────────────────────────────
export const addSubject = async (req, res) => {
  try {
    const { name, universityId, courseId, semester } = req.body;
    const subject = await Subject.create({
      name, university: universityId, course: courseId, semester,
    });
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { name, semester } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, semester },
      { new: true, runValidators: true }
    );
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const { courseId, semester } = req.params;
    const subjects = await Subject.find({ course: courseId, semester });
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};