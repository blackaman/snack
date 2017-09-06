$(document).ready(function() {
	var txt = '{"data":[' +
		'{"id":0,"user":"xie","passwords":"1","img":"img/address/7bfb277f9e2f0708cbd72662e824b899a801f2b4.jpg","name":"黑人"},' +
		'{"id":1,"user":"hei","passwords":"1","img":"img/address/60afd158ccbf6c811d03088dbd3eb13533fa4048.jpg","name":"路飞"},' +
		'{"id":2,"user":"ren","passwords":"1","img":"img/address/c53fb31bb051f8195a6d0528dbb44aed2e73e732.jpg","name":"卓洛"}]}';
	var obj = eval("(" + txt + ")");
	$("#dl").on('click', function() {
			var inputuser = $('#inputzhanghao').val();
			var inputmima = $('#inputmima').val();
			var Flag = true;
			var i;
			//遍历所有的数据
			for(i in obj.data) {
				var a = obj.data[i].user;
				var b = obj.data[i].passwords;
				var id = obj.data[i].id;
				//如果输入的值与JSON中的数据匹配，数据存在时进行后续判断
				if(a == inputuser) {
					Flag = false;
					if(inputmima == "") {
						alert('密码不能为空');
					} else if(b !== inputmima) {
						alert('密码错误');
					} else if(b == inputmima) {
						window.location = 'mine.html?number=' + id;
						alert('登陆成功');
					}
				}
			}
			//如果输入的用户名不存在JSON中
			if(Flag) {
				alert("账号不存在");
			}
		})
		//忘记密码
	$(".dl_right").on("click", function() {
			window.location = "resetpassword.html"
		})
		//快速注册
	$(".dl_left").on("click", function() {
			window.location = "register.html"
		})
		//登录页账号输入框
	$("#inputzhanghao").on("input", function() {
			var neirong = $("#inputzhanghao").val();
			//如果用户输入框输入的内容为空时，删除按钮不显示
			if(neirong == "") {
				$(".top_clear").css("display", "none");
			}
			//如果用户输入框输入的内容不为空时，删除按钮显示
			else {
				$(".top_clear").css("display", "block");
				$(".top_clear img").attr("src", "img/btn_cancel_normal.png")
			}
			//点击删除按钮清空输入框的数据
			$(".top_clear").on("click", function() {
				$("#inputzhanghao").val("");
				$(".top_clear img").attr("src", "img/btn_cancel_pressed.png")
					//点击后按钮延迟200毫秒消失
				setTimeout(xiaoshi, 200)

				function xiaoshi() {
					$(".top_clear").css("display", "none");
				}
			})
		})
		//登录页密码输入框（同上）
	$("#inputmima").on("input", function() {
			var neirong = $("#inputmima").val();
			if(neirong == "") {
				$(".top_clear1").css("display", "none");
			} else {
				$(".top_clear1").css("display", "block");
				$(".top_clear1 img").attr("src", "img/btn_cancel_normal.png")
			}
			$(".top_clear1").on("click", function() {
				$("#inputmima").val("");
				$(".top_clear1 img").attr("src", "img/btn_cancel_pressed.png")
				setTimeout(xiaoshi, 200)

				function xiaoshi() {
					$(".top_clear1").css("display", "none");
				}
			})
		})
		//登录页点击可视按钮，密码框的文字明文，暗文互相切换
	$(".keshi").on("click", function() {
			$(".keshi>img").toggle();
			var type = $("#inputmima").attr("type");
			if(type == "text") {
				$("#inputmima").attr("type", "password");
			} else {
				$("#inputmima").attr("type", "text");
			}
		})
		//注册页点击可视按钮，密码框的文字明文，暗文互相切换
	$(".reset_ricon").on("click", function() {
			$(".reset_ricon>img").toggle();
			var type = $("#reset_mima").attr("type");
			if(type == "text") {
				$("#reset_mima").attr("type", "password");
			} else {
				$("#reset_mima").attr("type", "text");
			}
		})
		//点击获取验证码按钮，最初值定义60S
	var bianliang = true;
	var btn = $(".button_get");
	var wait = 60;
	$(".button_get").on("click", function() {
			//如果wait=60秒开始执行该if语句
			if(bianliang) {
				function settime() {
					//如果倒计时结束，自动wait变成60秒。点击重新计时
					if(wait == 0) {
						bianliang = true;
						btn.css({
							"border-color": "#FF2D4B",
							"background-color": "#FFFFFF",
							"color": "#FF2D4B",
						})
						btn.text("获取验证码");
						wait = 60;
						clearInterval(a);
					}
					//倒计时未结束，时间没秒减1
					else {
						bianliang = false;
						btn.css({
							"border-color": "#808080",
							"background-color": "#808080",
							"color": "#FFFFFF",
						})
						btn.text(wait + "S重新获取");
						wait--;
					}
				}
				settime();
				//将setInterval赋值给一个变量，要停止的时候，只需要使用clearInterval(变量）
				var a = setInterval(settime, 1000);
			}

		})
		//左上角返回上一页
	$('.fanhuiimg').on('click', function() {
		history.back();
	})
})