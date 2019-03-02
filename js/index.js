$(function(){
	$("#btn").on("click",function(){
		$.post("http://47.104.244.134:8080/userlogin.do",{"name":$("#text").val(),"password":$("#psd").val()},
		function(res){
			console.log(res);
			if(res.msg=="OK"){
			    //window.location.href="#";
				window.location.href="first.html";
				console.log(res.data.token);
				//把登录的token存入cookie中
				var obj={};
				var $token=res.data.token;
				var $username = $("#text").val();
				//console.log($("#text").val());
				
				obj[0]=$token;
				obj[1]=$username;
				var objToStr = JSON.stringify(obj);
				setCookie("lart",objToStr);
				
			}else{
				alert("登录失败");
			}
			
		})
	})
	$("#sub").on("click",function(){
		window.location.href="regist.html"
		
	})
	$(".gouwu").on("click",function(){
		window.location.href="cart.html"
		
	})
	$(".shouye").on("click",function(){
		window.location.href="first.html"
		
	})
})
