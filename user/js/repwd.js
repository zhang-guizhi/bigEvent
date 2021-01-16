// ---------------------------------- 重置密码 ----------------------
$('form').on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/my/user/updatepwd',
        data: data,
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 修改密码成功之后,清空token,跳转到登录页重新登录
                localStorage.removeItem('token');
                window.parent.location.href = '../index.html';
            }
        }
    })
})



// --------------------- 表单验证 -----------------
// 1.新密码和原密码不能一样
// 2.新密码和原密码不一样
// 3.两次密码必须一致
var form = layui.form;
form.verify({
    len: [/^\S{6,12}$/, '长度必须要6~12位不能出现空格'],
    diff: function(val) {
        if (val === $('input[name=oldPwd').val()) {
            return '新密码不能和原密码一致';
        }
    },
    same: function(val) {
        if (val !== $('input[name=newPwd').val()) {
            return '两次新密码不一致';
        }
    }
})