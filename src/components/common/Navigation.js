import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import HomePageCarousel from '../homepage/HomePageCarousel';
import IconHoverChange from './IconHoverChange';
import { connect } from 'react-redux';
import { setHomePageCarouselDone } from '../../actions/navigation';
import $ from 'jquery';
import IconHoverGrow from './IconHoverGrow';
import { stringReplace } from '../../reusableFunctions/stringReplace';


const pageToTopD = () => {
  if (typeof(window) !== "undefined") {
    TweenLite.to(window, 0.7, {scrollTo:{y:$("#navbarD").offset().top+20}})
  }
}


const pageToTopM = () => {
  if (typeof(window) !== "undefined") {
    TweenLite.to(window, 0.7, {scrollTo:{y:$("#navbarM").offset().top+20}})
  }
}



class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      fixed: 'none',
      isOpen: false,
      accessibilityIcon: 'accessibility',
      eventsCategoriesReverse: [],
      windowWidth: undefined
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  fixedTop = () => {
    if ( this.state.windowWidth ) {
      document.getElementsByClassName("navbar-light")[1].style.position = "fixed";
      document.getElementsByClassName("navbar-light")[1].style.top = 0;
      document.getElementById('fakeNav').style.display = "block";
    }
    if ( this.state.windowWidth < 769 ) {
      document.getElementById('hp_carousel_mobile').style.position = "absolute";
      document.getElementById('hp_carousel_mobile').style.opacity = 0;
      document.getElementById('hp_carousel_mobile').style.zIndex = -1;
      window.scrollTo(0, 0);
    }
    if ( this.state.windowWidth > 768 ) {
      document.getElementById('hp_carousel_desktop').style.display = "none";
      window.scrollTo(0, 0);
    }
    
    
    
    const homepageCarouselDone = true;
    this.props.setHomePageCarouselDone({
        homepageCarouselDone: homepageCarouselDone
    });
    //console.log('setting carousel done');
    this.setState({
        fixed: 'top'
    });
    
  }

  setIconChangeOn = (e) => {
        switch(e.target.dataset.name) {
            case 'accessibility':
                return this.setState({ 
                    accessibilityIcon: 'accessibilityHover'
                });
            default:
                return null;
        }
        
    }

    setIconChangeOut = (e) => {
        switch(e.target.dataset.name) {
            case 'accessibility':
                return this.setState({ 
                    accessibilityIcon: 'accessibility'
                });
            default:
                return null;
        }
    }

  handleLoad = () => {
    if (this.state.page === '/') {
      this.props.showPage();
    }
  }

  componentDidMount = () => {
    window.addEventListener('load', this.handleLoad);
    //console.log($( window ).width());
    //let windowWidth = 0;
    //if (typeof(window) !== "undefined") {
    let windowWidth = $( window ).width();
    //let windowWidth = this.props.windowWidth;
    //}
    this.setState({ 
        windowWidth
    });
    // Returns width of HTML document
    //console.log($( document ).width());

    //console.log("in component did mount check for fixed top");
    if(document.getElementById('enable-toolbar-trigger')) {
      document.getElementById('enable-toolbar-trigger').style.display = "none";
      document.getElementById('enable-toolbar-buttons').style.textAlign = "right";
    }
    
    
    
    //document.body.style.backgroundColor = "#fff";
    let location = '/';
    if (typeof(window) !== "undefined") {
      location = window.location.href;
    }
    //console.log(location);
    const page = location.substring(location.lastIndexOf("/"), location.length);
    this.setState({
      page
    });
    console.log(page);
    if (page.length > 1 || this.props.carouselDone === true) {
      console.log("go to fixed top");
      console.log(this.state.windowWidth);
      if ( this.props.windowWidth < 769 ) {
        document.getElementById('hp_carousel_mobile').style.display = "none";
      }
      if ( this.props.windowWidth > 768 ) {
        document.getElementById('hp_carousel_desktop').style.display = "none";
      }
      this.fixedTop();
    } else {
      if (typeof(window) !== "undefined") {
        window.addEventListener('scroll', this.handleScroll);
      }
    }
  }

  componentDidUpdate = () => {
    if(this.state.eventsCategoriesReverse.length === 0 && this.props.eventsCategories.length > 0){
      this.setReverseCategories();
    }
  }

  componentWillMount = () => {
    if(this.state.eventsCategoriesReverse.length === 0 && this.props.eventsCategories.length > 0){
      this.setReverseCategories();
    }
  }

  setReverseCategories = () => {
    let eventsCategoriesReverse = [];
    this.props.eventsCategories.map((category) => {
        return eventsCategoriesReverse.unshift(category);
    });
    this.setState({
      eventsCategoriesReverse
    });
  }

  componentWillUnmount = () => {
    let location = '/';
    if (typeof(window) !== "undefined") {
      const location = window.location.href;
    }
    const page = location.substring(location.lastIndexOf("/"), location.length);
    if (page === '/') {
      if (typeof(window) !== "undefined") {
        window.removeEventListener('scroll', this.handleScroll);
      }
    }
  }

  handleScroll = () => {
    if ($('#navbarD').css('display') === 'block') {
      var navbarTop = document.getElementById('navbarD').getBoundingClientRect().top;
    } else {
      var navbarTop = document.getElementById('navbarM').getBoundingClientRect().top;
    }
    if (navbarTop < -1 && this.state.fixed === 'none') {
      this.fixedTop();
    }
  }

  

  gotoFacebook = () => {
      if (typeof(window) !== "undefined") {
        window.open('https://www.facebook.com/oren.pro/');
      }
  }
  gotoInstagram = () => {
      if (typeof(window) !== "undefined") {
        window.open('https://www.instagram.com/oren_rinat_pro/');
      }
  }
  gotoMail = () => {
      if (typeof(window) !== "undefined") {
        window.location = 'mailto:info@oren-pro.com';
      }
  }
  gotoPhone = () => {
      if (typeof(window) !== "undefined") {
        window.location = 'tel:049544588';
      }
  }

  toggleAccessibility = () => {
    if ($('#enable-toolbar-content').css('transform') === "matrix(1, 0, 0, 1, 0, 0)" || $('#enable-toolbar-content').css('transform') === "matrix(1, 0, 0, 1, 0, 50)") {
      if (this.props.windowWidth < 768) {
        document.getElementById('enable-toolbar-content').style.transform = "translateY(100%)";
      } else {
        document.getElementById('enable-toolbar-content').style.transform = "translateY(100%)";
      }
    } else {
      if (this.props.windowWidth < 768) {
        document.getElementById('enable-toolbar-content').style.transform = "translateY(50px)";
      } else {
        document.getElementById('enable-toolbar-content').style.transform = "translateY(0)";
      }
    }
  }

  render() {
    console.log(this.props.windowWidth);
    if(this.props.windowWidth === undefined) { // if your component doesn't have to wait for an async action, remove this block 
        return null; // render null when app is not ready
    }
    return (
      
      <div className="container-fluid">

        <div className="collapse__bg__loader" />

            {
              this.props.windowWidth < 769 ?
            
              <div className='mobile' id="hp_carousel_mobile">
                <button className="carousel__button mobile" onClick={pageToTopM}> </button>
                <img className="carousel_logo mobile" src="/images/homepage/carousel/carousel_logo.svg" alt="אורן ורינת הפקות אירועים" onLoad={this.handleLoad} />
                <HomePageCarousel className='mobile' media='mobile' />
              </div>
            :
              <div className='desktop' id="hp_carousel_desktop">
                <button className="carousel__button desktop" onClick={pageToTopD}> </button>
                <img className="carousel_logo desktop" className="carousel_logo" src="/images/homepage/carousel/carousel_logo.svg" alt="אורן ורינת הפקות אירועים" onLoad={this.handleLoad} />
                <HomePageCarousel className='desktop' media='desktop' />
              </div>
            }
        
        
        <div id="fakeNav" className="fakeNav" />
        <Navbar id="navbarD" light className={`container-fluid desktop`} expand="md" fixed={this.state.fixed}>
          <div className="container-fluid navbar__header__container">
            <div className="container-fluid navbar__header">
              <NavbarBrand className="navbar__brand" href="/"><img className="nav__logo" src="/images/navigation/nav_logo.svg" alt="אורן ורינת הפקות אירועים - לוגו" /></NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
            </div>
          </div>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="navbar__nav" className="m-auto" navbar>
              <NavbarBrand className="navbar__brand--desktop" href="/"><img className="nav__logo" src="/images/navigation/nav_logo.svg" alt="אורן ורינת הפקות אירועים - לוגו" /></NavbarBrand>
              <NavItem>
                <NavLink to="/contact" className="nav__link nav__link--padding-top" activeClassName="is-active nav__link--active">צור קשר</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/קצת_אחרת" className="nav__link nav__link--padding-top" activeClassName="is-active nav__link--active">קצת אחרת</NavLink>
              </NavItem>
              {
                  this.state.eventsCategoriesReverse !== [] ?
                      this.state.eventsCategoriesReverse.map((category) => {
                          if(category.navbar === true) {
                            return <NavItem key={category.id}>
                                      <NavLink to={`/${stringReplace(category.name, ' ', '_')}`} className="nav__link nav__link--padding-top" activeClassName="is-active nav__link--active">{category.name}</NavLink>
                                  </NavItem>
                          } else {
                            return null;
                          }
                      })
                  :
                      null
              }
              <NavItem>
                <NavLink to="/about" className="nav__link nav__link--padding-top" activeClassName="is-active nav__link--active">נעים להכיר</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to="/" className="nav__link nav__link--padding-top" activeClassName="is-active nav__link--active">דף הבית</NavLink>
              </NavItem>
              <NavItem className="nav-item--accessibility">
                <div
                  className="nav__link--accessibility"
                  data-name="accessibility"
                  onMouseOver={this.setIconChangeOn}
                  onMouseOut={this.setIconChangeOut}
                  onClick={this.toggleAccessibility}
                  
                >
                  <IconHoverChange
                    icon={this.state.accessibilityIcon} 
                    
                  />
                </div>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>



        <Navbar id="navbarM" light className={`container-fluid mobile`} expand="md" fixed={this.state.fixed}>
          <div className="container-fluid navbar__header__container">
            <div className="container-fluid navbar__header__mobile">
              <NavItem className="nav__link--accessibility">
                <NavLink
                  to="/"
                  className="nav__link--accessibility"
                  data-name="accessibility"
                  onMouseOver={this.setIconChangeOn}
                  onMouseOut={this.setIconChangeOut}
                  onClick={this.toggleAccessibility}
                >
                  <img className="nav__link__accessibility__mobile" src="/images/navigation/accessibility_mobile.svg" alt="נגישות" />
                </NavLink>
              </NavItem>
              <img className="nav__mobile__seperator" src="/images/navigation/nav_icons_seperator.svg" alt="קו הפרדה" />
              <button
                  className="nav__phone__mobile"
                  data-name="phone"
                  onClick={this.gotoPhone}
              >
                  <img className="nav__link__phone__mobile" src="/images/navigation/phone_mobile.svg" alt="טלפון" />
              </button>
              <NavbarBrand className="navbar__brand" href="/"><img className="nav__logo" src="/images/navigation/nav_logo.svg" alt="אורן ורינת הפקות - לוגו" /></NavbarBrand>
              <NavbarToggler className="navbar__toggler ml-auto" onClick={this.toggle} />
            </div>
          </div>
          <Collapse className="navbar__collapse" isOpen={this.state.isOpen} navbar>
            <Nav className="navbar__nav" className="m-auto" navbar>
              <div className="nav__social__box">
                <img className="nav__social__seperator" src="/images/navigation/nav-social-seperator.png" alt="קו הפרדה" />
                <button
                    className="homepage__socialmedia-button mobile_inline"
                    onClick={this.gotoFacebook}
                >
                    <img className="nav__link__facebook__mobile" src="/images/navigation/facebook_mobile.svg" alt="פייסבוק" />
                </button>
                <button
                    className="homepage__socialmedia-button mobile_inline"
                    onClick={this.gotoInstagram}
                >
                    <img className="nav__link__instagram__mobile" src="/images/navigation/instagram_mobile.svg" alt="אינסטגרם" />
                </button>
                <button
                    className="homepage__socialmedia-button mobile_inline"
                    onClick={this.gotoMail}
                >
                    <img className="nav__link__mail__mobile" src="/images/navigation/mail_mobile.svg" alt="אימייל" />
                </button>
                <img className="nav__social__seperator" src="/images/navigation/nav-social-seperator.png" alt="קו הפרדה" />
              </div>
              <NavItem>
                <NavLink to="/contact" className="nav__link nav__link--padding-top" activeClassName="is-active nav__link--active">צור קשר</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/קצת_אחרת" className="nav__link nav__link--padding-top" activeClassName="is-active nav__link--active">קצת אחרת</NavLink>
              </NavItem>
              {
                  this.state.eventsCategoriesReverse !== [] ?
                      this.state.eventsCategoriesReverse.map((category) => {
                          if(category.navbar === true) {
                            return <NavItem key={category.id}>
                                      <NavLink to={`/${stringReplace(category.name, ' ', '_')}`} className="nav__link nav__link--padding-top" activeClassName="is-active nav__link--active">{category.name}</NavLink>
                                  </NavItem>
                          } else {
                            return null;
                          }
                      })
                  :
                      null
              }
              <NavItem>
                <NavLink to="/about" className="nav__link nav__link--padding-top" activeClassName="is-active nav__link--active">נעים להכיר</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to="/" className="nav__link nav__link--padding-top" activeClassName="is-active nav__link--active">דף הבית</NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>





      </div>



      
    );
  };
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    eventsCategories: state.eventspage.categories,
    carouselDone: state.navigation.homepageCarouselDone
});

const mapDispatchToProps = (dispatch) => ({
    setHomePageCarouselDone: (homepageCarouselDone) => dispatch(setHomePageCarouselDone(homepageCarouselDone))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);