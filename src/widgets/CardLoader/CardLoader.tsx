import { Skeleton } from "@radix-ui/themes";
import "./CardLoader.scss";

export const CardLoader = () => {
  return (
    <article className="product-card product-card--loader">

      <div className="product-card__top">
        <div className="product-card__image-wrapper">
          <Skeleton className="product-card__loader-image" />
        </div>

        <Skeleton className="product-card__loader-title" />

        <div className="product-card__price">
          <Skeleton className="product-card__loader-price-current" />
          <Skeleton className="product-card__loader-price-old" />
        </div>

        <div className="product-card__divider" />

        <ul className="product-card__specs">
          <li><Skeleton className="product-card__loader-spec" /></li>
          <li><Skeleton className="product-card__loader-spec" /></li>
          <li><Skeleton className="product-card__loader-spec" /></li>
        </ul>
      </div>

      <div className="product-card__actions">
        <Skeleton className="product-card__loader-button" />
        <Skeleton className="product-card__loader-favorite" />
      </div>

    </article>
  );
};
