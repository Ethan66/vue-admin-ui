import { authMoreBtn } from '@/config/methods'

const userMoreList = authMoreBtn([
  { code: 'user-agree-login', clickFn: 'handleChangeStatus', config: { inlineShow: false } },
  { code: 'user-bin-login', clickFn: 'handleChangeStatus', config: { inlineShow: false } },
  { code: 'user-delete-user', clickFn: 'handleDeleteData' }
])

// 用户管理
export const user = {
  data () {
    return new this.$InitObj({
      btnConfig: {
        // tableBtn: [{ edit: { code: 'user-edit-user' } }, { more: { list: userMoreList, code: 'user-more' } }]
      },
      items: {
        search: {
          account: { label: '账号', name: '你好', clearable: true, change: this.handleChange },
          account1: { label: '账号', name: '你好', clearable: true, change: this.handleChange },
          account2: { label: '账号', name: '你好', clearable: true, change: this.handleChange },
          account3: { label: '账号', name: '你好', clearable: true, change: this.handleChange },
          name: { label: '用户名' },
          status: { label: '状态', type: 'select', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] },
          date: { label: '时间', key: 'str1', type: 'date', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期' }
        },
        table: {
          selection: '',
          account: { label: '账号', width: 100 },
          name: { label: '用户名', width: 100 },
          roleName: { label: '角色', width: 100 },
          status: { label: '状态', width: 90, clsName: 'userStatus', formatter: this.formatterStatus },
          loginTime: { label: '最近登录', width: 120 },
          operator: { label: '操作人', width: 100 },
          btn: { width: 170, slot: 'btn' }
        },
        dialog: {
          account: { label: '账号' },
          name: { label: '用户名' },
          roleId: { label: '角色', type: 'select', options: [] },
          password: { label: '密码', showPassword: true },
          status: { label: '状态', type: 'radio', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] }
        }
      },
      rules: {
        account: [
          { required: true, trigger: 'blur', message: '请填写账号' }
        ],
        name: [
          { required: true, trigger: 'blur', message: '请填写用户名' }
        ],
        roleId: [
          { required: true, trigger: 'change', message: '请选择角色' }
        ]
      }
    })
  }
}

const roleMoreList = authMoreBtn([
  { code: 'role-agree-role', clickFn: 'handleChangeStatus', config: { inlineShow: false } },
  { code: 'role-bin-role', clickFn: 'handleChangeStatus', config: { inlineShow: false } },
  { code: 'role-delete-role', clickFn: 'handleDeleteData' }
])

// 角色管理
export const role = {
  data () {
    return new this.$InitObj({
      btnConfig: {
        // tableBtn: [{ edit: { code: 'role-edit-role' } }, { more: { list: roleMoreList, code: 'role-more' } }]
      },
      items: {
        search: {
          roleName: { label: '角色名' },
          status: { label: '状态', type: 'select', options: [{ label: '正常', value: 1 }, { label: '失效', value: 0 }] }
        },
        table: {
          selection: '',
          roleName: { label: '角色名', width: 100 },
          roleId: { label: '角色Id', width: 100 },
          status: { label: '状态', width: 90, slot: 'status', clsName: 'roleStatus' },
          updateDate: { label: '更新时间', width: 100 },
          operator: { label: '操作人', width: 100 },
          btn: { width: 118 }
        },
        dialog: {
          roleName: { label: '角色名' },
          status: { label: '状态', type: 'radio', options: [{ label: '正常', value: 1 }, { label: '失效', value: 0 }] }
        }
      },
      rules: {
        roleName: [
          { required: true, trigger: 'blur', message: '请填写角色名' }
        ]
      }
    })
  }
}

// 角色授权
export const roleAuth = {
  data () {
    return new this.$InitObj({
      // modules: ['dialog'],
      btnConfig: {},
      items: {
        dialog: {
          roleName: { label: '角色名' },
          userIdList: { label: '所属用户', type: 'selectMore', options: [] },
          status: { label: '状态', type: 'radio', options: [{ label: '正常', value: 1 }, { label: '失效', value: 0 }] }
        }
      },
      rules: {
        roleName: [
          { required: true, trigger: 'blur', message: '请填写角色名' }
        ],
        userIdList: [
          { required: true, message: '请选择所属用户', trigger: 'change' }
        ]
      }
    })
  }
}
