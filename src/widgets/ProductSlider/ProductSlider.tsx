import React, { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import type { Product } from '../../services/product';
import { ProductCard } from '../ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import './ProductSlider.scss';
import ArrowButton from '../../shared/ui/ArrowButton/ArrowButton';

type Props = {
  layoutText: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ layoutText, products }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="slider">
      <div className="slider__layout">{layoutText}</div>
      <div className="slider__navigation-buttons">
        <ArrowButton 
          onClick={() => swiperRef.current?.slidePrev()} 
          direction='left' 
          isDisabled={isBeginning} 
        />
        <ArrowButton 
          onClick={() => swiperRef.current?.slideNext()} 
          direction='right'
          isDisabled={isEnd} 
        />
      </div>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}

        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        modules={[Navigation]}
        slidesPerView={1.5}
        spaceBetween={16}

        breakpoints={{
        640: {
          slidesPerView: 2.5,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
      >
        {products.map((product) => {
          console.log(product.id);
          return (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
