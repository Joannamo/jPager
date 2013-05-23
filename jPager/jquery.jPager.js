/*
author: Joanna
date: 2013.5.22
*/
;(function($){
	$.extend($.fn, {
		jPager: function(options){

			var options = $.extend({
				position: "after",            // after: 在内容的后面，before: 在内容的前面
				show_length: true,            // true: 显示共多少条信息, false: 不显示
				show_select: true,           // true: 显示下拉框选择条数, false: 不显示
				per_num: 10,                  // 每页显示的条数
				select: [10, 20, 50, 100],
				active_num: 1,                // 默认显示的页数
				children: "li"                // 要分页的元素
			}, options);

			
			return this.each(function(){
				var self = $(this),
					elem = $(options.children, self), // 每条信息
					html = "",
					page_html = '',
					children_len = elem.length,  
					page_num = Math.ceil(children_len/options.per_num),
					m = 0;

				self.children(".jPager_container", self).remove();

				// 是否显示选择页码
				if(options.show_select){
					html +='<div class="jPager_container"> \
								<div class="jPager_Select"> \
								<span>每页显示</span> \
								<select class="jPager_Select_element">';
					for (; m<options.select.length; m++){
						html += '<option value="'+options.select[m]+'">'+options.select[m]+'</option>';
					}
					html += '</select></div></div>';
				}else {
					html += '<div class="jPager_container"></div>';
				}

				// 分页是否是元素前显示，还是在元素后显示
				if(options.position=="before"){
					self.prepend(html);
				} else if (options.position=="after"){
					self.append(html);
				}

				$(".jPager_Select_element", self).change(function(){
					j_select = $(".jPager_Select_element", self).val();
					options.per_num = j_select;
					page_num = Math.ceil(children_len/j_select);
					renderPage();
				}).change();

				renderPage();

				// 页码
				function renderPage(){
					var i = 1;					
					if(page_num>1){																				
						page_html = '<ul class="jPager"><li cur_page="1" class="first"><a href="javascript:;">首页</a></li> \
								<li class="prev"><a href="javascript:;">上一页</a></li>';

						for (; i<=page_num; i++){
							page_html += '<li class="page_num" cur_page="'+i+'"><a href="javascript:;">'+i+'</a></li>';						
						}

						page_html += '<li class="next"><a href="javascript:;">下一页</a></li> \
								<li cur_page="'+page_num+'" class="last"><a href="javascript:;">尾页</a></li>';

						// 是否显示共多少条
						if(options.show_length){
							page_html += '<li><span>共'+children_len+'条</span></li></ul></div>';
						}else {
							page_html += '</ul></div>';
						}					

						$(".jPager", self).remove();
						if(options.show_select) {
							
							$(".jPager_container", self).append(page_html);
						}else {
							// 分页是否是元素前显示，还是在元素后显示
							if(options.position=="before"){
								self.prepend(page_html);
							} else if (options.position=="after"){
								self.append(page_html);
							}
						}

											
						var page_num_li = $(".jPager li.page_num"),
							first = $(".first", self),
							last = $(".last", self),
							prev = $(".prev", self),
							next = $(".next", self),
							j_select;					
						
						// 有页码的点击事件
						page_num_li.live("click", function(){
							var that = $(this),							
								cur_page = that.attr("cur_page");
								elem.hide();						

							page_num_li.removeClass("active");						
							that.addClass("active");

							if(cur_page==1){ // 首页
								// $(".jPager li[cur_page='1']").addClass("active");
								first.addClass("disabled");
								last.removeClass("disabled");
								prev.addClass("disabled");
								next.removeClass("disabled");

								first.attr("cur_page", "");
								last.attr("cur_page", page_num);
								prev.attr("cur_page", "");
								next.attr("cur_page", 2);

								elem.eq(options.per_num).prevAll(options.children).show();
							}else if(cur_page==page_num){ // 尾页
								// $(".jPager li[cur_page='"+page_num+"']").addClass("active");
								first.removeClass("disabled");
								last.addClass("disabled");
								prev.removeClass("disabled");
								next.addClass("disabled");

								first.attr("cur_page", 1);
								last.attr("cur_page", "");
								prev.attr("cur_page", page_num-1);
								next.attr("cur_page", "");

								elem.eq(options.per_num*(page_num-1)).nextAll(options.children).show();
							}else { // 中间页
								first.removeClass("disabled");
								last.removeClass("disabled");
								prev.removeClass("disabled");
								next.removeClass("disabled");

								first.attr("cur_page", 1);
								last.attr("cur_page", page_num);
								prev.attr("cur_page", parseInt(cur_page)-1);
								next.attr("cur_page", parseInt(cur_page)+1);

								var new_elem = elem.filter(function(index){
									return index>=(cur_page-1)*options.per_num &&index<cur_page*options.per_num;
								});

								new_elem.show();
							}
							return false;	
						});
						
						// 首页点击
						first.live("click", function(){
							var cur_page = first.attr("cur_page");

							if(cur_page!=""){
								page_num_li.eq(0).click();
							}						
						});

						// 尾页点击
						last.live("click", function(){
							var cur_page = last.attr("cur_page");

							if(cur_page!=""){
								page_num_li.eq(page_num-1).click();
							}						
						});

						// 上一页点击
						prev.live("click", function(){
							var that = $(this),
								cur_page = that.attr("cur_page");

							if(cur_page!=""){
								$(".jPager li.page_num[cur_page='"+cur_page+"']", self).click();
							}
						});

						// 下一页点击
						next.live("click", function(){
							var that = $(this),
								cur_page = that.attr("cur_page");

							if(cur_page!=""){
								$(".jPager li.page_num[cur_page='"+cur_page+"']", self).click();
							}
						});

						page_num_li.eq(options.active_num-1).click();
					}else {
						elem.show();
						$(".jPager", self).remove();
					}
				};
								
			});

			
		}
	});
})(jQuery);