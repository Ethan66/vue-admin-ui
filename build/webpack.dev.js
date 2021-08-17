var path = require('path')
const IP = require('ip').address()
var HtmlWebpackPlugin = require('html-webpack-plugin')
var { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('example'),
      '$pkg': resolve('packages'),
      '@@': resolve('lib')
    },
    extensions: ['*', '.js', '.vue', '.ts', '.json']
  },
  devServer: {
    host: 'localhost',
    historyApiFallback: true,
    hot: true,
    overlay: true,
    port: 8010,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true
        // target: 'http://10.0.1.76:8210'
        // target: 'http://10.0.0.43:8210'
      }
    }
  },
  plugins: [new HtmlWebpackPlugin({
    template: './index.html'
  }), new CleanWebpackPlugin(), new VueLoaderPlugin()]
}