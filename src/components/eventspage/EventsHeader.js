import React from 'react';
import AutosizeInput from 'react-input-autosize';

const shouldHighLight = (org, update) => {
    //console.log('in highlight')
    if ( org === update ) {
        return 'events__header__input Heebo-Medium edit__bg';
    } else {
        return 'events__header__input Heebo-Medium edit__changed__bg';
    }
};

class EventsHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="events__header__box">
                { 
                    this.props.isAuthenticated === true ? 
                        <div className="backoffice__events__header__buttons">
                            <button className="backoffice__events__header__save__button" onClick={this.props.onUpdateCategory}>
                                <img className="backoffice__events__header__save__icon" src="/images/backoffice/save.svg" />
                            </button>
                        </div>
                    :
                        null
                }
                {
                    this.props.isAuthenticated === true ?
                        <AutosizeInput
                            className={shouldHighLight(this.props.categoryOrigin.name, this.props.categoryName)}
                            name="name"
                            data-name="name"
                            data-index={this.props.categoryId}
                            data-field='name'
                            data-action={this.props.action}
                            placeholder="שם קטגוריה"
                            value={this.props.categoryName}
                            onChange={this.props.onChange}
                            dir="rtl"
                        />
                    :
                        <h3 className="events__header Heebo-Medium">{this.props.categoryName}</h3>
                }
                <div className="common__intouch__seperator__box__desktop desktop">
                    <div className="common__intouch__seperator__desktop desktop"></div>
                </div>
                <img className="events__seperator mobile" src="/images/eventspage/events-seperator-mobile.png" />
            </div>
        );
    }
}

export default EventsHeader;