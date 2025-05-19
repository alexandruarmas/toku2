'use client';

import { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useStreamClient } from '@/context/StreamClientProvider';
import { 
  Chat, 
  Channel as StreamChannel, 
  ChannelHeader, 
  MessageInput, 
  MessageList, 
  Thread, 
  Window 
} from 'stream-chat-react';
import { Channel as StreamChannelType } from 'stream-chat';
import { FiUsers, FiMic, FiMicOff, FiVideo, FiVideoOff, FiMonitor, FiPhoneOff } from 'react-icons/fi';
import 'stream-chat-react/dist/css/index.css';

export default function MeetingDetailPage({ params }: { params: { id: string } }) {
  const { id: meetingId } = params;
  const { user } = useUser();
  const { client } = useStreamClient();
  const [channel, setChannel] = useState<StreamChannelType | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if we have both the Stream client and user
    if (client && user) {
      // Create or retrieve the channel for this meeting
      const meetingChannel = client.channel('meeting', meetingId, {
        members: [user.id],
      });

      // Initialize the channel
      const initChannel = async () => {
        await meetingChannel.watch();
        setChannel(meetingChannel);
      };

      initChannel();

      return () => {
        // Stop watching the channel when component unmounts
        meetingChannel.stopWatching();
      };
    }
  }, [client, user, meetingId]);

  useEffect(() => {
    // Setup video on component mount
    if (navigator.mediaDevices?.getUserMedia && localVideoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing media devices:', error);
        });
    }
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Here you would actually mute the audio track
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    // Here you would actually turn off the video track
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // Here you would actually implement screen sharing
  };

  const endCall = () => {
    // Navigate back to meetings list or dashboard
    window.location.href = '/meetings';
  };

  // Meeting title - in a real app, you would get this from your backend
  const meetingTitle = `Meeting ${meetingId}`;

  if (!channel || !client) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Meeting header */}
      <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">{meetingTitle}</h1>
          <p className="text-gray-500 text-sm">Meeting ID: {meetingId}</p>
        </div>
        <div className="flex items-center">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiUsers className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Meeting content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* Video area */}
        <div className="flex-1 bg-black rounded-lg overflow-hidden relative">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
          />
          
          {isVideoOff && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-white text-3xl font-medium">
                {user?.firstName?.charAt(0) || user?.username?.charAt(0) || '?'}
              </div>
            </div>
          )}

          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
            <div className="bg-gray-900 bg-opacity-70 rounded-full p-2 flex space-x-2">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full ${
                  isMuted ? 'bg-red-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                } transition-colors`}
              >
                {isMuted ? <FiMicOff className="w-5 h-5" /> : <FiMic className="w-5 h-5" />}
              </button>
              
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${
                  isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                } transition-colors`}
              >
                {isVideoOff ? <FiVideoOff className="w-5 h-5" /> : <FiVideo className="w-5 h-5" />}
              </button>
              
              <button
                onClick={toggleScreenShare}
                className={`p-3 rounded-full ${
                  isScreenSharing ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                } transition-colors`}
              >
                <FiMonitor className="w-5 h-5" />
              </button>
              
              <button
                onClick={endCall}
                className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <FiPhoneOff className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="w-full lg:w-80 h-80 lg:h-full overflow-hidden bg-white rounded-lg shadow-sm">
          <Chat client={client} theme="messaging light">
            <StreamChannel channel={channel}>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </StreamChannel>
          </Chat>
        </div>
      </div>
    </div>
  );
} 