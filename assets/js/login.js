// ---------------------切换两个盒子-------------------
$('.login a').on("click", function() {
    $(".login").hide().next().show();
});

$('.register a').on("click", function() {
    $(".login").show().next().hide();
});

// ------------------------注册功能-------------------
// 表单提交 -> 阻止默认行为 -> 收集表单数据(查询字符串) -> ajax提交
$(".register form").on("submit", function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    // console.log(data);
    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data: data,
        success: function(res) {
            // 提示
            layer.msg(res.message);
            if (res.status === 0) {
                // 清空输入框
                $(".register form")[0].reset();
                // 切换到输入框的盒子
                $(".login").show().next().hide();
            }
        },

    })
});


// ----------------------- 自定义表单验证 -----------------------
// 必须使用 layui 的内置模块 - form 模块
var form = layui.form;

// 调用 form 模块内置方法verify,自定义验证规则
form.verify({
    // 键(验证规则): 值(验证方法)

    // 比如验证用户名长度6~12位,只能是数字字母组合
    user: [/^[a-zA-Z0-9]{2,10}$/, '用户名只能是数字字母,且2~10位'],
    len: [/^\S{6,12}$/, '密码6~12位且不能有空格'],
    same: function(val) {
        // 形参,表示重复密码的值,(谁用这个验证规则,val表示谁的值)
        // 案例中,重复密码使用了这个验证规则,所以形参val表示输入的重复密码
        if (val !== $(".pwd").val()) {
            return '两次密码不一致';
        }
    }
});

// ----------------------------- 登录功能 ------------------
$(".login form").on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data: data,
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 登录成功 保存token
                localStorage.setItem('token', res.token);
                // 跳转到首页面 index.html
                location.href = './index.html';
            }
        }
    })
});