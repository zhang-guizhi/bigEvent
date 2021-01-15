// 项目的通用配置文件

// 项目的根路径
var baseUrl = 'http://www.itcbc.com:8080';

// 使用$.ajaxPrefilter配置url headers complete
$.ajaxPrefilter(function(option) {
    // option 表示ajax请求的选项,比如option.url
    // 我们还可以对选项进行修改

    // 修改请求的url(加上根路径)
    option.url = baseUrl + option.url;

    // 配置headers,因为请求以 /my 开头的接口的时候,必须带请求头
    option.headers = {
        Authorization: localStorage.getItem('token')
    };

    // 配置complete,因为token有可能会过期 ==> 服务器返回401状态码 ==>触发complete函数
    // 所以在complete中,判断是否是身份认证失败如果是跳转到登录页
    option.complete = function(xhr) {
        var res = xhr.responseJSON;
        if (res && res.status === 1 && res.message === '身份认证失败！') {
            // 清除掉过期的token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = './login.html';
        }
        // 其他错误
        if (res && res.status === 1) {
            layer.msg(res.message);
        }
    }
})