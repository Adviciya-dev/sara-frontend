'use client';

export const dynamic = 'force-dynamic';

import ClientLayout from '../components/ClientLayout';
import ResourcesPage from '../../src/views/ResourcesPage';

export default function Resources() {
  return (
    <ClientLayout>
      <ResourcesPage />
    </ClientLayout>
  );
}
