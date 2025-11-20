import React, { useEffect, useState } from 'react';
import { useAuth } from '../../shared/hooks';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../shared/ui/Breadcrumb';
import { favoriteService } from '../../services/favorite/favorite.service';
import type { FavoriteItem } from '../../services/favorite/favorite.types';
import './FavoritePage.scss';
import { ProductCard } from '../../widgets/ProductCard';

const FavoritePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRemoveFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/auth');
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
  }, [user, authLoading, navigate]);

  return (
    <div className="favorite">
      <div className="favorite__breadcrumbs">
        <Breadcrumb items={[{ text: 'favorites', link: '/favorite' }]} />
      </div>

      <h1>Favorites</h1>

      {isLoading && <p>Loading favorites...</p>}
      {error && <p className="favorite__error">{error}</p>}

      {!isLoading && favorites.length === 0 && (
        <p>You have no favorite items yet.</p>
      )}

      {!isLoading && favorites.length > 0 && (
        <>
          <p className="favorite__count">{favorites.length} items</p>
          <ul className="favorite__list">
          {favorites.map((fav) => (
            <li key={fav.id} className="favorite__item">
              {fav.product && <ProductCard product={fav.product} onRemove={() => handleRemoveFavorite(fav.id)}/>}
            </li>
          ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FavoritePage;
