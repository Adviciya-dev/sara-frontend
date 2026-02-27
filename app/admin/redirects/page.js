'use client';

export const dynamic = 'force-dynamic';

import AdminLayout from '../../../src/views/admin/AdminLayout';
import AdminRedirects from '../../../src/views/admin/AdminRedirects';

export default function Redirects() {
  return (
    <AdminLayout>
      <AdminRedirects />
    </AdminLayout>
  );
}
