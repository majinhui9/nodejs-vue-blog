import fetch from './fetch';

export function uploadImg(params) {
    return fetch.post('/uploadImg', params);
}

export default {
    // 获取广告列表
    list(params) {
      return fetch.get('/imgManage', params)
    },
  
    // 删除广告
    destroy(id) {
      return fetch.delete('/imgManage/' + id)
    },
  
    // 广告详情
    detail(params) {
      const {id} = params;
      delete params.id;
      return fetch.get('/imgManage/' + id, params);
    },

    getDoc(name) {
      return fetch.get('/getDoc/' + name, {name});
    }
  }