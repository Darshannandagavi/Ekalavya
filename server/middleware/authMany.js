import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Faculty from "../models/Faculty.js";

const authAny = async (req, res, next) => {
  try {
    // Student token
    if (req.cookies.token) {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user)
        return res.status(401).json({ message: "User not found." });

      if (user.isBanned)
        return res.status(403).json({ message: "Your account has been banned." });

      req.user = user;
      req.role = "student";

      return next();
    }

    // Faculty token
    if (req.cookies.faculty_token) {
      const decoded = jwt.verify(
        req.cookies.faculty_token,
        process.env.JWT_SECRET
      );

      const faculty = await Faculty.findById(decoded.id)
        .populate("university", "name")
        .populate("course", "name")
        .select("-password");

      if (!faculty)
        return res.status(401).json({ message: "Faculty not found." });

      if (!faculty.isApproved)
        return res.status(403).json({ message: "Faculty not approved." });

      if (faculty.isBanned)
        return res.status(403).json({ message: "Faculty account banned." });

      req.user = faculty;
      req.role = "faculty";

      return next();
    }

    return res.status(401).json({
      message: "Authentication required.",
    });
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export default authAny;