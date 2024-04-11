// this is a server component, also a main component for the dashboard page
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// remenber if in brackets, it means that it is a named export, if not, it is a default export
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

// the entire page is an async component..?? we can do that with nextJS. So we can fetch data before rendering the page
export default async function Page() {
  // we are fetching the revenue data from the data file, from where is calls the database.
  // we are then storing that response to a const called revenue.
  // const revenue = await fetchRevenue(); // this is commented out because we are not using it in the page at the moment.

  // const latestInvoices = await fetchLatestInvoices();
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
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
