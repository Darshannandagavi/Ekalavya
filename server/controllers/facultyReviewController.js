import mongoose from "mongoose";
import FacultyReview from "../models/FacultyReview.js";
import Faculty from "../models/Faculty.js";
import Note from "../models/Note.js";


// ============================================================
// GET FACULTY RATING
// ============================================================

export const getFacultyRating = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { noteId } = req.query;

    const faculty = await Faculty.findById(facultyId).select(
      "_id name email avg_rating rating_count",
    );

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found.",
      });
    }

    let myRating = 0;

    if (noteId) {
      const myReview = await FacultyReview.findOne({
        student: req.user._id,
        faculty: facultyId,
        note: noteId,
      }).select("rating");

      myRating = myReview?.rating || 0;
    }

    return res.status(200).json({
      faculty: {
        _id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        avg_rating: faculty.avg_rating || 0,
        rating_count: faculty.rating_count || 0,
      },

      // Only for the rating section, not the faculty card
      myRating,
    });
  } catch (error) {
    console.error("Get faculty rating error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const rateFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { noteId } = req.body;

    const rating = Number(req.body.rating);

    if (!noteId) {
      return res.status(400).json({
        message: "Note ID is required.",
      });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be a whole number between 1 and 5.",
      });
    }

    const faculty = await Faculty.findById(facultyId).select(
      "_id name avg_rating rating_count",
    );

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found.",
      });
    }

    await FacultyReview.findOneAndUpdate(
      {
        student: req.user._id,
        faculty: facultyId,
        note: noteId,
      },
      {
        $set: {
          rating,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    // ============================================
    // UPDATE FACULTY OVERALL RATING
    // ============================================

    const ratingSummary = await updateFacultyRating(facultyId);

    // ============================================
    // GET CURRENT STUDENT'S RATING FOR THIS NOTE
    // ============================================

    const myReview = await FacultyReview.findOne({
      student: req.user._id,
      faculty: facultyId,
      note: noteId,
    }).select("rating");

    return res.status(200).json({
      message: "Faculty rating saved successfully.",

      faculty: {
        _id: faculty._id,
        name: faculty.name,
        avg_rating: ratingSummary.average,
        rating_count: ratingSummary.count,
      },

      myRating: myReview?.rating || 0,
    });
  } catch (error) {
    console.error("Rate faculty error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};


const updateFacultyRating = async (facultyId) => {
  const facultyObjectId = new mongoose.Types.ObjectId(facultyId);

  const [summary] = await FacultyReview.aggregate([
    {
      $match: {
        faculty: facultyObjectId,
      },
    },

    {
      $group: {
        _id: "$faculty",

        average: {
          $avg: "$rating",
        },

        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const avgRating = summary ? Number(summary.average.toFixed(1)) : 0;

  const ratingCount = summary?.count || 0;

  await Faculty.findByIdAndUpdate(
    facultyId,
    {
      $set: {
        avg_rating: avgRating,
        rating_count: ratingCount,
      },
    },
    {
      new: true,
    },
  );

  return {
    average: avgRating,
    count: ratingCount,
  };
};