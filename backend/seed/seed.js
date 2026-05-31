require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product  = require('../models/Product');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mercapp';

const categorias = [
  { name: 'Electrónica' },
  { name: 'Ropa' },
  { name: 'Alimentos' },
  { name: 'Hogar' },
  { name: 'Deportes' }
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ MongoDB conectado');

  // Limpiar colecciones
  await Category.deleteMany({});
  await Product.deleteMany({});
  console.log('🗑️  Colecciones limpiadas');

  // Insertar categorías
  const cats = await Category.insertMany(categorias);
  const byName = Object.fromEntries(cats.map(c => [c.name, c._id]));
  console.log('📂 Categorías creadas:', cats.map(c => c.name).join(', '));

  // Insertar productos
  const productos = [
    {
      name: 'Laptop Lenovo IdeaPad',
      description: 'Laptop 15" Intel Core i5, 8GB RAM, 512GB SSD. Ideal para trabajo y estudio.',
      price: 749.99,
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
      categoryId: byName['Electrónica'],
      stock: 12
    },
    {
      name: 'Audífonos Sony WH-1000XM4',
      description: 'Auriculares inalámbricos con cancelación de ruido líder en la industria.',
      price: 279.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
      categoryId: byName['Electrónica'],
      stock: 25
    },
    {
      name: 'Smartphone Samsung Galaxy A54',
      description: 'Pantalla AMOLED 6.4", cámara 50MP, batería 5000mAh, 5G.',
      price: 399.99,
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
      categoryId: byName['Electrónica'],
      stock: 8
    },
    {
      name: 'Camiseta Polo Ralph Lauren',
      description: 'Camiseta polo clásica de algodón piqué. Disponible en varios colores.',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80',
      categoryId: byName['Ropa'],
      stock: 50
    },
    {
      name: 'Jeans Levi\'s 511',
      description: 'Jeans slim fit de mezclilla premium. Corte moderno y cómodo.',
      price: 69.99,
      imageUrl: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&q=80',
      categoryId: byName['Ropa'],
      stock: 30
    },
    {
      name: 'Café Orgánico Galápagos',
      description: 'Café de altura 100% orgánico, tostado artesanalmente. 500g.',
      price: 14.99,
      imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',
      categoryId: byName['Alimentos'],
      stock: 100
    },
    {
      name: 'Aceite de Oliva Extra Virgen',
      description: 'Aceite premium prensado en frío, importado de España. 750ml.',
      price: 18.50,
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
      categoryId: byName['Alimentos'],
      stock: 60
    },
    {
      name: 'Licuadora Oster Pro',
      description: 'Licuadora de alta potencia 900W, vaso de vidrio 1.5L, 10 velocidades.',
      price: 59.99,
      imageUrl: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80',
      categoryId: byName['Hogar'],
      stock: 20
    },
    {
      name: 'Juego de Sábanas 500 hilos',
      description: 'Sábanas de algodón egipcio 500 hilos. Set incluye sábana plana, ajustable y 2 fundas.',
      price: 45.00,
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      categoryId: byName['Hogar'],
      stock: 35
    },
    {
      name: 'Bicicleta de Montaña Trek',
      description: 'Bicicleta MTB 29", marco de aluminio, 21 velocidades, frenos de disco.',
      price: 499.99,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      categoryId: byName['Deportes'],
      stock: 5
    },
    {
      name: 'Colchoneta de Yoga Premium',
      description: 'Mat antideslizante 6mm de grosor, material TPE ecológico, 183x61cm.',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80',
      categoryId: byName['Deportes'],
      stock: 40
    },
    {
      name: 'Smartwatch Garmin Venu 2',
      description: 'Reloj GPS con monitoreo de salud avanzado, 25 modos deportivos, AMOLED.',
      price: 329.99,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      categoryId: byName['Electrónica'],
      stock: 15
    }
  ];

  await Product.insertMany(productos);
  console.log(`✅ ${productos.length} productos creados`);

  await mongoose.disconnect();
  console.log('🎉 Semilla completada exitosamente');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error en semilla:', err);
  process.exit(1);
});
