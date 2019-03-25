const {
    promisify
} = require("./promise");
const {
    isAbsoluteURL,
    combineURLs,
    mergeConfig,
    forEach,
    merge
} = require("./util");

function Request(instanceConfig) {
    this.defaults = instanceConfig;
}

Request.prototype.request = function request(config) {
    if (typeof config === 'string') {
        config = arguments[1] || {};
        config.url = arguments[0];
    } else {
        config = config || {};
    }

    config = mergeConfig(this.defaults, config);

    if (config.baseURL && !isAbsoluteURL(config.url)) {
        config.url = combineURLs(config.baseURL, config.url);
    }

    config.header = config.header || {};
    return promisify.request(config);
}

forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    Request.prototype[method] = function (url, config) {
        return this.request(merge(config || {}, {
            method: method,
            url: url
        }));
    };
});

forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    Request.prototype[method] = function (url, data, config) {
        return this.request(merge(config || {}, {
            method: method,
            url: url,
            data: data
        }));
    };
});

module.exports = Request;