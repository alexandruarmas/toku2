'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiVideo, FiPlus, FiClock, FiCalendar, FiUsers } from 'react-icons/fi';

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  // Mock data for demonstration
  const upcomingMeetings = [
    { id: 'meet-1', name: 'Weekly Team Standup', time: '10:00 AM', date: 'Tomorrow' },
    { id: 'meet-2', name: 'Product Demo', time: '2:30 PM', date: 'May 25, 2023' },
  ];

  const recentMeetings = [
    { id: 'recent-1', name: 'Marketing Strategy', time: '11:00 AM', date: 'Yesterday', duration: '45m' },
    { id: 'recent-2', name: 'Client Onboarding', time: '3:00 PM', date: 'May 18, 2023', duration: '30m' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.firstName || 'User'}!</h2>
        <p className="text-gray-600">Here&apos;s an overview of your meetings and quick actions.</p>
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/meetings/new" 
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex items-center transition-colors"
          >
            <FiVideo className="w-5 h-5 mr-3" />
            <div>
              <div className="font-medium">New Meeting</div>
              <div className="text-sm text-blue-100">Start a video meeting now</div>
            </div>
          </Link>
          
          <Link 
            href="/meetings/join" 
            className="bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-lg flex items-center transition-colors"
          >
            <FiPlus className="w-5 h-5 mr-3 text-blue-600" />
            <div>
              <div className="font-medium">Join Meeting</div>
              <div className="text-sm text-gray-500">Via meeting code or link</div>
            </div>
          </Link>
          
          <Link 
            href="/meetings/schedule" 
            className="bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-lg flex items-center transition-colors"
          >
            <FiCalendar className="w-5 h-5 mr-3 text-blue-600" />
            <div>
              <div className="font-medium">Schedule</div>
              <div className="text-sm text-gray-500">Plan a future meeting</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Meeting stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Your Room</h3>
            <Link href="/personal-room" className="text-blue-600 text-sm hover:underline">Go to Room</Link>
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <FiUsers className="w-5 h-5 mr-2" />
            <span>Personal Meeting ID: <span className="font-medium">123-456-789</span></span>
          </div>
          <div className="mt-4">
            <button 
              onClick={() => router.push('/personal-room')}
              className="w-full py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Start Meeting
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Upcoming</h3>
            <Link href="/upcoming" className="text-blue-600 text-sm hover:underline">View All</Link>
          </div>
          {upcomingMeetings.length > 0 ? (
            <ul className="space-y-3">
              {upcomingMeetings.map(meeting => (
                <li key={meeting.id} className="border-b pb-2 last:border-b-0">
                  <div className="font-medium">{meeting.name}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <FiClock className="w-4 h-4 mr-1" />
                    {meeting.time} • {meeting.date}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No upcoming meetings.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Recent Meetings</h3>
            <Link href="/previous" className="text-blue-600 text-sm hover:underline">View All</Link>
          </div>
          {recentMeetings.length > 0 ? (
            <ul className="space-y-3">
              {recentMeetings.map(meeting => (
                <li key={meeting.id} className="border-b pb-2 last:border-b-0">
                  <div className="font-medium">{meeting.name}</div>
                  <div className="text-sm text-gray-500 flex justify-between">
                    <span className="flex items-center">
                      <FiClock className="w-4 h-4 mr-1" />
                      {meeting.time} • {meeting.date}
                    </span>
                    <span>{meeting.duration}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No recent meetings.</p>
          )}
        </div>
      </div>
    </div>
  );
} 