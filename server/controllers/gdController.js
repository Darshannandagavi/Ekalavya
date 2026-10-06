import mongoose from "mongoose";
import GDDomain from "../models/GDDomain.js";
import GDTopic from "../models/GDTopic.js";

// ============================================================
// CREATE DOMAIN
// ============================================================

export const createDomain = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Domain name is required.",
      });
    }

    const domain = await GDDomain.create({
      name: name.trim(),
      description: description?.trim() || "",
      createdBy: req.user._id,
    });

    const populatedDomain = await GDDomain.findById(domain._id).populate(
      "createdBy",
      "name email profilePic",
    );

    return res.status(201).json({
      message: "GD domain created successfully.",
      domain: populatedDomain,
    });
  } catch (error) {
    console.error("Create GD domain error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already created this domain.",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ============================================================
// GET ALL DOMAINS
// ============================================================

export const getAllDomains = async (req, res) => {
  try {
    const domains = await GDDomain.find()
      .populate("createdBy", "name email profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json(domains);
  } catch (error) {
    console.error("Get GD domains error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ============================================================
// GET MY DOMAINS
// ============================================================

export const getMyDomains = async (req, res) => {
  try {
    const domains = await GDDomain.find({
      createdBy: req.user._id,
    })
      .populate("createdBy", "name email profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json(domains);
  } catch (error) {
    console.error("Get my GD domains error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ============================================================
// UPDATE DOMAIN
// ============================================================

export const updateDomain = async (req, res) => {
  try {
    const { domainId } = req.params;
    const { name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(domainId)) {
      return res.status(400).json({
        message: "Invalid domain ID.",
      });
    }

    const domain = await GDDomain.findOne({
      _id: domainId,
      createdBy: req.user._id,
    });

    if (!domain) {
      return res.status(404).json({
        message: "Domain not found or you are not authorized.",
      });
    }

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Domain name is required.",
      });
    }

    domain.name = name.trim();
    domain.description = description?.trim() || "";

    await domain.save();

    const updatedDomain = await GDDomain.findById(domain._id).populate(
      "createdBy",
      "name email profilePic",
    );

    return res.status(200).json({
      message: "Domain updated successfully.",
      domain: updatedDomain,
    });
  } catch (error) {
    console.error("Update GD domain error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already created this domain.",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ============================================================
// DELETE DOMAIN
// ============================================================

export const deleteDomain = async (req, res) => {
  try {
    const { domainId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(domainId)) {
      return res.status(400).json({
        message: "Invalid domain ID.",
      });
    }

    const domain = await GDDomain.findOne({
      _id: domainId,
      createdBy: req.user._id,
    });

    if (!domain) {
      return res.status(404).json({
        message: "Domain not found or you are not authorized.",
      });
    }

    // Delete all topics inside this domain
    await GDTopic.deleteMany({
      domain: domainId,
    });

    await GDDomain.findByIdAndDelete(domainId);

    return res.status(200).json({
      message: "Domain and its GD topics deleted successfully.",
    });
  } catch (error) {
    console.error("Delete GD domain error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ============================================================
// CREATE GD TOPIC
// ============================================================

export const createTopic = async (req, res) => {
  try {
    const { domainId } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(domainId)) {
      return res.status(400).json({
        message: "Invalid domain ID.",
      });
    }

    if (!title?.trim()) {
      return res.status(400).json({
        message: "GD topic title is required.",
      });
    }

    const domain = await GDDomain.findById(domainId);

    if (!domain) {
      return res.status(404).json({
        message: "GD domain not found.",
      });
    }

    const topic = await GDTopic.create({
      title: title.trim(),
      description: description?.trim() || "",
      domain: domainId,
      createdBy: req.user._id,
    });

    const populatedTopic = await GDTopic.findById(topic._id)
      .populate("domain", "name")
      .populate("createdBy", "name email profilePic");

    return res.status(201).json({
      message: "GD topic created successfully.",
      topic: populatedTopic,
    });
  } catch (error) {
    console.error("Create GD topic error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ============================================================
// GET ALL TOPICS
// ============================================================

export const getAllTopics = async (req, res) => {
  try {
    const topics = await GDTopic.find()
      .populate("domain", "name description")
      .populate("createdBy", "name email profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json(topics);
  } catch (error) {
    console.error("Get all GD topics error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ============================================================
// GET TOPICS BY DOMAIN
// ============================================================

export const getTopicsByDomain = async (req, res) => {
  try {
    const { domainId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(domainId)) {
      return res.status(400).json({
        message: "Invalid domain ID.",
      });
    }

    const topics = await GDTopic.find({
      domain: domainId,
    })
      .populate("domain", "name description")
      .populate("createdBy", "name email profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json(topics);
  } catch (error) {
    console.error("Get GD topics by domain error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ============================================================
// GET MY TOPICS
// ============================================================

export const getMyTopics = async (req, res) => {
  try {
    const topics = await GDTopic.find({
      createdBy: req.user._id,
    })
      .populate("domain", "name description")
      .populate("createdBy", "name email profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json(topics);
  } catch (error) {
    console.error("Get my GD topics error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ============================================================
// UPDATE TOPIC
// ============================================================

export const updateTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { title, description, domainId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({
        message: "Invalid topic ID.",
      });
    }

    const topic = await GDTopic.findOne({
      _id: topicId,
      createdBy: req.user._id,
    });

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found or you are not authorized.",
      });
    }

    if (!title?.trim()) {
      return res.status(400).json({
        message: "GD topic title is required.",
      });
    }

    if (domainId) {
      if (!mongoose.Types.ObjectId.isValid(domainId)) {
        return res.status(400).json({
          message: "Invalid domain ID.",
        });
      }

      const domain = await GDDomain.findById(domainId);

      if (!domain) {
        return res.status(404).json({
          message: "Domain not found.",
        });
      }

      topic.domain = domainId;
    }

    topic.title = title.trim();
    topic.description = description?.trim() || "";

    await topic.save();

    const updatedTopic = await GDTopic.findById(topic._id)
      .populate("domain", "name description")
      .populate("createdBy", "name email profilePic");

    return res.status(200).json({
      message: "GD topic updated successfully.",
      topic: updatedTopic,
    });
  } catch (error) {
    console.error("Update GD topic error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ============================================================
// DELETE TOPIC
// ============================================================

export const deleteTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({
        message: "Invalid topic ID.",
      });
    }

    const topic = await GDTopic.findOne({
      _id: topicId,
      createdBy: req.user._id,
    });

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found or you are not authorized.",
      });
    }

    await GDTopic.findByIdAndDelete(topicId);

    return res.status(200).json({
      message: "GD topic deleted successfully.",
    });
  } catch (error) {
    console.error("Delete GD topic error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
