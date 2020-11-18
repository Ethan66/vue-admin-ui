import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import "babel-polyfill"
// import "regenerator-runtime/runtime.js"
import '@/assets/less/index.less'
import systemObj from '@/config/system'
import { authBtns } from '@/utils/permission'
import { dialogBtn } from '@/config/defaultBtnData'
import { handleSearch, handleChangePage, apiCreateData, apiEditData, apiDeleteData, handleGetTableData } from '@/utils/page'
import { purifyParams } from '@/utils/index'
import '$pkg/style/dialog.less'
import '$pkg/style/search.less'
import '$pkg/style/table.less'

import { formatDate } from 'vue-admin-methods'

import adminUtils from '$pkg/utils/index.ts'

import {
  searchModule,
  tableModule,
  dialogModule
} from '$pkg/index'

Vue.use(ElementUI)
  .use(searchModule)
  .use(tableModule)
  .use(dialogModule)

Vue.directive('btn', {
  inserted (el, val) {
    const { value } = val
    const btnName = value && authBtns.getBtnName(value)
    if (!btnName && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  }
})

Vue.prototype.$purifyParams = purifyParams
Vue.prototype.$format = formatDate
Vue.prototype.$getBtnName = authBtns.getBtnName.bind(authBtns)
Vue.prototype.$getAuthBtns = authBtns.getConfigBtns.bind(authBtns)
Vue.prototype.$systemObj = systemObj
Vue.prototype.$InitObj = adminUtils.onCreateBasicData({ defaultDialogBtn: dialogBtn })
Vue.prototype.$setItem = adminUtils.setItemProp
Vue.prototype.$handleSearch = handleSearch
Vue.prototype.$handleGetTableData = handleGetTableData
Vue.prototype.$apiCreateData = apiCreateData
Vue.prototype.$handleChangePage = handleChangePage
Vue.prototype.$apiEditData = apiEditData
Vue.prototype.$apiDeleteData = apiDeleteData
Vue.config.productionTip = false

let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.use(vm)
