import React from 'react';
import { Route } from 'react-router-dom';

const EventShareStrip = (props) => (
    
    <div className="event__sharestrip__box">
        {
        //console.log(props)
    }
        <img className="events__seperator desktop" src="/images/eventspage/events-seperator.png" />
        <img className="events__seperator mobile" src="/images/eventspage/events-seperator-mobile.png" />
        <div className="events__eventshare__share desktop">
            <div className="events__eventshare__phone" />
            <div className="events__eventshare__mail" />
            <div className="events__eventshare__facebook" />
            <p className="events__eventshare__text Heebo-Regular" dir="rtl">אני חייב לשתף את זה!</p>
        </div>
        <div className="events__eventshare__nav">
            <div className="events__eventshare__button__box">
                <button 
                    type='button'
                    className="events__eventshare__button"
                    data-name="greenArrow"
                    onMouseEnter={props.setIconRatioOn}
                    onMouseLeave={props.setIconRatioOut}
                    onClick={props.navtoCategoryPage}
                >
                    <img className="events__eventshare__button__image__x" src="/images/eventspage/close.svg" />
                </button> 
            </div>
            <div hidden={props.currentItems.length<2} className="events__eventshare__button__box">
                <button 
                    type='button'
                    className="events__eventshare__button"
                    data-name="greenArrow"
                    onMouseEnter={props.setIconRatioOn}
                    onMouseLeave={props.setIconRatioOut}
                    onClick={props.gotoPrevEvent}
                >
                    <p className="events__eventshare__button__text Heebo-Regular desktop">לאירוע הקודם</p>
                    <img className="events__eventshare__button__image" src="/images/eventspage/arrowRight.svg" />
                </button> 
            </div>

            <div hidden={props.currentItems.length<2} className="events__eventshare__button__box">
                <button 
                    type='button'
                    className="events__eventshare__button"
                    data-name="greenArrow"
                    onMouseEnter={props.setIconRatioOn}
                    onMouseLeave={props.setIconRatioOut}
                    onClick={props.gotoNextEvent}
                >
                    <img className="events__eventshare__button__image" src="/images/eventspage/arrowLeft.svg" />
                    <p className="events__eventshare__button__text Heebo-Regular desktop">לאירוע הבא</p>
                    
                </button> 
            </div>
            
        </div>
        <img className="events__seperator desktop" src="/images/eventspage/events-seperator.png" />
        <img className="events__seperator mobile" src="/images/eventspage/events-seperator-mobile.png" />
    </div>
);

export default EventShareStrip;


//{props.eventText}