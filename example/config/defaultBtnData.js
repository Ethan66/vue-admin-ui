export const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}

export const tableBtn = {
  edit: { name: '编辑', clickFn: 'handleEditData', disabled: false, show: true },
  delete: { name: '删除', clickFn: 'handleDeleteData', disabled: false, show: true },
  cancel: { name: '取消', disabled: false, show: true },
  setting: { name: '管理', disabled: false, show: true },
  more: { name: '更多', disabled: false, show: true },
  detail: { name: '详情', clickFn: 'handleShowDetailDialog', disabled: false, show: true }
}
