import $ from 'jquery';

export const handlePageScroll = (pageupImageClassName, navigation, stateNavigationHomepageCarouselDone) => {
    if (typeof(window) !== "undefined") {
        const footerTop = document.getElementById('fake_pageupstrip').getBoundingClientRect().top;
        const pageupImageTop = document.getElementById('pageup__image').getBoundingClientRect().top;
        const pageupImageHeight = $('#pageup__image').height();
        const windowHeight = $(window).height();
        const windowScrollTop = $(window).scrollTop();
        if (navigation) {
            if (navigation.homepageCarouselDone !== stateNavigationHomepageCarouselDone) {
                return {
                    pageupImageClassName: 'pageup__image__absolute',
                    navigation: navigation
                };
            }
        }
        if (windowScrollTop >= (pageupImageHeight+10)*2-12 && pageupImageClassName !== 'pageup__image__fixed' && pageupImageClassName !== 'pageup__image') {
            return { pageupImageClassName: 'pageup__image__fixed' };
        } else if (windowScrollTop < (pageupImageHeight+10)*2-12 && pageupImageClassName === 'pageup__image__fixed') {
            return { pageupImageClassName: 'pageup__image__absolute' };
        } else if (footerTop < windowHeight - 12 && pageupImageClassName === 'pageup__image__fixed') {
            return { pageupImageClassName: 'pageup__image' };
        } else if (footerTop > windowHeight - 12 && pageupImageClassName === 'pageup__image') {
            return { pageupImageClassName: 'pageup__image__fixed' };
        }
    }
}