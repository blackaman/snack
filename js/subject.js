$(document).ready(function() {
	//遍历专题列表的中JSON的所有数据
	var i = 0;
	$.getJSON('subject.json', function(result) {
			$.each(result, function(i, subject) {
				var content = '<div class="zhuanti" data-id="' + subject.id + '">' +
					'<img src="' + subject.img + '" class="zhuantitu"/>' +
					'<div class="like">' +
					'<img src="img/subject/btn_like@2x.png" class="aixin"/>' +
					'<div class="likemum">' + subject.zan + '</div>' +
					'</div>' +
					'<p class="name">' + subject.tittle + '</p>' +
					'</div>';
				$('.zhuantidiv').append(content);
			});
			//点击列表中的专题跳转到专题详情页
			$(".zhuanti").on("click", function() {
				var id = $(this).attr('data-id');
				window.location = "subject-detail.html?number=" + id;
			})
		})
		//url传参
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	//给传进来的参数赋值
	var subjectId = getUrlParam('number');
	$.getJSON('subject.json', function(result) {
			$.each(result, function(j, subjectDetail) {
				//遍历所有专题查找相同ID的专题详情页
				if(subjectId == j) {
					var subjectcontent = '<div class="brandimg">' +
						'<img src="' + subjectDetail.img + '"/>' +
						'<div class="brandhengtiao">' + subjectDetail.tittle + '</div>' +
						'</div>' +
						'<div class="miaoshudiv">' +
						'<div class="miaoshu">' + subjectDetail.miaoshu + '</div>' +
						'</div>';
					$('.subjectDetal').html(subjectcontent);
					//遍历该专题下的所有商品
					$.getJSON('subjectDetail.json', function(result) {
						$.each(result, function(n, goodsDetail) {
								//该专题下商品的总数量。
								var total = $('.goods').size() + 1;
								var subjectDetalcontent = '<div class="goods">' +
									'<div class="goodsxulie"><div class="goodsnumber">0' + total + '</div><span class="goodsname">' + goodsDetail.tittle + '</span></div>' +
									'<div class="goodscontent">' + goodsDetail.detai + '</div>' +
									'<div class="goodsimg"><img src="' + goodsDetail.longImg + '"/></div>' +
									'<div class="goodsjiage"><div class="xianjia">￥' + goodsDetail.price + '.00</div><div class="yuanjia">￥' + goodsDetail.oldprice + '.00</div><div class="goodsdetail_btn" data-id="' + goodsDetail.id + '">商品详情</div></div>' +
									'</div>';
								//判断商品是不是该专题ID里的
								if(subjectId == goodsDetail.subjectid) {
									$('.zhuantigoodsdiv').append(subjectDetalcontent);
								}
							})
							//点击商品详情页跳转
						$(".goodsdetail_btn").on("click", function() {
							var id = $(this).attr('data-id');
							window.location = "goods detail.html?number=" + id;
						})
					})
					var likenum = subjectDetail.zan;
					var sharenum = subjectDetail.fenxiang;
					var dilan = '<div class="caozuo_left"><img src="img/subject/btn_heart_foot_normal@2x.png" class="xihuan"/><div class="likenumber">' + likenum + '人喜欢</div></div>' +
						'<div class="caozuo_right"><img src="img/subject/btn_share_foot_pressed@2x.png" class="fenxiang"/><div class="sharenumber">' + sharenum + '次分享</div></div>';
					$('.caozuodiv').html(dilan);
					//点击喜欢按钮效果
					$('.caozuo_left').on("click", function() {
							likenum = parseInt(parseInt(likenum) + 1);
							var status = $(this).find('img').attr('src');
							//如果是未喜欢时点击，按钮高亮数量+1
							if(status.indexOf('btn_heart_foot_pressed@2x') == -1) {
								$('.caozuo_left img').attr('src', 'img/subject/btn_heart_foot_pressed@2x.png');
								$('.likenumber').text(likenum + '人喜欢');
							}
							//如果是已喜欢后点击，按钮高亮数量-1
							else {
								likenum = likenum - 2;
								$('.caozuo_left img').attr('src', 'img/subject/btn_heart_foot_normal@2x.png');
								$('.likenumber').text(likenum + '人喜欢');
							}
						})
						//点击分享按钮效果
					$('.caozuo_right').on("click", function() {
						sharenum = parseInt(parseInt(sharenum) + 1);
						var status = $(this).find('img').attr('src');
						//如果是未分享，点击分享按钮高亮且数量+1
						if(status.indexOf('btn_share_foot_normal@2x') == -1) {
							$('.caozuo_right img').attr('src', 'img/subject/btn_share_foot_normal@2x.png');
							$('.sharenumber').text(sharenum + '人分享');
						}
						//如果是未分享，点击分享按钮高亮且数量-1
						else {
							sharenum = sharenum - 2;
							$('.caozuo_right img').attr('src', 'img/subject/btn_share_foot_pressed@2x.png');
							$('.sharenumber').text(sharenum + '人分享');
						}
					})
				}
			});
		})
		//返回上一页
	$(".fanhuiimg").on("click", function() {
		history.back();
	})
})