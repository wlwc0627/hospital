/*
* @Author: WANGLI
* @Date:   2018-12-12 22:09:51
* @Last Modified by:   WANGLI
* @Last Modified time: 2018-12-13 19:00:06
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

//页面的脚本逻辑
$(function(){
	$('.header_input').HeaderInput();
	$('.tab_content').UiTab('.tab_header>ul>li','div.tab_container');
	$('.tab_container').UiTab('.tab_city>ul>li','.more_info>.info');

	$('body').UiBackTop();
})
