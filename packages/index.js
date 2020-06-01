import handleBasicObj from 'vue-admin-methods'
import searchModule from './search'
import tableModule from './table'
import dialogModule from './dialog'
// import dialogDetail from './dialog-module/detail'

const components = [
  searchModule,
  tableModule,
  dialogModule,
  // dialogDetail
]

components.forEach(item => {
  item.install = (Vue) => {
    Vue.component(item.name, item)
  }
})

const adminModule = (Vue) => {
  components.forEach(component => {
    Vue.use(component)
  })
}

export {
  handleBasicObj,
  adminModule,
  searchModule,
  tableModule,
  dialogModule,
  // dialogDetail
}
