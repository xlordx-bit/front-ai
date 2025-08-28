import { supabase } from '../lib/supabase'

export const chatHistoryService = {
  // Save a message to the database
  async saveMessage(userId, message, sender, chatType = 'general') {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([
        {
          user_id: userId,
          message: message,
          sender: sender, // 'user' or 'ai'
          chat_type: chatType, // 'text', 'image', 'friend', 'writer'
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Error saving message:', error)
      return { error }
    }

    return { data: data[0] }
  },

  // Get chat history for a user
  async getChatHistory(userId, chatType = null, limit = 50) {
    let query = supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .limit(limit)

    if (chatType) {
      query = query.eq('chat_type', chatType)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching chat history:', error)
      return { error }
    }

    return { data }
  },

  // Delete chat history for a user
  async clearChatHistory(userId, chatType = null) {
    let query = supabase
      .from('chat_messages')
      .delete()
      .eq('user_id', userId)

    if (chatType) {
      query = query.eq('chat_type', chatType)
    }

    const { error } = await query

    if (error) {
      console.error('Error clearing chat history:', error)
      return { error }
    }

    return { success: true }
  },

  // Get recent conversations (last message for each chat type)
  async getRecentConversations(userId) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('chat_type, message, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching recent conversations:', error)
      return { error }
    }

    // Group by chat_type and get the most recent for each
    const grouped = data.reduce((acc, msg) => {
      if (!acc[msg.chat_type]) {
        acc[msg.chat_type] = msg
      }
      return acc
    }, {})

    return { data: Object.values(grouped) }
  }
}

// Helper function to create the chat_messages table (run once)
export const createChatMessagesTable = async () => {
  const { error } = await supabase.rpc('create_chat_messages_table')
  
  if (error) {
    console.error('Error creating table:', error)
    return { error }
  }
  
  return { success: true }
}
