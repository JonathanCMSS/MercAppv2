<template>
  <div class="container">
    <div class="page-header">
      <h1>🛍️ Carrito de Compras</h1>
      <RouterLink to="/" class="btn btn-ghost">← Seguir comprando</RouterLink>
    </div>

    <!-- Vacío -->
    <div v-if="cart.items.length === 0" class="empty-state">
      <div class="icon">🛒</div>
      <p>Tu carrito está vacío.</p>
      <RouterLink to="/" class="btn btn-primary" style="margin-top:.75rem">Ver catálogo</RouterLink>
    </div>

    <!-- Items -->
    <div v-else class="cart-layout">
      <div class="cart-items">
        <div v-for="item in cart.items" :key="item._id" class="cart-item card">
          <img :src="item.imageUrl" :alt="item.name" class="item-img"
               @error="e => e.target.src='https://placehold.co/80x80?text=?'" />

          <div class="item-info">
            <RouterLink :to="`/product/${item._id}`" class="item-name">{{ item.name }}</RouterLink>
            <span class="item-unit">${{ item.price.toFixed(2) }} c/u</span>
          </div>

          <div class="item-qty">
            <button class="qty-btn" @click="cart.updateQty(item._id, item.qty - 1)">−</button>
            <span class="qty-val">{{ item.qty }}</span>
            <button class="qty-btn" @click="cart.updateQty(item._id, item.qty + 1)">+</button>
          </div>

          <span class="item-subtotal">${{ (item.price * item.qty).toFixed(2) }}</span>

          <button class="btn btn-danger btn-sm" @click="cart.removeItem(item._id)">🗑️</button>
        </div>
      </div>

      <!-- Resumen -->
      <aside class="cart-summary card">
        <h2>Resumen del pedido</h2>
        <div class="summary-row">
          <span>Artículos ({{ cart.totalItems }})</span>
          <span>${{ cart.totalPrice.toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ cart.totalPrice.toFixed(2) }}</span>
        </div>
        <button class="btn btn-primary" style="width:100%; justify-content:center">
          Proceder al pago
        </button>
        <button class="btn btn-ghost" style="width:100%; justify-content:center; margin-top:.5rem"
                @click="cart.clearCart">
          Vaciar carrito
        </button>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()
</script>

<style scoped>
.cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; align-items: start; }
.cart-item {
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem; margin-bottom: .75rem;
}
.item-img { width: 72px; height: 72px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
.item-info { flex: 1; }
.item-name { font-weight: 600; color: var(--text); text-decoration: none; display: block; }
.item-name:hover { color: var(--primary); }
.item-unit { font-size: .85rem; color: var(--text-muted); }
.item-qty { display: flex; align-items: center; gap: .4rem; }
.qty-btn {
  width: 28px; height: 28px; border-radius: 6px; border: 1.5px solid var(--border);
  background: var(--surface); cursor: pointer; font-size: 1rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  transition: background .15s;
}
.qty-btn:hover { background: var(--border); }
.qty-val { font-weight: 700; min-width: 24px; text-align: center; }
.item-subtotal { font-weight: 700; min-width: 70px; text-align: right; }
.cart-summary { padding: 1.5rem; position: sticky; top: 80px; }
.cart-summary h2 { font-size: 1.1rem; margin-bottom: 1rem; }
.summary-row { display: flex; justify-content: space-between; padding: .5rem 0; border-bottom: 1px solid var(--border); font-size: .95rem; }
.summary-row.total { font-size: 1.1rem; font-weight: 800; border-bottom: none; margin: .5rem 0 1rem; }

@media (max-width: 700px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-item { flex-wrap: wrap; }
}
</style>
