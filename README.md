# calendar #

静态元素分页插件jPager


# jPager效果图 #

![jPager效果图](images/jPager.jpg)


# 使用方法 #

引用css, js

<code>
	<link rel="stylesheet" type="text/css" href="jPager/jPager.css">
	<script type="text/javascript" src="jPager/jquery-1.8.0.js"></script>
	<script type="text/javascript" src="jPager/jquery.jPager.js"></script>
</code>

<code>
	$("#infoContainer").jPager();

</code>


# 高级方法 #



<code>
	$("#infoContainer").jPager({
		position: "after",            // after: 在内容的后面，before: 在内容的前面
		show_length: true,            // true: 显示共多少条信息, false: 不显示
		show_select: true,            // true: 显示下拉框选择条数, false: 不显示
		per_num: 10,                  // 每页显示的条数， 如果show_select为false, 则根据per_num来显示条数
		select: [10, 20, 50, 100],    // 下拉框的条数
		active_num: 1,                // 默认显示的页数
		children: "li"                // 要分页的元素
	});
</code>
