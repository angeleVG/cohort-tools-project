const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();



// GET /api/users/:id - Retrieves a specific user by id
router.get("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const foundUser = await User.findById(id).select("-password"); // exclude password

    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user.", error: err.message });
  }
});

module.exports = router;