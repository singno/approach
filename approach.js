;(function (window, document, $) {
	'use script';

	function Approach (element, options) {
		this.$element = $(element);
		this.options = options;
		this.disabled = false;

		var timer,
			callback = $.proxy(this.update, this);

		this.triggerCallback = function () {
			clearTimeout(timer);
			timer = setTimeout(callback, 25); // 25ms节流时间
		};

		(this.isWindow() ? $(window) : this.$element).on('scroll.approach resize.approach', this.triggerCallback);
	}

	Approach.DEFAULTS = {
		threshold: 20,
		callback: $.noop,
		horizental: false
	};

	Approach.prototype = {
		enable: function () {
			this.disabled = false;
		},

		disable: function () {
			this.disabled = true;
		},

		destroy: function () {
			this.$element
			.data('approach', null)
			.off('.approach', this.triggerCallback);	
		},

		update: function () {
			var fn = this.options.callback,
				predicate = this.horizental ? this.nearRight : this.nearBottom;

			if (predicate.call(this)) {
				if (this.disabled) {
					return ;
				}

				this.disable();

				if (typeof fn === 'string') {
					fn = new Function(fn);
				} 
				fn.call(this.$element[0], {
					options: $.extend({}, this.options)
				}); 
			} else {
				this.enable();
			}
		},

		isWindow: function () {
			var element = this.$element[0];
			var nodeName;

			return $.isWindow(element) 
			|| element.nodeType === 9
			|| ((nodeName = element.nodeName.toLowerCase()) && (nodeName === 'html' || nodeName === 'body'));
		},

		inEdge: function () {
			return this.nearBottom() || this.nearRight();	
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
				data = $this.data('approach'),
				options = $.extend({}, Approach.DEFAULTS, $this.data(), typeof option === 'object' && option);

			if (!data) {
				$this.data('approach', data = [new Approach(this, options)]);
			} else {
				$this.data('approach', data = data.concat(new Approach(this, options)));
			}

			$.each(data, function (idx, val) {
				if (typeof option === 'string') {
					val[option]();
				} else {
					val.update();
				}
			});
		});

		return this;
	};

	$.fn.approach.noConflict = function () {
		$.fn.approach = old;
		return this;
	};

})(window, document, jQuery);