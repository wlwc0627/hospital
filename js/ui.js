/*
* @Author: WANGLI
* @Date:   2018-12-12 22:09:51
* @Last Modified by:   WANGLI
* @Last Modified time: 2018-12-12 23:39:03
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

//页面的脚本逻辑
$(function(){
	$('.header_input').HeaderInput();
})
