import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: () => import('./components/Welcome.vue')
        },
        {
          path: '/users',
          component: () => import('./components/Users.vue')
        }
      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (token) {
    // token判断
    next()
  } else {
    next('/login')
  }
})

export default router
