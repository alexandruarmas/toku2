'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamChat } from 'stream-chat';
import { revalidatePath } from 'next/cache';

/**
 * Send a message to a GetStream chat channel
 */
export async function sendMessage(channelId: string, messageText: string) {
  try {
    // Authenticate the user
    const user = await currentUser();
    
    if (!user) {
      throw new Error('Unauthorized access');
    }
    
    // Initialize Stream client
    const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY;
    const apiSecret = process.env.GETSTREAM_API_SECRET;
    
    if (!apiKey || !apiSecret) {
      throw new Error('GetStream configuration is missing');
    }
    
    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
    
    // Get the channel
    const channel = serverClient.channel('meeting', channelId);
    
    // Send the message
    await channel.sendMessage({
      text: messageText,
      user_id: user.id,
    });
    
    revalidatePath(`/meetings/${channelId}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending message:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Create a new meeting channel
 */
export async function createMeeting(meetingName: string) {
  try {
    // Authenticate the user
    const user = await currentUser();
    
    if (!user) {
      throw new Error('Unauthorized access');
    }
    
    // Initialize Stream client
    const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY;
    const apiSecret = process.env.GETSTREAM_API_SECRET;
    
    if (!apiKey || !apiSecret) {
      throw new Error('GetStream configuration is missing');
    }
    
    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
    
    // Generate a unique channel ID
    const channelId = `meeting-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Create a new channel
    const channel = serverClient.channel('meeting', channelId, {
      name: meetingName,
      created_by_id: user.id,
      members: [user.id],
    });
    
    await channel.create();
    
    revalidatePath('/meetings');
    return { 
      success: true, 
      channelId,
      meetingName
    };
  } catch (error) {
    console.error('Error creating meeting:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 