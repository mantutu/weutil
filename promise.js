const promisify = new Proxy(wx || {}, {
    get: function (target, property) {
        return opts => new Promise((resolve, reject) => {
            target[property](Object.assign({}, opts, {
                success: resolve,
                fail: reject
            }))
        });
    }
});

module.exports = {
    promisify
}