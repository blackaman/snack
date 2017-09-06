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
	var id = getUrlParam('number');
	var money = getUrlParam('money');
	var goid = getUrlParam('goid');
	$('.fontRed').text(money);
	//获取地址栏目
	$.getJSON("address.json", function(result) {
			$.each(result, function(i, address) {
				var adCont = '<div class="mineaddress_xx" data-id="' + address.id + '"><div class="mineaddress_name">' + address.name + '</div><div class="mineaddress_phone">' + address.phone + '</div></div>' +
					'<div class="mineaddress_address">' + address.province + address.city + address.town + address.addressDetail + '</div>';
				//如果地址为空时，获取设为默认的地址
				if(id == null && address.status == 1) {
					$('.mineaddress_middle').html(adCont);
				} 
				//更换选中的地址
				else if(address.id == id) {
					$('.mineaddress_middle').html(adCont);
				}
			});
			//跳转我的地址选择页
			$('.mineaddress').on('click', function() {
				var userId = $(this).find('.mineaddress_xx').attr('data-id');
				window.location = 'address-mine.html?userId=' + userId;
			})
	})
	//将从购物车勾选的商品ID弄成字符串用url传过来，再获取拆分成数组
	var arrty = new Array();
	var storeArrty = new Array();
	arrty = goid.split(",");
	var i = 0;
	$.getJSON("shop.json", function(result) {
			for(i; i < arrty.length; i++) {
				$.each(result, function(j, goods) {
					//与JSON中的数据对比，获取相同ID的商品显示出来
					if(arrty[i] == goods.id) {
						var store = goods.store;
						//判断是不是同一个店铺名，如果是同一个店铺名不再追加店铺栏
						if(storeArrty.indexOf(store) == -1) {
							storeArrty.push(store);
							var stCont = '<div class="xiaomiaodiv"> ' +
								'<div class="taobaoleft"><img src="img/shop/icon_cat.png"/></div>' +
								'<span class="taobaomiddle">' + goods.store + '</span>' +
								'</div>' +
								'<div class="goodsdiv"></div>' +
								'<div class="height40Div"><span>运费</span><span class="height40Div-right">￥' + goods.yunfei + '.00</span></div>' +
								'<div class="height40Div"><input type      ="text" name="confirmOrder-note" id="confirmOrder-note" placeholder="您对商家有特殊要求可在此添加备注" /></div>' +
								'<div class="height40Div"><span>共x件商品</span><span class="height40Div-right">小计:<span class="colorred">￥98.00</span></span></div>';
							$('.goodsInformation').append(stCont);
						}
						var allStore = $('.xiaomiaodiv').size();
						var n = 0;
						var storeText;
						//将相同店铺的商品，加载同一个店铺栏目下
						for(n; n < allStore; n++) {
							storeText = $('.taobaomiddle').eq(n).text();
							if(goods.store == storeText)
								var goCont = '<div class="goodsimgdiv">' +
									'	<div class="goodsimg"><img src="' + goods.img + '"/></div>' +
									'<div class="goodscontent">' +
									'<div class="goodsTittle">' + goods.tittle + '</div>' +
									'<div class="goodsKouwei">口味</div>' +
									'<div class="goodsMoney">￥' + goods.price + '.00</div>' +
									'	<div class="goodsNumber">x'+goods.number+'</div>' +
									'</div>	' +
									'</div>';
							$('.goodsdiv').eq(n).append(goCont);
						}
					}
				});
			}
		})
		//返回上一页
	$('.fanhuiimg').on('click', function() {
			history.back();
		})
		//交易成功页跳转到订单详情页
	$(".dealBtnDiv-orderDetail").on("click", function() {
			window.location = "orderDetail.html";
		})
		//支付成功页跳转到首页
	$(".dealBtnDiv-index").on("click", function() {
			window.location = "index.html";
		})
		//确认订单页跳转到支付成功页
	$(".dianlan-btnPay").on("click", function() {
		window.location = "paySuccess.html?money=" + money;
	})
})