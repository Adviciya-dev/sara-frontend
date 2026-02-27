'use client';

export const dynamic = 'force-dynamic';

import AdminLayout from '../../../src/views/admin/AdminLayout';
import AdminImages from '../../../src/views/admin/AdminImages';

export default function Images() {
  return (
    <AdminLayout>
      <AdminImages />
    </AdminLayout>
  );
}
