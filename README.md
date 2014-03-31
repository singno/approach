tscroll 
===

一个用于实现滚动加载的jQuery插件。

#### 用法示例:

##### 1. 使用data attributes

	<div id="scroll" data-threshold="50" data-block="true" data-horizontal="false" style="height:300px;" data-ontotalscroll="console.log('this');">
		<div style="1000px"></div>
	</div>
	
	// 当滚动条滚动到距离底部50px时，回调函数
	$('#scroll').tscroll(function () {
		// do something
	});
		
##### 2. 通过options传递
	
	$(window).tscroll({
		threshold: 50, // 默认是20
		horizontal: false, // 默认是false
		block: false, // 默认为true
		ontotalscroll: function () {
			// do something
		}
	});
	
##### 3. 加载完成后解除锁定状态
当block=true时，在触发一次事件（函数调用）后，后续滚动将不会再触发事件（进入disable状态），除非调用`$('#scroll').tscroll('enable')`解除锁定状态。

	$(window).tscroll(function () { 
		loadContents(); 
	});
	
	function loadContents () {
		// 5s 内的任何滚动都无法触发loadContents函数调用 
		setTimeout(function () {
			// 调用tscroll('enable')后，当再次滚动到元素底部时，可触发事件，事件触发后又进入锁定状态
			$(window).tscroll('enable');
		}, 5000);
	}
	
#### options
所有属性都能通过在dom节点上绑定`data-`属性传递，如`data-threshold`。

1. threshold       Int        设置距离底部阀值，默认20。
2. horizontal      Boolean    是否水平滚动，默认false。 
3. block           Boolean    是否在触发事件后锁定状态，默认true。
4. ontotalscroll   Function   滚动到底部时的回调函数

#### 方法：
##### .tscroll(options)
通过对象传递参数
	
	$(window).tscroll({
		threshold: 50,
		dir: 'vertical',
		block: true,
		ontotalscroll: function () {}
	});

##### .tscroll(fn)
只传递callback参数，其他参数用默认设置

	$(window).tscroll(function () {});
	
##### .tscroll('enable')
解除锁定状态，使之可以再次响应注册的ontotalscroll事件。

	$(window).tscroll('enable');
	

##### .tscroll('disable')
进入锁定状态，不再响应注册的ontaltalscroll事件。

	$(window).tscroll('enable');
	
##### .tscroll('update')
用于某些情况下改动了页面高度（宽度），却未触发scroll或resize事件时状态的更新。

	$(window).tscroll('update');
	
##### .tscroll('destroy')
使元素不再与tscroll相关联。

	$(window).tscroll('destroy');
	


	
	
 
