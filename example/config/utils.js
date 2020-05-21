// 转换时间戳
export const format = (now, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  now = new Date(now)
  const o = {
    'M+': now.getMonth() + 1, // 月份
    'd+': now.getDate(), // 日
    'h+': now.getHours(), // 小时
    'm+': now.getMinutes(), // 分
    's+': now.getSeconds(), // 秒
    'q+': Math.floor((now.getMonth() + 3) / 3), // 季度
    'S': now.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, String(o[k]).padStart(RegExp.$1.length, 0))
    }
  }
  return fmt
}

// 菜单父子级关联
export const menuRelation = (data, id, pId, level, sort, list = 'list') => {
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
export const menuSort = (arr, key, sort) => {
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

// 处理树形结构数据
export const disposeTreeData = (list, parentId = 'parentId', returnId = 0) => {
  let min = Infinity
  let cloneData = JSON.parse(JSON.stringify(list)) // 对源数据深度克隆
  function compare (key) {
    return function (a, b) {
      return (a[key] - b[key])
    }
  }
  cloneData.sort(compare('sortNo'))
  return cloneData.filter(father => { // 循环所有项，并添加children属性
    let branchArr = cloneData.filter(child => { // 返回每一项的子级数组
      if (child.departmentLevel < min) {
        min = child.departmentLevel
      }
      return father.id === child[parentId]
    })
    father.childIdList = branchArr.length > 0 ? branchArr : [] // 给父级添加一个children属性，并赋值
    if (father['departmentLevel'] === min) { // 存在departmentLevel为部门树
      return father['departmentLevel'] === min // 返回第一层
    } else { // 员工数
      return father[parentId] === returnId // 返回第一层
    }
  })
}

// 从url上获取页面的$options.name
export const getOptionsName = (url) => {
  if (url) {
    let arr = url.split('/').slice(-2)
    let result = arr[0]
    arr[1] !== 'index' && (result += `-${arr[1]}`)
    return result
  }
}

// 接口传参删除多余参数
export const purifyParams = (params) => {
  let result = {}
  Object.keys(params).forEach(key => ((params[key] !== '' && params[key] !== null && params[key] !== undefined) && (result[key] = params[key])))
  return result
}

// 防抖
export const debounce = (fn, delay = 500) => {
  let timer = null
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
      clearTimeout(timer)
    }, delay)
  }
}
