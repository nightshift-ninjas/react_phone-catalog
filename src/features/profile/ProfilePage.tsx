import React, { useEffect, useState } from 'react';
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
import './ProfilePage.scss';
import { OrderCharts } from './components/OrderCharts';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
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
    if (!authLoading && !user) navigate('/auth');
  }, [authLoading, user, navigate]);

  useEffect(() => {
    setSearchParams({ filter, sort });
  }, [filter, sort, setSearchParams]);

  return (
    <div className="profile">
      <section className="profile__section">
        <ProfileInfo user={user} />
      </section>

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
