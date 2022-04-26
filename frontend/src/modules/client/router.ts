import { RouteRecordRaw } from 'vue-router'

const clientRoutes: RouteRecordRaw = {
  path: '/clients',
  name: 'Clients',
  component: () => import('@/modules/client/views/ClientsView.vue'),
  children: [
    {
      path: '',
      name: 'Client List',
      component: () => import('@/modules/client/views/ClientList.vue')
    },
    {
      path: ':id',
      name: 'Client Details',
      component: () => import('@/modules/client/views/ClientDetails.vue'),
      props: true
    }
  ]
}

export default clientRoutes
