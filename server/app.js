const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors');
const path = require('path')
const static = require('koa-static')

const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(cors()) // 处理跨域
app.use(catchError)
app.use(parser()) // 处理post请求数据

app.use(static(path.resolve(__dirname, 'public'))); // 配置静态资源

InitManager.initCore(app)

app.listen(3000)
