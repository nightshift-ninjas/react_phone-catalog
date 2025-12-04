import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../shared/hooks';
import { ProfileInfo } from './components/ProfileInfo';
import { OrderTable } from './components/OrderTable';
import { OrderFilter } from './components/OrderFilter';
import {
  OrderFilterMethods,
  OrderSortFields,
} from './components/OrderFilter/types';
import { useUserOrders } from './hooks';
import { LanguageContext } from '../../shared/context/language';
import { ROUTES } from '../../shared/config/routes';
import './ProfilePage.scss';
import { OrderCharts } from './components/OrderCharts';
import { SlideIn } from '../../shared/animation/SlideIn';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { language: lng } = useContext(LanguageContext)!;
  const { user, loading: authLoading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilter =
    (searchParams.get('filter') as OrderFilterMethods) ||
    OrderFilterMethods.ALL;

  const initialSort =
    (searchParams.get('sort') as OrderSortFields) || OrderSortFields.CREATED_AT;

  const [filter, setFilter] = useState<OrderFilterMethods>(initialFilter);
  const [sort, setSort] = useState<OrderSortFields>(initialSort);

  const { orders } = useUserOrders(user?.uid, filter, sort);

  useEffect(() => {
    if (!authLoading && !user) navigate(`/${lng}/${ROUTES.auth}`);
  }, [authLoading, user, navigate, lng]);

  useEffect(() => {
    setSearchParams({ filter, sort });
  }, [filter, sort, setSearchParams]);

  return (
    <div className="profile">
      <SlideIn beforeAnimationState={{ y: 0, scale: 0.5 }}>
        <section className="profile__section">
          <ProfileInfo user={user} />
        </section>
      </SlideIn>

      <section className="profile__section">
        <OrderCharts orders={orders} />
      </section>

      <section className="profile__section">
        <OrderFilter
          filter={filter}
          onFilter={(changes) => {
            if (changes.filter) setFilter(changes.filter);
            if (changes.sort) setSort(changes.sort);
          }}
        />

        <OrderTable orders={orders} />
      </section>
    </div>
  );
};
