'use client';

export const dynamic = 'force-dynamic';

import AdminLayout from '../../../src/views/admin/AdminLayout';
import AdminAnalytics from '../../../src/views/admin/AdminAnalytics';

export default function Analytics() {
  return (
    <AdminLayout>
      <AdminAnalytics />
    </AdminLayout>
  );
}
