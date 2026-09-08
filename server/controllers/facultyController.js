import jwt from "jsonwebtoken";
import Faculty from "../models/Faculty.js";
import { sendEmail } from "../config/emailConfig.js";
import { v2 as cloudinary } from "cloudinary";

// ─── HELPERS ─────────────────────────────────────────────
const sendFacultyTokenCookie = (res, facultyId) => {
  const token = jwt.sign({ id: facultyId, role: "faculty" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("faculty_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: none,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

// ─── REGISTER ────────────────────────────────────────────
export const facultyRegister = async (req, res) => {
  try {
    const { name, email, password, university, course, designation } = req.body;

    if (!name || !email || !password || !university || !course) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    const existing = await Faculty.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const faculty = await Faculty.create({
      name,
      email,
      password,
      university,
      course,
      designation: designation || "",
      isApproved: false,
    });

    // Notify the registering faculty
    try {
      await sendEmail({
        to: faculty.email,
        subject: `Faculty Registration Received — ${process.env.EMAIL_FROM_NAME || "Ekalavya"}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9f9f9;">
            <div style="background:#fff;border-radius:12px;padding:40px;box-shadow:0 2px 10px rgba(0,0,0,0.08);">
              <h1 style="color:#1a1a1a;font-size:26px;margin:0 0 8px;">Registration Received 🎓</h1>
              <p style="color:#666;font-size:15px;margin:0 0 28px;">Hi <strong>${faculty.name}</strong>, your faculty account request has been submitted successfully.</p>
              <div style="background:#f0f4ff;border-radius:8px;padding:20px;margin-bottom:28px;">
                <p style="margin:0 0 6px;color:#444;font-size:14px;"><strong>Email:</strong> ${faculty.email}</p>
                <p style="margin:0;color:#444;font-size:14px;"><strong>Status:</strong> <span style="color:#d97706;font-weight:700;">Pending Approval</span></p>
              </div>
              <p style="color:#666;font-size:14px;margin:0 0 24px;">
                An administrator will review your account and you'll receive an approval email within 1–2 business days.
              </p>
              <hr style="border:none;border-top:1px solid #eee;margin:28px 0;" />
              <p style="color:#999;font-size:12px;margin:0;">If you did not make this request, please ignore this email.</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn("Faculty registration email failed:", emailErr.message);
    }

    // Notify admin
    try {
      if (process.env.ADMIN_EMAIL) {
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New Faculty Registration — ${faculty.name}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9f9f9;">
              <div style="background:#fff;border-radius:12px;padding:40px;">
                <h1 style="color:#1a1a1a;font-size:22px;margin:0 0 20px;">New Faculty Registration</h1>
                <div style="background:#f0f4ff;border-radius:8px;padding:20px;margin-bottom:24px;">
                  <p style="margin:0 0 8px;color:#444;font-size:14px;"><strong>Name:</strong> ${faculty.name}</p>
                  <p style="margin:0 0 8px;color:#444;font-size:14px;"><strong>Email:</strong> ${faculty.email}</p>
                  <p style="margin:0 0 8px;color:#444;font-size:14px;"><strong>Designation:</strong> ${faculty.designation || "—"}</p>
                  <p style="margin:0;color:#444;font-size:14px;"><strong>Registered:</strong> ${new Date().toLocaleString()}</p>
                </div>
                <a href="${process.env.CLIENT_URL || "http://localhost:5173"}/admin/faculty"
                  style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;">
                  Review in Admin Panel →
                </a>
              </div>
            </div>
          `,
        });
      }
    } catch (adminEmailErr) {
      console.warn("Admin notification email failed:", adminEmailErr.message);
    }

    res.status(201).json({
      message: "Registration submitted. Await admin approval.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── LOGIN ───────────────────────────────────────────────
export const facultyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (faculty.isBanned) {
      return res.status(403).json({ message: "Your account has been banned." });
    }

    if (!faculty.isApproved) {
      return res.status(403).json({ message: "Your account is pending admin approval. Please wait for the approval email." });
    }

    const isMatch = await faculty.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    sendFacultyTokenCookie(res, faculty._id);

    res.status(200).json({
      message: "Login successful.",
      user: {
        _id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        role: faculty.role,
        designation: faculty.designation,
        university: faculty.university,
        course: faculty.course,
        isApproved: faculty.isApproved,
        profilePic: faculty.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── LOGOUT ──────────────────────────────────────────────
export const facultyLogout = async (req, res) => {
  res.clearCookie("faculty_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully." });
};

// ─── GET ME ──────────────────────────────────────────────
export const getFacultyMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── UPDATE PROFILE ──────────────────────────────────────
export const updateFacultyProfile = async (req, res) => {
  try {
    const { name, email, designation } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const emailExists = await Faculty.findOne({ email, _id: { $ne: req.user._id } });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.user._id,
      { name, email, designation },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated successfully.", user: updatedFaculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── CHANGE PASSWORD ─────────────────────────────────────
export const changeFacultyPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters." });
    }

    const faculty = await Faculty.findById(req.user._id);
    const isMatch = await faculty.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }

    faculty.password = newPassword;
    await faculty.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── UPLOAD PROFILE PIC ──────────────────────────────────
export const uploadFacultyProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    if (req.user.profilePicPublicId) {
      await cloudinary.uploader.destroy(req.user.profilePicPublicId);
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.user._id,
      { profilePic: req.file.path, profilePicPublicId: req.file.filename },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile picture updated.", user: updatedFaculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── FORGOT PASSWORD ─────────────────────────────────────
export const facultyForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required." });
    }

    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(200).json({ message: "If this email is registered, a new password has been sent." });
    }

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let newPassword = "";
    for (let i = 0; i < 10; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    faculty.password = newPassword;
    await faculty.save();

    try {
      await sendEmail({
        to: faculty.email,
        subject: `Password Reset — ${process.env.EMAIL_FROM_NAME || "Ekalavya"}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9f9f9;">
            <div style="background:#fff;border-radius:12px;padding:40px;">
              <h1 style="color:#1a1a1a;font-size:24px;margin:0 0 12px;">Password Reset</h1>
              <p style="color:#666;font-size:15px;margin:0 0 28px;">Hi ${faculty.name}, your faculty account password has been reset.</p>
              <div style="background:#f0f4ff;border-radius:8px;padding:20px;margin-bottom:28px;text-align:center;">
                <p style="margin:0 0 8px;font-size:13px;color:#888;">Your new temporary password</p>
                <p style="margin:0;font-size:24px;font-weight:900;letter-spacing:3px;color:#1a1a1a;font-family:monospace;">${newPassword}</p>
              </div>
              <p style="color:#666;font-size:14px;margin:0 0 24px;">Please log in and change your password immediately from your profile settings.</p>
              <a href="${process.env.CLIENT_URL || "http://localhost:5173"}/faculty/login"
                style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
                Go to Faculty Login →
              </a>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn("Faculty reset email failed:", emailErr.message);
    }

    res.status(200).json({ message: "If this email is registered, a new password has been sent." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};