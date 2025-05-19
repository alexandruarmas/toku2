'use client';

import { SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600" fill="currentColor">
            <path d="M19 12.75H5C4.59 12.75 4.25 12.41 4.25 12C4.25 11.59 4.59 11.25 5 11.25H19C19.41 11.25 19.75 11.59 19.75 12C19.75 12.41 19.41 12.75 19 12.75Z" />
            <path d="M12 19.75C11.59 19.75 11.25 19.41 11.25 19V5C11.25 4.59 11.59 4.25 12 4.25C12.41 4.25 12.75 4.59 12.75 5V19C12.75 19.41 12.41 19.75 12 19.75Z" />
          </svg>
          <span className="text-xl font-bold text-black">ZoomClone</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
          <Link href="/features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
          <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
          <Link href="/support" className="text-gray-600 hover:text-blue-600 transition-colors">Support</Link>
        </div>
        <div className="flex items-center space-x-4">
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-black">Video Meetings for Everyone</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect, collaborate, and celebrate with anyone, anywhere. Our secure video conferencing platform makes it easy to stay connected.
        </p>
        <div className="flex justify-center space-x-4">
          <SignUpButton mode="modal">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg">
              Get Started For Free
            </button>
          </SignUpButton>
          <Link href="/features" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-lg">
            Learn More
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-600 mb-4" fill="currentColor">
                <path d="M21.53 7.15a1 1 0 00-1.42 0L17 10.29l-1.79-1.8a1 1 0 00-1.42 1.42l2.5 2.5a1 1 0 001.42 0l3.82-3.83a1 1 0 000-1.43z" />
                <path d="M8.5 19H8c-4 0-5-1-5-5v-4c0-4 1-5 5-5h8c4 0 5 1 5 5v1.5a.5.5 0 01-.5.5.5.5 0 01-.5-.5V10c0-3 0-4-4-4H8c-3 0-4 0-4 4v4c0 3 0 4 4 4h.5a.5.5 0 01.5.5.5.5 0 01-.5.5z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">HD Video Conferencing</h3>
              <p className="text-gray-600">Crystal clear video and audio for seamless communication with your team or clients.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-600 mb-4" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M11 7h2v7h-2zm0 8h2v2h-2z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
              <p className="text-gray-600">Instant messaging during meetings for enhanced collaboration and information sharing.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-600 mb-4" fill="currentColor">
                <path d="M21 11h-3V4a1 1 0 00-1-1H3a1 1 0 00-1 1v14a1 1 0 001 1h3v3a1 1 0 001 1h14a1 1 0 001-1V12a1 1 0 00-1-1zM6 17H4V5h12v12H6zm14 4H8v-2h8a1 1 0 001-1V9h3v12z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Screen Sharing</h3>
              <p className="text-gray-600">Share your screen with meeting participants to present ideas and collaborate efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose the plan that works for you and your team. All plans include core features.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Free</h3>
              <p className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-600 font-normal">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>40-minute meeting limit</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>Up to 100 participants</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>Basic chat support</span>
                </li>
              </ul>
              <SignUpButton mode="modal">
                <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
            
            {/* Pro Plan */}
            <div className="border rounded-lg p-8 bg-blue-50 border-blue-200 relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-6">$14.99<span className="text-lg text-gray-600 font-normal">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>Unlimited meeting duration</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>Up to 300 participants</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>Advanced chat features</span>
          </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>Cloud recording (10GB)</span>
          </li>
              </ul>
              <SignUpButton mode="modal">
                <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Try Free for 14 Days
                </button>
              </SignUpButton>
            </div>
            
            {/* Business Plan */}
            <div className="border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Business</h3>
              <p className="text-4xl font-bold mb-6">$29.99<span className="text-lg text-gray-600 font-normal">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>Everything in Pro plan</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>Up to 500 participants</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>Cloud recording (Unlimited)</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>Dedicated support</span>
                </li>
              </ul>
              <SignUpButton mode="modal">
                <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Contact Sales
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400" fill="currentColor">
                  <path d="M19 12.75H5C4.59 12.75 4.25 12.41 4.25 12C4.25 11.59 4.59 11.25 5 11.25H19C19.41 11.25 19.75 11.59 19.75 12C19.75 12.41 19.41 12.75 19 12.75Z" />
                  <path d="M12 19.75C11.59 19.75 11.25 19.41 11.25 19V5C11.25 4.59 11.59 4.25 12 4.25C12.41 4.25 12.75 4.59 12.75 5V19C12.75 19.41 12.41 19.75 12 19.75Z" />
                </svg>
                <span className="text-lg font-bold">ZoomClone</span>
              </div>
              <p className="text-gray-400">
                Connecting people through seamless video conferencing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
              <p className="text-gray-400 mb-4">Sign up for our newsletter to get the latest updates.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ZoomClone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
