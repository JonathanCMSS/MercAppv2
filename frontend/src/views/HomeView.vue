<template>
  <div class="container">
    <!-- Header -->
    <div class="page-header">
      <h1>🏪 Catálogo de Productos</h1>
      <RouterLink to="/product/new" class="btn btn-primary">+ Nuevo Producto</RouterLink>
    </div>

    <!-- Filtros y búsqueda (Tarea 6) -->
    <div class="filters-bar">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input
          v-model="search"
          type="text"
          placeholder="Buscar por nombre o descripción..."
          class="search-input"
        />
        <button v-if="search" class="clear-btn" @click="search = ''">✕</button>
      </div>

      <select v-model="categoryId" class="category-select">
        <option value="">Todas las categorías</option>
        <option
          v-for="cat in categories"
          :key="cat._id"
          :value="cat._id"
        >{{ cat.name }}</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="loadingProducts" class="spinner-wrap">
      <div class="spinner"></div>
    </div>

    <!-- Error -->
    <div v-else-if="errorProducts" class="alert alert-error">
      ⚠️ {{ errorProducts }}
      <button class="btn btn-ghost btn-sm" @click="loadAll">Reintentar</button>
    </div>

    <!-- Empty state -->
    <div v-else-if="visibleProducts.length === 0" class="empty-state">
      <div class="icon">📦</div>
      <p>{{ search || categoryId ? 'No hay productos que coincidan.' : 'Aún no hay productos.' }}</p>
      <RouterLink v-if="!search && !categoryId" to="/product/new" class="btn btn-primary" style="margin-top:.75rem">
        Agregar el primero
      </RouterLink>
    </div>

    <!-- Grid de productos -->
    <div v-else class="products-grid">
      <ProductCard
        v-for="product in visibleProducts"
        :key="product._id"
        :product="product"
        @added-to-cart="onAddToCart"
        @delete="onDelete"
      />
    </div>

    <!-- Toast de confirmación -->
    <Transition name="toast">
      <div v-if="toast" class="toast">{{ toast }}</div>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard   from '@/components/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'
import { useCartStore } from '@/stores/cart'
import { productsService } from '@/services/api'

const { search, categoryId, categories, visibleProducts, loadingProducts, errorProducts, loadAll } = useProducts()
const cart  = useCartStore()
const toast = ref('')

onMounted(loadAll)

function showToast(msg) {
  toast.value = msg
  setTimeout(() => toast.value = '', 2200)
}

function onAddToCart(product) {
  cart.addItem(product)
  showToast(`✅ "${product.name}" añadido al carrito`)
}

async function onDelete(id) {
  if (!confirm('¿Eliminar este producto?')) return
  try {
    await productsService.remove(id)
    showToast('🗑️ Producto eliminado')
    await loadAll()
  } catch (e) {
    showToast('❌ Error al eliminar: ' + e.message)
  }
}
</script>

<style scoped>
.filters-bar {
  display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;
}
.search-wrap {
  flex: 1; min-width: 220px; position: relative; display: flex; align-items: center;
}
.search-icon { position: absolute; left: .75rem; font-size: .9rem; }
.search-input {
  width: 100%; padding: .6rem .9rem .6rem 2.2rem;
  border: 1.5px solid var(--border); border-radius: 6px;
  font-size: .95rem; transition: border-color .2s;
}
.search-input:focus { outline: none; border-color: var(--primary); }
.clear-btn {
  position: absolute; right: .6rem; background: none; border: none;
  cursor: pointer; color: var(--text-muted); font-size: .9rem;
}
.category-select {
  padding: .6rem .9rem; border: 1.5px solid var(--border);
  border-radius: 6px; font-size: .95rem; min-width: 180px;
  background: var(--surface); color: var(--text);
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.4rem;
}
.toast {
  position: fixed; bottom: 1.5rem; right: 1.5rem;
  background: #1e293b; color: #fff; padding: .75rem 1.25rem;
  border-radius: 8px; font-size: .9rem; z-index: 999;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
.toast-enter-active, .toast-leave-active { transition: all .3s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }
</style>
