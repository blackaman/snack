$(document).ready(function() {
	//返回上一页
	function getUrlParam(name) {
		//构造一个含有目标参数的正则表达式对象
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//匹配目标参数
		var r = window.location.search.substr(1).match(reg);
		//返回参数值
		if(r != null) return unescape(r[2]);
		return null;
	}
	var statusName = getUrlParam('status');
	statusName = decodeURIComponent(decodeURIComponent(statusName));
	//方法判断订单状态对应的按钮
	function condition(sta, j) {
		if(sta == "待付款") {
			var obligation = '<div class="qujiesuanlist">去结算</div>' +
				'<div class="quxiaodingdan">取消订单</div>';
			$('.btndiv').eq(j).html(obligation);
		} else if(sta == "待发货") {
			var waitOpen = '<div class="tixingfahuo">提醒发货</div>';
			$('.btndiv').eq(j).html(waitOpen);
		} else if(sta == "待收货") {
			var waitCollect = '<div class="querenshouhuo">确认收货</div>' +
				'<div class="chakanwuliu">查看物流</div>';
			$('.btndiv').eq(j).html(waitCollect);
		} else if(sta == "待评价") {
			var waitAssess = '<div class="chakanwuliu">查看物流</div>' +
				'<div class="qupingjia">去评价</div>';
			$('.btndiv').eq(j).html(waitAssess);
		} else if(sta == "售后处理中") {
			var waitDispose = '<div class="delete">删除订单</div>' +
				'<div class="lianxikefu">联系客服</div>';
			$('.btndiv').eq(j).html(waitDispose);
		} else if(sta == "交易成功" || sta == "交易失败") {
			var shanchu = '<div class="delete">删除订单</div>';
			$('.btndiv').eq(j).html(shanchu);
		}
	}
	//遍历订单数据
	function change(title) {
		$.getJSON('order.json', function(result) {
			$('.content').html("");
			$.each(result, function(i, order) {
				var much = '<div class="CONT">' +
					'<div class="xiaomiaodiv">' +
					'<div class="taobaoleft"><img src="img/shop/icon_cat.png"/></div>' +
					'<span class="taobaomiddle">' + order.store + '</span>' +
					'<span class="xiaomiaorigth">' + order.status + '</span>' +
					'</div>' +
					'<div class="goodsimgdiv" data-id="' + order.id + '">' +
					'<div class="goodsimg">' +
					'<img src="img/sales/f332a3e365bb3b43c8bb0cddd33ae970.jpg"/>' +
					'</div>' +
					'</div>' +
					'<div class="jisuandiv">' +
					'<span class="number">共' + order.number + '件商品</span>' +
					'<span class="shifu">实付:<span class="colorred">￥' + order.money + '</span></span>' +
					'<span class="yunfei">运费:￥' + order.fare + '</span>' +
					'</div>' +
					'<div class="btndiv" data-id="' + order.goodsId + '"></div>' +
					'</div>';
				//从我的页面点击其他状态的支付订单，加载的数据为对应状态下的数据
				if(order.status == title) {
					$("[tittle=" + title + "]").addClass('borBot');
					$('.content').append(much);
					var num = $('.btndiv').size();
					var n = 0;
					for(n; n < num; n++) {
						condition(order.status, n);
					}
					//从我的页面点击商城订单时，加载所有的订单
				} else if(title == "全部") {
					$("[tittle*='全部']").addClass('borBot');
					$('.content').append(much);
					condition(order.status, i);
				}
			});
			//去结算，跳转到订单详情页
			$('.qujiesuanlist').on('click', function() {
					var id = $(this).parents('.btndiv').attr('data-id');
					window.location = 'confirmOrder.html?goid=' + id;
				})
				//查看物流
			$(".chakanwuliu").on("click", function() {
					window.location = "logistical.html"
				})
				//提醒发货
			$(".tixingfahuo").on("click", function() {
					$(".toast").css("display", "block")
					$(".toast").fadeOut(2000)
				})
				//取消订单
			$(".quxiaodingdan").on("click", function() {
					var btn = $(this).parents(".CONT");
					$(".tanchuangbg").css({
						"display": "block",
						"opacity": "0.5",
					})
					$(".exittanchuang").css("display", "block")
					$(".button_guang").on("click", function() {
						$(".tanchuangbg").hide();
						$(".exittanchuang").hide();
					})
					$(".button_xiaci").on("click", function() {
						$(".tanchuangbg").hide();
						$(".exittanchuang").hide();
						btn.remove();
					})
				})
				//联系客服
			$(".lianxikefu").on("click", function() {
				$(".tanchuangbg").css({
					"display": "block",
					"opacity": "0.5",
				})
				$(".kftanchuang").css("display", "block")
			})
			$(".tanchuangbg").on("click", function() {
				$(".tanchuangbg").hide();
				$(".kftanchuang").hide();
				$(".settanchuang").hide();
				$(".exittanchuang").hide();
				$(".shouhuotanchuang").hide();
				$(".deletetanchuang").hide();
			})
			$(".button_left").on("click", function() {
					alert("已复制好，可贴粘。");
				})
				//确认收货
			$(".querenshouhuo").on("click", function() {
					var btn = $(this).parents(".CONT");
					$(".tanchuangbg").css({
						"display": "block",
						"opacity": "0.5",
					})
					$(".shouhuotanchuang").css("display", "block")
					$(".button_guang").on("click", function() {
						$(".tanchuangbg").hide();
						$(".shouhuotanchuang").hide();
					})
					$(".button_xiaci").on("click", function() {
						$(".tanchuangbg").hide();
						$(".shouhuotanchuang").hide();
						btn.remove();
					})

				})
				//删除订单
			$(".delete").on("click", function() {
					var btn = $(this).parents(".CONT");
					$(".tanchuangbg").css({
						"display": "block",
						"opacity": "0.5",
					})
					$(".deletetanchuang").css("display", "block")
					$(".button_guang").on("click", function() {
						$(".tanchuangbg").hide();
						$(".deletetanchuang").hide();
					})
					$(".button_xiaci").on("click", function() {
						$(".tanchuangbg").hide();
						$(".deletetanchuang").hide();
						btn.remove();
					})
				})
				//跳转到订单详情页
			$(".goodsimgdiv").on("click", function() {
					var id = $(this).attr('data-id');
					window.location = "orderDetail.html?number=" + id;
				})
				//跳转到我的收件地址页
			$(".mineaddress").on("click", function() {
					window.location = "address-mine.html";
				})
				//跳转到评价页
			$(".qupingjia").on("click", function() {
					window.location = "sendRated.html";
				})
				//发表评价
			$(".fabiaopingjia").on("click", function() {
					$(".toast").css("display", "block")
					$(".toast").fadeOut(2000)
			})
			$(".fanhui").on("click", function() {
					$(".tanchuangbg").css({
						"display": "block",
						"opacity": "0.5",
					})
					$(".deletetanchuang").css("display", "block")
				})
				//弹窗，选择确认
			$(".button_guang").on("click", function() {
					$(".tanchuangbg").hide();
					$(".deletetanchuang").hide();
				})
				//弹窗，选择取消
			$(".button_likai").on("click", function() {
					$(".tanchuangbg").hide();
					$(".deletetanchuang").hide();
					history.back();
				})
				//交易成功页跳转到评价页
			$(".dealBtnDiv-rated").on("click", function() {
				window.location = "sendRated.html";
			})
		})
	}
	//在'我的'进入订单后默认显示选择的状态数据。
	change(statusName);
	//点击订单状态tab栏，切换订单内容。
	$('.orderstatus li').on('click', function() {
			$('.orderstatus li').removeClass('borBot');
			$(this).addClass('borBot');
			var title = $(this).text();
			change(title);
		})
		//返回上一页
	$(".fanhuiimg").on("click", function() {
			history.back();
		})
		//支付成功页
	var money = getUrlParam('money');
	$('.shifukuan').text(money);
	$('.dealBtnDiv-index').on('click', function() {
		window.location = 'index.html';
	})
})