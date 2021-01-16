initEditor(); // 调用函数,就会把textare 替换为富文本编辑器

// 1.初始化剪裁框
var $image = $('#image');

// 裁剪选项
var options = {
    aspectRatio: 400 / 200,
    preview: '.img-preview'
}

// 3.初始化裁剪区域
$image.cropper(options);