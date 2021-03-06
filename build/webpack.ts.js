var path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',
  entry:  resolve ('./packages/utils/index.ts'),
  output: {
    path: resolve('/lib/utils/'),
    filename: 'index.js',
    library: 'vueAdminMethods',
    libraryTarget: 'commonjs-module'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.js?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  }
}
