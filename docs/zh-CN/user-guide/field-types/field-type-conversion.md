# 字段类型转换规则

本文档梳理 SmartTable「已创建字段修改类型」的完整判定逻辑与实现规则，供产品与开发参考。实现位于后端 `app/services/field_service.py`（`_is_valid_type_conversion`、`_evaluate_conversion`、`get_convertible_types`、`update_field`）。

## 一、触发场景与三档结果

当修改一个已创建字段的「字段类型」时，系统会综合以下因素给出结论：

- 该字段**是否已经存在数据**；
- 该字段**是否为主字段（记录标题）**；
- 原类型与目标类型。

最终结果为三档之一：

| 结果 | 含义 | 前端表现 |
| --- | --- | --- |
| `allowed` | 直接放行（无损） | 选项可点，直接转换 |
| `lossy` | 有损，需二次确认 | 选项可点，提交前弹确认框 |
| `forbidden` | 禁止转换 | 选项置灰，并展示禁止原因 |

提供可转换清单的接口为 `get_convertible_types(field)`，返回 `{ hasData, allowed[], blocked[] }`，前端据此启用/禁用选项并展示原因与告知文案。

## 二、总体判定顺序（`_is_valid_type_conversion`）

按顺序短路判定，**命中即返回**：

1. **同类型**：`from == to` → `allowed`。
2. **主字段自动编号降级为文本类**：`is_primary && from == auto_number && to ∈ 文本类` → `allowed`（详见第五节）。
3. **字段暂无数据**：`!has_data` → `allowed`（可在通用限制内自由转为任意类型，含系统/引用/公式类型；目标类型所需配置由 `update_field` 在转换时校验补齐）。
4. **文本类有数据转联系方式**：`from ∈ 文本类 && to ∈ {电话, 邮箱, 链接}` → `forbidden`（详见第六节）。
5. **系统/引用/计算类型双向禁止**：`from` 或 `to` 命中 `CONVERT_FORBIDDEN_TYPES` → `forbidden`。
6. **目标为公式**：`to == formula` → `forbidden`（公式需表达式，语义上属新增计算字段）。
7. **无损白表命中**：`to ∈ LOSSLESS_CONVERSIONS[from]` → `allowed`。
8. **有损白表命中**：`to ∈ LOSSY_CONVERSIONS[from]` → `lossy`。
9. **其余**：→ `forbidden`。

> 说明：第 3 步「无数据即放行」位于第 4~9 步之前，因此**空字段**转电话/邮箱/链接仍被允许（详见第六节）；而第 2 步的自动编号例外也仅作用于「主字段 + 自动编号 → 文本」。

## 三、无损转换白表（字段已有数据时）

下表中的转换均判定为 `allowed`，原值信息被完整保留：

| 原类型 | 可无损转为 | 处理方式 |
| --- | --- | --- |
| 单行文本 | 多行文本、富文本 | 原值保留 |
| 多行文本 | 富文本 | 原值保留 |
| 单选 | 多选；单行/多行/富文本 | 单值包装为数组 `[值]` / 保留选项 ID 字符串 |
| 多选 | 单行/多行/富文本 | 保留选项 ID 字符串 |
| 邮箱 / 电话 / 链接 / 条码 | 单行/多行/富文本 | 原字符串保留 |
| 数字 / 货币 / 百分比 / 评分 / 时长 | 彼此互转；或转文本类 | 数值保留，仅展示格式变化 |
| 日期 | 日期时间（补 `T00:00:00Z`）；或转文本类 | 日期 / 原值保留 |
| 日期时间 | 单行/多行/富文本 | 原值保留（转「日期」属有损，见下） |
| 成员 | 单行/多行/富文本 | 保留成员 ID（不再关联成员） |
| 公式 | 文本类、数字、货币、百分比、评分、时长、日期、日期时间 | 固化当前计算结果，不再重算 |

> 引用型（成员、单选/多选）转文本时**保留原始 ID 字符串**（严格无损）；解析为姓名/选项名属有损，一律不做，且仅以告知条提示「将保留 ID，不再关联成员/选项」。

## 四、有损转换（全局唯一例外）

| 原类型 | 目标类型 | 说明 |
| --- | --- | --- |
| 日期时间 | 日期 | 仅保留日期部分、丢弃时间部分，且**不可恢复**。判定为 `lossy`，提交前必须二次确认，明确提示「时间部分将被丢弃且不可恢复」。 |

除上表外，其余有损转换一律禁止（如文本降级截断、多选转单选丢选项、引用型解析为名称等），以免数据异常而用户不知情。

## 五、主字段特殊规则

主字段同时作为记录标题，对其转换有额外约束（在 `_evaluate_conversion` 中判定，位于 `_is_valid_type_conversion` 之前）：

- **主字段（非自动编号）已有数据**：仅允许在**文本类之间**转换；转其它类型一律 `forbidden`，原因 `field_type_conversion_primary_text_only`。
- **主字段为自动编号且已有数据**：允许**降级为文本类**（单行/多行/富文本）。自动编号值为整数，转文本无损，且主字段作为标题保持可用。
- **反向（主字段文本有数据 → 自动编号）**：保持 `forbidden`（自动编号需系统自增，既有文本无法作为编号来源）。
- **主字段暂无数据**：不受上述限制，可转任意类型（走「无数据即放行」）。

## 六、文本 → 电话 / 邮箱 / 链接 的禁止

- **规则**：单行文本、多行文本、富文本这三类**已有数据**时，**禁止**转换为电话、邮箱、链接。原因 `field_type_conversion_text_to_contact_blocked`。
- **原因**：既有文本值往往不符合目标类型的格式校验（如文本 `abc` 不是合法邮箱/电话/URL），若放行转换会产生非法数据。
- **空字段例外**：字段暂无数据时，文本仍可在通用限制内自由转为电话/邮箱/链接——此时无既有文本需要校验，与「无数据即放行」整体设计一致。
- **反向不受影响**：电话/邮箱/链接 → 文本类 仍属无损，保持 `allowed`（任意合法电话/邮箱/链接都是合法文本）。

## 七、转换前的值兼容性预检

即便规则白表已放行，在 `update_field` 实际写库前仍会对**全部已有记录值**做兼容性预检（`_precheck_values`）：

- 对每条记录取原值，调用 `_value_fits_type(转换后值, 目标类型)` 校验；
- 只要存在**任一不兼容值**，整字段转换被拒绝，返回不兼容条数与样例；
- **绝不**静默改写或置空数据。

该预检是兜底安全网：当某转换在规则层被放行、但个别数据无法承载时，避免脏数据落库。

## 八、禁止转换的原因映射

不同禁止场景会在前端展示对应的原因文案（i18n key）：

| 场景 | i18n key |
| --- | --- |
| 系统字段类型（创建人/更新人/自动编号等） | `field_type_conversion_blocked_system_type` |
| 引用/计算类型（关联/查找/汇总/按钮等） | `field_type_conversion_blocked_reference_type` |
| 目标为公式 | `field_type_conversion_blocked_target_formula` |
| 主字段（非自动编号）有数据转非文本类 | `field_type_conversion_primary_text_only` |
| 文本类有数据转电话/邮箱/链接 | `field_type_conversion_text_to_contact_blocked` |
| 其它有损/无白表命中 | `field_type_conversion_blocked_lossy` |

## 九、告知提示（notice）场景

部分 `allowed` 转换虽然无损，但行为会发生变化，前端会以告知条提示（`_evaluate_conversion` 的 `notice` 字段）：

| 转换 | 告知 key |
| --- | --- |
| 有损：日期时间 → 日期 | `field_type_conversion_lossy_datetime_to_date` |
| 公式 → 其它类型（结果冻结） | `field_type_conversion_notice_formula_freeze` |
| 成员 → 文本类（保留成员 ID） | `field_type_conversion_notice_keep_member_id` |
| 单选/多选 → 文本类（保留选项 ID） | `field_type_conversion_notice_keep_option_id` |

## 十、与其它模块的联动

- **`get_convertible_types(field)`**：为前端类型选择器提供 `allowed` / `blocked` 清单，包含 `lossy` 标记与 `notice` 文案，前端据此禁用选项、弹出确认或告知。
- **`update_field`**：先经 `_evaluate_conversion` 判定；`forbidden` 直接拒绝（返回 `errorKey` 供前端识别原因）；`lossy` 需客户端携带 `confirmLossy` 重新提交；通过后再做值兼容性预检，最后调用 `_convert_record_values` 迁移全部记录值。

## 相关链接

- [字段类型概览](/zh-CN/user-guide/field-types.html)
- [关联字段详解](/zh-CN/user-guide/field-types/link-field.html)
- [查找字段详解](/zh-CN/user-guide/field-types/lookup-field.html)
- [公式字段详解](/zh-CN/user-guide/field-types/formula-field.html)
