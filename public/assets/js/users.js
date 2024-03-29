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
// $('#avatar').on('change',function(){
//     console.log($(this)[0].files[0]);
//     var formData=new FormData();
//     formData.append('avatar',$(this)[0].files[0])
//     $.ajax({
//         type: "post",
//         url: "/upload",
//         data: formData,
//         processData:false,
//         contentType:false,
//         success: function (response) {
//             $('#preview').attr('src',response[0].avatar);
//             $('#hiddenAvatar').val(response[0].avatar)
//         }
//     });
// })
$('#modifyuser').on('change','#avatar',function(){
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
$('#userlist').on('click','.edit',function(){
  var id=  $(this).attr('data-id')
    // 根据id获取用户详细信息
    $.ajax({
        type:'get',
        url:'/users/'+id,
        data:id,
        success:function(response){
            console.log(response);
          var html= template('modifyTpl',response)   
            $('#modifyuser').html(html)
        }
    })
})
$('#modifyuser').on('submit','#userForm',function(){
//   console.log($(this).serialize());
  var formdata=$(this).serialize();
  console.log(formdata);
  
  var id=$(this).attr('data-id');
//   console.log(id);
  
  $.ajax({
      type:'put',
      url:'/users/'+id,
      data:formdata,
      success:function(response){
    //    location.reload()
       console.log(response);
       
      }
  })
    return false;
})

$('#userlist').on('click','.delete',function(){
        var id=$(this).attr('data-id'); 
        if(confirm('你确定要删除吗?'))
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function () { 
                location.reload()
             }
        })
})
// 复选框按钮
$('#checkall').on('change',function(){
  var status=$(this).prop('checked')
  // console.log(status);
  $('#userlist').find('input').prop('checked',status);
  if(status){
    $('#deletemany').show()
  }else{
    $('#deletemany').hide()
  }
})
$('#userlist').on('click','.userstatus',function(){
      var inputs=$('#userlist').find('input');
      // console.log(inputs);
      if(inputs.length==inputs.filter(':checked').length){
        $('#checkall').prop('checked',true)
      }else{
        $('#checkall').prop('checked',false)
      }
      if(inputs.filter(':checked').length>0){
        $('#deletemany').show()
      }else{
        $('#deletemany').hide()
      }
})
$('#deletemany').on('click',function(){
  var ids=[];
 var checkuser= $('#userlist').find('input').filter(':checked');
  checkuser.each(function(index,element){
    // id.push($element).attr('data-id')
    ids.push($(element).attr('data-id'));
  })
  if(confirm('您真要确定要进行批量删除操作吗')){
    $.ajax({
			type: 'delete',
			url: '/users/' + ids.join('-'),
			success: function () {
				location.reload();
			}
		})
  }
})