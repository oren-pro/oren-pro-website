import React from 'react';
import {Helmet} from 'react-helmet';
import { Button } from "react-bootstrap";
import Modal from 'react-responsive-modal';
import ContactStrip from '../components/contactpage/ContactStrip';
import CustomersStrip from '../components/common/CustomersStrip';
import Footer from '../components/common/Footer';
import HomePagePleased from '../components/homepage/HomePagePleased';
import HomePagePleasedMobile from '../components/homepage/HomePagePleasedMobile';
import HomePageEvents from '../components/homepage/HomePageEvents';
import HomePageEventsToolbar from '../components/homepage/HomePageEventsToolbar';
import HomePageIntouch from '../components/homepage/HomePageIntouch';
import HomePageTell from '../components/homepage/HomePageTell';
import Navigation from '../components/common/Navigation';
import PageUpStrip from '../components/common/PageUpStrip';
import SocialMedia from '../components/common/SocialMedia';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import {
    startEditHomePage,
    startSetHomePage,
    startAddHomePageTell,
    startEditHomePageSeo
} from '../actions/homepage';
import $ from 'jquery';
import { iconRatioOn } from '../reusableFunctions/iconRatioOn';
import { iconRatioOut } from '../reusableFunctions/iconRatioOut';
import { handlePageScroll } from '../reusableFunctions/handlePageScroll';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            ratio: 1,
            ratioFacebook: 1,
            ratioInstagram: 1,
            ratioMail: 1,
            ratioPhone: 1,
            ratioGreenArrow: 1,
            homepageOrigin: {},
            homepage: {},
            localTell: [],
            tellIndex: 0,
            pageupImageClassName: 'pageup__image__absolute__homepage',
            navigation: {},
            seoHomepageModalIsOpen: false,
            seo: {
                title: '',
                description: '',
                keyWords: '',
            }
        }
    }


    setData = (e) => {
		const { value, dataset } = e.target;
		const { name, index, field, action } = dataset;
		const homepage = JSON.parse(JSON.stringify(this.state.homepage));

        switch (action) {
			case "setString":
                //console.log(value);
                if (field) {
                    if( name === "tell" ) {
                        // console.log(homepage);
                        // console.log(name);
                        // console.log(index);
                        // console.log(field);
                        //homepage[name[index]][field] = value;
                        homepage[name][index][field] = value;
                    } else {
                        homepage[name][index][field] = value;
                    }
                } else {
                    homepage[name] = value;
                }
                
                //console.log(homepage);
                break;
			default:
				break;
        };

        this.setState({
            homepage: homepage
        });

        this.setLocalTell(JSON.parse(JSON.stringify(homepage)));        
        // if(isEqual(this.state.itemOrigin,itemUpdate)){ 
        //     window.removeEventListener("beforeunload", this.unloadFunc);
        // } else {
        //     window.addEventListener("beforeunload", this.unloadFunc);
        // }
	}

    uploadWidget = (e) => {
        const { dataset } = e.target;
        const { name, index, field, action } = dataset;
        const homepage = JSON.parse(JSON.stringify(this.state.homepage));
        var myUploadWidget;
        myUploadWidget = cloudinary.openUploadWidget({ 
            cloud_name: 'dccqlnk3t', 
            upload_preset: 'yardnmw1', 
            // tags: ['test'],
            sources: [
                "local",
                "url",
                "image_search",
                "facebook",
                "dropbox",
                "instagram",
                "camera"
            ],
            //UI Customization
            // styles: {
            //     palette: {
            //         window: "#10173a",
            //         sourceBg: "#20304b",
            //         windowBorder: "#9999ff",
            //         tabIcon: "#33ffcc",
            //         inactiveTabIcon: "#0e2f5a",
            //         menuIcons: "#ffccff",
            //         link: "#ff0066",
            //         action: "#33ffcc",
            //         inProgress: "#00ffcc",
            //         complete: "#33ff00",
            //         error: "#cc3333",
            //         textDark: "#000000",
            //         textLight: "#ffffff"
            //     }
            // },
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
                // if (result) {
                //     console.log(result);
                //     homepage[name][index][field] = result[0].url;
                //     this.setState({
                //         homepage: homepage
                //     })
                //     this.setLocalTell(JSON.parse(JSON.stringify(homepage)));
                // }
                if (result.event === "success") {
                    console.log(result);
                    //Step 2.4:  Call the .close() method in order to close the widget
                    myUploadWidget.close();
                }
            }
        );
        myUploadWidget.open();
    }

    // update database

    onUpdateHomePage = () => {
        const homepage = JSON.parse(JSON.stringify(this.state.homepage));
        this.props.startEditHomePage({
            homepage: homepage
        });
        this.setState(() => ({ homepageOrigin: homepage }));
    }




    handleScroll = () => {
        this.setState( handlePageScroll( this.state.pageupImageClassName, this.props.navigation, this.state.navigation.homepageCarouselDone ));
    }


    componentDidMount = () => {

        window.addEventListener('scroll', this.handleScroll);

        if (this.props.navigation.homepageCarouselDone === true) {
            console.log('setting');
            this.setState({
                pageupImageClassName: 'pageup__image__absolute',
                navigation: this.props.navigation
            });
        } else {
            this.setState({
                navigation: this.props.navigation
            });
        }
        
        

        this.props.startSetHomePage().then(()=> {
            const homepage = JSON.parse(JSON.stringify(this.props.homepage));

            console.log(homepage);

            if (!homepage.seo) {
                homepage.seo = {
                    title: '',
                    description: '',
                    keyWords: ''
                }
            }
            
            this.setState({
                seo: homepage.seo,
                homepage: JSON.parse(JSON.stringify(this.props.homepage)),
                homepageOrigin: JSON.parse(JSON.stringify(this.props.homepage)),
            });
            this.setLocalTell(JSON.parse(JSON.stringify(this.props.homepage)));
        });
    }


    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }


    addNewTell = () => {
        const homepage = JSON.parse(JSON.stringify(this.state.homepage));
        //console.log(homepage);
        this.props.startAddHomePageTell(homepage);
    }

    setLocalTell = (homepage) => {
        //console.log(homepage.tell);
        const obj = homepage.tell;
        if ( obj ){
            var localTell = Object.keys(obj).map((key) => {
                const keyedObj = {id: String(key), ...obj[key]};
                return [keyedObj];
            });
            this.setState({
                localTell: localTell
            });
        }
    }

    setTellIndex = (e) => {
        const tellIndex = e.target.dataset.index;
        //console.log(tellIndex);
        this.setState(() => ({ tellIndex: tellIndex }));
    }


    setIconRatioOn = (e) => {
        this.setState(iconRatioOn(e));
    }

    setIconRatioOut = (e) => {
        this.setState(iconRatioOut(e));
    }


    onToggleHomepageSeo = () => {
        console.log('in seo');
        this.setState({
            seoHomepageModalIsOpen: !this.state.seoHomepageModalIsOpen
        });
        console.log(this.state.seoHomepageModalIsOpen);
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

    updateHomepageSeo = () => {
        const seo = this.state.seo;
        this.props.startEditHomePageSeo(seo);
        this.onToggleHomepageSeo();
    }



    render() {
        return (
            <div className="container-fluid">

                <Helmet>
                    <title>{`אורן הפקות - מפיקי אירועים | מפיקת אירועים - ${this.state.eventName} - ${this.state.seo.title}`}</title>
                    <meta name="description" content={this.state.seo.description} />
                </Helmet>

                <Modal open={this.state.seoHomepageModalIsOpen} onClose={this.onToggleHomepageSeo} center dir="rtl">
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
                        <Button bsStyle="success" onClick={this.updateHomepageSeo}>עדכון</Button>
                    </div>
                </Modal>






                
                <Navigation {...this.props} categories={this.props.eventsCategories}/>
                <div className="homepage__structure">
                    <div className="homepage__left">

                        { 
                            this.props.isAuthenticated === true ? 
                                <div className="about__edit__panel__box">
                                    <div className="about__edit__panel">
                                        <button className="backoffice_button" onClick={this.onUpdateHomePage}>
                                            <img className="backoffice_icon" src="/images/backoffice/save.svg" />
                                        </button>
                                        <br />
                                        <button className="backoffice_button" onClick={this.props.startLogout}>
                                            <img className="backoffice_icon" src="/images/backoffice/exit.svg" />
                                        </button>
                                        <br />
                                        <button className="backoffice_button" onClick={this.onToggleHomepageSeo}>
                                            seo
                                        </button>
                                    </div>
                                </div>
                            :
                                null
                        }

                        <HomePagePleased
                            {...this.props}
                            field='pleasedText'
                            action='setString'
                            homepage={this.state.homepage}
                            homepageOrigin={this.state.homepageOrigin}
                            onChange={this.setData}
                        />
                        <HomePagePleasedMobile
                            {...this.props}
                            field='pleasedText'
                            action='setString'
                            homepage={this.state.homepage}
                            homepageOrigin={this.state.homepageOrigin}
                            onChange={this.setData}
                        />
                        <HomePageEvents 
                            {...this.props}
                            action='setString'
                            name='events'
                            homepage={this.state.homepage}
                            homepageOrigin={this.state.homepageOrigin}
                            onChange={this.setData}
                            uploadWidget={this.uploadWidget}
                            ratioGreenArrow={this.state.ratioGreenArrow}
                            setIconRatioOn={this.setIconRatioOn}
                            setIconRatioOut={this.setIconRatioOut} 
                        />
                        <HomePageIntouch />
                        <HomePageTell 
                            {...this.props}
                            action='setString'
                            name='tell'
                            homepage={this.state.homepage}
                            homepageOrigin={this.state.homepageOrigin}
                            tellIndex={this.state.tellIndex}
                            localTell={this.state.localTell}
                            uploadWidget={this.uploadWidget}
                            setTellIndex={this.setTellIndex}
                            onChange={this.setData}
                            addNewTell={this.addNewTell}
                        />
                        <HomePageEventsToolbar />
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
    eventsCategories: state.eventspage,
    homepage: state.homepage,
    navigation: state.navigation
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startAddHomePageTell: (homepage) => dispatch(startAddHomePageTell(homepage)),
    startSetHomePage: () => dispatch(startSetHomePage()),
    startEditHomePage: (updates) => dispatch(startEditHomePage(updates)),
    startEditHomePageSeo: (seo) => dispatch(startEditHomePageSeo(seo))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);            