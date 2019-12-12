
## 项目简介

使用 Node.js + Koa2 + MySQL + Vue.js 实战开发一套完整个人博客项目网站。博客线上地址：[blog.majh.top](http://blog.majh.top)，源代码: [码云](https://gitee.com/xlys998/nodejs-vue-blog)

## 项目架构
- 服务端：使用 Node.js 的 Koa2 框架二次开发 Restful API。
- 前端：Vue.js 打造了前端网站和后台管理系统。


## 项目功能

### Node.js Koa2服务端 API
- [x] 管理员与权限控制接口
- [x] 文章管理接口
- [x] 评论回复功能接口
- [x] 专栏接口
- [x] 专栏关联章节接口
- [x] 专栏章节关联文章接口
- [x] 专栏文章评论回复接口
- [x] 分类接口
- [x] 广告接口

### 前端展示网站和后台管理系统
- [x] 使用最新 [Vue-cli3 模板](https://github.com/vuejs/vue-cli) 搭建
- [x] 使用 Vue.js iviewui design 搭建的后台管理系统

## 项目特点
- 前后端分离，使用精小而强大的 Node.js Koa2 框架做服务端 API 接口，使用前端 Vue.js 框架搭建博客前端展示网站和后台管理系统。
- Koa 与 Koa 二次开发API，深入Koa2的中间件洋葱模型的应用，使用 async/await 解决异步编程问题。
- 在 Koa2 项目添加参数验证、全局异常处理中间件，编写JWT权限控制中间件，使项目变得更加健壮、清晰地高效开发。
- 使用 Sequelize ORM 管理 MySQL。
- 前端网站结合最新 [Vue-cli3](https://github.com/vuejs/vue-cli) 搭建，简单易维护。
- 后台管理系统使用 iviewui design 组件库，每个接口都使用模块化管理，清晰、简单快速地管理。
- ...

## 使用和学习

[服务端设计介绍](./server/doc/project.md)
[服务端目录结构](./server/doc/README.md)

### 数据库
启动项目前一定要在创建好 `cloudy` 数据库。
```
# 登录数据库
$ mysql -root -p密码

# 创建数据库
$ CREATE DATABASE IF NOT EXISTS cloudy DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 修改 Koa2 项目数据库配置
请在根目录下的 [|—server/config/config.js](https://gitee.com/xlys998/nodejs-vue-blog/blob/master/config/config.js) 文件下修改您本地的数据库名字（`cloudy`）和数据库密码。

### 克隆项目
首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。

根目录包含 client 和 server 文件夹，server文件夹下是 Node.js + Koa2 API开发源代码，client/web 文件夹下是前端网站项目源代码，client/admin 文件夹下是后台管理系统的源代码。


```
# 克隆项目代码
$ git clone https://gitee.com/xlys998/nodejs-vue-blog.git

# 进入server目录

# 安装依赖包
$ npm install

# 启动 Node.js Koa2 项目
$ npm run dev

# 打开浏览器输入回车：http://localhost:3000/v1/
# 可以查看目录下的 ./app/api/v1 下的接口 或者 看 doc 目录下的markdown 接口文档，在 postman 测试接口

# 启动前端项目
1. 在client目录下进入web项目：cd web，
2. 安装依赖包，执行: yarn install 或者 npm install 命令，
3. 启动项目: yarn serve 或者 npm run serve; 浏览器打开：http://localhost:8080/ 即可以访问。

# 启动后台管理系统
1. 在client目录下进入admin项目：cd admin，
2. 安装依赖包，执行: npm install 命令，
3. 启动服务: npm run dev; 浏览器打开：http://localhost:8083/ 即可以访问。
```

### 接口说明（重要）
项目的所有接口文档都这里，可以逐个文档看。
- [管理员接口文档说明](./server/doc/admin.md)
- [文章接口文档说明](./server/doc/article.md)
- [分类接口文档说明](./server/doc/category.md)
- [评论接口文档说明](./server/doc/comment.md)
- [回复评论接口文档说明](./server/doc/reply.md)
- [专栏接口文档说明](./server/doc/column.md)
- [专栏章节接口文档说明](./server/doc/column-chapter.md)
- [章节目接口文档说明](./server/doc/chapter-section.md)
- [广告接口文档说明](./server/doc/advertise.md)

## 部署 (以CentOS7为例)
环境配置，安装nodejs,mySQL,nginx,pm2，[安装方法](./server/doc/CentOS7安装NodeJS、mysql.md)，[Linux常用命令](./server/doc/Linux常用命令.md)
### 部署服务端
- 拷贝server文件夹 -> /opt/server
- 使用pm2启动服务 `pm2 start ./app.js`

### 部署前端
- 分别打包 admin 和 web，打包命令`npm run build`
- 修改nginx配置 `/usr/local/nginx/conf/nginx.conf`，[配置案例](./server/doc/nginx.conf.md)
- 拷贝 client/admin/dist -> /usr/local/nginx/html/admin
- 拷贝 client/web/dist -> /usr/local/nginx/html/web
- 启动nginx `/usr/local/nginx/sbin/nginx`

**注:** 如果要使用CDN加速，可以通过[unpkg](https://unpkg.com/)，所有npm上的依赖包都可以找到

### 域名绑定
如果服务器在内陆，绑定前需先备案
- 域名解析指向指定服务器IP，如果要绑定特定端口需要解析为隐式URL，然后重定向
- nginx配置，把把服务指向域名

## 结束语

项目已实现管理员、权限管理、文章、分类、评论、图片管理等功能，前端模板网站和后台管理系统。自己可以根据项目代码学习，可以到 postman 软件中测试API或学习。

喜欢或对你有帮助的话，请你点一个星星 <strong style='color:red;'>star</strong> 鼓励我，或者您有更好的建议和意见，请提出来告知我，共同探讨，共同进步。希望能够帮助到你！Thanks！共勉！
如果有不足之处，欢迎吐槽！

**联系方式**
- QQ: 1061366757
- 微信: xlys9999
