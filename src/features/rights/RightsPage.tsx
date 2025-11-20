import React from 'react';
import { ProductImageGallery } from '../product-detail/components/ProductImageGallery';

import img00 from "../../shared/assets/img/phones/apple-iphone-7/black/00.webp";
import img01 from "../../shared/assets/img/phones/apple-iphone-7/black/01.webp";
import img02 from "../../shared/assets/img/phones/apple-iphone-7/black/02.webp";
import img03 from "../../shared/assets/img/phones/apple-iphone-7/black/03.webp";
import img04 from "../../shared/assets/img/phones/apple-iphone-7/black/04.webp";

const images = [img00, img01, img02, img03, img04];


export const RightsPage: React.FC = () => {
  return (
    <>
      <h1>Rights Page</h1>

      <ProductImageGallery images={ images } />
    </>
  );
};