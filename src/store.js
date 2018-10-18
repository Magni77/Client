import Vue from 'vue';
import Vuex from 'vuex';
import { http } from './common/http.js';
import posts from './fakedata/posts'

Vue.use(Vuex);
const loggedUser = JSON.parse(localStorage.getItem('user'));

export const store = new Vuex.Store({
  state: {
    user: loggedUser || null,
    token: null,
    posts: []
  },
  mutations: {
    authUser: (state, data) => {
      state.user = data.user;
      state.token = data.token;
    },
    createPost (state, newPost)  {
      state.posts.push(newPost);
    },
    setPostsState (state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    getProfilePosts ({commit}, userId) {
      http.get('users/' + userId + '/posts')
        .then(response =>{
          commit('setPostsState', response.data);
        })
        .catch(e =>{
          console.log(e);
        });
    },
    initPosts ({ commit }) {
      commit('setPostsState', posts)
    },
    authUser (data){
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      http.defaults.headers.common['Authorization'] = 'jwt ' + data.token
    },
    register: ({ commit }, userData) => {
      return new Promise((resolve, reject) => {
        http.post('register', userData)
          .then((response) => {
            commit('authUser', response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            http.defaults.headers.common['Authorization'] = 'jwt ' + response.data.token;
            resolve(response)
          })
          .catch((e) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            reject(e);
          });
      })

    },
    login: ({ commit , dispatch}, data) => {
      return new Promise((resolve, reject) => {
         http.post('login', data)
        .then((response) => {
          commit('authUser', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          http.defaults.headers.common['Authorization'] = 'jwt ' + response.data.token;
          resolve(response)
        })
        .catch((e) => {
          console.log(e);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          reject(e);

        });
      })

    },
  },
  getters: {
    user: state =>
      state.user,
    posts: state => state.posts,
  },

});
