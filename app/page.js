'use client';

import ClientLayout from './components/ClientLayout';
import HomePage from '../src/views/HomePage';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <ClientLayout>
      <HomePage />
    </ClientLayout>
  );
}
