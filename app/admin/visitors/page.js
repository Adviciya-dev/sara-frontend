'use client';

export const dynamic = 'force-dynamic';

import AdminLayout from '../../../src/views/admin/AdminLayout';
import AdminVisitors from '../../../src/views/admin/AdminVisitors';

export default function Visitors() {
  return (
    <AdminLayout>
      <AdminVisitors />
    </AdminLayout>
  );
}
