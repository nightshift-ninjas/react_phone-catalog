import './ProductCard.scss'
import type { Product } from "../../services/product";
import { Button } from "../../shared/ui/Button";
import FavoriteButton from '../../shared/ui/FavoriteButton/FavoriteButton';


type Props = {
  product: Product;
  isSelectedCart: boolean;
  onClickFav: () => void;
  onClickCart: () => void;
  isSelectedFav: boolean;

}


export const ProductCard: React.FC<Props> = ({ product, isSelectedCart, isSelectedFav, onClickCart, onClickFav }) => {

  const BASE_URL = 'src/shared/assets/';
  

  return (
     <div className="product-card">
      <div className="product-card__image-wrapper">
        <img src={`${BASE_URL}${product.images![0]}`} alt={product.name} className="product-card__image" />
      </div>

      <h6 className="product-card__title">{product.name}</h6>

      <div className="product-card__price">
        <span className="product-card__price-current">${product.priceDiscount}</span>
        <span className="product-card__price-old">${product.priceRegular}</span>
      </div>

      <div className="product-card__divider" />

      <ul className="product-card__specs">
        <li>
          <span className="spec-name">Screen</span>
          <span className="spec-value">{product.screen}</span>
        </li>
        <li>
          <span className="spec-name">Capacity</span>
          <span className="spec-value">{product.capacity}</span>
        </li>
        <li>
          <span className="spec-name">RAM</span>
          <span className="spec-value">{product.ram}</span>
        </li>
      </ul>

      <div className="product-card__actions">
        <Button isSelected={isSelectedCart} onClick={onClickCart}>
          {isSelectedCart ? "Added" : "Add to cart"}
        </Button>

        <FavoriteButton isSelected={isSelectedFav} onClick={onClickFav}/>
      </div>
    </div>
  );
}