const moment = require('moment');

const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义图片管理模型
class ImgManage extends Model {

}

// 初始图片管理模型
ImgManage.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  path: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '图片路径'
  },
  filename: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '图片名称'
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
  modelName: 'imgManage',
  tableName: 'imgManage'
})

module.exports = {
    ImgManage
}
