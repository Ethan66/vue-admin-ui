const systemObj = {
  logo: 'assets/img/logo',
  fullName: '后台管理系统',
  name: '管理系统',
  minScreenWidth: '1000', // 少于屏幕宽度的时候隐藏侧边栏
  theme: 'blue',
  btnConfig: {
    level: 'menuLevel',
    levelValue: 3,
    unique: 'code',
    name: 'menuName'
  },
  menuConfig: {
    id: 'id',
    parentId: 'menuParentId',
    level: 'menuLevel',
    sortNo: 'sortNo',
    unique: 'code',
    url: 'menuUrl',
    icon: 'menuIcon',
    name: 'menuName'
  }
}

export default systemObj
