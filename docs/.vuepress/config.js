const path = require('path')

module.exports = {
  theme:"antdocs",
  title: "vue-admin-ui",
  description: "一款基于Vue2+Element-ui开发的后台管理UI组件库，如果对您有帮助，不妨点一个star。",
  base: "/vue-admin-ui/",
  head: [
    ["link",{ rel: "icon",href: "/assets/logo.png" }]
  ],
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    smoothScroll: true,
    nav: require("./config/nav"),
    sidebar: require("./config/sidebar"),
    lastUpdated: "Last Updated",
    repo: "https://github.com/Ethan66/vue-admin-ui",
    editLinks: false,
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, '../../packages')
      }
    ],
    'vue-demo' // 其实demo-block已经达到需求了，vue-demo是完全仿照element-ui
  ]
}