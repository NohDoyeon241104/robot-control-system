import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue')
      }
    ]
  },
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'control',
        name: 'RobotControl',
        component: () => import('@/views/RobotControl.vue')
      },
      {
        path: 'map',
        name: 'MapView',
        component: () => import('@/views/MapView.vue')
      },
      {
        path: 'equipment',
        name: 'EquipmentManagement',
        component: () => import('@/views/EquipmentManagement.vue')
      },
      {
        path: 'monitoring',
        name: 'MonitoringLogs',
        component: () => import('@/views/MonitoringLogs.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

export default routes
