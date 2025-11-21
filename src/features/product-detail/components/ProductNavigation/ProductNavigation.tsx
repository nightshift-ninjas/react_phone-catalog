import type React from "react";
import type { Product } from "../../../../services/product";
import { Button } from "../../../../shared/ui/Button";
import FavoriteButton from "../../../../shared/ui/FavoriteButton/FavoriteButton";

import './ProductNavigation.scss';
import { ColorButton } from "../ColorButton";
import type { Colors } from "../ColorButton/ColorTypes";
import { CapacityButton } from "../CapacityButton";
import { useAuth } from "../../../../shared/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cartService } from "../../../../services/cart/cart.services";
import { favoriteService } from "../../../../services/favorite";

type Props = {
  product: Product
};

export const ProductNavigation: React.FC<Props> = ({ product }) => {
 const { user } = useAuth();
  const navigate = useNavigate();

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
      navigate('/auth/login');
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
    }
  }


  const truncatedId = () => {
    if (product.id.length > 10) {
      return `${product.id.slice(0, 10)}...`
    }

    return product.id;
  };

  return (
    <div className="product-navigation">
      <div className="product-navigation__color">
        <div className="product-navigation__label">Available colors</div>
        <div className="product-navigation__color-items">
          {product.colorsAvailable?.map(color => {
            return (
            <ColorButton 
              key={color} 
              onClick={() => {}} 
              isSelected={product.color === color} 
              color={color as Colors} 
            />
          );
          })}
        </div>
      </div>

      <div className="product-navigation__id">ID: {truncatedId()}</div>

      <div className="product-navigation__divider" />

      <div className="product-navigation__capacity">
        <div className="product-navigation__label">Select capacity</div>
        <div className="product-navigation__capacity-items">
          {product.capacityAvailable?.map(capacity => {
            return (
              <CapacityButton 
                key={capacity} 
                ram={capacity} 
                isSelected={product.capacity === capacity} 
              />
            )
          })}
        </div>
      </div>

      <div className="product-navigation__divider" />

      <div className="product-navigation__inner-wrapper">
        {product.priceDiscount ? (
          <div className="product-navigation__price-wrapper">
            <div className="product-navigation__price-discount">${product.priceDiscount}</div>
            <div className="product-navigation__price-regular">${product.priceRegular}</div>
          </div>
        ) : (
          <div className="product-navigation__price">${product.priceRegular}</div>
        )}
        <div className="product-navigation__buttons">
          <Button onClick={onClickCart} isSelected={isSelectedCart}>Add to cart</Button>
          <FavoriteButton onClick={onClickFav} isSelected={isSelectedFav} />
        </div>
      </div>

      <div className="product-navigation__details">
        <div className="product-navigation__screen">
          <div className="product-navigation__label">Screen</div>
          <div className="product-navigation__value">{product.screen}</div>
        </div>
        <div className="product-navigation__resolution">
          <div className="product-navigation__label">Resolution</div>
          <div className="product-navigation__value">{product.resolution}</div>
        </div>
        <div className="product-navigation__processor">
          <div className="product-navigation__label">Processor</div>
          <div className="product-navigation__value">{product.processor}</div>
        </div>
        <div className="product-navigation__ram">
          <div className="product-navigation__label">RAM</div>
          <div className="product-navigation__value">{product.ram}</div>
        </div>
      </div>
    </div>
  );
};