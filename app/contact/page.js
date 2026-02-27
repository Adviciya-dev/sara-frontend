'use client';

export const dynamic = 'force-dynamic';

import ClientLayout from '../components/ClientLayout';
import ContactPage from '../../src/views/ContactPage';

export default function Contact() {
  return (
    <ClientLayout>
      <ContactPage />
    </ClientLayout>
  );
}
