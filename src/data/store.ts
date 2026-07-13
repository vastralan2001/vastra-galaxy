import { useSyncExternalStore } from 'react'
import { defaultSiteData, isSiteDataLike, type SiteData } from './siteData'

/**
 * 数据访问层（Data Access Layer）
 * ────────────────────────────────────────────────────────────
 * 当前实现：纯静态站，数据存于 localStorage（key: vastra_site_data）。
 *   - localStorage 中有覆盖数据 → 优先使用覆盖数据
 *   - 否则 → 使用代码内置的 defaultSiteData
 *
 * 未来接入后端时，**只需替换 loadSiteData / saveSiteData 两个函数**：
 *   loadSiteData → GET  /api/site-data
 *   saveSiteData → PUT  /api/site-data
 * 上层组件（useSiteData / Admin / 各 Section）完全不用改动。
 * ────────────────────────────────────────────────────────────
 */

export const STORAGE_KEY = 'vastra_site_data'

type Listener = () => void
const listeners = new Set<Listener>()

function emitChange() {
  listeners.forEach((l) => l())
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener)
  // 跨标签页同步
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

/** 深拷贝默认数据，避免运行时被意外改写 */
function cloneDefault(): SiteData {
  return JSON.parse(JSON.stringify(defaultSiteData)) as SiteData
}

/** 解析 localStorage 原始串，失败返回 null */
function parseRaw(raw: string): SiteData | null {
  try {
    const parsed: unknown = JSON.parse(raw)
    return isSiteDataLike(parsed) ? parsed : null
  } catch {
    return null
  }
}

/** 读取全站数据：localStorage 覆盖优先，否则默认值 */
export function loadSiteData(): SiteData {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    const parsed = parseRaw(raw)
    if (parsed) return parsed
  }
  return cloneDefault()
}

/**
 * useSyncExternalStore 的快照缓存：
 * getSnapshot 必须在数据未变化时返回**同一个引用**，
 * 否则会触发无限重渲染（React error #185）。
 */
let cachedRaw: string | null | undefined = undefined
let cachedData: SiteData | null = null
let defaultSnapshot: SiteData | null = null

function getSnapshot(): SiteData {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedData = raw ? parseRaw(raw) : null
  }
  if (cachedData) return cachedData
  defaultSnapshot ??= cloneDefault()
  return defaultSnapshot
}

/** 保存全站数据（自动刷新 updatedAt 并广播变更） */
export function saveSiteData(data: SiteData): void {
  const next: SiteData = { ...data, updatedAt: new Date().toISOString() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  emitChange()
}

/** 导出 JSON 文件下载 */
export function exportSiteData(): void {
  const data = loadSiteData()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `vastra-site-data-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export type ImportResult = { ok: true } | { ok: false; error: string }

/** 解析并校验 JSON 文本，通过则写入 */
export function importSiteData(jsonText: string): ImportResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(jsonText)
  } catch {
    return { ok: false, error: '文件不是合法的 JSON' }
  }
  if (!isSiteDataLike(parsed)) {
    return { ok: false, error: 'JSON 结构不符合站点数据格式（缺少 profile / experiences / portfolio / seeking / visibility）' }
  }
  saveSiteData(parsed)
  return { ok: true }
}

/** 清除 localStorage 覆盖，恢复默认数据 */
export function resetSiteData(): void {
  localStorage.removeItem(STORAGE_KEY)
  emitChange()
}

/** 订阅式 hook：任何 saveSiteData/import/reset 都会触发重渲染 */
export function useSiteData(): SiteData {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
