// this is a server component, also a main component for the dashboard page
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// remenber if in brackets, it means that it is a named export, if not, it is a default export
import { lusitana } from '@/app/ui/fonts';
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data';

// the entire page is an async component..?? we can do that with nextJS. So we can fetch data before rendering the page
export default async function Page() {
  // we are fetching the revenue data from the data file, from where is calls the database.
  // we are then storing that response to a const called revenue.
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  // from fetchCardData, we are getting the number of invoices, customers, total paid invoices and total pending invoices from the returned object. now we can use this information to display on the cards.
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      {/* we are using a particual font type for this h1, and this is imported this way because it renderes better */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
