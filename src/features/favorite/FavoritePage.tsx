import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../../shared/hooks';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../shared/ui/Breadcrumb';
import { favoriteService } from '../../services/favorite/favorite.service';
import type { FavoriteItem } from '../../services/favorite/favorite.types';
import './FavoritePage.scss';
import { ProductCard } from '../../widgets/ProductCard';
import { LanguageContext } from '../../shared/context/language';
import { ROUTES } from '../../shared/config/routes';
import { useTranslation } from 'react-i18next';

const FavoritePage: React.FC = () => {
  const navigate = useNavigate();
  const { language: lng } = useContext(LanguageContext)!;
  const { user, loading: authLoading } = useAuth();
  const { t } = useTranslation('favoritePage');

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRemoveFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate(`/${lng}/${ROUTES.auth}`);
      return;
    }

    const loadFavorites = async () => {
      setIsLoading(true);
      setError('');

      try {
        const favs = await favoriteService.fetchFavoritesByUser(user.uid);
        setFavorites(favs);
      } catch (err) {
        setError(`Failed to load favorites: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [user, authLoading, navigate, lng]);

  return (
    <div className="favorite">
      <div className="favorite__breadcrumbs">
        <Breadcrumb
          items={[
            { text: t('favoritesTitle'), link: `/${lng}/${ROUTES.favorite}` },
          ]}
        />
      </div>

      <h1>{t('favoritesTitle')}</h1>

      {isLoading && <p>Loading favorites...</p>}
      {error && <p className="favorite__error">{error}</p>}

      {!isLoading && favorites.length === 0 && <p>{t('noFavorites')}</p>}

      {!isLoading && favorites.length > 0 && (
        <>
          <p className="favorite__count">
            {t('itemCount', { count: favorites.length })}
          </p>
          <ul className="favorite__list">
            {favorites.map((fav) => (
              <li key={fav.id} className="favorite__item">
                {fav.product && (
                  <ProductCard
                    product={fav.product}
                    onRemove={() => handleRemoveFavorite(fav.id)}
                  />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FavoritePage;
