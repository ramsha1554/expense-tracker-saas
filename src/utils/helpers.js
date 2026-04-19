import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export const CATEGORIES = [
  { label: 'Food & Dining', value: 'food', color: 'bg-orange-100 text-orange-600' },
  { label: 'Travel', value: 'travel', color: 'bg-blue-100 text-blue-600' },
  { label: 'Work', value: 'work', color: 'bg-purple-100 text-purple-600' },
  { label: 'Shopping', value: 'shopping', color: 'bg-pink-100 text-pink-600' },
  { label: 'Health', value: 'health', color: 'bg-green-100 text-green-600' },
  { label: 'Entertainment', value: 'entertainment', color: 'bg-yellow-100 text-yellow-600' },
  { label: 'Other', value: 'other', color: 'bg-slate-100 text-slate-600' },
];
