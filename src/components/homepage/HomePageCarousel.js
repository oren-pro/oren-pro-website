import React, { Component } from 'react';
import UncontrolledCarousel from '../UncontrolledCarousel';

const itemsDesktop = [
  {
    src: 'http://res.cloudinary.com/dccqlnk3t/image/upload/v1534116622/carousel_01_lsqx0l.jpg',
    altText: 'Slide 1',
    caption: '',
    header: ''
  },
  {
    src: 'http://res.cloudinary.com/dccqlnk3t/image/upload/v1534116644/carousel_02_slwqcc.jpg',
    altText: 'Slide 2',
    caption: '',
    header: ''
  },
  {
    src: 'http://res.cloudinary.com/dccqlnk3t/image/upload/v1534141001/carousel_03_a9a2uo.jpg',
    altText: 'Slide 3',
    caption: '',
    header: ''
  }
];

const itemsMobile = [
  {
    src: '/images/homepage/carousel/carouselMobile_01.jpg',
    altText: 'Slide 1',
    caption: '',
    header: ''
  },
  {
    src: '/images/homepage/carousel/carouselMobile_02.jpg',
    altText: 'Slide 2',
    caption: '',
    header: ''
  },
  {
    src: '/images/homepage/carousel/carouselMobile_03.jpg',
    altText: 'Slide 3',
    caption: '',
    header: ''
  }
];

const HomePageCarousel = (props) => <UncontrolledCarousel className="carousel__fade"
                                        slide={false}
                                        pause={false}
                                        controls={false}
                                        keyboard={false}
                                        ride='carousel'
                                        interval='5000'
                                        items={props.media === 'mobile' ? itemsMobile : itemsDesktop}
                                    />;

export default HomePageCarousel;