<template>
  <div class="container">
    <div class="page-header">
      <h1>{{ isEdit ? '✏️ Editar Producto' : '➕ Nuevo Producto' }}</h1>
      <RouterLink to="/" class="btn btn-ghost">← Volver</RouterLink>
    </div>

    <div v-if="loadingData" class="spinner-wrap"><div class="spinner"></div></div>

    <form v-else class="product-form card" @submit.prevent="onSubmit" novalidate>
      <!-- Nombre -->
      <div class="form-group">
        <label for="name">Nombre *</label>
        <input id="name" v-model.trim="form.name" type="text" placeholder="Ej: Laptop HP" />
        <span v-if="errs.name" class="error-msg">{{ errs.name }}</span>
      </div>

      <!-- Descripción -->
      <div class="form-group">
        <label for="description">Descripción *</label>
        <textarea id="description" v-model.trim="form.description" rows="3" placeholder="Describe el producto..."></textarea>
        <span v-if="errs.description" class="error-msg">{{ errs.description }}</span>
      </div>

      <!-- Precio y Stock -->
      <div class="form-row">
        <div class="form-group">
          <label for="price">Precio (USD) *</label>
          <input id="price" v-model.number="form.price" type="number" step="0.01" min="0.01" placeholder="0.00" />
          <span v-if="errs.price" class="error-msg">{{ errs.price }}</span>
        </div>
        <div class="form-group">
          <label for="stock">Stock *</label>
          <input id="stock" v-model.number="form.stock" type="number" min="0" step="1" placeholder="0" />
          <span v-if="errs.stock" class="error-msg">{{ errs.stock }}</span>
        </div>
      </div>

      <!-- Categoría -->
      <div class="form-group">
        <label for="category">Categoría *</label>
        <select id="category" v-model="form.categoryId">
          <option value="">-- Selecciona una categoría --</option>
          <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
        </select>
        <span v-if="errs.categoryId" class="error-msg">{{ errs.categoryId }}</span>
      </div>

      <!-- URL Imagen -->
      <div class="form-group">
        <label for="imageUrl">URL de imagen</label>
        <input id="imageUrl" v-model.trim="form.imageUrl" type="url" placeholder="https://..." />
        <span v-if="errs.imageUrl" class="error-msg">{{ errs.imageUrl }}</span>
      </div>

      <!-- Preview imagen -->
      <div v-if="form.imageUrl && !errs.imageUrl" class="img-preview">
        <img :src="form.imageUrl" alt="Preview" @error="e => e.target.style.display='none'" />
      </div>

      <!-- Errores globales -->
      <div v-if="apiError" class="alert alert-error">⚠️ {{ apiError }}</div>
      <div v-if="successMsg" class="alert alert-success">✅ {{ successMsg }}</div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          {{ submitting ? 'Guardando...' : (isEdit ? 'Guardar cambios' : 'Crear producto') }}
        </button>
        <RouterLink to="/" class="btn btn-ghost">Cancelar</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { categoriesService, productsService } from '@/services/api'

const route   = useRoute()
const router  = useRouter()

const isEdit  = computed(() => !!route.params.id && route.path.includes('/edit'))

const form = reactive({
  name: '', description: '', price: '', stock: 0,
  categoryId: '', imageUrl: ''
})
const errs       = reactive({})
const apiError   = ref('')
const successMsg = ref('')
const submitting = ref(false)
const loadingData= ref(false)
const categories = ref([])

// Cargar categorías y datos del producto si es edición
onMounted(async () => {
  loadingData.value = true
  try {
    categories.value = await categoriesService.getAll()
    if (isEdit.value) {
      const p = await productsService.getById(route.params.id)
      form.name        = p.name
      form.description = p.description
      form.price       = p.price
      form.stock       = p.stock
      form.categoryId  = p.categoryId?._id || p.categoryId
      form.imageUrl    = p.imageUrl || ''
    }
  } catch (e) {
    apiError.value = e.message
  }
  loadingData.value = false
})

// Validación frontend (Tarea 9)
function validate() {
  Object.keys(errs).forEach(k => delete errs[k])
  if (!form.name)             errs.name = 'El nombre es obligatorio'
  if (!form.description)      errs.description = 'La descripción es obligatoria'
  if (!form.price || form.price <= 0) errs.price = 'El precio debe ser mayor a 0'
  if (form.stock < 0 || !Number.isInteger(Number(form.stock))) errs.stock = 'El stock debe ser un entero ≥ 0'
  if (!form.categoryId)       errs.categoryId = 'La categoría es obligatoria'
  if (form.imageUrl) {
    try { new URL(form.imageUrl) } catch { errs.imageUrl = 'URL de imagen no válida' }
  }
  return Object.keys(errs).length === 0
}

async function onSubmit() {
  apiError.value = ''
  if (!validate()) return

  submitting.value = true
  try {
    if (isEdit.value) {
      await productsService.update(route.params.id, { ...form })
      successMsg.value = 'Producto actualizado correctamente'
    } else {
      await productsService.create({ ...form })
      successMsg.value = 'Producto creado correctamente'
    }
    setTimeout(() => router.push('/'), 1000)
  } catch (e) {
    apiError.value = e.message
  }
  submitting.value = false
}
</script>

<style scoped>
.product-form { padding: 1.75rem; max-width: 680px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-actions { display: flex; gap: .75rem; margin-top: .5rem; }
.img-preview { margin-top: -.5rem; margin-bottom: .5rem; }
.img-preview img { max-height: 140px; border-radius: 8px; object-fit: cover; }
button:disabled { opacity: .6; cursor: not-allowed; }
@media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
</style>
