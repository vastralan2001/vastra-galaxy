/**
 * 资源路径适配：公开站部署在根路径（/）或子路径（/vastra-galaxy/）下都能正确加载。
 * - data: / http(s): 开头的路径原样返回（管理舱上传的 dataURL、外链）
 * - 以 / 开头的 public 资源自动补上 BASE_URL 前缀
 */
export function assetUrl(path: string): string {
  if (!path) return path
  if (path.startsWith('data:') || path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL // '/' 或 '/vastra-galaxy/'
  return base + path.replace(/^\//, '')
}
