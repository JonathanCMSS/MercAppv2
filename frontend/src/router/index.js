import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'   // carga inmediata (ruta principal)

// Lazy loading para rutas secundarias (Tarea 10)
const ProductDetailView = () => import('@/views/ProductDetailView.vue')
const ProductFormView   = () => import('@/views/ProductFormView.vue')
const CartView          = () => import('@/views/CartView.vue')
const AboutView         = () => import('@/views/AboutView.vue')
const NotFoundView      = () => import('@/views/NotFoundView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Catálogo' }
  },
  {
    path: '/product/new',
    name: 'product-new',
    component: ProductFormView,
    meta: { title: 'Nuevo Producto' }
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetailView,
    meta: { title: 'Detalle del Producto' }
  },
  {
    path: '/product/:id/edit',
    name: 'product-edit',
    component: ProductFormView,
    meta: { title: 'Editar Producto' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: { title: 'Carrito' }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: 'Acerca de' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: '404 - No encontrado' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// Actualizar título de la pestaña
router.afterEach(to => {
  document.title = `${to.meta.title || 'MercApp'} | MercApp`
})

export default router
