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
      icon: 'mdi-account',
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
      icon: 'mdi-bell',
      to: '/registration',
    },
    // 8↓
    {
      title: '挂号信息',
      icon: 'mdi-bell',
      to: '/registrationinfo'
    },
    // 9↓
    {
      title: '采购管理',
      icon: 'mdi-application-cog',
      to: '/purchaselist'
    },
    // 10↓
    {
      title: '事务处理',
      icon: 'mdi-axis-arrow',
      to: '/transaction',
    },
    // 11↓
    {
      title: '就医记录',
      icon: 'mdi-archive-eye-outline',
      to: '/records',
    },
    // 12↓
    {
      title: '基本信息',
      icon: 'mdi-bell',
      to: '/basicinfo',
    },
    // 13↓
    {
      title: '请假离职',
      icon: 'mdi-bell',
      to: '/leaveandresign',
    },
    // 14↓
    {
      title: '控制台',
      icon: 'mdi-bell',
      to: '/console',
    },
    // 15↓
    {
      title: '主页',
      icon: 'mdi-axis-arrow',
      to: '/homepage',
    },
    // 16↓
    {
      title: '通知公告发布',
      icon: 'mdi-axis-arrow',
      to: '/editarticle',
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
