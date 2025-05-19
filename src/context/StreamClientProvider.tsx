'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StreamChat, TokenOrProvider } from 'stream-chat';
import { useUser } from '@clerk/nextjs';

type StreamContextType = {
  client: StreamChat | null;
  loading: boolean;
  error: Error | null;
};

const StreamContext = createContext<StreamContextType | undefined>(undefined);

export const useStreamClient = () => {
  const context = useContext(StreamContext);
  if (context === undefined) {
    throw new Error('useStreamClient must be used within a StreamClientProvider');
  }
  return context;
};

export const StreamClientProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, isLoaded: isUserLoaded } = useUser();

  useEffect(() => {
    if (!isUserLoaded || !user) {
      setLoading(false);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY;
    if (!apiKey) {
      setError(new Error('GetStream API key is missing'));
      setLoading(false);
      return;
    }

    const initClient = async () => {
      try {
        const streamClient = StreamChat.getInstance(apiKey);

        // Connect user to GetStream with their Clerk user ID
        await streamClient.connectUser(
          {
            id: user.id,
            name: user.fullName || user.username || user.id,
            image: user.imageUrl,
          },
          streamClient.devToken(user.id) as TokenOrProvider
        );

        setClient(streamClient);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize GetStream client'));
        setLoading(false);
      }
    };

    // Only initialize if we don't already have a client
    if (!client) {
      initClient();
    }

    // Cleanup function to disconnect the user when the component unmounts
    return () => {
      if (client) {
        client.disconnectUser().then(() => {
          setClient(null);
        });
      }
    };
  }, [user, isUserLoaded, client]);

  return (
    <StreamContext.Provider value={{ client, loading, error }}>
      {children}
    </StreamContext.Provider>
  );
}; 