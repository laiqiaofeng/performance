/**
 * 计算加载时间， 判断页面性能
 */
export const getPerformanceTiming = function() {
  let performance = window.performance
  if (!performance) {
    // 当前浏览器不支持
    console.log('你的浏览器不支持 performance 接口')
    return
  }

  let timing = performance.timing
  let times = {}

  // 页面加载完成时间
  // 几乎代表了用户等待时间
  let loadPage = timing.loadEventEnd - timing.navigationStart
  times.loadPage = loadPage > 0 ? loadPage : 0
  // 解析dom树结构的时间
  // 判断是否嵌套太多
  let domReady = timing.domComplete - timing.responseEnd
  times.domReady = domReady > 0 ? domReady : 0
  // 重定向时间
  // 尽量少重定向
  times.redirect = timing.redirectEnd - timing.redirectStart

  // DNS查询时间
  // 太长的话可以用DNS预加载, 可以用 HTML 5 预查询 DNS,见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
  times.lookupDomain = timing.domainLookupEnd - timing.domainLookupStart

  // 读取页面的第一个字节的时间
  // 【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
  // TTFB 即 Time To First Byte 的意思
  // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
  times.ttfb = timing.responseStart - timing.navigationStart

  // 内容加载完成时间
  // 优化： 页面经过gzip 压缩， 静态资源 css/js 等压缩
  times.request = timing.responseEnd - timing.requestStart

  // 执行onload 回调函数的时间
  // 尽量少不必要的操作移除出回调函数
  times.loadEvent = timing.loadEventEnd - timing.loadEventStart

  // DNS 缓存时间
  times.appcache = timing.domainLookupStart - timing.fetchStart
  // 卸载页面的时间
  times.unloadEvent = timing.unloadEventEnd - timing.unloadEventStart

  // TCP 建立连接的时间
  times.connect = timing.connectEnd - timing.connectStart

  return times
}
