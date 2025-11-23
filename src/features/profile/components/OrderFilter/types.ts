export enum OrderFilterMethods {
  ALL = 'all',
  UNFULFILLED = 'unfulfilled',
  UNPAID = 'unpaid',
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum OrderSortFields {
  CREATED_AT = 'created_at',
  ITEMS = 'items',
  TOTAL = 'total',
}
