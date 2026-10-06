import Placement from "../models/Placement.js";

// ======================================================
// ADMIN - CREATE PLACEMENT
// ======================================================

export const createPlacement = async (req, res) => {
  try {
    const {
      company,
      jobRole,
      package: packageName,
      eligibility,
      location,
      driveDate,
      applicationDeadline,
      skills,
      description,
      applyLink,
    } = req.body;

    if (
      !company ||
      !jobRole ||
      !packageName ||
      !eligibility ||
      !location ||
      !driveDate ||
      !applicationDeadline ||
      !description ||
      !applyLink
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const placement = await Placement.create({
      company,
      jobRole,
      package: packageName,
      eligibility,
      location,
      driveDate,
      applicationDeadline,
      skills: Array.isArray(skills) ? skills : [],
      description,
      applyLink,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Placement added successfully",
      placement,
    });
  } catch (error) {
    console.error("Create placement error:", error);

    res.status(500).json({
      message: "Failed to create placement",
      error: error.message,
    });
  }
};

// ======================================================
// ADMIN - GET ALL PLACEMENTS
// ======================================================

export const getAllPlacementsAdmin = async (req, res) => {
  try {
    const placements = await Placement.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(placements);
  } catch (error) {
    console.error("Get admin placements error:", error);

    res.status(500).json({
      message: "Failed to fetch placements",
      error: error.message,
    });
  }
};

// ======================================================
// STUDENT - GET ALL PLACEMENTS
// ======================================================

export const getAllPlacements = async (req, res) => {
  try {
    const placements = await Placement.find()
      .select("-createdBy")
      .sort({ driveDate: 1 });

    res.status(200).json(placements);
  } catch (error) {
    console.error("Get placements error:", error);

    res.status(500).json({
      message: "Failed to fetch placements",
      error: error.message,
    });
  }
};

// ======================================================
// STUDENT - GET SINGLE PLACEMENT
// ======================================================

export const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.placementId).select(
      "-createdBy",
    );

    if (!placement) {
      return res.status(404).json({
        message: "Placement not found",
      });
    }

    res.status(200).json(placement);
  } catch (error) {
    console.error("Get placement error:", error);

    res.status(500).json({
      message: "Failed to fetch placement",
      error: error.message,
    });
  }
};

// ======================================================
// ADMIN - UPDATE PLACEMENT
// ======================================================

export const updatePlacement = async (req, res) => {
  try {
    const {
      company,
      jobRole,
      package: packageName,
      eligibility,
      location,
      driveDate,
      applicationDeadline,
      skills,
      description,
      applyLink,
    } = req.body;

    const placement = await Placement.findById(req.params.placementId);

    if (!placement) {
      return res.status(404).json({
        message: "Placement not found",
      });
    }

    placement.company = company;
    placement.jobRole = jobRole;
    placement.package = packageName;
    placement.eligibility = eligibility;
    placement.location = location;
    placement.driveDate = driveDate;
    placement.applicationDeadline = applicationDeadline;
    placement.skills = Array.isArray(skills) ? skills : [];
    placement.description = description;
    placement.applyLink = applyLink;

    await placement.save();

    res.status(200).json({
      message: "Placement updated successfully",
      placement,
    });
  } catch (error) {
    console.error("Update placement error:", error);

    res.status(500).json({
      message: "Failed to update placement",
      error: error.message,
    });
  }
};

// ======================================================
// ADMIN - DELETE PLACEMENT
// ======================================================

export const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.placementId);

    if (!placement) {
      return res.status(404).json({
        message: "Placement not found",
      });
    }

    await Placement.findByIdAndDelete(req.params.placementId);

    res.status(200).json({
      message: "Placement deleted successfully",
    });
  } catch (error) {
    console.error("Delete placement error:", error);

    res.status(500).json({
      message: "Failed to delete placement",
      error: error.message,
    });
  }
};
