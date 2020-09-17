# 待优化

### searchModule
1. 添加textarea
2. 考虑页面中有多个搜索框
3. dialog配置可以不配置key
5. initObj可以不传对话框配置

### tableModule
1. 考虑页面中有多个table
3. allData去掉
4. formatterFn在配置项里不执行，应改为formatter（修改utils里的方法）

### dialogModule
1. checkbox的value默认给空数组，而不是空字符串（给个初始value配置项）
2. rules在initObj中剔除
3. switch可配

### searchModule完善了功能
1. min控制最小展示数量，min=0全部展示
2. default控制默认搜索内容
3. 查询按钮名称可配queryName
4. 标题header插槽可配
5. 按钮btn插槽可配
6. 添加规则
7. 添加ref