import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { localCache } from '@/utils/cookies'
import { UAppState } from './modules/app'
import { UUserState } from './modules/user'
import { UThemeconfState } from './modules/themeconf'
import { ULayoutconfState } from './modules/layoutconf'
Vue.use(Vuex)

export interface URootState {
  appconf: UAppState;
  user: UUserState;
  themeconf: UThemeconfState;
  layoutconf: ULayoutconfState;
}

const persisted = createPersistedState({
  storage: {
    getItem: key => localCache.getCache(key),
    setItem: (key, value) => localCache.setCache(key, value),
    removeItem: key => localCache.deleteCache(key)
  },
  key: 'store_vuex',
  paths: ['appconf', 'user', 'themeconf', 'layoutconf']
})

export default new Vuex.Store<URootState>({
  plugins: [persisted]
})
