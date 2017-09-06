$(document).ready(function() {
	//遍历购物车内的素有商品
	$.getJSON('shop.json', function(result) {
		var storeCont;
		var goodsCont;
		var storeArray = new Array();
		var i = 0;
		$.each(result, function(i, store) {
			var storeText = store.store;
			//获取购物车内所有商品的店铺，如果店铺名相同不再追加栏目
			if(storeArray.indexOf(storeText) == -1) {
				storeArray.push(storeText);
				storeCont = '<div class="dianpudiv">' +
					'<div class="dianpunamediv"><div class="dianpuname_cion"><img src="img/shop/icon_shop.png"/></div><span class="dianpuname_font">' + store.store + '</span></div>' +
					'<div class="goodsdiv"></div>' +
					'<div class="huizongdiv"><span class="zongji">共<span class="xiaoji-number">x</span>件商品</span></span><span class="xiaoji_jine">￥98.00</span><span class="xiaoji">小计：</span></div>' +
					'</div>';
				$('.content').append(storeCont);
			}
		});
		//获取购物车商品的店铺数量（不包括重复店铺）
		var all = $('.dianpuname_font').size();
		for(i; i < all; i++) {
			var storeName = $('.dianpuname_font').eq(i).text();
			var parameter = $('.dianpuname_font').eq(i);
			//遍历商品，将商品归类到相应的店铺下
			$.each(result, function(j, storee) {
				if(storeName == storee.store) {
					goodsCont = '<div class="shangpindiv">' +
						'<div class="shangpin_cion">' +
						'<img src="img/address/normal.png" class="normal" data-id="' + storee.id + '"/>' +
						'</div>' +
						'<div class="shangpin_img"><img src="' + storee.img + '"/></div>' +
						'<div class="shangpin_content">' +
						'<div class="shangpin_name">' + storee.tittle + '</div>' +
						'<div class="shangpin_kouwei">口味:原味</div>' +
						'<div class="shangpin_shuliang">' +
						'<div class="shuliang_left">-</div>' +
						'<div class="shuliang_middle">' + storee.number + '</div>' +
						'<div class="shuliang_right">+</div>' +
						'</div>' +
						'</div>' +
						'<div class="shangpin_money">' +
						'<span>￥</span><span class="xianjia">' + storee.price + '.00</span>' +
						'<div class="yuanjia">￥' + storee.oldprice + '.00</div>' +
						'<div class="delete"><img src="img/address/btn_deleted.png"/></div>' +
						'</div>' +
						'</div>';
					$('.goodsdiv').eq(i).append(goodsCont);
				}
			});
			//计算下每个店铺的小计金额
			xiaoji(parameter);
		}
		//全选选中与取消
		$(".gouxuan").on("click", function() {
				var status = $(this).find("img").attr("src");
				//取消全选，并计算合计金额
				if(status.indexOf("normal.png") == -1) {
					$(".shangpin_cion img").attr("src", "img/address/normal.png");
					$(".gouxuan img").attr("src", "img/address/normal.png");
					$(".jiesuan-number").html("");
					heji();
				}
				//全选，并计算合计金额
				else {
					$(".shangpin_cion img").attr("src", "img/address/selected.png");
					$(".gouxuan img").attr("src", "img/address/selected.png");
					number();
					heji();
				}
				//定义函数，获取勾选的数量。将数量显示在共X件商品中
				function number() {
					var chknum = $(".shangpin_cion").size();
					$(".jiesuan-number").html("(" + chknum + ")")
				}
			})
			//商品选中和取消选中
		$(".shangpin_cion").on("click", function() {
				var status = $(this).find("img").attr("src");
				if(status.indexOf("normal.png") == -1) {
					$(this).find("img").attr("src", "img/address/normal.png");
					allchk();
					heji();
				} else {
					$(this).find("img").attr("src", "img/address/selected.png");
					allchk();
					heji();
				}
				//定义个函数，如果商品一个个选，全部选中后和全选按钮做关联
				function allchk() {
					var chknum = $(".shangpin_cion").size();
					var chk = 0;
					$(".shangpin_cion").each(function() {
							var zhuangtai = $(this).find("img").attr("src");
							if(zhuangtai.indexOf("normal.png") == -1) {
								chk++;
								$(".jiesuan-number").html("(" + chk + ")")
							}
						})
						//如果商品都被逐个选中，全选按钮也要被选中
					if(chknum == chk) {
						$(".gouxuan img").attr("src", "img/address/selected.png");
					} else if(chk == 0) {
						$(".jiesuan-number").html("");
					}
					//如果商品都逐个被选中，取消选中一个商品，去选按钮也要被取消掉
					else {
						$(".gouxuan img").attr("src", "img/address/normal.png");
					}
				}
			})
			//每次数量增加，小计合计数量栏目实时变化
		$(".shuliang_right").on("click", function() {
				var a = $(this).siblings(".shuliang_middle");
				a.html(parseInt(a.html()) + 1);
				xiaoji(a);
				heji();
			})
			//每次数量减少，小计合计数量栏目实时变化
		$(".shuliang_left").on("click", function() {
				var a = $(this).siblings(".shuliang_middle");
				//当数量小于或等于1后，点击按钮无反应
				if(a.html() <= 1) {
					a.html(1);
				} else {
					a.html(parseInt(a.html()) - 1);
					xiaoji(a);
					heji();
				}
			})
			//核对小计金额
		function xiaoji(canshu) {
			var xiaoji = 0;
			var dianpushuliang = 0;
			//每个店铺对应一个小计，遍历所有店铺下的小计
			canshu.parents(".dianpudiv").find(".shangpindiv").each(function() {
				//店铺下所有商品价格和数量和
				xiaoji += parseInt($(this).find(".shuliang_middle").html()) * parseFloat($(this).find(".xianjia").html());
				dianpushuliang += parseInt($(this).find(".shuliang_middle").html());
			})
			canshu.parents(".dianpudiv").find(".xiaoji_jine").html("￥" + xiaoji.toFixed(2));
			canshu.parents(".dianpudiv").find(".xiaoji-number").html(dianpushuliang);
		}
		//核对合计金额
		function heji() {
			var heji = 0;
			var allshuliang = 0;
			//遍历所有被勾选商品的总金额
			$(".shangpindiv").each(function() {
				var status = $(this).find(".shangpin_cion img").attr("src");
				if(status.indexOf("normal.png") == -1) {
					heji += parseInt($(this).find(".shuliang_middle").html()) * parseFloat($(this).find(".xianjia").html());
					allshuliang += parseInt($(this).find(".shuliang_middle").html());
				}
			})
			$(".shuju_jine").html(heji.toFixed(2));
			$(".heji-number").html(allshuliang);
		}
		heji();
		//删除购物车中的商品
		$(".delete").on("click", function() {
				$(".tanchuang").css("display", "block");
				$(".quxiao").on("click", function() {
					$(".tanchuang").css("display", "none");
				})
				$(".queren").on("click", function() {
					var divnumber = a.parents(".shangpindiv").siblings(".shangpindiv").size();
					$(".tanchuang").css("display", "none");
					if(divnumber == 0)
						a.parents(".dianpudiv").remove();
					else {
						a.parents(".shangpindiv").remove();
						divnumber--;
					}

				})
			})
			//跳转到确认订单页
		$(".button_jiesuan").on("click", function() {
			var money = $('.shuju_jine').text();
			var all = $('.normal').size();
			var j = 0,
				s = 0;
			var canshuArray = [];
			for(j; j < all; j++) {
				var status = $('.normal').eq(j).attr('src');
				if(status.indexOf("normal.png") == -1) {
					var goid = $('.normal').eq(j).attr("data-id");
					canshuArray.push(goid);
				}
			}
			window.location = "confirmOrder.html?money=" + money + "&goid=" + canshuArray.toString();
		})
	});
})