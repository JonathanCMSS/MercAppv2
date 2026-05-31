require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');

const productRoutes  = require('./routes/products');
const categoryRoutes = require('./routes/categories');

const app = express();

// ── CORS ─────────────────────────────────────────────────────────
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (Postman, Railway health checks)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origen no permitido → ${origin}`));
  },
  credentials: true
}));

app.use(express.json());

// ── Health check ─────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// ── Rutas API ─────────────────────────────────────────────────────
app.use('/api/products',   productRoutes);
app.use('/api/categories', categoryRoutes);

// Ruta raíz informativa
app.get('/', (req, res) => {
  res.json({ message: 'MercApp API v1.0', status: 'OK', health: '/health' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor', detail: err.message });
});

// ── MongoDB + Servidor ────────────────────────────────────────────
const PORT      = process.env.PORT      || 3001;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mercapp';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado');
    app.listen(PORT, () =>
      console.log(`🚀 API corriendo en http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('❌ Error MongoDB:', err.message);
    process.exit(1);
  });
