$(document).ready(function() {
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	var id = getUrlParam('number');
	var userId = getUrlParam('userId');
	var addressId;
	$.getJSON('address.json', function(result) {
		//编辑地址时，进入编辑页默认获取原有的信息
		$.each(result, function(i, address) {
				//获取当前的编辑的地址id与JSON中的对比获取其数据
				if(id == address.id) {
					$('#shouhuoren').val(address.name);
					$('#shoujihaoma').val(address.phone);
					//调用插件，获取JOSN中的数据显示出来
					new PCAS("province3", "city3", "area3", address.province, address.city, address.town);
					$('#jiedaodizhi').val(address.addressDetail);
					//判断该地址是不是默认地址
					if(address.status == 1) {
						$('.hideimg').show();
						$('.showimg').hide();
					}
				}
				//遍历地址管理中的所有数据加载出来
				var cont = '<div class="tiaomu">' +
					'<div class="tiaomu_a"><span class="tiaomu_name">收件人:' + address.name + '</span><span class="tiaomu_phone">' + address.phone + '</span></div>' +
					'<div class="tiaomu_address">' + address.province + address.city + address.town + address.addressDetail + '</div>' +
					'<div class="caozuo">' +
					'<div class="caozuo_left"><div class="caozuo_img"><img src="img/address/normal.png"/></div><div>设为默认</div></div>' +
					'<div class="caozuo_right"><div class="caozuo_pirture"><img src="img/address/btn_deleted.png"/></div>删除</div>' +
					'<div class="caozuo_middle" data-id="' + address.id + '"><div class="caozuo_pirture"><img src="img/address/btn_change.png"/></div>编辑</div>' +
					'</div>' +
					'</div>';
				$('.addressCont').append(cont);
				//判断该地址是不是默认地址，是的话按钮被默认选中
				if(address.status == 1) {
					$('.caozuo_img img').eq(i).attr('src', 'img/address/selected.png');
				}
				//遍历确认订单中，我的地址的所有数据
				var mineCont = '<div class="mineaddress">' +
					'<div class="mineaddress_left" data-id="' + address.id + '"><img src="img/address/normal.png"/></div>' +
					'<div class="mineaddress_middle">' +
					'<div class="mineaddress_xx"><div class="mineaddress_name">' + address.name + '</div><div class="mineaddress_phone">' + address.phone + '</div><div class="mineaddress_moren">默认</div></div>' +
					'<div class="mineaddress_address">' + address.province + address.city + address.town + address.addressDetail + '</div>' +
					'</div>' +
					'<div class="mineaddress_right" data-id="' + address.id + '"><img src="img/address/btn_change.png"/></div>' +
					'</div>';
				$('.mineContent').append(mineCont);
				//默认地址显示出默认标签
				if(address.status == 1) {
					$('.mineaddress_moren').eq(i).show();
				}
				//确认订单更换地址后，选中按钮变化
				if(address.id == userId) {
					$('.mineaddress_left img').eq(i).attr('src', 'img/address/selected.png');
				}
			})
			//我的地址返回上一页
		$('.headerl').on('click', function() {
				history.back();
			})
			//我的地址选择后保存
		$('.headerr').on('click', function() {
				history.back();
			})
			//设为默认按钮点击切换
		$(".moren_img").on("click", function() {
				$(".moren_img>img").toggle();
			})
			//我的地址页，设为默认按钮变化
		$(".mineaddress_left").on("click", function() {
				$('.mineaddress_left').find('img').attr('src', 'img/address/normal.png');
				$(this).find('img').attr('src', 'img/address/selected.png');
				addressId = $(this).attr('data-id');
			})
			//地址管理页，设为默认按钮变化
		$('.caozuo_img').on('click', function() {
				$('.caozuo_img').find('img').attr('src', 'img/address/normal.png');
				$(this).find('img').attr('src', 'img/address/selected.png');
			})
			//地址管理点编辑按钮将ID过去
		$('.caozuo_middle').on('click', function() {
				var id = $(this).attr('data-id');
				window.location = 'address-add.html?number=' + id;
			})
			//地址管理页点击删除按钮
		$('.caozuo_right').on('click', function() {
				$(this).parents('.tiaomu').remove();
			})
			//我的地址页，点击编辑按钮
		$('.mineaddress_right').on('click', function() {
				var id = $(this).attr('data-id');
				window.location = 'address-add.html?number=' + id;
			})
			//地址管理点击添加地址
		$('.headerAdd').on('click', function() {
			window.location = "address-add.html";
		})
	})
})