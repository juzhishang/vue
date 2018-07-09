import { inBrowser } from './env'

export let mark
export let measure
// 非生产环境下如果浏览器支持performance，封装performance.mark和performance.measure
/**
 * 用法
 * mark('markStartName')
 * // somecode...
 * mark('markEndName')
 * measure('measureName', 'markStartName', 'markEndName')
 */
if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      perf.clearMeasures(name)
    }
  }
}
