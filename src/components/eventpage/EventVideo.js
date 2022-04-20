import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoContentYT from 'react-video-content-youtube';
import $ from 'jquery';


class EventVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoId: ""
        }
    }

    componentDidMount = () => {
        this.setState({
            videoId: this.props.videoId
        });
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.props.videoId !== prevProps.videoId) {
            this.setState({
                videoId: this.props.videoId
            });
        }
    }

    onVideoIdChange = (e) => {
        this.props.onVideoIdChange(e);
    }

    render() {
        let windowWidth = $( window ).width();
        let videoWidth, videoHeight;
        if(windowWidth < 768) {
            videoWidth = windowWidth * 0.98;
            videoHeight = videoWidth / 64 * 36;
        } else {
            videoWidth = Number($('html').css('fontSize').replace("px", "")) * 68.2;
            videoHeight = videoWidth / 64 * 36;
        }
        const opts = {
            height: videoHeight,
            width: videoWidth,
            playerVars: {
                autoplay: 0,
                rel: 0,
                list: 'playlist',
                loop: 1,
                playlist: this.props.videoId
            }
        };
        let currentItems = this.state.desktopImages;
        if( this.state.media === 'mobile') {
            currentItems = this.state.mobileImages;
        }
        return (
          <div style={{position: 'relative', minHeight: '40px', marginTop: '0.5rem'}}>
            { this.state.videoId != "" ?
                    <VideoContentYT src={this.state.videoId} params={{autoPlay: true}}/>
                :
                    null
            }
            
            { 
                this.props.isAuthenticated === true ?
                    
                        <div className="events__video__input__lable">
                            <div className="backoffice__toolbar__label">
                                Video ID 
                            </div>
                            <input
                                className={`event__video__input`}
                                id="string"
                                type="string"
                                placeholder="video id"
                                value={this.state.videoId}
                                data-field="videoId"
                                data-action='setString'
                                data-name={`item${this.props.index}`}
                                data-index={this.props.index}
                                onChange={this.onVideoIdChange}
                            />
                        </div>
                :
                    null
            }
          </div>
        )
    }

    _onReady(event) {
        event.target.pauseVideo();
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    desktopGallery: state.desktopGallery.desktopGallery,
    mobileGallery: state.mobileGallery.mobileGallery
});

const mapDispatchToProps = (dispatch) => ({
    startAddDesktopGallery: (desktopImage) => dispatch(startAddDesktopGallery(desktopImage)),
    startSetDesktopGallery: (desktopImages) => dispatch(startSetDesktopGallery(desktopImages)),
    startEditDesktopGallery: (desktopImages, fbDesktopImages) => dispatch(startEditDesktopGallery(desktopImages, fbDesktopImages)),
    startDeleteDesktopGallery: (fbDesktopImages, desktopImages, publicId) => dispatch(startDeleteDesktopGallery(fbDesktopImages, desktopImages, publicId)),
    startAddMobileGallery: (mobileImage) => dispatch(startAddMobileGallery(mobileImage)),
    startSetMobileGallery: (mobileImages) => dispatch(startSetMobileGallery(mobileImages)),
    startEditMobileGallery: (mobileImages, fbMobileImages) => dispatch(startEditMobileGallery(mobileImages, fbMobileImages)),
    startDeleteMobileGallery: (fbMobileImages, mobileImages, publicId) => dispatch(startDeleteMobileGallery(fbMobileImages, mobileImages, publicId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventVideo); 