import { ref, computed } from 'vue'
import { productsService, categoriesService } from '@/services/api'
import { useFetch } from './useFetch'

/**
 * Composable específico para productos (Tarea 8)
 */
export function useProducts() {
  const search     = ref('')
  const categoryId = ref('')

  const { data: products,   loading: loadingProducts,   error: errorProducts,   execute: fetchProducts }   = useFetch(productsService.getAll)
  const { data: categories, loading: loadingCategories, error: errorCategories, execute: fetchCategories } = useFetch(categoriesService.getAll)

  // Propiedad computada: lista visible (Tarea 6)
  const visibleProducts = computed(() => {
    if (!products.value) return []
    let list = products.value
    const q = search.value.trim().toLowerCase()
    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }
    if (categoryId.value) {
      list = list.filter(p =>
        (p.categoryId?._id || p.categoryId) === categoryId.value
      )
    }
    return list
  })

  async function loadAll() {
    await fetchCategories()
    await fetchProducts()
  }

  return {
    search, categoryId,
    products, categories, visibleProducts,
    loadingProducts, loadingCategories,
    errorProducts, errorCategories,
    loadAll, fetchProducts
  }
}
