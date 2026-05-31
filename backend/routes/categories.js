const express  = require('express');
const router   = express.Router();
const Category = require('../models/Category');

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/categories
router.post('/', async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name });
    res.status(201).json(category);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ error: 'Esa categoría ya existe' });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
