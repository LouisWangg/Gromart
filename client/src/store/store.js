import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// Vuex harus ad state, mutation & actions
export default new Vuex.Store({
  strict: true,
  state: { // call method in actions, then it will go to mutation, and then the value in state will change
    token: null,
    user: null,
    seller: null,
    buyer: null,
    isLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isLoggedIn = true
      } else {
        state.isLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setSeller (state, seller) {
      state.seller = seller
    },
    setBuyer (state, buyer) {
      state.buyer = buyer
    }
  },
  actions: { // mirip dengan event
    setToken ({commit}, token) {
      commit('setToken', token) // to do any type of async logic
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setSeller ({commit}, seller) {
      commit('setSeller', seller)
    },
    setBuyer ({commit}, buyer) {
      commit('setBuyer', buyer)
    }
  }
})
