import React from 'react';
import { Route } from 'react-router-dom';
import { Button } from "react-bootstrap";
import UploadImageButton from '../common/UploadImageButton';



class EventsEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }
    }
    onMouseEnter = () => {
        const hover = true;
        this.setState(() => ({ hover }));
    };

    onMouseLeave = () => {
        const hover = false;
        this.setState(() => ({ hover }));
    };

    render() {
        //console.log(this.props);
        return (
            <div data-id={this.props.id} hidden={(this.props.subcategories[this.props.subcategoryId] !== true && this.props.subcategoryId !== '') || (this.props.isAuthenticated !== true && this.props.visible !== true)} className={`events__event__box${ this.props.oneLine === true ? ' events__event__box--event' : ''}`} onMouseEnter={this.props.onRollOver} dir="rtl">
                {   
                    this.props.isAuthenticated && this.props.subcategoryId !== '' ?

                        <div className="backoffice__events__event__box">
                            <Button
                                id="btn-x"
                                data-id={this.props.id}
                                data-order={this.props.order}
                                data-showstatus={false}
                                className="backoffice__events__event__remove btn-danger"
                                onClick={this.props.toggleHookEvent}
                            >
                                X
                            </Button>
                            <Button
                                id="btn-show"
                                data-id={this.props.id}
                                data-visible={this.props.visible === true ? false : true}
                                className={`backoffice__events__event__remove${this.props.visible === true ? ' btn-success' : ' btn-danger'}`}
                                onClick={this.props.toggleShowItem}
                            >
                                <img
                                    data-id={this.props.id}
                                    data-visible={this.props.visible === true ? false : true}
                                    className="backoffice__show__icon"
                                    src={`/images/backoffice/${this.props.visible === true ? 'show' : 'hide'}.svg`} 
                                />
                            </Button>
                            <div className="backoffice__item__order__box">
                                <input
                                    id="number"
                                    data-id={this.props.id}
                                    data-categoryindex={this.props.categoryIndex}
                                    type="number"
                                    value={this.props.order}
                                    onChange={this.props.onItemOrderChange}
                                    data-index={this.props.index}
                                    data-subcategoryid={this.props.subcategoryId}
                                    onKeyPress={this.props.onItemOrderKeyPress}
                                    onBlur={this.props.onItemOrderBlur}
                                />
                            </div>
                            <UploadImageButton
                                cssClass='backoffice__item__upload__image__button'
                                action='setString'
                                field='image'
                                id={this.props.id}
                                name='item'
                                uploadWidget={this.props.uploadWidget}
                            />
                        </div>
                    :
                        null
                }
                {   
                    this.props.isAuthenticated && this.props.subcategoryId === '' ?

                        <div className="backoffice__events__event__box backoffice__events__event__box__all">
                            
                            <div className="backoffice__item__order__box">
                                <input
                                    id="number"
                                    data-id={this.props.id}
                                    data-type="all"
                                    data-categoryindex={this.props.categoryIndex}
                                    type="number"
                                    value={this.props.categoryIndex}
                                    onChange={this.props.onItemOrderChange}
                                    data-index={this.props.index}
                                    data-subcategoryid={this.props.subcategoryId}
                                    onKeyPress={this.props.onItemOrderKeyPress}
                                    onBlur={this.props.onItemOrderBlur}
                                />
                            </div>
                            
                        </div>
                    :
                        null
                }
                <img data-id={this.props.id} className="events__event__image" src={this.props.image} />
                <h2 hidden={this.state.hover} className="events__event__title Heebo-Regular" dir="rtl">{this.props.title}</h2>
                
                <Route render={({ history }) => (
                
                    <div className="events__event__button__box"
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        onClick={() => { history.push(`/${this.props.title.replace(" ", "_").replace(" ", "_")}/${this.props.categoryName.replace(" ", "_").replace(" ", "_")}`) }}
                        
                    >
                            <button
                            className="events__event__button"
                        >
                        </button>
                        <div className="events__event__button__text__div">
                            <p className="events__event__button__text  Heebo-Regula">{this.props.title}</p>
                            <img className="events__event__button__image" src="/images/contact/arrowWhite.svg" />
                        </div>
                    </div>
                )} />

                        
               
            </div>
        )
    }
}

export default EventsEvent;