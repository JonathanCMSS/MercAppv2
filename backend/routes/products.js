const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const Product  = require('../models/Product');

// Validaciones reutilizables
const productValidations = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 100 }).withMessage('Máximo 100 caracteres')
    .trim(),
  body('description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .trim(),
  body('price')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a 0'),
  body('categoryId')
    .notEmpty().withMessage('La categoría es obligatoria')
    .isMongoId().withMessage('Categoría inválida'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock debe ser un entero ≥ 0'),
  body('imageUrl')
    .optional()
    .isURL().withMessage('La URL de imagen no es válida')
];

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { search, categoryId } = req.query;
    const filter = {};
    if (search)     filter.$or = [
      { name:        { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
    if (categoryId) filter.categoryId = categoryId;

    const products = await Product.find(filter)
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categoryId', 'name');
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products
router.post('/', productValidations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array().map(e => e.msg) });

  try {
    const product = await Product.create(req.body);
    const populated = await product.populate('categoryId', 'name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id
router.put('/:id', productValidations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array().map(e => e.msg) });

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('categoryId', 'name');
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/products/:id
router.patch('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('categoryId', 'name');
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
