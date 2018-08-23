import React from 'react';
import TileGallery from '../common/TileGallery';
import EventImage from './EventImage';

const columns = 2;
const EventImages = (props) => (
    <div>
        <div className="events__events__box events__events__box__gallery desktop">
            { 
                props.isAuthenticated === true ? 
                    <div className="backoffice__events__events__buttons">
                        <button data-id={props.eventId} className="backoffice__events__events__add__button" onClick={props.uploadWidget}>
                            <img data-id={props.eventId} className="backoffice__events__events__add__icon" src="/images/eventspage/add-eventSubcategory-icon.svg" />
                        </button>
                        <button className="backoffice__events__events__save__button" onClick={props.updateImages}>
                            <img className="backoffice__events__events__save__icon" src="/images/backoffice/save.svg" />
                        </button>
                        
                    </div>
                :
                    null
            }
            {
                props.images ?

                    <TileGallery
                        photos={props.images}
                        columns={2}
                        margin={4}
                        isAuthenticated={props.isAuthenticated}
                        onImageOrderBlur={props.onImageOrderBlur}
                        onImageOrderChange={props.onImageOrderChange}
                        onImageOrderKeyPress={props.onImageOrderKeyPress}
                        onDeleteImage={props.onDeleteImage}
                        onOpenSlideGallery={props.onOpenSlideGallery}
                    />

                :
                    null
            }
        
        </div>
        <div className="events__events__box events__events__box__gallery mobile">
            { 
                    props.isAuthenticated === true ? 
                        <div className="backoffice__events__events__buttons">
                            <button data-id={props.eventId} className="backoffice__events__events__add__button" onClick={props.uploadWidget}>
                                <img data-id={props.eventId} className="backoffice__events__events__add__icon" src="/images/eventspage/add-eventSubcategory-icon.svg" />
                            </button>
                            <button className="backoffice__events__events__save__button" onClick={props.updateImages}>
                                <img className="backoffice__events__events__save__icon" src="/images/backoffice/save.svg" />
                            </button>
                            
                        </div>
                    :
                        null
                }
            {
                props.images ?

                    <TileGallery
                        photos={props.images}
                        columns={1}
                        margin={4}
                        isAuthenticated={props.isAuthenticated}
                        onImageOrderBlur={props.onImageOrderBlur}
                        onImageOrderChange={props.onImageOrderChange}
                        onImageOrderKeyPress={props.onImageOrderKeyPress}
                        onDeleteImage={props.onDeleteImage}
                        onOpenSlideGallery={props.onOpenSlideGallery}
                    />

                :
                    null
            }
        
        </div>
    </div>
);

export default EventImages;