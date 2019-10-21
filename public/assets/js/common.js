$('#logout').on('click',function(){
    var isedit=confirm('你确定要退出吗');
      if(isedit){
        $.ajax({
          type: "post",
          url: "/logout",
          success: function (response) {
            location.href='login.html'
          },
          error:function(){
            alert('退出失败')
          }
        });
      }
    })