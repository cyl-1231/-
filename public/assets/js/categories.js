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
$('#addcate').on('click','.edit',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(response){
            console.log(response);
            var html=template('editcateTpl',response);
            $('#editCategory').html(html);
        }
    })
})
$('#addcate').on('click','.delete',function(){
    // alert(1)
    var id=$(this).attr('data-id');
    $.ajax({
        type:'delete',
        url:'/categories/'+id,
        success:function(response){
           location.reload();
        }
    })
})