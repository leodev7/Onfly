
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'r_user_index', component: () => import('pages/IndexPage.vue') },
      { path: 'create', name: 'r_user_create', component: () => import('pages/CreatePage.vue') },
      { path: ':userId/edit', name: 'r_user_edit', component: () => import('pages/EditPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
