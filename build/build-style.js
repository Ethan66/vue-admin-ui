const fs = require('fs-extra')
const path = require('path')
const less = require('less')
const cssmin = require('cssmin') // 压缩所有样式打包出来的index.css文件
const esStyleDir = path.join(__dirname, '../es/lnzi-style') // 获取es样式绝对路径
const libStyleDir = path.join(__dirname, '../lib/lnzi-style') // 获取lib样式绝对路径
const pkgStyleDir = path.join(__dirname, '../packages/lnzi-style') // 获取packages样式绝对路径
const components = getComponents(path.join(__dirname, '../packages')) // 获取组件名
const esComponentDir = path.join(__dirname, '../es')
const libComponentDir = path.join(__dirname, '../lib')

joinStyle(esStyleDir)
joinComponentStyle(esComponentDir)
joinStyle(libStyleDir)
joinComponentStyle(libComponentDir)

// 将所有样式文件打包成一个index.css，放入lnzi-style文件夹下
function joinStyle (dir) {
  const currentDir = dir
  const pkgStyleDirs = fs.readdirSync(pkgStyleDir) // 获取一级文件名
  let styleStr = ''

  fs.emptyDirSync(currentDir) // 每次清空lnzi-style文件
  
  pkgStyleDirs.forEach(item => {
    if (/\.less/.test(item)) {
      let file = fs.readFileSync(path.join(pkgStyleDir, item), 'utf-8')
      less.render(file, (er, css) => {
        styleStr += css.css
      })
    }
  })
  fs.writeFileSync(path.resolve(currentDir, 'index.css'), cssmin(styleStr))
}

// 根据组件进行打包less文件，放入各组件文件夹下的style文件夹下
function joinComponentStyle (dir) {
  const pkgStyleDirs = fs.readdirSync(pkgStyleDir) // 获取一级文件名
  components.forEach(component => {
    const checkList = [] // 标识：记录有组件样式的组件名
    // const checkList = ['base'] // 标识：记录有组件样式的组件名
    let styleDir = pkgStyleDirs.find(item => component.includes(item.replace('.less', ''))) // 根据组件名找到对应less文件
    const currentDir = path.join(dir, component, 'style') // 创建组件下的style文件夹

    // 组件中有相应less文件
    if (styleDir) {
      let file = fs.readFileSync(path.resolve(pkgStyleDir, styleDir), 'utf-8') // 获取less内容
      const currentCssDir = path.join(dir, component)
      less.render(file, (er, css) => {
        fs.writeFileSync(path.resolve(currentCssDir, `${component}.css`), css.css)
      })
      checkList.push(component)
    }

    fs.emptyDirSync(currentDir) // 清空组件下的style文件夹

    // 将有组件样式的，在每个style文件夹下添加index.js文件，引入base.css和组件css文件
    const content = dir.indexOf('es') > -1
      ? checkList.map(item => `import '../${item === 'base' ? '../lnzi-style/' + item : item}.css'`).join('\n')
      : checkList.map(item => `require('../${item === 'base' ? '../lnzi-style/' + item : item}.css')`).join('\n')
    fs.writeFileSync(path.resolve(currentDir, 'index.js'), content)
  })
}

function getComponents (dir) {
  const dirs = fs.readdirSync(dir)
  const excludes = ['index.js', 'lnzi-style', 'mixins', 'utils']
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1)
}