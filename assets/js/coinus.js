/* 기본 - 메인스크립트 */
(function ($) {
  COIN_US = {

  	isMobile:false,
  	dataTop:0,
    mainHeight:0,

    init: function init() {
		this.layout();
		this.setting();
		this.reset();
		this.addevent();
    },
    layout: function layout() {
    	var _this = COIN_US;

        _this.$mainBanner = $('.section-major');
    	_this.$data = $('#our-data');
    	_this.$featureButton = $('.feature_tabs-link');
    	
        _this.$mobileMenuButton = $('.mobile-header__btn');

    },
    setting: function setting() {
    	var _this = COIN_US;
    	_this.mainHeight = _this.$mainBanner.outerHeight();
        _this.dataTop = _this.$data.length ? _this.$data.offset().top : undefined;
  
    },
    reset: function reset() {
 		var _this = COIN_US;
        		

    },
    addevent: function addevent() {

		var _this = COIN_US;
		_this.scrollInit();
        _this.resizeInit();

		_this.$featureButton.bind('click', COIN_US_FEATURES.clickFeature);		
        _this.$mobileMenuButton.bind('click', COIN_US_MOBILE.onMobileMenu);

        COIN_US_MOBILE.onPartnerAnimation();
        COIN_US_MOBILE.swiperInit();
	},
	onScroll: function onScroll(){
		var _this = COIN_US, scrollT = $(window).scrollTop()
		
		if (scrollT >= (_this.dataTop - (_this.mainHeight/2))) {
			COIN_US_DATA.dataOn();
		}


	},
    onResize: function onResize(){
        var _this = COIN_US
        _this.reset();
        COIN_US_FEATURES.resizeFeature();

        if ($(window).width() <= 1023) {
            _this.isMobile = true;
        }else{
            _this.isMobile = false;
        }
        
        if ($(window).width() >= 768) {
            TweenMax.set($('.header__actions'), {opacity:1, ease:Quart.easeOut});
        }
    },  
    scrollInit: function scrollInit(){
        var _this = COIN_US;
        $(window).on('scroll',function(){
            _this.onScroll();

        });
        $(window).trigger('scroll');
    },
    resizeInit: function resizeInit(){
        var _this = COIN_US;
        $(window).on('resize',function(){
            _this.onResize();
        });

        $(window).trigger('resize');
    }

    /* */


  };
  $(document).ready(function () {
    COIN_US.init();
  });
})(jQuery);


/* Data */
// 카운트 애니메이션
(function ($) {
  COIN_US_DATA = {
    dataOn:function dataOn() {
        var _this = COIN_US_DATA;
        var data = $('#our-data');
        if (!data.hasClass('active')) {
            data.addClass('active');
            _this.dataAnimation();
        }
    },
    dataAnimation: function dataAnimation() {
        var _this = COIN_US_DATA;

        var featureWalletTf = $('#status__wallet').find('.text');
        var featureTransactionTf = $('#status__transaction').find('.text');
        var featureDepositTf = $('#status__deposit').find('.text');
        var featureGlobalTf = $('#status__global').find('.text');

        _this.countAnimation(featureWalletTf, 0, 200, 3000);
        _this.countAnimation(featureTransactionTf, 0, 150, 3000);
        _this.countAnimation(featureDepositTf, 0, 300, 3000);
        _this.countAnimation(featureGlobalTf, 0, 205, 3000);

    },
    countAnimation:function countAnimation(obj, start, end, duration) {

        obj.jQuerySimpleCounter({
            start:  start,
            end:    end,
            duration: duration
        });

    }




  }
})(jQuery);

/* Features */
(function ($) {
  COIN_US_FEATURES = {
  	currentFeature:0,
    currentWidth:0,

    clickFeature: function clickFeature(e) {
    	e.preventDefault();

        var _this = COIN_US_FEATURES;

    	var feature = $('.feature_tabs');
    	var featureItem = $('.feature_tabs-item');

    	var clickFeature = $(this).parent().index();

        if (clickFeature == _this.currentFeature) return;

        _this.currentFeature = clickFeature;
	
    	featureItem.removeClass('feature_tabs-item--active');
    	feature.find('li').eq(clickFeature).addClass('feature_tabs-item--active');

    	var featureList = $('.feature__list');
    	var featureListItem = $('.feature__item');

    	featureListItem.removeClass('feature__item--active');
    	featureList.find('li').eq(clickFeature).addClass('feature__item--active');

        var featureImageList = $('.feature__obj-items');
        var targetX = featureImageList.width();

        TweenMax.set(featureImageList, {left:_this.currentWidth * clickFeature * -1, alpha:0, top:-10});
        TweenMax.to(featureImageList, 0.5, {alpha:1, top:0, ease:Quart.easeOut});
    },
    resizeFeature: function clickFeature() {
        
        var _this = COIN_US_FEATURES;

        var featureImage = $('.feature__obj-item');
        var featureImageList = $('.feature__obj-items');

        var targetX = featureImage.width();
        _this.currentWidth = targetX;

        TweenMax.set(featureImageList, {left:_this.currentWidth * _this.currentFeature * -1});
    }


  }
})(jQuery);


/*Simple Counter*/
(function($) {
    $.fn.jQuerySimpleCounter = function( options ) {
        let settings = $.extend({
            start:  0,
            end:    100,
            easing: 'swing',
            duration: 400,
            complete: ''
        }, options );

        const thisElement = $(this);

        $({count: settings.start}).animate({count: settings.end}, {
            duration: settings.duration,
            easing: settings.easing,
            step: function() {
                let mathCount = Math.ceil(this.count);
                thisElement.text(mathCount);
            },
            complete: settings.complete
        });
    };

}(jQuery));
