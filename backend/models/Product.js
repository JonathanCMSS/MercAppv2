const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [100, 'Máximo 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0.01, 'El precio debe ser mayor a 0']
  },
  imageUrl: {
    type: String,
    default: 'https://placehold.co/400x300?text=Sin+imagen'
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'La categoría es obligatoria']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'El stock no puede ser negativo'],
    validate: {
      validator: Number.isInteger,
      message: 'El stock debe ser un número entero'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
