'use client';

import { useUser } from '@clerk/nextjs';
import { FiCopy, FiShare2, FiVideo } from 'react-icons/fi';
import Link from 'next/link';

export default function PersonalRoomPage() {
  const { user } = useUser();
  
  // In a real app, this would be fetched from a database
  const personalMeetingId = '123-456-789';
  const personalMeetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/join/${personalMeetingId}`;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Personal Meeting Room</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">{user?.firstName || 'Your'}&apos;s Personal Room</h2>
            <p className="text-gray-600">Your permanent personal meeting room</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href={`/meetings/${personalMeetingId}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FiVideo className="mr-2" />
              Start Meeting
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Personal Meeting ID</p>
            <div className="flex items-center">
              <span className="font-mono text-lg">{personalMeetingId}</span>
              <button 
                onClick={() => copyToClipboard(personalMeetingId)}
                className="ml-2 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                aria-label="Copy meeting ID"
              >
                <FiCopy className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Personal Meeting Link</p>
            <div className="flex items-center">
              <span className="font-mono text-sm text-gray-600 truncate max-w-xs md:max-w-md">
                {personalMeetingLink}
              </span>
              <button 
                onClick={() => copyToClipboard(personalMeetingLink)}
                className="ml-2 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                aria-label="Copy meeting link"
              >
                <FiCopy className="w-5 h-5" />
              </button>
              <button 
                className="ml-2 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                aria-label="Share meeting link"
              >
                <FiShare2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Personal Meeting Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="waiting-room"
                name="waiting-room"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                defaultChecked
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="waiting-room" className="font-medium text-gray-700">Enable waiting room</label>
              <p className="text-gray-500">Participants will need to be admitted to the meeting by the host</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="require-password"
                name="require-password"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="require-password" className="font-medium text-gray-700">Require meeting password</label>
              <p className="text-gray-500">Participants will need a password to join your personal meeting</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="join-before-host"
                name="join-before-host"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="join-before-host" className="font-medium text-gray-700">Allow participants to join before host</label>
              <p className="text-gray-500">Participants can join the meeting before you arrive</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="mute-on-entry"
                name="mute-on-entry"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                defaultChecked
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="mute-on-entry" className="font-medium text-gray-700">Mute participants upon entry</label>
              <p className="text-gray-500">Participants will be muted when they join the meeting</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
} 