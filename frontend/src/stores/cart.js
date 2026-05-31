import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Store del carrito con Pinia (Tarea 11)
 * Persistencia en localStorage
 */
export const useCartStore = defineStore('cart', () => {
  // Estado: cargar desde localStorage
  const items = ref(JSON.parse(localStorage.getItem('mercapp-cart') || '[]'))

  // Guardar en localStorage cada vez que cambia
  function save() {
    localStorage.setItem('mercapp-cart', JSON.stringify(items.value))
  }

  // Total de items (cantidad)
  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty, 0)
  )

  // Total en dinero
  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )

  function addItem(product) {
    const existing = items.value.find(i => i._id === product._id)
    if (existing) {
      existing.qty++
    } else {
      items.value.push({
        _id:      product._id,
        name:     product.name,
        price:    product.price,
        imageUrl: product.imageUrl,
        qty:      1
      })
    }
    save()
  }

  function removeItem(productId) {
    items.value = items.value.filter(i => i._id !== productId)
    save()
  }

  function updateQty(productId, qty) {
    const item = items.value.find(i => i._id === productId)
    if (!item) return
    if (qty <= 0) {
      removeItem(productId)
    } else {
      item.qty = qty
      save()
    }
  }

  function clearCart() {
    items.value = []
    save()
  }

  return { items, totalItems, totalPrice, addItem, removeItem, updateQty, clearCart }
})
