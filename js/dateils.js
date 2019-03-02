id = location.search.split("=")[1];
console.log(id)
$(function() {
	var str = "";
	var str1 = "";
	var str2 = "";
	var str3 = "";
	var str4="";
	var url = "http://47.104.244.134:8080/goodsbyid.do";
	$.get(url, {id: id}, function(res) {
		
		/*str1 = "<img src='" + res.picurl + "'/>"
		
		$(".d-title").append(str1);*/
		
		str2 = "<h4>" + res.name + "</h4>"
		$(".d-title").append(str2);
			
		
	})
})
 

//点击购物车那里的左右
$(function() {
	
	//
	$("#btn").on("click",function(){
		//购物车添加
		if(getCookie("lart")) {
			var obj = JSON.parse(getCookie("lart"));
		}
		var token = obj[0];		
		
		var url2="http://47.104.244.134:8080/cartsave.do";
		$.get(url2,{gid:id,token:token},function(res){
			console.log(res);
		})
	})
})
$(function(){
	$(".shouye").on("click",function(){
		window.location.href="first.html"
	})
	$(".gouwu").on("click",function(){
		window.location.href="cart.html"
		
	})
	$(".ren").on("click",function(){
		window.location.href="index.html"
		
	})
})
