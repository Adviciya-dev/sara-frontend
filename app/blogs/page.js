'use client';

export const dynamic = 'force-dynamic';

import ClientLayout from '../components/ClientLayout';
import BlogsPage from '../../src/views/BlogsPage';

export default function Blogs() {
  return (
    <ClientLayout>
      <BlogsPage />
    </ClientLayout>
  );
}
