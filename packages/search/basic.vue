<script>
const layouts = {
  config: {
    general: 'input,switch,cascader, date-picker, time-picker, input-number, slider, rate',
    hasChild: 'select, radio-group'
  },
  general(Tag) {
    const { field, $on, $attr } = this.config
    const extendItem = this.extendItem
    const listeners = this.openListeners ? $on : null
    return (
      <Tag
      v-model={ this.result[field] }
      { ...{ attrs: { ...$attr, ...extendItem }} }
      slot={ undefined }
      { ...{ on: listeners } }
      >
        { $attr && $attr.slot && <template slot={ $attr.slot }>{this.$slots[$attr.slot][0]}</template> }
      </Tag>
    )
  },
  hasChild(Tag) {
    const { field, $on, $attr, option, isBtn } = this.config
    const extendItem = this.extendItem
    const listeners = this.openListeners ? $on : null
    const match = Tag.match(/(.+?)(-group)?$/)
    let ChildTag = match[2] ? match[1] : 'el-option'
    if (isBtn) {
      ChildTag = `${ChildTag}-button`
    }
    return (
      <Tag
        v-model={ this.result[field] }
        { ...{ attrs: { ...$attr, ...extendItem }} }
        slot={ undefined }
        { ...{ on: listeners } }
      >
        {option.map((item, i) => (
          match[2]
            ? <ChildTag key={i} label={item.value}>
              {item.label}
            </ChildTag>
            : <ChildTag
              key={i}
              label={item.label}
              value={item.value}
            ></ChildTag>
        ))}
      </Tag>
    )
  }
}

export default {
  name: 'FormItem',
  props: {
    result: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    // 模块属性
    extendItem: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否打开事件
    openListeners: {
      type: Boolean,
      default: true
    }
  },
  render() {
    let type
    for (const key in layouts.config) {
      if (layouts.config[key].includes(this.config.el)) {
        type = key
        break
      }
    }
    return layouts[type].call(this, `el-${this.config.el}`)
  }
}
</script>

