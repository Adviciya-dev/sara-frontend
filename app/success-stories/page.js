'use client';

export const dynamic = 'force-dynamic';

import ClientLayout from '../components/ClientLayout';
import SuccessStoriesPage from '../../src/views/SuccessStoriesPage';

export default function SuccessStories() {
  return (
    <ClientLayout>
      <SuccessStoriesPage />
    </ClientLayout>
  );
}
