/*
* @Author: WANGLI
* @Date:   2018-12-12 22:09:51
* @Last Modified by:   WANGLI
* @Last Modified time: 2018-12-14 01:37:38
*/

//header_input定义
$.fn.HeaderInput = function(){
	var ui = $(this);
	
	$('.hospital', ui).on('click', function(){
		$('.ui-search-select-list').show();
		return false;
	})

	$('.ui-search-select-list a', ui).on('click', function(){
		$('.hospital').text( $(this).text());
		$('.ui-search-select-list').hide();
		return false;
	})

	$('body').on('click', function(){
		$('.ui-search-select-list').hide();
		return false;
	})
}

//Tab组件切换区域
/*
	 @param {string} header  Tab组件的选项卡切换部分className，里面有若干个 .item
	 @param {string} content Tab组件的内容区域部分的classname，里面有若干个 .item
*/
$.fn.UiTab = function(header,content){
	var ui = $(this);
	var tabs = $(header,ui);
	var cons = $(content,ui);

	tabs.on('click',function(){
		var index = $(this).index();
		tabs.removeClass('active').eq(index).addClass('active');
		cons.hide().eq(index).show();
		return false;
	})

}

//回到顶部
$.fn.UiBackTop = function(){
	var ui = $(this);
	var el = $('<a class="back_top" href="#0"><i class="iconfont">&#xe603;</i></a>');
	ui.append( el );

	var windowHeight = 500;
	$(window).on('scroll',function(){
		var top = $(window).scrollTop();
		
		console.log(typeof(top));
		if(top > windowHeight){
			el.show();
		}else{
			el.hide();
		}
	})

	el.on('click', function(){
		$(window).scrollTop(0);
	})
}

//ui-slider
/*
	1.左右要能进行翻页
	2.进行左右翻页时，进度点要进行联动focus
	3.翻到第二页的时候，下一页需要回到第一页(首页)，翻到第一页的时候，上一页是第二页(尾页)
	4.进度点点击的时候，需要切换到对应的页面
	5.没有点击进度点(或翻页)的时候，需要进行自动滚动
	6.滚动过程中，屏蔽其他操作(翻页，点击进度点)
*/
$.fn.UiSlider  =function(){
	var ui = $(this);
	//获取图片的直接父元素
	var wrap = $('.slider-img-wrapper .item');

	//选中slider中的图片元素
	var items = $('.slider-img-wrapper .item',ui);

	//选中slider中的向左和向右箭头
	var btn_prev = $('.slider-arrow .left',ui);
	var btn_next = $('.slider-arrow .right',ui);

	//图片中的小圆点
	var tips = $('.slider-process ul .item',ui);

	//预定义
	var current = 0;
	var size = items.length;
	var width = items.eq(0).width();

	//设置自动滚动参数
	var autoPlay = true;

	ui
	.on('mouseover', function(){
		autoPlay = false;
	})
	.on('mouseout', function(){
		autoPlay = true;
	})

	//具体操作
	wrap
	.on('move_prev', function(){
		if(current <= 0){
			current = size;
		}
		current--;
		wrap.triggerHandler('move_to', current);
	})
	.on('move_next', function(){
		if(current >= (size-1)){
			current = -1;
		}
		current++;
		wrap.triggerHandler('move_to', current);
	})
	.on('move_to', function(evt, index){
		wrap.css('left', index*width*-1);
		tips.removeClass('focus').eq(index).addClass('focus');
	})
	.on('auto_move', function(){
		setInterval(function(){
			autoPlay && wrap.triggerHandler('move_next')
		}, 2000);
	})
	.triggerHandler('auto_move')

	//向左向右的点击事件
	btn_prev.on('click', function(){
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click', function(){
		wrap.triggerHandler('move_next');
	})

	//小圆点定义事件
	tips.on('click', function(){
		var index = $(this).index();
		wrap.triggerHandler('move_to', index);		
	});
}

//页面的脚本逻辑
$(function(){
	$('.header_input').HeaderInput();
	$('.tab_content').UiTab('.tab_header>ul>li','div.tab_container');
	$('.tab_container').UiTab('.tab_city>ul>li','.more_info>.info');

	$('body').UiBackTop();

	$('.slider').UiSlider();
})
