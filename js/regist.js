//正则表达式（用户名）
$(function(){
	$("#text").on("change",function(){
		var reg = /^[a-z0-9A-Z]{5,}$/;
		if(!reg.test($("#text").val())){
			$(".r-user").html("格式错误");
		}else{
			$(".r-user").html("");
		}
	})
})
//正则表达式（邮箱）
$(function(){
	$("#ema").on("change",function(){
		var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!reg.test($("#ema").val())){
			$(".r-email").html("邮箱格式错误");
		}else{
			$(".r-email").html("");
		}
	})
})
//用户名验证
$(function(){
	$("#text").on("blur",function(){
		$.get("http://47.104.244.134:8080/username.do",{username:$(this).val()},function(res){
			if(res.msg=="失败"){
				$(".r-user1").html("用户名可用");
				//console.log("用户名可用");
			}else{
				$(".r-user1").html("用户名不可用");
				
			}
		})
	})
})
//邮箱验证
$(function(){
	$("#ema").on("blur",function(){
		$.get("http://47.104.244.134:8080/useremail.do",{email:$(this).val()},function(res){
			if(res.msg=="失败"){
				$(".r-email2").html("邮箱可用");
				
			}else{
				$(".r-email2").html("邮箱不可用");
				
			}
		})
	})
})
//注册
$(function(){
	$("#btn").on("click",function(){
		$.post("http://47.104.244.134:8080/usersave.do",{"username":$("#text").val(),"password":$("#psd").val(),"email":$("#ema").val(),"sex":"女"},function(res){
			console.log(res);	
			
		})
	})
	$(".ren").on("click",function(){
		window.location.href="index.html";
	})

})