$(document).ready(function() {
	//	//品牌团数据加载
	var i = 0,
		j = 0;
	$.getJSON("brandData.json", function(result) {
			$.each(result, function(i, brand) {
				var content = '<div class="pinpaicontent" data-id="' + brand.id + '">' +
					'<div class="pinpaicontent_img"><img src="' + brand.img + '"/></div>' +
					'<div class="endimg"></div>' +
					'<div class="pinpaicontent_biaoti">' +
					'<div class="zhekoubg"><p class="zhekou">' + brand.zhekou + '</p></div>' +
					'<p class="pinpaituanname">' + brand.tittle + '</p>' +
					'<time class="timea"></time>' +
					'<div class="timeimg"><img src="img/icon_clock.png"/></div>' +
					'</div>' +
					'</div>'
				$('.pinpaicontentdiv').append(content);
			});
			setInterval(daojishi(result), 1000);
			//品牌团点击跳转
			$(".pinpaicontent").on("click", function() {
				var ppid = $(this).attr('data-id');
				var block = $(this).find('.endimg').css('display');
				if(block == 'none') {
					window.location = "brand.html?ppnumber=" + ppid;
				}
			})
		})
		//倒计时器函数
	function daojishi(brand) {
		for(i in brand) {
			var deadline = brand[i].time;
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
			if(s < 10) {
				s = "0" + s;
			}
			if(min < 10) {
				min = "0" + min;
			}
			if(hours < 10) {
				hours = "0" + hours;
			}
			$(".timea").eq(i).text("仅剩" + day + "天" + hours + "时" + min + "分" + s + "秒");
			if(day == 0) {
				$(".timea").eq(i).text("仅剩" + hours + "时" + min + "分" + s + "秒");
			}
			if(shengyu <= 0) {
				$(".timea").eq(i).text("00时00分00秒");
				$(".endimg").eq(i).css("display", "block")
				$(".zhekoubg").eq(i).css("background-image", "url(img/bg_sales_grey.png)")
				$(".pinpaituanname").eq(i).css("color", "#A0A0A0")
				$(".pinpaicontent_img").eq(i).css("opacity", "0.5")
			}
		}
		return function() {
			daojishi(brand);
		}
	}
	//每日上新加载数据
	$.getJSON("goodsData.json", function(result) {
			$.each(result, function(j, newGoods) {
				var sxcontent = '<div class="shangxincontent" data-id="' + newGoods.id + '">' +
					'<div class="shangxincontent_img"><img src="' + newGoods.shangxinimg + '"/></div>' +
					'<div class="shangxinfont"><div class="shangxincontent_strong">' + newGoods.tittle + '</div><div class="jiage">￥' + newGoods.price + '元</div></div>' +
					'</div>';
				if(newGoods.shangxinimg != null) {
					$('.shangxincontentdiv').append(sxcontent);
				}
			});
			//每日上新点击事件
			$(".shangxincontent").on("click", function() {
				var id = $(this).attr('data-id');
				window.location = "goods detail.html?number=" + id;
			})
		})
		//search框
	$("#search").on("click", function() {
			window.location = "search.html";
		})
		//Banner栏
	var mySwiper = new Swiper('.swiper-container', {
			direction: 'horizontal',
			loop: true,
			pagination: '.swiper-pagination',
			autoplay: 3000,
			autoplayDisableOnInteraction: false
		})
		//分类
	$(".fenlei li").on("click", function() {
		var wenben = $(this).find('.fenlei_h5').text();
		wenben = encodeURIComponent(encodeURIComponent(wenben));
		window.location = 'classify.html?dafenlei=' + wenben;
	})

	//购物车
	$(".header_right").on("click", function() {
		window.location = "shop.html";
	})
	$(".guanggao").on("click", function() {
		window.location = "https://sanzhisongshu.tmall.com/?spm=a220o.1000855.1997427721.d4918089.8o2v0W";
	})
})