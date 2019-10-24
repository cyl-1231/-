$.ajax({
    type:'get',
    url:'/posts',
    success:function(response){
        console.log(response);
        var html=template('postTpl',response)
        $('#page').html(html);
    }
})