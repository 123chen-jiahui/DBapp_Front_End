// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import {
  layout,
  route,
} from '@/util/routes'
import Login from '@/views/Login'
import Register from '@/views/Register'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    layout('Default', [
      route('Dashboard'),
      // Pages
      route('Clinic', null, 'clinic'),

      // Components
      route('Notifications', null, 'components/notifications'),
      route('Icons', null, 'components/icons'),
      route('Typography', null, 'components/typography'),

      // Tables
      route('Regular Tables', null, 'tables/regular'),

      // Maps
      route('Google Maps', null, 'maps/google'),

      route('Registration', null, 'registration'),
      route('RegistrationInfo', null, 'registrationinfo'),
      route('PurchaseList', null, 'purchaselist'),
      route('TransactionProcess', null, 'transaction'),
      route('Records', null, 'records'),

      route('BasicInfo', null, 'basicinfo'),
      route('LeaveAndResign', null, 'leaveandresign'),
    ]),
    {
      name: 'Login',
      component: Login,
      path: '/login',
    },
    {
      name: 'Register',
      component: Register,
      path: '/register',
    },
    {
      name: 'PurchaseList',
      component: () => import('../views/PurchaseList.vue'),
      path: '/purchaselist',
    },
    {
      name: 'TransactionProcess',
      component: () => import('../views/TransactionProcess.vue'),
      path: '/transaction',
    }
  ],
})

router.beforeEach((to, from, next) => {
  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})

export default router
