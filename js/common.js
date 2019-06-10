var API_URL = 'http://www.ytltzs.cn/api/city/';

var tranId = GetRequest().tranId || '37060000400010000003'

//获取url中"?"符后的字串
function GetRequest() {
    var url = location.href;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(url.indexOf("?") + 1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
// 获取数据
var getDataList = function(url, params, callback) {
    $.ajax({
        type: "GET",
        url: url,
        data: params,
        success: function(d) {
            callback && callback(d);
        },
        error: function(d) {
            console.log(JSON.stringify(d));
        }
    });
};
// 页面循环渲染数据的方法
function renderData(view, tpl, data) {
    if (data.length > 0) {
        laytpl(tpl).render(data, function(html) {
            view.html(html);
        });
    } else {
        view.html("暂无数据");
    }
}
// 获取本地用户信息
function getuserInfo() {
    var user_temp = localStorage.getItem("userInfo") || null;
    var user = new Object()
    if (user_temp) {
        try {
            var user = JSON.parse(user_temp)
        } catch (e) {
            console.log("用户信息格式有误!")
            user = null
        }
    };
    return user;
}
//数据存入本地方法
function setLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
//取本地数据方法
function getLocal(key, isJson) {
    var dataTemp = localStorage.getItem(key) || null
    var data = new Object()
    if (!dataTemp) {
        console.log("没有找到key为" + key + "的本地存储信息 ");
    } else {
        if (isJson == true) {
            try {
                data = JSON.parse(dataTemp)
            } catch (e) {
                console.log("Key为" + key + "的本地存储信息格式有误", "错误信息为:" + e)
            }
        }
    }
    return data;
}
//清空sessionStorage
function clearSessionStorage() {
    sessionStorage.clear();
}
