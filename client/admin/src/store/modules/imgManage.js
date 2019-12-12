import imgManage from '../../api/imgManage'

const state = {}
const mutations = {}
const actions = {
  // 获取图片列表
  async getImgList({state, commit}, params) {
    return imgManage.list(params);
  },
  // 获取图片详情
  async getImg({state, commit}, params) {
    return imgManage.detail(params);
  },
  // 删除图片
  async destroyImg({state, commit}, id) {
    return imgManage.destroy(id);
  },

  getDoc({state, commit}, name) {
    return imgManage.getDoc(name);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
