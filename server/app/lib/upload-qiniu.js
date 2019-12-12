let qiniu = require("qiniu");
//七牛云 Access Key 和 Secret Key
let ACCESS_KEY = '_Tu0wVxURIsdfsdfsdfsdfUXr-333mxdVRIB';
let SECRET_KEY = 'gQ9cFxLgB30YsdfsdfdsfH7Gx9XauAKg-X';
//要上传的空间 名称
let bucket = 'cloudy';
let options = {
	scope: bucket,
	expires: 7200 // 上传凭证的有效时间,秒
};
let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
// 生成上传token
function getToken() {
	let putPolicy = new qiniu.rs.PutPolicy(options);
	return putPolicy.uploadToken(mac);
}

let config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2; // 华南机房

//构造上传函数
function uploadFile(key, localFile) {
	let uptoken = getToken()
	let formUploader = new qiniu.form_up.FormUploader(config);
	let putExtra = new qiniu.form_up.PutExtra();
	return new Promise((resolve, reject) => {
		
		formUploader.putFile(uptoken, key, localFile, putExtra, function(respErr,
			respBody, respInfo) {
			if (respErr) {
				throw respErr;
			}
			if (respInfo.statusCode == 200) {
				resolve(respBody);
			} else {
				console.log(respInfo.statusCode);
				resolve(respBody);
			}
		});
	})
}

//删除资源
function remove(key) {
	//构建bucketmanager对象
	var bucketManager = new qiniu.rs.BucketManager(mac, config)
	return new Promise((resolve, reject) => {
    	bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
			if (err) {
				reject(err);
				throw err;
			} else {
				// console.log(respInfo.statusCode);
				resolve(respBody);
			}
		});
	})
}
module.exports = { uploadFile, remove }