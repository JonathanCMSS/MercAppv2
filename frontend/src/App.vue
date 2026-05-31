<template>
  <div id="app-layout">
    <header class="navbar">
      <div class="container nav-inner">
        <RouterLink to="/" class="nav-brand">
          🛒 MercApp
        </RouterLink>

        <button class="nav-toggle" @click="menuOpen = !menuOpen" aria-label="Menú">
          {{ menuOpen ? '✕' : '☰' }}
        </button>

        <nav :class="['nav-links', { open: menuOpen }]" @click="menuOpen = false">
          <RouterLink to="/"      class="nav-link">Catálogo</RouterLink>
          <RouterLink to="/about" class="nav-link">Acerca de</RouterLink>
          <RouterLink to="/cart"  class="nav-link nav-cart">
            🛍️ Carrito
            <span v-if="cart.totalItems > 0" class="cart-badge">{{ cart.totalItems }}</span>
          </RouterLink>
          <RouterLink to="/product/new" class="btn btn-primary btn-sm">+ Nuevo</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <!-- Suspense para lazy loading (Tarea 10) -->
      <Suspense>
        <RouterView />
        <template #fallback>
          <div class="spinner-wrap"><div class="spinner"></div></div>
        </template>
      </Suspense>
    </main>

    <footer class="footer">
      <div class="container">
        <p>© 2025 MercApp — Jonathan Macias · Universidad Politécnica Salesiana</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cart     = useCartStore()
const menuOpen = ref(false)
</script>

<style scoped>
.navbar {
  background: #fff;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  position: sticky; top: 0; z-index: 100;
}
.nav-inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 60px;
}
.nav-brand {
  font-size: 1.3rem; font-weight: 800; color: var(--primary);
  text-decoration: none; letter-spacing: -0.5px;
}
.nav-links {
  display: flex; align-items: center; gap: 1.1rem;
}
.nav-link {
  text-decoration: none; color: var(--text-muted);
  font-weight: 500; font-size: .95rem;
  transition: color var(--transition);
  position: relative;
}
.nav-link:hover, .nav-link.router-link-active { color: var(--primary); }
.nav-cart { display: flex; align-items: center; gap: .3rem; }
.cart-badge {
  background: var(--danger); color: #fff;
  border-radius: 50%; width: 18px; height: 18px;
  font-size: .7rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.nav-toggle { display: none; background: none; border: none; font-size: 1.3rem; cursor: pointer; }
.main-content { min-height: calc(100vh - 120px); padding: 1.5rem 0; }
.footer {
  background: var(--text); color: #94a3b8;
  text-align: center; padding: 1rem;
  font-size: .85rem; margin-top: 2rem;
}

@media (max-width: 640px) {
  .nav-toggle { display: block; }
  .nav-links {
    display: none; position: absolute; top: 60px; left: 0; right: 0;
    background: #fff; flex-direction: column; align-items: flex-start;
    padding: 1rem 1.25rem; gap: .75rem;
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow);
  }
  .nav-links.open { display: flex; }
}
</style>
