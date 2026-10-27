// src/utils/date.ts

/** 获取 ISO 周数（第几周） */
export function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  )
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

/** 公历：2024年12月25日 */
export function formatSolar(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

/** 农历：腊月廿三（依赖浏览器 Intl，无需第三方库） */
export function formatLunar(date: Date): string {
  try {
    return new Intl.DateTimeFormat('zh-CN-u-ca-chinese', {
      month: 'long',
      day: 'numeric',
    }).format(date)
  } catch {
    return ''
  }
}

/** 星期：一 / 二 / … / 日 */
export function getWeekday(date: Date): string {
  return ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
}

/** 时间：HH:mm:ss */
export function formatTime(date: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(date.getHours())}:${p(date.getMinutes())}:${p(date.getSeconds())}`
}