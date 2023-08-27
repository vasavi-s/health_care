document.addEventListener('DOMContentLoaded', function() {
    function isIE() {
        const ua = window.navigator.userAgent;
        const msie = ua.indexOf('MSIE ');
        const trident = ua.indexOf('Trident/');

        return (msie > 0 || trident > 0);
    }

    if (!isIE()) return;
    const cartSubmitInput = document.createElement('input');
    cartSubmitInput.setAttribute('name', 'checkout');
    cartSubmitInput.setAttribute('type', 'hidden');
    document.querySelector('#cart').appendChild(cartSubmitInput);
    document.querySelector('#checkout').addEventListener('click', function(event) {
        document.querySelector('#cart').submit();
    });
    });

class StickyHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.header = document.getElementById('shopify-section-header');
        this.headerBounds = {};
        this.currentScrollTop = 0;
        this.preventReveal = false;
        this.predictiveSearch = this.querySelector('predictive-search');

        this.onScrollHandler = this.onScroll.bind(this);
        this.hideHeaderOnScrollUp = () => this.preventReveal = true;

        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
        window.addEventListener('scroll', this.onScrollHandler, false);

        this.createObserver();
    }

    disconnectedCallback() {
        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
        window.removeEventListener('scroll', this.onScrollHandler);
    }

    createObserver() {
        let observer = new IntersectionObserver((entries, observer) => {
            this.headerBounds = entries[0].intersectionRect;
            observer.disconnect();
        });

        observer.observe(this.header);
    }

    onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (this.predictiveSearch && this.predictiveSearch.isOpen) return;

        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
            if (this.preventHide) return;
                requestAnimationFrame(this.hide.bind(this));
        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
            if (!this.preventReveal) {
                requestAnimationFrame(this.reveal.bind(this));
            } else {
                window.clearTimeout(this.isScrolling);

                this.isScrolling = setTimeout(() => {
                    this.preventReveal = false;
                }, 66);

                requestAnimationFrame(this.hide.bind(this));
            }
        } else if (scrollTop <= this.headerBounds.top) {
            requestAnimationFrame(this.reset.bind(this));
        }

        this.currentScrollTop = scrollTop;
    }

    hide() {
        this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
        this.closeMenuDisclosure();
        this.closeSearchModal();
    }

    reveal() {
        this.header.classList.add('shopify-section-header-sticky', 'animate');
        this.header.classList.remove('shopify-section-header-hidden');
    }

    reset() {
        this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-sticky', 'animate');
    }

    closeMenuDisclosure() {
        this.disclosures = this.disclosures || this.header.querySelectorAll('header-menu');
        this.disclosures.forEach(disclosure => disclosure.close());
    }		

    closeSearchModal() {
        this.searchModal = this.searchModal || this.header.querySelector('details-modal');
    }
}

customElements.define('sticky-header', StickyHeader);


$(document).ready(function(){
    $('img.icon-hamburger').click(function(){
        $(this).parent().addClass('open');
    $('.header-wrapper').find('.mobile-nav-wrapper').addClass('js-menu--is-open').css("transform","translateY(60px)");
    $('body').find('.content-for-layout').css("transform","translate3d(0px, 450px, 0px)");
    });
    $('.icon.icon-close').click(function(){
    $('.js-mobile-nav-toggle').removeClass('open');
    $('.header-wrapper').find('.mobile-nav-wrapper').removeClass('js-menu--is-open').css("transform","translateY(-100%)");
        $('body').find('.content-for-layout').css("transform","unset");
    });
    })