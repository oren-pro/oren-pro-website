import React from 'react';
import {Helmet} from 'react-helmet';
import { Button } from "react-bootstrap";
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
import { startSetAboutPage, startEditAboutPage, startEditAboutPageSeo } from '../actions/aboutpage';
import $ from 'jquery';
import { iconRatioOn } from '../reusableFunctions/iconRatioOn';
import { iconRatioOut } from '../reusableFunctions/iconRatioOut';
import { handlePageScroll } from '../reusableFunctions/handlePageScroll';


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
            seoAboutpageModalIsOpen: false,
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
            fbAboutpage[item.index] = item;
        });
        this.props.startEditAboutPage(fbAboutpage, aboutpage);
        this.setState(() => ({ aboutpageOrigin: aboutpage }));
    }



    handleScroll = () => {
        this.setState(handlePageScroll(this.state.pageupImageClassName));
    }


    componentDidMount = () => {
        
        window.addEventListener('scroll', this.handleScroll);

        this.props.startSetAboutPage().then(()=> {
            console.log(this.props.aboutpage);

            let aboutpage= [];
            const obj = JSON.parse(JSON.stringify(this.props.aboutpage));
            if ( obj ){
                Object.keys(obj).map((key) => {
                    const keyedObj = {index: String(key), ...obj[key]};
                    aboutpage.push(keyedObj);
                });
                console.log(aboutpage[aboutpage.length-1].title);
                // if (!aboutpage[aboutpage.length-1].title) {
                //     aboutpage.push([seo: {
                //         title: '',
                //         description: '',
                //         keyWords: ''
                //     }]
                // }
                console.log(aboutpage);
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
                
                <Navigation />
                <div className="about__structure">
                {console.log(this.props.aboutpage)}
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
                                    
                                    return  index < this.state.aboutpage.length - 1 ?
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
                        <div className="about__content__images">
                            <img className="about__content__image" src="https://res.cloudinary.com/orenpro/image/upload/v1534248940/img1.jpg" />
                            <img className="about__content__image" src="https://res.cloudinary.com/orenpro/image/upload/v1534248940/img2.jpg" />
                            <img className="about__content__image" src="https://res.cloudinary.com/orenpro/image/upload/v1534248940/img3.jpg" />
                            <img className="about__content__image desktop_inline" src="https://res.cloudinary.com/orenpro/image/upload/v1534248940/img4.jpg" />
                            <img className="about__content__image mobile_inline" src="https://res.cloudinary.com/orenpro/image/upload/v1534248940/img4-mobile.jpg" />
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
    startEditAboutPageSeo: (seo) => dispatch(startEditAboutPageSeo(seo))
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);  