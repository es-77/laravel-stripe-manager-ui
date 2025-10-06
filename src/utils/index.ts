import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'usd'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
  
  // Convert from cents to dollars
  return formatter.format(amount / 100);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getBillingPeriodText(period: string, count: number): string {
  const periods = {
    day: count === 1 ? 'day' : 'days',
    week: count === 1 ? 'week' : 'weeks',
    month: count === 1 ? 'month' : 'months',
    year: count === 1 ? 'year' : 'years',
  };
  
  return `${count} ${periods[period as keyof typeof periods]}`;
}

export function getCardBrandIcon(brand: string): string {
  const icons = {
    visa: '💳',
    mastercard: '💳',
    amex: '💳',
    discover: '💳',
    jcb: '💳',
    diners: '💳',
    unionpay: '💳',
  };
  
  return icons[brand.toLowerCase() as keyof typeof icons] || '💳';
}

export function getSubscriptionStatusColor(status: string): string {
  const colors = {
    active: 'text-green-600 bg-green-100',
    trialing: 'text-blue-600 bg-blue-100',
    past_due: 'text-yellow-600 bg-yellow-100',
    canceled: 'text-red-600 bg-red-100',
    unpaid: 'text-red-600 bg-red-100',
    incomplete: 'text-gray-600 bg-gray-100',
    incomplete_expired: 'text-gray-600 bg-gray-100',
  };
  
  return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
}
