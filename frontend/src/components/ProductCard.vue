<template>
  <article class="card product-card">
    <RouterLink :to="`/product/${product._id}`" class="card-img-link">
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="card-img"
        loading="lazy"
        @error="onImgError"
      />
    </RouterLink>

    <div class="card-body">
      <span class="badge badge-primary">{{ product.categoryId?.name || 'Sin categoría' }}</span>
      <RouterLink :to="`/product/${product._id}`" class="card-title">
        {{ product.name }}
      </RouterLink>
      <p class="card-desc">{{ truncate(product.description, 80) }}</p>

      <div class="card-footer">
        <span class="price">${{ product.price.toFixed(2) }}</span>
        <span :class="['badge', product.stock > 0 ? 'badge-success' : 'badge-danger']">
          {{ product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado' }}
        </span>
      </div>

      <div class="card-actions">
        <button
          class="btn btn-primary btn-sm"
          :disabled="product.stock === 0"
          @click="$emit('added-to-cart', product)"
        >
          🛒 Añadir
        </button>
        <RouterLink :to="`/product/${product._id}/edit`" class="btn btn-ghost btn-sm">
          ✏️ Editar
        </RouterLink>
        <button class="btn btn-danger btn-sm" @click="$emit('delete', product._id)">
          🗑️
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  product: { type: Object, required: true }
})

defineEmits(['added-to-cart', 'delete'])

function truncate(str, n) {
  return str?.length > n ? str.slice(0, n) + '…' : str
}
function onImgError(e) {
  e.target.src = 'https://placehold.co/400x300?text=Sin+imagen'
}
</script>

<style scoped>
.product-card { display: flex; flex-direction: column; height: 100%; }
.card-img-link { display: block; overflow: hidden; }
.card-img { width: 100%; height: 200px; object-fit: cover; transition: transform .3s; }
.card-img-link:hover .card-img { transform: scale(1.04); }
.card-body { padding: 1rem; display: flex; flex-direction: column; gap: .5rem; flex: 1; }
.card-title {
  font-size: 1rem; font-weight: 700; color: var(--text);
  text-decoration: none; line-height: 1.3;
}
.card-title:hover { color: var(--primary); }
.card-desc { font-size: .85rem; color: var(--text-muted); flex: 1; }
.card-footer { display: flex; align-items: center; justify-content: space-between; }
.price { font-size: 1.2rem; font-weight: 800; color: var(--primary); }
.card-actions { display: flex; gap: .4rem; flex-wrap: wrap; }
button:disabled { opacity: .5; cursor: not-allowed; }
</style>
