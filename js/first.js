$(function(){
	var i = 0
	setInterval(function(){
		i++;
		if(i>2){
			i=0
		}
		
		$(".list li").eq(i).fadeIn(600).siblings().fadeOut(600);
		$(".nav li").removeClass('active').eq(i).addClass('active')	
		
	},2000)
})
var count = 0;
$(function() {
	var oList = document.getElementById("prodList");
	var oNum = document.getElementById("num");
	var oLink = oNum.children[0];

	var url = "http://47.104.244.134:8080/goodsbytid.do";
	$.get(url, {
		tid: 13,
		page: 1,
		limit: 13
	}, function(res) {
		//console.log(res);
		var str = "";
		for(var i = 1; i < res.data.length; i++) {
			str += "<li><a href='dateils.html?id=" + res.data[i].id + "'><img src='" + res.data[i].picurl + "'><b>" + res.data[i].id + "</b><p class='f-name'>" + res.data[i].name + "</p><p class='f-price'>" + res.data[i].price + "</p></a><input type='button' class='addbtn' value='添加购物车' data-id='" + res.data[i].id + "'></li>";

		}
		oList.innerHTML = str;
		//点击跳转到详情页
		var obj1 = {};
		$("img").each(function() {
			$(this).click(function() {
				var $id = $(this).parent().find("b").html();
				console.log($id);
				if(obj1[$id] == undefined) {
					obj1[$id] = 1;
				} else {
					obj1[$id] += 1;
				}
				var objToStr = JSON.stringify(obj1);
				setCookie("hart", objToStr, 7);
			})
		})

		var aBtns = document.querySelectorAll(".addbtn");
		console.log(aBtns)
		if(getCookie("lart")) {
			var obj = JSON.parse(getCookie("lart"));
		}
		var token = obj[0];
		//console.log(obj[0]);
		
		for(var i = 0; i < aBtns.length; i++) {
			aBtns[i].onclick = function() {

				//获取数字
				if(getCookie("lart")) {
					var obj = JSON.parse(getCookie("lart"));					
				} 
				count++;
				$(".gouwu").html(count)
                 obj[2]=count;
				var objToStr = JSON.stringify(obj);
				setCookie("lart", objToStr)
				

				var id = this.getAttribute("data-id");
				var url = " http://47.104.244.134:8080/cartsave.do";
				$.get(url, {
					gid: id,
					token: token
				}, function(res) {
					console.log(res);
				})
			}
		}
	})
	$(".gouwu").on("click",function(){
		window.location.href="cart.html"
		
	})
	$(".ren").on("click",function(){
		window.location.href="index.html"
		
	})
})