<template>
  <div class="edition-compare">
    <!-- 顶部 Hero -->
    <div class="ec-hero">
      <h1>{{ c.heroTitle }}</h1>
      <p class="ec-sub">{{ c.heroSub }}</p>
      <div class="ec-badges">
        <span v-for="b in c.badges" :key="b" class="ec-badge">{{ b }}</span>
      </div>
    </div>

    <!-- 版本卡片 -->
    <div class="ec-plans">
      <div
        v-for="plan in c.plans"
        :key="plan.key"
        class="ec-plan"
        :class="{ 'ec-plan--featured': plan.featured }"
      >
        <div v-if="plan.featured" class="ec-ribbon">{{ c.ribbon }}</div>
        <h3 class="ec-plan-name">{{ plan.name }}</h3>
        <div class="ec-plan-price">
          <span v-if="plan.offerTag" class="ec-offer-tag">{{ plan.offerTag }}</span>
          <span class="ec-price-num">{{ plan.price }}</span>
          <span class="ec-price-unit">{{ plan.priceUnit }}</span>
        </div>
        <p class="ec-price-note" :class="{ 'ec-price-note--hot': plan.offerTag }">{{ plan.priceNote }}</p>
        <p class="ec-plan-tagline">{{ plan.tagline }}</p>
        <ul class="ec-plan-list">
          <li v-for="item in plan.highlights" :key="item">{{ item }}</li>
        </ul>
        <a class="ec-plan-cta" :class="{ 'ec-cta--brand': plan.featured }" :href="withBase(plan.ctaLink)">
          {{ plan.ctaText }}
        </a>
      </div>
    </div>

    <!-- 功能对比明细（单一完整大表格） -->
    <h2 class="ec-table-title">{{ c.tableTitle }}</h2>

    <div class="ec-table-wrap">
      <table>
        <thead>
          <tr>
            <th class="ec-col-feature">{{ c.colFeature }}</th>
            <th class="ec-col-plan">{{ c.colPlans[0] }}</th>
            <th class="ec-col-plan">{{ c.colPlans[1] }}</th>
            <th class="ec-col-plan ec-col-pro">{{ c.colPlans[2] }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="group in c.groups" :key="group.title">
            <tr class="ec-group-row">
              <td colspan="4">{{ group.title }}</td>
            </tr>
            <tr v-for="row in group.rows" :key="group.title + row.name">
              <td class="ec-cell-feature">
                <span class="ec-fname">{{ row.name }}</span>
                <span v-if="row.desc" class="ec-fdesc">{{ row.desc }}</span>
              </td>
              <td v-for="(v, i) in row.values" :key="i" :class="{ 'ec-cell-pro': i === 2 }">
                <span v-if="v === true" class="ec-yes">✓</span>
                <span v-else-if="v === false" class="ec-no">—</span>
                <span v-else class="ec-text">{{ v }}</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- 版本拓扑说明 -->
    <div class="ec-note">
      <strong>{{ c.noteTitle }}</strong>
      <p>{{ c.noteText }}</p>
    </div>

    <!-- 选型建议 -->
    <h2 class="ec-table-title">{{ c.choiceTitle }}</h2>
    <div class="ec-choice">
      <div v-for="ch in c.choices" :key="ch.title" class="ec-choice-card">
        <h4>{{ ch.title }}</h4>
        <p>{{ ch.desc }}</p>
        <p class="ec-choice-plan">→ {{ ch.plan }}</p>
      </div>
    </div>

    <!-- 常见问题 -->
    <h2 class="ec-table-title">{{ c.faqTitle }}</h2>
    <div class="ec-faq">
      <div v-for="(f, i) in c.faqs" :key="i" class="ec-faq-item">
        <div class="ec-faq-q">
          <span class="ec-faq-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span>{{ f.q }}</span>
        </div>
        <div class="ec-faq-a">{{ f.a }}</div>
      </div>
    </div>

    <div class="ec-note">
      <strong>{{ c.ctaTitle }}</strong>
      <p v-html="c.ctaHtml"></p>
    </div>
  </div>
</template>

<script setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { site } = useData()
const isEn = computed(() => site.value.lang === 'en-US')
const c = computed(() => (isEn.value ? en : zh))

const zh = {
  heroTitle: '选择适合你的 SmartTable',
  heroSub:
    'SmartTable 采用「一套内核、逐层叠加」的版本体系：社区版提供完整的开源多维表格内核，标准版与专业版在其基础上叠加商业特性模块，全部支持私有化部署。',
  badges: ['MIT 开源内核', '私有化部署', '上层版本向下完全兼容'],
  ribbon: '推荐',
  colFeature: '功能',
  colPlans: ['社区版', '标准版', '专业版'],
  tableTitle: '功能对比明细',
  noteTitle: '版本层级关系',
  noteText:
    '社区版→ 标准版（ 社区版 + 标准特性功能）→ 专业版（标准版 + 专业特性功能）。上层版本始终包含下层全部功能，可随时随业务增长平滑升级。',
  choiceTitle: '如何选择',
  faqTitle: '常见问题',
  ctaTitle: '获取商业版',
  ctaHtml:
    '标准版与专业版通过商业授权提供，授权后可获得对应功能。请参考 <a href="/zh-CN/introduction/follow-us.html">关注我们</a> 页面了解联系方式，社区版可直接参考 <a href="/zh-CN/developer/deployment/one-click.html">一键部署文档</a> 快速上手。',
  plans: [
    {
      key: 'community',
      name: '社区版',
      branch: 'feat-plugin（与 dev/main 同步）',
      price: '¥0',
      priceUnit: '/年',
      offerTag: '',
      priceNote: '永久免费 · 开源',
      tagline: '完整的开源多维表格内核，适合个人与团队直接用表格协作',
      highlights: [
        '27 种字段类型 / 7 种视图 / 主从表 / 树形记录',
        '公式引擎（70+ 函数）与工作流自动化',
        '实时协作、仪表盘、文档、插件扩展体系',
        'Docker 一键部署，SQLite / PostgreSQL / ARM',
        'OAuth2 开放 API、中英双语'
      ],
      ctaText: '查看部署文档',
      ctaLink: '/zh-CN/developer/deployment/one-click.html',
      featured: false
    },
    {
      key: 'standard',
      name: '标准版',
      branch: 'feat/field-auth-base',
      price: '¥199',
      priceUnit: '/年',
      offerTag: '限时特惠',
      priceNote: '不限席位、不限记录行数、不限调用次数',
      tagline: '面向小微企业和团队落地场景，社区版基础上增加一般企业级特性',
      highlights: [
        '包含社区版全部功能，品牌定制',
        '打印模板设计器：逐条/汇总打印、共享与导入导出、套打',
        '完整移动端 H5（表格/看板/日历/画廊/表单）',
        '高级权限：字段列权限、数据条件权限、权限规则组',
        '自定义角色 + 有效权限预览'
      ],
      ctaText: '联系我们获取授权',
      ctaLink: '/zh-CN/introduction/follow-us.html',
      featured: false
    },
    {
      key: 'pro',
      name: '专业版',
      branch: 'feat/approval-flows',
      price: '¥399',
      priceUnit: '/年',
      offerTag: '限时特惠',
      priceNote: '不限席位、不限记录行数、不限调用次数',
      tagline: '面向中小型企业和团队落地场景，标准版基础上增加更多企业专业特性',
      highlights: [
        '包含标准版全部功能',
        '应用模式：可视化构建器、独立登录、模板市场（18 套模板）',
        '审批流：6 类节点、或签/会签/串行、版本快照',
        'AI 能力：AI 助手、RAG 问答、AI 字段、智能洞察',
        '应用内审批页集成（跨 Base 聚合）'
      ],
      ctaText: '联系我们获取授权',
      ctaLink: '/zh-CN/introduction/follow-us.html',
      featured: true
    }
  ],
  groups: [
    {
      title: '多维表格核心',
      rows: [
        { name: '字段类型', desc: '文本、数字、日期、成员、附件、公式、关联、查找、地理位置等 27 种', values: [true, true, true] },
        { name: '视图类型', desc: '表格、分组、看板、日历、甘特图、画廊、表单', values: [true, true, true] },
        { name: '主从表 / 树形层级记录', values: [true, true, true] },
        { name: '公式引擎', desc: '70+ 内置函数、跨表整列引用、保存前校验', values: [true, true, true] },
        { name: '工作流自动化', desc: '定时/记录触发器、条件分支、循环节点、自定义脚本、Webhook', values: [true, true, true] },
        { name: '仪表盘', desc: 'KPI 卡片、图表、实时数据、分享', values: [true, true, true] },
        { name: '文档', desc: '富文本 / Markdown、PDF 导出、版本历史', values: [true, true, true] },
        { name: '插件扩展体系', desc: 'UI 插件（iframe 沙箱）+ 脚本插件（受限子进程）', values: [true, true, true] },
        { name: '数据导入导出', desc: 'Excel / CSV / JSON', values: [true, true, true] }
      ]
    },
    {
      title: '协作与分享',
      rows: [
        { name: '实时多人编辑', desc: '单元格锁、冲突检测、在线状态', values: [true, true, true] },
        { name: 'Base / 表单 / 仪表盘分享', values: [true, true, true] },
        { name: '所有权转移、表格数据刷新', values: [true, true, true] },
        { name: '中英双语、第三方登录', values: [true, true, true] },
        { name: '系统品牌定制', desc: 'Logo 上传、产品名称、登录页动态配置', values: [false, true, true] }
      ]
    },
    {
      title: '打印',
      rows: [
        { name: '可视化打印模板设计器', desc: '支持毫米级绝对定位，字段/系统字段拖入绑定', values: [false, true, true] },
        { name: '批量打印', desc: '逐条打印（每条一页）与表格汇总（单页列表）、分页预览', values: [false, true, true] },
        { name: '模板共享与迁移', desc: '私有/共享（按最低使用角色）、导入导出跨 Base / 跨实例', values: [false, true, true] },
        { name: '套打支持', desc: '预印单据对齐、打印偏移校准', values: [false, true, true] }
      ]
    },
    {
      title: '移动端',
      rows: [
        { name: '完整移动端 H5', desc: '登录注册、表格/看板/日历/画廊/表单视图、记录编辑、文档、仪表盘、通知', values: [false, true, true] },
        { name: '移动端权限适配', values: [false, true, true] }
      ]
    },
    {
      title: '高级权限',
      rows: [
        { name: '自定义角色', desc: '系统预设 5 角色（Owner/Admin/Editor/Commenter/Viewer）+ 自定义角色', values: [false, true, true] },
        { name: '字段列权限', desc: 'none / read / write，优先级最高', values: [false, true, true] },
        { name: '数据权限', desc: '仅自己创建 / 条件筛选（AND/OR 组合、动态变量）', values: [false, true, true] },
        { name: '仪表盘 / 文档权限', values: [false, true, true] },
        { name: '权限规则组', desc: '用户直配 / 角色继承 / 批量分配、启用禁用、有效权限预览', values: [false, true, true] }
      ]
    },
    {
      title: '应用模式',
      rows: [
        { name: '应用构建器', desc: '菜单结构、页面配置、应用设置、权限配置 4 大模块，9 种拖拽组件', values: [false, false, true] },
        { name: '应用运行时', desc: '独立访问地址、应用外壳、按页面类型渲染', values: [false, false, true] },
        { name: '应用鉴权', desc: '独立登录页、私有/公开/令牌访问模式、游客访问', values: [false, false, true] },
        { name: '应用级权限', desc: 'Owner/Editor/Viewer + 自定义角色 + 菜单权限矩阵', values: [false, false, true] },
        { name: '模板市场', desc: '6 大分类 18 套内置模板，模板导入导出', values: [false, false, true] }
      ]
    },
    {
      title: '审批流',
      rows: [
        { name: '可视化流程画布', desc: '6 种节点类型（开始/审批/抄送/条件分支/自动填写/结束）', values: [false, false, true] },
        { name: '灵活审批规则', desc: '或签 / 会签 / 串行；5 种审批人来源；超时配置', values: [false, false, true] },
        { name: '审批事务', desc: '待办 / 已办 / 抄送 / 我发起的；驳回重提与作废、转交', values: [false, false, true] },
        { name: '版本快照机制', desc: '发布冻结版本，运行中实例不受后续编辑影响，版本历史对比', values: [false, false, true] },
        { name: '通知提醒', desc: '关键节点邮件通知 + 实时推送', values: [false, false, true] },
        { name: '应用集成', desc: '流程发起页 / 审批事务页，跨 Base 流程聚合', values: [false, false, true] }
      ]
    },
    {
      title: 'AI 能力',
      rows: [
        { name: 'AI 助手', desc: '表格对话式问答、统计分析、写操作确认卡、附件图片理解', values: [false, false, true] },
        { name: '表格数据问答（RAG）', desc: '大表语义检索、索引管理、自动增量更新', values: [false, false, true] },
        { name: 'AI 字段', desc: '提示词模板库、单条流式生成、批量填充任务', values: [false, false, true] },
        { name: '工作流 AI 节点 / 仪表盘智能洞察 / 文档 AI', values: [false, false, true] },
        { name: 'AI 治理', desc: '模型配置（9 家预设）、功能域开关、配额策略、任务中心、用量看板', values: [false, false, true] },
        { name: '敏感字段保护', desc: 'ai_excluded 字段自动排除出上下文与索引', values: [false, false, true] }
      ]
    },
    {
      title: '部署与开放能力',
      rows: [
        { name: 'Docker 一键部署（内嵌 Redis）', values: [true, true, true] },
        { name: 'SQLite / PostgreSQL / ARM 支持', values: [true, true, true] },
        { name: 'OAuth2 + 开放 API + 审计日志', values: [true, true, true] },
        { name: '安全与邮件配置', desc: '注册开关、密码策略、会话超时、SMTP 模板', values: [true, true, true] },
        { name: '办公集成', desc: '企业微信、钉钉、飞书、泛微OA等单点集成', values: [false, false, true] },
        { name: '商业技术支持', desc: '按授权协议提供', values: ['—', '✓', '✓'] }
      ]
    }
  ],
  choices: [
    {
      title: '个人 / 小团队协作',
      desc: '直接用表格管理数据、搭建轻量业务看板，无需付费即可使用全部核心能力。',
    plan: '社区版'
    },
    {
      title: '企业内部落地',
      desc: '需要打印单据、手机端访问，或把权限精细管控到字段和数据行。',
    plan: '标准版'
    },
    {
      title: '构建业务系统',
      desc: '要把表格组装成面向最终用户的独立应用、走审批流程，或使用 AI 提效。',
    plan: '专业版'
    }
  ],
  faqs: [
    {
      q: '社区版与商业版有什么区别？',
    a: '社区版是基于 MIT 协议开源的完整多维表格内核，在保留logo和名称的前提下，可免费使用；商业版在其基础上叠加商业特性模块——标准版包含打印模板、移动端 H5 与高级权限，专业版进一步包含应用模式、审批流与全套 AI 能力。上层版本始终完全包含下层全部功能。'
    },
    {
      q: '可以先试用再采购吗？',
      a: '商业版不设独立的试用版本。建议先使用社区版完成部署与功能评估（支持 Docker 一键部署），确认功能覆盖与技术栈匹配后再采购对应商业版。'
    },
    {
      q: '如何购买商业授权？',
    a: '请通过「关注我们」页面获取联系方式并与商务团队对接，将按需求推荐合适的版本。'
    },
    {
      q: '授权价格是否可以议价？',
    a: '商业授权实行统一定价，标价即最终价格，不接受议价。'
    },
    {
      q: '授权范围如何界定？',
    a: '每份商业授权绑定一家签约主体，使用范围仅及于该主体；通过绑定部署机器授权码license进行授权绑定。'
    },
    {
      q: '商业授权能否转让或共享？',
    a: '商业授权严格绑定签约主体和部署机器，不接受转让或共享。'
    },
    {
      q: '是否提供源码？能否二次开发？',
    a: '默认不提供源码，社区版本身完全开源，可优先选择社区版进行二次开发。若需交付商业版源码需另外联系官方商谈。商业授权一旦交付对应分支的完整源码（未加密、未混淆），您可以在授权范围内进行二次开发并部署于内部业务系统，但不允许二次销售。'
    },
    {
      q: '是否支持退款？',
    a: '程序类商品具有可复制特性，一经交付即视为合同义务完成，不再受理退款。请先借助开源的社区版完成技术选型，确认契合后再行采购。'
    },
    {
      q: '包含哪些技术支持与版本更新？',
    a: '授权期内可持续获取对应分支的版本更新；常规问题通过官方交流渠道响应。深度定制、专属顾问等增值服务可另行协商。'
    },
    {
      q: '可以基于商业版发行同类竞争产品吗？',
      a: '不得基于 SmartTable 商业版对外发布或销售与之直接竞争的基础平台产品；如有相关合规需求，须事先签订书面合作协议。'
    }
  ]
}

const en = {
  heroTitle: 'Choose the SmartTable That Fits You',
  heroSub:
    'SmartTable uses an edition system of "one core, layered add-ons": the Community Edition provides the complete open-source multi-dimensional table core, while the Standard and Professional editions layer commercial feature modules on top of it. All editions support self-hosted deployment.',
  badges: ['MIT Open-source Core', 'Self-hosted Deployment', 'Fully Downward Compatible'],
  ribbon: 'Recommended',
  colFeature: 'Feature',
  colPlans: ['Community', 'Standard', 'Professional'],
  tableTitle: 'Feature Comparison',
  noteTitle: 'Edition Hierarchy',
  noteText:
    'Community Edition → Standard Edition (Community + Standard Features) → Professional Edition (Standard + Professional Features). A higher edition always includes all features of the editions below it and can be upgraded smoothly as your business grows.',
  choiceTitle: 'How to Choose',
  faqTitle: 'FAQ',
  ctaTitle: 'Get the Commercial Edition',
  ctaHtml:
    'The Standard and Professional editions are provided through commercial licensing; once licensed, you get the corresponding features. See the <a href="/en-US/introduction/follow-us.html">Follow Us</a> page for contact details, and get started with the Community Edition right away using the <a href="/en-US/developer/deployment/one-click.html">One-click Deployment guide</a>.',
  plans: [
    {
      key: 'community',
      name: 'Community Edition',
      branch: 'feat-plugin (synced with dev/main)',
      price: '$0',
      priceUnit: '/year',
      offerTag: '',
      priceNote: 'Free forever · open source',
      tagline: 'The complete open-source multi-dimensional table core, ideal for individuals and teams collaborating directly with tables',
      highlights: [
        '27 field types / 7 view types / master-detail / tree records',
        'Formula engine (70+ functions) and workflow automation',
        'Real-time collaboration, dashboards, documents, plugin system',
        'Docker one-click deployment, SQLite / PostgreSQL / ARM',
        'OAuth2 open API, bilingual UI'
      ],
      ctaText: 'View Deployment Docs',
      ctaLink: '/en-US/developer/deployment/one-click.html',
      featured: false
    },
    {
      key: 'standard',
      name: 'Standard Edition',
      branch: 'feat/field-auth-base',
      price: '$199',
      priceUnit: '/year',
      offerTag: 'Limited-time Offer',
      priceNote: 'Unlimited seats, unlimited records, unlimited API calls',
      tagline: 'For small businesses and teams: adds general enterprise-grade features on top of the Community Edition',
      highlights: [
        'All Community Edition features, brand customization',
        'Print template designer: record-wise/summary printing, sharing, import/export, overprinting',
        'Full mobile H5 (grid/kanban/calendar/gallery/form views)',
        'Advanced permissions: field-level permissions, data-condition permissions, permission rule groups',
        'Custom roles + effective permission preview'
      ],
      ctaText: 'Contact Us for a License',
      ctaLink: '/en-US/introduction/follow-us.html',
      featured: false
    },
    {
      key: 'pro',
      name: 'Professional Edition',
      branch: 'feat/approval-flows',
      price: '$399',
      priceUnit: '/year',
      offerTag: 'Limited-time Offer',
      priceNote: 'Unlimited seats, unlimited records, unlimited API calls',
      tagline: 'For small and medium-sized businesses and teams: adds more professional enterprise features on top of the Standard Edition',
      highlights: [
        'All Standard Edition features',
        'Application mode: visual builder, independent login, template marketplace (18 templates)',
        'Approval flows: 6 node types, OR/AND/serial signing, version snapshots',
        'AI capabilities: AI assistant, RAG Q&A, AI fields, smart insights',
        'In-app approval page integration (cross-Base aggregation)'
      ],
      ctaText: 'Contact Us for a License',
      ctaLink: '/en-US/introduction/follow-us.html',
      featured: true
    }
  ],
  groups: [
    {
      title: 'Multi-dimensional Table Core',
      rows: [
        { name: 'Field Types', desc: 'Text, number, date, member, attachment, formula, link, lookup, geolocation, and more — 27 types', values: [true, true, true] },
        { name: 'View Types', desc: 'Grid, grouped, kanban, calendar, gantt, gallery, form', values: [true, true, true] },
        { name: 'Master-Detail / Tree Hierarchical Records', values: [true, true, true] },
        { name: 'Formula Engine', desc: '70+ built-in functions, cross-table column references, save-time validation', values: [true, true, true] },
        { name: 'Workflow Automation', desc: 'Time/record triggers, condition branches, loop nodes, custom scripts, Webhook', values: [true, true, true] },
        { name: 'Dashboards', desc: 'KPI cards, charts, real-time data, sharing', values: [true, true, true] },
        { name: 'Documents', desc: 'Rich text / Markdown, PDF export, version history', values: [true, true, true] },
        { name: 'Plugin Extension System', desc: 'UI plugins (iframe sandbox) + script plugins (restricted subprocess)', values: [true, true, true] },
        { name: 'Data Import/Export', desc: 'Excel / CSV / JSON', values: [true, true, true] }
      ]
    },
    {
      title: 'Collaboration & Sharing',
      rows: [
        { name: 'Real-time Multi-user Editing', desc: 'Cell locks, conflict detection, online presence', values: [true, true, true] },
        { name: 'Base / Form / Dashboard Sharing', values: [true, true, true] },
        { name: 'Ownership Transfer & Table Data Refresh', values: [true, true, true] },
        { name: 'Bilingual UI (EN/CN), Third-party Login', values: [true, true, true] },
        { name: 'Brand Customization', desc: 'Logo upload, product name, dynamic login page configuration', values: [false, true, true] }
      ]
    },
    {
      title: 'Printing',
      rows: [
        { name: 'Visual Print Template Designer', desc: 'Millimeter-precise absolute positioning; drag-and-drop binding of table and system fields', values: [false, true, true] },
        { name: 'Batch Printing', desc: 'Record-wise printing (one page per record) and summary printing (single-page list), paginated preview', values: [false, true, true] },
        { name: 'Template Sharing & Migration', desc: 'Private/shared (by minimum role), import/export across Bases / instances', values: [false, true, true] },
        { name: 'Overprinting (Pre-printed Forms)', desc: 'Alignment with pre-printed forms and print offset calibration', values: [false, true, true] }
      ]
    },
    {
      title: 'Mobile',
      rows: [
        { name: 'Full Mobile H5', desc: 'Login/registration, grid/kanban/calendar/gallery/form views, record editing, documents, dashboards, notifications', values: [false, true, true] },
        { name: 'Mobile Permission Adaptation', values: [false, true, true] }
      ]
    },
    {
      title: 'Advanced Permissions',
      rows: [
        { name: 'Custom Roles', desc: '5 system preset roles (Owner/Admin/Editor/Commenter/Viewer) + custom roles', values: [false, true, true] },
        { name: 'Field-level Permissions', desc: 'none / read / write, with the highest priority', values: [false, true, true] },
        { name: 'Data Permissions', desc: 'Created-by-me / conditional filtering (AND/OR groups, dynamic variables)', values: [false, true, true] },
        { name: 'Dashboard / Document Permissions', values: [false, true, true] },
        { name: 'Permission Rule Groups', desc: 'Direct user assignment / role inheritance / batch assignment, enable/disable, effective permission preview', values: [false, true, true] }
      ]
    },
    {
      title: 'Application Mode',
      rows: [
        { name: 'Application Builder', desc: 'Four modules — menu structure, page config, app settings, permission config — with 9 drag-and-drop components', values: [false, false, true] },
        { name: 'Application Runtime', desc: 'Independent access URL, app shell, page-type-based rendering', values: [false, false, true] },
        { name: 'Application Authentication', desc: 'Independent login page, private/public/token access modes, guest access', values: [false, false, true] },
        { name: 'Application-level Permissions', desc: 'Owner/Editor/Viewer + custom roles + menu permission matrix', values: [false, false, true] },
        { name: 'Template Marketplace', desc: '6 categories, 18 built-in templates, template import/export', values: [false, false, true] }
      ]
    },
    {
      title: 'Approval Flows',
      rows: [
        { name: 'Visual Flow Canvas', desc: '6 node types (start / approval / CC / condition / auto-fill / end)', values: [false, false, true] },
        { name: 'Flexible Approval Rules', desc: 'OR-sign / AND-sign / serial; 5 approver sources; timeout settings', values: [false, false, true] },
        { name: 'Approval Tasks', desc: 'To-do / done / CC’d to me / initiated by me; reject-resubmit or void, delegation', values: [false, false, true] },
        { name: 'Version Snapshot Mechanism', desc: 'Publishing freezes the version; running instances are unaffected by later edits; version history comparison', values: [false, false, true] },
        { name: 'Notifications', desc: 'Email notifications at key steps + real-time push', values: [false, false, true] },
        { name: 'Application Integration', desc: 'Flow initiation page / approval tasks page, cross-Base flow aggregation', values: [false, false, true] }
      ]
    },
    {
      title: 'AI Capabilities',
      rows: [
        { name: 'AI Assistant', desc: 'Conversational table Q&A, statistics and analysis, write-operation confirmation cards, image attachment understanding', values: [false, false, true] },
        { name: 'Table Data Q&A (RAG)', desc: 'Semantic retrieval for large tables, index management, automatic incremental updates', values: [false, false, true] },
        { name: 'AI Fields', desc: 'Prompt template library, single-record streaming generation, batch fill tasks', values: [false, false, true] },
        { name: 'Workflow AI Nodes / Dashboard Smart Insights / Document AI', values: [false, false, true] },
        { name: 'AI Governance', desc: 'Model configuration (9 presets), feature-domain switches, quota policies, task center, usage dashboard', values: [false, false, true] },
        { name: 'Sensitive Field Protection', desc: 'ai_excluded fields are automatically excluded from context and indexes', values: [false, false, true] }
      ]
    },
    {
      title: 'Deployment & Openness',
      rows: [
        { name: 'Docker One-click Deployment (Embedded Redis)', values: [true, true, true] },
        { name: 'SQLite / PostgreSQL / ARM Support', values: [true, true, true] },
        { name: 'OAuth2 + Open API + Audit Logs', values: [true, true, true] },
        { name: 'Security & Email Configuration', desc: 'Registration switch, password policy, session timeout, SMTP templates', values: [true, true, true] },
        { name: 'Office Integration', desc: 'Single sign-on integration with WeCom (Enterprise WeChat), DingTalk, Feishu (Lark), Weaver OA, and more', values: [false, false, true] },
        { name: 'Commercial Technical Support', desc: 'Provided per the license agreement', values: ['—', '✓', '✓'] }
      ]
    }
  ],
  choices: [
    {
      title: 'Individuals / Small Teams',
      desc: 'Manage data with tables and build lightweight business boards — full core capabilities at zero cost.',
      plan: 'Community Edition'
    },
    {
      title: 'Enterprise Adoption',
      desc: 'Need document printing, mobile access, or permission control down to individual fields and rows.',
      plan: 'Standard Edition'
    },
    {
      title: 'Building Business Systems',
      desc: 'Assemble tables into standalone apps for end users, run approval flows, or boost productivity with AI.',
      plan: 'Professional Edition'
    }
  ],
  faqs: [
    {
      q: 'What is the difference between the Community Edition and the Commercial Editions?',
      a: 'The Community Edition is the complete multi-dimensional table core released under the MIT license and can be used for free as long as the logo and name are retained. The Commercial Editions layer commercial feature modules on top of it — the Standard Edition includes print templates, mobile H5 and advanced permissions, while the Professional Edition further includes application mode, approval flows and the full AI capabilities. A higher edition always includes all features of the editions below it.'
    },
    {
      q: 'Can I try before purchasing?',
      a: 'The Commercial Edition has no separate trial version. We recommend deploying and evaluating with the Community Edition first (Docker one-click deployment is supported), then purchasing the matching Commercial Edition once you have confirmed the feature coverage and tech stack fit.'
    },
    {
      q: 'How do I purchase a commercial license?',
      a: 'Please get the contact details from the "Follow Us" page and talk to our business team, who will recommend a suitable edition based on your needs.'
    },
    {
      q: 'Are license prices negotiable?',
      a: 'Commercial licensing uses unified pricing — the listed price is the final price and negotiation is not accepted.'
    },
    {
      q: 'How is the license scope defined?',
      a: 'Each commercial license is bound to a single contracting entity and covers only that entity; the binding is applied through a license code tied to the deployment machine.'
    },
    {
      q: 'Can a commercial license be transferred or shared?',
      a: 'A commercial license is strictly bound to the contracting entity and the deployment machine; transfer or sharing is not accepted.'
    },
    {
      q: 'Is source code provided? Can I do secondary development?',
      a: 'Source code is not provided by default; the Community Edition itself is fully open source and is the preferred choice for secondary development. If you need the Commercial Edition source code, please contact the official team separately. Once the complete source code of the corresponding branch is delivered under a commercial license (unencrypted and unobfuscated), you may perform secondary development within the licensed scope and deploy it for internal business systems, but resale is not allowed.'
    },
    {
      q: 'Are refunds supported?',
      a: 'Software products are inherently reproducible; once delivered, the contractual obligations are considered fulfilled and refunds are not accepted. Please complete your technical evaluation with the open-source Community Edition before purchasing.'
    },
    {
      q: 'What technical support and version updates are included?',
      a: 'During the license period you can continuously receive version updates of the corresponding branch; routine issues are handled through official communication channels. Value-added services such as in-depth customization and dedicated consulting can be arranged separately.'
    },
    {
      q: 'May I release a competing product based on the Commercial Edition?',
      a: 'You may not release or sell a directly competing base platform product based on the SmartTable Commercial Edition; if you have such compliance needs, a written cooperation agreement must be signed in advance.'
    }
  ]
}
</script>

<style scoped>
.edition-compare {
  max-width: 1080px;
  margin: 0 auto;
}

/* Hero */
.ec-hero {
  text-align: center;
  padding: 24px 0 8px;
}
.ec-hero h1 {
  border: none;
  font-size: 2.2rem;
  margin-bottom: 12px;
}
.ec-sub {
  color: var(--vp-c-text-2);
  max-width: 720px;
  margin: 0 auto 16px;
  line-height: 1.7;
}
.ec-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}
.ec-badge {
  font-size: 0.8rem;
  padding: 2px 12px;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

/* Plan cards */
.ec-plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 32px 0;
  align-items: stretch;
}
.ec-plan {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg);
}
.ec-plan--featured {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1), 0 8px 24px rgba(0, 0, 0, 0.08);
}
.ec-ribbon {
  position: absolute;
  top: -12px;
  right: 16px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-size: 0.75rem;
  padding: 2px 12px;
  border-radius: 999px;
}
.ec-plan-name {
  margin: 0;
  font-size: 1.25rem;
  border: none;
}
.ec-plan-branch {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono, monospace);
  margin: 4px 0 12px;
}
.ec-plan-price {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}
.ec-offer-tag {
  flex: none;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--vp-c-white);
  background: linear-gradient(135deg, #f43f5e, #f97316);
  padding: 2px 10px;
  border-radius: 999px;
  letter-spacing: 0.02em;
}
.ec-price-num {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  line-height: 1;
}
.ec-price-unit {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}
.ec-price-note {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 12px;
}
.ec-price-note--hot {
  color: #f43f5e;
  font-weight: 700;
}
.ec-plan-tagline {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 12px;
  min-height: 2.6em;
}
.ec-plan-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  flex: 1;
}
.ec-plan-list li {
  font-size: 0.85rem;
  line-height: 1.5;
  padding: 4px 0 4px 1.4em;
  position: relative;
}
.ec-plan-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand-1);
  font-weight: 700;
}
.ec-plan-cta {
  display: block;
  text-align: center;
  padding: 8px 0;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  transition: background 0.2s;
}
.ec-plan-cta:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
.ec-cta--brand {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}
.ec-cta--brand:hover {
  background: var(--vp-c-brand-2);
  color: var(--vp-c-white);
}

/* Comparison table */
.ec-table-title {
  text-align: center;
  border-top: none;
  margin-top: 48px;
  margin-bottom: 24px;
  font-weight: 600;
  font-size: larger;
}
.ec-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
thead th {
  background: var(--vp-c-bg-soft);
  padding: 10px 14px;
  text-align: center;
  white-space: nowrap;
  border-bottom: 1px solid var(--vp-c-divider);
}
thead th.ec-col-feature {
  text-align: left;
}
tbody td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
  vertical-align: top;
}
tbody tr:last-child td {
  border-bottom: none;
}
tbody td.ec-cell-feature {
  text-align: left;
  min-width: 220px;
}
tbody tr.ec-group-row td {
  background: var(--vp-c-bg-soft);
  font-weight: 700;
  text-align: center;
  font-size: 0.92rem;
  color: var(--vp-c-text-1);
  padding-top: 12px;
  padding-bottom: 12px;
}
.ec-fname {
  font-weight: 500;
  display: block;
}
.ec-fdesc {
  display: block;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  margin-top: 2px;
}
.ec-yes {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}
.ec-no {
  color: var(--vp-c-text-3);
}
.ec-text {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}
.ec-cell-pro {
  background: color-mix(in srgb, var(--vp-c-brand-1) 5%, transparent);
}

/* FAQ */
.ec-faq {
  max-width: 880px;
  margin: 0 auto;
}
.ec-faq-item {
  padding: 16px 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.ec-faq-item:last-child {
  border-bottom: none;
}
.ec-faq-q {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}
.ec-faq-num {
  flex: none;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono, monospace);
}
.ec-faq-a {
  margin: 8px 0 0 34px;
  font-size: 0.87rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

/* Topology note */
.ec-note {
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 14px 18px;
  margin: 32px 0;
  background: var(--vp-c-bg-soft);
}
.ec-note strong {
  display: block;
  margin-bottom: 6px;
}
.ec-note p {
  margin: 0;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

/* Choice cards */
.ec-choice {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 8px;
}
.ec-choice-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}
.ec-choice-card h4 {
  margin: 0 0 8px;
}
.ec-choice-card p {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0 0 8px;
  line-height: 1.6;
}
.ec-choice-plan {
  font-weight: 600;
  color: var(--vp-c-brand-1) !important;
}

@media (max-width: 860px) {
  .ec-plans,
  .ec-choice {
    grid-template-columns: 1fr;
  }
  .ec-plan-tagline {
    min-height: auto;
  }
}
</style>
