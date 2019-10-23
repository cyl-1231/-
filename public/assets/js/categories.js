$('#addCategory').on('submit',function(){
    var formdata=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/categories',
        data:formdata,
        success:function(response){
        location.reload();
        }
    })
    return false;
})
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        // console.log(response);
        var html=template('categoryTpl',{data:response})
        $('#addcate').html(html)
    }
})