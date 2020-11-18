// 判断item是否存在list中
export function itemIncludesList (item, list, id, childListName) {
  if (!item.hasOwnProperty(id)) {
    console.error('please check the id parammeter passed in')
    return false
  }
  if (!Array.isArray(list) || !list.length) {
    return false
  }
  let result = ''
  try {
    list.forEach(child => {
      if (child[id] === item[id]) {
        result = true
        throw new Error()
      }
      result = itemIncludesList(item, child[childListName], id, childListName)
      if (result) {
        throw new Error()
      }
    })
  } catch (e) {}
  return result
}

// 接口传参删除多余参数
export const purifyParams = (params) => {
  let result = {}
  Object.keys(params).forEach(key => ((params[key] !== '' && params[key] !== null && params[key] !== undefined) && (result[key] = params[key])))
  return result
}
