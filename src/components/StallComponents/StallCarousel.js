import Reacct, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductTile from "./ProductTile";
// https://github.com/YIZHUANG/react-multi-carousel

function StallCarousel(props){

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  var [selected, setSelected] = useState(props.data.length > 2 ? 1 : 0);

  return <>
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      partialVisible={false}
      centerMode={false}
      focusOnSelect={false}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      autoPlay={props.deviceType !== "mobile" ? false : false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      beforeChange={(nextSlide, { currentSlide, onMove }) => {
        if(nextSlide > currentSlide) 
          setSelected(selected + 1);
        else{
          setSelected(selected - 1);
        }
      }}
    >
      {
      props.data.map((item, index) => (
        <div key = {index} className="my-5">{<ProductTile item={item} onChange={() => props.moreDetails(item)} selected = {(index - 1) == selected ? true : false}/>}</div>
      ))
      }
    </Carousel>
  </>
}
export default StallCarousel;