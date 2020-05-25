// 设置table的max-height
export const getTableHeight = (totalClsName, reduceClsNameList = []) => {
  const totalHeight = document.querySelector(totalClsName).clientHeight // 总高度
  const $tableModule = document.querySelector('.tableModule')
  const tableTop = $tableModule.getBoundingClientRect().top // 距离body高度
  const tableBrothersHeight = Array.from($tableModule.children) // 兄弟级高度
    .filter(item => !item.classList.contains('el-table'))
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue.offsetHeight
    }, 0)
  const reduceHeight = reduceClsNameList.map(item => document.querySelector(item)) // 需要减掉的高度
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue.offsetHeight
    }, 0)
  const tableHeight = totalHeight - reduceHeight - tableTop - tableBrothersHeight - 51
  return tableHeight < 400 ? 400 : tableHeight
}

// 设置table单元格className
export const getCellClass = (row, newTableItem, cb) => {
  let result = []
  if (typeof cb === 'function') {
    result.push(cb(row))
  } else if (typeof cb === 'string') {
    result.push(cb)
  }
  if (row.columnIndex === 1) {
    if (newTableItem[0].type === 'selection') {
      result.push('starting')
    }
    return result
  }
  if (row.columnIndex === newTableItem.length - 1) {
    if (newTableItem.slice(-1)[0].type === 'btn') {
      result.push('headSetting')
    }
    return result
  }
}
