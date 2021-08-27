import { AtransConfigRes, ModuleType } from "../utils/types"
import { isPlainObject } from '../core/utils'
import defaults from './defaults'

interface tableItem {
  prop?: string
  label?: string
  type?: string
  fixed?: string
}

export default {
  '1.0': function (config: AtransConfigRes): any {
    function purifierObject (ob: object, type: ModuleType): object {
      const result = { $on: {}, $attr: {} }
      Object.keys(ob).forEach(key => {
        if ([...defaults.childKeys, defaults.fields[type]].includes(key)) {
          result[key] = ob[key]
          delete ob[key]
        } else if (defaults.listeners.includes(key)) {
          result.$on[key] = ob[key]
          delete ob[key]
        }
      })
      if (Object.keys(ob).length) {
        result.$attr = ob
      } else {
        delete result.$attr
      }
      if (!Object.keys(result.$on).length) {
        delete result.$on
      }
      return result
    }
    Object.keys(config).forEach(key => {
      if (['searchItems', 'tableItems', 'dialogItems'].includes(key)) {
        const value = config[key]
        const type = key.slice(0, -5) as ModuleType
        if (isPlainObject(value)) {
            config[key.slice(0, -1)] = value
            Object.keys(value).forEach(key => {
              if (key.startsWith('$')) {
                config[type + key[1].toUpperCase() + key.slice(2)] = value[key]
                delete value[key]
              } else {
                if (type === 'table') {
                  if ((value[key] as tableItem).prop === 'btn') {
                    delete value[key].prop;
                    (value[key] as tableItem).type = 'btn'
                    !(value[key] as tableItem).label && ((value[key] as tableItem).label = '操作')
                    !(value[key] as tableItem).fixed && ((value[key] as tableItem).fixed = 'right')
                  } else if (value[key].prop === 'selection') {
                    delete value[key].prop;
                    value[key].type = 'selection'
                    !value[key].width && (value[key].width = 50)
                  }
                } else {
                  value[key] = purifierObject(value[key], type)
                }
              }
            })
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            config[type + (index + 1) + 'Item'] = item
            Object.keys(item).forEach(key => {
              if (key.startsWith('$')) {
                config[type + (index + 1) + key[1].toUpperCase() + key.slice(2)] = item[key]
                delete item[key]
              } else {
                if (type === 'table') {
                  if ((item[key] as tableItem).prop === 'btn') {
                    (item[key] as tableItem).type = 'btn'
                    !(item[key] as tableItem).label && ((item[key] as tableItem).label = '操作')
                    !(item[key] as tableItem).fixed && ((item[key] as tableItem).fixed = 'right')
                  }
                } else {
                  item[key] = purifierObject(item[key], type)
                }
              }
            })
          })
        }
        delete config[key]
      } else if (key === 'dialogBtnItems') {
        let values = config[key]
        values = values.map(val => {
          let newVal = Object.create(null)
          if (typeof val === 'string') {
            if (defaults.dialogBtn[val]) {
              newVal = { ...defaults.dialogBtn[val] }
            } else {
              throw new Error('请查看atrans.defaults.dialogBtn配置项')
            }
          } else {
            const key = Object.keys(val)[0]
            newVal = Object.assign({}, defaults.dialogBtn[key] || {}, val[key])
          }
          if (newVal.code) {
            if (defaults.permissions.constructor === Array) {
              if ((defaults.permissions as any[]).some(item => item.code === newVal.code)) {
                newVal.show = true
              }
            } else {
              newVal.show = defaults.permissions[newVal.code] || false
            }
          }
          return newVal
        })
        config.dialogBtn = values
        delete config.dialogBtnItems
      }
    })
    return config
  }
}
