import { useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ImageSlider.scss';

import video1 from '../../../../shared/assets/video/video-slider.webm';
import img2 from '../../../../shared/assets/img/home-slider-2.webp';
import img3 from '../../../../shared/assets/img/home-slider-3.webp';
import { ArrowButton } from '../../../../shared/ui/ArrowButton';

const ImageSlider = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const mediaFiles = [video1, img2, img3];
  const swiperRef = useRef<SwiperType | null>(null);

  const handleButtonClick = (index: number) => {
    swiperRef.current?.slideTo(index);
    setActiveIndex(index);
  };

  return (
    <div className="image-slider">
      <div className="image-slider__wrapper">
        <ArrowButton
          onClick={() => swiperRef.current?.slidePrev()}
          direction="left"
          isDisabled={isBeginning}
        />
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            setActiveIndex(swiper.activeIndex);
          }}
          modules={[Navigation, Pagination]}
          slidesPerView={1}
        >
          {mediaFiles.map((file, index) => (
            <SwiperSlide key={index}>
              {file.endsWith('.webm') ? (
                <video className="image-slider__media" autoPlay loop muted>
                  <source src={file} type="video/webm" />
                </video>
              ) : (
                <img
                  className="image-slider__img"
                  src={file}
                  alt={`Slide ${index + 1}`}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <ArrowButton
          onClick={() => swiperRef.current?.slideNext()}
          direction="right"
          isDisabled={isEnd}
        />
      </div>
      <div className="image-slider__navigation">
        {mediaFiles.map((_, index) => (
          <button
            key={index}
            className={`image-slider__button ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleButtonClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
