import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReactLoading from "react-loading";
import Loadable from 'react-loadable';
//import Loading from './Loading';

let loadImage = "";
if (navigator.userAgent.toLowerCase().indexOf('msie') > -1 || navigator.userAgent.toLowerCase().indexOf('trident') > -1 ){
    console.log("found");
    loadImage = <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><img src="/images/ie-preloader.gif" /></div>;
} else {
    loadImage = <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><ReactLoading type="spinningBubbles" color="#666665" /></div>;
}


const AboutPage = Loadable({
  loader: () => import('../containers/AboutPage'),
  loading() {
    return loadImage
  }
});

const ContactPage = Loadable({
  loader: () => import('../containers/ContactPage'),
  loading() {
    return loadImage
  }
});

const DifferentPage = Loadable({
  loader: () => import('../containers/DifferentPage'),
  loading() {
    return loadImage
  }
});

const EventsPage = Loadable({
  loader: () => import('../containers/EventsPage'),
  loading() {
    return loadImage
  }
});

const EventPage = Loadable({
  loader: () => import('../containers/EventPage'),
  loading() {
    return loadImage
  }
});

const HomePage = Loadable({
  loader: () => import('../containers/HomePage'),
  loading() {
    return loadImage
  }
});

//import AboutPage from '../containers/AboutPage';
//import ContactPage from '../containers/ContactPage';
//import DifferentPage from '../containers/DifferentPage';
//import EventsPage from '../containers/EventsPage';
//import EventPage from '../containers/EventPage';
//import HomePage from '../containers/HomePage';
import NotFoundPage from '../containers/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SigninPage from '../components/SigninPage';
import { connect } from 'react-redux';

export const history = createHistory();


class AppRouter extends React.Component {
    render() {
        //console.log(this.props);
        return (
            <Router history={history}>
                <div>
                    
                    {
                            this.props.events.categories ?
                            <Switch>
                                <Route path="/" render={(props) => ( <HomePage {...props} />)} exact={true} />
                                <Route path="/about" component={AboutPage} exact={true} />
                                <Route path="/contact" component={ContactPage} exact={true} />
                            
                                    
                                {
                                    this.props.events.categories.map((category, index) => {
                                        return <Route path={`/${category.name.replace(" ", "_").replace(" ", "_")}`} key={category.id} render={(props) => ( <EventsPage {...props} category={category} categoryIndex={index} />)} exact={true} />;
                                    })
                                }
                                {
                                    this.props.events.categories.map((category) => {
                                        return <Route path={`/:event/${category.name.replace(" ", "_").replace(" ", "_")}`} key={category.id} render={(props) => ( <EventPage {...props} categoryName={category.name} categoryId={category.id} />)} exact={true} />;
                                    })
                                }
                                
                                <Route path="/events" component={EventsPage} exact={true} />
                                <Route path="/signin" component={SigninPage} exact={true} />
                                <PublicRoute path="/login" component={LoginPage} exact={true} />
                                <Route path="/קצת_אחרת" component={DifferentPage} exact={true} />
                                <Route component={NotFoundPage} />
                            </Switch>
                            :
                                null

                        }
                        
                </div>
            </Router>
        )
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    events: state.eventspage
});

export default connect(mapStateToProps)(AppRouter);