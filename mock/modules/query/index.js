const mysql = require("mysql")


const pool = mysql.createPool({
    host     :  global.config.mysql.host,
    // port     :  global.config.mysql.port,
    user     :  global.config.mysql.user,
    password :  global.config.mysql.password,
    database :  global.config.mysql.database,
})

// 接收一个sql语句 以及所需的values
// 这里接收第二参数values的原因是可以使用mysql的占位符 '?'
// 比如 query(`select * from my_database where id = ?`, [1])

let query = function( sql, values ) {
    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    // 结束会话
                    connection.release()
                    // pool.end()
                })
            }
        })
    })

}

module.exports = query