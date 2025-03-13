// src/app/faq/page.tsx
import { Metadata } from 'next';
import FAQPage from '@/components/faq/FAQPage';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Ahancha Motors',
  description: 'Find answers to common questions about our vehicles, financing options, service, and buying process at Ahancha Motors.',
  keywords: 'car dealership FAQ, vehicle financing questions, auto service FAQ, car buying process, Ahancha Motors help',
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'),
};

export default function FAQ() {
  return <FAQPage />;
}