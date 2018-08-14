import React from 'react';
import Modal from 'react-responsive-modal';


export default class HomePageIntouchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            error: '',
            mailSentModalIsOpen: false
        }
    }
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };
    onToggleMailSentModal = () => {
        console.log('toggle');
        this.setState({
            mailSentModalIsOpen: !this.state.mailSentModalIsOpen
        });
        console.log(this.state.mailSentModalIsOpen);
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.name || !this.state.email) {
            //set error state to 'Please provide description and amount'
            this.setState(() => ({ error: 'נא למלא שם ודוא״ל' }));
        } else {
            //cleare error message
            this.setState(() => ({ error: '' }));
            //console.log('submitted');
            this.props.onSubmit({
                name: this.state.name,
                email: this.state.email
            });
        }
        this.onToggleMailSentModal();
    };
    render() {
        return (
            <div>
                <Modal
                    open={this.state.mailSentModalIsOpen}
                    onClose={this.onToggleMailSentModal}
                    center
                    classNames={{
                        overlay: 'custom-overlay',
                        modal: 'contact__modal__container',
                        closeButton: 'contact__modal__close__button'                     
                    }}
                >
                    <div className="events__eventshare__button__box">
                        <button 
                            type='button'
                            className="events__eventshare__button"
                            data-name="greenArrow"
                            onClick={this.onToggleMailSentModal}
                        >
                            <img className="contact__modal__button__image__x" src="/images/eventspage/close.svg" />
                        </button> 
                    </div>
                    <img className="contact__confirm__image desktop" src="/images/contact/contact-confirm.svg" />
                    <img className="contact__confirm__seperator" src="/images/contact/contact-confirm-seperator.png" />
                    <h2 className="contact__confirm__header Heebo-Medium" dir="rtl">איזה כיף,</h2>
                    <h4 className="contact__confirm__text Heebo-Medium" dir="rtl">עשיתם צעד ראשון לאירוע מוצלח!<br />ניצור עמכם קשר בהקדם</h4>
                    <img className="contact__confirm__seperator" src="/images/contact/contact-confirm-seperator.png" />
                    <h3 className="contact__confirm__footer Heebo-Medium">אורן ורינת</h3>
                </Modal>

                {this.state.error && <p>{this.state.error}</p>}
                <form className="homepage__intouch__form" onSubmit={this.onSubmit} dir="rtl">
                    <input
                        type="text"
                        placeholder="שם:"
                        value={this.state.name}
                        onChange={this.onNameChange}
                    />
                    <input
                        type="email"
                        placeholder="דוא״ל:"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                    />
                    <button className="homepage__intouch__button Heebo-Regular">שלח</button>
                </form>
            </div>
        )
    }
}