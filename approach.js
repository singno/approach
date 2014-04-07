/*
 * Jquery approach 1.0.2
 * https://github.com/singno/approach/
 *
 * Copyright 2014, singno
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 */
;(function (window, document, $) {
	'use script';

	function throttle (fn, ms) {
		var timer;
		ms = ms || 25;

		return function () {
			clearTimeout(timer);
			timer = setTimeout(fn, ms);
		};
	}

	function Approach (element, options) {
		this.$element = $(element);
		this.options = options;
		this.disabled =
		this.locked = false;
		this.$bind = this.isWindow() ? $(window) : this.$element;
		this.throttled = throttle($.proxy(this.update, this), this.options.throttleTime);

		this.$bind.on('scroll.approach resize.approach', this.throttled);
	}

	Approach.DEFAULTS = {
		threshold: 20,
		callback: $.noop,
		horizental: false,
		throttleTime: 25
	};

	Approach.prototype = {
		enable: function () {
			this.disabled =
			this.locked = false;
		},

		disable: function () {
			this.disabled = true;
		},

		destroy: function () {
			this.data('approach', null);
			this.$bind.off('.approach', this.throttled);	
		},

		update: function () {
			if (this.disabled) {
				return ;
			}

			var predicate = this.horizental ? this.nearRight : this.nearBottom;

			if (predicate.call(this)) {
				if (this.locked) {
					return ;
				}

				// Lock status thus callback will not fire continuous.
				this.locked = true;
				this.options.callback.call(this.$element[0], {
					options: $.extend({}, this.options)
				}); 
			} else {
				// Release lock when scroll out of `approach threshold`.
				this.locked = false;
			}
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

	var old = $.fn.approach;

	$.fn.approach = function (option) {
		option = typeof option === 'function' ? {
			callback: option
		} : option;

		this.each(function () {
			var $this = $(this),
				data = $this.data('approach');

			if (typeof option === 'string') {
				return $.each(data, function (idx, val) {
					val[option]();
				});
			}

			var options = $.extend({}, Approach.DEFAULTS, typeof option === 'object' && option),
				inst = new Approach(this, options);

			if (!data) {
				$this.data('approach', [inst]);
			} else {
				$this.data('approach', data.concat(inst));
			}

			inst.update();
		});

		return this;
	};

	$.fn.approach.Constructor = Approach;

	$.fn.approach.noConflict = function () {
		$.fn.approach = old;
		return this;
	};

})(window, document, jQuery);