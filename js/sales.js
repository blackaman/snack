$(document).ready(function() {
	//正则函数传参
	function getUrlParam(name) { //构造一个含有目标参数的正则表达式对象  
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //匹配目标参数   
		var r = window.location.search.substr(1).match(reg); //返回参数值  
		if(r != null) return unescape(r[2]);
		return null;
	}
	//分类、热卖加载商品
	var leimu = getUrlParam('dafenlei');
	leimu = decodeURIComponent(decodeURIComponent(leimu));
	$.getJSON('goodsData.json', function(result) {
			$.each(result, function(i, goods) {
				var zhekou = goods.price * 10 / goods.oldprice;
				var content = '<div class="kuangjiadiv" data-id="' + goods.id + '"><div class="kuangjia"><img src="' + goods.img + '" class="salesimg"/><div class="salesfont">' + goods.tittle + '</div><div class="salesjiage"><span id="xianjia">￥' + goods.price + '.00</span><span class="yuanjia">￥' + goods.oldprice + '.00</span><span class="zhekou">' + zhekou.toFixed(1) + '折</span></div></div></div>';
				$('.maine').append(content);
				if(goods.zhulei == leimu) {
					$('.content').append(content);
				}
			});
			var contEmpty = $('.content').html();
			//如果列表没有数据，提示无数
			var empty = '<div class="empty">无数据</div>';
			if(contEmpty == "") {
				$('.content').html(empty);
			}
			//点击商品跳转到商品详情页
			$(".kuangjiadiv").on("click", function() {
				var id = $(this).attr('data-id');
				window.location = "goods detail.html?number=" + id;
			})
		})
		//分类栏点击弹窗收缩
	$(".dlbiaoti").on("click", function() {
			$(".dlimg").toggle(200);
			$(".slidediv").slideToggle(200);
		})
		//追加每个分类对应的类型
	$.getJSON('classify.json', function(result) {
		$.each(result, function(i, classify) {
				var li = '<li><div class="biaoqian">' + classify.subClass + '</div></li>';
				if(classify.mainClass == leimu) {
					$('.zilei').append(li);
				}
			})
			//点击分类标签，改变其标签样式。并切换内容
		$(".biaoqian").on("click", function() {
			$(".slidediv").slideUp(200);
			$('.biaoqian').css("background-color", "#E2E2E2");
			$(this).css("background-color", "#FF2D4B");
			$('.content').html("");
			var value = $(this).text();
			$.getJSON('goodsData.json', function(result) {
				$.each(result, function(i, goods) {
					var zhekou = goods.price * 10 / goods.oldprice;
					var content = '<div class="kuangjiadiv" data-id="' + goods.id + '"><div class="kuangjia"><img src="' + goods.img + '" class="salesimg"/><div class="salesfont">' + goods.tittle + '</div><div class="salesjiage"><span id="xianjia">￥' + goods.price + '.00</span><span class="yuanjia">￥' + goods.oldprice + '.00</span><span class="zhekou">' + zhekou.toFixed(1) + '折</span></div></div></div>';
					//如果标签选择其他小分类，获取该分类下的所有商品
					if(goods.zhulei == leimu && goods.fenlei == value) {
						$('.content').append(content);
						$('.dlfont').text(value);
					}
					//如果标签选中全部，获取当前主分类下的所有商品
					else if(value == '全部' && goods.zhulei == leimu) {
						$('.content').append(content);
						$('.dlfont').text(value)
					}
				});
				//没有数据的时候提示文案
				var contEmpty = $('.content').html();
				var empty = '<div class="empty">无数据</div>';
				if(contEmpty == "") {
					$('.content').html(empty);
					$('.dlfont').text(value);
				}
				//点击商品，跳转到商品详情页
				$(".kuangjiadiv").on("click", function() {
					var id = $(this).attr('data-id');
					window.location = "goods detail.html?number=" + id;
				})
			})
		})
	})

	//返回上一页
	$(".fanhuiimg").on("click", function() {
			history.back();
		})
		//品牌团详情页{
	var ppid = getUrlParam('ppnumber');
	$.getJSON('brandData.json', function(result) {
		$.each(result, function(j, brand) {
			if(ppid == brand.id) {
				var deadline = brand.time;
				//获取品牌团列表的时间显示在详情页中。
				function daojishi() {
					var attry = deadline.split(',');
					var nian = attry[0];
					var yue = attry[1];
					var ri = attry[2];
					var shi = attry[3];
					var fen = attry[4];
					var miao = attry[5];
					var daoqi = new Date(nian, yue, ri, shi, fen, miao);
					var today = new Date();
					var shengyu = (daoqi.getTime() - today.getTime()); //到截止日期需要的毫秒数
					var sss = (shengyu / 1000); //换算成秒
					var alls = Math.floor(sss); //取整
					var days = 24 * 60 * 60; //一天共有days秒
					var syday = (alls / days); //到截止日期共剩余syday天
					var day = Math.floor(syday); //取整，剩余day天
					var syhours = (syday - day) * 24; //取完天数后剩下syhours小时
					var hours = Math.floor(syhours); //将剩下syhours小时取整
					var symin = (syhours - hours) * 60;
					var min = Math.floor(symin);
					var sys = (symin - min) * 60;
					var s = Math.floor(sys);
					//秒数小于10时，前面增个0
					if(s < 10) {
						s = "0" + s;
					}
					//分钟数小于10时，前面增个0
					if(min < 10) {
						min = "0" + min;
					}
					//时位小于10时，前面增个0
					if(hours < 10) {
						hours = "0" + hours;
					}
					$(".daojishi").text("仅剩" + day + "天" + hours + "时" + min + "分" + s + "秒");
					//天数没有时，扣去天数的显示
					if(day == 0) {
						$(".daojishi").text("仅剩" + hours + "时" + min + "分" + s + "秒");
					}
				}
				//添加品牌团详情页的内容
				$('.brandimgdiv').attr('src', brand.img);
				$('.tegong').text(brand.tittle);
				setInterval(daojishi, 1000);
				$.getJSON('goodsData.json', function(result) {
					$.each(result, function(i, goods) {
						var zhekou = goods.price * 10 / goods.oldprice;
						var content = '<div class="kuangjiadiv" data-id="' + goods.id + '"><div class="kuangjia"><img src="' + goods.img + '" class="salesimg"/><div class="salesfont">' + goods.tittle + '</div><div class="salesjiage"><span id="xianjia">￥' + goods.price + '.00</span><span class="yuanjia">￥' + goods.oldprice + '.00</span><span class="zhekou">' + zhekou.toFixed(1) + '折</span></div></div></div>';
						$('.brandcontent').append(content);
					});
					//点击商品跳转到详情页
					$(".kuangjiadiv").on("click", function() {
						var id = $(this).attr('data-id');
						window.location = "goods detail.html?number=" + id;
					})
				})
			}
		});
	});
	//跳转到购物车
	$('.gouwuche').on('click', function() {
		window.location = "shop.html";
	})
})