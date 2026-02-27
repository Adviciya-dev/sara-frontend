'use client';

export const dynamic = 'force-dynamic';

import ClientLayout from '../components/ClientLayout';
import WhoWeArePage from '../../src/views/WhoWeArePage';

export default function WhoWeAre() {
  return (
    <ClientLayout>
      <WhoWeArePage />
    </ClientLayout>
  );
}
