'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiSearch, FiCalendar, FiClock, FiVideo } from 'react-icons/fi';

export default function MeetingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock meetings data
  const meetings = [
    {
      id: 'meet-1',
      name: 'Weekly Team Standup',
      type: 'scheduled',
      time: '10:00 AM',
      date: 'Tomorrow',
      participants: 8,
    },
    {
      id: 'meet-2',
      name: 'Product Demo',
      type: 'scheduled',
      time: '2:30 PM',
      date: 'May 25, 2023',
      participants: 12,
    },
    {
      id: 'meet-3',
      name: 'Client Onboarding',
      type: 'recurring',
      time: '3:00 PM',
      date: 'Every Monday',
      participants: 5,
    },
    {
      id: 'meet-4',
      name: 'Marketing Strategy',
      type: 'completed',
      time: '11:00 AM',
      date: 'Yesterday',
      participants: 6,
    },
  ];

  // Filter meetings based on search term
  const filteredMeetings = meetings.filter(meeting => 
    meeting.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Your Meetings</h1>
        <div className="flex gap-2">
          <Link 
            href="/meetings/new" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            New Meeting
          </Link>
          <Link 
            href="/meetings/schedule" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <FiCalendar className="mr-2" />
            Schedule
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search meetings..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Meetings list */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {filteredMeetings.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredMeetings.map((meeting) => (
              <li key={meeting.id} className="hover:bg-gray-50">
                <Link href={`/meetings/${meeting.id}`} className="block p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">{meeting.name}</h3>
                        {meeting.type === 'recurring' && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                            Recurring
                          </span>
                        )}
                        {meeting.type === 'completed' && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        {meeting.type !== 'completed' ? (
                          <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        ) : (
                          <FiClock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        )}
                        <span>{meeting.time} • {meeting.date}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {meeting.participants} participants
                      </span>
                      <button className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                        <FiVideo className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center">
            <FiVideo className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No meetings found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try a different search term' : 'Start by creating a new meeting'}
            </p>
            <div className="mt-6">
              <Link
                href="/meetings/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Meeting
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 