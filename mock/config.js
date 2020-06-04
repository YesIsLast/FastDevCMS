const common = {
    version : '1.0.2',
}
const dev = {
    common,
    mysql:{
        host     :  '192.168.1.88',
        port 	 :  '3306',
        user     :  'root',
        password :  '123456',
        database :  'sancaibei.com'
    }
}

const build = {
    common,
    mysql:{
        host     :  'localhost',
        port 	 :  '3306',
        user     :  'root',
        password :  '123456',
        database :  'sancaibei.com'
    }
}


 module.exports =  dev