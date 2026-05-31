<template>
  <div class="container">
    <div class="not-found">
      <div class="code">404</div>
      <h1>Página no encontrada</h1>
      <p>La ruta que buscas no existe o fue movida.</p>
      <RouterLink to="/" class="btn btn-primary">🏠 Ir al catálogo</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  text-align: center; padding: 4rem 1rem;
  display: flex; flex-direction: column; align-items: center; gap: 1rem;
}
.code {
  font-size: 6rem; font-weight: 900; color: var(--border);
  line-height: 1;
}
.not-found h1 { font-size: 1.5rem; font-weight: 700; }
.not-found p { color: var(--text-muted); }
</style>
