// 加载layui的form的模块
var form = layui.form;
// --------------------- 完成数据回填 ---------------------
function renderUser() {
    $.ajax({
        url: '/my/user/userinfo',
        success: function(res) {
            if (res.status === 0) {
                // 数据回填
                // $("input[name=username]").val(res.data.username);
                // $("input[name=nickname]").val(res.data.nickname);
                // $("input[name=email]").val(res.data.email);
                // $("input[name=id]").val(res.data.id);
                // form.val('表单的lay-filter属性值', '对象形式的数据(对象的key要和表单各项的name属性值相同)');
                form.val('user', res.data);
            }
        }

    })

}
renderUser();


// ---------------------- 完成用户信息的修改 -------------------
$('form').on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/my/user/userinfo',
        data: data,
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                window.parent.getUserInfo();
            }
        }
    })
})

// ---------------------- 重置 --------------------------------
$("button[type=reset]").on('click', function(e) {
    e.preventDefault();
    renderUser();
})