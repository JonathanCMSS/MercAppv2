<template>
  <div class="container">
    <div v-if="loading" class="spinner-wrap"><div class="spinner"></div></div>

    <div v-else-if="error" class="alert alert-error">
      ⚠️ {{ error }}
      <RouterLink to="/" class="btn btn-ghost btn-sm">Volver</RouterLink>
    </div>

    <template v-else-if="data">
      <div class="breadcrumb">
        <RouterLink to="/">Catálogo</RouterLink> / {{ data.name }}
      </div>

      <div class="detail-grid">
        <!-- Imagen -->
        <div class="detail-img-wrap">
          <img
            :src="data.imageUrl"
            :alt="data.name"
            class="detail-img"
            @error="e => e.target.src='https://placehold.co/600x450?text=Sin+imagen'"
          />
        </div>

        <!-- Info -->
        <div class="detail-info">
          <span class="badge badge-primary">{{ data.categoryId?.name }}</span>
          <h1>{{ data.name }}</h1>
          <p class="detail-price">${{ data.price.toFixed(2) }}</p>
          <p class="detail-desc">{{ data.description }}</p>

          <div class="stock-info">
            <span :class="['badge', data.stock > 0 ? 'badge-success' : 'badge-danger']">
              {{ data.stock > 0 ? `${data.stock} en stock` : 'Agotado' }}
            </span>
          </div>

          <div class="detail-actions">
            <button
              class="btn btn-primary"
              :disabled="data.stock === 0"
              @click="addToCart"
            >
              🛒 Añadir al carrito
            </button>
            <RouterLink :to="`/product/${data._id}/edit`" class="btn btn-ghost">
              ✏️ Editar
            </RouterLink>
            <button class="btn btn-danger" @click="deleteProduct">🗑️ Eliminar</button>
          </div>

          <div v-if="addedMsg" class="alert alert-success" style="margin-top:1rem">
            ✅ {{ addedMsg }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useFetch } from '@/composables/useFetch'
import { productsService } from '@/services/api'
import { useCartStore } from '@/stores/cart'

const route   = useRoute()
const router  = useRouter()
const cart    = useCartStore()
const addedMsg = ref('')

const { data, loading, error, execute } = useFetch(productsService.getById)

onMounted(() => execute(route.params.id))

function addToCart() {
  cart.addItem(data.value)
  addedMsg.value = `"${data.value.name}" añadido al carrito`
  setTimeout(() => addedMsg.value = '', 2000)
}

async function deleteProduct() {
  if (!confirm('¿Eliminar este producto?')) return
  try {
    await productsService.remove(route.params.id)
    router.push('/')
  } catch (e) {
    alert('Error al eliminar: ' + e.message)
  }
}
</script>

<style scoped>
.breadcrumb { margin-bottom: 1.25rem; font-size: .9rem; color: var(--text-muted); }
.breadcrumb a { color: var(--primary); text-decoration: none; }
.detail-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem;
}
.detail-img { width: 100%; border-radius: var(--radius); object-fit: cover; max-height: 420px; }
.detail-info { display: flex; flex-direction: column; gap: .85rem; }
.detail-info h1 { font-size: 1.8rem; font-weight: 800; }
.detail-price { font-size: 2rem; font-weight: 800; color: var(--primary); }
.detail-desc { color: var(--text-muted); line-height: 1.7; }
.detail-actions { display: flex; gap: .75rem; flex-wrap: wrap; }
button:disabled { opacity: .5; cursor: not-allowed; }

@media (max-width: 640px) {
  .detail-grid { grid-template-columns: 1fr; }
}
</style>
