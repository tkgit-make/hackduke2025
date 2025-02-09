const express = require('express');
const router = express.Router();

// Temporary placeholder
router.get('/', (req, res) => {
  res.json({ message: "Portfolio route works!" });
});

module.exports = router; 