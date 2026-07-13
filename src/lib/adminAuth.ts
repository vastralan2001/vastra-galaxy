/**
 * 管理舱轻量门禁（Client-side Gate）
 * ────────────────────────────────────────────────────────────
 * 首次访问 /admin 时设置密码，SHA-256 摘要存 localStorage（vastra_admin_hash）；
 * 解锁状态存 sessionStorage（仅当前标签页会话有效），关闭标签页即失效。
 *
 * ⚠️ 安全说明：这是纯静态站的**轻量门禁**，只能挡住随手一瞥，
 * 不能抵御有意的本地数据读取（localStorage 内容对本机浏览器始终可见）。
 * 真正的私密层（服务端鉴权、HttpOnly Cookie、权限分级）待后端版本实现。
 * ────────────────────────────────────────────────────────────
 */

export const ADMIN_HASH_KEY = 'vastra_admin_hash'
export const ADMIN_SESSION_KEY = 'vastra_admin_unlocked'

export async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** 是否已设置过管理密码 */
export function hasAdminPassword(): boolean {
  return !!localStorage.getItem(ADMIN_HASH_KEY)
}

/** 首次设置密码（已存在时返回 false） */
export async function setAdminPassword(password: string): Promise<boolean> {
  if (hasAdminPassword()) return false
  localStorage.setItem(ADMIN_HASH_KEY, await sha256(password))
  return true
}

/** 校验密码 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = localStorage.getItem(ADMIN_HASH_KEY)
  if (!hash) return false
  return (await sha256(password)) === hash
}

/** 当前会话是否已解锁 */
export function isUnlocked(): boolean {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
}

/** 标记当前会话已解锁 */
export function unlockSession(): void {
  sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
}

/** 锁定（清除会话解锁状态） */
export function lockSession(): void {
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}
