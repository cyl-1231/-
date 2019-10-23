$('#modifypassword').on('submit',function(){
  var formdata=$(this).serialize();
//   console.log(formdata);
    $.ajax({
        type:'put',
        url:'/users/password',
        data:formdata,
        success:function(response){
            location.href='/admin/login.html'           
        }
    })
    return false;
})