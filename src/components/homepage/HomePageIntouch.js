import React from 'react';
import { connect } from 'react-redux';
import HomePageIntouchForm from './HomePageIntouchForm';
import { subscribeToNewsletter } from '../../actions/newsletter';


export class HomePageIntouch extends React.Component {
    onSubmit = (subscriber) => {
        this.props.subscribeToNewsletter(subscriber);
        //this.props.history.push('/');
    };
    render() {
        return (
            <div className="homepage__intouch__box">
                <div style={{width: '100%'}}>
                <img className="desktop" style={{width: '100%'}} src="/images/homepage/intouch/intouch-border.png" />
                </div>
                <img className="homepage__intouch__header desktop_inline" alt="הישארו מעודכנים" src="/images/homepage/intouch/intouch-header.svg" />
                <img className="homepage__intouch__header mobile" alt="הישארו מעודכנים" src="/images/homepage/intouch/intouch-header-mobile.svg" />
                <p className="homepage__intouch__text Heebo-Regular" dir="rtl">הירשמו לניוזלטר שלנו וקבלו עדכונים על הדברים הכי חמים שיש </p>
                <p className="homepage__intouch__text--privacy Heebo-Regular" dir="rtl">*הפרטיות שלכם חשובה לכן הדוא״ל לא יועבר לגורם שלישי</p>
                <HomePageIntouchForm
                    onSubmit={this.onSubmit}
                />
                <img className="homepage__intouch__border desktop" src="/images/homepage/intouch/intouch-border.png" />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    subscribeToNewsletter: (subscriber) => dispatch(subscribeToNewsletter(subscriber))
});

export default connect(undefined, mapDispatchToProps)(HomePageIntouch);