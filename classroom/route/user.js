const express = require("express");
const router = express.Router();

// Index Route
router.get("/", (req, res) => {
    res.send("GET for all users");
});

// Show Route
router.get("/:id", (req, res) => {
    let { id } = req.params;
    res.send(`GET for user id ${id}`);
});

// Create Route
router.post("/", (req, res) => {
    res.send("POST for users");
});

// Delete Route
router.delete("/:id", (req, res) => {
    let { id } = req.params;
    res.send(`DELETE for user id ${id}`);
});

module.exports = router;
