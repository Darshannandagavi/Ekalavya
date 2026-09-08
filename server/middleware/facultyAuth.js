import jwt from "jsonwebtoken";
import Faculty from "../models/Faculty.js";

const facultyAuth = async (req, res, next) => {
  try {
    // Read token from cookie
    const token = req.cookies.faculty_token;
    console.log("token",token);
    if (!token) {
      return res.status(401).json({
        message: "Not authorized. No token.",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find faculty
    const faculty = await Faculty.findById(decoded.id)
      .populate("university", "name")
      .populate("course", "name")
      .select("-password");

    if (!faculty) {
      return res.status(401).json({
        message: "Not authorized. Faculty not found.",
      });
    }

    // Check role
    if (faculty.role !== "faculty") {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    // Check approval
    if (!faculty.isApproved) {
      return res.status(403).json({
        message: "Your account is pending admin approval.",
      });
    }

    // Check ban
    if (faculty.isBanned) {
      return res.status(403).json({
        message: "Your account has been banned.",
      });
    }

    // Attach faculty to request
    req.user = faculty;
    console.log("req.user", req.user);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized. Invalid or expired token.",
    });
  }
};

export default facultyAuth;