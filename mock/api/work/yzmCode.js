function version (ctx, next) {
    console.log( ctx.request.query )
    // ctx.status = 500
    ctx.body = {
        "code": "200",
        "data": {
            "base64": "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABFCAIAAACAFD7PAAAEcElEQVR42u3cT4hNcRQH8FlQFljYTDZT1Gzs2NiI0ZOiLCgvFtIshFipWamxnJGlRomyUZMpNcOUlKb0EqVsxrBnZ0pZEYvn1K+u67775/fn/M7v97v3e/puPI/G69M5v3vevcaGKJSHGsNHQLXjzWWK/vtXls7hQwMsTlJQBVj8pKAKsBo8WZCCKsDibFFQRXX90G0KYDGTQq8CLLapB1VxjcJdq+dVUm9RBVUv+lsp4CINK/MUXBUjqXyvah+s6QuTUcMqkAoFi2vqRTsB1358p7hjygew5FpUtOeqUljbevcoRpgShpU6qYRO61WwajCFh6VjJUi78jH1WnANqIkpJCx9K8KqvHpKUZUFpgRgSbarelIHrh1T6VqvSgPW+pcJir4tAVWaUy+DVUjrJ6ARIMAynnpVsPSdaapa29xNSQKWzpsDHN4b0fibgxYHKU1YVcgaVW382ZIELFOFUcAquPGhyu5sbqEqH1LVODQzWEmXpCrddYNXWIzrAztVjYPSE6w922cooYZmjLDUL+f7A4qLKq/rAyNVYrAUppoAlhMsgY0UlyouW42kvPKKGpYCVHjl6vonivzUs4OVndZNFxMusIxIeeIVEayqpmUHS8xTIyy7fVUNrFdnNijsqqp4jd842TZYc4d7FNNFgwup8amfFMY5aL0FtYPlrioPi0jZqUoY1qgtlqnHC8tlt24xCi3GXNU7XUhV7VHjGoX1CTX1dGA5fmPDC0v/DzqSCtWuho33YxnBioFUKSydLSgvLPfzOAuplGCNvp5NvUiepKjaLDj+tUa2XGBlpLguDFOCpX6r4CmS5yl8qDKC5aiqBUusoc6tyaVoakgFt2X6jY0MLMnZlySswkFK80QvD8t0t84Fy6Jd+SMV6pLQvmMZnfHlYVns1r3CCkIqPVhitt71rlDcVUUIS4BUwDn4D1b/612KS9PyYcsClidVvLBkSLUHVqgj1+TgN6VKFRcsTVv+vpZJEpb7MSvgkUvBUrv1aGHJk0oSlqkt3/+M7BubCGGFIhXw5D7Uf8TeovGIXQ/Wq7KAtbrzqGlKYSlSjHdWLS6/pnQdlrAq3+2qvmMVnClSFkDrA1gBVIWFle9Yqkv5uBeUXWp99+0orNE7YYLDymaf2FMSRh3LK19LWJmtCCegD1jHV55S9G3lT+h5T6fvT1BC2SpgOvLwAyWuURhV+VZlBKv0oq8UVqi+BVj2qgTm4Cismj2C/JODsVV7/jtuSVg6q6lQz6YCloQwH7D0t50BHyQErMSK/XGdtjawqGHN3HpMSR1WNycjYMnZ6tSh3hLWicXPlI6Mv28v91FYYFUhw+H9P1hPzs5SAAvFPAo7AotxFAIWSqgeLAwogIUCLMBKuT5u/qIAFqorsObuvKXEBWvv2nvK/LMFCujU1P5Lpyhx/myxwFKYVNQrgJU0rGCjMC+JMn3zOQVWsG7gaUtZARZg2XvC54hq21Xh1PJFSuQ/5KPZgxTAAizA6jwsFGChAAuFAixUhPUX+e4ABrFHWjEAAAAASUVORK5CYII=",
            "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLVEM3IiwianNvblN0ciI6IktUQzciLCJleHAiOjE1ODM5NzgxOTksImlhdCI6MTU4Mzk3NzU5OSwia2V5IjoiZjZhMmRlYjA5ODcyNGZjMWIyYzAzYmRlZWE3ZGQ4ZjkiLCJqdGkiOiI5ZjVmNjc0NC1lNjRkLTQ4ZjktYmU2Mi00NzhmNGQ2ZTViZjYifQ.kPjO30wG6ai8HApaUGeFvWJtMJ5Z509DmZmjMRUeP3Y"
        },
        "msg": "操作成功！"
    }
}
module.exports = version
