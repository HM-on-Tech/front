import React from 'react'
import Carousel from "react-multi-carousel";
import { makeStyles } from '@material-ui/core/styles';
import "react-multi-carousel/lib/styles.css";
import CarouselCard from './CarouselCard'

const FeaturedPostCarousel = ( {featuredPosts, countPost} ) => {

  const useStyles = makeStyles({
    carouselPadding: {
      paddingRight: 20,
    },
  });

  const classes = useStyles();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return(
    <>
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      // ssr={true} // means to render carousel on server-side.
      infinite={true}
      // autoPlay={this.props.deviceType !== "mobile" ? true : false}
      autoPlay={true}
      keyBoardControl={true}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      // deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      className={classes.carouselPadding}
      // customRightArrow={<CustomRightArrow />} 
      // customLeftArrow={<CustomLeftArrow />}  
      >
      {featuredPosts.map((post) => (
        <CarouselCard 
        key={`carouselCard-${post.title}`}
        title={post.title}
        post={post}
        id={post.id}
        />
        ))}
    </Carousel>
  </>
  )
}

export default FeaturedPostCarousel