import Faculty from "../models/Faculty.js";
import { sendEmail } from "../config/emailConfig.js";

// Get all faculty
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find()
      .populate("university", "name")
      .populate("course", "name")
      .sort({ createdAt: -1 });

    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve Faculty
export const approveFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty)
      return res.status(404).json({
        message: "Faculty not found",
      });

    faculty.isApproved = true;

    await faculty.save();

    await sendEmail({
      to: faculty.email,
      subject: "Faculty Account Approved",
      html: `
      <h2>Congratulations ${faculty.name}</h2>

      <p>Your faculty account has been approved.</p>

      <p>You can now login.</p>
      `,
    });

    res.json({
      message: "Faculty approved successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Reject Faculty
export const rejectFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty)
      return res.status(404).json({
        message: "Faculty not found",
      });

    await sendEmail({
      to: faculty.email,
      subject: "Faculty Registration Rejected",
      html: `
      <h2>Hello ${faculty.name}</h2>

      <p>Your faculty registration has been rejected.</p>

      <p>Please contact administrator.</p>
      `,
    });

    await faculty.deleteOne();

    res.json({
      message: "Faculty rejected.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};