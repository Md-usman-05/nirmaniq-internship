import './globals.css';
import { Navigation } from '@/src/components/Navigation';
import { Suspense } from 'react';
export const metadata = { title: 'NirmanIQ', description: 'Construction App' };
export default function RootLayout({ children }) {
    return (<html lang="en">
      <body>
        <div className="layout">
          <Suspense fallback={<div className="sidebar">Loading...</div>}>
            <Navigation />
          </Suspense>
          <main className="content">{children}</main>
        </div>
      </body>
    </html>);
}
