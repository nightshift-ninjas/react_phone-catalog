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
import { useCurrency } from '../../shared/context/currency';
import { convertPrice } from '../../shared/utils';
import type { Currency } from '../CurrencyButton';
import { useFavoriteCount } from '../../shared/context/favorite';
import { useCartCount } from '../../shared/context/cart';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
  onRemove?: () => void;
};

export const BASE_URL = '';

export const ProductCard: React.FC<Props> = ({ product, onRemove }) => {
  const { user } = useAuth();
  const { t } = useTranslation('productCard');
  const { increase: increaseCart, decrease: decreaseCart } = useCartCount();
  const { increase: increaseFav, decrease: decreaseFav } = useFavoriteCount();

  const navigate = useNavigate();
  const { language: lng } = useContext(LanguageContext)!;

  const [isSelectedCart, setIsSelectedCart] = useState(false);
  const [isSelectedFav, setIsSelectedFav] = useState(false);
  const [isCartProcessing, setIsCartProcessing] = useState(false);
  const [isFavProcessing, setIsFavProcessing] = useState(false);

  function requireLogin() {
    if (!user) {
      navigate(`/${lng}/${ROUTES.login}`);
      return false;
    }
    return true;
  }

  async function onClickCart() {
    if (!requireLogin() || isCartProcessing) return;

    setIsCartProcessing(true);

    try {
      const cart = await cartService.getOrCreateCart(user!.uid);

      if (!isSelectedCart) {
        await cartService.addItemToCart(cart.id, product.id, 1);
        setIsSelectedCart(true);
        increaseCart();
      } else {
        await cartService.removeCartItemByProduct(cart.id, product.id);
        setIsSelectedCart(false);
        decreaseCart();
      }
    } catch (error) {
      console.error('Cart operation failed:', error);
    } finally {
      setIsCartProcessing(false);
    }
  }

  async function onClickFav() {
    if (!requireLogin() || isFavProcessing) return;

    setIsFavProcessing(true);

    try {
      if (!isSelectedFav) {
        await favoriteService.addFavorite(user!.uid, product.id);
        setIsSelectedFav(true);
        increaseFav();
      } else {
        await favoriteService.removeFavoriteByProduct(user!.uid, product.id);
        setIsSelectedFav(false);
        onRemove?.();
        decreaseFav();
      }
    } catch (error) {
      console.error('Favorite operation failed:', error);
    } finally {
      setIsFavProcessing(false);
    }
  }

  const productLink = `/${lng}/${ROUTES.catalog}/${product.category}/product/${product.id}`;

  const { rates, currentCurrency } = useCurrency();

  const convertedPriceDiscount = convertPrice(
    product.priceDiscount,
    rates,
    currentCurrency as Currency,
  );

  const convertedPriceRegular = convertPrice(
    product.priceRegular,
    rates,
    currentCurrency as Currency,
  );

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

  return (
    <article className="product-card">
      <Link to={productLink}>
        <div className="product-card__top">
          <div className="product-card__image-wrapper">
            <img
              src={`${BASE_URL}${product.images?.[0] ?? 'placeholder.png'}`}
              alt={product.name || t('productImage')}
              className="product-card__image"
            />
          </div>

          <h6 className="product-card__title">{product.name}</h6>

          <div className="product-card__price">
            <span className="product-card__price-current">
              {convertedPriceDiscount}
            </span>
            <span className="product-card__price-old">
              {convertedPriceRegular}
            </span>
          </div>

          <div className="product-card__divider" />

          <ul className="product-card__specs">
            <li>
              <span className="spec-name">{t('specificationScreen')}</span>
              <span>{product.screen}</span>
            </li>
            <li>
              <span className="spec-name">{t('specificationCapacity')}</span>
              <span>{product.capacity}</span>
            </li>
            <li>
              <span className="spec-name">{t('specificationRAM')}</span>
              <span>{product.ram}</span>
            </li>
          </ul>
        </div>
      </Link>

      <div className="product-card__actions">
        <Button isSelected={isSelectedCart} onClick={onClickCart}>
          {isSelectedCart ? t('addedConfirmation') : t('addToCartAction')}
        </Button>

        <FavoriteButton isSelected={isSelectedFav} onClick={onClickFav} />
      </div>
    </article>
  );
};
