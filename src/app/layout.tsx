import React, { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import './styles/globals.css';
import 'nprogress/nprogress.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Learn Dash</title>
      </head>
      <body className="flex flex-col h-screen">
        <Header />
        <main className="flex flex-1">
          {/* Sidebar */}
          <nav className="w-20 md:w-64 bg-gray-200 h-full">
            <Sidebar />
          </nav>
          {/* Main Content */}
          <section className="flex-1 p-4 overflow-auto bg-gray-100">
            <div className="max-w-8xl mx-auto px-2">{children}</div>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
