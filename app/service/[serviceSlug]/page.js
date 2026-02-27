'use client';

export const dynamic = 'force-dynamic';

import ClientLayout from '../../components/ClientLayout';
import ServiceDetailPage from '../../../src/views/ServiceDetailPage';

export default function ServiceDetail() {
  return (
    <ClientLayout>
      <ServiceDetailPage />
    </ClientLayout>
  );
}
