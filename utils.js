/**
 * 判断是否为对象
 * @param {*} val
 */
function isObject(val) {
  return val != null && typeof val === "object";
}

/**
 * 解析打开当前页面路径中的参数
 * @param {*} query
 */
function decodeQuery(query) {
  let qs;
  if (query.scene) {
    qs = decodeURIComponent(query.scene);
  } else if (query.q) {
    let [, qs] = decodeURIComponent(query.q).split("?");
  } else {
    return query;
  }

  return qs
    .split("&")
    .map(i => i.split("="))
    .reduce(
      (o, [k, v]) =>
        Object.assign(o, {
          [k]: v
        }),
      {}
    );
}

/**
 * 生成页面路径参数
 * @param {*} query
 */
function encodeQuery(query) {
  return Object.entries(query)
    .filter(([k, v]) => v != null)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
}

/**
 * 获取当前页面URL
 */
function getCurrentPageUrl() {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url;
}

/**
 * 获取当前页面带参数的URL
 */
function getCurrentPageUrlWithQuery() {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  let query = currentPage.options;
  let withQuery = Object.entries(query)
    .filter(([k, v]) => v != null)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return `${url}?${withQuery}`;
}

module.exports = {
  isObject,
  decodeQuery,
  encodeQuery,
  getCurrentPageUrl,
  getCurrentPageUrlWithQuery
};
