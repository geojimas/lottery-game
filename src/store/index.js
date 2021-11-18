import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state: {
      authenticated: false,
      UserData: null,
      numbers: null
    },
    mutations: {
      SET_AUTH: (state, payload) => (state.authenticated = payload),
      SET_USER: (state, payload) => (state.UserData = payload),
      SET_NUMS: (state, payload) => (state.numbers = payload)
    },
    actions: {
      setAuth: ({ commit }, payload) => commit('SET_AUTH', payload),
      setUser: ({ commit }, payload) => commit('SET_USER', payload),
      setNums: ({ commit }, payload) => commit('SET_NUMS', payload)
    },
    getters: {
      getUser (state) {
        return state.UserData
      },
      getIfIsAuth (state) {
        return state.authenticated
      },
      getNums (state) {
        return state.numbers
      }
    },
    plugins: [createPersistedState()],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })
  return Store
})
