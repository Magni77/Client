import Vue from 'vue';
import Vuex from 'vuex';
import { http } from './common/http';
import posts from './fakedata/posts';

Vue.use(Vuex);
const loggedUser = JSON.parse(localStorage.getItem('user'));

export const store = new Vuex.Store({
  state: {
    user: loggedUser || null,
    token: null,
    posts: [],
    profile: null,
  },
  mutations: {
    authUser: (state, data) => {
      state.user = data.user;
      state.token = data.token;
    },
    logOut(state) {
      state.user = null;
      state.token = null;
    },
    createPost(state, newPost) {
      state.posts.push(newPost);
    },
    setPostsState(state, postsData) {
      state.posts = postsData;
    },
    setProfileState(state, profileData) {
      state.profile = profileData;
    },
    setEmptyProfile(state) {
      state.profile = {};
    },
  },
  actions: {
    getProfilePosts({ commit }, userId) {
      http.get(`users/${userId}/posts`)
        .then((response) => {
          commit('setPostsState', response.data);
        })
        .catch(() => {
        });
    },
    initPosts({ commit }) {
      commit('setPostsState', posts);
    },
    createPost({ commit }, postData) {
      http.post('posts', postData)
        .then((response) => {
          commit('createPost', response.data);
        })
        .catch(() => {
        });
    },
    getProfile({ commit }, userID) {
      http.get(`users/${userID}`)
        .then((response) => {
          commit('setProfileState', response.data);
        })
        .catch(() => {
          commit('setEmptyProfile');
        });
    },
    register: ({ commit }, userData) => new Promise((resolve, reject) => {
      http.post('register', userData)
        .then((response) => {
          commit('authUser', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          http.defaults.headers.common.Authorization = `jwt ${response.data.token}`;
          resolve(response);
        })
        .catch((e) => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          reject(e);
        });
    }),
    login: ({ commit }, data) => new Promise((resolve, reject) => {
      http.post('login', data)
        .then((response) => {
          commit('authUser', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          http.defaults.headers.common.Authorization = `jwt ${response.data.token}`;
          resolve(response);
        })
        .catch((e) => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          reject(e);
        });
    }),
    logout({ commit }) {
      commit('logOut');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  getters: {
    user: state => state.user,
    posts: state => state.posts.sort((a, b) => new Date(b.created) - new Date(a.created)),
    profile: state => state.profile,
  },

});

export default {
  store,
};
