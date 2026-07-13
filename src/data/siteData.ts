import { PLANETS, type Category, type Planet } from './galaxy'

/**
 * 全站内容数据的单一事实来源（Single Source of Truth）。
 * 当前由 defaultSiteData + localStorage 覆盖驱动（见 store.ts），
 * 未来接入后端时，只需把这份 JSON 结构变成 API 的响应体即可。
 */

export interface ProfileData {
  name: string // 姓名
  alias: string // 花名
  tagline: string // 定位语
  greeting: string // 首页副标题
}

export type Experience = Planet

export interface PortfolioItem {
  id: string
  title: string
  description: string
  tags: string[]
  imageDataUrl?: string
  link?: string
  createdAt: string // ISO date
}

export interface SeekingData {
  status: string
  roles: string[]
  targets: string[]
  note: string
}

export interface VisibilityData {
  portfolio: boolean // 是否在公开站显示作品集区块
}

export interface SiteData {
  profile: ProfileData
  experiences: Experience[]
  portfolio: PortfolioItem[]
  seeking: SeekingData
  visibility: VisibilityData
  updatedAt: string // ISO datetime
}

export const CURRENT_SCHEMA_VERSION = 1

export const defaultSiteData: SiteData = {
  profile: {
    name: '蓝天翔',
    alias: '羽羊 / VASTRA',
    tagline: 'AI 时代的产品工程师 / 活动主理人 · 务实的理想主义者',
    greeting: '欢迎驶入我的个人星系——这里的每一段经历，都是一颗仍在发光的小行星。',
  },
  experiences: [
    // 修正两条时间线：美团 Beam 小美 → 2026.01 – 2026.04；Kimi → 2026.04 – 至今
    ...PLANETS.map((p) => {
      if (p.id === 'meituan') return { ...p, time: '2026.01 – 2026.04' }
      if (p.id === 'kimi') return { ...p, time: '2026.04 – 至今' }
      return { ...p }
    }),
  ],
  portfolio: [
    {
      id: 'case-ai-bistro',
      title: 'AI 小酒馆 · 创业私董会',
      description:
        'AI 主题私董会系列活动：案主-私董官-幕僚-观众角色制，汇集跨行业创业者、投资人与在校学生，帮助案主拆解真实经营难题、打磨 BP。本人担任私董官（总统筹+主持人），负责全流程设计、嘉宾邀请与现场把控。商业化模式：观众门票 / 宣讲人赞助 / 品牌方赞助。',
      imageDataUrl: '/covers/bistro.jpg',
      tags: ['标杆案例', '私董会', '创业生态', '活动主理'],
      createdAt: '2025-06-22',
    },
    {
      id: 'case-ai-x-bizmodel',
      title: 'AI+X 商业模式局',
      description:
        '面向 AI+ 垂直领域（社交 / 英语学习 / 创新教育 / 创业生态等）的创业者，现场拆解其商业模式与增长路径，为项目提供产品推广、人才招募与品牌宣发的真实资源链接。',
      imageDataUrl: '/covers/bizmodel.jpg',
      tags: ['标杆案例', '商业模式', 'AI+ 垂直领域', '活动主理'],
      createdAt: '2025-05-01',
    },
    {
      id: 'case-ai-x-salon',
      title: 'AI+X 大咖见面会（闭门会）',
      description:
        '例：7/6 上海徐汇「AI 教育创变者闭门会」（与超脑 AI 孵化器合办，限 50 席）——嘉宾含纽交所上市公司创始人&天使投资人 Michael、福布斯 30U30 最年轻上榜者之一 Kai、可梦 AI CEO 赵迪等。本人负责嘉宾邀请、流程与物料设计、多渠道宣发与现场主持，系 2025 年主理的第 35 场活动。',
      imageDataUrl: '/covers/salon-poster.jpg',
      tags: ['标杆案例', '闭门会', 'AI+ 教育', '嘉宾运营'],
      link: 'https://mp.weixin.qq.com/s/DgYJtLJUdBF2JasvO_liiA',
      createdAt: '2025-07-06',
    },
    {
      id: 'proj-ai-hues',
      title: 'AI Hues · 开源项目评测与发现平台',
      description:
        'Kimi 实习主导项目：智能开源项目评测与发现平台——用自然语言描述想法，从 1000+ 开源项目中匹配最合适的技术栈，并按 6 个维度打分评测。从 0 到 1 跑通 PRD 全流程，历经孵化平台 → 工具站 → Upskilling 评测多轮原型迭代，已完成内部 pre 并持续改进。',
      imageDataUrl: '/covers/ai-hues.jpg',
      tags: ['Kimi 实习', '0→1', '职业规划', 'Upskilling', 'PRD'],
      link: 'https://nkbm7juvseh6m.ok.kimi.link/',
      createdAt: '2026-05-21',
    },
    {
      id: 'proj-focusflow',
      title: 'FocusFlow · 个人工作台（人生/工作管理系统）',
      description:
        '人生 / 工作一体化管理系统 demo，「重要且紧急」象限驱动，搭建中。后续计划与个人产品化方向联动。',
      imageDataUrl: '/covers/focusflow.jpg',
      tags: ['Side Project', '效率工具', '搭建中'],
      link: 'https://ss4hiszpcivgu.ok.kimi.link',
      createdAt: '2026-05-10',
    },
    {
      id: 'proj-job-tracker',
      title: '2026 秋招 AI 核心岗位追踪器',
      description:
        '兴趣 + 实用驱动：追踪 AI 核心岗位动态的可视化工具，为秋招高效更新而生。',
      imageDataUrl: '/covers/job-tracker.jpg',
      tags: ['Side Project', '求职工具', '数据可视化'],
      link: 'https://otuhqeoncpqwc.ok.kimi.link',
      createdAt: '2026-06-01',
    },
    {
      id: 'proj-redpen',
      title: 'RED PEN · 浏览器插件',
      description: '插件开发练手项目（含安装指南），工程向探索。',
      imageDataUrl: '/covers/redpen.jpg',
      tags: ['Side Project', '浏览器插件', '工程'],
      link: 'https://casgfkncq4fh4.ok.kimi.link',
      createdAt: '2026-05-15',
    },
    {
      id: 'proj-skillhub',
      title: 'Skillhub · Skill 聚合站 Demo',
      description:
        '参考 Manus Skillhub 的聚合站 demo。核心思考：skill 生态尚小，需要技术布道或 one skill for all。',
      imageDataUrl: '/covers/skillhub.jpg',
      tags: ['Side Project', 'Agent 生态', 'Demo'],
      link: 'https://2qe5nyngk2xfa.ok.kimi.link',
      createdAt: '2026-06-10',
    },
    {
      id: 'proj-foundermind',
      title: 'FounderMind · AI 创业导师 & 私董会平台',
      description:
        '2025 年于交大工研院主导的 AI+ 创业导师 / 私董会产品：负责项目管理、PRD 撰写、产品交互设计与 30+ 线下真实用户调研，推动一期发布（累计用户 100+），已获阿里云百炼认可并将作为应用模板上架。',
      imageDataUrl: '/covers/foundermind.jpg',
      tags: ['2025', 'AI 产品', '0→1', '阿里云百炼'],
      createdAt: '2025-06-30',
    },
    {
      id: 'proj-research-demo',
      title: '「你的论文有什么创新点？」· AI Hues Research Demo',
      description:
        '用 Kimi Agent 完成的第一个项目：论文创新点分析 demo，首页大图网络可视化。兴趣驱动，毕业季彩蛋预备。',
      imageDataUrl: '/covers/research-demo.jpg',
      tags: ['Side Project', 'Kimi Agent', '第一个项目'],
      link: 'https://vastralan2001.github.io/ai-hues-research-demo/',
      createdAt: '2025-09-01',
    },
    {
      id: 'proj-life-game',
      title: '人生探索游戏 · 把自己产品化',
      description:
        '兴趣驱动：人生探索游戏 × 个人说明书产出，后续与个人产品化方向联动。',
      imageDataUrl: '/covers/life-game.jpg',
      tags: ['Side Project', '兴趣驱动', '个人产品化'],
      link: 'https://gicewb435f5li.ok.kimi.link',
      createdAt: '2026-04-15',
    },
    {
      id: 'proj-trendforge',
      title: 'TrendForge · 热点 → 产品工作台',
      description:
        'Genuine.ai 灵感生成器实验线：抓取海内外信息资讯，探索热点到产品的转化路径。',
      imageDataUrl: '/covers/trendforge.jpg',
      tags: ['Side Project', '信息聚合', 'Brainstorm'],
      link: 'https://xapjcw7w6e4au.ok.kimi.link',
      createdAt: '2026-03-20',
    },
    {
      id: 'proj-toolstation',
      title: 'ToolStation · 办公文具开源工具站',
      description:
        'AI 工具集 / 办公文具开源网站（来自晔老师的需求），参考海内外同类产品，试用功能值得借鉴。',
      imageDataUrl: '/covers/toolstation.jpg',
      tags: ['Side Project', '工具站', '开源'],
      link: 'https://3wuxc2mzvq6qw.ok.kimi.link/',
      createdAt: '2026-04-28',
    },
  ],
  seeking: {
    status: '正在寻求 2026 校招机会',
    roles: ['AI 产品经理', 'AI 产品工程师', '头部 VC · AI 方向'],
    targets: [
      'Kimi',
      'MiniMax',
      '字节跳动',
      '小红书',
      '腾讯',
      '阿里',
      '真格基金',
      '蓝驰创投',
      '红杉中国',
      '头部 AI 创业公司',
    ],
    note: '我相信 AI 时代的产品经理，既要懂模型的边界，也要懂人的温度。过去几年我在大模型应用、Agent 产品与 AI 创投生态里持续航行，希望下一站能把这份观察力，放进一个足够有野心的坐标里。',
  },
  visibility: {
    portfolio: true,
  },
  updatedAt: new Date().toISOString(),
}

export const EXPERIENCE_CATEGORIES: Category[] = ['academic', 'business', 'venture', 'community']

/** 结构校验：判断一个未知对象是否大致符合 SiteData 形状（用于 importSiteData） */
export function isSiteDataLike(value: unknown): value is SiteData {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  if (typeof v.profile !== 'object' || v.profile === null) return false
  if (!Array.isArray(v.experiences)) return false
  if (!Array.isArray(v.portfolio)) return false
  if (typeof v.seeking !== 'object' || v.seeking === null) return false
  if (typeof v.visibility !== 'object' || v.visibility === null) return false
  const seeking = v.seeking as Record<string, unknown>
  if (typeof seeking.status !== 'string') return false
  if (!Array.isArray(seeking.roles) || !Array.isArray(seeking.targets)) return false
  const visibility = v.visibility as Record<string, unknown>
  if (typeof visibility.portfolio !== 'boolean') return false
  return true
}

/** 生成一个简短唯一 id（作品集 / 新增经历用） */
export function uid(prefix = 'item'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}
