'use client';

export const dynamic = 'force-dynamic';

import ClientLayout from './components/ClientLayout';
import NotFoundPage from '../src/views/NotFoundPage';

export default function NotFound() {
  return (
    <ClientLayout>
      <NotFoundPage />
    </ClientLayout>
  );
}
