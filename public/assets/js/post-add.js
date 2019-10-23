$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        console.log(response);
        var html=template('classfyTpl',{data:response})
        $("#category").html(html)
    }
})