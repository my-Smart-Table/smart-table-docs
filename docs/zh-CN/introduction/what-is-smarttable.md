# SmartTable 是什么？

SmartTable 是一款基于 **Vue 3 + Flask** 构建的开源智能多维表格系统，定位类似 Airtable 或飞书多维表格。它通过灵活的字段、多样的视图和丰富的协作能力，帮助个人和团队把零散数据整理成结构化的业务系统。

## 核心定位

- **多维表格**：一个 Base 可包含多张数据表，表与表之间可通过关联字段建立关系。
- **多视图**：同一套数据可用表格、看板、甘特图、日历、画廊、表单、分组等多种方式呈现。
- **低代码自动化**：通过可视化工作流和公式字段，减少重复性手工操作。
- **实时协作**：基于 WebSocket 的多人实时编辑，支持在线状态、视图同步、单元格锁定和冲突检测。

## 主要能力概览

| 能力 | 说明 |
| --- | --- |
| **数据表管理** | 一个 Base 内支持多张数据表，支持拖拽排序、重命名、复制与删除。 |
| **字段管理** | 提供 [26 种字段类型](/zh-CN/user-guide/field-types.html)，覆盖文本、数字、日期、选择、关联、公式、附件等常见场景。 |
| **视图管理** | 提供 [7 种视图类型](/zh-CN/user-guide/views/table-view.html)，每种视图拥有独立的筛选、排序和分组配置。 |
| **数据处理** | 支持多条件组合筛选、多字段排序、多级分组、47 个内置函数的公式计算，以及 Excel / CSV / JSON 的导入导出。 |
| **工作流自动化** | 可视化工作流设计器，支持定时触发、记录创建/更新触发，以及创建记录、更新记录、Webhook、条件分支等节点。 |
| **协作与分享** | Base 分享、表单分享、仪表盘分享、成员角色管理和实时协作编辑。 |
| **文档管理** | 支持基于 Quill 的富文本编辑和 Markdown 编写，支持 PDF 导出和版本历史。 |

::: tip 快速上手
如果您是第一次使用 SmartTable，建议先阅读[快速开始](/zh-CN/user-guide/getting-started.html)，了解如何创建第一个 Base 和数据表。
:::

## 技术栈简述

- **前端**：Vue 3 + TypeScript + Vite + Pinia + Element Plus
- **后端**：Flask + SQLAlchemy + Alembic
- **数据库**：SQLite（默认）/ PostgreSQL（生产推荐）
- **实时通信**：WebSocket（Socket.IO），可选启用

更多架构细节可参考[架构设计](/zh-CN/developer/architecture.html)。

## 开源协议

SmartTable 基于 [MIT 协议](https://opensource.org/licenses/MIT) 开源。
