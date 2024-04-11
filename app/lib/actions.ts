'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
//Next.js has a Client-side Router Cache that stores the route segments in the user's browser for a time. Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.
// Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server. You can do this with the revalidatePath function from Next.js:
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// we are keeping the actions in a separate file to keep the code clean and organized, however we can put these directly in the page file as well without any issues. remember to put the 'use server' param inside the function if you do that.
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // when we submit the form, we will get the form data in this function, we can then extract the data from the form data object and use it to create the invoice and post it to the DB.
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
  // Test it out:
}

// Tip: If you're working with forms that have many fields, you may want to consider using the entries() method with JavaScript's Object.fromEntries(). For example:
// const rawFormData = Object.fromEntries(formData.entries())
