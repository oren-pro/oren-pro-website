import React from 'react';
import AnimateHeight from 'react-animate-height';
import Textarea from 'react-expanding-textarea';
import $ from 'jquery';
import {getMobileRatio, getDesktopRatio} from '../../reusableFunctions/getRatio';

const shouldHighLight = (org, update) => {
    //console.log('in highlight')
    if ( org === update ) {
        return 'about__content__text Heebo-Regular edit__bg';
    } else {
        return 'about__content__text Heebo-Regular edit__changed__bg';
    }
};

export default class AboutContentStrip extends React.Component {
    
    state = {
        height: 5,
        minHeight: 5
    };

    toggle = () => {
        const { height, minHeight } = this.state;
        this.setState({
            height: height === minHeight ? 'auto' : minHeight,
        });
    };

    onHeightChange = (e) => {
        console.log('onHeightChange');
        let height = e.target.value * 17;
        let minHeight = e.target.value * 17;
        let windowWidth = 1960;
        if (typeof(window) !== "undefined") {
            windowWidth = $(window).width();
        }
        let ratio = 2.2;
        let lineHeight = 22;
        if (windowWidth < 768) {
            ratio = getMobileRatio(windowWidth).ratio;
            lineHeight = getMobileRatio(windowWidth).lineHeight;
            height = Math.round(e.target.value * ratio) * lineHeight;
            minHeight = Math.round(e.target.value * ratio) * lineHeight;
        } else {
            ratio = getDesktopRatio(windowWidth);
            height = e.target.value * ratio * (windowWidth/100);
            minHeight = e.target.value * ratio * (windowWidth/100);
        }
        this.setState({
            height,
            minHeight
        });
        this.props.setData(e);
    }
 

    componentDidMount = () => {
        let windowWidth = 1960;
        if (typeof(window) !== "undefined") {
            windowWidth = $(window).width();
        }
        let ratio = 2.2;
        let lineHeight = 22;
        if (windowWidth < 768) {
            ratio = getMobileRatio(windowWidth).ratio;
            lineHeight = getMobileRatio(windowWidth).lineHeight;
            console.log(ratio);
            console.log(lineHeight);
            this.setState({
                height: Math.round(this.props.aboutpage[this.props.index].linesShow * ratio) * lineHeight,
                minHeight: Math.round(this.props.aboutpage[this.props.index].linesShow * ratio) * lineHeight
            });
        } else {
            ratio = getDesktopRatio(windowWidth);
            this.setState({
                height: this.props.aboutpage[this.props.index].linesShow * ratio * (windowWidth/100),
                minHeight: this.props.aboutpage[this.props.index].linesShow * ratio * (windowWidth/100)
            });
        }
    }

    render() {
        const { height } = this.state;

        return (
        <div className="about__content__box" dir="rtl">
            <div className="about__content__header__box">
                { 
                    this.props.isAuthenticated === true ? 
                        <div className="about__content__header__in__box">
                            <Textarea
                                className="about__content__header Heebo-Medium"
                                dir="rtl"
                                data-field="header"
                                data-action='setString'
                                data-name={`item${this.props.index}`}
                                data-index={this.props.index}
                                placeholder="תוכן"
                                defaultValue={this.props.aboutpage[this.props.index].header}
                                onChange={ this.props.setData }
                            />
                            <img className="about__content__header__border" src="/images/aboutpage/about-content-header-border.svg" alt="קו הפרדה" />
                        </div>
                    :
                        <div className="about__content__header__in__box">
                            <h2 className="about__content__header Heebo-Medium" dir="rtl">{this.props.aboutpage[this.props.index].header}</h2>
                            <img className="about__content__header__border" src="/images/aboutpage/about-content-header-border.svg" alt="קו הפרדה" />
                        </div>
                }
                
                
            </div>

            <div className="about__content__text__box">
                <AnimateHeight
                    duration={ 500 }
                    height={ height }
                >
                    { 
                        this.props.isAuthenticated === true ? 
                            <Textarea
                                className={shouldHighLight(this.props.aboutpageOrigin[this.props.index].text, this.props.aboutpage[this.props.index].text)}
                                defaultValue={this.props.aboutpage[this.props.index].text}
                                data-field="text"
                                data-action='setString'
                                data-name={`item${this.props.index}`}
                                data-index={this.props.index}
                                placeholder="תוכן"
                                onChange={ this.props.setData }
                            />
                        :
                             <Textarea
                                className="about__content__text Heebo-Regular"
                                defaultValue={this.props.aboutpage[this.props.index].text}
                                readOnly
                            />
                    }
                </AnimateHeight>
                    
                <div className="about__content__button__box">
                {
                    this.props.aboutpage[this.props.index].grow === true && <button
                        className="about__content__button"
                        data-name="greenArrow"
                        onMouseEnter={this.props.setIconRatioOn}
                        onMouseLeave={this.props.setIconRatioOut}
                        onClick={ this.toggle }
                    >
                        <img className="about__content__button__image" src="/images/aboutpage/arrowBlack.svg" alt="קראו עוד" />
                    </button>
                }
                </div>

                {
                    this.props.item.footer !== '' && <p className="about__content__footer Heebo-Medium" dir="rtl">{this.props.item.footer}</p>
                }
            </div>

            { 
                this.props.isAuthenticated === true ? 
                    <input
                        id="number"
                        type="number"
                        defaultValue={this.props.aboutpage[this.props.index].linesShow}
                        data-field="linesShow"
                        data-action='setNumber'
                        data-name={`item${this.props.index}`}
                        data-index={this.props.index}
                        onChange={this.onHeightChange}
                    />
                :
                    null
            }
        </div>
        );
    }
}