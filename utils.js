/**
 * 判定是否为 Array
 * @param {Object} val
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * 判定是否为 undefined
 * @param {Object} val
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * 判定是否为 对象
 * @param {*} val
 */
function isObject(val) {
  return val != null && typeof val === "object";
}

/**
 * 判定是否为 Date
 * @param {Object} val
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}


/**
 * 判定是否为 File
 * @param {Object} val
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * 判定是否为 Blob
 * @param {Object} val
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * 判定是否为 Function
 * @param {Object} val
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * 删除字符串开始及结束处空格
 * @param {String} str
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
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
      }), {}
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
  isArray,
  isUndefined,
  isObject,
  isDate,
  isFile,
  isBlob,
  isFunction,
  trim,
  decodeQuery,
  encodeQuery,
  getCurrentPageUrl,
  getCurrentPageUrlWithQuery
};