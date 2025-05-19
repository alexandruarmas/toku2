'use client';

import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiVideo, FiCalendar, FiClock, FiSettings, FiMenu, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Meetings', href: '/meetings', icon: FiVideo },
    { name: 'Personal Room', href: '/personal-room', icon: FiVideo },
    { name: 'Upcoming', href: '/upcoming', icon: FiCalendar },
    { name: 'Previous', href: '/previous', icon: FiClock },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600" fill="currentColor">
              <path d="M19 12.75H5C4.59 12.75 4.25 12.41 4.25 12C4.25 11.59 4.59 11.25 5 11.25H19C19.41 11.25 19.75 11.59 19.75 12C19.75 12.41 19.41 12.75 19 12.75Z" />
              <path d="M12 19.75C11.59 19.75 11.25 19.41 11.25 19V5C11.25 4.59 11.59 4.25 12 4.25C12.41 4.25 12.75 4.59 12.75 5V19C12.75 19.41 12.41 19.75 12 19.75Z" />
            </svg>
            <span className="text-xl font-bold">ZoomClone</span>
          </Link>
          <button 
            className="p-2 rounded-md md:hidden" 
            onClick={() => setSidebarOpen(false)}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <Link 
            href="/meetings/new" 
            className="w-full flex justify-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            New Meeting
          </Link>
        </div>
        <nav className="mt-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-3 flex justify-between items-center">
            <button 
              className="p-2 rounded-md md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <div className="flex-1 md:ml-8">
              <h1 className="text-lg font-medium text-gray-900">
                {navigation.find(item => pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)))?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <SignedIn>
            {children}
          </SignedIn>
          <SignedOut>
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">Please sign in to access this page</h2>
              <Link 
                href="/sign-in" 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </SignedOut>
        </main>
      </div>
    </div>
  );
} 