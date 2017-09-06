$(document).ready(function() {
	function getUrlParam(name) {
		//构造一个含有目标参数的正则表达式对象
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//匹配目标参数
		var r = window.location.search.substr(1).match(reg);
		//返回参数值
		if(r != null) return unescape(r[2]);
		return null;
	}
	//获取对应id的订单详情页
	var id = getUrlParam('number');
	$.getJSON('order.json', function(result) {
		$.each(result, function(i, detail) {
			//如果付款时间为空时，该栏目不显示
			if(detail.payTime == null) {
				$(".orderTimeDIV-li").eq(2).hide();
			}
			//如果发货时间为空时，该栏目不显示
			if(detail.openTime == null) {
				$(".orderTimeDIV-li").eq(3).hide();
			}
			//如果成交时间为空时，该栏目不显示
			if(detail.successTime == null) {
				$(".orderTimeDIV-li").eq(4).hide();
			}
			if(detail.id == id) {
				//静态页面数据获取替换
				$('.mineaddress_name').text(detail.name);
				$('.mineaddress_phone').text(detail.phone);
				$('.mineaddress_address').text(detail.province + detail.city + detail.town + detail.addressDetail);
				$('.colorred').text(detail.status);
				$('.orderInformation-Money').text(detail.money);
				$('.orderInformation-fare').text(detail.fare);
				//获取商品ID
				var goodsId = detail.goodsId;
				//将获取到的商品ID拆分成数组
				var goAttry = goodsId.split(',');
				var n = 0;
				$.getJSON('goodsData.json', function(result) {
						//遍历订单下的商品数组跟JSON中的商品进行对比，获取匹配数据显示出来
						for(n in goAttry) {
							$.each(result, function(j, goods) {
								if(goAttry[n] == goods.id) {
									var content = '<div class="xiaomiaodiv"> ' +
										'			<div class="taobaoleft"><img src="img/shop/icon_cat.png"/></div>' +
										'			<span class="taobaomiddle">' + detail.store + '</span>' +
										'		</div>' +
										'		<div class="goodsimgdiv">' +
										'			<div class="goodsimg">' +
										'				<img src="' + goods.img + '"/>' +
										'			</div>' +
										'			<div class="goodscontent">' +
										'				<div class="goodstittle">' + goods.tittle + '</div>' +
										'				<div class="goodsmoney">￥<span>' + goods.price + '.00</span></div>' +
										'				<div class="goodsnumber">x<span>1</span></div>' +
										'				<div class="goodskouwei">口味:<span>原味</span></div>' +
										'			</div>	' +
										'		</div>' +
										'	</div>';
									$('.goodsdiv').append(content);
								}
							});
						}
					})
					//运费信息
				$('.height40Div-right').text(detail.fare);
				$('.height40Div-right.colorred').text(detail.money);
				//订单时间信息数据显示
				var timeCont = '<div class="orderTimeDIV-li"><span>订单编号:</span><span>' + detail.orderId + '</span></div>' +
					'		<div class="orderTimeDIV-li"><span>生成时间:</span><span>' + detail.foundTime + '</span></div>' +
					'		<div class="orderTimeDIV-li"><span>付款时间:</span><span>' + detail.payTime + '</span></div>' +
					'		<div class="orderTimeDIV-li"><span>发货时间:</span><span>' + detail.openTime + '</span></div>' +
					'		<div class="orderTimeDIV-li"><span>成交时间:</span><span>' + detail.successTime + '</span></div>';
				$('.oderTimeDiv').html(timeCont);
				//各个订单状态对应的按钮（之前写的未再优化）
				var btnCont = '<div class="querenshouhuo">确认收货</div>' +
					'<div class="qujiesuan" data-id="' + detail.goodsId + '">去结算</div>' +
					'<div class="quxiaodingdan">取消订单</div>' +
					'<div class="delete">删除订单</div>' +
					'<div class="qupingjia">发表评价</div>' +
					'<div class="lianxikefu">联系客服</div>' +
					'<div class="tixingfahuo">提醒发货</div>' +
					'<div class="chakanwuliu">查看物流</div>';
				$('.bottomDiv').html(btnCont);
				if(detail.status == "待付款") {
					$('.querenshouhuo').hide();
					$('.delete').hide();
					$('.qupingjia').hide();
					$('.chakanwuliu').hide();
					$('.tixingfahuo').hide();
					$('.lianxikefu').hide();
				} else if(detail.status == "待发货") {
					$('.querenshouhuo').hide();
					$('.delete').hide();
					$('.qupingjia').hide();
					$('.chakanwuliu').hide();
					$('.qujiesuan').hide();
					$('.quxiaodingdan').hide();
					$('.lianxikefu').hide();
				} else if(detail.status == "待收货") {
					$('.quxiaodingdan').hide();
					$('.delete').hide();
					$('.qupingjia').hide();
					$('.qujiesuan').hide();
					$('.tixingfahuo').hide();
					$('.lianxikefu').hide();
				} else if(detail.status == "待评价") {
					$('.querenshouhuo').hide();
					$('.delete').hide();
					$('.quxiaodingdan').hide();
					$('.qujiesuan').hide();
					$('.tixingfahuo').hide();
					$('.lianxikefu').hide();
				} else if(detail.status == "售后处理中") {
					$('.querenshouhuo').hide();
					$('.qujiesuan').hide();
					$('.qupingjia').hide();
					$('.chakanwuliu').hide();
					$('.tixingfahuo').hide();
					$('.quxiaodingdan').hide();
				} else if(detail.status == "交易成功" || "交易关闭") {
					$('.querenshouhuo').hide();
					$('.tixingfahuo').hide();
					$('.qupingjia').hide();
					$('.chakanwuliu').hide();
					$('.qujiesuan').hide();
					$('.quxiaodingdan').hide();
					$('.lianxikefu').hide();
				}
			}
		});
		//返回上一页
		$('.fanhuiimg').on('click', function() {
			history.back();
		})
		//点击去结算跳转到确认订单页
		$('.qujiesuan').on('click', function() {
			var id = $(this).attr('data-id');
			window.location = 'confirmOrder.html?goid=' + id;
		})
	})
})