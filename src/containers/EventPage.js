import React from 'react';
import {Helmet} from 'react-helmet';
import AutosizeInput from 'react-input-autosize';
import { Button, Modal as ModalRB, Popover, Tooltip, OverlayTrigger } from "react-bootstrap";
import Modal from 'react-responsive-modal';
import { Prompt } from "react-router";
import ContactStrip from '../components/contactpage/ContactStrip';
import CustomersStrip from '../components/common/CustomersStrip';
import Footer from '../components/common/Footer';
import EventsHeader from '../components/eventspage/EventsHeader';
import EventHeader from '../components/eventpage/EventHeader';
import EventImages from '../components/eventpage/EventImages';
import EventShareStrip from '../components/eventpage/EventShareStrip';
import EventsTabs from '../components/eventspage/EventsTabs';
import EventsText from '../components/eventspage/EventsText';
import EventsEvents from '../components/eventspage/EventsEvents';
import Navigation from '../components/common/Navigation';
import PageUpStrip from '../components/common/PageUpStrip';
import SocialMedia from '../components/common/SocialMedia';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import {
    startAddCategory,
    startSetSubcategories,
    startAddSubcategory,
    startSetItems,
    startAddItem,
    startUpdateEventImage,
    startAddImage,
    startSetImages,
    setSubcategoryId,
    startEditEvent,
    startEditImages,
    startDeleteImage,
    startEditEventSeo,
    startSetAllSubcategories,
    startSetAllEvents
} from '../actions/eventspage';
import $ from 'jquery';
import UncontrolledCarousel from '../components/UncontrolledCarouselSlide';
import { iconRatioOn } from '../reusableFunctions/iconRatioOn';
import { iconRatioOut } from '../reusableFunctions/iconRatioOut';
import { handlePageScroll } from '../reusableFunctions/handlePageScroll';




class EventPage extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.animating = false;
        this.state = {
            ratio: 1,
            ratioFacebook: 1,
            ratioInstagram: 1,
            ratioMail: 1,
            ratioPhone: 1,
            ratioGreenArrow: 1,
            categoryId: '',
            subCategories: [],
            items: [],
            currentItems: [],
            stripItems: [],
            eventName: '',
            eventText: '',
            eventShowLines: 5,
            eventId: '',
            itemLocation: 0,
            slideGalleryModalIsOpen: false,
            newItemNameModalIsOpen: false,
            subcategoryId: '',
            subcategoryName: '',
            imagesOrigin: [],
            images: [],
            galleryImages: [],
            slideGalleryImages: [],
            currentImage: '',
            nextImage: '',
            prevImage: '',
            nextItem: '',
            prevItem: '',
            crouselControlsRight: {marginLeft: '0px'},
            pageupImageClassName: 'pageup__image__absolute',
            seoEventModalIsOpen: false,
            seo: {
                title: '',
                description: '',
                keyWords: '',
            }
        }
    }

    setIconRatioOn = (e) => {
        this.setState(iconRatioOn(e));
    }

    setIconRatioOut = (e) => {
        this.setState(iconRatioOut(e));
    }

    

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.event !== this.props.match.params.event) {
            const eventName = this.props.match.params.event.replace("_", " ").replace("_", " ");
            this.setState({
                eventName
            });
            const categoryId = this.props.categoryId;
            if (!this.props.eventsObject[this.props.categoryId]) {
                this.props.startSetSubcategories(categoryId).then((subCategories)=> {
                    this.setState({
                        subCategories
                    });
                    this.props.startSetItems(categoryId).then((items)=> {
                        this.setState({
                            items
                        });
                        this.getEventId(eventName, this.state.items);
                    });
                });
            } else if (this.props.eventsObject[this.props.categoryId] && !this.props.eventsObject[this.props.categoryId+'items']) {
                this.props.startSetItems(categoryId).then((items)=> {
                    this.setState({
                        subCategories: this.props.eventsObject[this.props.categoryId],
                        items
                    });
                    this.getEventId(eventName, this.state.items);
                });
            } else {
                this.setState({
                    subCategories: this.props.eventsObject[this.props.categoryId],
                    items: this.props.eventsObject[this.props.categoryId+'items']
                });
                this.getEventId(eventName, this.props.eventsObject[this.props.categoryId+'items']);
            }
        }
    }

    getEventId = (eventName, items) => {
        let eventId = '';
        let eventText = '';
        let seo = {};
        items.map((item) => {
            if (eventName === item.name) {
                eventId = item.id;
                eventText = item.text;
                if (!item.seo) {
                    item.seo = {
                        title: '',
                        description: '',
                        keyWords: ''
                    }
                }
                this.setState({
                    seo: item.seo
                });
            }
        });

        const currentItems = [];
        if ( this.props.eventsObject.subcategoryId === undefined || this.props.eventsObject.subcategoryId === '' ) {
            items.map((item, index) => {
                currentItems.push(item);
            });
        } else {
            items.map((item, index) => {
                if(item.subcategories[this.props.eventsObject.subcategoryId]){
                    currentItems.push(item);
                }
            });
        }
        
        const stripItems = [];
        let itemLocation = 0;
        let nextItem = '';
        let prevItem = '';
        let inId = '';
        let inName = '';
        let firstListName = '';
        let lastListName = '';
        let inPrevName = '';
        let doneId = false;
        currentItems.map((item, index) => {
            if (index === 0) {
                firstListName = item.name.replace(" ", "_").replace(" ", "_");
            } else if (index === currentItems.length-1) {
                lastListName = item.name.replace(" ", "_").replace(" ", "_");
            }
            inId = item.id;
            inName = item.name.replace(" ", "_").replace(" ", "_");
            if (item.id === eventId) {
                prevItem = inPrevName;
                doneId = true;
                itemLocation = index;
            } else {
                if (doneId) {
                    nextItem = inName;
                    doneId = false;
                }
                stripItems.push(item);
            }
            inPrevName = item.name.replace(" ", "_").replace(" ", "_");
        });
        if (prevItem === '') {
            prevItem = lastListName;
        }
        if (nextItem === '') {
            nextItem = firstListName;
        }
 
        let start = 0;
        let end = stripItems.length;
        if (end > 3) {
            for (var i=0; i<3; i++) {
                let randomIndex = Math.floor(Math.random() * (end - start)) + start;
                let selectedItem = stripItems[randomIndex];
                stripItems[randomIndex] = stripItems[start];
                stripItems[start] = selectedItem;
                start++;
            }
            stripItems.splice(3, stripItems.length-3);
        }

        this.setState({
            eventId,
            eventText,
            itemLocation,
            nextItem,
            prevItem,
            currentItems,
            stripItems
        });

        this.props.startSetImages(eventId, this.props.categoryId, itemLocation).then((images)=> {
            images.sort((a, b) => {
                return a.eventsIds[eventId+'order'] > b.eventsIds[eventId+'order'] ? 1 : -1;
            });
            const galleryImages = [];
            images.map((image) => {
                return galleryImages.push({
                    publicId: image.publicId,
                    image: image,
                    id: image.id,
                    order: image.eventsIds[eventId+'order'],
                    src: image.imageUrl,
                    alt: image.imageText,
                    width: image.imageWidth,
                    height: image.imageHeight
                });
            });
            const slideGalleryImages = [];
            images.map((image) => {
                let imageWidth = image.imageWidth;
                let imageHeight = image.imageHeight;
                let ratioWidth = 1;
                let ratioHeight = 1;
                console.log(imageHeight);
                console.log(imageWidth);

                const windowWidth = $(window).width();
                const windowHeight = $(window).height();

                const maxWidth = windowWidth/3*2;
                const maxHeight = maxWidth/3*2;

                console.log(windowWidth);
                console.log(windowHeight);
                
                //if (imageHeight < maxHeight && imageWidth < maxWidth) {
                    ratioHeight = maxHeight/imageHeight;
                    ratioWidth = maxWidth/imageWidth;
                    if (imageWidth > imageHeight) {
                        console.log('1');
                        imageHeight = ratioWidth*imageHeight;
                        imageWidth = maxWidth;
                    } else {
                        console.log('2');
                        imageHeight = maxHeight;
                        imageWidth = ratioHeight*imageWidth;
                    }
                //}

                console.log(ratioHeight);
                console.log(ratioWidth);
                console.log(imageHeight);
                console.log(imageWidth);
                return slideGalleryImages.push({
                    publicId: image.publicId,
                    image: image,
                    id: image.id,
                    order: image.eventsIds[eventId+'order'],
                    src: image.imageUrl,
                    altText: image.imageText,
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
    }

    handleScroll = () => {
        this.setState(handlePageScroll(this.state.pageupImageClassName));
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);

        let subcategoryId = '';
        if (this.props.eventsObject.subcategoryId) {
            subcategoryId = this.props.eventsObject.subcategoryId;
        } 
        
        this.setState({
            subcategoryId
        });

        this.props.startSetAllSubcategories().then(() => {
            this.setState({
                allSubCategories: JSON.parse(JSON.stringify(this.props.eventsObject.allSubCategories))
            });
            this.props.startSetAllEvents().then(() => {
                console.log(this.props.eventsObject.allEvents);
                this.setState({
                    allEvents: JSON.parse(JSON.stringify(this.props.eventsObject.allEvents))
                });
                console.log(this.props.eventsObject.subcategoryId);
                if (this.props.eventsObject.subcategoryId === undefined || this.props.eventsObject.subcategoryId === '') {
                    this.setState({
                        subcategoryName: 'הכל'
                    });
                } else {
                    this.props.eventsObject.allSubCategories.map((subcategory, index) => {
                        console.log(subcategory);
                        if(subcategory.id === this.props.eventsObject.subcategoryId) {
                            const subcategoryName = subcategory.name;
                            console.log(subcategoryName);
                            this.setState({
                                subcategoryName
                            });
                        }
                    });
                }
                

            });
        });

        
        //console.log("component mounted ----------------- !!!!!!!!!!!!");
        const eventName = this.props.match.params.event.replace("_", " ").replace("_", " ");
        this.setState({
            eventName
        });
        const categoryId = this.props.categoryId;
        if (!this.props.eventsObject[this.props.categoryId]) {
            this.props.startSetSubcategories(categoryId).then((subCategories)=> {
                //console.log("from 1");
                //console.log(subCategories);
                this.setState({
                    subCategories
                });
                this.props.startSetItems(categoryId).then((items)=> {
                    this.setState({
                        items
                    });
                    this.getEventId(eventName, this.state.items);
                });
            });
        } else if (this.props.eventsObject[this.props.categoryId] && !this.props.eventsObject[this.props.categoryId+'items']) {
            
            this.props.startSetItems(categoryId).then((items)=> {
                //console.log("from 2");
                this.setState({
                    subCategories: this.props.eventsObject[this.props.categoryId],
                    items
                });
                this.getEventId(eventName, this.state.items);
            });
        } else {
            //console.log(this.props.eventsObject[this.props.categoryId]);
            //console.log(this.props.eventsObject[this.props.categoryId+'items']);
            //console.log("from 3");
            this.setState({
                subCategories: this.props.eventsObject[this.props.categoryId],
                items: this.props.eventsObject[this.props.categoryId+'items']
            });
            this.getEventId(eventName, this.props.eventsObject[this.props.categoryId+'items']);
        }
    }



    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }



    uploadWidget = (e) => {
        const { dataset } = e.target;
        const { id } = dataset;
        const eventId = this.state.eventId;
        //console.log(this.state.images);
        //console.log(Number(this.state.images.length)+1);
        //console.log( id );
        cloudinary.openUploadWidget({ cloud_name: 'dccqlnk3t', upload_preset: 'yardnmw1', tags:['test']},
            (error, result) => {
                if (error) {
                    console.log(error);
                }
                if (result) {
                    //console.log(result);
                    //console.log(result[0].public_id)
                    const categoryId = this.props.categoryId;
                    const order = Number(this.state.images.length)+1;
                    const image = {
                        publicId: result[0].public_id,
                        imageUrl: result[0].url,
                        imageWidth: result[0].width,
                        imageHeight: result[0].height,
                        altText: '',
                        events: {
                            [id]: true,
                            [id+'order']: order
                        }
                    };
                        
                    this.props.startAddImage(image, categoryId, order).then((images)=> {
                        images.sort((a, b) => {
                            return a.eventsIds[id+'order'] > b.eventsIds[id+'order'] ? 1 : -1;
                        });
                        const galleryImages = [];
                        images.map((image) => {
                            return galleryImages.push({
                                publicId: image.public_id,
                                image: image,
                                id: image.id,
                                order: image.eventsIds[id+'order'],
                                src: image.imageUrl,
                                alt: image.imageText,
                                width: image.imageWidth,
                                height: image.imageHeight
                            });
                        });
                        const slideGalleryImages = [];
                        images.map((image) => {
                            let imageWidth = image.imageWidth;
                            let imageHeight = image.imageHeight;
                            const ratio = 600/imageHeight;
                            imageWidth = ratio*imageWidth;
                            imageHeight = ratio*imageHeight;
                            return slideGalleryImages.push({
                                publicId: image.public_id,
                                image: image,
                                id: image.id,
                                order: image.eventsIds[eventId+'order'],
                                src: image.imageUrl,
                                altText: image.imageText,
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
                }
            }
        );
    }













    

    setSubcategoryId = (e) => {
        const subcategoryId = e.target.dataset.id;
        this.setState({
            subcategoryId
        });
        this.props.setSubcategoryId(subcategoryId);
        this.navtoCategoryPage();
    }

    navtoCategoryPage = () => {
        this.props.history.push(`/${this.props.categoryName.replace(" ", "_").replace(" ", "_")}`);
    }

    gotoNextEvent = () => {
        this.props.history.push(`/${this.state.nextItem}/${this.props.categoryName.replace(" ", "_").replace(" ", "_")}`);
    }
    
    gotoPrevEvent = () => {
        this.props.history.push(`/${this.state.prevItem}/${this.props.categoryName.replace(" ", "_").replace(" ", "_")}`);
    }

    onEventRollOver = (e) => {
        //console.log(e.target);
        //console.log(e.target.dataset.id);
        //console.log(e.target.dataset.name);
    }

    // update database . ---   category data ( name, text, showlines - number of lines to show on load)

    onUpdateEvent = () => {
        const eventName = JSON.parse(JSON.stringify(this.state.eventName));
        const eventText = JSON.parse(JSON.stringify(this.state.eventText));
        const eventShowLines = JSON.parse(JSON.stringify(this.state.eventShowLines));
        const eventId = JSON.parse(JSON.stringify(this.state.eventId));
        this.props.startEditEvent(eventName, eventText, eventShowLines, eventId);
        this.setState(() => ({ homepageOrigin: event }));
    }

    onEventNameChange = (e) => {
        const eventName = e.target.value;
        this.setState({
            eventName
        });
    }

    onEventTextChange = (e) => {
        const eventText = e.target.value;
        this.setState({
            eventText
        });
    }

    onEventShowLinesChange = (e) => {
        const eventShowLines = e.target.value;
        this.setState({
            eventShowLines
        });
    }








    onImageOrderBlur = (e) => {
        const images = [];
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
            image.image.eventsIds[eventId+'order'] = Number(index)+1;
            images.push(image.image);
        });
        console.log('images');
        console.log(images);

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
        const categoryId = this.props.categoryId;
        const eventId = this.state.eventId;
        const galleryImages = this.state.galleryImages;
        const images = this.state.images;
        
        const fbImages = {};
        images.map((image, index) => {
            fbImages[image.id] = image;
        })
        this.props.startEditImages( fbImages, images, eventId, categoryId );
    }


    onDeleteImage = (e) => {
        console.log(e.target.dataset.publicid);
        console.log(e.target.dataset.id);
        const id = e.target.dataset.id;
        const order = e.target.dataset.order;
        const publicid = e.target.dataset.publicid;
        const categoryId = this.props.categoryId;
        const eventId = this.state.eventId;
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
            image.image.eventsIds[eventId+'order'] = Number(index)+1;
            images.push(image.image);
        });

        const fbImages = {};
        images.map((image, index) => {
            fbImages[image.id] = image;
        })
        fbImages[id] = null;

        console.log(galleryImages);
        console.log(images);
        console.log(fbImages);
        this.props.startDeleteImage( fbImages, images, eventId, categoryId, publicid );

        const slideGalleryImages = [];
        images.map((image) => {
            let imageWidth = image.imageWidth;
            let imageHeight = image.imageHeight;
            let ratioWidth = 1;
            let ratioHeight = 1;
            console.log(imageHeight);
            console.log(imageWidth);
            
            if (imageHeight < 800 && imageWidth < 1000) {
                ratioHeight = 800/imageHeight;
                ratioWidth = 1000/imageWidth;
                if (ratioHeight > ratioWidth) {
                    console.log('1');
                    imageHeight = ratioHeight*imageHeight;
                    imageWidth = ratioHeight*imageWidth;
                } else {
                    console.log('2');
                    imageHeight = ratioWidth*imageHeight;
                    imageWidth = ratioWidth*imageWidth;
                }
            }

            console.log(ratioHeight);
            console.log(ratioWidth);
            console.log(imageHeight);
            console.log(imageWidth);

            return slideGalleryImages.push({
                publicId: image.public_id,
                image: image,
                id: image.id,
                order: image.eventsIds[eventId+'order'],
                src: image.imageUrl,
                altText: image.imageText,
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


    onToggleEventSeo = () => {
        console.log('in seo');
        this.setState({
            seoEventModalIsOpen: !this.state.seoEventModalIsOpen
        });
        console.log(this.state.seoEventModalIsOpen);
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

    updateEventSeo = () => {
        const seo = this.state.seo;
        const categoryId = this.props.categoryId;
        const eventId = this.state.eventId;
        this.props.startEditEventSeo(seo, categoryId, eventId);
        this.onToggleEventSeo();
    }

    

    render() {
        
        return (
            <div className="container-fluid">
                <Helmet>
                    <title>{`אורן הפקות - ${this.props.categoryName} - ${this.state.eventName} - ${this.state.seo.title}`}</title>
                    <meta name="description" content={this.state.seo.description} />
                </Helmet>

                <Modal open={this.state.seoEventModalIsOpen} onClose={this.onToggleEventSeo} center dir="rtl">
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
                        <Button bsStyle="success" onClick={this.updateEventSeo}>עדכון</Button>
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
                <div className="homepage__structure">
                    <div className="events__left">
                        
                        { 
                            this.props.isAuthenticated === true ? 
                                <div className="about__edit__panel__box">
                                    <div className="about__edit__panel">
                                        <button className="backoffice_button" onClick={this.props.startLogout}>
                                            <img className="backoffice_icon" src="/images/backoffice/exit.svg" />
                                        </button>
                                        <br />
                                        <button className="backoffice_button" onClick={this.onToggleEventSeo}>
                                            seo
                                        </button>
                                    </div>
                                </div>
                            :
                                null
                        }

                        <EventsHeader categoryName={this.props.categoryName} />
                        <EventsTabs
                            categoryId={this.props.categoryId}
                            subcategoryId={this.state.subcategoryId}
                            subCategories={this.state.subCategories}
                            setSubcategoryId={this.setSubcategoryId}
                            startAddNewSubcategory={this.startAddNewSubcategory}
                        />
                        <EventShareStrip 
                            navtoCategoryPage={this.navtoCategoryPage}
                            gotoNextEvent={this.gotoNextEvent}
                            gotoPrevEvent={this.gotoPrevEvent}
                            currentItems={this.state.currentItems}
                        />
                        <EventHeader
                            eventName={this.state.eventName}
                            eventText={this.state.eventText}
                            showLines={this.state.eventShowLines}
                            isAuthenticated={this.props.isAuthenticated}
                            onEventNameChange={this.onEventNameChange}
                            onEventTextChange={this.onEventTextChange}
                            onEventShowLinesChange={this.onEventShowLinesChange}
                            onUpdateEvent={this.onUpdateEvent}
                        />
                        <EventImages 
                            images={this.state.galleryImages}
                            eventId={this.state.eventId}
                            isAuthenticated={this.props.isAuthenticated}
                            uploadWidget={this.uploadWidget}
                            onImageOrderBlur={this.onImageOrderBlur}
                            onImageOrderChange={this.onImageOrderChange}
                            onImageOrderKeyPress={this.onImageOrderKeyPress}
                            updateImages={this.updateImages}
                            onOpenSlideGallery={this.onOpenSlideGallery}
                            onDeleteImage={this.onDeleteImage}
                        />
                        <div className="events__eventshare__share mobile">
                            <p className="events__eventshare__text Heebo-Regular" dir="rtl">אני חייב לשתף את זה!</p>
                            <div className="events__eventshare__phone__mobile" />
                            <div className="events__eventshare__mail__mobile" />
                            <div className="events__eventshare__facebook__mobile" />
                        </div>
                        {this.state.currentItems.length>1 ?
                                <EventsEvents
                                    categoryName={this.props.categoryName}
                                    subcategoryId={this.state.subcategoryId}
                                    subcategoryName={this.state.subcategoryName}
                                    eventName={this.state.eventName}
                                    itemsCurrent={this.state.stripItems}
                                    ratioGreenArrow={this.state.ratioGreenArrow}
                                    setIconRatioOn={this.setIconRatioOn}
                                    setIconRatioOut={this.setIconRatioOut}
                                    onRollOver={this.onEventRollOver}
                                    uploadWidget={this.uploadWidget}
                                    navtoCategoryPage={this.navtoCategoryPage}
                                    oneLine={true}
                                />
                            :
                                null
                        }
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
    eventsObject: state.eventspage
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startAddCategory: (category) => dispatch(startAddCategory(category)),
    startAddSubcategory: (subcategory) => dispatch(startAddSubcategory(subcategory)),
    startSetSubcategories: (categoryId) => dispatch(startSetSubcategories(categoryId)),
    startAddItem: (item) => dispatch(startAddItem(item)),
    startSetItems: (categoryId) => dispatch(startSetItems(categoryId)),
    startUpdateEventImage: (id, image) => dispatch(startUpdateEventImage(id, image)),
    startAddImage: (image, categoryId, order) => dispatch(startAddImage(image, categoryId, order)),
    startSetImages: (eventId, categoryId, itemLocation) => dispatch(startSetImages(eventId, categoryId, itemLocation)),
    setSubcategoryId: (id) => dispatch(setSubcategoryId(id)),
    startEditEvent: (eventName, eventText, eventShowLines, eventId) => dispatch(startEditEvent(eventName, eventText, eventShowLines, eventId)),
    startEditImages: (fbImages, images, eventId, categoryId) => dispatch(startEditImages(fbImages, images, eventId, categoryId)),
    startDeleteImage: (fbImages, images, eventId, categoryId, publicid) => dispatch(startDeleteImage(fbImages, images, eventId, categoryId, publicid)),
    startSetAllSubcategories: () => dispatch(startSetAllSubcategories()),
    startSetAllEvents: () => dispatch(startSetAllEvents()),
    startEditEventSeo: (seo, categoryId, eventId) => dispatch(startEditEventSeo(seo, categoryId, eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);




// <Prompt
//                         style={{background: "red"}}
//                         when={!isEqual(itemOrigin, itemUpdate)}
//                         message="Are you sure you want to leave me?"
//                     />





//this.state.category.showLines



//activeIndex={Number(this.state.currentImage)}