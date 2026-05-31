const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre de categoría es obligatorio'],
    trim: true,
    unique: true,
    maxlength: [50, 'Máximo 50 caracteres']
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
