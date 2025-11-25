import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import AuthArrowIcon from '../../../shared/assets/icons/auth-arrow.svg?react';
import './AuthSlider.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';
import { SlideIn } from '../../../shared/animation/SlideIn';

type Props = {
  slides: string[];
};

export const AuthSlider: React.FC<Props> = ({ slides }) => {
  const { t } = useTranslation('auth');
  return (
    <SlideIn
      beforeAnimationState={{
        x: -50,
        y: 0,
        opacity: 0,
      }}
    >
      <div className="auth-slider">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="auth-slider__swiper"
          autoplay={{ delay: 5000 }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="auth-slider__slide">
              <img
                src={slide}
                alt={`${t('slideIndex')} ${index}`}
                className="auth-slider__image"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Link className="auth-slider__button" to="/">
          {t('backToWebsite')}
          <AuthArrowIcon />
        </Link>
      </div>
    </SlideIn>
  );
};
