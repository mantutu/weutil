const {
    Request
} = require("./Request");
const {
    mergeConfig,
    bind
} = require("../utils")

function createInstance(defaultConfig) {
    var context = new Request(defaultConfig);
    var instance = bind(Request.prototype.request, context);

    return instance;
}

let request = createInstance()

request.create = function create(instanceConfig) {
    return createInstance(mergeConfig(request.defaults, instanceConfig));
}

module.exports = {
    request
};