export type Category = 'academic' | 'business' | 'venture' | 'community'

export interface Planet {
  id: string
  name: string
  time: string
  role: string
  highlights: string[]
  category: Category
  orbit: number // 1 (inner) - 4 (outer)
  angle: number // degrees, position on its orbit
  featured?: boolean // 最新 / 重点经历，视觉上高亮
}

export const CATEGORY_META: Record<Category, { label: string; en: string; color: string; glow: string }> = {
  academic: { label: '学术轨道', en: 'Academic', color: '#8B8FD9', glow: 'rgba(139,143,217,0.55)' },
  business: { label: '商业轨道', en: 'Business', color: '#A78BFA', glow: 'rgba(167,139,250,0.55)' },
  venture: { label: '创业轨道', en: 'Venture', color: '#C9A96A', glow: 'rgba(201,169,106,0.55)' },
  community: { label: '社区轨道', en: 'Community', color: '#6FB7B3', glow: 'rgba(111,183,179,0.55)' },
}

export const ORBIT_PERIODS = [70, 95, 120, 145] // seconds per revolution

export const PLANETS: Planet[] = [
  // 学术轨道
  { id: 'sjtu', name: '交大安泰本硕', time: '2020 – 2027', category: 'academic', orbit: 1, angle: 20,
    role: '商务数据科学学士 → 工商管理（量化营销）硕士',
    highlights: ['保研第一名、班长', '本科综合排名 2/15，校级优秀毕业生', '主修机器学习、回归分析、商务统计、数据挖掘、营销模型'] },
  { id: 'ubc', name: 'UBC 交换', time: '2024', category: 'academic', orbit: 1, angle: 150,
    role: '加拿大不列颠哥伦比亚大学 · 公费交换',
    highlights: ['跨文化商业学习环境', '顺便解锁加拿大体系滑雪'] },
  { id: 'hkust', name: 'HKUST 交换', time: '2023.02 – 05', category: 'academic', orbit: 1, angle: 270,
    role: '香港科技大学工商管理学院 · 交换生',
    highlights: ['信息系统、商务统计与运筹管理学系', '全英文授课环境'] },
  { id: 'innovation', name: '国家级大创', time: '2021 – 2022', category: 'academic', orbit: 1, angle: 320,
    role: '长视频流媒体平台竞争力评价体系研究 · 项目成员',
    highlights: ['国家级大学生创新创业项目', '安泰学院数十项目答辩中唯一的优秀项目'] },

  // 商业轨道
  { id: 'kimi', name: 'Kimi（月之暗面）', time: '2026.04 – 至今', category: 'business', orbit: 2, angle: 90, featured: true,
    role: 'AI 产品实习 · AI Hues 平台',
    highlights: ['主导 AI Hues（开源项目评测与发现平台）从 0 到 1：跑通 PRD 全流程，完成孵化平台 → 工具站 → Upskilling 评测多轮原型迭代与内部 pre', '独立开发多个 AI 原生工具 demo：FocusFlow 个人工作台、秋招岗位追踪器、RED PEN 插件、Skillhub 聚合 demo 等，覆盖需求定义到上线部署全链路'] },
  { id: 'meituan', name: '美团 Beam 小美', time: '2026.01 – 至今', category: 'business', orbit: 2, angle: 40,
    role: 'AI Agent · BeamRD · Agent 应用研发探索工程师',
    highlights: ['人性化营销实验负责人：因子实验设计到落地，目标用户池 34 万+', '公司级外部生态入口 Agent 创新项目产品负责人，0→1 设计与验证', '独立完成 HiveSQL 圈人 → A/B 分流 → LLM Prompt → 效果评估的全链路闭环', '向美团 Agent 技术委员会汇报 AI 行业洞察与策略建议'] },
  { id: 'siie', name: '交大工研院', time: '2025.04 – 07', category: 'business', orbit: 2, angle: 130,
    role: '工业创新研究院 · AI 中台 · AI 产品经理实习生',
    highlights: ['Foundermind（AI+创业导师产品）项目负责人，30+ 用户调研，获阿里云百炼认可', '带领 5 人小分队搭建 AI+ 营销工作流，优化 10+ 业务需求', 'Z-Insights 社区主理：8 期直播、3 场闭门分享、AI 主题周黑客松，累计 2000+ 人参与'] },
  { id: 'loreal', name: '欧莱雅中国', time: '2023.10 – 2024.02', category: 'business', orbit: 2, angle: 225,
    role: '高档化妆品事业部 · 数据营销实习生',
    highlights: ['完整参与 2023 双十一大促，搭建 GMV 与市场份额追踪看板', '整合多渠道数据搭建一体化 BI 看板，支持电商战略与销量预测'] },
  { id: 'bcg', name: 'BCG PTA', time: '2022.09 – 11', category: 'business', orbit: 2, angle: 290,
    role: '波士顿咨询 · Part-Time Assistant',
    highlights: ['爆款价格统计与营销优惠测算', '研究海外代购与水货对护肤品牌的影响，整理专家访谈纪要'] },
  { id: 'lingmou', name: '零眸智能', time: '2022.05 – 09', category: 'business', orbit: 2, angle: 340,
    role: 'AI+零售准独角兽 Startup · 战略分析实习生',
    highlights: ['竞品调研报告 30 余篇，直接向合伙人汇报', '追踪零售/互联网一线动态，输出零售数字化行研'] },

  // 创业轨道
  { id: 'emagen', name: 'Emagen', time: '2024.09 – 11', category: 'venture', orbit: 3, angle: 60,
    role: 'AI Agent 创业项目（奇绩 F24 被投）· 市场及运营负责人',
    highlights: ['参与奇绩 F24 创业营，系统学习市场、运营与融资', '负责产品市场调研及事务性工作'] },
  { id: 'camp', name: '自我觉察训练营', time: '持续进行中', category: 'venture', orbit: 3, angle: 180,
    role: '发起人 & 主理人',
    highlights: ['把「人类观察员计划」变成一场集体实验', '陪伴式自我探索的小型社区实践'] },
  { id: 'adventurex', name: 'AdventureX 黑客松', time: '2024', category: 'venture', orbit: 3, angle: 300,
    role: '参赛者',
    highlights: ['限时高压下的产品构思与原型冲刺', 'Vibe Coding & Designing 的实战演练场'] },

  // 社区轨道
  { id: 'fea', name: '未来企业家协会', time: '2024.08 – 2025.06', category: 'community', orbit: 4, angle: 30,
    role: '上海交大未来企业家协会 · 理事 / 副秘书长 / OPT 运营中心负责人',
    highlights: ['链接 1000+ 交大系创业者、投资人与校友', '分管会员管理、资源分析、积分机制与「对话交大企业家」栏目'] },
  { id: 'basketball', name: '篮球协会', time: '2021.04 – 2023.05', category: 'community', orbit: 4, angle: 160,
    role: '上海交大篮球协会 · 主席 / 赛事裁判',
    highlights: ['「交大篮协」公众号赛季单月 5.4 万阅读，校内社团影响力榜首', '作为裁判执法校级篮球赛事'] },
  { id: 'zinsights', name: 'Z-Insights 社区', time: '2025 – 至今', category: 'community', orbit: 4, angle: 280,
    role: 'Z 世代创变者社区 · 主理人',
    highlights: ['标杆活动：AI 小酒馆创业私董会（任私董官总统筹）、AI+X 商业模式局、AI+X 大咖闭门会（单场限 50 席，嘉宾含纽交所上市公司创始人、福布斯 30U30）', '策划落地 8 期 AI+ 主题线上直播，3 场线下闭门大咖分享会', '累计主理活动 35+ 场，参与人数 2000+'] },
]
