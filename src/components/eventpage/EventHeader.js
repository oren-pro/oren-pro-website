import React from 'react';
import AnimateHeight from 'react-animate-height';
import AutosizeInput from 'react-input-autosize';
import Textarea from 'react-expanding-textarea';
import $ from 'jquery';
import {getMobileRatio, getDesktopRatio} from '../../reusableFunctions/getRatio';

const shouldHighLight = (org, update) => {
    if ( org === update ) {
        return 'edit__bg';
    } else {
        return 'edit__changed__bg';
    }
};

export default class EventHeader extends React.Component {
    
    state = {
        height: this.props.showLines * 18,
        minHeight: this.props.showLines * 18
    };

    toggle = () => {
        const { height, minHeight } = this.state;
        this.setState({
            height: height === minHeight ? 'auto' : minHeight,
        });
    };

    onHeightChange = (e) => {
        this.setHeight(e.target.value);
        this.props.onEventShowLinesChange(e);
    }

    setHeight = (showLines) => {
        const line = $('#eventsText').css('line-height').replace('px', '');
        this.setState({
            height: Math.round(showLines * line)-3,
            minHeight: Math.round(showLines* line)-3
        });
    }

    componentDidMount = () => {
        this.setHeight(this.props.showLines);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.props.showLines !== prevProps.showLines) {
            this.setHeight(this.props.showLines);
        }
    }

    render() {
        const { height } = this.state;
        return (
            <div className="event__header__box">
                { 
                    this.props.isAuthenticated === true ? 
                        <div className="backoffice__events__header__buttons">
                            <button className="backoffice__events__header__save__button" onClick={this.props.onUpdateEvent}>
                                <img className="backoffice__events__header__save__icon" src="/images/backoffice/save.svg" alt="שמירה" />
                            </button>
                        </div>
                    :
                        null
                }
                <div className="common__intouch__seperator__box__desktop desktop">
                    <div className="common__intouch__seperator__desktop desktop"></div>
                </div>
                <img className="events__seperator mobile" src="/images/eventspage/events-seperator-mobile.png" alt="קו הפרדה" />
                <div className="event__header__in__box">
                    <div className="event__header__in__in__box">
                        {
                            this.props.isAuthenticated === true ?
                                <div className={shouldHighLight(this.props.eventNameOrigin, this.props.eventName)}>
                                    <AutosizeInput
                                        className="event__header__input Heebo-Regular"
                                        name="name"
                                        data-name="name"
                                        data-index={this.props.categoryId}
                                        data-field='name'
                                        data-action={this.props.action}
                                        placeholder="שם קטגוריה"
                                        value={this.props.eventName}
                                        onChange={this.props.onEventNameChange}
                                        dir="rtl"
                                    />
                                </div>
                            :
                                <h2 className="event__header Heebo-Regular">{this.props.eventName}</h2>
                        }
                        
                        <div className="common__event__header__seperator__box__desktop">
                            <div className="common__event__header__seperator__desktop"></div>
                        </div>
                    </div>
                </div>
                <div className="event__text__box">
                    
                    <div className="events__text__flexbox" dir="rtl">
                        
                        <AnimateHeight
                        duration={ 500 }
                        height={ height }>
                            { 
                                this.props.isAuthenticated === true ? 
                                    <div className={shouldHighLight(this.props.eventTextOrigin, this.props.eventText)}>
                                        <Textarea
                                            id="eventsText"
                                            className="events__text Heebo-Regular"
                                            value={this.props.eventText}
                                            data-field="text"
                                            data-action='setString'
                                            data-name={`item${this.props.index}`}
                                            data-index={this.props.index}
                                            placeholder="תוכן"
                                            onChange={ this.props.onEventTextChange }
                                        />
                                    </div>

                                :
                                    <Textarea
                                        id="eventsText"
                                        className="events__text Heebo-Regular"
                                        value={this.props.eventText}
                                        readOnly
                                    />
                            }
                            
                        </AnimateHeight>

                    </div>
                    <div className="events__text__more__box">
                        <button 
                            type='button'
                            className="events__text__button"
                            data-name="greenArrow"
                            onMouseEnter={this.props.setIconRatioOn}
                            onMouseLeave={this.props.setIconRatioOut}
                            onClick={this.toggle}
                        >
                            <img className="events__text__more__button__image" src="/images/aboutpage/arrowBlack.svg" alt="קראו עוד" />
                            <p className="events__text__more__button__text Heebo-Regular">קראו עוד</p>
                            
                        </button> 

                    
                    </div>


                { 
                    this.props.isAuthenticated === true ?
                        <div className={`event__text__box__input ${shouldHighLight(this.props.showLinesOrigin, this.props.showLines)}`}>
                            <input
                                id="number"
                                type="number"
                                value={this.props.showLines}
                                data-field="linesShow"
                                data-action='setNumber'
                                data-name={`item${this.props.index}`}
                                data-index={this.props.index}
                                onChange={this.onHeightChange}
                            />
                        </div>
                    :
                        null
                }
                </div>
                <div className="common__intouch__seperator__box__desktop desktop">
                    <div className="common__intouch__seperator__desktop desktop"></div>
                </div>
                <img className="events__seperator mobile" src="/images/eventspage/events-seperator-mobile.png" alt="קו הפרדה" />
            </div>
        );
    }
}