import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">Sentinela Hospital</h1>
            </div>
            <nav className="flex space-x-4">
              <a
                href="#"
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Sair
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
