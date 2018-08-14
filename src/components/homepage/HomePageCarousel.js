import React, { Component } from 'react';
import UncontrolledCarousel from '../UncontrolledCarousel';

const itemsDesktop = [
  {
    src: 'https://res.cloudinary.com/orenpro/image/upload/v1534248940/carousel_01.jpg',
    altText: 'Slide 1',
    caption: '',
    header: ''
  },
  {
    src: 'https://res.cloudinary.com/orenpro/image/upload/v1534248940/carousel_02.jpg',
    altText: 'Slide 2',
    caption: '',
    header: ''
  },
  {
    src: 'https://res.cloudinary.com/orenpro/image/upload/v1534248940/carousel_03.jpg',
    altText: 'Slide 3',
    caption: '',
    header: ''
  }
];

const itemsMobile = [
  {
    src: 'https://res.cloudinary.com/orenpro/image/upload/v1534248940/carouselMobile_01.jpg',
    altText: 'Slide 1',
    caption: '',
    header: ''
  },
  {
    src: 'https://res.cloudinary.com/orenpro/image/upload/v1534248940/carouselMobile_02.jpg',
    altText: 'Slide 2',
    caption: '',
    header: ''
  },
  {
    src: 'https://res.cloudinary.com/orenpro/image/upload/v1534248940/carouselMobile_03.jpg',
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