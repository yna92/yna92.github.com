'use strict'
 
 //设置高度
;(function(){ 
	$('#box').height($(window).height());
	$('.box').height($(window).height()); 
	$("#ul1").height($('#ul1 .box').length * $('#ul1 .box').height());
	$(window).resize(function(){
		$('#box').height($(window).height());
		$('.box').height($(window).height());
	})
})();

fnWheel();
//滚轮滚动式
function changeNav(t){
	var index = -t/$(window).height();  
	$('#pos').css('background-color',$('#box'+index).css('background-color'));  
	doMove($('#pos')[0],'left',$('#navUl li').eq(index)[0].offsetLeft);
}
function changeMain(t){
	move($('#ul1')[0],{
		top:t
	},{
		easing:'ease-out',
		duration:1000,
		complete:function(){
			changeNav(t)
			bOk =  true;
		}
	}) 
}
//滚动滚轮
var bOk = true;
function fnWheel(){ 
 	addWheel(document,function(bDown){ 
 		if(bOk){
 			bOk = false;
 			if(bDown){ 
 				var t = $('#ul1').position().top - $('#ul1 .box').height(); 
 				if(t <= -($('#ul1').height() - $('#ul1 .box').height())){ 
 					t =  -($('#ul1').height() - $('#ul1 .box').height());
 				}
 				changeMain(t); 
 			}else{
 				var t = $('#ul1').position().top + $('#ul1 .box').height();  
 				if(t >= 0){ 
 					t =  0;
 				}
 				changeMain(t); 
 			} 
 		} 
 	})
 }
//  fnWheel();
//  $('#box0').css({background:'#ff6'});
//  $('#nav').show();
// $('#Introduce').show();
//开始加载动画
;(function(){
	setTimeout(function(){
		$('#logoBox img').animate({
			opacity:0
		},function(){
			$('#logoBox').animate({
				width:'2000px',
				height:'2000px',  
				left:-(2000- $(window).width())/2,
				top:-(2000- $(window).height())/2,
			},3000,function(){
				$('#logoBox').css({
					'left':0,
					'top':0,
					'border-radius':0,
					'width':$(window).width()+'px',
					'height':$(window).height()+'px',
					'margin-left':0,
					'margin-top':0 
				});   
				$('#box0').css({background:'#ff6'});
				$('#nav').show();
				$('#Introduce').show();
				$('#logoBox').animate({
					opacity:0
				},500,function(){ 
					$('#logoBox').remove(); 
				})
				//动画加载完成，加载滚轮事件
				fnWheel();
			})
		}); 
	},1);
})();
//导航菜单
;(function(){  
	var left=0;  
	$('#navUl li').length = $('#navUl li').length - 1;
	$('#navUl li').each(function(i,item){
		$(this).mouseover(function(){
			doMove($('#pos')[0],'left',this.offsetLeft);
		})
		$(this).mouseout(function(){
			var index = -$('#ul1').offset().top/$(window).height();  
			left = $('#navUl li').eq(index)[0].offsetLeft; 
			doMove($('#pos')[0],'left',left);
		})
		$(this).click(function(){
			left=this.offsetLeft;
			doMove($('#pos')[0],'left',left);
		})
	})
})();
//自我介绍左侧
;(function(){  
	$('#introLeft div').mouseover(function(){  
		move(this,{width:300},{easing:'ease-out',duration:1000})
	})
	$('#introLeft div').mouseout(function(){ 
		move(this,{width:100},{easing:'ease-out',duration:1000}) 
	})
})();