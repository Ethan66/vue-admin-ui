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
  btnConfig: {
    dialogBtn?: (string | { [key: number]: object })[]
  }
  items: {
    search?: { [key: string]: string | object }
    table?:  { [key: string]: string | object }
    dialog?:  { [key: string]: string | object }
  }
  rules?:  { [key: string]: object }
}

const onCreateBasicData = function ({ defaultDialogBtn }: { defaultDialogBtn: IdefaultDialogBtn }): Function {
  class InitObj {
    searchItem: []
    searchValues: object
    
    allData: []
    tableData: []
    tableItem: []
    tableLoading: boolean
    isEdit: number
    tablePages: { total: number, current: number, pageSize: number }
    chooseDataArr: []
    
    editData: object
    dialogTitle: string
    dialogItem: []
    dialogBtn: []
    showDialogForm: boolean
    rules: {}

    constructor (options: Ioptions) {
      const modules: string[] = Object.keys(options.items) as string[]
      modules.forEach((module) => {
        switch (module) {
          case 'search':
            this.initSearchObj()
            break
          case 'table':
            this.initTableObj()
            break
          case 'dialog':
            this.initDialogObj(options.btnConfig && options.btnConfig.dialogBtn)
        }
      })
      this.initItem(options.items, modules)
      options.rules && (this.rules = options.rules)
      return this
    }

    initSearchObj (): void {
      this.searchItem = []
      this.searchValues = {}
    }
    initTableObj (): void {
      this.allData = []
      this.tableData = []
      this.tableItem = []
      this.tableLoading = true
      this.isEdit = 0
      this.tablePages = { total: 0, current: 1, pageSize: 20 }
      this.chooseDataArr = []
    }
    initDialogObj (dialogBtn: object = ['cancel', 'confirm']) {
      this.editData = {}
      this.dialogTitle = ''
      this.dialogItem = []
      this.dialogBtn = []
      this.showDialogForm = false
      this.rules = {}
      this.setBtn(dialogBtn, 'dialogBtn')
    }

    setBtn (config, type) {
      const userBtnList = JSON.parse(sessionStorage.getItem('btnList'))
      if (!Array.isArray(config)) {
        console.error('传参必须为数组')
        return false
      }
      let basicConfig = defaultDialogBtn
      config.forEach(key => {
        if (typeof key === 'string') {
          if (!basicConfig[key]) {
            console.error(`请确认${type}是否配置了${key}属性`)
            return false
          }
          this[type].push(basicConfig[key])
        } else if (key.constructor === Object) {
          let arr = Object.entries(key)[0]
          if (arr[1].constructor !== Object) {
            console.error('数组里的对象的value值必须为对象')
            return false
          }
          let config = Object.assign({}, basicConfig[arr[0]], arr[1])
          if (config.code) {
            if ((arr[1] as { show?: boolean, [key: string]: any }).show === undefined) {
              config.show = (this.authBtn(config.code, userBtnList, 'show') as boolean)
            }
            config.name = (this.authBtn(config.code, userBtnList) as string)
          }
          this[type].push(config)
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
        keys.forEach(key => {
          let obj = configObj[key] = Object.assign({}, basicConfig[module], configObj[key])
          if (module === 'table') {
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
            if (module === 'search' && configObj[key].key) {
              obj.key = configObj[key].key
            } else {
              obj.key = key
            }
            let prefix = placeholderList.includes(obj.type) ? '请输入' : '请选择'
            obj.placeholder = `${prefix}${obj.label}`
          }
          if (module === 'search' || module === 'dialog') {
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
      return function (val) {
        if (config.constructor === Array && !(Number(val) === 0 || Number(val))) {
          throw new Error('当config为Array时，val必须为Number')
        }
        return config[val]
      }
    }

    // 根据btnCode获取按钮权限和名字
    authBtn (btnCode, userBtnList: any[], type?: string) {
      // let userBtnList: { btnCode: string, btnName: string }[] = []
      // userBtnList.length === 0 && (userBtnList = JSON.parse(sessionStorage.getItem('btnList')))
      if (!userBtnList) {
        throw new Error('btn权限需要存储在sessionStorage')
      }
      // if (window.btnList) { // 刷新页面的window.btnList保存的是最新的按钮权限
      //   this.userBtnList = window.btnList
      //   window.btnList = undefined
      // }
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
