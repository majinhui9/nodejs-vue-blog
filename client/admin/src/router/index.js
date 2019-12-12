const routers = [
  {
    path: '/login',
    meta: {
      title: "登录",
      noAuth: true
    },
    component: (resolve) => require(['../views/login.vue'], resolve),
  },
  {
    path: '/',
    component(resolve) {
      require(['../views/layout.vue'], resolve);
    },
    children: [
      {
        //todo: 首页
        path: '/',
        name: 'index',
        meta: {module: "/", title: '首页'},
        component(resolve) {
          require(['../views/index.vue'], resolve);
        }
      },

      //todo: 管理员
      {
        path: 'admin',
        name: 'admin',
        meta: {module: "/admin", group: "set", title: '管理员 - 列表'},
        component: (resolve) => require(['../views/admin/index.vue'], resolve),
      },
      //todo: 分类管理
      {
        path: 'category',
        name: 'category',
        meta: {module: "/category", group: "category", title: '分类 - 列表'},
        component: (resolve) => require(['../views/category/list.vue'], resolve),
      },
      {
        path: 'category/create',
        name: 'category/create',
        meta: {module: "/category/create", group: "category", title: '分类 - 创建'},
        component: (resolve) => require(['../views/category/create.vue'], resolve),
      },
      {
        path: 'category/update/:id',
        name: 'category/update',
        meta: {edit: true, module: "/category", group: "category", title: '分类 - 更新'},
        component: (resolve) => require(['../views/category/update.vue'], resolve),
      },
      //todo: 广告管理
      {
        path: 'advertise',
        name: 'advertise',
        meta: {module: "/advertise", group: "advertise", title: '广告 - 列表'},
        component: (resolve) => require(['../views/advertise/list.vue'], resolve),
      },
      {
        path: 'advertise/create',
        name: 'advertise/create',
        meta: {module: "/advertise/create", group: "advertise", title: '广告 - 创建'},
        component: (resolve) => require(['../views/advertise/create.vue'], resolve),
      },
      {
        path: 'advertise/update/:id',
        name: 'advertise/update',
        meta: {edit: true, module: "/advertise", group: "advertise", title: '广告 - 更新'},
        component: (resolve) => require(['../views/advertise/update.vue'], resolve),
      },
      //todo: 文章管理
      {
        path: 'article',
        name: 'article',
        meta: {module: "/article", group: "article", title: '文章 - 列表'},
        component: (resolve) => require(['../views/article/list.vue'], resolve),
      },
      {
        path: 'article/create',
        name: 'article/create',
        meta: {module: "/article/create", group: "article", title: '文章 - 创建'},
        component: (resolve) => require(['../views/article/create.vue'], resolve),
      },
      {
        path: 'article/update/:id',
        name: 'article/update',
        meta: {edit: true, module: "/article", group: "article", title: '文章 - 更新'},
        component: (resolve) => require(['../views/article/update.vue'], resolve),
      },
      //todo: 专栏管理
      {
        path: 'column',
        name: 'column',
        meta: {module: "/column", group: "column", title: '专栏 - 列表'},
        component: (resolve) => require(['../views/column/list.vue'], resolve),
      },
      {
        path: 'column/create',
        name: 'column/create',
        meta: {module: "/column/create", group: "column", title: '专栏 - 创建'},
        component: (resolve) => require(['../views/column/create.vue'], resolve),
      },
      {
        path: 'column/update/:id',
        name: 'column/update',
        meta: {edit: true, module: "/column", group: "column", title: '专栏 - 更新'},
        component: (resolve) => require(['../views/column/update.vue'], resolve),
      },
      //todo: 章节管理
      {
        path: 'column/chapter/:column_id',
        name: 'chapter',
        meta: {module: "/column", group: "column", title: '专栏章节 - 列表'},
        component: (resolve) => require(['../views/chapter/list.vue'], resolve),
      },
      {
        path: 'chapter/section/:column_chapter_id',
        name: 'section',
        meta: {module: "/column", group: "column", title: '专栏章节文章 - 列表'},
        component: (resolve) => require(['../views/section/list.vue'], resolve),
      },
      {
        path: 'chapter/section/create/:column_chapter_id',
        name: 'chapter/section/create',
        meta: {module: "/column", group: "column", title: '专栏章节文章 - 创建'},
        component: (resolve) => require(['../views/section/create.vue'], resolve),
      },
      {
        path: 'chapter/section/update/:id',
        name: 'chapter/section/update',
        meta: {edit: true, module: "/column", group: "column", title: '专栏章节文章 - 更新'},
        component: (resolve) => require(['../views/section/update.vue'], resolve),
      },
      //todo: 评论管理
      {
        path: 'comments',
        name: 'comments',
        meta: {module: "/comments", group: "comments", title: '评论 - 列表'},
        component: (resolve) => require(['../views/comments/list.vue'], resolve),
      },
      //todo: 图片管理
      {
        path: 'imgManage',
        name: 'imgManage',
        meta: {module: "/imgManage", group: "imgManage", title: '图片 - 列表'},
        component: (resolve) => require(['../views/imgManage/list.vue'], resolve),
      },
      //todo: 文档
      {
        path: 'doc',
        name: 'doc',
        meta: {module: "/doc", group: "doc", title: '文档 - 列表'},
        component: (resolve) => require(['../views/doc/list.vue'], resolve),
      },
      //todo: 回复评论管理
      {
        path: 'reply/:comment_id',
        name: 'reply',
        meta: {module: "/comments", group: "comments", title: '回复评论 - 列表'},
        component: (resolve) => require(['../views/reply/list.vue'], resolve),
      },
      {
        //todo: 404
        path: '/403',
        name: '403',
        meta: {module: "/", title: '403 - 权限不足'},
        component(resolve) {
          require(['../views/403.vue'], resolve);
        }
      },
      {
        //todo: 404
        path: '*',
        name: '404',
        meta: {module: "/", title: '404 - 页面不存在'},
        component(resolve) {
          require(['../views/404.vue'], resolve);
        }
      }
    ]
  }
];

export default routers;
