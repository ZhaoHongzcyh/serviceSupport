/**
 * 系统用户模块相关接口的业务内容
 */
const tool = require("../../util/tool");
const sqlTool = require("../../util/business");

const businessUser = {
    getUserInfo: async (req, res) => {
        const sql = sqlTool.getUserModultSql('getUserInfo');
        const option = await tool.implementSql(sql, []);

        res.send( option );
    }
}

 module.exports = businessUser;