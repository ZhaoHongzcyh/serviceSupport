### 项目结构说明
/
index.js: 项目入口文件

package.json：项目依赖包与项目基础信息

README.md：项目说明文件

/util

    tool.js: 项目中封装的工具函数
    validator.js: 项目中常用的正则校验工具函数
    auth.js: 权限校验文件
    business.js: 与业务相关的工具函数

/static

    项目静态文件

/routes

    user：与用户相关的api接口
    other：非用户相关的api接口

/ front

    用于存放前端打包的资源

/config

    businessSql:业务相关的sql语句配置文件模块
        /userSql :与用户相关的sql语句
        /otherSql: 其他sql语句
        
    projectConfig：项目相关的配置文件
        /errorCode.config.js: 项目全局错误码配置文件
        /mysql.config.js: 项目中mysql的配置文件

/logs

    log.txt: 记录系统相关的日志
    