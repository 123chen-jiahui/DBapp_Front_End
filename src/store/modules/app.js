// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  jwt: '',
  items: [
    // 0↓
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/dashboard',
    },
    // 1↓
    {
      title: '工作管理（门诊）',
      icon: 'mdi-doctor',
      to: '/clinic',
    },
    // 2↓
    {
      title: 'Regular Tables',
      icon: 'mdi-clipboard-outline',
      to: '/tables/regular/',
    },
    // 3↓
    {
      title: 'Typography',
      icon: 'mdi-format-font',
      to: '/components/typography/',
    },
    // 4↓
    {
      title: 'Icons',
      icon: 'mdi-chart-bubble',
      to: '/components/icons/',
    },
    // 5↓
    {
      title: 'Google Maps',
      icon: 'mdi-map-marker',
      to: '/maps/google/',
    },
    // 6↓
    {
      title: '订单缴费',
      icon: 'mdi-bell',
      to: '/components/notifications/',
    },
    // 7↓
    {
      title: '我要挂号',
      icon: 'mdi-hospital-building',
      to: '/registration',
    },
    // 8↓
    {
      title: '挂号信息',
      icon: 'mdi-folder-information-outline',
      to: '/registrationinfo'
    },
    // 9↓
    {
      title: '采购管理',
      icon: 'mdi-cart-minus',
      to: '/purchaselist'
    },
    // 10↓
    {
      title: '事务处理',
      icon: 'mdi-sitemap-outline',
      to: '/transaction',
    },
    // 11↓
    {
      title: '就医记录',
      icon: 'mdi-clipboard-text-clock-outline',
      to: '/records',
    },
    // 12↓
    {
      title: '基本信息',
      icon: 'mdi-airplane-clock',
      to: '/basicinfo',
    },
    // 13↓
    {
      title: '请假离职',
      icon: 'mdi-account-cash-outline',
      to: '/leaveandresign',
    },
    // 14↓
    {
      title: '控制台',
      icon: 'mdi-console',
      to: '/console',
    },
    // 15↓
    {
      title: '主页',
      icon: 'mdi-home-city',
      to: '/homepage',
    },
    // 16↓
    {
      title: '编辑通知公告',
      icon: 'mdi-application-edit-outline',
      to: '/managearticle',
    },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
