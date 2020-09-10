const express = require('express');
const app = express();

const Tool = require("./util/tool");

//API接口路由
const Router = express.Router();

const bodyParser = require("body-parser");

// 引入工具函数
const tool = require("./util/tool");

// 映射静态文件
app.use(express.static(__dirname));

// 引入解析体中间件(格式化req.body中的参数)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// 初始化全局数据库信息
tool.initMysqlPool( 1, true );

// 解析请求与设置回复前端内容的中间件
app.use("/", (req, res, next) => {
    next();
})

//引入user相关的路由信息
const userRouter = require("./routes/user/index");
app.use("/user", userRouter);

app.listen(8848, '0.0.0.0', () => {
    console.log("server is running 127.0.0.1:8848");
})


