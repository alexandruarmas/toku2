'use client';

import { useClerk, useAuth, useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DebugPage() {
  const clerk = useClerk();
  const { isLoaded: authLoaded, userId, isSignedIn } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);
  
  useEffect(() => {
    // Check if user prefers dark mode
    if (typeof window !== 'undefined') {
      setPrefersDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    
    console.log('Clerk object:', clerk);
    console.log('Auth state:', { authLoaded, userId, isSignedIn });
    console.log('User state:', { userLoaded, user });
    console.log('Clerk publishable key:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  }, [clerk, authLoaded, userId, isSignedIn, userLoaded, user]);

  return (
    <div className="p-10 bg-white text-black">
      <h1 className="text-2xl font-bold mb-6 text-black">Authentication Debug Page</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2 text-black">System Theme:</h2>
        <p className="text-black">Prefers Dark Mode: {String(prefersDarkMode)}</p>
        <p className="text-black">Current Page Theme: Light (forced)</p>
      </div>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2 text-black">Auth Status:</h2>
        <p className="text-black">Auth Loaded: {String(authLoaded)}</p>
        <p className="text-black">Is Signed In: {String(isSignedIn)}</p>
        <p className="text-black">User ID: {userId || 'Not signed in'}</p>
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2 text-black">User Info:</h2>
        <p className="text-black">User Loaded: {String(userLoaded)}</p>
        <p className="text-black">User Email: {user?.emailAddresses[0]?.emailAddress || 'No email'}</p>
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2 text-black">Environment:</h2>
        <p className="text-black">Clerk Key Present: {Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) ? 'Yes' : 'No'}</p>
        <p className="text-black">Clerk Key: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 10)}...</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-black">Modal Buttons:</h2>
        <div className="flex space-x-4">
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Sign In (Modal)
            </button>
          </SignInButton>
          
          <SignUpButton mode="modal">
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              Sign Up (Modal)
            </button>
          </SignUpButton>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-black">Redirect Buttons:</h2>
        <div className="flex space-x-4">
          <SignInButton>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Sign In (Redirect)
            </button>
          </SignInButton>
          
          <SignUpButton>
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              Sign Up (Redirect)
            </button>
          </SignUpButton>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-black">Direct Links:</h2>
        <div className="flex space-x-4">
          <Link href="/sign-in" className="px-4 py-2 bg-blue-600 text-white rounded inline-block">
            Sign In Page Direct Link
          </Link>
          
          <Link href="/sign-up" className="px-4 py-2 bg-green-600 text-white rounded inline-block">
            Sign Up Page Direct Link
          </Link>
        </div>
      </div>

      {isSignedIn && (
        <div className="mt-8">
          <button 
            onClick={() => clerk.signOut()}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
} 