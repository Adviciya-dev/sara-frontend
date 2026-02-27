'use client';

export const dynamic = 'force-dynamic';

import AdminLayout from '../../../src/views/admin/AdminLayout';
import AdminSEO from '../../../src/views/admin/AdminSEO';

export default function SEO() {
  return (
    <AdminLayout>
      <AdminSEO />
    </AdminLayout>
  );
}
