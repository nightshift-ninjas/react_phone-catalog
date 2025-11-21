import React from 'react';
import './ProductImageGallery.scss';
import type { Product } from '../../../../services/product';
import { BASE_URL } from '../../../../widgets/ProductCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  images: Product['images'];
};

export const ProductImageGallery: React.FC<Props> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperType | null>(
    null,
  );

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="product-gallery">
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="vertical"
        slidesPerView={5}
        spaceBetween={0}
        watchSlidesProgress
        modules={[Thumbs]}
        className="product-gallery__thumbs"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="product-gallery__thumb">
            <img
              src={BASE_URL + img}
              alt={`thumb-${index}`}
              className="product-gallery__thumb-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        className="product-gallery__main"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="product-gallery__main-slide">
            <img
              src={BASE_URL + img}
              alt={`image-${index}`}
              className="product-gallery__image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
