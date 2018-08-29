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

                <div className="common__intouch__seperator__desktop desktop"></div>

                <img className="homepage__intouch__header desktop_inline" alt="הישארו מעודכנים" src="/images/homepage/intouch/intouch-header.svg" />
                <img className="homepage__intouch__header mobile" alt="הישארו מעודכנים" src="/images/homepage/intouch/intouch-header-mobile.svg" />
                <p className="homepage__intouch__text Heebo-Regular" dir="rtl">הירשמו לניוזלטר שלנו וקבלו עדכונים על הדברים הכי חמים שיש </p>
                <p className="homepage__intouch__text--privacy Heebo-Regular" dir="rtl">*הפרטיות שלכם חשובה לכן הדוא״ל לא יועבר לגורם שלישי</p>
                <HomePageIntouchForm
                    onSubmit={this.onSubmit}
                />

                <form action="https://api.viplus.com/gates/wsgate.asmx/RMembers_Import" method="post">
                <input type="email" name="email" id="email"  />
                <input type="text" name="firstname" id="given-name" />
                <br/>
                <input type="hidden" name="apikey" value="3f2f5b05-96cd-4f48-858c-67b302f2915a" />
                <input type="hidden" name="successredirect" value="http://www.google.com" />
                <input type="hidden" name="failedredirect" value="http://www.google.com" />
                <input type="hidden" name="viplists" id="viplists" value="0" />		
                <input type="hidden" name="exists" id="exists" value="merge" />
                <input type="hidden" name="restore" id="restore" value="restoreondeleted" />
                

            <button type="submit">Submit</button>
            </form>





                <div className="common__intouch__seperator__desktop desktop"></div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    subscribeToNewsletter: (subscriber) => dispatch(subscribeToNewsletter(subscriber))
});

export default connect(undefined, mapDispatchToProps)(HomePageIntouch);