'use client';

export const dynamic = 'force-dynamic';

import AdminLayout from '../../src/views/admin/AdminLayout';
import AdminDashboard from '../../src/views/admin/AdminDashboard';

export default function AdminHome() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
