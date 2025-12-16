import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModelsView from '../views/ModelsView.vue'
import DatasetsView from '../views/DatasetsView.vue'
import ResearchView from '../views/ResearchView.vue'
import BrandView from '../views/BrandView.vue'
import AboutView from '../views/AboutView.vue'
import DetailView from '../views/DetailView.vue'
import ModelDetailView from '../views/ModelDetailView.vue'
import DatasetDetailView from '../views/DatasetDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/models',
      name: 'models',
      component: ModelsView,
    },
    {
      path: '/models/:id',
      name: 'model-detail',
      component: ModelDetailView,
    },
    {
      path: '/datasets',
      name: 'datasets',
      component: DatasetsView,
    },
    {
      path: '/datasets/:id',
      name: 'dataset-detail',
      component: DatasetDetailView,
    },
    {
      path: '/research',
      name: 'research',
      component: ResearchView,
    },
    {
      path: '/research/:id',
      name: 'research-detail',
      component: DetailView,
    },
    {
      path: '/brand',
      name: 'brand',
      component: BrandView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/legal/:type',
      name: 'legal',
      component: () => import('../views/LegalView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
})

export default router
