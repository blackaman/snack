$(document).ready(function(){
	function getUrlParam(name){  
	    //构造一个含有目标参数的正则表达式对象  
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
	    //匹配目标参数  
	    var r = window.location.search.substr(1).match(reg);  
	    //返回参数值  
	    if (r!=null) return unescape(r[2]);  
	    return null;  
	} 
	//获取对应ID的商品内容
	var id = getUrlParam('number');
	$.getJSON('goodsData.json',function(result){
		$.each(result,function(i,goods){
			if(goods.id==id){
				var zhekou=goods.price*10/goods.oldprice;
				$('.goodsname').text(goods.tittle);
				$('.middle_jiage strong').text('￥'+goods.price+'.00');
				$('.middle_zhekou').text(zhekou.toFixed(1)+'折');
				$('.bottom_jiage_numeber').text('￥'+goods.oldprice+'.00');
				//判断是否是收藏商品，按钮需要高亮不
				if(goods.shoucang==1){
					$('.show').hide();
					$('.hide').show();
				}
				//该商品对应的口味信息
				var zifuchuan=goods.kouwei;
				var attry=[];
				attry=zifuchuan.split(',');
				var s=0;
				for(s;s<attry.length;s++){
					var kouwei='<li><div class="editInfor-optTaste-ul-sku">'+attry[s]+'</div></li>';
					$('.editInfor-optTaste-ul').append(kouwei);
				}
				//轮播图
				var mySwiper = new Swiper('.swiper-container', {
					direction: 'horizontal',
					loop: true,
					pagination: '.swiper-pagination',
					autoplay:3000,
					autoplayDisableOnInteraction : false
				})
			}
		})
		//切换收藏
		$(".shoucang").on("click",function(){
			$(".shoucang>img").toggle();
		})
		//跳转到购物车页面
		$(".gouwuchediv").on("click",function(){
			window.location="shop.html";
		})
		//点击查看更多评价，跳转到更多评价页
		$(".gengduodiv").on("click",function(){
			window.location="moreRated.html";
		})
		//点击加入购物车跳出选择SKU弹窗
		$('.jiarudiv').on('click',function(){
			$('.editInfor').show();
		})
		//关闭选择SKU弹窗
		$('.editInfor-cont-close').on('click',function(){
			$('.editInfor').hide();
		})
		//SKU选择更换口味
		$('.editInfor-optTaste-ul-sku').on('click',function(){
			$('.editInfor-optTaste-ul-sku').removeClass('xuanzhong');
			$(this).addClass('xuanzhong');
			var value=$(this).text();
			$('.editInfor-cont-taste').text(value);
		})
		//减少购买数量
		$('#editInfor-number-reduce').on('click',function(){
			var value=$('#editInfor-number-text').val();
			if(value<=1){
				$(this).attr('disabled','disabled');
			}
			else{
				$('#editInfor-number-text').val(parseInt(parseInt(value)-1));
			}
		})
		//增加购买数量
		$('#editInfor-number-add').on('click',function(){
			$('#editInfor-number-reduce').removeAttr('disabled');
			var value=$('#editInfor-number-text').val();
			$('#editInfor-number-text').val(parseInt(parseInt(value)+1));
		})
		//点击确认
		$('.editInfor-confirm').on('click',function(){
			$('.editInfor').hide();
		})
	})
})
