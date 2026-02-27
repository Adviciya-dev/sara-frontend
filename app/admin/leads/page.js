'use client';

export const dynamic = 'force-dynamic';

import AdminLayout from '../../../src/views/admin/AdminLayout';
import AdminLeads from '../../../src/views/admin/AdminLeads';

export default function Leads() {
  return (
    <AdminLayout>
      <AdminLeads />
    </AdminLayout>
  );
}
