import { ref } from 'vue'

/**
 * Composable genérico para peticiones asíncronas (Tarea 8)
 * Provee: data, loading, error + reintento automático (1 vez)
 */
export function useFetch(fetcher) {
  const data    = ref(null)
  const loading = ref(false)
  const error   = ref(null)
  let controller = null

  async function execute(...args) {
    // Cancelar petición anterior si existe
    if (controller) controller.abort()
    controller = new AbortController()

    loading.value = true
    error.value   = null

    let attempts = 0
    while (attempts < 2) {
      try {
        data.value = await fetcher(...args)
        break
      } catch (err) {
        attempts++
        if (err.name === 'AbortError') break      // cancelado, no reintentar
        if (attempts >= 2) {
          error.value = err.message || 'Error desconocido'
        } else {
          await new Promise(r => setTimeout(r, 800)) // espera antes de reintentar
        }
      }
    }

    loading.value = false
  }

  function cancel() {
    if (controller) controller.abort()
  }

  return { data, loading, error, execute, cancel }
}
