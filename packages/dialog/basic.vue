<script>
export default {
  name: 'basic-module',
  props: {
    config: {
      type: Object,
      default () {
        return {}
      }
    },
    result: {
      type: Object,
      default () {
        return {}
      }
    },
    dateTypeList: {
      type: Array
    },
    allRead: Boolean
  },
  computed: {
    type () {
      return this.config.type
    }
  },
  render (h) {
    const { key, $attr, $on } = this.config
    const allRead = this.allRead
    const result = this.result
    const type = this.type
    if (type === 'text') {
      return (
        <el-input
          v-model={result[key]}
          type={type}
          disabled={$attr.disabled || allRead}
          {...{ attrs: $attr } }
          { ...{ on: $on } }
        ></el-input>)
    } else if (type === 'select') {
      return (
        <el-select
          v-model={result[key]}
          disabled={$attr.disabled || allRead}
          {...{ attrs: $attr } }
          { ...{ on: $on } }
        >
          {this.config.options.map((item, index) => {
            return <el-option key={index} label={item.label} value={item.value}></el-option>
          })}
        </el-select>
      )
    } else if (type === 'radio') {
      return (
        <el-radio-group
          v-model={result[key]}
          disabled={$attr.disabled || allRead}
          size={$attr.size || 'small'}
          {...{ attrs: $attr } }
          { ...{ on: $on } }
        >
          {this.config.options.map((item, index) => <el-radio label={item.value} key={index}>{item.label}</el-radio>
          )}
        </el-radio-group>
      )
    } else if (type === 'checkbox') {
      return (
        <el-checkbox-group
          v-model={result[key]}
          disabled={$attr.disabled || allRead}
          size={$attr.size || 'small'}
          {...{ attrs: $attr }}
          {...{ on: $on }}
        >
          {this.config.options.map((item, index) => <el-checkbox label={item.value} key={index}>{item.label}</el-checkbox>)}
        </el-checkbox-group>
      )
    } else if (type === 'switch') {
      return (
        <el-switch
          v-model={result[key]}
          disabled={$attr.disabled || allRead}
          {...{ attrs: $attr }}
          {...{ on: $on }}
        >
        </el-switch>
      )
    } else if (this.dateTypeList.includes(type)) {
      return (
        <el-col>
          <el-date-picker
            type={type}
            v-model={result[key]}
            disabled={$attr.disabled || allRead}
            {...{ attrs: $attr }}
            { ...{ on: $on } }
            style="width: 100%;"></el-date-picker>
        </el-col>
      )
    }
    return null
  }
}
</script>
