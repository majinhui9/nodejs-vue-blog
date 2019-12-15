const moment = require('moment');

const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义浏览日志
class ViewLog extends Model {

}

// 初始浏览日志模型
ViewLog.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ip: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: '用户IP'
  },
  province: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: '用户定位'
  },
  browser: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: '用户浏览器'
  },
  os: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: '用户操作系统'
  },
  article_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    comment: '文章ID'
  },
  article_title: {
    type: Sequelize.STRING(50),
    allowNull: true,
    comment: '文章名称'
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}, {
  sequelize,
  modelName: 'viewLog',
  tableName: 'viewLog'
})

module.exports = {
    ViewLog
}
