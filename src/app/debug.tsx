'use client';

import { useClerk, useAuth, useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function DebugPage() {
  const clerk = useClerk();
  const { isLoaded: authLoaded, userId, isSignedIn } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();
  
  useEffect(() => {
    console.log('Clerk object:', clerk);
    console.log('Auth state:', { authLoaded, userId, isSignedIn });
    console.log('User state:', { userLoaded, user });
    console.log('Clerk publishable key:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  }, [clerk, authLoaded, userId, isSignedIn, userLoaded, user]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug Page</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Auth Status:</h2>
        <p>Auth Loaded: {String(authLoaded)}</p>
        <p>Is Signed In: {String(isSignedIn)}</p>
        <p>User ID: {userId || 'Not signed in'}</p>
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">User Info:</h2>
        <p>User Loaded: {String(userLoaded)}</p>
        <p>User Email: {user?.emailAddresses[0]?.emailAddress || 'No email'}</p>
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Environment:</h2>
        <p>Clerk Key Present: {Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) ? 'Yes' : 'No'}</p>
        <p>Clerk Key: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 10)}...</p>
      </div>

      <div className="flex space-x-4 mb-6">
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
  );
} 