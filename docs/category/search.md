# SearchModule 搜索框

### Input 输入框

:::demo [disabled]() 控制禁用，[clearable]() 控制清空，[maxlength]() 控制最大长度
```html
<template>
  <div>
    <search-module :items="searchItem" v-model="searchValues" @search="onSearch"></search-module>
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}
  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          search: {
            basic: { label: '基础' },
            disable: { label: '禁用', disabled: true },
            clear: { label: '可清空', clearable: true },
            max: { label: '最大输入', maxlength: 3 },
            icon: { label: 'icon', 'suffix-icon': 'el-icon-date' }
          }
        }
      })
    },
    methods: {
      onSearch (val) { alert(JSON.stringify(val)) }
    }
  }
</script>
```
:::

### Select 选择器
:::demo [disabled]() 控制禁用，[clearable]() 控制清空，[multiple]() 控制多选
```html
<template>
  <div>
    <search-module :items="searchItem" v-model="searchValues" @search="onSearch"></search-module>
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}
  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          search: {
            status: { label: '基础', type: 'select', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] },
            moreSelect: { label: '多选', type: 'select', multiple: true, options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] }
          }
        }
      })
    },
    methods: {
      onSearch (val) { alert(JSON.stringify(val)) }
    }
  }
</script>
```
:::

### Date 选择器
:::demo [type]() 控制类型，[daterange]() 需要传key，key为字符串并逗号隔开
```html
<template>
  <div>
    <search-module :items="searchItem" v-model="searchValues" @search="onSearch"></search-module>
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}
  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          search: {
            daterange: { label: '时间', key: 'str1,str2', type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期' },
            date: { label: '时间', type: 'date' },
            week: { label: '周', type: 'week', format: 'yyyy 第 WW 周' },
            month: { label: '月', type: 'month' },
            year: { label: '年', type: 'year' }
          }
        }
      })
    },
    methods: {
      onSearch (val) { alert(JSON.stringify(val)) }
    }
  }
</script>
```
:::

### 监听改变
:::demo [change]() 控制监听
```html
<template>
  <div>
    <search-module :items="searchItem" v-model="searchValues" @search="onSearch"></search-module>
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}
  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return new InitObj({
        items: {
          search: {
            disable: { label: '禁止输入', disabled: true },
            listen: { label: '监听改变', type: 'select', options: [{ label: '允许输入', value: 1 }, { label: '禁止输入', value: 2 }], change: this.onChange }
          }
        }
      })
    },
    methods: {
      onSearch (val) { alert(JSON.stringify(val)) },
      onChange (val) { this.searchItem[0].$attr.disabled = val === 2 }
    }
  }
</script>
```
:::

### Slot 插槽
:::demo [slot]() 控制插槽
```html
<template>
  <div>
    <search-module :items="searchItem" v-model="searchValues" @search="onSearch">
      <el-select slot="slot1" v-model="searchValues.slot" placeholder="请选择">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
    </search-module>
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}
  const InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
  export default {
    data () {
      return Object.assign(new InitObj({
        items: {
          search: {
            slot: { label: '插槽', slot: 'slot1' }
          }
        }
      }), {
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }]
      })
    },
    methods: {
      onSearch (val) { alert(JSON.stringify(val)) }
    }
  }
</script>
```
:::
