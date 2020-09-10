const fs = require('fs');

const mysql = require('mysql');
const moment = require("moment"); // 引入时间格式包

// 引入数据库相关的配置信息
const mysqlConfig = require("../config/projectConfig/mysql.config");
// 引入错误码配置信息
const errCodeConfig = require("../config/projectConfig/errorCode.config");

const NODE_ENV = process.env.NODE_ENV; // 获取node的运行环境

// 获取mysql的配置信息
const getMysqlConfig = () => {
    return NODE_ENV === 'dev'? mysqlConfig.dev : mysqlConfig.production;
}

// 创建数据库连接池并获取这个连接池的操作句柄
const initMysqlPool = async ( time, autoUpdatePool = false ) => {
    const mysqlConfig = getMysqlConfig();
    const mysqlPool = mysql.createPool(mysqlConfig);

    global.MYSQLPOOLS= mysqlPool;

    const pool = await getPoolCtx( );
    global.MYSQLPOOL = pool;

    if( autoUpdatePool ){
        updatePool(time);
    }
}

// 自动更新mysql链接，避免mysql连接被自动关闭
const updatePool = ( time = 1 ) => {
    setInterval( async () => {
        const pool = await getPoolCtx( );
        global.MYSQLPOOL = pool;
    }, time * 60 * 1000);
}

// 根据连接池获取一个mysql的链接
const getPoolCtx = ( mysqlPool ) => {
    mysqlPool = mysqlPool? mysqlPool : global.MYSQLPOOLS;

    return new Promise( (resolve, reject) => {
        mysqlPool.getConnection( (err, pool) => {
            const errorDesc = getErrCode( 'common_cant_get_connection' );

            if( err ){
                writeLogs(errorDesc);
                writeLogs(err);
                resolve( null );
            }
            else{
                resolve( pool );
            }
        })
    }).catch( error => {
        writeLogs(error);
    })
}

// 获取错误码相关信息
const getErrCode = ( key, isGetInfo = false /** 是否获取错误码的详细信息 */ ) => {
    const errorItem = errCodeConfig.find( errorItem => errorItem.key === key);

    if( errorItem ){
        return isGetInfo? errorItem : errorItem.desc
    }

    return null;
}

// 用于执行mysql语句的工具函数
const implementSql = (sql, query, sqlPool = null) => {
    const pool = sqlPool? sqlPool : global.MYSQLPOOL;
    const errorItem = getErrCode('common_sql_error');

    return new Promise( (resolve, reject) => {
        let errorItem = getErrCode("common_cant_get_sqlpool")
        if( !pool ){
            writeLogs(errorItem.desc);
        }

        pool.query( sql, query, (err, data) => {
             let option = {
                code: err? errorItem.code : 0,
                data
            }
            if( err ){
                writeLogs(err);
            }
            resolve(option);
        })
    }).catch( error => {
        writeLogs(error);
    })
}

// 记录日志
const writeLogs = ( log ) => {
    console.log(log);
    const time = getCurrentTime();

    log = `\n${log}..........| ${time}`;
    fs.appendFileSync("./logs/log.txt", log);
}

// 获取系统当前时间
const getCurrentTime = () => {
    const time = moment().format('MMMM Do YYYY, h:mm:ss a');
    return time;
}

const option = {
    getMysqlConfig,
    initMysqlPool,
    getPoolCtx,
    getErrCode,
    implementSql,
    writeLogs
}


module.exports = option;