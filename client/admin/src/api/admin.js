import fetch from './fetch';

export default {
  // 登录
  login(params) {
    // fetch.post('/admin/register', {
    //   email: 'xlys998@163.com', password1: 'xlys999', password2: 'xlys999', nickname: 'cloudy'
    // })
    return fetch.post('/admin/login', params)
  },

  // 验证管理员token
  auth(params) {
    return fetch.get('/admin/auth', params)
  }
}
