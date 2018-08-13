import React from "react";
import Slider from "react-slick";



function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={'customers__next__arrow'}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={'customers__prev__arrow'}
      onClick={onClick}
    />
  );
}

class CustomersStrip extends React.Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      centerMode: true,
      autoplay: true,
      infinite: true,
      variableWidth: true,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
    return (
      <div>
        <Slider className="customers__slider" {...settings}>
          <div>
            <img src="/images/customersStrip/images/galil.png" />
          </div>
          <div>
            <img src="/images/customersStrip/images/cme.png" />
          </div>
          <div>
            <img src="/images/customersStrip/images/bd.png" />
          </div>
          <div>
            <img src="/images/customersStrip/images/unitask.png" />
          </div>
          <div>
            <img src="/images/customersStrip/images/yoelgeva.png" />
          </div>
          <div>
            <img src="/images/customersStrip/images/wedo.png" />
          </div>
          <div>
            <img src="/images/customersStrip/images/technion.png" />
          </div>
          <div>
            <img src="/images/customersStrip/images/taro.png" />
          </div>
          <div>
            <img src="/images/customersStrip/images/hofcarmel.png" />
          </div>
          <div>
            <img src="/images/customersStrip/images/dyckam.png" />
          </div>
        </Slider>
      </div>
    );
  }
}

export default CustomersStrip;