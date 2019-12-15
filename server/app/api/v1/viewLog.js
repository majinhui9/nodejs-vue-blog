const Router = require('koa-router')

const {ViewLogDao} = require('../../dao/viewLog')
const {PositiveArticleIdParamsValidator} = require('../../validators/comment')
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})


// 删除浏览日志
router.delete('/viewLog/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  await ViewLogDao.destroy(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('删除日志成功')
})


// 获取浏览日志列表
router.get('/viewLog', new Auth(AUTH_ADMIN).m, async (ctx) => {
  const page = ctx.query.page;
  let commentList = await ViewLogDao.list(page);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(commentList);

})



module.exports = router
