import React from "react";
import Slider from "react-slick";
import { Button, Popover, Tooltip, OverlayTrigger } from "react-bootstrap";
import { connect } from 'react-redux';
import {
    startAddCostumers,
    startSetCostumers,
    startDeleteCostumer,
    startEditCostumers
} from '../../actions/costumers';


function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={'customers__next__arrow'}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={'customers__prev__arrow'}
      onClick={onClick}
    />
  );
}

// const costumers = [
//   {
//     "image": "/images/customersStrip/images/galil.png",
//     "order": "1"
//   },
//   {
//     "image": "/images/customersStrip/images/cme.png",
//     "order": "2"
//   },
//   {
//     "image": "/images/customersStrip/images/bd.png",
//     "order": "3"
//   },
//   {
//     "image": "/images/customersStrip/images/unitask.png",
//     "order": "4"
//   },
//   {
//     "image": "/images/customersStrip/images/yoelgeva.png",
//     "order": "5"
//   },
//   {
//     "image": "/images/customersStrip/images/wedo.png",
//     "order": "6"
//   },
//   {
//     "image": "/images/customersStrip/images/technion.png",
//     "order": "7"
//   },
//   {
//     "image": "/images/customersStrip/images/taro.png",
//     "order": "8"
//   },
//   {
//     "image": "/images/customersStrip/images/hofcarmel.png",
//     "order": "9"
//   },
//   {
//     "image": "/images/customersStrip/images/dyckam.png",
//     "order": "10"
//   }
// ]

class CustomersStrip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCostumersEditPanel: true,
            costumers: this.props.costumers.costumers
        }
    }

    componentDidMount = () => {
      // console.log(this.props.costumers);
      // if (this.state.costumers !== [] && this.props.costumers) {
      //   this.setState({
      //     costumers: this.props.costumers
      //   })
      // }
    }

    // shouldComponentUpdate = (nextProps, nextState) => {
    //   console.log(nextProps);
    //   return true;
    // }

    componentDidUpdate = () => {
      console.log(this.props.costumers)
      // if (this.state.costumers === [] && this.props.costumers) {
      //   this.setState({
      //     costumers: this.props.costumers
      //   })
      // }
    }

    UNSAFE_componentWillUpdate= () => {
      console.log(this.props.costumers)
      // if (this.state.costumers === [] && this.props.costumers) {
      //   this.setState({
      //     costumers: this.props.costumers
      //   })
      // }
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
                    const order = Number(this.state.costumers.length)+1;
                    const image = result.info.secure_url;
                    const publicId = result.info.public_id;
                    const costumer = {
                      image,
                      publicId,
                      order
                    }
                        
                    this.props.startAddCostumers( costumer ).then(( costumers ) => {
                      console.log(costumers);
                      this.props.startSetCostumers().then(() => {
                        console.log(this.props.costumers);
                        this.setState({
                            costumers: this.props.costumers.costumers
                        });
                      });
                    //     images.sort((a, b) => {
                    //         return a.eventsIds[id+'order'] > b.eventsIds[id+'order'] ? 1 : -1;
                    //     });
                    //     const galleryImages = [];
                    //     images.map((image) => {
                    //         return galleryImages.push({
                    //             publicId: image.public_id,
                    //             image: image,
                    //             id: image.id,
                    //             order: image.eventsIds[id+'order'],
                    //             src: image.imageUrl,
                    //             alt: image.imageText,
                    //             width: image.imageWidth,
                    //             height: image.imageHeight
                    //         });
                    //     });
                    //     const slideGalleryImages = [];
                    //     images.map((image) => {
                    //         let imageWidth = image.imageWidth;
                    //         let imageHeight = image.imageHeight;
                    //         const ratio = 600/imageHeight;
                    //         imageWidth = ratio*imageWidth;
                    //         imageHeight = ratio*imageHeight;
                    //         return slideGalleryImages.push({
                    //             publicId: image.public_id,
                    //             image: image,
                    //             id: image.id,
                    //             order: image.eventsIds[eventId+'order'],
                    //             src: image.imageUrl,
                    //             altText: image.imageText,
                    //             width: imageWidth,
                    //             height: imageHeight,
                    //             caption: '',
                    //             header: ''
                    //         });
                    //     });
                    //     this.setState({
                    //         imagesOrigin: JSON.parse(JSON.stringify(images)),
                    //         images,
                    //         galleryImages,
                    //         slideGalleryImages
                    //     });
                      myUploadWidget.close();
                    });
                }
            }
        );
        myUploadWidget.open();
    }

    startEditCostumers = () => {
        this.setState({
            hideCostumersEditPanel: !this.state.hideCostumersEditPanel
        });
    }


    onDeleteCostumer = (e) => {
        // console.log(e.target.dataset.publicid);
        // console.log(e.target.dataset.id);
        const id = e.target.dataset.id;
        const order = e.target.dataset.order;
        const publicId = e.target.dataset.publicid;
        const costumers = [];
        const costumersOld = this.state.costumers;

        for (let i = 0; i < costumersOld.length; i++) {
            if (id !== costumersOld[i].id) {
                if (costumersOld[i].order > order) {
                    costumersOld[i].order = costumersOld[i].order-1;
                }
                costumers.push(costumersOld[i]);
            }
        }

        const fbCostumers = {};
        costumers.map((costumer, index) => {
            fbCostumers[costumer.id] = costumer;
        })
        fbCostumers[id] = null;

        console.log(publicId);
        console.log(costumers);
        console.log(fbCostumers);
        
        
        this.props.startDeleteCostumer( fbCostumers, costumers, publicId );

        
        this.setState({
            costumers
        });
    }



    onCostumerOrderBlur = (e) => {
        const costumers = this.state.costumers;
        let newOrder = e.target.value;
        if (newOrder > costumers.length) {
            newOrder = costumers.length;
        }
        if (newOrder < 1) {
            newOrder = 1;
        }
        const oldOrder = Number(e.target.dataset.index)+1;
        const id = e.target.dataset.id;
        if ( Number(newOrder) > Number(oldOrder) ) {
            for (let i = 0; i < costumers.length; i++) {
                if (id !== costumers[i].id) {
                    if (costumers[i].order <= newOrder && costumers[i].order > oldOrder) {
                        costumers[i].order = costumers[i].order-1;
                    }
                }
            }
        } else if ( Number(newOrder) < Number(oldOrder) ) {
            for (let i = 0; i < costumers.length; i++) {
                
                if (id !== costumers[i].id) {
                    if (costumers[i].order < oldOrder && costumers[i].order >= newOrder) {
                        costumers[i].order = Number(costumers[i].order)+1;
                    }
                }
            }
        }
        costumers.sort((a, b) => {
            return a.order > b.order ? 1 : -1;
        });
        this.setState({
            costumers
        });
    }

    onCostumerOrderChange = (e) => {
        const costumers = this.state.costumers;
        let newOrder = e.target.value;
        if (newOrder > costumers.length) {
            newOrder = costumers.length;
        }
        if (newOrder < 1) {
            newOrder = 1;
        }
        const oldOrder = Number(e.target.dataset.index)+1;
        costumers[e.target.dataset.index].order = Number(newOrder);
        this.setState({
            costumers
        });
    }

    onCostumerOrderKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onCostumerOrderBlur(e);
        }
    }


    updateCostumers = () => {
        const costumers = this.state.costumers;
        const fbCostumers = {};
        costumers.map((costumer, index) => {
            fbCostumers[costumer.id] = costumer;
        })
        console.log(costumers);
        console.log(fbCostumers);
        this.props.startEditCostumers(costumers, fbCostumers);
    }




  render() {
    const settings = {
      dots: false,
      infinite: true,
      centerMode: true,
      autoplay: true,
      infinite: true,
      variableWidth: true,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
    
    return (
      <div className="customers__strip">
        { 
            this.props.isAuthenticated === true ? 
                <div className="backoffice__customers__strip__buttons">
                    <button data-id={this.props.eventId} className="backoffice__events__events__add__button" onClick={this.uploadWidget}>
                        <img data-id={this.props.eventId} className="backoffice__events__events__add__icon" src="/images/eventspage/add-eventSubcategory-icon.svg" />
                    </button>
                    <button className="backoffice__customers__strip__edit__button" onClick={this.startEditCostumers}>
                        <img className="backoffice__edit__icon" src="/images/backoffice/edit.svg" />
                    </button>
                </div>
            :
                null
        }
        <Slider className="customers__slider" {...settings}>
          
          {
            this.state.costumers.map((costumer, index) => {
              return  <div key={"view"+costumer.order}>
                        <img src={costumer.image} />
                      </div>
            })
          }
        </Slider>

        { 
          this.props.isAuthenticated === true ? 
              <div className="backoffice__edit__events__tabs__box" hidden={this.state.hideCostumersEditPanel}>
                  {
                      this.state.costumers.length > 0 ?
                          
                          this.state.costumers.map((costumer, index) => {
                              return  <div className="backoffice__edit__events__tabs__in__box" key={"in"+costumer.id} dir="rtl">
                                          <Button
                                              id="btn-x"
                                              data-id={costumer.id}
                                              data-order={costumer.order}
                                              data-publicid={costumer.publicId}
                                              data-index={index}
                                              data-showstatus={false}
                                              className="backoffice__events__tabs__remove btn-danger"
                                              onClick={this.onDeleteCostumer}
                                          >
                                              X
                                          </Button>
                                          
                                          <div className="backoffice__events__tabs__order__box">
                                              <input
                                                  id="number"
                                                  data-id={costumer.id}
                                                  type="number"
                                                  value={costumer.order}
                                                  data-index={index}
                                                  onChange={this.onCostumerOrderChange}
                                                  onKeyPress={this.onCostumerOrderKeyPress}
                                                  onBlur={this.onCostumerOrderBlur}
                                              />
                                          </div>
                                          <div>
                                            <img width="50%" height="50%" src={costumer.image} />
                                          </div>
                                      </div>
                          })
                          
                      :
                          null
                  }
                  <div className="backoffice__events__tabs__update__box">
                      <Button className="backoffice__events__tabs__update btn-success" onClick={this.updateCostumers}>עדכון</Button>
                  </div>
              </div>
          :
              null
      }


      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    costumers: state.costumers
});

const mapDispatchToProps = (dispatch) => ({
    startAddCostumers: (costumer) => dispatch(startAddCostumers(costumer)),
    startSetCostumers: (costumers) => dispatch(startSetCostumers(costumers)),
    startDeleteCostumer: (costumers, fbCostumers, publicId) => dispatch(startDeleteCostumer(costumers, fbCostumers, publicId)),
    startEditCostumers: (costumers, fbCostumers) => dispatch(startEditCostumers(costumers, fbCostumers))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomersStrip);