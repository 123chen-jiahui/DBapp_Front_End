// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  jwt: '',
  items: [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/dashboard',
    },
    {
      title: '工作管理（门诊）',
      icon: 'mdi-account',
      to: '/clinic',
    },
    {
      title: 'Regular Tables',
      icon: 'mdi-clipboard-outline',
      to: '/tables/regular/',
    },
    {
      title: 'Typography',
      icon: 'mdi-format-font',
      to: '/components/typography/',
    },
    {
      title: 'Icons',
      icon: 'mdi-chart-bubble',
      to: '/components/icons/',
    },
    {
      title: 'Google Maps',
      icon: 'mdi-map-marker',
      to: '/maps/google/',
    },
    {
      title: '订单缴费',
      icon: 'mdi-bell',
      to: '/components/notifications/',
    },
    {
      title: '我要挂号',
      icon: 'mdi-bell',
      to: '/registration',
    },
    {
      title: '挂号信息',
      icon: 'mdi-bell',
      to: '/registrationinfo'
    },
    {
      title: '采购管理',
      icon: 'mdi-application-cog',
      to: '/purchaselist'
    },
    {
      title: '事务处理',
      icon: 'mdi-axis-arrow',
      to: '/transaction',
    },
    {
      title: '就医记录',
      icon: 'mdi-archive-eye-outline',
      to: '/records',
    },
    {
      title: '基本信息',
      icon: 'mdi-bell',
      to: '/basicinfo',
    },
    {
      title: '请假离职',
      icon: 'mdi-bell',
      to: '/leaveandresign',
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
