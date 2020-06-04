function version (ctx, next) {
    ctx.body = {
        "code":200,
        "data": {
            "type":10010
        }
    }
}
module.exports = version