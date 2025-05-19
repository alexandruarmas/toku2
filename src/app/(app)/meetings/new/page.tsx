'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { createMeeting } from '@/actions/stream-actions';
import { FiVideo, FiCalendar } from 'react-icons/fi';

export default function NewMeetingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [meetingName, setMeetingName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartInstantMeeting = async () => {
    setIsCreating(true);
    setError(null);
    
    try {
      const name = meetingName.trim() || `${user?.firstName || 'User'}&apos;s Meeting`;
      const result = await createMeeting(name);
      
      if (result.success && result.channelId) {
        router.push(`/meetings/${result.channelId}`);
      } else {
        setError(result.error || 'Failed to create meeting');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Start or Schedule a Meeting</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Instant Meeting</h2>
        <div className="mb-4">
          <label htmlFor="meeting-name" className="block text-sm font-medium text-gray-700 mb-1">
            Meeting name (optional)
          </label>
          <input
            type="text"
            id="meeting-name"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a meeting name"
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
          />
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <button
          onClick={handleStartInstantMeeting}
          disabled={isCreating}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiVideo className="mr-2" />
          {isCreating ? 'Creating...' : 'Start Instant Meeting'}
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Schedule for Later</h2>
        <p className="text-gray-600 mb-4">
          Create a scheduled meeting and invite participants in advance.
        </p>
        <button
          onClick={() => router.push('/meetings/schedule')}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <FiCalendar className="mr-2" />
          Schedule a Meeting
        </button>
      </div>
    </div>
  );
} 