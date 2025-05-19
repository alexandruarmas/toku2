'use client';

import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600" fill="currentColor">
              <path d="M19 12.75H5C4.59 12.75 4.25 12.41 4.25 12C4.25 11.59 4.59 11.25 5 11.25H19C19.41 11.25 19.75 11.59 19.75 12C19.75 12.41 19.41 12.75 19 12.75Z" />
              <path d="M12 19.75C11.59 19.75 11.25 19.41 11.25 19V5C11.25 4.59 11.59 4.25 12 4.25C12.41 4.25 12.75 4.59 12.75 5V19C12.75 19.41 12.41 19.75 12 19.75Z" />
            </svg>
            <span className="text-xl font-bold text-gray-900">ZoomClone</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
                footerActionLink: 'text-blue-600 hover:text-blue-500',
                card: 'bg-white',
                headerTitle: 'text-black',
                headerSubtitle: 'text-gray-700',
                formFieldLabel: 'text-gray-700',
                formFieldInput: 'border border-gray-300 text-black',
              },
            }}
            routing="path"
            path="/sign-in"
            redirectUrl="/dashboard"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  );
} 