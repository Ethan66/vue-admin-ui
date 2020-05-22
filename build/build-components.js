const fs = require('fs-extra')
const path = require('path')
const babel = require('@babel/core')
const compiler = require('vue-sfc-compiler') // 编译vue文件

const esDir = path.join(__dirname, '../es') // 返回绝对路径
const libDir = path.join(__dirname, '../lib') // 返回绝对路径
const pkgDir = path.join(__dirname, '../packages')
const compilerOption = {
  babel: {
    configFile: path.join(__dirname, '../babel.config.js')
  }
}

fs.emptyDirSync(esDir) // 清空es文件夹，没有文件夹就创建
fs.emptyDirSync(libDir) // 清空lib文件夹，没有文件夹就创建

fs.copySync(pkgDir, esDir) // 复制pkg文件到es文件下

const whiteList = /(demo|test|style|\.md)$/

compile(esDir) // 编译文件

process.env.BABEL_MODULE = 'commonjs'

fs.copySync(pkgDir, libDir)
compile(libDir)

function compile (dir) {
  const files = fs.readdirSync(dir) // 获取一级文件名
  files.forEach(file => {
    const absolutePath = path.join(dir, file) // 获取一级文件名的绝对路径
    if (whiteList.test(file)) { // 删除不需要的文件名
      fs.removeSync(absolutePath)
    } else if (isDir(absolutePath)) { // 是文件夹目录，递归调用
      return compile(absolutePath)
    } else if (/\.vue$/.test(file)) {
      const source = fs.readFileSync(absolutePath, 'utf-8') // 读取文件下内容
      fs.removeSync(absolutePath) // 删除该路径

      const outputVuePath = absolutePath + '.js'
      const outputJsPath = absolutePath.replace('.vue', '.js')
      const output = fs.existsSync(outputJsPath) ? outputVuePath : outputJsPath // 判断outputJsPath路径是否存在

      fs.outputFileSync(output, compiler(source, compilerOption).js) // 编译改文件内容到指定目录下
    } else if (/\.js$/.test(file)) {
      const { code } = babel.transformFileSync(absolutePath, compilerOption.babel)
      fs.outputFileSync(absolutePath, code)
    }
  })
}

function isDir (dir) {
  // fs.lstatSync(dir) 表示相关文件信息  isDirectory() fs.lstatSync(dir)是一个文件夹目录 => true  是一个
  return fs.lstatSync(dir).isDirectory()
}