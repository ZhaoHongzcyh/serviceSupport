const express = require('express');
const userRouter = express.Router();

const tool = require("../../util/tool");
const sqlTool = require("../../util/business");

userRouter.get("/getUserInfo",async (req, res) => {
    const sql = sqlTool.getUserModultSql('getUserInfo');
    const option = await tool.implementSql(sql, []);

    res.send( option );
})

module.exports = userRouter;