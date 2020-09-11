/**
 * 系统错误信息
 */
const errcode = [
    {   
        key: 'common_cant_get_connection',
        code: '000001',
        desc: '数据库连接失败'
    },
    {   
        key: 'common_sql_error',
        code: '000002',
        desc: 'sql 执行失败'
    },
    {
        key: "common_cant_get_sqlpool",
        code: "000003",
        desc: "无法获取连接池"
    }
]

module.exports = errcode;