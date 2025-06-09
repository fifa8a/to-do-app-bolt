export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_ST8lqvbAtSUXXG',
    priceId: 'price_1RYCTvRwHuBY7HESAw5F5Wmx',
    name: 'Bolt Test',
    description: 'Test',
    mode: 'subscription',
  },
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};