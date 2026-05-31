// VITE_API_URL se define en .env / variables de entorno de Netlify
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    ...options
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.errors?.join(', ') || data.error || 'Error en la solicitud')
  return data
}

// ── Products ──────────────────────────────────────────────────────
export const productsService = {
  getAll:  (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/products${qs ? '?' + qs : ''}`)
  },
  getById:  (id)       => request(`/products/${id}`),
  create:   (data)     => request('/products',      { method: 'POST',   body: JSON.stringify(data) }),
  update:   (id, data) => request(`/products/${id}`, { method: 'PUT',   body: JSON.stringify(data) }),
  remove:   (id)       => request(`/products/${id}`, { method: 'DELETE' })
}

// ── Categories ────────────────────────────────────────────────────
export const categoriesService = {
  getAll: () => request('/categories')
}
