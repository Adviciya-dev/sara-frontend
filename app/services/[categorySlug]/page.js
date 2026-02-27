'use client';

export const dynamic = 'force-dynamic';

import ClientLayout from '../../components/ClientLayout';
import CategoryPage from '../../../src/views/CategoryPage';

export default function Category() {
  return (
    <ClientLayout>
      <CategoryPage />
    </ClientLayout>
  );
}
