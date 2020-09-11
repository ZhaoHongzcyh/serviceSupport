/**
 * 系统用户模块api接口
 */

const express = require('express');
const userRouter = express.Router();

const userBusiness = require("./businessUser");

// 获取用户详情
userRouter.get("/getUserInfo", userBusiness.getUserInfo);

module.exports = userRouter;