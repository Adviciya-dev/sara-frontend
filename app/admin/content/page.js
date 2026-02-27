'use client';

export const dynamic = 'force-dynamic';

import AdminLayout from '../../../src/views/admin/AdminLayout';
import AdminContent from '../../../src/views/admin/AdminContent';

export default function Content() {
  return (
    <AdminLayout>
      <AdminContent />
    </AdminLayout>
  );
}
