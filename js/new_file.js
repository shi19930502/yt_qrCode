$(function() {
	myAJAX();
	animateSwiper()
});
var _arr_1 = [];
var _arr_2 = [];
var _arr_3 = [];

function animateSwiper() {
	console.log("加载", 3);
	$("#loading").css({
		display: "none"
	});
	$(".ishow").css({
		display: "block"
	});
	var swiper = new Swiper(".swiper-container", {
		observer: true,
		observeParents: true,
		pagination: ".swiper-pagination",
		paginationClickable: true,
		direction: "vertical",
		onInit: function(swiper) {
			swiperAnimateCache(swiper);
			swiperAnimate(swiper)
		},
		onSlideChangeEnd: function(swiper) {
			swiperAnimate(swiper);
			if(swiper.activeIndex == 0) {
				$("#dy_img").addClass("dy_img animateTimeImg");
				$("#dy_name").addClass("dy_name animateTimeName");
				$(".upload .ani").attr({
					"swiper-animate-delay": ($(".upload .ani").attr("swiper-animate-delay").split("s")[0] - 2) + "s"
				})
			} else {
				$(".first .ani").attr({
					"swiper-animate-delay": "5s"
				});
				$("#dy_img").removeClass("dy_img animateTimeImg");
				$("#dy_name").removeClass("dy_name animateTimeName")
			}
			if(swiper.activeIndex == 2) {
				thrHtml(_arr_1, "田间管理", true);
				$(".thr .administration-children-img").addClass("administrationAnimation")
			} else {
				$(".thr .administration-children-img").removeClass("administrationAnimation")
			}
		},
	})
}

function myAJAX() {
	getDataList(API_URL + "importantGood/queryInfoByTranId", {
			tranId: tranId
		},
		function(d) {
			if(d && d.state === 0) {
				firstHtml(d);
				for(var a = 0; a < d.aaData.nw.length; a++) {
					if(d.aaData.nw[a].farm_type == "4") {
						_arr_2.push(d.aaData.nw[a])
					} else {
						if(d.aaData.nw[a].farm_type == "5") {
							_arr_3.push(d.aaData.nw[a])
						} else {
							_arr_1.push(d.aaData.nw[a])
						}
					}
				}
				thrHtml(_arr_1, "田间管理", true);
				console.log("加载", 1)
			}
		})
}

function firstHtml(d) {
	var obj = d.aaData.zycpcx[0];
	$("#baseName").html(obj.baseName);
	$("#nodename").html(obj.nodeName);
	$("#inDate").html(obj.inDate.split(" ")[0]);
	$("#plantDate").html(obj.plantDate);
	$("#precipitation").html(obj.precipitation + "%");
	$("#goodsName").html(obj.goodsName);
	$("#pesticide").html(d.aaData.quarantineinfo[0].pesticide + "%")
}

function thrHtml(data_arr, name, isAni) {
	console.log("加载", 2);
	$("#headerTj").html(name);
	var arr = [];
	arr = data_arr.slice(0, 3);
	console.log("123123", arr);
	for(var x = 0; x < 3; x++) {
		$("#is_show_" + x).css({
			display: "none"
		});
		$("#is_show_" + x).attr({
			"swiper-animate-delay": "0s",
		})
	}
	if(name == "田间管理" && isAni) {
		var animated_ajax_ = "animated_ajax_"
	} else {
		animated_ajax_ = ""
	}
	if(arr && arr.length > 0) {
		var strHtml = "";
		for(var a = 0; a < arr.length; a++) {
			if(!arr[a].f_inputs_name) {
				arr[a].f_inputs_name = "无"
			}
			if(a % 2 == 0) {
				var strHtml_list = '<div  class="tj-message-1 ani ' + animated_ajax_ + a + ' " swiper-animate-effect="bounceInLeft" swiper-animate-duration="1s" swiper-animate-delay="1s">' + '<div class="tj-message-1-1 ani ">' + "<div><span>" + arr[a].farm_type_name + "</span> <span>" + arr[a].f_indate.split(" ")[0] + "</span></div>" + "<p>" + "操作人：<span>" + arr[a].f_operator + "</span>；" + "投入品名称：<span >" + arr[a].f_inputs_name + "</span>；" + "用量：<span >" + arr[a].f_mu_usage + "</span>；" + "使用方式：<span >" + arr[a].f_usage_method + "</span>。" + "</p>" + "</div>" + "<img src=http://www.ytltzs.cn/" + arr[a].f_image_url + ' class="tj-message-1-img ani" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s"  alt="" />' + '<div class="tj-message-1-radius ani" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s">' + (a + 1) + "</div>" + "</div>"
			} else {
				var strHtml_list = '<div  class="tj-message-1 ani ' + animated_ajax_ + a + '" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="1.2s">' + '<div swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s" class="tj-message-1-radius ani tj-message-right-radius">2</div>' + "<img src=http://www.ytltzs.cn/" + arr[a].f_image_url + ' swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s" class="tj-message-1-img ani tj-message-right-img" alt="" />' + '<div swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s" class="tj-message-1-1 ani">' + '<div class="twoName"><span >' + arr[a].farm_type_name + "</span> <span >" + arr[a].f_indate.split(" ")[0] + "</span></div>" + '<p class="tj-message-right-p">' + "操作人：<span>" + arr[a].f_operator + "</span>；" + "投入品名称：<span >" + arr[a].f_inputs_name + "</span>；" + "用量：<span >" + arr[a].f_mu_usage + "</span>；" + "使用方式：<span >" + arr[a].f_usage_method + "</span>。" + "</p>" + "</div>" + "</div>"
			}
			strHtml = strHtml + strHtml_list
		}
		$("#tj-message").html(strHtml)
	}
}

function thrBtn(t) {
	$(t).addClass("yy-color").siblings().removeClass("yy-color");
	var name = $(t).html();
	if(name == "田间管理") {
		thrHtml(_arr_1, name, false)
	} else {
		if(name == "施肥管理") {
			thrHtml(_arr_2, name, false)
		} else {
			if(name == "用药管理") {
				thrHtml(_arr_3, name, false)
			}
		}
	}
};