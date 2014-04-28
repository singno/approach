Approach 
===

Approach.js is a jquery plugin for scroll load data.

#### Example:

###### 1. invoke approach
	
	$(window).approach(function (param) {
		console.log(this); // window
		console.log(param.options);
		console.log(param.context); // approach instance
	}, {
		threshold: 20, // default is 20
		horizontal: false, // default is false
		throttleTime: 25 // default is 25
	});

###### 2. setting the default config

	$.extend($.fn.approach.Constructor.DEFAULTS, {
		threshold: 100,
		horizontal: true,
		throttleTime: 50
	});	
	
###### 3. noConflict

	// If the approach plugin is conflict with other jquery plugin, then use noConflict
	$.fn.otherName = $.fn.approach.noConflict();
	
#### options parameter

	1. threshold       Int         When scroll approach to the threshold distance, fire the callback. 
	2. horizontal      Boolean     Specify the scroll direction.
	4. throttleTime    Int         The throttle time of the callback function, use for improving performance.

#### methods：
###### .approach(callback, options)

*note: One callback one new approach instance, The same dom can add mutilple callbacks* 
	
	$(window).approach(function (param) {
		// Get the approach instance
		var context = param.context;
		 
		context
		.update()
		.disable()
		.enable()
		.destroy();
	}, {
		threshold: 50
	});

	
###### .approach('disable')

When set the approach to 'disable' status, all the callbacks binding on the dom  will not fire again until it been set to 'enable' status. 

	$(window).approach('disable');
	
###### .approach('enable')

Set the approach to 'enable' status. 

	$(window).approach('enable');
	
###### .approach('update')

Update the approach. When you set `$element.scrollTop` by javascript code instead of scrolling it, you need to update the approach by yourself.

	$(window).approach('update');
	
##### .approach('destroy')

Destroy the approach, then the element will be nothing to do with the approach.

	$(window).approach('destroy');
	
##### $.fn.approach.last 

Get the last approach instance.
		
	$(window).approach(function () {}); 
	var app = $.fn.approach.last; 
	app.destory();
	


	
	
 
