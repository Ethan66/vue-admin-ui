// import moudle from '../../packages/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-admin-ui-lib/lib/style/index.css'
import {
  adminModule
} from 'vue-admin-ui-lib'

export default ({
  Vue
}) => {
  Vue.use(adminModule)
  Vue.use(ElementUI)
}