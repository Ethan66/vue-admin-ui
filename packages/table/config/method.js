// 设置table的max-height
export const getTableHeight = (totalClsName, reduceClsNameList = []) => {
  const totalHeight = document.querySelector(totalClsName).clientHeight // 总高度
  const $tableModule = document.querySelector('.tableModule')
  const tableTop = $tableModule.getBoundingClientRect().top // el-table的父元素距离body的top高度
  const tableBrothersHeight = Array.from($tableModule.children) // el-table兄弟级dom高度
    .filter(item => !item.classList.contains('el-table'))
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue.offsetHeight
    }, 0)
  const reduceHeight = reduceClsNameList.map(item => document.querySelector(item)) // 需要减掉的高度
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue.offsetHeight
    }, 0)
  const tableHeight = totalHeight - reduceHeight - tableTop - tableBrothersHeight - 51 // 页面的高度 - el-table父元素距离body的top高度 - el-table兄弟级dom高度 - 部分有差值
  return tableHeight < 400 ? 400 : tableHeight // 小于400就给400
}
