import React from 'react';


export default class HomePageIntouchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            error: ''
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
    };
    render() {
        return (
            <div>
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