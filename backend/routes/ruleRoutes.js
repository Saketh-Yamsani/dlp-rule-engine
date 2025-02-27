import express from "express";
import Rule from "../models/Rule.js";

const router = express.Router();

// Create Rule
router.post("/", async (req, res) => {
  const { name, pattern, description, createdBy } = req.body;

  // Validate regex pattern
  try {
    new RegExp(pattern);
  } catch {
    return res.status(400).json({ error: "Invalid regex pattern" });
  }

  // Ensure createdBy is provided
  if (!createdBy) {
    return res.status(400).json({ error: "createdBy field is required" });
  }

  try {
    const rule = new Rule({ name, pattern, description, createdBy });
    await rule.save();
    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ error: "Error creating rule", details: error.message });
  }
});

// Get All Rules
router.get("/", async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ error: "Error fetching rules", details: error.message });
  }
});

// Update Rule
router.put("/:id", async (req, res) => {
  const { name, pattern, description } = req.body;

  try {
    const rule = await Rule.findById(req.params.id);
    if (!rule) return res.status(404).json({ error: "Rule not found" });

    rule.name = name || rule.name;
    rule.pattern = pattern || rule.pattern;
    rule.description = description || rule.description;
    rule.updatedAt = new Date();
    rule.version += 1;

    await rule.save();
    res.json(rule);
  } catch (error) {
    res.status(500).json({ error: "Error updating rule", details: error.message });
  }
});

// Delete Rule
router.delete("/:id", async (req, res) => {
  try {
    await Rule.findByIdAndDelete(req.params.id);
    res.json({ message: "Rule deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting rule", details: error.message });
  }
});

export default router;
