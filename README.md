approach 
===

approach.js is a jquery plugin for scroll load data.

#### Example:

###### 1. options is an object
	
	$(window).approach({
		threshold: 50, // default is 20
		horizontal: false, // default is false
		callback: function () {
			// do something
		},
		throttleTime: 50 // default is 25ms
	});
	
###### 2. options is a function
	
	// use default config
	$(window).approach(function () {
		// do something
	});

###### 3. setting the default config

	$.extend($.fn.approach.Constructor.DEFAULTS, {
		threshold: 100,
		horizontal: true
	});	
	
###### 4. noConflict

	// if the approach plugin is conflict with other jquery plugin, then use noConflict
	$.fn.otherName = $.fn.approach.noConflict();
	
#### options parameter

	1. threshold       Int         When scroll approacher to the threshold distance, fire the callback. 
	2. horizontal      Boolean     Specify the scroll direction.
	3. callback        Function    The callback function.
	4. throttleTime    Int         The throttle time of the callback function, use for improving performance.

#### methods：
###### .approach(options)

The parameter is a options object.
	
	$(window).approach({
		threshold: 50,
		callback: function () {}
	});

###### .approach(callback)

The parameter is a callback function.

	$(window).approach(function () {});
	
###### .approach('disable')

When set the approacher to 'disable' status, the callback function will not fire again util you set it to 'enable' status. 

	$(window).approach('disable');
	
###### .approach('enable')

Set the approacher to 'enable' status. 

	$(window).approach('enable');
	
###### .approach('update')

Update the approacher. When you set `$element.scrollTop` by javascript code instead of scrolling it, you need to update the approacher by yourself.

	$(window).approach('update');
	
##### .approach('destroy')

Destroy the approacher, then the element will be nothing to do with the approach.

	$(window).approach('destroy');
	


	
	
 
