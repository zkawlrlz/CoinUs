/* Mobile Event */
(function ($) {
  COIN_US_MOBILE = {

    currentPartnerX : 0,

    onMobileMenu:function onMobileMenu() {
        var $mobileHeader = $('.mobile-header');
        if ($mobileHeader.hasClass('mobile-header--visible')) {
            $mobileHeader.removeClass('mobile-header--visible');
            TweenMax.set($('.header__actions'), {opacity:0});
        }else{
            $mobileHeader.addClass('mobile-header--visible');

            TweenMax.to($('.header__actions'), 0.4, {opacity:1, ease:Quart.easeOut});
        }

    },
    onPartnerAnimation:function onPartnerAnimation() {

        setInterval(function() {
            COIN_US_MOBILE.update();
        }, 30);        
    },
    swiperInit: function swiperInit() {

        const swiper = new Swiper('.swiper-container', {
            speed: 400,
            spaceBetween: 100,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
        });
    },
    update:function update() {
        var _this = COIN_US_MOBILE;

        if (COIN_US.isMobile) {
            _this.currentPartnerX = _this.currentPartnerX - 2;

            if (_this.currentPartnerX == -868) {
                _this.currentPartnerX = 0;    
                TweenMax.set($('.partner__list-mobile .partner__list'), {left:_this.currentPartnerX});    
            }else{
                TweenMax.set($('.partner__list-mobile .partner__list'), {left:_this.currentPartnerX});    
            }
        }
        
    }
  }
})(jQuery);
