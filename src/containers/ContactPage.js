import React from 'react';
import { connect } from 'react-redux';
import ContactForm from '../components/contactpage/ContactForm';
import ContactFollow from '../components/contactpage/ContactFollow';
import ContactContact from '../components/contactpage/ContactContact';
import CustomersStrip from '../components/common/CustomersStrip';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';
import { startSendMessage } from '../actions/messages';

export class ContactPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <Navigation />
                <div className="contactpage__structure">
                    <div className="contactpage__container">
                        <ContactForm
                            style='page'
                        />
                        <ContactContact
                            style='page'
                        />
                        <ContactFollow
                            style='page'
                        />
                    </div>
                </div>
                <CustomersStrip />
                <Footer />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startSendMessage: (message) => dispatch(startSendMessage(message))
});

export default connect(undefined, mapDispatchToProps)(ContactPage);