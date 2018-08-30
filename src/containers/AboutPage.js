import React from 'react';
import {Helmet} from 'react-helmet';
import { Button, Modal as ModalRB } from "react-bootstrap";
import Modal from 'react-responsive-modal';
import AboutTopStrip from '../components/aboutpage/AboutTopStrip';
import AboutContentStrip from '../components/aboutpage/AboutContentStrip';
import ContactStrip from '../components/contactpage/ContactStrip';
import CustomersStrip from '../components/common/CustomersStrip';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';
import PageUpStrip from '../components/common/PageUpStrip';
import SocialMedia from '../components/common/SocialMedia';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { startSetAboutPage, startEditAboutPage, startEditAboutPageSeo, startAddAboutImage, startDeleteAboutImage } from '../actions/aboutpage';
import $ from 'jquery';
import { iconRatioOn } from '../reusableFunctions/iconRatioOn';
import { iconRatioOut } from '../reusableFunctions/iconRatioOut';
import { handlePageScroll } from '../reusableFunctions/handlePageScroll';
import TileGallery from '../components/common/TileGallery';
import UncontrolledCarousel from '../components/UncontrolledCarouselSlide';



class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutpageOrigin: [],
            aboutpage: [],
            ratio: 1,
            ratioFacebook: 1,
            ratioInstagram: 1,
            ratioMail: 1,
            ratioPhone: 1,
            ratioGreenArrow: 1,
            pageupImageClassName: 'pageup__image__absolute',
            slideGalleryModalIsOpen: false,
            seoAboutpageModalIsOpen: false,
            seo: {
                title: '',
                description: '',
                keyWords: '',
            },
            images: [],
            galleryImages: [],
            slideGalleryImages: []
        }
    }



    setData = (e) => {
		const { value, dataset } = e.target;
		const { name, index, field, action } = dataset;
		const aboutpage = JSON.parse(JSON.stringify(this.state.aboutpage));

        switch (action) {
			case "setString":
                //console.log(value);
                aboutpage[index][field] = value;
                //console.log(homepage);
                break;
            case "setNumber":
                //console.log(value);
                aboutpage[index][field] = value;
                //console.log(homepage);
                break;
			default:
				break;
        };
        console.log(aboutpage);
        this.setState({
            aboutpage: aboutpage
        });
      
        // if(isEqual(this.state.itemOrigin,itemUpdate)){ 
        //     window.removeEventListener("beforeunload", this.unloadFunc);
        // } else {
        //     window.addEventListener("beforeunload", this.unloadFunc);
        // }
	}



    // update database

    onUpdateAboutPage = () => {
        const aboutpage = JSON.parse(JSON.stringify(this.state.aboutpage));
        const fbAboutpage = {};
        aboutpage.map((item, index) => {
            if(item.index) {
                fbAboutpage[item.index] = item;
            } else {
                fbAboutpage.aboutimages = item;
            }
        });
        this.props.startEditAboutPage(fbAboutpage, aboutpage);
        this.setState(() => ({ aboutpageOrigin: aboutpage }));
    }



    handleScroll = () => {
        this.setState(handlePageScroll(this.state.pageupImageClassName));
    }


    componentDidMount = () => {
        console.log("did mount");
        window.addEventListener('scroll', this.handleScroll);

        this.props.startSetAboutPage().then(()=> {
            console.log(this.props.aboutpage);

            let aboutpage= [];
            const obj = JSON.parse(JSON.stringify(this.props.aboutpage));
            if ( obj ){
                Object.keys(obj).map((key) => {
                    let keyedObj;
                    if (String(key) === "aboutimages") {
                        keyedObj = {...obj[key]};
                    } else {
                        keyedObj = {index: String(key), ...obj[key]};
                    }
                    
                    aboutpage.push(keyedObj);
                });

                if(aboutpage.length === 6) {
                    const aboutimages = [];
                    const img = aboutpage[aboutpage.length-2];
                    Object.keys(img).map((key) => {
                        const keyedImg = {id: String(key), ...img[key]};
                        aboutimages.push(keyedImg);
                    });
                
                    aboutimages.sort((a, b) => {
                        return a.order > b.order ? 1 : -1;
                    });
                    const galleryImages = [];
                    aboutimages.map((image) => {
                        return galleryImages.push({
                            publicId: image.publicId,
                            id: image.id,
                            order: image.order,
                            src: image.src,
                            alt: image.alt,
                            width: image.width,
                            height: image.height
                        });
                    });
                    const slideGalleryImages = [];
                    aboutimages.map((image) => {
                        let imageWidth = image.width;
                        let imageHeight = image.height;
                        const ratio = 600/imageHeight;
                        imageWidth = ratio*imageWidth;
                        imageHeight = ratio*imageHeight;
                        if (imageWidth > 960) {
                            const widthRatio = 960/imageWidth;
                            imageWidth = widthRatio*imageWidth;
                            imageHeight = widthRatio*imageHeight;
                        }
                        return slideGalleryImages.push({
                            publicId: image.publicId,
                            id: image.id,
                            order: image.order,
                            src: image.src,
                            altText: image.alt,
                            width: imageWidth,
                            height: imageHeight,
                            caption: '',
                            header: ''
                        });
                    });
                    this.setState({
                        images: aboutimages,
                        galleryImages,
                        slideGalleryImages
                    });
                }

                this.setState({
                    seo: aboutpage[aboutpage.length-1],
                    aboutpage: aboutpage,
                    aboutpageOrigin: aboutpage
                });
            }
        });
    }


    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }



    setIconRatioOn = (e) => {
        this.setState(iconRatioOn(e));
    }

    setIconRatioOut = (e) => {
        this.setState(iconRatioOut(e));
    }



    onToggleAboutpageSeo = () => {
        console.log('in seo');
        this.setState({
            seoAboutpageModalIsOpen: !this.state.seoAboutpageModalIsOpen
        });
        console.log(this.state.seoAboutpageModalIsOpen);
    }

    onSeoTitleChange = (e) => {
        const title = e.target.value;
        const seo = this.state.seo;
        seo.title = title;
        this.setState({
            seo
        });
    }

    onSeoDescriptionChange = (e) => {
        const description = e.target.value;
        const seo = this.state.seo;
        seo.description = description;
        this.setState({
            seo
        });
    }

    onSeoKeyWordsChange = (e) => {
        const keyWords = e.target.value;
        const seo = this.state.seo;
        seo.keyWords = keyWords;
        this.setState({
            seo
        });
    }

    updateAboutpageSeo = () => {
        const seo = this.state.seo;
        this.props.startEditAboutPageSeo(seo);
        this.onToggleAboutpageSeo();
    }


    uploadWidget = (e) => {
        const { dataset } = e.target;
        const { id } = dataset;
        const eventId = this.state.eventId;
        //console.log(this.state.images);
        //console.log(Number(this.state.images.length)+1);
        //console.log( id );
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
                    console.log(result);
                    console.log(result.info.public_id)
                    const order = Number(this.state.images.length)+1;
                    const image = {
                        publicId: result.info.public_id,
                        src: result.info.secure_url,
                        width: result.info.width,
                        height: result.info.height,
                        alt: '',
                        order: order
                    };
                        
                    this.props.startAddAboutImage(image, order).then((images)=> {
                        console.log(images);
                        images.sort((a, b) => {
                            return a.order > b.order ? 1 : -1;
                        });
                        const galleryImages = [];
                        images.map((image) => {
                            return galleryImages.push({
                                publicId: image.publicId,
                                id: image.id,
                                order: image.order,
                                src: image.src,
                                alt: image.alt,
                                width: image.width,
                                height: image.height
                            });
                        });
                        const slideGalleryImages = [];
                        images.map((image) => {
                            let imageWidth = image.width;
                            let imageHeight = image.height;
                            const ratio = 600/imageHeight;
                            imageWidth = ratio*imageWidth;
                            imageHeight = ratio*imageHeight;
                            if (imageWidth > 800) {
                                const widthRatio = 800/imageWidth;
                                imageWidth = widthRatio*imageWidth;
                                imageHeight = widthRatio*imageHeight;
                            }
                            return slideGalleryImages.push({
                                publicId: image.publicId,
                                id: image.id,
                                order: image.order,
                                src: image.src,
                                altText: image.alt,
                                width: imageWidth,
                                height: imageHeight,
                                caption: '',
                                header: ''
                            });
                        });
                        this.setState({
                            imagesOrigin: JSON.parse(JSON.stringify(images)),
                            images,
                            galleryImages,
                            slideGalleryImages
                        });
                    });
                    myUploadWidget.close();
                }
            }
        );
        myUploadWidget.open();
    }




    onImageOrderBlur = (e) => {
        const images = [];
        const galleryImages = this.state.galleryImages;
        const imageId = e.target.dataset.id;
        const index = e.target.dataset.index;
        const order = e.target.dataset.order;

        console.log(imageId);
        console.log(index);
        console.log(order);

        let newOrder = e.target.value;
        if (newOrder > galleryImages.length) {
            newOrder = galleryImages.length;
        }
        if (newOrder < 1) {
            newOrder = 1;
        }
        const oldOrder = Number(e.target.dataset.index)+1;
        const id = e.target.dataset.id;

        if ( Number(newOrder) > Number(oldOrder) ) {
            for (let i = 0; i < galleryImages.length; i++) {
                if (id !== galleryImages[i].id) {
                    if (galleryImages[i].order <= newOrder && galleryImages[i].order > oldOrder) {
                        galleryImages[i].order = galleryImages[i].order-1;
                    }
                }
            }
        } else if ( Number(newOrder) < Number(oldOrder) ) {
            for (let i = 0; i < galleryImages.length; i++) {
                
                if (id !== galleryImages[i].id) {
                    if (galleryImages[i].order < oldOrder && galleryImages[i].order >= newOrder) {
                        galleryImages[i].order = Number(galleryImages[i].order)+1;
                    }
                }
            }
        }


        galleryImages.sort((a, b) => {
            return a.order > b.order ? 1 : -1;
        });

        console.log('galleryImages');
        console.log(galleryImages);
        galleryImages.map((image, index) => {
            image.order = Number(index)+1;
            images.push(image.image);
        });
        // console.log('images');
        // console.log(images);

        this.setState({
            images,
            galleryImages
        });
    }

    onImageOrderChange = (e) => {
        const galleryImages = this.state.galleryImages;
        const eventId = this.state.eventId;
        const imageId = e.target.dataset.id;
        const index = e.target.dataset.index;
        const order = e.target.dataset.order;
        
        let newOrder = e.target.value;
        if (newOrder > galleryImages.length) {
            newOrder = galleryImages.length;
        }
        if (newOrder < 1) {
            newOrder = 1;
        }
       
        galleryImages[index].order = Number(newOrder);
        
        this.setState({
            galleryImages
        });
    }

    onImageOrderKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onImageOrderBlur(e);
        }
    }



    updateImages = () => {
        const aboutpage = this.state.aboutpage;
        const galleryImages = this.state.galleryImages;
        const images = this.state.images;
        
        const fbImages = {};
        galleryImages.map((image, index) => {
            fbImages[image.id] = image;
        })

        aboutpage[aboutpage.length-2] = fbImages;
        console.log(aboutpage);
        this.setState({
            aboutpage
        });

        this.onUpdateAboutPage();
    }

    onDeleteImage = (e) => {
        // console.log(e.target.dataset.publicid);
        // console.log(e.target.dataset.id);
        const id = e.target.dataset.id;
        const order = e.target.dataset.order;
        const publicid = e.target.dataset.publicid;
        const galleryImages = [];
        const galleryImagesOld = this.state.galleryImages;
        const images = [];

        for (let i = 0; i < galleryImagesOld.length; i++) {
            if (id !== galleryImagesOld[i].id) {
                if (galleryImagesOld[i].order > order) {
                    galleryImagesOld[i].order = galleryImagesOld[i].order-1;
                }
                galleryImages.push(galleryImagesOld[i]);
            }
        }

        galleryImages.map((image, index) => {
            image.order = Number(index)+1;
            images.push(image);
        });

        const fbImages = {};
        images.map((image, index) => {
            fbImages[image.id] = image;
        })
        fbImages[id] = null;

         console.log(galleryImages);
         console.log(images);
         console.log(fbImages);
        this.props.startDeleteAboutImage( fbImages, images, publicid );

        const slideGalleryImages = [];
        images.map((image) => {
            let imageWidth = image.width;
            let imageHeight = image.height;
            let ratioWidth = 1;
            let ratioHeight = 1;
            //console.log(imageHeight);
            //console.log(imageWidth);
            
            if (imageHeight < 800 && imageWidth < 1000) {
                ratioHeight = 800/imageHeight;
                ratioWidth = 1000/imageWidth;
                if (ratioHeight > ratioWidth) {
                    //console.log('1');
                    imageHeight = ratioHeight*imageHeight;
                    imageWidth = ratioHeight*imageWidth;
                } else {
                    //console.log('2');
                    imageHeight = ratioWidth*imageHeight;
                    imageWidth = ratioWidth*imageWidth;
                }
            }

            // console.log(ratioHeight);
            // console.log(ratioWidth);
            // console.log(imageHeight);
            // console.log(imageWidth);

            return slideGalleryImages.push({
                publicId: image.publicId,
                id: image.id,
                order: image.order,
                src: image.src,
                altText: image.alt,
                width: imageWidth,
                height: imageHeight,
                caption: '',
                header: ''
            });
        });
        this.setState({
            imagesOrigin: JSON.parse(JSON.stringify(images)),
            images,
            galleryImages,
            slideGalleryImages
        });
    }

    onOpenSlideGallery = (e) => {
        //console.log(e.target.dataset.id);
        //console.log(e.target.dataset.order);
        const currentImage = e.target.dataset.order-1;
        //console.log(currentImage);
        this.onToggleSlideGallery(e, currentImage);
    }

    onToggleSlideGallery = (e, currentImage = this.state.currentImage) => {
        //console.log(currentImage);
        //console.log(this.state.slideGalleryImages);
        //const width = (100-this.state.slideGalleryImages[currentImage].width/10)/2+3.5;
        //const crouselControlsRight = {right: `${width}rem`}
        //const crouselControlsWidth = $('#crouselControlsRight').width();
        const crouselControlsWidth = 140;
        //console.log(crouselControlsWidth);
        const width = this.state.slideGalleryImages[currentImage].width/2-crouselControlsWidth/2-23;
        //console.log(width);
        const crouselControlsRight = {marginLeft: `${width}px`, opacity: 1};
        this.setState({
            crouselControlsRight,
            currentImage,
            slideGalleryModalIsOpen: !this.state.slideGalleryModalIsOpen
        });
    }

    onCurrentImageChange = (currentImage) => {
        //console.log('onCurrentImageChange');
        //console.log(currentImage);
        this.setState({
            currentImage
        });
    }

    onNext = () => {
        if (this.animating) return;
        const nextIndex = this.state.currentImage === this.state.slideGalleryImages.length - 1 ? 0 : this.state.currentImage + 1;
        //const width = (100-this.state.slideGalleryImages[nextIndex].width/10)/2+3.5;
        const crouselControlsWidth = $('#crouselControlsRight').width();
        const width = this.state.slideGalleryImages[nextIndex].width/2-crouselControlsWidth/2-23;
        const crouselControlsRight = {marginLeft: `${width}px`, opacity: 1};
        this.setState({
            crouselControlsRight
        });
        if (this.onCurrentImageChange) {
        this.onCurrentImageChange(nextIndex);
        }
    }

    previous = () => {
        if (this.animating) return;
        const nextIndex = this.state.currentImage === 0 ? this.state.slideGalleryImages.length - 1 : this.state.currentImage - 1;
        //const width = (100-this.state.slideGalleryImages[nextIndex].width/10)/2+3.5;
        const crouselControlsWidth = $('#crouselControlsRight').width();
        const width = this.state.slideGalleryImages[nextIndex].width/2-crouselControlsWidth/2-23;
        const crouselControlsRight = {marginLeft: `${width}px`, opacity: 1};
        this.setState({
            crouselControlsRight
        });
        this.onCurrentImageChange(nextIndex);
    }

    onExiting = () => {
        //console.log('onExiting');
        this.animating = true;
    }

    onExited = () => {
        //console.log('onExited');
        //const width = (100-this.state.slideGalleryImages[this.state.currentImage].width/10)/2+3.5;
        //const crouselControlsRight = {right: `${width}rem`, opacity: 1};
        //const width = (100-this.state.slideGalleryImages[nextIndex].width/10)/2+3.5;
        const crouselControlsWidth = $('#crouselControlsRight').width();
        const width = this.state.slideGalleryImages[this.state.currentImage].width/2-crouselControlsWidth/2-23;
        const crouselControlsRight = {marginLeft: `${width}px`, opacity: 1};
        this.setState({
            crouselControlsRight
        });
        this.animating = false;
    }


    render() {
        return (
            <div className="container-fluid">

                <Helmet>
                    <title>אורן הפקות - נעים להכיר</title>
                    <meta name="description" content="תאור הדף עבור מנועי חיפוש" />
                </Helmet>

                <Modal open={this.state.seoAboutpageModalIsOpen} onClose={this.onToggleAboutpageSeo} center dir="rtl">
                    <div className="backoffice__seo__modal">
                        <h4 className="Heebo-Regular">seo</h4>
                        <div className="backoffice__seo__modal__left">
                            <input
                                className="events__tabs__button"
                                type="text"
                                placeholder="כותרת לדף (title)"
                                value={this.state.seo.title}
                                onChange={this.onSeoTitleChange}
                            />
                            <br />
                            <textarea
                                type="text"
                                placeholder="תאור"
                                value={this.state.seo.description}
                                onChange={this.onSeoDescriptionChange}
                            />
                            <br />
                            <textarea
                                type="text"
                                placeholder="מילות מפתח"
                                value={this.state.seo.keyWords}
                                onChange={this.onSeoKeyWordsChange}
                            />
                            <br />
                        </div>
                        <div className="backoffice__seo__modal__right">
                            <input
                                value="כותרת"
                                readOnly
                            />
                            <br />
                            <textarea
                                value="תאור"
                                readOnly
                            />
                            <br />
                            <textarea
                                value="מילות מפתח"
                                readOnly
                            />
                            <br />
                        </div>
                        <Button bsStyle="success" onClick={this.updateAboutpageSeo}>עדכון</Button>
                    </div>
                </Modal>

                <ModalRB show={this.state.slideGalleryModalIsOpen} onHide={this.onToggleSlideGallery} dir="rtl">
                    
                    <ModalRB.Body bsClass="modalBody carousel__fade">
                        <div id="crouselControlsRight" className="events__event__carousel__controls">
                            <div className="events__eventshare__button__box">
                                <button 
                                    type='button'
                                    className="events__event__carousel__button"
                                    data-name="greenArrow"
                                    onMouseEnter={this.setIconRatioOn}
                                    onMouseLeave={this.setIconRatioOut}
                                    onClick={this.onToggleSlideGallery}
                                >
                                    <img className="events__event__carousel__button__image__x" src="/images/eventspage/carousel-x.svg" />
                                </button> 
                            </div>
                            
                            <div hidden={this.state.slideGalleryImages.length<2} className="events__eventshare__button__box">
                                <button 
                                    type='button'
                                    className="events__event__carousel__button"
                                    data-name="greenArrow"
                                    onMouseEnter={this.setIconRatioOn}
                                    onMouseLeave={this.setIconRatioOut}
                                    onClick={this.previous}
                                >
                                    <img className="events__event__carousel__button__image" src="/images/eventspage/carousel-arrow-right.svg" />
                                </button> 
                            </div>

                            <div hidden={this.state.slideGalleryImages.length<2} className="events__eventshare__button__box">
                                <button 
                                    type='button'
                                    className="events__event__carousel__button"
                                    data-name="greenArrow"
                                    onMouseEnter={this.setIconRatioOn}
                                    onMouseLeave={this.setIconRatioOut}
                                    onClick={this.onNext}
                                >
                                    <img className="events__event__carousel__button__image" src="/images/eventspage/carousel-arrow-left.svg" />
                                    
                                </button> 
                            </div>

                            <div hidden={this.state.slideGalleryImages.length>1} className="events__eventshare__button__box">
                                <div 
                                    className="events__event__carousel__button"
                                >
                                    <img className="events__event__carousel__button__image events__event__carousel__button__image__fake" src="/images/eventspage/carousel-arrow-right.svg" />
                                </div> 
                            </div>

                            <div hidden={this.state.slideGalleryImages.length>1} className="events__eventshare__button__box">
                                <div 
                                    className="events__event__carousel__button"
                                >
                                    <img className="events__event__carousel__button__image events__event__carousel__button__image__fake" src="/images/eventspage/carousel-arrow-left.svg" />
                                    
                                </div> 
                            </div>




                        </div>
                        <UncontrolledCarousel
                            slide={false}
                            activeIndex={Number(this.state.currentImage)}
                            pause="hover"
                            controls={true}
                            keyboard={false}
                            ride='carousel'
                            interval='150000000'
                            items={this.state.slideGalleryImages}
                            onCurrentImageChange={this.onCurrentImageChange}
                            onExiting={this.onExiting}
                            onExited={this.onExited}
                        />
                    </ModalRB.Body>
                    
                </ModalRB>
                
                <Navigation />
                <div className="about__structure">
                    <div className="about__left">
                        { 
                            this.props.isAuthenticated === true ? 
                                <div className="about__edit__panel__box">
                                    <div className="about__edit__panel">
                                        <button className="backoffice_button" onClick={this.onUpdateAboutPage}>
                                            <img className="backoffice_icon" src="/images/backoffice/save.svg" />
                                        </button>
                                        <button className="backoffice_button" onClick={this.props.startLogout}>
                                            <img className="backoffice_icon" src="/images/backoffice/exit.svg" />
                                        </button>
                                        <button className="backoffice_button" onClick={this.onToggleAboutpageSeo}>
                                            seo
                                        </button>
                                    </div>
                                </div>
                            :
                                null
                        }
                        <AboutTopStrip />
                        {
                            this.state.aboutpage ?
                                this.state.aboutpage.map((item,index) => {
                                    
                                    return  index < this.state.aboutpage.length - 2 ?
                                                <AboutContentStrip
                                                            isAuthenticated={this.props.isAuthenticated}
                                                            action='setString'
                                                            name={index}
                                                            index={index}
                                                            key={`homepage-events-item-${index}`}
                                                            item={item}
                                                            aboutpageOrigin={this.state.aboutpageOrigin}
                                                            aboutpage={this.state.aboutpage}
                                                            ratioGreenArrow={this.state.ratioGreenArrow}
                                                            setIconRatioOn={this.state.setIconRatioOn}
                                                            setIconRatioOut={this.state.setIconRatioOut}
                                                            setData={this.setData}
                                                        />
                                                :
                                                    null
                                })
                            :
                                null
                        }
                        
                        <div className="about__gallery">
                            { 
                                this.props.isAuthenticated === true ? 
                                    <div className="backoffice__events__events__buttons">
                                        <button className="backoffice__events__events__add__button" onClick={this.uploadWidget}>
                                            <img className="backoffice__events__events__add__icon" src="/images/eventspage/add-eventSubcategory-icon.svg" />
                                        </button>
                                        <button className="backoffice__events__events__save__button" onClick={this.updateImages}>
                                            <img className="backoffice__events__events__save__icon" src="/images/backoffice/save.svg" />
                                        </button>
                                        
                                    </div>
                                :
                                    null
                            }
                            {
                                this.state.galleryImages ?

                                    <TileGallery
                                        photos={this.state.galleryImages}
                                        columns={2}
                                        margin={3}
                                        style="react-photo-gallery--about"
                                        isAuthenticated={this.props.isAuthenticated}
                                        onImageOrderBlur={this.onImageOrderBlur}
                                        onImageOrderChange={this.onImageOrderChange}
                                        onImageOrderKeyPress={this.onImageOrderKeyPress}
                                        onDeleteImage={this.onDeleteImage}
                                        onOpenSlideGallery={this.onOpenSlideGallery}
                                    />

                                :
                                    null
                            }
                        </div>
                    </div>
                    <SocialMedia
                        ratioFacebook={this.state.ratioFacebook}
                        ratioInstagram={this.state.ratioInstagram}
                        ratioMail={this.state.ratioMail}
                        ratioPhone={this.state.ratioPhone}
                        setIconRatioOn={this.setIconRatioOn}
                        setIconRatioOut={this.setIconRatioOut} 
                    />
                    
                </div>

                <div hidden={this.state.pageupImageClassName === 'pageup__image'} className="pageup__image__fake desktop"> </div>
                <PageUpStrip
                    pageupImageClassName={this.state.pageupImageClassName}
                />
                <div id='fake_pageupstrip'> </div>

                <ContactStrip />
                <CustomersStrip />
                <Footer />
            </div>
        );
    }
} 

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    aboutpage: state.aboutpage
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startSetAboutPage: () => dispatch(startSetAboutPage()),
    startEditAboutPage: (fbAboutpage, aboutpage) => dispatch(startEditAboutPage(fbAboutpage, aboutpage)),
    startEditAboutPageSeo: (seo) => dispatch(startEditAboutPageSeo(seo)),
    startAddAboutImage: (image, order) => dispatch(startAddAboutImage(image, order)),
    startDeleteAboutImage: (fbImages, images, publicid) => dispatch(startDeleteAboutImage(fbImages, images, publicid))
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);  