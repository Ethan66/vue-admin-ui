import { Defaults } from '../utils/types'
import defaultInterceptors from '../core/defaultInterceptors'
const defaults: Defaults = {
  items: {
    search: { show: true, type: 'input' },
    table: { show: true, type: 'cell', width: 80 },
    dialog: { show: true, type: 'text' }
  },
  permissions: {},
  fields: {
    search: 'key', table: 'prop', dialog: 'key'
  },
  dialogBtn: {
    cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
    confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
  },
  moduleFields: {
    search: { $values: {} },
    table: { $data: [], $loading: true, $pages: { current: 1, pageSize: 20, total: 20, $chooseArr: [] } }
  },
  extraFields: {
    table: { isEdit: 0 },
    dialog: { editData: {}, dialogTitle: '', showDialogForm: false, allRead: false }
  },
  childKeys: ['show', 'type', 'label', 'options'],
  listeners: ['click', 'change', 'input', 'focus', 'blur'],
  placeholders: ['text', 'input','number', 'password', 'textarea'],
  interceptors: defaultInterceptors
}

export default defaults
