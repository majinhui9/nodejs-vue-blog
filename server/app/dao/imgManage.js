const {ImgManage} = require('../models/imgManage')
const fs = require('fs')
const {remove} = require('../lib/upload-qiniu')
class ImgManageDao {
  // 新增图片
  static async create(v) {
    // 检测是否存在图片
    const hasImgManage = await ImgManage.findOne({
      where: {
        filename: v.body.filename,
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasImgManage) {
      throw new global.errs.Existing('图片已存在');
    }

    const imgManage = new ImgManage();
    imgManage.filename = v.body.filename
    imgManage.path = v.body.path

    return imgManage.save();
  }

  // 删除图片
  static async destroy(id) {
    const imgManage = await ImgManage.scope('iv').findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!imgManage) {
      throw new global.errs.NotFound('没有找到相应图片');
    }

    fs.unlink(imgManage.path,(err) => {
			if (err) {
					console.log(err);
			}
    });
    remove(imgManage.filename)

    imgManage.destroy()

  }

  // 获取图片详情
  static async detail(id) {
    const imgManage = await ImgManage.scope('iv').findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!imgManage) {
      throw new global.errs.NotFound('没有找到相关图片信息');
    }

    return imgManage
  }



  // 图片列表
  static async list(page = 1) {
    const pageSize = 10;
    const imgManage = await ImgManage.findAndCountAll({
      limit: pageSize,//每页10条
      offset: (page - 1) * pageSize,
      where: {
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
      attributes: {
        exclude: ['email']
      }
    })

    return {
      data: imgManage.rows,
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: imgManage.count,
        total: imgManage.count,
        total_pages: Math.ceil(imgManage.count / 10),
      }
    };
  }
}

module.exports = {
  ImgManageDao
}
