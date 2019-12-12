**server 目录结构**

server
  ├─app
  │  ├─api                         # 所有接口定义
  │  ├─dao                         # 数据库增删改查操作
  │  ├─lib                         # 公共格式定义
  │  ├─models                      # 数据库模型
  │  ├─service
  │  └─validators                  # 接口参数格式校验
  ├─config                         # 配置文件
  ├─core
  │  ├─db.js                       # 连接数据库
  │  ├─http-exception.js           # 错误异常定义
  │  ├─init.js                     # 初始化加载
  │  ├─lin-validator-v2.js         # 数据校验公共类
  │  └─util.js                     # jwt-生成
  ├─doc                            # 接口文档目录
  ├─middlewares                    # 中间件目录
  │  ├─auth.js                     # jwt-校验
  │  └─exception.js                # 接口输出中间件
  ├─public                         # 静态资源目录
  └─app.js                         # server入口



