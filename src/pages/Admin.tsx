import { useRef, useState, type ReactNode } from 'react'

import {
  ArrowDown,
  ArrowUp,
  Download,
  ImagePlus,
  KeyRound,
  Lock,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react'
import Starfield from '../components/Starfield'
import { CATEGORY_META } from '../data/galaxy'
import {
  EXPERIENCE_CATEGORIES,
  uid,
  type Experience,
  type PortfolioItem,
  type SiteData,
} from '../data/siteData'
import { exportSiteData, importSiteData, resetSiteData, saveSiteData, useSiteData } from '../data/store'
import {
  hasAdminPassword,
  isUnlocked,
  lockSession,
  setAdminPassword,
  unlockSession,
  verifyAdminPassword,
} from '../lib/adminAuth'

/* ---------- 通用样式 ---------- */
const inputCls =
  'w-full bg-cosmos-base/60 border hairline rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-faint/60 focus:outline-none focus:border-star-indigo/50 transition-colors'
const labelCls = 'block font-display text-[11px] tracking-[0.18em] uppercase text-ink-faint mb-1.5'
const btnCls =
  'inline-flex items-center gap-1.5 px-4 py-2 rounded-full border hairline text-xs font-display tracking-[0.1em] text-ink-dim hover:text-ink hover:border-star-indigo/50 transition-colors active:scale-[0.98]'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  )
}

/* ---------- 密码门 ---------- */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const isSetup = !hasAdminPassword()
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (isSetup) {
      if (pw.length < 4) return setError('密码至少 4 位')
      if (pw !== pw2) return setError('两次输入的密码不一致')
      await setAdminPassword(pw)
      unlockSession()
      onUnlock()
    } else {
      if (await verifyAdminPassword(pw)) {
        unlockSession()
        onUnlock()
      } else {
        setError('密码错误')
      }
    }
  }

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center px-5">
      <Starfield />
      <form onSubmit={handleSubmit} className="relative glass-card p-8 md:p-10 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex items-center justify-center w-10 h-10 rounded-full border border-star-gold/50">
            <KeyRound size={18} className="text-star-gold" />
          </span>
          <div>
            <p className="font-display text-[10px] tracking-[0.25em] uppercase text-ink-faint">Vastra · Control Deck</p>
            <h1 className="font-serif text-xl text-ink">{isSetup ? '设置管理密码' : '管理舱验证'}</h1>
          </div>
        </div>
        <Field label={isSetup ? '设置密码' : '密码'}>
          <input
            type="password"
            className={inputCls}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder={isSetup ? '至少 4 位' : '输入管理密码'}
            autoFocus
          />
        </Field>
        {isSetup && (
          <div className="mt-4">
            <Field label="确认密码">
              <input
                type="password"
                className={inputCls}
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                placeholder="再输入一次"
              />
            </Field>
          </div>
        )}
        {error && <p className="mt-4 text-xs text-red-400/90">{error}</p>}
        <button
          type="submit"
          className="mt-7 w-full py-3 rounded-full border border-star-indigo/50 text-ink font-display text-sm tracking-[0.15em] transition-all hover:border-star-indigo hover:shadow-[0_0_24px_-6px_rgba(139,143,217,0.6)] active:scale-[0.98]"
        >
          {isSetup ? '设置并进入' : '解锁进入'}
        </button>
        <p className="mt-6 text-[11px] text-ink-faint/70 leading-relaxed text-center">
          轻量门禁：密码摘要仅存本机浏览器。真正私密层待后端版。
        </p>
        <div className="mt-5 text-center">
          <a href="./" className="text-xs text-ink-faint hover:text-ink-dim transition-colors">
            ← 返回公开站
          </a>
        </div>
      </form>
    </div>
  )
}

/* ---------- Tab 1：经历管理 ---------- */
function ExperienceEditor({ exp, onPatch, onDelete, onMoveUp, onMoveDown, canUp, canDown }: {
  exp: Experience
  onPatch: (patch: Partial<Experience>) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  canUp: boolean
  canDown: boolean
}) {
  return (
    <div className="glass-card p-5 md:p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{
            background: CATEGORY_META[exp.category]?.color ?? '#8B8FD9',
            boxShadow: `0 0 10px ${CATEGORY_META[exp.category]?.glow ?? 'rgba(139,143,217,0.5)'}`,
          }}
        />
        <input
          className={`${inputCls} font-serif text-base flex-1`}
          value={exp.name}
          onChange={(e) => onPatch({ name: e.target.value })}
          placeholder="行星名称"
        />
        <div className="flex items-center gap-1 shrink-0">
          <button className={btnCls} disabled={!canUp} onClick={onMoveUp} aria-label="上移" style={{ opacity: canUp ? 1 : 0.3 }}>
            <ArrowUp size={14} />
          </button>
          <button className={btnCls} disabled={!canDown} onClick={onMoveDown} aria-label="下移" style={{ opacity: canDown ? 1 : 0.3 }}>
            <ArrowDown size={14} />
          </button>
          <button
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-red-500/30 text-xs font-display tracking-[0.1em] text-red-300/80 hover:text-red-200 hover:border-red-400/50 transition-colors"
            onClick={() => {
              if (confirm(`删除「${exp.name || '未命名'}」？`)) onDelete()
            }}
            aria-label="删除"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="轨道 Category">
          <select
            className={inputCls}
            value={exp.category}
            onChange={(e) => onPatch({ category: e.target.value as Experience['category'] })}
          >
            {EXPERIENCE_CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-cosmos-layer2">
                {CATEGORY_META[c].label} · {CATEGORY_META[c].en}
              </option>
            ))}
          </select>
        </Field>
        <Field label="时间 Time">
          <input className={inputCls} value={exp.time} onChange={(e) => onPatch({ time: e.target.value })} placeholder="如 2026.04 – 至今" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="角色 Role">
            <input className={inputCls} value={exp.role} onChange={(e) => onPatch({ role: e.target.value })} placeholder="角色 / 职位描述" />
          </Field>
        </div>
        <Field label={`轨道层 Orbit（1-4）· 当前 ${exp.orbit}`}>
          <input
            type="range"
            min={1}
            max={4}
            step={1}
            className="w-full accent-star-indigo"
            value={exp.orbit}
            onChange={(e) => onPatch({ orbit: Number(e.target.value) })}
          />
        </Field>
        <Field label={`角度 Angle（0-359°）· 当前 ${exp.angle}°`}>
          <input
            type="range"
            min={0}
            max={359}
            step={1}
            className="w-full accent-star-gold"
            value={exp.angle}
            onChange={(e) => onPatch({ angle: Number(e.target.value) })}
          />
        </Field>
      </div>

      <Field label="亮点 Highlights（每行一条）">
        <textarea
          className={`${inputCls} min-h-[96px] leading-relaxed`}
          value={exp.highlights.join('\n')}
          onChange={(e) => onPatch({ highlights: e.target.value.split('\n') })}
          placeholder="每行一条亮点"
        />
      </Field>

      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          className="w-4 h-4 accent-star-gold"
          checked={!!exp.featured}
          onChange={(e) => onPatch({ featured: e.target.checked || undefined })}
        />
        <span className="text-sm text-ink-dim">设为 featured（最新 / 重点经历，星系中高亮并默认选中）</span>
      </label>
    </div>
  )
}

function ExperiencesTab() {
  const data = useSiteData()
  const exps = data.experiences

  function commit(next: Experience[]) {
    saveSiteData({ ...data, experiences: next })
  }

  function patch(id: string, p: Partial<Experience>) {
    commit(exps.map((e) => (e.id === id ? { ...e, ...p } : e)))
  }

  function addExp(category: Experience['category']) {
    commit([
      ...exps,
      { id: uid('exp'), name: '新行星', time: '', role: '', highlights: [], category, orbit: 1, angle: 0 },
    ])
  }

  function moveWithinCategory(exp: Experience, dir: -1 | 1) {
    const groupIds = exps.filter((e) => e.category === exp.category).map((e) => e.id)
    const pos = groupIds.indexOf(exp.id)
    const swapWith = groupIds[pos + dir]
    if (swapWith === undefined) return
    const next = [...exps]
    const i1 = next.findIndex((e) => e.id === exp.id)
    const i2 = next.findIndex((e) => e.id === swapWith)
    ;[next[i1], next[i2]] = [next[i2], next[i1]]
    commit(next)
  }

  return (
    <div className="space-y-10">
      {EXPERIENCE_CATEGORIES.map((cat) => {
        const group = exps.filter((e) => e.category === cat)
        const meta = CATEGORY_META[cat]
        return (
          <div key={cat}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xs tracking-[0.2em] uppercase flex items-center gap-2" style={{ color: meta.color }}>
                <span className="w-2 h-2 rounded-full" style={{ background: meta.color, boxShadow: `0 0 10px ${meta.glow}` }} />
                {meta.label} · {group.length} 颗
              </h3>
              <button className={btnCls} onClick={() => addExp(cat)}>
                <Plus size={14} /> 新增
              </button>
            </div>
            <div className="space-y-4">
              {group.map((exp, i) => (
                <ExperienceEditor
                  key={exp.id}
                  exp={exp}
                  onPatch={(p) => patch(exp.id, p)}
                  onDelete={() => commit(exps.filter((e) => e.id !== exp.id))}
                  onMoveUp={() => moveWithinCategory(exp, -1)}
                  onMoveDown={() => moveWithinCategory(exp, 1)}
                  canUp={i > 0}
                  canDown={i < group.length - 1}
                />
              ))}
              {group.length === 0 && <p className="text-sm text-ink-faint">该轨道暂无行星，点击「新增」添加。</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Tab 2：作品集管理 ---------- */
const MAX_IMAGE_BYTES = 2 * 1024 * 1024 // 图片限制 2MB

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('读取图片失败'))
    reader.readAsDataURL(file)
  })
}

function PortfolioEditor({
  item,
  onPatch,
  onDelete,
}: {
  item: PortfolioItem
  onPatch: (patch: Partial<PortfolioItem>) => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  const [imgError, setImgError] = useState('')

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setImgError('')
    if (!file.type.startsWith('image/')) return setImgError('请选择图片文件')
    if (file.size >= MAX_IMAGE_BYTES) return setImgError(`图片超过 2MB 限制（当前 ${(file.size / 1024 / 1024).toFixed(2)}MB），请压缩后再上传`)
    try {
      onPatch({ imageDataUrl: await readFileAsDataURL(file) })
    } catch {
      setImgError('图片读取失败，请重试')
    }
  }

  return (
    <div className="glass-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-5 text-left">
        <span className="w-12 h-12 rounded-lg border hairline bg-cosmos-layer2/60 shrink-0 overflow-hidden flex items-center justify-center">
          {item.imageDataUrl ? (
            <img src={item.imageDataUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus size={16} className="text-ink-faint" />
          )}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-ink font-serif truncate">{item.title || '未命名作品'}</span>
          <span className="block text-xs text-ink-faint truncate mt-0.5">{item.description || '暂无描述'}</span>
        </span>
        <span className="font-display text-[11px] tracking-[0.12em] text-ink-faint shrink-0">{open ? '收起' : '编辑'}</span>
      </button>

      {open && (
        <div className="px-5 pb-6 pt-1 border-t hairline space-y-4">
          <Field label="标题 Title">
            <input className={inputCls} value={item.title} onChange={(e) => onPatch({ title: e.target.value })} placeholder="作品标题" />
          </Field>
          <Field label="描述 Description">
            <textarea
              className={`${inputCls} min-h-[80px] leading-relaxed`}
              value={item.description}
              onChange={(e) => onPatch({ description: e.target.value })}
              placeholder="一段简短介绍"
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="标签 Tags（逗号分隔）">
              <input
                className={inputCls}
                value={item.tags.join(', ')}
                onChange={(e) => onPatch({ tags: e.target.value.split(/[,，]/).map((t) => t.trim()).filter(Boolean) })}
                placeholder="AI, Agent, 产品设计"
              />
            </Field>
            <Field label="链接 Link（可选）">
              <input className={inputCls} value={item.link ?? ''} onChange={(e) => onPatch({ link: e.target.value || undefined })} placeholder="https://..." />
            </Field>
          </div>
          <div>
            <span className={labelCls}>封面图片（&lt; 2MB，将以 dataURL 存入数据）</span>
            <div className="flex items-center gap-3 flex-wrap">
              <label className={`${btnCls} cursor-pointer`}>
                <ImagePlus size={14} /> 上传图片
                <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </label>
              {item.imageDataUrl && (
                <button className={btnCls} onClick={() => onPatch({ imageDataUrl: undefined })}>
                  移除图片
                </button>
              )}
              {imgError && <span className="text-xs text-red-400/90">{imgError}</span>}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-[11px] text-ink-faint/70">创建于 {new Date(item.createdAt).toLocaleString('zh-CN')}</span>
            <button
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-red-500/30 text-xs font-display tracking-[0.1em] text-red-300/80 hover:text-red-200 hover:border-red-400/50 transition-colors"
              onClick={() => {
                if (confirm(`删除作品「${item.title || '未命名'}」？`)) onDelete()
              }}
            >
              <Trash2 size={14} /> 删除作品
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function PortfolioTab() {
  const data = useSiteData()

  function commit(next: PortfolioItem[]) {
    saveSiteData({ ...data, portfolio: next })
  }

  function addItem() {
    commit([...data.portfolio, { id: uid('work'), title: '', description: '', tags: [], createdAt: new Date().toISOString() }])
  }

  return (
    <div className="space-y-6">
      {/* 公开可见性开关 */}
      <div className="glass-card p-6 flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p className="font-serif text-ink">在公开站显示作品集区块</p>
          <p className="mt-1 text-xs text-ink-faint">关闭后公开站不挂载 Portfolio 区块，章节编号自动顺延</p>
        </div>
        <button
          role="switch"
          aria-checked={data.visibility.portfolio}
          onClick={() => saveSiteData({ ...data, visibility: { ...data.visibility, portfolio: !data.visibility.portfolio } })}
          className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${data.visibility.portfolio ? 'bg-star-indigo/70' : 'bg-cosmos-layer2 border hairline'}`}
        >
          <span
            className={`absolute top-1 w-5 h-5 rounded-full bg-ink transition-transform ${data.visibility.portfolio ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-display text-xs tracking-[0.2em] uppercase text-star-teal">作品列表 · {data.portfolio.length} 件</p>
        <button className={btnCls} onClick={addItem}>
          <Plus size={14} /> 新增作品
        </button>
      </div>

      <div className="space-y-4">
        {data.portfolio.map((item) => (
          <PortfolioEditor
            key={item.id}
            item={item}
            onPatch={(p) => commit(data.portfolio.map((it) => (it.id === item.id ? { ...it, ...p } : it)))}
            onDelete={() => commit(data.portfolio.filter((it) => it.id !== item.id))}
          />
        ))}
        {data.portfolio.length === 0 && (
          <div className="dashed-panel p-10 text-center bg-cosmos-layer1/40">
            <p className="text-sm text-ink-faint">暂无作品，点击「新增作品」添加第一件。</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Tab 3：求职状态编辑 ---------- */
function SeekingTab() {
  const data = useSiteData()
  const s = data.seeking

  function patch(p: Partial<SiteData['seeking']>) {
    saveSiteData({ ...data, seeking: { ...s, ...p } })
  }

  return (
    <div className="glass-card p-6 md:p-8 space-y-5">
      <Field label="状态 Status">
        <input className={inputCls} value={s.status} onChange={(e) => patch({ status: e.target.value })} />
      </Field>
      <Field label="目标角色 Roles（每行一个，展示为发光胶囊）">
        <textarea
          className={`${inputCls} min-h-[90px] leading-relaxed`}
          value={s.roles.join('\n')}
          onChange={(e) => patch({ roles: e.target.value.split('\n').map((t) => t.trim()).filter(Boolean) })}
        />
      </Field>
      <Field label="目标公司 Targets（每行一个，展示为标签流）">
        <textarea
          className={`${inputCls} min-h-[150px] leading-relaxed`}
          value={s.targets.join('\n')}
          onChange={(e) => patch({ targets: e.target.value.split('\n').map((t) => t.trim()).filter(Boolean) })}
        />
      </Field>
      <Field label="自述 Note">
        <textarea
          className={`${inputCls} min-h-[120px] leading-relaxed`}
          value={s.note}
          onChange={(e) => patch({ note: e.target.value })}
        />
      </Field>
      <p className="text-xs text-ink-faint flex items-center gap-1.5">
        <Save size={12} /> 所有修改即时保存并同步到公开站
      </p>
    </div>
  )
}

/* ---------- Tab 4：数据管理 ---------- */
function DataTab() {
  const data = useSiteData()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null)

  async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const text = await file.text()
    if (!confirm('导入将覆盖当前所有数据（含经历、作品集、求职状态），确定继续？')) return
    const result = importSiteData(text)
    setMsg(result.ok ? { text: '导入成功，数据已更新', ok: true } : { text: `导入失败：${result.error}`, ok: false })
  }

  function handleReset() {
    if (!confirm('确定恢复默认数据？这将清除 localStorage 中的所有自定义修改。')) return
    resetSiteData()
    setMsg({ text: '已恢复默认数据', ok: true })
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 md:p-8 space-y-5">
        <div className="flex flex-wrap gap-3">
          <button className={btnCls} onClick={exportSiteData}>
            <Download size={14} /> 导出 JSON
          </button>
          <button className={btnCls} onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> 导入 JSON
          </button>
          <button className={btnCls} onClick={handleReset}>
            <RotateCcw size={14} /> 恢复默认
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={handleImportFile} />
        </div>
        {msg && <p className={`text-xs ${msg.ok ? 'text-star-teal' : 'text-red-400/90'}`}>{msg.text}</p>}
        <ul className="text-xs text-ink-faint space-y-1.5 leading-relaxed">
          <li>· 导出的 JSON 包含作品集图片的 dataURL，可完整备份 / 迁移</li>
          <li>· 导入会做结构校验，格式不符将被拒绝</li>
          <li>· 恢复默认 = 清除 localStorage 覆盖，回到代码内置版本</li>
        </ul>
      </div>
      <div className="glass-card p-6 flex items-center justify-between gap-4 flex-wrap">
        <span className="text-sm text-ink-dim">最近更新时间</span>
        <span className="font-display text-sm tracking-[0.1em] text-star-gold">
          {new Date(data.updatedAt).toLocaleString('zh-CN')}
        </span>
      </div>
    </div>
  )
}

/* ---------- 管理舱主体 ---------- */
const TABS = [
  { id: 'experiences', label: '经历管理', comp: ExperiencesTab },
  { id: 'portfolio', label: '作品集管理', comp: PortfolioTab },
  { id: 'seeking', label: '求职状态', comp: SeekingTab },
  { id: 'data', label: '数据管理', comp: DataTab },
] as const

export default function Admin() {
  const [unlocked, setUnlocked] = useState(() => isUnlocked())
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('experiences')
  const data = useSiteData()

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />

  const Active = TABS.find((t) => t.id === tab)!.comp

  return (
    <div className="relative min-h-[100dvh] bg-cosmos-base">
      <Starfield />
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-10 md:py-14">
        {/* 顶栏 */}
        <header className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-star-gold/50">
              <Sparkles size={18} className="text-star-gold" />
            </span>
            <div>
              <p className="font-display text-[10px] tracking-[0.25em] uppercase text-ink-faint">Vastra · Control Deck</p>
              <h1 className="font-serif text-xl text-ink">私密管理舱</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="./" className={btnCls}>
              ← 公开站
            </a>
            <button
              className={btnCls}
              onClick={() => {
                lockSession()
                setUnlocked(false)
              }}
            >
              <Lock size={14} /> 锁定
            </button>
          </div>
        </header>

        {/* Tab 栏（移动端横向滚动） */}
        <nav className="flex gap-2 overflow-x-auto pb-1 mb-8 -mx-1 px-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 px-5 py-2.5 rounded-full font-display text-xs tracking-[0.12em] transition-all ${
                tab === t.id
                  ? 'border border-star-indigo/60 text-ink shadow-[0_0_20px_-8px_rgba(139,143,217,0.8)]'
                  : 'border hairline text-ink-faint hover:text-ink-dim'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <Active />

        <p className="mt-10 text-[11px] text-ink-faint/60 flex items-center gap-1.5">
          <LogOut size={11} /> 所有修改即时写入 localStorage（vastra_site_data）· 最近更新 {new Date(data.updatedAt).toLocaleString('zh-CN')}
        </p>
      </div>
    </div>
  )
}
