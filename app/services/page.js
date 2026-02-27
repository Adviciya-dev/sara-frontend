'use client';

export const dynamic = 'force-dynamic';

import ClientLayout from '../components/ClientLayout';
import ServicesPage from '../../src/views/ServicesPage';

export default function Services() {
  return (
    <ClientLayout>
      <ServicesPage />
    </ClientLayout>
  );
}
