// ---------------------- 1. 初始化剪裁插件 ---------------------------
// 1.1 找到图片
var $image = $('#image');
// 1.2 写一个配置项
var option = {
    // 剪裁框的宽高比
    aspectRatio: 1,
    // 指定预览的容器
    preview: '.img-preview'
};
// 1.3 调用cropper方法，初始化
$image.cropper(option);

// ----------------------------- 2. 点击选择头像,能够实现选择图片 -----------------
$('#chooseFile').on('click', function() {
    $('#file').trigger('click');
});


// ----------------------- 3.当文件域内容改变了,能够更换剪裁区的图片 ------------------
$('#file').on('change', function() {
    if (this.files.length > 0) {
        var fileObj = this.files[0];
        // 为对象创建临时的url
        var url = URL.createObjectURL(fileObj);
        // 更换剪裁区图片(销毁剪裁框- 更换图片 - 重新生成)
        $image.cropper('destroy').attr('src', url).cropper(option);
    }
})