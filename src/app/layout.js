import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A modern web application powered by Next.js" />
        <title>My Next.js App</title>
      </head>
      <body className="bg-gray-50 text-gray-900">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-4 min-h-screen">
          {children}
        </main>

        {/* Footer Section */}
        <Footer />
      </body>
    </html>
  );
}
