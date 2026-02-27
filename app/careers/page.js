'use client';

export const dynamic = 'force-dynamic';

import ClientLayout from '../components/ClientLayout';
import CareersPage from '../../src/views/CareersPage';

export default function Careers() {
  return (
    <ClientLayout>
      <CareersPage />
    </ClientLayout>
  );
}
