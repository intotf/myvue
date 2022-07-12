import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import token from './token'


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
      tab,
      token
    }
});