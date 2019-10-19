import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"
import auth from "./middlewares/auth"
import middlewarePipeline from "./middlewarePipeline"

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/rules',
      name: 'rules',
      beforeEnter() {                    
        window.open("https://nesquik.specproagency.by/rules/rules-cert.pdf", 
        '_blank');
    } 
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/Admin.vue'),
      meta: {
        middleware: [
          auth
        ]
      },
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import('../views/Dashboard.vue'),
          meta: {
            middleware: [
              auth
            ]
          }
        },
        {
          path: '/admin/make',
          name: 'admin.results',
          component: () => import('../views/Results.vue'),
          meta: {
            middleware: [
              auth
            ]
          }
        },
        {
          path: '/admin/export',
          name: 'admin.export',
          component: () => import('../views/Export.vue'),
          meta: {
            middleware: [
              auth
            ]
          }
        },
        {
          path: '/admin/register',
          name: 'admin.register',
          component: () => import('../views/Register.vue'),
          meta: {
            middleware: [
              auth
            ]
          }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    store
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});

export default router;
