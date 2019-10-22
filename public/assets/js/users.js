$('#userForm').on('submit',function(){
    // alert(123)
    // console.log($(this).serialize());
    var formdata=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/users',
        data:formdata,
        success:function(){
            location.reload();
        },
        error:function(){
            alert('用户添加失败');
        }
    })
    return false;
})
$('#avatar').on('change',function(){
    console.log($(this)[0].files[0]);
    var formData=new FormData();
    formData.append('avatar',$(this)[0].files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData:false,
        contentType:false,
        success: function (response) {
            $('#preview').attr('src',response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar)
        }
    });
})
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
      var html=template('usersTpl',{
          data:response
      })
    //   console.log(html);
      $('#userlist').html(html);
    }
});