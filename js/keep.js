$(document).ready(function() {
	//定义个函数，判断是不是编辑状态。
	function changeGoods(can) {
		var status = can.find(".goodskuang").css('display');
		if(status != "none") {
			can.find('.goodskuang').hide();
			can.find('.slected').show();
			can.addClass('add');
		} else {
			can.find('.goodskuang').show();
			can.find('.slected').hide();
			can.removeClass('add');
		}
	}
	//获取我的收藏下的所有商品
	$.getJSON('goodsData.json', function(result) {
			$.each(result, function(i, goods) {
				var zhekou = parseFloat(parseInt(goods.price) * 10 / parseInt(goods.oldprice));
				var goodsCont = '<div class="kuangjiadiv" data-id="' + goods.id + '" youxiao="' + goods.youxiao + '">' +
					'<div class="kuangjia">' +
					'<img src="' + goods.img + '" class="salesimg"/>' +
					'<div class="salesfont">' + goods.tittle + '</div>' +
					'<div class="salesjiage"><span class="xianjiaa">￥' + goods.price + '.00</span><span class="yuanjiaa">￥' + goods.oldprice + '.00</span><span class="zhekou">' + zhekou.toFixed(1) + '折</span></div>' +
					'<div class="keepgoods_select"><img src="img/address/normal.png" class="goodskuang"/><img src="img/address/selected.png" class="slected"/></div>' +
					'</div>' +
					'</div>';
				//判断收藏商品目前的状态是否为有效。进行分类
				if(goods.shoucang == 1 && goods.youxiao == 1) {
					$('.keepcontent').append(goodsCont);
				}
				if(goods.shoucang == 1 && goods.youxiao == 0) {
					$('.keepcontent_wuxiao').append(goodsCont);
				}
			});
			//点击商品跳转商品详情页
			$(".kuangjiadiv").on("click", function() {
				var id = $(this).attr('data-id');
				var youxiao = $(this).attr('youxiao');
				var a = $(this);
				if(youxiao == 1) {
					var gouxuan = $('.keepgoods_select').css('display');
					//如果不是编辑模式点击商品进行跳转
					if(gouxuan != "block") {
						window.location = "goods detail.html?number=" + id;
					}
					//如果是编辑模式点击商品变成勾选状态
					else {
						changeGoods(a);
					}
				} else {
					changeGoods(a);
				}
			})
		})
		//获取我的收藏下的所有专题
	$.getJSON('subject.json', function(result) {
			$.each(result, function(j, subject) {
					var subjectCont = '<div class="zhuanti" data-id="' + subject.id + '">' +
						'<img src="' + subject.img + '" class="zhuantitu"/>' +
						'<div class="like">' +
						'<img src="img/subject/btn_like@2x.png" class="aixin"/>' +
						'<div class="likemum">' + subject.fenxiang + '</div>' +
						'</div>' +
						'<p class="name">' + subject.tittle + '</p>' +
						'<div class="keepsubject_select"><img src="img/address/normal.png"/></div>' +
						'</div>';
					if(subject.shoucang == 1) {
						$('.keepsubjectdiv').append(subjectCont);
					}
				})
				//点击专题进行跳转
			$('.zhuanti').on('click', function() {
				var id = $(this).attr('data-id');
				var kuang = $('.keepsubject_select').css('display');
				var normal = $(this).find('.keepsubject_select img').attr('src');
				//如果不是编辑模式点击专题进行跳转
				if(kuang != "block") {
					window.location = "subject-detail.html?number=" + id;
				}
				//如果是编辑模式点击专题进行勾选
				else {
					if(normal.indexOf('selected.png') == -1) {
						$(this).find('.keepsubject_select img').attr('src', 'img/address/selected.png');
						$(this).addClass('add');
					} else {
						$(this).find('.keepsubject_select img').attr('src', 'img/address/normal.png');
						$(this).removeClass('add');
					}
				}
			})
		})
		//点击专题tab按钮样式变化。显示相应内容
	$('.keepsubject').on('click', function() {
			var value = $(".keepheaderr").text();
			if(value != "取消") {
				$(this).addClass("keeptab");
				$(".keepgoods.keeptab").removeClass("keeptab");
				$('.keepCont').hide();
				$('.keepsubjectdiv').show();
			}
		})
		//点击商品tab按钮样式变化。显示相应内容
	$('.keepgoods.keeptab').on('click', function() {
			var value = $(".keepheaderr").text();
			if(value != "取消") {
				$(this).addClass("keeptab");
				$(".keepsubject").removeClass("keeptab");
				$('.keepsubjectdiv').hide();
				$('.keepCont').show();
			}
		})
		//点击编辑，进入编辑模式
	$(".keepheaderr").on("click", function() {
			var value = $(".keepheaderr").text();
			//取消编辑模式
			if(value == "编辑") {
				$(".keepsubject_select,.keep-delete,.keepgoods_select").show()
				$(".keepheaderr").text("取消")
			} else {
				$(".keepsubject_select,.keep-delete,.keepgoods_select").hide()
				$(".keepheaderr").text("编辑")
			}

		})
		//点击删除按钮，删除勾选的商品
	$('.keep-delete').on('click', function() {
			$('.kuangjiadiv').remove('.add');
			$('.zhuanti').remove('.add');
		})
		//返回上一页
	$('.keepheaderl').on("click", function() {
		history.back();
	})
	
	
	$('.obj').bind("touchmove",function(e){
		e.preventDefault();
		console.log(e)
		alert('ssss');
	})
	
	
	
})