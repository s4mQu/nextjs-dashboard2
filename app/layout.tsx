// import the global scope styles from the layout file.
import '@/app/ui/global.css';
// import the fonts from the fonts file. add them to the return statement. in a class
import { inter } from '@/app/ui/fonts';

// the children prop works like the Outlet in react-router-dom.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
