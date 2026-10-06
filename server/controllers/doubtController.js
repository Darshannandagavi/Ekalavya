import Doubt from "../models/Doubt.js";
import Note from "../models/Note.js";
import Faculty from "../models/Faculty.js";

// ─────────────────────────────────────────────────────────────
// STUDENT: ASK DOUBT
// POST /api/doubts
// ─────────────────────────────────────────────────────────────
export const askDoubt = async (req, res) => {
  try {
    const { noteId, question } = req.body;

    if (!noteId || !question?.trim()) {
      return res.status(400).json({
        message: "Note ID and question are required.",
      });
    }

    // Find the note
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    // The note's uploadedBy contains the faculty ID.
    // Existing Note schema uses uploadedBy for the note creator.
    const faculty = await Faculty.findById(note.uploadedBy);

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty who uploaded this note was not found.",
      });
    }

    // Create doubt
    const doubt = await Doubt.create({
      student: req.user._id,
      note: note._id,
      faculty: faculty._id,
      question: question.trim(),
    });

    // Return populated doubt
    const populatedDoubt = await Doubt.findById(doubt._id)
      .populate("student", "name email profilePic")
      .populate("faculty", "name email designation")
      .populate("note", "title description");

    res.status(201).json({
      message: "Doubt submitted successfully.",
      doubt: populatedDoubt,
    });
  } catch (error) {
    console.error("Ask doubt error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────
// STUDENTS: GET DOUBTS FOR A NOTE
// GET /api/doubts/note/:noteId
// ─────────────────────────────────────────────────────────────
export const getDoubtsByNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    // Check note exists
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    const doubts = await Doubt.find({
      note: noteId,
    })
      .populate("student", "name profilePic")
      .populate("faculty", "name designation profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(doubts);
  } catch (error) {
    console.error("Get note doubts error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────
// FACULTY: GET ALL DOUBTS FOR THEIR NOTES
// GET /api/doubts/faculty
// ─────────────────────────────────────────────────────────────
export const getFacultyDoubts = async (req, res) => {
  try {
    const doubts = await Doubt.find({
      faculty: req.user._id,
    })
      .populate("student", "name email profilePic")
      .populate("note", "title description subject semester")
      .sort({ createdAt: -1 });

    res.status(200).json(doubts);
  } catch (error) {
    console.error("Get faculty doubts error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────
// FACULTY: GET SINGLE DOUBT
// GET /api/doubts/:id
// ─────────────────────────────────────────────────────────────
export const getDoubtById = async (req, res) => {
  try {
    const doubt = await Doubt.findOne({
      _id: req.params.id,
      faculty: req.user._id,
    })
      .populate("student", "name email profilePic")
      .populate("faculty", "name email designation profilePic")
      .populate("note", "title description subject semester");

    if (!doubt) {
      return res.status(404).json({
        message: "Doubt not found or access denied.",
      });
    }

    res.status(200).json(doubt);
  } catch (error) {
    console.error("Get doubt error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────
// FACULTY: ANSWER DOUBT
// PATCH /api/doubts/:id/answer
// ─────────────────────────────────────────────────────────────
export const answerDoubt = async (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer?.trim()) {
      return res.status(400).json({
        message: "Answer is required.",
      });
    }

    // IMPORTANT:
    // Faculty can answer ONLY doubts assigned to them.
    const doubt = await Doubt.findOne({
      _id: req.params.id,
      faculty: req.user._id,
    });

    if (!doubt) {
      return res.status(404).json({
        message: "Doubt not found or access denied.",
      });
    }

    doubt.answer = answer.trim();
    doubt.status = "answered";
    doubt.answeredAt = new Date();

    await doubt.save();

    const updatedDoubt = await Doubt.findById(doubt._id)
      .populate("student", "name email profilePic")
      .populate("faculty", "name email designation profilePic")
      .populate("note", "title description subject semester");

    res.status(200).json({
      message: "Doubt answered successfully.",
      doubt: updatedDoubt,
    });
  } catch (error) {
    console.error("Answer doubt error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────
// STUDENT: DELETE OWN UNANSWERED DOUBT
// DELETE /api/doubts/:id
// ─────────────────────────────────────────────────────────────
export const deleteDoubt = async (req, res) => {
  try {
    const doubt = await Doubt.findOne({
      _id: req.params.id,
      student: req.user._id,
    });

    if (!doubt) {
      return res.status(404).json({
        message: "Doubt not found or access denied.",
      });
    }

    // Don't allow deletion after faculty has answered it
    if (doubt.status === "answered") {
      return res.status(400).json({
        message: "Answered doubts cannot be deleted.",
      });
    }

    await Doubt.findByIdAndDelete(doubt._id);

    res.status(200).json({
      message: "Doubt deleted successfully.",
    });
  } catch (error) {
    console.error("Delete doubt error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getStudentDoubts = async (req, res) => {
  try {
    const doubts = await Doubt.find({
      student: req.user._id,
    })
      .populate("note", "title")
      .populate("faculty", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(doubts);
  } catch (error) {
    console.error("Get student doubts error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};