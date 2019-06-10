'use strict';

$(function () {
    // 初始化第二页banner
    var swiper = new Swiper('.banner-container', {
        pagination: '.banner-pagination',
        paginationClickable: true
    });
    // 获取所有数据
    getAllDataList();
    // loading 百分数进度
    loading_num();
});
// loading 百分数进度
function loading_num() {
    var loading_num = 0;
    var timer = setInterval(function () {
        if (loading_num >= 100) {
            clearInterval(timer);
            loading_num = 100;
            setTimeout(function () {
                $('.loading').fadeOut(500);
            }, 1000);
        } else {
            loading_num++;
        }
        $('#loading_num').html(loading_num + '%');
    }, 20);
}
// 获取数据
function getAllDataList() {
    getDataList(API_URL + 'importantGood/queryInfoByTranId', {
        tranId: tranId
    }, function (d) {
        if (d && d.state === 0) {
            if(d.aaData.ncqh[0]){
            	// 气候数据
	            renderFarmClimate(d.aaData.ncqh[0]);
	            // 基地信息
	            renderBaseInfo(d.aaData.ncqh[0]);
            }
            if(d.aaData.ltxx&&d.aaData.ltxx.length>0){
            	// 销售记录
            	renderXsjlList(d.aaData.ltxx);
            }
            
        }
    });
}
// 渲染生长环境
function renderFarmClimate(data) {
    var view = $("#farmClimateView");
    var tpl = $("#farmClimateTpl").html();
    $('.climate-data').html(data.f_ave_temperature + '℃');
    laytpl(tpl).render(data, function (html) {
        view.html(html);
        var count = 0;
        var eles = $('.climate-type').children('div');
        var imgs = ['imgs/two_icon_wendu.png', 'imgs/two_icon_haiba.png', 'imgs/four_icon_jiangshui.png'];
        var texts = ['年平均温度', '海拔', '年平均降水量'];

        var datas = [data.f_ave_temperature + '℃', data.f_altitude + 'm', data.f_precipitation + 'ml'];
        setInterval(function () {
            count++;
            if (count >= eles.length) {
                count = 0;
            }
            // 选择样式
            eles.eq(count).addClass('active').siblings('').removeClass('active');
            // 图片
            $('.climate-img>img').attr('src', imgs[count]);
            // 数据
            $('.climate-data').html(datas[count]);
            // 文字
            $('#climate-text').html(texts[count]);
        }, 2500);
    });
}
// 渲染基地信息
function renderBaseInfo(data) {
	if(data.f_image_url){
		var imgsrc = IMG_URL + data.f_image_url;
	}else{
		//当上面的为空的时候，就默认这个为基地图片
		var imgsrc = 'imgs/img_moren.png';
	}
    
    $("#jdimg>img").attr('src', imgsrc);
    var view = $("#baseinfoView");
    var tpl = $("#baseinfoTpl").html();
    laytpl(tpl).render(data, function (html) {
        view.html(html);
    });
}
// 渲染第四页销售记录
function renderXsjlList(data) {
	var arr=['one','two','three','four','five','six','seven','eight','nine','ten',]
	var dataLength=data.length;
//  console.log(data)
    var view = $("#salerecordView");
    var tpl = $("#salerecordTpl").html();
    data.reverse();//颠倒
//	arr.reverse();
	arr=arr.slice(0,dataLength).reverse();
    var htmlStr='';
    var animateC=1;
    var animateT=1.4;
    var dateText=''
    for(var m=0;m<data.length;m++){
		var htmlStr_right='';
		var htmlStr_left='';
		if(m%2==0){
			dateText='采收时间：'
		}else{
			dateText='进场日期：'
		}
		if(m>=1){
	    	for(var n=1;n<2;n++){
	    		htmlStr_left='<li>'
		    		+'<span class="yellow_spot ani" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay='+animateC+'s></span>'
		    		+'<div class="text ani" swiper-animate-effect="bounceInLeft" swiper-animate-duration="1s" swiper-animate-delay='+animateT+'s>'
		    		+'<p>批次号</p>'
		    		+'<p class="span">'+data[m][arr[m]].batchId+'</p>'
		    		+'<p>交易凭证号</p>'
		    		+'<p class="span">'+data[m][arr[m]].transId+'</p>'
		    		+'</div>'
		    		+'</li>'
		    	animateC=animateC+0.8
	    		animateT=animateT+0.8
	    	}
	    }
    	htmlStr_right='<li>'
	    	+'<span class="yellow_spot ani" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay='+animateC+'s></span>'
	        +'<div class="text ani" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay='+animateT+'s>'
	        +'<p>'+data[m][arr[m]].salermarketName+'</p>'
	        +'<p>'+dateText+data[m][arr[m]].indate.split(' ')[0]+'</p>'
	        +'</div>'
	        +'</li>'
	    
	    animateC=animateC+0.8
	    animateT=animateT+0.8
    	htmlStr=htmlStr + htmlStr_left+htmlStr_right  ;
   }
    view.html(htmlStr);
    data[0][arr[0]].goodsName?$('#ltxxgoodsName').html(data[0][arr[0]].goodsName):$('#ltxxgoodsName').html('goodsName为空')
    var height = 6 / view.children().length;
    view.children().css({
        height: height + 'rem'
    });
    var styleStr='top:0;bottom:0;margin:auto;height:';
    for(var h=0;h<$('#salerecordView li .text').length;h++){
    	$('#salerecordView li .text')[h].style=styleStr+$('#salerecordView li .text')[h].offsetHeight+'px'
    }
    
//  laytpl(tpl).render(data[dataLength-1][arr[dataLength-1]], function (html) {
//      $('#ltxxgoodsName').html(data[1][arr[dataLength-1]].goodsName);
//      // 动态设置li的高度平均布局
//      view.html(html);
//      var height = 6 / view.children().length;
//      view.children().css({
//          height: height + 'rem'
//      });
//  });
}
//# sourceMappingURL=slide2.js.map