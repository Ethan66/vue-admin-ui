declare global {
  interface Window { btnList: any }
}

interface IdefaultDialogBtn {
  [key: string]: {
    name:string
    type: string
    disabled: boolean
    show: boolean
    code?: string
    color?: string
    clickFn?: string
  }
}

interface Ioptions {
  btns?: {
    dialog?: (string | { [key: number]: object })[]
    [key: string]: (string | { [key: number]: object })[]
  }
  items: {
    search?: { [key: string]: string | object }
    table?: { [key: string]: string | object }
    dialog?: { [key: string]: string | object }
    [key: string]: { [key: string]: string | object }
  }
}

const onCreateBasicData = function (defDialogBtn?: { defaultDialogBtn: IdefaultDialogBtn }): Function {
  class InitObj {
    searchItem: []
    searchValues: object
    
    tableData: []
    tableItem: []
    tableLoading: boolean
    isEdit: number
    tablePages: { total: number, current: number, pageSize: number }
    tablechooseArr: []
    
    editData: object
    dialogTitle: string
    dialogItem: []
    dialogBtn: []
    showDialogForm: boolean
    [key: string]: [] | object | string | boolean | number
    static btnList: []

    constructor (options: Ioptions) {
      const modules: string[] = Object.keys(options.items) as string[]
      modules.forEach((module) => {
        if (/search/.test(module)) {
          this.initSearch(module)
        }
        if (/table/.test(module)) {
          this.initTable(module)
        }
        if (/dialog/.test(module)) {
          this.initDialog(module, options.btns && options.btns[module])
        }
      })
      this.initItem(options.items, modules)
      return this
    }

    initSearch (module: string): void {
      this[`${module}Item`] = []
      this[`${module}Values`] = {}
    }
    initTable (module: string): void {
      this[`${module}Data`] = []
      this[`${module}Item`] = []
      this[`${module}Loading`] = true
      this.isEdit = 0
      this[`${module}Pages`] = { total: 0, current: 1, pageSize: 20 }
      this[`${module}chooseArr`] = []
    }
    initDialog (module: string, dialogBtn: (string | { [key: number]: object })[] = ['cancel', 'confirm']) {
      this.editData = {}
      this.dialogTitle = ''
      this.showDialogForm = false
      this.allRead = false
      this[`${module}Item`] = []
      this[`${module}Btn`] = []
      this.setBtn(dialogBtn, `${module}Btn`)
    }

    setBtn (config, type) {
      const userBtnList = InitObj.btnList
      if (!Array.isArray(config)) {
        console.error('传参必须为数组')
        return false
      }
      let basicConfig = defDialogBtn ? defDialogBtn.defaultDialogBtn : []
      config.forEach(key => {
        if (typeof key === 'string') {
          if (!basicConfig[key]) {
            console.error(`请确认默认对话框按钮是否配置了${key}属性`)
            return false
          }
          (this[type] as object[]).push(basicConfig[key])
        } else if (key.constructor === Object) {
          let arr = Object.entries(key)[0]
          if (arr[1].constructor !== Object) {
            console.error('数组里的对象的value值必须为对象')
            return false
          }
          let config = Object.assign({}, basicConfig[arr[0]], arr[1])
          if (config.code && userBtnList.length) {
            if ((arr[1] as { show?: boolean, [key: string]: any }).show === undefined) {
              config.show = (this.authBtn(config.code, userBtnList, 'show') as boolean)
            }
            config.name = (this.authBtn(config.code, userBtnList) as string)
          }
          (this[type] as object[]).push(config)
        } else {
          console.error('数组里的数据必须是字符串或对象')
        }
      })
    }

    initItem (items, modules) {
      let basicConfig = {
        search: { label: '', key: '', type: 'input', placeholder: '', show: true },
        table: { label: '', prop: '', type: 'cell', width: 80 },
        dialog: { label: '', key: '', type: 'text', show: true }
      }
      const listeners = ['click', 'change', 'input', 'focus', 'blur']
      const externalKeys = ['key', 'show', 'type', 'label', 'options']
      const placeholderList = ['text', 'input','number', 'password', 'textarea'];
      (modules as string[]).forEach(module => {
        let configObj = items[module]
        let keys = Object.keys(configObj)
        let result = []
        let tmp = module.match(/(search|table|dialog)/)
        const type = tmp && tmp[0]
        if (!type) {
          console.error('请确认items配置项中key包含search、table、dialog其中一个')
          return
        }
        keys.forEach(key => {
          let obj = configObj[key] = Object.assign({}, basicConfig[type], configObj[key])
          if (type === 'table') {
            if (key === 'btn') {
              obj.type = 'btn'
              !obj.label && (obj.label = '操作')
              !obj.fixed && (obj.fixed = 'right')
            } else if (key === 'selection') {
              obj.type = 'selection'
              obj.width = 50
            } else {
              obj.prop = key
            }
          } else {
            if (type === 'search') this[`${module}Values`][key] = undefined
            if (type === 'search' && configObj[key].key) {
              obj.key = configObj[key].key
            } else {
              obj.key = key
            }
            let prefix = placeholderList.includes(obj.type) ? '请输入' : '请选择'
            obj.placeholder = `${prefix}${obj.label}`
          }
          if (type === 'search' || type === 'dialog') {
            let tmp = {}
            externalKeys.forEach(str => {
              obj[str] !== undefined && (tmp[str] = obj[str])
              delete obj[str]
            })
            const tmpStrs = Object.keys(obj)
            listeners.forEach(str => {
              if (tmpStrs.includes(str)) {
                tmp['$on'] ? tmp['$on'][str] = obj[str] : tmp['$on'] = { [str]: obj[str] }
                delete obj[str]
              }
            })
            Object.keys(obj) && (tmp['$attr'] = obj)
            obj = tmp
          }
          result.push(obj)
        })
        this[`${module}Item`] = result
      })
    }

     // 表格数据转换
    formmater (config) {
      return function (row, column, cellValue) {
        if (config.constructor === Array && !(Number(cellValue) === 0 || Number(cellValue))) {
          throw new Error('当config为Array时，val必须为Number')
        }
        return config[cellValue]
      }
    }

    // 根据btnCode获取按钮权限和名字
    authBtn (btnCode, userBtnList: any[], type?: string) {
      let obj = userBtnList.find(item => item.btnCode === btnCode)
      if (obj) {
        if (type) {
          return true
        } else {
          return obj.btnName
        }
      } else {
        return false
      }
    }
  }
  return InitObj
}

export default onCreateBasicData
