import { login, getUser } from '@/api/user'

import {
  getToken,
  setToken,
  removeToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken
} from '@/utils/auth'

export default {
  state: {
    user: {},
    token: getToken(),
    refresh_token: getRefreshToken()
  },

  mutations: {
    SET_AUTH: (state, authData) => {
      state.token = `${authData.type} ${authData.token}`
      state.refresh_token = authData.refreshToken
    },

    SET_USER: (state, user) => {
      state.user = user
    }
  },

  actions: {
    login({ commit, dispatch }, { email, password }) {
      return new Promise((resolve, reject) => {
        login(email, password)
          .then(({ data }) => {
            commit('SET_AUTH', data.data)
            setToken(`${data.data.type} ${data.data.token}`)
            setRefreshToken(data.data.refreshToken)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },

    getUser({ commit }) {
      return new Promise((resolve, reject) => {
        getUser()
          .then(({ data }) => {
            commit('SET_USER', data)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    }
  }
}
