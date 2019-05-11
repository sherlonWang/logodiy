$.fn.RangeSlider = function(cfg){
	var userAgent = navigator.userAgent;
	var isWebkit = (userAgent.indexOf("AppleWebKit") >= 0);
	var isIE = isIE();
	
	function isIE() {
		var isIE = false;
		if (window.ActiveXObject || "ActiveXObject" in window) {
			isIE = true;
		} else {
			isIE = (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1
				&& !(userAgent.indexOf("Opera") > -1));
			isIE = false;
		}
		return isIE;
	}
	
	this.sliderCfg = {
		min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null, 
		max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
		step: cfg && Number(cfg.step) ? cfg.step : 1,
		callback: cfg && cfg.callback ? cfg.callback : null
	};

	var $input = $(this);
	var min = this.sliderCfg.min;
	var max = this.sliderCfg.max;
	var step = this.sliderCfg.step;
	var callback = this.sliderCfg.callback;

	$input.attr('min', min)
		.attr('max', max)
		.attr('step', step);

	var event = null;
	if (isIE) {
		event = "change";
	} else {
		event = "input";
	}
	
	$input.bind(event, function(e){
		$input.attr('value', this.value);
		
		if (isWebkit) {
			//$input.css( 'background', 'linear-gradient(to right, #059CFA, white ' + this.value + '%, white)' );
			$input.css( 'background-size', this.value + '% 100%' );
		}
		
		if ($.isFunction(callback)) {
			callback(this);
		}
	});
};