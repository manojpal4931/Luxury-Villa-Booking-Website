const express = require("express");
const router = express.Router();

// index route
router.get("/", (req, res) => {
    res.send("GET for posts");
});

// show route
router.get("/:id", (req, res) => {
    res.send("GET for post id");
});

// create route
router.post("/", (req, res) => {
    res.send("POST for posts");
});

// delete route
router.delete("/:id", (req, res) => {
    res.send("DELETE for post id");
});

module.exports = router;
