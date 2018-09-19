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


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      fixed: 'none',
      isOpen: false,
      accessibilityIcon: 'accessibility',
      eventsCategoriesReverse: []
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  fixedTop = () => {
    document.getElementsByClassName("navbar-light")[1].style.position = "fixed";
    document.getElementsByClassName("navbar-light")[1].style.top = 0;
    document.getElementById('hp_carousel_mobile').style.display = "none";
    document.getElementById('hp_carousel_desktop').style.display = "none";
    document.getElementById('fakeNav').style.display = "block";
    const homepageCarouselDone = true;
    this.props.setHomePageCarouselDone({
        homepageCarouselDone: homepageCarouselDone
    });
    //console.log('setting carousel done');
    this.setState({
        fixed: 'top'
    });
    window.scrollTo(0, -20);
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

  componentDidMount = () => {
    //console.log("in component did mount check for fixed top");
    document.getElementById('enable-toolbar-trigger').style.display = "none";
    document.getElementById('enable-toolbar-buttons').style.textAlign = "right";
    
    
    //document.body.style.backgroundColor = "#fff";

    const location = window.location.href;
    //console.log(location);
    const page = location.substring(location.lastIndexOf("/"), location.length);
    //console.log(page);
    if (page.length > 1 || this.props.carouselDone === true) {
      //console.log("go to fixed top");
      this.fixedTop();
    } else {
      window.addEventListener('scroll', this.handleScroll);
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
    const location = window.location.href;
    const page = location.substring(location.lastIndexOf("/"), location.length);
    if (page === '/') {
      window.removeEventListener('scroll', this.handleScroll);
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

  pageToTopD = () => {
    TweenLite.to(window, 0.7, {scrollTo:{y:$("#navbarD").offset().top+20}})
  }

  pageToTopM = () => {
    TweenLite.to(window, 0.7, {scrollTo:{y:$("#navbarM").offset().top+20}})
  }

  gotoFacebook = () => {
      window.open('https://www.facebook.com/oren.pro/');
  }
  gotoInstagram = () => {
      window.open('https://www.instagram.com/oren_rinat_pro/');
  }
  gotoMail = () => {
      window.location = 'mailto:info@oren-pro.com';
  }
  gotoPhone = () => {
      window.location = 'tel:0525379515';
  }

  toggleAccessibility = () => {
    //window.StartAccessibility();
    console.log($('#enable-toolbar-content').css('transform'));
    if ($('#enable-toolbar-content').css('transform') === "matrix(1, 0, 0, 1, 0, 0)") {
      //console.log("1");
      //document.getElementById('enable-toolbar-content').style.borderBottom = "1px solid hsla(0,0%,100%,.2)";
      document.getElementById('enable-toolbar-content').style.transform = "translateY(100%)";
    } else {
      //console.log("2");
      //document.getElementById('enable-toolbar-content').style.borderBottom = "1px solid hsla(0,0%,100%,.2)";
      document.getElementById('enable-toolbar-content').style.transform = "translateY(0)";
    }
  }

  render() {
    return (
      <div className="container-fluid">

        <div className="collapse__bg__loader" />

        <div className='mobile' id="hp_carousel_mobile">
          <button className="carousel__button" onClick={this.pageToTopM}> </button>
          <img className="carousel_logo" src="/images/homepage/carousel/carousel_logo.png" />
          <HomePageCarousel media='mobile' />
        </div>
        <div className='desktop' id="hp_carousel_desktop">
          <button className="carousel__button" onClick={this.pageToTopD}> </button>
          <img className="carousel_logo" className="carousel_logo" src="/images/homepage/carousel/carousel_logo.png" />
          <HomePageCarousel media='desktop' />
        </div>
        <div id="fakeNav" className="fakeNav" />
        <Navbar id="navbarD" light className={`container-fluid desktop`} expand="md" fixed={this.state.fixed}>
          <div className="container-fluid navbar__header__container">
            <div className="container-fluid navbar__header">
              <NavbarBrand className="navbar__brand" href="/"><img className="nav__logo" src="/images/navigation/nav_logo.png" /></NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
            </div>
          </div>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="navbar__nav" className="m-auto" navbar>
              <NavbarBrand className="navbar__brand--desktop" href="/"><img className="nav__logo" src="/images/navigation/nav_logo.png" /></NavbarBrand>
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
                  <img className="nav__link__accessibility__mobile" src="/images/navigation/accessibility_mobile.svg" />
                </NavLink>
              </NavItem>
              <img className="nav__mobile__seperator" src="/images/navigation/nav_icons_seperator.svg" />
              <button
                  className="nav__phone__mobile"
                  data-name="phone"
                  onClick={this.gotoPhone}
              >
                  <img className="nav__link__phone__mobile" src="/images/navigation/phone_mobile.svg" />
              </button>
              <NavbarBrand className="navbar__brand" href="/"><img className="nav__logo" src="/images/navigation/nav_logo.png" /></NavbarBrand>
              <NavbarToggler className="navbar__toggler ml-auto" onClick={this.toggle} />
            </div>
          </div>
          <Collapse className="navbar__collapse" isOpen={this.state.isOpen} navbar>
            <Nav className="navbar__nav" className="m-auto" navbar>
              <div className="nav__social__box">
                <img className="nav__social__seperator" src="/images/navigation/nav-social-seperator.png" />
                <button
                    className="homepage__socialmedia-button mobile_inline"
                    onClick={this.gotoFacebook}
                >
                    <img className="nav__link__facebook__mobile" src="/images/navigation/facebook_mobile.svg" />
                </button>
                <button
                    className="homepage__socialmedia-button mobile_inline"
                    onClick={this.gotoInstagram}
                >
                    <img className="nav__link__instagram__mobile" src="/images/navigation/instagram_mobile.svg" />
                </button>
                <button
                    className="homepage__socialmedia-button mobile_inline"
                    onClick={this.gotoMail}
                >
                    <img className="nav__link__mail__mobile" src="/images/navigation/mail_mobile.svg" />
                </button>
                <img className="nav__social__seperator" src="/images/navigation/nav-social-seperator.png" />
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