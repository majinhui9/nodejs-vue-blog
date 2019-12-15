const fs=require('fs');

// 分类列表创建树结构
function handleTree(list) {
  // 对源数据深度克隆
  let cloneData = JSON.parse(JSON.stringify(list))
  //循环所有项
  return cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      //返回每一项的子级数组
      return father.id === child.parent_id
    });
    if (branchArr.length > 0) {
      //如果存在子级，则给父级添加一个children属性，并赋值
      father.sub_comments = branchArr;
    }
    //返回第一层
    return father.parent_id === 0;
  });
}



// 监测创建文件夹
function creatDir(time) {
    return new Promise((resolve, reject) => {
        fs.stat('./public/md/'+time,function(error,stats){
            if(error){
                fs.mkdir('./public/md/'+time,function(error){
                    if(error){
                        console.log(error);
                        reject(false);
                    }
                    resolve('创建目录成功');
                })
                reject(false);
            }
            resolve(true)
        })
    })
}

// 写入md文件
function writeMd (path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content,'utf8',function(error){
            if(error){
                console.log(error);
                reject(false)
            }
            resolve('写入成功');

        })
    })
}
// 读取文件
function readMd(path) {
  if (!path) { return false}
  return path && fs.readFileSync(path, 'utf8');
}


// 根据ua 获取用户 浏览器和系统
var BrowserMatch = {  
    init: function(ua) {  
      let browser = this.getBrowser(ua) || {}
      this.browser = (browser.browser + ' ' + browser.version) || "未知浏览器";  //获取浏览器名 版本
    //  this.version = browser.version || "未知浏览器版本号";  //获取浏览器版本
      this.OS = this.getOS(ua)+" "+this.getDigits(ua) || "未知操作系统"; //系统版本号 
      return {browser: this.browser, os: this.OS}
    },  
    getOS: function(ua) {  //判断所处操作系统
      if (!ua) { return {} }
      var sUserAgent = ua;   
      
      var isWin = (sUserAgent.indexOf("Win32") > -1) || (sUserAgent.indexOf("Win64") > -1)|| (sUserAgent.indexOf("wow64") > -1);   
      
      var isMac = (sUserAgent.indexOf("Mac68K") > -1) || (sUserAgent.indexOf("MacPPC") > -1) || (sUserAgent.indexOf("Macintosh") > -1) || (sUserAgent.indexOf("MacIntel") > -1);   
      if (isMac) return "Mac";   
      var isUnix = (sUserAgent.indexOf("X11") > -1) && !isWin && !isMac;   
      if (isUnix) return "Unix";   
      var isLinux = (String(sUserAgent).indexOf("Linux") > -1);   
      var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";  
      if (isLinux) {  
      if(bIsAndroid) return "Android";  
      else return "Linux";   
      }  
      if (isWin) {   
        sUserAgent = sUserAgent.toLowerCase()
        var isWin2K = sUserAgent.indexOf("Windows nt 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;   
        if (isWin2K) return "Win2000";   
        var isWinXP = sUserAgent.indexOf("Windows nt 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1  
        sUserAgent.indexOf("Windows XP") > -1;   
        if (isWinXP) return "WinXP";   
        var isWin2003 = sUserAgent.indexOf("Windows nt 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;   
        if (isWin2003) return "Win2003";   
        var isWinVista= sUserAgent.indexOf("Windows nt 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;   
        if (isWinVista) return "WinVista";   
        var isWin7 = sUserAgent.indexOf("Windows nt 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;   
        if (isWin7) return "Win7";   
        var isWin8 = sUserAgent.indexOf("windows nt 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;  
        if (isWin8) return "Win8"; 
        var isWin10 = sUserAgent.indexOf("windows nt 10.0")>-1||sUserAgent.indexOf("Windows 10")>-1;	
        if(isWin10)return "Win10";				
      }  
      return "其他";
    },  
    getDigits:function(ua){ //判断当前操作系统的版本号 
    if (!ua) { return {} }
    var sUserAgent = ua;   
    var is64 = sUserAgent.indexOf("win64") > -1||sUserAgent.indexOf("wow64") > -1||sUserAgent.indexOf("Win64") > -1;  
    if (is64) {  
      return "64位";  
    }else{  
        return "32位";    
    }  
    },
    getBrowser: function(ua) {  // 获取浏览器名
      if (!ua) { return {} }
      ua = ua.toLowerCase()
      var rMsie = /(msie\s|trident\/7)([\w\.]+)/;  
      var rTrident = /(trident)\/([\w.]+)/;  
      var rEdge = /(chrome)\/([\w.]+)/;//IE
      
      var rFirefox = /(firefox)\/([\w.]+)/;  //火狐
      var rOpera = /(opera).+version\/([\w.]+)/;  //旧Opera
      var rNewOpera = /(opr)\/(.+)/;  //新Opera 基于谷歌
      var rChrome = /(chrome)\/([\w.]+)/; //谷歌 
      var rUC = /(chrome)\/([\w.]+)/;//UC
      var rMaxthon = /(chrome)\/([\w.]+)/;//遨游
      var r2345 =  /(chrome)\/([\w.]+)/;//2345
      var rQQ =  /(chrome)\/([\w.]+)/;//QQ
      var rMetasr =  /(metasr)\/([\w.]+)/;//搜狗
      var rSafari = /version\/([\w.]+).*(safari)/;
      


      var matchBS, matchBS2;  
      
      //IE 低版
      matchBS = rMsie.exec(ua);  
      if (matchBS != null) {  
        matchBS2 = rTrident.exec(ua);  
        if (matchBS2 != null) {  
          switch (matchBS2[2]) {  
          case "4.0":  
            return { browser: "Microsoft IE", version: "IE: 8" };  
          case "5.0":  
            return { browser: "Microsoft IE", version: "IE: 9" };  
          case "6.0":  
            return { browser: "Microsoft IE", version: "IE: 10" };  
          case "7.0":  
            return { browser: "Microsoft IE", version: "IE: 11" };  
          default:  
            return { browser: "Microsoft IE", version: "Undefined" };  
          }  
        } else {  
          return { browser: "Microsoft IE", version: "IE:"+matchBS[2] || "0" };  
        }  
      }  

      //谷歌浏览器
      matchBS = rChrome.exec(ua);  
      if ((matchBS != null)) {  
        matchBS2 = rNewOpera.exec(ua);  
        if (matchBS2 == null) {  
          return { browser: "谷歌", version: "Chrome/"+matchBS[2] || "0" };  
        } else {  
          return { browser: "Opera", version: "opr/"+matchBS2[2] || "0" };  
        }  
      }  
     
    //UC浏览器					  
      matchBS = rUC.exec(ua);                         		   
      if ((matchBS != null)) {  
        return { browser: "UC", version: "Chrome/"+matchBS[2] || "0" };  
      }  
      //火狐浏览器
      matchBS = rFirefox.exec(ua);  
      if ((matchBS != null)) {  
        return { browser: "火狐", version: "Firefox/"+matchBS[2] || "0" };  
      }  
    //Oper浏览器					 
    matchBS = rOpera.exec(ua);  
      if ((matchBS != null)) {  
        return { browser: "Opera", version: "Chrome/"+matchBS[2] || "0" };  
      }  
      //遨游
      matchBS = rMaxthon.exec(ua);  	 				   
      if ((matchBS != null)) {  
        return { browser: "遨游", version: "Chrome/"+matchBS[2] || "0" };  
      }  
      //2345浏览器					  
      matchBS = r2345.exec(ua);  	 				   
      if ((matchBS != null)) {  
        return { browser: "2345", version: "Chrome/ "+matchBS[2] || "0" };  
      }  
      //QQ浏览器					  
      matchBS = rQQ.exec(ua);  	 				   
      if ((matchBS != null)) {  
        return { browser: "QQ", version: "Chrome/"+matchBS[2] || "0" };  
      }  
      //Safari（苹果）浏览器
      matchBS = rSafari.exec(ua);  
      if ((matchBS != null) && (!(window.chrome)) && (!(window.opera))) {  
        return { browser: "Safari", version: "Safari/"+matchBS[1] || "0" };  
      }  
      
       //IE最新版
       matchBS = rEdge.exec(ua);  	 				   
       if ((matchBS != null)) {  
         return { browser: "Edge", version: "Chrome/"+matchBS[2] || "0" };  
       }  
    }  
}; 



module.exports = {
  handleTree, creatDir, writeMd, readMd, BrowserMatch
}
