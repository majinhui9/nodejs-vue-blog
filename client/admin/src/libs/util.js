import axios from 'axios';

let util = {};

util.title = function (title) {
  title = title ? title + ' - cloudy ' : 'cloudy 后台';
  window.document.title = title;
};

const ajaxUrl = '/api/v1';

util.ajax_url = ajaxUrl;

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
});

export default util;
