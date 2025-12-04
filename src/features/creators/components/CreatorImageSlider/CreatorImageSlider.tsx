import React from 'react';
import type { CreatorInfo } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './CreatorImageSlider.scss';

type Props = {
  images: CreatorInfo['images'];
};

export const CreatorImageSlider: React.FC<Props> = ({ images }) => {
  return (
    <section className="creator-slider">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        className="swiper-container"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="creator-slider__image-wrapper">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="creator-slider__image"
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div> {/* Bullet pagination */}
      </Swiper>
    </section>
  );
};
