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

/** 公历：26年10月28日 (年份取后两位) */
export function formatSolar(date: Date): string {
  const year = String(date.getFullYear()).slice(2)
  return `${year}年${date.getMonth() + 1}月${date.getDate()}日`
}

/** 数字转中文数字（支持 1-99） */
function numberToChinese(numStr: string): string {
  const n = parseInt(numStr, 10)
  if (isNaN(n)) return numStr
  const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  if (n <= 10) return chars[n]
  if (n < 20) return '十' + (n % 10 === 0 ? '' : chars[n % 10])
  if (n < 100) return chars[Math.floor(n / 10)] + '十' + (n % 10 === 0 ? '' : chars[n % 10])
  return numStr
}

/** 农历：九月十九日（依赖浏览器 Intl，并将数字转为中文） */
export function formatLunar(date: Date): string {
  try {
    let lunarStr = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', {
      month: 'long',
      day: 'numeric',
    }).format(date)
    
    // 将字符串中的阿拉伯数字替换为中文数字
    lunarStr = lunarStr.replace(/\d+/g, numberToChinese)
    
    // 某些浏览器可能输出 "九月十九" 没有 "日"，这里做个兜底补齐
    if (!lunarStr.endsWith('日')) {
      lunarStr += '日'
    }
    
    return lunarStr
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
