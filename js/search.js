$(document).ready(function() {
	$("#search").on("input", function() {
			$(".deleteimg").css("display", "block");
			var neirong = $("#search").val();
			//判断输入框有内容时显示删除图标按钮
			if(neirong == "") {
				$(".deleteimg").css("display", "none");
			} else {
				$(".deleteimg img").css("display", "block");
				$(".deleteimg img").attr("src", "img/btn_cancel_normal.png");
			}
			//点击删除按钮清空输入框，并消失
			$(".deleteimg").on("click", function() {
				$("#search").val("");
				$(".deleteimg img").attr("src", "img/btn_cancel_pressed.png");
				setTimeout(xiaoshi, 200)

				function xiaoshi() {
					$(".deleteimg").css("display", "none");
				}
			})
		})
		//返回上一页
	$(".dinglan_left").on("click", function() {
			window.history.back();
		})
		//点击清空历史记录，清空所有记录包括按钮。
	$(".qingkong").on("click", function() {
			var value = document.getElementById("search").value;
			$(".jilu").html("");
			$('.qingkong').hide();
		})
		//点击搜索追加历史记录
	$(".sousuofont").on("click", function() {
		var value = document.getElementById("search").value;
		var li = $("<li>" + value + "</li>");
		//统计共有多少条历史记录
		var allsize = $('.jilu li').size();
		var i = 0;
		var Flag = true;
		//将本次输入的值与历史的所有值进行对比，如果有重复内容将不添加到历史记录中
		for(i; i < allsize; i++) {
			var litext = $('.jilu li').eq(i).text();
			if(litext == value) {
				Flag = false;
				continue;
			}
		}
		if(Flag && value != "") {
			$(".jilu").append(li);
		}
		//如果有内容时，清空历史记录按钮要显示出来
		var content = $(".jilu").html();
		if(content !== "") {
			$('.qingkong').show();
		}
	})
})