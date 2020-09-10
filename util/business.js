const userSql = require("../config/businessSql/userSql");

// 获取用户模块的sql
const getUserModultSql = ( key ) => {
    return userSql[key];
}

const option = {
    getUserModultSql
}

module.exports = option;