import React from 'react';
import { Route } from 'react-router-dom';
import AutosizeInput from 'react-input-autosize';
import IconHoverGrow from '../common/IconHoverGrow';

const shouldHighLight = (org, update) => {
    if ( org === update ) {
        return 'edit__bg';
    } else {
        return 'edit__changed__bg';
    }
};

const HomePageEventsItem = (props) => (
    <div className="homepage__event-item-box align-text-center inline-block">
        {
            props.isAuthenticated === true ?
                <div className="homepage__event-item-box--in">
                    <div className="homepage__event-item__header">
                        
                        <AutosizeInput
                            type="text"
                            data-name={props.name}
                            data-index={props.index}
                            data-field='eventHeader'
                            data-action={props.action}
                            placeholder="כותרת אירוע"
                            value={props.event.eventHeader}
                            onChange={props.onChange}
                        />
                    </div>
                    <div className="homepage__event-item__text Heebo-Regular" dir="rtl">
                        <div className={shouldHighLight(props.homepageOrigin.events[props.index].eventText, props.homepage.events[props.index].eventText)}>
                            <textarea
                                data-name={props.name}
                                data-index={props.index}
                                data-field='eventText'
                                data-action={props.action}
                                placeholder="טקסט אירוע"
                                value={props.homepage.events[props.index].eventText}
                                onChange={props.onChange}
                            />
                        </div>
                    </div>
                    <button
                        data-name={props.name}
                        data-index={props.index}
                        data-field='eventImage'
                        data-action={props.action}
                        className="homepage__event-item__upload-button"
                    >
                        <img
                            data-name={props.name}
                            data-index={props.index}
                            data-field='eventImage'
                            data-action={props.action}
                            data-publicid={props.event.publicId}
                            onClick={props.uploadWidget}
                            className="homepage__event-item__upload-button__image"
                            src="/images/common/upload-image.svg"
                        />
                    </button>
                    <img className="homepage__event-item__image" src={props.event.eventImage} />
                    <div className="homepage__event-item__more">
                        <Route render={({ history}) => (
                            <button 
                                type='button'
                                className="homepage__event-item__button"
                                data-name="greenArrow"
                                onMouseEnter={props.setIconRatioOn}
                                onMouseLeave={props.setIconRatioOut}
                                onClick={() => { history.push(props.homepage.events[props.index].eventLink) }}
                            >
                                <p className="homepage__event-item__button__text Heebo-Regular">גלו עוד</p>
                                <img className="homepage__event-item__button__image" src="/images/homepage/events/arrowGreen.svg" />
                            </button> 
                        )} />
                    </div>
                    <input
                        type="text"
                        data-name={props.name}
                        data-index={props.index}
                        data-field='eventLink'
                        data-action={props.action}
                        placeholder="קישור לדף אירוע"
                        value={props.homepage.events[props.index].eventLink}
                        onChange={props.onChange}
                    />
                </div>
            :
                <div className="homepage__event-item__box__in">
                    <div className="homepage__event-item__header">
                        <h3 className="Heebo-Medium homepage__event-item__header-text">{props.event.eventHeader}</h3>
                    </div>
                    <div className="homepage__event-item__text Heebo-Regular" dir="rtl">
                        <textarea
                            readOnly
                            value={props.homepage.events[props.index].eventText}
                        />
                    </div>
                    <img className="homepage__event-item__image" src={props.event.eventImage} />
                    <div className="homepage__event-item__more">
                        <Route render={({ history }) => (
                            <button 
                                type='button'
                                className="homepage__event-item__button"
                                data-name="greenArrow"
                                onMouseEnter={props.setIconRatioOn}
                                onMouseLeave={props.setIconRatioOut}
                                onClick={() => { history.push(props.homepage.events[props.index].eventLink) }}
                            >
                                <p className="homepage__event-item__button__text Heebo-Regular">גלו עוד</p>
                                <img className="homepage__event-item__button__image" src="/images/homepage/events/arrowGreen.svg" />
                            </button> 
                        )} />
                    </div>
                </div>
        }
    </div>
        
);

export default HomePageEventsItem;