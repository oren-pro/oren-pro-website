import React, { Component } from 'react';
import UncontrolledCarousel from '../UncontrolledCarousel';
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import {
    startAddDesktopGallery,
    startSetDesktopGallery,
    startEditDesktopGallery,
    startDeleteDesktopGallery
} from '../../actions/desktopGallery';


const itemsMobile = [
  {
    src: 'https://res.cloudinary.com/orenpro/image/upload/v1534248940/carouselMobile_01.jpg',
    altText: 'Slide 1',
    caption: '',
    header: ''
  },
  {
    src: 'https://res.cloudinary.com/orenpro/image/upload/v1534248940/carouselMobile_02.jpg',
    altText: 'Slide 2',
    caption: '',
    header: ''
  },
  {
    src: 'https://res.cloudinary.com/orenpro/image/upload/v1534248940/carouselMobile_03.jpg',
    altText: 'Slide 3',
    caption: '',
    header: ''
  }
];



class HomePageCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            desktopGalleryModalIsOpen: false,
            desktopImages: this.props.desktopGallery
        }
    }

    onToggleDesktopGallery = () => {
        this.setState({
            desktopGalleryModalIsOpen: !this.state.desktopGalleryModalIsOpen
        });
    }


    uploadWidget = (e) => {
        var myUploadWidget;
        myUploadWidget = cloudinary.openUploadWidget({ 
            cloud_name: 'orenpro', 
            upload_preset: 'fbznsdxt', 
            sources: [
                "local",
                "url",
                "image_search",
                "facebook",
                "dropbox",
                "instagram",
                "camera"
            ],
            
            fonts: {
                default: null,
                "'Cute Font', cursive": "https://fonts.googleapis.com/css?family=Cute+Font",
                "'Gamja Flower', cursive": "https://fonts.googleapis.com/css?family=Gamja+Flower|PT+Serif"
            }
        },
            (error, result) => {
                if (error) {
                    console.log(error);
                }
                if (result.event === "success") {
                    const order = Number(this.state.desktopImages.length)+1;
                    const image = result.info.secure_url;
                    const publicId = result.info.public_id;
                    const desktopImage = {
                      src: image,
                      altText: 'Homepage Galley Image',
                      caption: '',
                      header: '',
                      publicId,
                      order
                    }
                        
                    this.props.startAddDesktopGallery( desktopImage ).then(() => {
                      this.props.startSetDesktopGallery().then((desktopImages) => {
                        console.log(desktopImages);
                        this.setState({
                            desktopImages
                        });
                      });
                      myUploadWidget.close();
                    });
                }
            }
        );
        myUploadWidget.open();
    }


    onDeleteDesktopImage = (e) => {
        const id = e.target.dataset.id;
        const order = e.target.dataset.order;
        const publicId = e.target.dataset.publicid;
        const desktopImages = [];
        const desktopImagesOld = this.state.desktopImages;

        for (let i = 0; i < desktopImagesOld.length; i++) {
            if (id !== desktopImagesOld[i].id) {
                if (desktopImagesOld[i].order > order) {
                    desktopImagesOld[i].order = desktopImagesOld[i].order-1;
                }
                desktopImages.push(desktopImagesOld[i]);
            }
        }

        const fbDesktopImages = {};
        desktopImages.map((desktopImage, index) => {
            fbDesktopImages[desktopImage.id] = desktopImage;
        })
        fbDesktopImages[id] = null;
        this.props.startDeleteDesktopGallery( fbDesktopImages, desktopImages, publicId );
        this.setState({
            desktopImages
        });
    }



    onDesktopImageOrderBlur = (e) => {
        const desktopImages = this.state.desktopImages;
        let newOrder = e.target.value;
        if (newOrder > desktopImages.length) {
            newOrder = desktopImages.length;
        }
        if (newOrder < 1) {
            newOrder = 1;
        }
        const oldOrder = Number(e.target.dataset.index)+1;
        const id = e.target.dataset.id;
        if ( Number(newOrder) > Number(oldOrder) ) {
            for (let i = 0; i < desktopImages.length; i++) {
                if (id !== desktopImages[i].id) {
                    if (desktopImages[i].order <= newOrder && desktopImages[i].order > oldOrder) {
                        desktopImages[i].order = desktopImages[i].order-1;
                    }
                }
            }
        } else if ( Number(newOrder) < Number(oldOrder) ) {
            for (let i = 0; i < desktopImages.length; i++) {
                
                if (id !== desktopImages[i].id) {
                    if (desktopImages[i].order < oldOrder && desktopImages[i].order >= newOrder) {
                        desktopImages[i].order = Number(desktopImages[i].order)+1;
                    }
                }
            }
        }
        desktopImages.sort((a, b) => {
            return a.order > b.order ? 1 : -1;
        });
        this.setState({
            desktopImages
        });
    }

    onDesktopImageOrderChange = (e) => {
        const desktopImages = this.state.desktopImages;
        let newOrder = e.target.value;
        if (newOrder > desktopImages.length) {
            newOrder = desktopImages.length;
        }
        if (newOrder < 1) {
            newOrder = 1;
        }
        const oldOrder = Number(e.target.dataset.index)+1;
        desktopImages[e.target.dataset.index].order = Number(newOrder);
        this.setState({
            desktopImages
        });
    }

    onDesktopImageOrderKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onDesktopImageOrderBlur(e);
        }
    }


    updateDesktopGallery = () => {
        const desktopImages = this.state.desktopImages;
        const fbDesktopImages = {};
        desktopImages.map((desktopImage, index) => {
            fbDesktopImages[desktopImage.id] = desktopImage;
        })
        this.props.startEditDesktopGallery(desktopImages, fbDesktopImages);
    }



    render() {
        return (
          <div>
            
            <Modal open={this.state.desktopGalleryModalIsOpen} onClose={this.onToggleDesktopGallery} dir="rtl">
                <div className="backoffice__gallery__modal">
                    <h4 className="Heebo-Regular">desktop gallery</h4>
                    {
                        this.state.desktopImages ?
                        this.state.desktopImages.length > 0 ?
                            
                            this.state.desktopImages.map((image, index) => {
                                return  <div className="backoffice__gallery__modal__in__box" key={"in"+image.id} dir="rtl">
                                            <Button
                                                id="btn-x"
                                                data-id={image.id}
                                                data-order={image.order}
                                                data-publicid={image.publicId}
                                                data-index={image.order}
                                                data-showstatus={false}
                                                className="backoffice__events__tabs__remove btn-danger"
                                                onClick={this.onDeleteDesktopImage}
                                            >
                                                X
                                            </Button>
                                            
                                            <div className="backoffice__events__tabs__order__box">
                                                <input
                                                    id="number"
                                                    data-id={image.id}
                                                    type="number"
                                                    value={image.order}
                                                    data-index={index}
                                                    onChange={this.onDesktopImageOrderChange}
                                                    onKeyPress={this.onDesktopImageOrderKeyPress}
                                                    onBlur={this.onDesktopImageOrderBlur}
                                                />
                                            </div>
                                            <div className="backoffice__gallery__image__container">
                                              <img width="100%" height="100%" src={image.src} />
                                            </div>
                                        </div>
                            })
                            
                        :
                            null
                        :
                            null
                    }
                    <br />
                    <Button bsStyle="success" onClick={this.updateDesktopGallery}>עדכון</Button>
                </div>
            </Modal>


            { 
                this.props.isAuthenticated === true ? 

                    
                    <div className="backoffice__desktop__gallery__buttons" hidden={this.state.hideTellEditPanel}>
                      <p className="homepage__tell__details">desktop gallery</p>
                      <button className="homepage__tell__edit__button" onClick={this.onToggleDesktopGallery}>
                          <img className="homepage__tell__add" src="/images/backoffice/edit_white.svg" />
                      </button>
                      <button className="homepage__tell__add__button" onClick={this.uploadWidget}>
                          <img className="homepage__tell__add" src="/images/homepage/tell/add-circle-twotone-white-icon.svg" />
                      </button>
                    </div>
                :
                    null
            }

            { 
                this.props.isAuthenticated === true ? 

                    
                    <div className="backoffice__mobile__gallery__buttons" hidden={this.state.hideTellEditPanel}>
                      <p className="homepage__tell__details">mobile gallery</p>
                      <button className="homepage__tell__edit__button" onClick={this.onToggleDesktopGallery}>
                          <img className="homepage__tell__add" src="/images/backoffice/edit_white.svg" />
                      </button>
                      <button className="homepage__tell__add__button" onClick={this.uploadWidget}>
                          <img className="homepage__tell__add" src="/images/homepage/tell/add-circle-twotone-white-icon.svg" />
                      </button>
                    </div>
                :
                    null
            }




            {
              this.props.desktopGallery ?
                <UncontrolledCarousel className="carousel__fade"
                  slide={false}
                  pause={false}
                  controls={false}
                  keyboard={false}
                  ride='carousel'
                  interval='5000'
                  items={this.props.media === 'mobile' ? itemsMobile : this.state.desktopImages}
              />
              :
              null
            }

            

          </div>
        )
    }

}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    desktopGallery: state.desktopGallery.desktopGallery
});

const mapDispatchToProps = (dispatch) => ({
    startAddDesktopGallery: (desktopImage) => dispatch(startAddDesktopGallery(desktopImage)),
    startSetDesktopGallery: (desktopImages) => dispatch(startSetDesktopGallery(desktopImages)),
    startEditDesktopGallery: (desktopImages, fbDesktopImages) => dispatch(startEditDesktopGallery(desktopImages, fbDesktopImages)),
    startDeleteDesktopGallery: (fbDesktopImages, desktopImages, publicId) => dispatch(startDeleteDesktopGallery(fbDesktopImages, desktopImages, publicId))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageCarousel); 




