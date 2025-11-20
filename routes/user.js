// routes/user.js

import express from "express";

const router = express.Router();

// Fake in-memory users
let users = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Sara" }
];

// GET all users
router.get("/", (req, res) => {
  res.json(users);
});

// POST create user
router.post("/", (req, res) => {
  const { name } = req.body;
  const newUser = { id: Date.now(), name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = users.find(u => u.id == id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.name = name;
  res.json(user);
});

// DELETE remove user
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const exists = users.some(u => u.id == id);
  if (!exists) return res.status(404).json({ error: "User not found" });

  users = users.filter(u => u.id != id);
  res.json({ message: "User deleted" });
});

export default router;
