import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import AuthArrowIcon from '../../../shared/assets/icons/auth-arrow.svg?react';
import './AuthSlider.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  slides: string[];
};

export const AuthSlider: React.FC<Props> = ({ slides }) => {
  return (
    <div className="auth-slider">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="auth-slider__swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="auth-slider__slide">
            <img
              src={slide}
              alt={`Slide ${index}`}
              className="auth-slider__image"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Link className="auth-slider__button" to="/">
        Back to website
        <AuthArrowIcon />
      </Link>
    </div>
  );
};
