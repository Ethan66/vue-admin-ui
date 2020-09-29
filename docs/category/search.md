# SearchModule 搜索框

### Input 输入框

:::demo [disabled]() 控制禁用，[clearable]() 控制清空，[maxlength]() 控制最大长度
```html
<template>
  <div>
    <search-module :items="searchItem" v-model="searchValues" @search="onSearch" />
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const InitObj = adminMethods.onCreateBasicData()
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
    <search-module :items="searchItem" v-model="searchValues" @search="onSearch" />
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const InitObj = adminMethods.onCreateBasicData()
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
    <search-module :items="searchItem" v-model="searchValues" @search="onSearch" />
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const InitObj = adminMethods.onCreateBasicData()
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
    <search-module :items="searchItem" v-model="searchValues" @search="onSearch" />
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const InitObj = adminMethods.onCreateBasicData()
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

### 个数展示控制

:::demo [min]() 控制展示个数，[min=0]() 表示展示全部
```html
<template>
  <div>
    <search-module min="1" :items="searchItem" v-model="searchValues" @search="onSearch" />
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const InitObj = adminMethods.onCreateBasicData()
  export default {
    data () {
      return new InitObj({
        items: {
          search: {
            basic: { label: '基础' },
            disable: { label: '禁用' },
            icon: { label: 'icon', 'suffix-icon': 'el-icon-date' }
          }
        }
      })
    },
    methods: {
      onSearch (val) {
        alert(JSON.stringify(val))
      }
    }
  }
</script>
```
:::

### 默认值

:::demo [default]() 传入默认值
```html
<template>
  <div>
    <search-module :items="searchItem" v-model="searchValues" :default="defaultObj" @search="onSearch" />
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const InitObj = adminMethods.onCreateBasicData()
  export default {
    data () {
      return Object.assign(new InitObj({
        items: {
          search: {
            basic: { label: '基础' },
            disable: { label: '禁用' },
            icon: { label: 'icon', 'suffix-icon': 'el-icon-date' }
          }
        }
      }), {
        defaultObj: { basic: '我是默认基础', disable: '我是默认禁用' }
      })
    },
    methods: {
      onSearch (val) {
        alert(JSON.stringify(val))
      }
    }
  }
</script>
```
:::

### 个性化按钮和标题

:::demo [showQuery]() 控制查询按钮展示，[showReset]() 控制重置按钮展示，[slot=header]() 个性化控制标题，[slot=btn]() 个性化按钮
```html
<template>
  <div>
    <search-module :items="searchItem" v-model="searchValues" :showReset="false" :showQuery="false" @search="onSearch">
      <h3 slot="header">我的标题</h3>
      <el-button slot="btn" type="primary" icon="el-icon-search">分配</el-button>
    </search-module>
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const InitObj = adminMethods.onCreateBasicData()
  export default {
    data () {
      return new InitObj({
        items: {
          search: {
            basic: { label: '基础' },
            disable: { label: '禁用' },
            icon: { label: 'icon', 'suffix-icon': 'el-icon-date' }
          }
        }
      })
    },
    methods: {
      onSearch (val) {
        alert(JSON.stringify(val))
      }
    }
  }
</script>
```
:::

### 只输入数字

:::demo 通过[input]() 方法进行校验
```html
<template>
  <div>
    <search-module :items="searchItem" v-model="searchValues" @search="onSearch" />
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const InitObj = adminMethods.onCreateBasicData()
  export default {
    data () {
      return new InitObj({
        items: {
          search: {
            basic: { label: '数字', input: this.input }
          }
        }
      })
    },
    methods: {
      input () {
        this.$nextTick(() => {
          this.searchValues.basic = this.searchValues.basic.replace(/[^\d]/g, '')
        })
      },
      onSearch (val) {
        alert(JSON.stringify(val))
      }
    }
  }
</script>
```
:::

### rules 规则校验

:::demo [rules]() 配置规则
```html
<template>
  <div>
    <search-module ref="search" :items="searchItem" v-model="searchValues" :rules="rules" @search="onSearch" />
  </div>
</template>
<script>
  import { adminMethods } from 'vue-admin-ui-lib'
  const InitObj = adminMethods.onCreateBasicData()
  export default {
    data () {
      return Object.assign(new InitObj({
        items: {
          search: {
            basic: { label: '基础' },
            disable: { label: '禁用' },
            icon: { label: 'icon', 'suffix-icon': 'el-icon-date' }
          }
        }
      }), {
        rules: {
          basic: [{ required: true, message: '请输入内容', trigger: 'blur' }]
        }
      })
    },
    methods: {
      onSearch (val) {
        this.$refs.search.$refs.search.validate(valid => {
          if (valid) {
            alert(JSON.stringify(val))
          }
        })
      }
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
  const InitObj = adminMethods.onCreateBasicData()
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

### 参数列表
|参数|说明|类型|默认值|
|:--:|:--:|:--:|:--:|
|lable|标签|string|——|
|maxlength|最大可输入|number|——|
|clearabled|是否可清除|boolean|false|
|disabled|禁用|boolean|false|
||||——|
||||——|
