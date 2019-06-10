$(function(){
	myAJAX();
	animateSwiper();
})
var _arr_1=[];//田间
var _arr_2=[];//施肥
var _arr_3=[];//用药
//swiper动画效果等
function animateSwiper(){
	console.log('加载',3)
		$('#loading').css({display:'none'})
		$('.ishow').css({display:'block'})
		
		var swiper = new Swiper('.swiper-container', {
			observer:true,//修改swiper自己或子元素时，自动初始化swiper
   			observeParents:true,//修改swiper的父元素时，自动初始化swiper
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        direction: 'vertical',
	        
	        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
			    swiperAnimateCache(swiper); //隐藏动画元素 
			    swiperAnimate(swiper); //初始化完成开始动画
//			    alert(swiper.activeIndex)
			}, 
			  onSlideChangeEnd: function(swiper){ 
			    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
			  	console.log(swiper.activeIndex)
			  	
			  	//console.log(swiper)
			  	//console.log($('.swiper-slide-active')[0].className.indexOf('first')==-1)
			  	if(swiper.activeIndex==0){
			  		$('#dy_img').addClass('dy_img animateTimeImg')
			  		$('#dy_name').addClass('dy_name animateTimeName')
			  		console.log($('.upload .ani').attr('swiper-animate-delay'))
//			  		$('.upload .ani').attr({
//			  			'swiper-animate-delay':($('.upload .ani').attr('swiper-animate-delay').split('s')[0]-2)+'s'
//			  		})
			  		$('#tree_img_father').addClass('tree-img-father tree-img-father-two')
			  	}else{
			  		//console.log($('.upload .ani').attr('swiper-animate-delay'))
			  		$('.first .ani').attr({
			  			'swiper-animate-delay':'5s'
			  		})
			  		$('#dy_img').removeClass('dy_img animateTimeImg')
			  		$('#dy_name').removeClass('dy_name animateTimeName')
			  		$('#tree_img_father').removeClass('tree-img-father')
			  	}
			  	if(swiper.activeIndex==2){
           			 thrHtml(_arr_1,'田间管理',true)
			  		$('.thr .administration-children-img').addClass('administrationAnimation')
			  	}else{
					$('.thr .administration-children-img').removeClass('administrationAnimation')			  	}
			  } ,
	//      effect: 'coverflow',//coverflow,cube
	//      grabCursor: true,
	//      slidesPerView: 1,
	//		centeredSlides: true,
	//      coverflow: {
	//          rotate: 30,//翻转角度
	//          stretch: 10,//翻转紧密度
	//          depth: 60,//翻转时的图片大小
	//          modifier: 2,
	//          slideShadows : true
	//      },
	//      cube: {
	//          shadow: true,
	//          slideShadows: true,
	//          shadowOffset: 20,
	//          shadowScale: 0.94
	//      },
	//      effect: 'flip',
	//      grabCursor: true,
	//      nextButton: '.swiper-button-next',
	//      prevButton: '.swiper-button-prev'
	
	    
	});
	    //console.log($('.swiper-slide').height())
//	    myAJAX();
}
function myAJAX() {
    getDataList(API_URL + 'importantGood/queryInfoByTranId', {
        tranId: tranId
    }, function(d) {
        if (d && d.state === 0) {
            //console.log('sssssssssssssss',d.aaData.zycpcx)
            //第一个页面
            firstHtml(d)
            //第三个页面
            for(var a=0;a<d.aaData.nw.length;a++){
            	if(d.aaData.nw[a].farm_type=='4'){
            		_arr_2.push(d.aaData.nw[a]);//施肥
            	}else if(d.aaData.nw[a].farm_type=='5'){
            		_arr_3.push(d.aaData.nw[a]);//用药
            	}else{
            		_arr_1.push(d.aaData.nw[a]);//田间
            	}
            }
            thrHtml(_arr_1,'田间管理',true)
            console.log('加载',1)
            
            
        }
    })
}
function firstHtml(d){
	//console.log('obj',obj)
	if(d.aaData.zycpcx[0]){
		var obj = d.aaData.zycpcx[0];
		$('#baseName').html(obj.baseName);
		$('#nodename').html(obj.nodeName);
		$('#inDate').html(obj.inDate.split(' ')[0]);
		$('#plantDate').html(obj.plantDate);
		$('#precipitation').html(obj.precipitation + '%');
		$('#goodsName').html(obj.goodsName);
	}
	if(d.aaData.quarantineinfo[0]){
		$('#pesticide').html(d.aaData.quarantineinfo[0].pesticide + '%');
	}
}
function thrHtml(data_arr,name,isAni){
	//可以用循环的。
	//console.log('obj',arr)
	console.log('加载',2)
	$('#headerTj').html(name)
	var arr=[];
	arr=data_arr.slice(0,3)
	console.log('123123',arr)
	for(var x=0;x<3;x++){
		$('#is_show_'+x).css({display:'none'})
		$('#is_show_'+x).attr({
			'swiper-animate-delay':'0s',
		})
//		animation-duration
	}
	if(name=='田间管理'&&isAni){
		var animated_ajax_='animated_ajax_'
	}else{
		animated_ajax_=''
	}
	if(arr&&arr.length>0){
		var strHtml=''
		for(var a=0;a<arr.length;a++){
			if(!arr[a].f_inputs_name){
				arr[a].f_inputs_name='无'
			}
			//字符串方法,其中的动画也可以动态生成style。就不用class，拼接麻烦
			if(a%2==0){
				var strHtml_list='<div  class="tj-message-1 ani '+animated_ajax_+a+' " swiper-animate-effect="bounceInLeft" swiper-animate-duration="1s" swiper-animate-delay="1s">'
					+'<div class="tj-message-1-1 ani ">'
						+'<div><span>'+arr[a].farm_type_name+'</span> <span>'+arr[a].f_indate.split(' ')[0]+'</span></div>'
						+'<p>'
							+'操作人：<span>'+arr[a].f_operator+'</span>；'
							+'投入品名称：<span >'+arr[a].f_inputs_name+'</span>；'
							+'用量：<span >'+arr[a].f_mu_usage+'</span>；'
							+'使用方式：<span >'+arr[a].f_usage_method+'</span>。'
						+'</p>'
					+'</div>'
					+'<img src=http://www.ytltzs.cn/'+arr[a].f_image_url+' class="tj-message-1-img ani" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s"  alt="" />'
					+'<div class="tj-message-1-radius ani" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s">'+(a+1)+'</div>'
				+'</div>'
			}else{
				var strHtml_list='<div  class="tj-message-1 ani '+animated_ajax_+a+'" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="1.2s">'
						+'<div swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s" class="tj-message-1-radius ani tj-message-right-radius">2</div>'
						+'<img src=http://www.ytltzs.cn/'+arr[a].f_image_url+' swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s" class="tj-message-1-img ani tj-message-right-img" alt="" />'
						+'<div swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.8s" class="tj-message-1-1 ani">'
							+'<div class="twoName"><span >'+arr[a].farm_type_name+'</span> <span >'+arr[a].f_indate.split(' ')[0]+'</span></div>'
							+'<p class="tj-message-right-p">'
								+'操作人：<span>'+arr[a].f_operator+'</span>；'
								+'投入品名称：<span >'+arr[a].f_inputs_name+'</span>；'
								+'用量：<span >'+arr[a].f_mu_usage+'</span>；'
								+'使用方式：<span >'+arr[a].f_usage_method+'</span>。'
							+'</p>'
						+'</div>'
					+'</div>'
			}
			strHtml=strHtml+strHtml_list
//			$('#is_show_'+a).css({display:'block'})
//			
//			//console.log(a,m)
//			$('#f_operator_'+a).html(arr[a].f_operator)
//			$('#f_indate_'+a).html(arr[a].f_indate.split(' ')[0])
//			$('#farm_type_name_'+a).html(arr[a].farm_type_name)
//			if(!arr[a].f_inputs_name){
//				$('#f_inputs_name_'+a).html('无')
//			}else{
//				$('#f_inputs_name_'+a).html(arr[a].f_inputs_name)
//			}
//	//		$('#f_inputs_manufactor_'+a).html(arr[a].f_inputs_manufactor)
//	//		$('#f_inputs_standard_'+a).html(arr[a].f_inputs_standard)
//			$('#f_mu_usage_'+a).html(arr[a].f_mu_usage)
//			$('#f_usage_method_'+a).html(arr[a].f_usage_method)
//			$('#tjImg_'+a).attr({src:'http://www.ytltzs.cn/'+arr[a].f_image_url})
	//		//console.log($('#tjImg_'+a).attr('src'))
		}
		$('#tj-message').html(strHtml)
	}
}
function thrBtn(t){
	//console.log($(t))
//	$('.tj-message-1').css({display:'none'})
	$(t).addClass('yy-color').siblings().removeClass('yy-color')
	var name=$(t).html();
	if(name=='田间管理'){
		thrHtml(_arr_1,name,false)
	}else if(name=='施肥管理'){
		thrHtml(_arr_2,name,false)
	}else if(name=='用药管理'){
		thrHtml(_arr_3,name,false)
	}
}
