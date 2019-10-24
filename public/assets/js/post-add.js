$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        console.log(response);
        var html=template('classfyTpl',{data:response})
        $("#category").html(html)
    }
})
$('#feature').on('change',function(){
    var file=this.files[0];
    // console.log(file);
    var formData=new FormData();
    formData.append('cover',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(response){
            console.log(response);
            // $('#beatifulpic').prop('src').response[0].cover
            // console.log( $('#beatifulpic').prop('src'));
            $('#beatifulpic').attr('src',response[0].cover)
            $('#thumbnail').val(response[0].cover)
        }
    })
})
$('#addForm').on('submit', function () {
	// 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    console.log(formData);
    
	// 向服务器端发送请求 实现添加文章功能
	$.ajax({
		type: 'post',
		url: '/posts',
		data: formData,
		success: function () {
			// 文章添加成功 跳转到文章列表页面
            location.href = '/admin/posts.html'
            // console.log(response);
            
		}
	})
	// 阻止表单默认提交的行为
	return false;
});