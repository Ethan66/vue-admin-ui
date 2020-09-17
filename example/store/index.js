import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import pageCashe from './modules/pageCashe'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    pageCashe
  },
  getters
})

export default store
