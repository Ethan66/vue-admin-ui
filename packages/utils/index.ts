// 菜单父子级关联
export const menuRelation = (data: any[], id: string, pId: string, level: string, sort: string, list: string = 'list'): any[] => {
  if (!data.length) return data
  let template = {}
  data.forEach(item => {
    item.level = item[level]
    template[item[id]] = item
  })
  let arr = []
  data.forEach(item => {
    if (!item[pId]) {
      if (!template[item[id]][list]) {
        template[item[id]][list] = []
      }
      arr.push(template[item[id]])
    } else if (template[item[pId]]) {
      if (!template[item[pId]][list]) {
        template[item[pId]][list] = []
      }
      template[item[pId]][list].push(item)
    } else {
      arr.push(item)
    }
  })
  if (sort) {
    menuSort(arr, list, sort)
  }
  return arr
}

// 目录排序
export const menuSort = (arr: any[], key: string, sort: string): any[] => {
  if (Array.isArray(arr) && arr[0]) {
    if (arr.length > 1) {
      arr.sort((v1, v2) => {
        return v1[sort] - v2[sort]
      })
    }
    arr.length === 1 && (arr[0].onlyOne = true)
    arr[0].first = true
    arr[arr.length - 1].last = true
    arr.forEach(item => {
      item[key] && menuSort(item[key], key, sort)
    })
  }
  return arr
}

interface Iitem {
  (item: { '$attr': object, [key: string]: any }, index: number, prop: string, val: boolean | string): void
}

// 修改searchItem,dialogItem的attr属性
export const setItemProp: Iitem = function (item, index, prop, val) {
  console.log(this)
  this.$set(item[index].$attr, prop, val)
}
