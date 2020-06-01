import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import handleBasicObj from 'vue-admin-methods'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/less/index.less'
import systemObj from '@/config/system'
import { authBtn } from '@/config/methods'
import { tableBtn, dialogBtn } from '@/config/defaultBtnData'

// const handleBasicObj = window.handleBasicObj.default

import {
  searchModule,
  tableModule,
  dialogModule
} from '$pkg/index'

Vue.use(ElementUI)
  .use(searchModule)
  .use(tableModule)
  .use(dialogModule)

Vue.prototype.$systemObj = systemObj
Vue.prototype.$authBtn = authBtn
Vue.prototype.$InitObj = handleBasicObj({ defaultDialogBtn: dialogBtn })

let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.use(vm)
