$(document).ready(function(){
	var txt = '{"data":[' +
	'{"id":0,"user":"xie","passwords":"1","img":"img/address/7bfb277f9e2f0708cbd72662e824b899a801f2b4.jpg","name":"黑人"},' +
	'{"id":1,"user":"hei","passwords":"1","img":"img/address/60afd158ccbf6c811d03088dbd3eb13533fa4048.jpg","name":"路飞"},' +
	'{"id":2,"user":"ren","passwords":"1","img":"img/address/c53fb31bb051f8195a6d0528dbb44aed2e73e732.jpg","name":"卓洛"}]}';
	var obj = eval ("(" + txt + ")");
	
	function getUrlParam(name){  
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
    var r = window.location.search.substr(1).match(reg);  
    if (r!=null) return unescape(r[2]);  
    return null;  
	}
	//登录成功后加载对应用户的头像和昵称
	var id=getUrlParam('number');
	if(id!=null){
		var content='<div class="user">'+
		'<div id="touxiang"><img src="'+obj.data[id].img+'"/></div>'+
		'<div id="username">'+obj.data[id].name+'</div>'+
		'</div>';
		$('.user').html(content);
	}
	//登录
	$(".login").on("click",function(){
		window.location="login.html"
	})
	//注册
	$(".zhuce").on("click",function(){
		window.location="register.html"
	})	
	//状态订单
	$(".dingdan li").on("click",function(){
		var name=$(this).text();
		name=encodeURIComponent(encodeURIComponent(name));
		window.location="orderlist.html?status="+name;
	})	
	//商城订单
	$(".allorder").on("click",function(){
		var shuju="全部";
		shuju=encodeURIComponent(encodeURIComponent(shuju));
		window.location="orderlist.html?status="+shuju;
//		console.log(shuju);
	})	
	//淘宝订单
	$(".taobao").on("click",function(){
		window.location="https://www.taobao.com/";
	})
	//我的收藏
	$(".shoucang").on("click",function(){
		window.location="keep.html"
	})
	//客服
	$(".kefu").on("click",function(){
		$(".tanchuangbg").css({
			"display":"block",
			"opacity":"0.5",
		})
		$(".kftanchuang").css("display","block")
	})
	$(".tanchuangbg").on("click",function(){
		$(".tanchuangbg").hide();
		$(".kftanchuang").hide();
		$(".settanchuang").hide();
		$(".exittanchuang").hide();
	})
	$(".button_left").on("click",function(){
		alert("已复制好，可贴粘。");
	})
	//地址管理
	$(".address").on("click",function(){
		window.location="address-manage.html"
	})
	//设置
	$(".shezhi").on("click",function(){
		window.location="set.html"
	})
	//意见反馈
	$(".opinion").on("click",function(){
		window.location="opinion.html"
	})
	//清除缓存
	$(".qingchuhuancun").on("click",function(){
			$(".tanchuangbg").css({
			"display":"block",
			"opacity":"0.5",
		})
			$(".settanchuang").css("display","block")
	})
	$(".button_close").on("click",function(){
		$(".tanchuangbg").hide();
		$(".settanchuang").hide();
	})
	$(".button_Enter").on("click",function(){
		var huancun=document.getElementById("set_huancun")
		huancun.innerHTML="0M";
		$(".tanchuangbg").hide();
		$(".settanchuang").hide();
	})
	//更新版本
	$(".jianchagengxin").on("click",function(){
		$(".toast").css("display","block")
		$(".toast").fadeOut(2000)
	})
	//关于小喵
	$(".guanyuxiaomiao").on("click",function(){
		window.location="about.html"
	})
	$('.fanhuiimg').on("click",function(){
		history.back();
	})
	//退出登录
	$(".exitdiv").on("click",function(){
			$(".tanchuangbg").css({
			"display":"block",
			"opacity":"0.5",
		})
			$(".exittanchuang").css("display","block")
	})
	$(".button_guang").on("click",function(){
		$(".tanchuangbg").hide();
		$(".exittanchuang").hide();
	})
	$(".button_xiaci").on("click",function(){
		$(".tanchuangbg").hide();
		$(".exittanchuang").hide();
		$("#exit").hide();
	})
})
