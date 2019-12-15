const Router = require('koa-router')
const multer = require('koa-multer');//加载koa-multer模块  
const fs = require('fs')

const {uploadFile} = require('../../lib/upload-qiniu')

const {ImgManageDao} = require('../../dao/imgManage')
const {PositiveArticleIdParamsValidator} = require('../../validators/imgManage')
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})



//图片上传  
//配置  
var storage = multer.diskStorage({
	//图片保存路径  
	destination: function (req, file, cb) {
		cb(null, 'public/img/')
	},
	//修改图片名称  
	filename: function (req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		cb(null, fileFormat[0] + '_' + Date.now()%10000000 + "." + fileFormat[fileFormat.length - 1]);
	}
})
//加载配置  
var upload = multer({ storage: storage });
//路由  
router.post('/uploadImg', upload.single('file'), async (ctx, next) => {
	const body = {
		filename: ctx.req.file.filename, //返回图片名
		path: ctx.req.file.path
  }
  await uploadFile(body.filename, body.path) // 上传七牛云
	const r = await ImgManageDao.create({body});
	ctx.body = res.json(body)
})


// 删除图片
router.delete('/imgManage/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取图片ID参数
  const id = v.get('path.id');
	await ImgManageDao.destroy(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('删除图片成功')
})


// 获取图片列表
router.get('/imgManage', async (ctx) => {
  const page = ctx.query.page;
  let CommentReplyList = await ImgManageDao.list(page);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(CommentReplyList);

})

// 获取图片详情
router.get('/imgManage/:id', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取图片ID参数
  const id = v.get('path.id');
  let commentReply = await ImgManageDao.detail(id)

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(commentReply);

})

router.get('/getDoc/:name', upload.single('file'), async (ctx, next) => {
  const name = ctx.query.name
  const content = fs.readFileSync(`./doc/${name}.md`, 'utf8');
	ctx.body = res.json({
		content
  })
})

module.exports = router
