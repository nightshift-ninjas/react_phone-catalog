import './ProductCard.scss';
import type { Product } from '../../services/product';
import { Button } from '../../shared/ui/Button';
import FavoriteButton from '../../shared/ui/FavoriteButton/FavoriteButton';
import { cartService } from '../../services/cart/cart.services';
import { favoriteService } from '../../services/favorite';
import { useEffect, useState, useContext } from 'react';
import { useAuth } from '../../shared/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/config/routes';
import { LanguageContext } from '../../shared/context/language';

type Props = {
  product: Product;
  onRemove?: () => void;
};

export const BASE_URL = 'src/shared/assets/';

export const ProductCard: React.FC<Props> = ({ product, onRemove }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language: lng } = useContext(LanguageContext)!;

  const [isSelectedCart, setIsSelectedCart] = useState(false);
  const [isSelectedFav, setIsSelectedFav] = useState(false);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const cart = await cartService.getOrCreateCart(user.uid);
      const items = await cartService.fetchCartItems(cart.id);
      setIsSelectedCart(items.some((item) => item.productId === product.id));

      const favs = await favoriteService.fetchFavoritesByUser(user.uid);
      setIsSelectedFav(favs.some((fav) => fav.productId === product.id));
    })();
  }, [user, product.id]);

  function requireLogin() {
    if (!user) {
      navigate(`/${lng}/${ROUTES.login}`);
      return false;
    }
    return true;
  }

  async function onClickCart() {
    if (!requireLogin()) return;

    const cart = await cartService.getOrCreateCart(user!.uid);

    if (!isSelectedCart) {
      await cartService.addItemToCart(cart.id, product.id, 1);
      setIsSelectedCart(true);
    } else {
      await cartService.removeCartItemByProduct(cart.id, product.id);
      setIsSelectedCart(false);
    }
  }

  async function onClickFav() {
    if (!requireLogin()) return;

    if (!isSelectedFav) {
      await favoriteService.addFavorite(user!.uid, product.id);
      setIsSelectedFav(true);
    } else {
      await favoriteService.removeFavoriteByProduct(user!.uid, product.id);
      setIsSelectedFav(false);
      onRemove?.();
    }
  }

  const productLink = `/${lng}/${ROUTES.catalog}/${product.category}/product/${product.id}`;

  return (
    <article className="product-card">
      <Link to={productLink}>
        <div className="product-card__top">
          <div className="product-card__image-wrapper">
            <img
              src={`${BASE_URL}${product.images?.[0] ?? 'placeholder.png'}`}
              alt={product.name || 'Product image'}
              className="product-card__image"
            />
          </div>

          <h6 className="product-card__title">{product.name}</h6>

          <div className="product-card__price">
            <span className="product-card__price-current">
              ${product.priceDiscount}
            </span>
            <span className="product-card__price-old">
              ${product.priceRegular}
            </span>
          </div>

          <div className="product-card__divider" />

          <ul className="product-card__specs">
            <li>
              <span className="spec-name">Screen</span>
              <span>{product.screen}</span>
            </li>
            <li>
              <span className="spec-name">Capacity</span>
              <span>{product.capacity}</span>
            </li>
            <li>
              <span className="spec-name">RAM</span>
              <span>{product.ram}</span>
            </li>
          </ul>
        </div>
      </Link>

      <div className="product-card__actions">
        <Button isSelected={isSelectedCart} onClick={onClickCart}>
          {isSelectedCart ? 'Added' : 'Add to cart'}
        </Button>

        <FavoriteButton isSelected={isSelectedFav} onClick={onClickFav} />
      </div>
    </article>
  );
};
