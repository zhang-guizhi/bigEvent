// ------------------------------- 获取用户头像渲染到页面上 -------------------------
// 封装成函数,会多次调用
function getUserInfo() {
    $.ajax({
        url: '/my/user/userinfo',
        success: function(res) {
            // console.log(res);
            if (res.status === 0) {
                // 1.设置欢迎你, xxx
                var name = res.data.nickname || res.data.username;
                $(".username").text(name);

                // 2.设置头像,优先使用图片
                if (res.data.user_pic) {
                    // 说明有图片
                    $(".layui-nav-img").attr('src', res.data.user_pic).show();
                    $(".text-avatar").hide();
                } else {
                    // 说明有图片 截取名字的首字母,转大写
                    var first = name.substr(0, 1).toUpperCase();
                    $(".text-avatar").text(first).css('display', 'inline-block');
                    $(".layui-nav-img").hide();
                }
            }
        }
    })
}
getUserInfo();

// --------------------------------- 退出 ------------------------------------------

$("#logout").on('click', function(e) {
    e.preventDefault();
    layer.confirm('你确定要退出吗?', function(index) {
        // 删除token
        localStorage.removeItem('token');
        // 跳转到页面
        location.href = './login.html';

        // 关闭弹层
        layer.close(index);
    })
})