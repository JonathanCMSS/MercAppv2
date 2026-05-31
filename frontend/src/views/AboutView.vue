<template>
  <div class="container">
    <div class="about-card card">
      <h1>🛒 Acerca de MercApp</h1>
      <p class="subtitle">Catálogo de productos con SPA + API REST — Unidad 3</p>

      <div class="about-grid">
        <div class="info-section">
          <h2>📋 Descripción</h2>
          <p>
            MercApp es una aplicación web de una sola página (SPA) desarrollada con
            <strong>Vue 3</strong> (Composition API + SFC) que consume una API REST
            construida con <strong>Express.js</strong> y <strong>MongoDB</strong>.
          </p>
        </div>

        <div class="info-section">
          <h2>⚙️ Funcionalidades</h2>
          <ul>
            <li>✅ CRUD completo de productos</li>
            <li>✅ Buscador en tiempo real</li>
            <li>✅ Filtro por categoría</li>
            <li>✅ Carrito con persistencia en localStorage</li>
            <li>✅ Rutas dinámicas con Vue Router</li>
            <li>✅ Lazy loading de vistas</li>
            <li>✅ Composables (useFetch, useProducts)</li>
            <li>✅ Estado global con Pinia</li>
            <li>✅ Validación de formularios</li>
            <li>✅ Diseño responsivo mobile-first</li>
          </ul>
        </div>

        <div class="info-section">
          <h2>🛠️ Tecnologías</h2>
          <div class="tech-tags">
            <span class="badge badge-primary">Vue 3</span>
            <span class="badge badge-primary">Vite</span>
            <span class="badge badge-primary">Vue Router 4</span>
            <span class="badge badge-primary">Pinia</span>
            <span class="badge badge-success">Express.js</span>
            <span class="badge badge-success">MongoDB</span>
            <span class="badge badge-success">Mongoose</span>
          </div>
        </div>

        <div class="info-section">
          <h2>👨‍💻 Estudiante</h2>
          <p><strong>Nombre:</strong> Jonathan Macias</p>
          <p><strong>Materia:</strong> Aplicaciones Web</p>
          <p><strong>Universidad:</strong> Universidad Politécnica Salesiana</p>
          <p><strong>Unidad:</strong> 3 — Programación del lado del cliente</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.about-card { padding: 2rem; max-width: 860px; margin: 0 auto; }
.about-card h1 { font-size: 2rem; font-weight: 800; margin-bottom: .25rem; }
.subtitle { color: var(--text-muted); margin-bottom: 1.75rem; font-size: 1.05rem; }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.75rem; }
.info-section h2 { font-size: 1.05rem; font-weight: 700; margin-bottom: .75rem; }
.info-section p { margin-bottom: .4rem; color: var(--text-muted); }
.info-section ul { list-style: none; display: flex; flex-direction: column; gap: .35rem; }
.info-section li { color: var(--text-muted); font-size: .95rem; }
.tech-tags { display: flex; flex-wrap: wrap; gap: .5rem; }
@media (max-width: 600px) { .about-grid { grid-template-columns: 1fr; } }
</style>
