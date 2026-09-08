import Note from "../models/Note.js";

// ── CREATE ────────────────────────────────────────────────────────────────────
export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      uploadedBy: req.user._id,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET FACULTY'S OWN NOTES (with filters) ────────────────────────────────────
export const getFacultyNotes = async (req, res) => {
  try {
    const { universityId, courseId, semester, subjectId } = req.query;
    console.log(req);
    const filter = { uploadedBy: req.user._id }; // ONLY their own notes

    if (universityId) filter.university = universityId;
    if (courseId) filter.course = courseId;
    if (semester) filter.semester = Number(semester);
    if (subjectId) filter.subject = subjectId;

    const notes = await Note.find(filter)
      .populate("university", "name")
      .populate("course", "name")
      .populate("subject", "name")
      .sort({ createdAt: -1 }); // newest first in list view

    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ── GET SINGLE NOTE (faculty must own it) ─────────────────────────────────────
export const getFacultyNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      uploadedBy: req.user._id, // ownership check
    })
      .populate("university", "name")
      .populate("course", "name")
      .populate("subject", "name");

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or access denied" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── UPDATE (faculty must own it) ──────────────────────────────────────────────
export const updateNote = async (req, res) => {
  try {
    // findOneAndUpdate with ownership check in the query itself
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, uploadedBy: req.user._id },
      { ...req.body },
      { new: true, runValidators: true },
    );

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or access denied" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── DELETE (faculty must own it) ──────────────────────────────────────────────
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      uploadedBy: req.user._id, // ownership check
    });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or access denied" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── STUDENT: get notes by their enrolled course/semester ──────────────────────
export const getNotesBySubject = async (req, res) => {
  try {
    const { universityId, courseId, semester, subjectId } = req.query;

    const notes = await Note.find({
      university: universityId,
      course: courseId,
      semester,
      subject: subjectId,
    }).sort({ order: 1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentNotes = async (req, res) => {
  try {
    const { universityId, courseId, semester } = req.query;

    if (!universityId || !courseId || !semester) {
      return res.status(400).json({
        message: "University, course and semester are required.",
      });
    }

    const notes = await Note.find({
      university: universityId,
      course: courseId,
      semester: Number(semester),
    })
      .populate("university", "name")
      .populate("course", "name")
      .populate("subject", "name")
      .populate("uploadedBy", "name email")
      .sort({
        order: 1,
        createdAt: 1,
      });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Get student notes error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};