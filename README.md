Approach 
===

Approach.js is a jquery plugin for scrolling loading data.

#### 1. Usage
	
	$.Approach(document.body, function () {
		var context = this;
		context.disable();
		context.enable(); 
		context.checkForUpdate();
		context.destroy();	
	});

#### 2. Setting the default config

	$.Approach.DEFAULTS =  {
		threshold: 100,
		horizontal: true,
		throttleTime: 50
	});	

	


	
	
 
