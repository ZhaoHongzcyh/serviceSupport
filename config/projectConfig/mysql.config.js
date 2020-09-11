/**
 * 本服务需要的数据库相关配置信息
 */
const mysqlOption = {
    // 生产环境数据库的配置
    production: {
        port: 3306,
        user: 'root',
        password: '2715725920cx',
        host: '127.0.0.1',
        database: 'zznode'
    },

    // 开发环境数据库的配置
    dev: {
        port: 3306,
        user: 'root',
        password: '2715725920cx',
        host: '127.0.0.1',
        database: 'zznode'
    }
}

module.exports = mysqlOption;