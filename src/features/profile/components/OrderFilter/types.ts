export enum OrderFilterMethods {
  ALL = 'all',
  UNFULFILLED = 'unfulfilled',
  UNPAID = 'unpaid',
  OPEN = 'open',
  CLOSED = 'closed',
}

export const OrderFilterLabels: Record<OrderFilterMethods, string> = {
  [OrderFilterMethods.ALL]: 'All',
  [OrderFilterMethods.UNFULFILLED]: 'Unfulfilled',
  [OrderFilterMethods.UNPAID]: 'Unpaid',
  [OrderFilterMethods.OPEN]: 'Open',
  [OrderFilterMethods.CLOSED]: 'Closed',
};

export enum OrderSortFields {
  CREATED_AT = 'createdAt',
  ITEMS = 'items',
  TOTAL = 'total',
}

export const OrderSortLabels: Record<OrderSortFields, string> = {
  [OrderSortFields.CREATED_AT]: 'Sort by Date',
  [OrderSortFields.ITEMS]: 'Sort by Items',
  [OrderSortFields.TOTAL]: 'Sort by Total Amount',
};
