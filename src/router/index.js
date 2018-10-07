import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewTheme from '@/components/NewTheme'
import ViewTheme from '@/components/ViewTheme'
import EditTheme from '@/components/EditTheme'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-theme',
      component: NewTheme
    },
    {
      path: '/edit/:theme_id',
      name: 'edit-theme',
      component: EditTheme
    },
    {
      path: '/:theme_id',
      name: 'view-theme',
      component: ViewTheme
    },
  ]
})
