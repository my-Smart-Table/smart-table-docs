# 表格操作

SmartTable 中的数据以 **Base（多维表格） → Table（数据表） → Record（记录）** 的层级组织。本章介绍如何创建、编辑和管理数据表，以及如何维护表中的字段、记录和视图。

## 创建数据表

在 Base 中，您可以通过以下三种方式创建数据表：

### 从空白创建

1. 点击左侧数据表区域旁的「+」按钮。
2. 选择「创建空白表」。
3. 输入数据表名称。
4. 点击「创建」。

### 从模板创建

SmartTable 内置了多种常用模板（如项目管理、客户关系、任务跟踪等），选择模板后即可快速生成对应的数据表结构和示例数据。

### 导入数据

::: tip 支持的文件格式
- CSV 文件
- Excel 文件（.xlsx / .xls，支持多 Sheet）
- JSON 文件
:::

1. 点击「+」按钮，选择「导入数据」。
2. 选择本地文件并上传。
3. 预览字段映射，确认导入设置。
4. 点击「开始导入」，系统会自动创建新表并写入数据。

<img src="/images/user-guide/basic-features/table-operations/table-operations-excel-import.png" alt="Excel 导入创建表" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

导入过程中，系统会展示字段映射预览界面，方便你确认数据是否正确解析：

<img src="/images/user-guide/basic-features/table-operations/table-operations-data-import-preview.png" alt="数据导入预览" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

## 数据表基本操作

创建数据表后，您可以对其进行以下管理：

| 操作 | 说明 |
| --- | --- |
| **重命名** | 双击数据表名称或右键选择「重命名」。 |
| **复制** | 右键选择「复制」，生成结构相同的副本。 |
| **删除** | 右键选择「删除」，删除后不可恢复，请谨慎操作。 |
| **拖拽排序** | 按住数据表标签拖拽，调整数据表在左侧列表中的顺序。 |
| **收藏** | 将常用数据表加入收藏，方便快速访问。 |

## 字段管理

字段定义了数据表的结构。点击表头区域可对字段进行管理：

- **添加字段**：在表尾点击「+」选择字段类型并配置。
- **编辑字段**：点击字段下拉菜单，修改字段名称、类型、默认值、验证规则等。
- **调整顺序**：拖拽字段表头调整列顺序。
- **显示/隐藏**：在视图设置中控制字段的显示与隐藏。
- **字段配置**：不同字段类型拥有专属配置项，例如单选字段可定义选项和颜色，数字字段可设置小数位数和格式。

<img src="/images/user-guide/basic-features/table-operations/table-operations-field-config.png" alt="字段配置面板" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

SmartTable 支持 [26 种字段类型](/zh-CN/user-guide/field-types.html)，覆盖文本、数值、日期、选择、关联、公式、附件等场景。单行文本字段还支持**正则表达式校验**，可自定义规则与校验提示，并内置国内电话、邮编、身份证、IPv4 等常用预设。

<img src="/images/user-guide/basic-features/txt_regx.jpeg" alt="字段正则校验配置" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

## 记录管理

记录是数据表中的一行数据。SmartTable 提供了完整的记录操作能力：

### 添加记录

- 点击表格底部的「+」按钮。
- 在最后一行按 `Enter` 快速新增。
- 使用快捷键 `Ctrl + N`（Windows）或 `Cmd + N`（Mac）。

### 编辑记录

1. 点击需要编辑的单元格。
2. 输入或选择内容。
3. 点击其他单元格或按 `Enter` 保存。

::: tip 自动保存
SmartTable 会自动保存单元格修改，所有变更都会记录到历史记录中，方便后续追溯。
:::

### 删除记录

1. 选中需要删除的行。
2. 右键选择「删除」或按 `Delete` 键。
3. 确认删除操作。

::: warning 注意
删除记录后不可恢复，请在操作前确认数据已备份或确实不再需要。
:::

### 批量操作

选中多条记录后，可对选中记录执行批量操作：

- 批量复制
- 批量删除
- 批量修改字段值

### 记录详情与历史

点击记录行可打开记录详情抽屉，查看和编辑完整字段内容，并查看该记录的变更历史。

<img src="/images/user-guide/basic-features/table-operations/table-operations-record-detail.png" alt="记录详情抽屉" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

## 视图管理

视图决定了数据表的呈现方式。每个数据表可以创建多个视图，不同视图拥有独立的筛选、排序、分组和字段显示配置。

<img src="/images/user-guide/basic-features/table-operations/table-operations-table-view.png" alt="表格视图主界面" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

### 创建视图

1. 点击右上角视图切换区域。
2. 选择「创建视图」。
3. 选择视图类型（表格、看板、甘特图、日历等）。
4. 配置视图名称。

### 视图配置

在视图设置中，您可以：

- **筛选**：设置多条件组合筛选，支持 AND/OR 逻辑。
- **排序**：配置多字段排序及优先级。
- **分组**：按字段分组展示，最多支持 3 级分组。
- **冻结列**：冻结左侧或右侧列，方便查看宽表格。
- **字段显示**：控制哪些字段在当前视图中显示或隐藏。

### 视图切换

点击右上角视图名称即可在不同视图间切换，包括：

- [表格视图](/zh-CN/user-guide/views/table-view.html)
- [看板视图](/zh-CN/user-guide/views/kanban-view.html)
- [甘特图](/zh-CN/user-guide/views/gantt-view.html)
- [日历视图](/zh-CN/user-guide/views/calendar-view.html)
- 表单视图、画廊视图、分组视图

## 导入与导出

### 导入数据

支持从 Excel、CSV、JSON 文件导入数据，导入时可以选择在现有表中追加数据，或直接创建新表。

### 导出数据

支持将当前视图的数据导出为 Excel、CSV 或 JSON，并可自定义导出的字段范围。

## 相关链接

- [字段类型](/zh-CN/user-guide/field-types.html)
- [表格视图](/zh-CN/user-guide/views/table-view.html)
- [看板视图](/zh-CN/user-guide/views/kanban-view.html)
- [甘特图](/zh-CN/user-guide/views/gantt-view.html)
- [日历视图](/zh-CN/user-guide/views/calendar-view.html)
- [协作功能](/zh-CN/user-guide/collaboration.html)
