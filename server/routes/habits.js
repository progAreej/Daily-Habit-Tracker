const express = require("express");
const Habit = require("../models/habit");
const router = express.Router();

// Get all habits
router.get("/", async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

// Add a new habit
router.post("/", async (req, res) => {
  const { name, description, category, tags } = req.body;
  const newHabit = new Habit({ name, description, category, tags });
  await newHabit.save();
  res.json(newHabit);
});

// Update habit
router.put("/:id", async (req, res) => {
  const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedHabit);
});

// Delete habit
router.delete("/:id", async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "Habit deleted" });
});

module.exports = router;
