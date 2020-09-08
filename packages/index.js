import adminMethods from './utils/index.ts'
import searchModule from './search'
import tableModule from './table'
import dialogModule from './dialog'
import cellTree from './table-cell-tree'
import selectTree from './select-tree'

const components = [
  searchModule,
  tableModule,
  dialogModule,
  selectTree
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
  adminMethods,
  adminModule,
  searchModule,
  tableModule,
  dialogModule,
  cellTree,
  selectTree
}
