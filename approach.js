/*
 * Jquery approach 1.1.0
 * https://github.com/singno/approach/
 *
 * Copyright 2014, singno
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 */
+(function (window, document, $) {
	'use script';

	function throttle (fn, ms) {
		var timer;
		ms = ms || 25;

		return function () {
			clearTimeout(timer);
			timer = setTimeout(fn, ms);
		};
	}

	function Approach (element, callback, options) {
		if (!(this instanceof Approach)) {
			return new Approach(element, callback, options);
		}

		options = $.extend({}, options, Approach.DEFAULTS);

		this.$element = $(element);
		this.callback = callback;
		this.options = options;
		this.disabled =
		this.locked = false;
		this.$bind = this.isWindow() ? $(window) : this.$element;
		this.throttled = throttle($.proxy(this.check, this), this.options.throttleTime);

		this.$bind.on('scroll.approach resize.approach', this.throttled);
		this.wrapper = {
			enable: $.proxy(this.enable, this),
			disable: $.proxy(this.disable, this),
			destroy: $.proxy(this.destroy, this),
			checkForUpdate: $.proxy(this.checkForUpdate, this)
		};

		return this.wrapper;
	}

	Approach.DEFAULTS = {
		threshold: 20,
		horizontal: false,
		throttleTime: 25
	};

	Approach.prototype = {
		enable: function () {
			this.disabled =
			this.locked = false;
			return this;
		},

		disable: function () {
			this.disabled = true;
			return this;
		},

		destroy: function () {
			this.$bind.off('.approach', this.throttled);	
			return this;
		},

		checkForUpdate: function () {
			this.locked = false;
			this.check();
			return this;
		},

		check: function () {
			if (this.disabled) {
				return this;
			}

			var predicate = this.options.horizontal ? this.nearRight : this.nearBottom;

			if (predicate.call(this)) {
				if (this.locked) {
					return this;
				}

				// Lock status thus callback will not fire continuous.
				this.locked = true;
				this.callback(this.wrapper); 
			} else {
				// Release lock when scroll out of `approach threshold`.
				this.locked = false;
			}

			return this;
		},

		isWindow: function () {
			var element = this.$element[0];
			var nodeName;

			// Treat window, document, document.documentElement and document.body as window.
			return $.isWindow(element) 
			|| element.nodeType === 9
			|| ((nodeName = element.nodeName.toLowerCase()) && (nodeName === 'html' || nodeName === 'body'));
		},

		nearBottom: function () {
			var top,
				viewport,
				height;

			if (this.isWindow()) {
				top = $(document).scrollTop();
				viewport = $(window).height();
				height = $(document).height();
			} else {
				top = this.$element.scrollTop();
				viewport = this.$element.innerHeight();
				height = this.$element[0].scrollHeight;
			}

			return top + (+this.options.threshold) + viewport >= height;
		},

		nearRight: function () {
			var left,
				viewport,
				width;

			if (this.isWindow()) {
				left = $(document).scrollLeft();
				viewport = $(window).width();
				width = $(document).width();
			} else {
				left = this.$element.scrollLeft();
				viewport = this.$element.innerWidth();
				width = this.$element[0].scrollWidth;
			}

			return left + (+this.options.threshold) + viewport >= width;
		}
	};

	$.Approach = Approach;
})(window, document, jQuery);