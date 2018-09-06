import React from 'react';
import TweenLite from 'gsap/TweenLite';

import scrollTo from 'gsap/ScrollToPlugin';

const pageToTop = () => {
    TweenLite.to(window, 0.7, {scrollTo:{y:0}});
}

const PageUpStrip = (props) => (
    <div className="pageup__box desktop">
        <div className="pageup__image__hover" />
        <div
            id="pageup__image"
            className={props.pageupImageClassName}
            style={props.pageupImageStyle}
            onClick={pageToTop}
        />
    </div>
);

export default PageUpStrip;