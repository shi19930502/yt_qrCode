$(function(){
		    var star = document.getElementsByClassName('starA');
		    var oDiv = document.getElementsByClassName('wrapper')[0];
		    var temp = 5;
		    
		    for(var i = 0, len = star.length; i < len; i++){
		        star[i].index = i;
		        
		        star[i].onmouseover = function(){
		            clear();
		            for(var j = 0; j < this.index + 1; j++){
		                star[j].style.backgroundPosition = '0 0';
		                star[j].style.backgroundSize = '100%';
		            }
		            console.log('onmouseover')
		        }
		        
		        star[i].onmouseout = function(){
		            for(var j = 0; j < this.index + 1; j++){
		                star[j].style.backgroundPosition = '0 -20px';
		                star[j].style.backgroundSize = '100%';
		            }
		            current(temp);
		        }
		        
		        star[i].onclick = function(){
		            temp = this.index + 1;
		            console.log('click')
//		            document.getElementsByClassName('star')[0].innerHTML = temp + ' 颗星';
		            current(temp);
		        }
		    }
		    $('#sendId').click(function(){
				console.log($('#textareaId').val(),temp)
				console.log(returnCitySN.cip)
				if($('#textareaId').val()){
					if($('#textareaId').val().length<=200){
						getDataList(API_URL + 'messageComment/create', {
							content:$('#textareaId').val(),
							starLevel:temp,
							ip:returnCitySN.cip,
						}, function (d) {
							console.log(d)
							if(d.msg='success'&&d.state==0){
								$('#textareaId').val('');
								clear()
				    			current(5)
					    		dialog('评论成功','imgs/success.png')
//				    			evaluateArr.unshift(d.aaData)
//				    			allEvaluateArr.unshift(d.aaData)
				    			$('#evaluateLookC').html('');
//				    			myEvaluate(evaluateArr)
				    			plAjax('',true);
							}
						})
					}else{
						dialog('最多只能输入200字!','imgs/jing.png')
					}
				}else{
					dialog('请输入评论!','imgs/jing.png')
				}
		    })
		    //清除所有
		    function clear(){
		        for(var i = 0, len = star.length; i < len; i++){
		            star[i].style.backgroundPosition = '0 -20px';
		        }
		    }
		    //显示当前第几颗星
		    function current(temp){
		        for(var i = 0; i < temp; i++){
		            star[i].style.backgroundPosition = '0 0';
		        }
		    }
		})
function dialog(content,imgUrl){
	$('#dialogId .dialogContent').html(content)
		$('#dialogId .dialogIcon').css({
			background:"url("+imgUrl+") no-repeat",
			backgroundSize: 'contain',
		})
	$('#dialogId').fadeIn(500);
	setTimeout(function(){
		$('#dialogId').fadeOut(500);
	},1500)
}