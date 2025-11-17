declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';