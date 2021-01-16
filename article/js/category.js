var baseUrl = 'http://www.itcbc.com:8080';
$.ajaxPrefilter(function(option) {
    // 统一配置上url(加上根路径)
    option.url = baseUrl + option.url;

    // 统一设置 headers
    option.headers = {
        Authorization: localStorage.getItem('token')
    };

    // 统一设置complete
    option.complete = function(xhr) {
        var res = xhr.responseJSON;
        if (res && res.status === 1 && res.message === '身份认证失败！') {
            localStorage.removeItem('token');
            Location.href = '../login.html';
        }
    }


})

// ----------------------- 渲染页面 -----------------------------
function renderCategory() {
    $.ajax({
        url: '/my/category/list',
        success: function(res) {
            if (res.status === 0) {
                var str = template('tpl-list', res);
                $('tbody').html(str);
            }
        }
    })
}
renderCategory();

// ----------------------- 删除分类 -----------------------------

$('tbody').on('click', '.del', function() {
    var id = $(this).data('id');
    layer.confirm('你确定要删除吗?', function(index) {
        //do something
        $.ajax({
            url: '/my/category/delete',
            data: { id: id },
            success: function(res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderCategory();
                }
            }
        })
        layer.close(index);
    });

});

// ----------------------- 添加分类 -----------------------------
var addIndex;
$('button:contains("添加类别")').on('click', function() {
    addIndex = layer.open({
        type: 1,
        title: '添加类别',
        content: $('#tpl-add').html(),
        area: ['500px', '250px']
    });
})

$('body').on('submit', '#add-form', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/my/category/add',
        data: $(this).serialize(),
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                renderCategory();
                layer.close(addIndex);
            }
        }
    })
});

// --------------------------- 修改分类 ------------------------
var editIndex;
$('tbody').on('click', 'button:contains("编辑")', function() {
    var shuju = $(this).data();
    // console.log(shuju);
    editIndex = layer.open({
        type: 1,
        title: '编辑类别',
        content: $('#tpl-edit').html(),
        area: ['500px', '250px'],
        success: function() {
            $('#edit-form input[name=name]').val(shuju.name);
            $('#edit-form input[name=alias]').val(shuju.alias);
            $('#edit-form input[name=id]').val(shuju.id);
        }
    })
})
$('body').on('submit', '#edit-form', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/my/category/update',
        data: data,
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                renderCategory();
                layer.close(editIndex);
            }
        }
    })
})