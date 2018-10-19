import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import Profile from './views/Profile.vue';
import Index from './components/Index.vue';
import { store } from './store';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: 'profile/:user_id',
          name: 'profile',
          component: Profile,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    { path: '*', redirect: '/' },
  ],
});


router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.user; // localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  return next();
});
