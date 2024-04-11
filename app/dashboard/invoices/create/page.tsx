import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  // we are fetching the customers from the database
  const customers = await fetchCustomers();

  return (
    <main>
      {/* breadcrumbs is showing the route depth */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      {/* we are then passing the customers down to the form component to use there.  */}
      <Form customers={customers} />
    </main>
  );
}
