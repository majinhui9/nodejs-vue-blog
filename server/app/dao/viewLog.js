const {ViewLog} = require('../models/viewLog')
const {BrowserMatch} = require('../lib/utils')

class ViewLogDao {

  // 创建日志
  static async create(data, ctx) {
    const viewLog = new ViewLog();
    const browser = BrowserMatch.init(ctx.request.header['user-agent'])
    viewLog.article_id = data.id;
    viewLog.article_title = data.title;
    viewLog.ip = ctx.request.header['x-forwarded-for'] || ctx.request.header['x-real-ip'] || '未知';
    viewLog.province = '';
    viewLog.browser = browser.browser;
    viewLog.os = browser.os;

    return viewLog.save();
  }

  // 删除日志
  static async destroy(id) {
    const viewLog = await ViewLog.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!viewLog) {
      throw new global.errs.NotFound('没有找到相关日志');

    }
    viewLog.destroy()
  }


  // 日志列表
  static async list(page = 1) {
    const pageSize = 10;
    const viewLog = await ViewLog.findAndCountAll({
      // 每页10条
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where: {
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
      attributes: {
        exclude: ['updated_at']
      },
    })

    return {
      data: viewLog.rows,
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: viewLog.count,
        total: viewLog.count,
        total_pages: Math.ceil(viewLog.count / 10),
      }
    };
  }

}

module.exports = {
  ViewLogDao
}
