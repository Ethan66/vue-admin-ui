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
    }
  },
  computed: {
    type () {
      return this.config.type
    }
  },
  render (h) {
    const { key, $attr, $on } = this.config
    const result = this.result
    const type = this.type
    if (type === 'input') {
      return (
        <el-input
          v-model={result[key]}
          {...{ attrs: $attr } }
          { ...{ on: $on } }
        ></el-input>)
    } else if (type === 'select') {
      return (
        <el-select
          v-model={result[key]}
          {...{ attrs: $attr } }
          { ...{ on: $on } }
        >
          {this.config.options.map((item, index) => {
            return <el-option key={index} label={item.label} value={item.value}></el-option>
          })}
        </el-select>
      )
    } else if (this.dateTypeList.includes(type)) {
      return (
        <el-col>
          <el-date-picker
            type={type}
            v-model={result[key]}
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
