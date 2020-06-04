function version (ctx, next) {
    console.log( ctx.request.query )
    // ctx.status = 500
    ctx.body = {
    	"code":200,
	    "data": {
			"version": "1.0.0",
	        "datetime": parseInt(new Date().getTime())
		}
	}
}
module.exports = version