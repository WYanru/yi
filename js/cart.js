$(function() {

	var str = "";
	if(getCookie("lart")) {
		var obj = JSON.parse(getCookie("lart"));
	}
	var $token = obj[0];
	var url = "http://47.104.244.134:8080/cartlist.do";
	$.get(url, {
		token: $token
	}, function(res) {
		//console.log(res);
		for(var i = 0; i < res.length; i++) {
			str += "<li><input type='checkbox' class='whole'><b>" + res[i].id + "</b><img src='" + res[i].goods.picurl + "'><span class='C-gid'>" + res[i].gid + "</span><span class='C-mz'>" + '&nbsp' + res[i].goods.name + "</span><span class='C-jg'>" + res[i].goods.price + "</span><span class='jia'>" + '+' + "</span><span class='C-suliang'>" + res[i].count + "</span><span class='jian'>" + '-' + "</span><span class='C-sum'>" + res[i].goods.price * res[i].count + "</span><span class='del' >" + '&nbsp' + '删除' + "</span></li>"
		}
		
		$("#cartList").html(str);
	
		//点击全选
		
		$(".dianji ").click(function() {
			
			if($(this).is(':checked')) {
				$(".whole").prop("checked", true);
			} else {
				$(".whole").prop("checked", false);
			}
			totalMoney();
		})
		$(".C-floor input").click(function() {
			
			if($(this).is(':checked')) {
				$(".whole").prop("checked", true);
			} else {
				$(".whole").prop("checked", false);
			}
			totalMoney();
		})
		
		//判断子商品是否选中
		
		$(".whole").each(function() {

			$(this).click(function() {
				console.log("bb")
				if($(this).is(':checked')) {
					var len = $(".whole").length;
					var num = 0;
					$(".whole").each(function() {
						if($(this).is(':checked')) {
							num++;
						}
					});
					if(num == len) {
						$(".dianji").prop("checked", true);
					}
				} else {
					//单个商品取消勾选，全局全选取消勾选
					$(".dianji").prop("checked", false);
				}
				totalMoney();
			})
		})

		//获取减少/添加按钮
		$(".jian").click(function() {
			var $inputVal = $(this).parent().find(".C-suliang"),
				$count = parseInt($inputVal.html()) - 1;
			if($count <= 0) {
				$count = 0;
			}
			$inputVal.html($count);
			//console.log($(this).parents(".box").find("b").html())
			var Id = $(this).parent().find("b").html()
			var gid = $(this).parent().find(".C-gid").html()
			var $pr = $(this).parent().find(".C-jg").html()
			var $sumz = $(this).parent().find(".C-sum")
			//var $sum = $(this).parents(".box").find(".sum")
			console.log($pr)

			$sumz.html($pr * ($count));
			var url2 = "http://47.104.244.134:8080/cartupdate.do"
			$.get(url2, {
				id: Id,
				gid: gid,
				num: -1,
				token: $token
			}, function(res) {
				console.log(res)
			})
			totalMoney()
			

		})
		$(".jia").click(function() {
			var $inputVal = $(this).parent().find(".C-suliang"),
			    
				$count = parseInt($inputVal.html()) + 1;
				console.log($inputVal.html())
			if($count <= 0) {
				$count = 0;
			}
			$inputVal.html($count);
			var Id = $(this).parent().find("b").html()
			var gid = $(this).parent().find(".C-gid").html()
			var $pr = $(this).parent().find(".C-jg").html()
			var $sumz = $(this).parent().find(".C-sum")
			$sumz.html($pr * ($count))
			var url2 = "http://47.104.244.134:8080/cartupdate.do"
			$.get(url2, {
				id: Id,
				gid: gid,
				num: 1,
				token: 5347
			}, function(res) {
				console.log(res)
			})
			totalMoney()
			
		})
		//删除商品
		$(".del").click(function() {
			$(this).parent().remove()
			var gid = $(this).parent().find(".C-gid").html()
			var Id = $(this).parent().find("b").html()
			var url2 = "http://47.104.244.134:8080/cartupdate.do"
			$.get(url2, {
				id: Id,
				gid: gid,
				num: 0,
				token: $token
			}, function(res) {
				console.log(res)
			})
			
		})
		//计算价格
		function totalMoney() {
			var money = 0
			var k = 0
			$(".whole").each(function() {
				if($(this).is(':checked')) {
					var i = parseInt($(this).parent().find(".C-suliang").html());

					k += i
					var goods = parseInt($(this).parent().find(".C-sum").html())

					money += goods
					console.log(money)
				}
				$(".C-heji").html('￥' + money)

			})

		}
		var url1 = "http://47.104.244.134:8080/goodsbytid.do";
		$.get(url1, {
			tid: 13,
			page: 1,
			limit: 13
		}, function(res) {
			//console.log(res);
			if(getCookie("cart")) {
				var obj = JSON.parse(getCookie("cart"));
				//var str = "";
				for(var id in obj) {
					for(var j = 0; j < res.data.length; j++) {
						if(id == res.data[j].id) {
							str += "<li><input type='checkbox'><img src='" + res.data[j].picurl + "'><span class='C-mz'>" + '&nbsp' + res.data[j].name + "</span><span class='C-jg'>" + '&nbsp' + "￥" + res.data[j].price + "</span><span class='jia'>" + '+' + "</span><span class='C-suliang'>" + obj[id] + "</span><span class='jian'>" + '-' + "</span><span class='del' >" + '&nbsp' + '删除' + "</span></li>"

						}
					}
				}
				
				oCartList.innerHTML = str;

				//点击加或减

				var oDel = document.querySelectorAll(".del");
				var oLi = oCartList.children;
				for(let i = 0; i < oDel.length; i++) {
					oDel[i].onclick = function() {
						oCartList.removeChild(this.parentNode);
						delete obj[res.data[i].id];
						var objToStr = JSON.stringify(obj);
						setCookie("cart", objToStr, 7);
					}
				}
			}

		})
	})
	
	$(".shouye").on("click",function(){
		window.location.href="first.html"
		
	})
	$(".ren").on("click",function(){
		window.location.href="index.html"
		
	})
})