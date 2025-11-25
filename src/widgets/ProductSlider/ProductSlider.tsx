import React, { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import type { Product } from '../../services/product';
import { ProductCard } from '../ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import './ProductSlider.scss';

import { ArrowButton } from '../../shared/ui/ArrowButton';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { SlideIn } from '../../shared/animation/SlideIn';

type Props = {
  layoutText: string;
  products: Product[];
  isLoading?: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  layoutText,
  products,
  isLoading = false,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState(1.5);

  const swiperRef = useRef<SwiperType | null>(null);

  const animatedSlidesCount =
    currentSlidesPerView >= 4 ? 4 : currentSlidesPerView >= 2.5 ? 2 : 2;

  return (
    <div className="slider">
      <div className="slider__layout">{layoutText}</div>

      <div className="slider__navigation-buttons">
        <ArrowButton
          onClick={() => swiperRef.current?.slidePrev()}
          direction="left"
          isDisabled={isBeginning}
        />
        <ArrowButton
          onClick={() => swiperRef.current?.slideNext()}
          direction="right"
          isDisabled={isEnd}
        />
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setCurrentSlidesPerView(swiper.params.slidesPerView as number);
        }}
        onBreakpoint={(swiper) => {
          setCurrentSlidesPerView(swiper.params.slidesPerView as number);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        modules={[Navigation]}
        slidesPerView={1.5}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2.5, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))}

        {products.map((product, index) => {
          const shouldAnimate = index < animatedSlidesCount;
          const delay = index * 0.15;

          return (
            <SwiperSlide key={product.id}>
              {shouldAnimate ? (
                <SlideIn beforeAnimationState={{ delay, y: 60, opacity: 0 }}>
                  <ProductCard product={product} />
                </SlideIn>
              ) : (
                <ProductCard product={product} />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
