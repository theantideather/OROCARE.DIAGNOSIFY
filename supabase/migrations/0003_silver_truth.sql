/*
  # Add Message-User Relationship

  1. Changes
    - Add foreign key from messages to chat_users
    - Add indexes for better query performance
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add foreign key relationship between messages and chat_users
ALTER TABLE messages
ADD COLUMN chat_user_id uuid REFERENCES chat_users(id);

-- Update existing messages to link to chat_users
DO $$ 
BEGIN
  UPDATE messages m
  SET chat_user_id = m.user_id
  WHERE chat_user_id IS NULL;
END $$;

-- Make chat_user_id NOT NULL after updating existing records
ALTER TABLE messages
ALTER COLUMN chat_user_id SET NOT NULL;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_messages_chat_user_id 
ON messages(chat_user_id);

-- Add index for message ordering
CREATE INDEX IF NOT EXISTS idx_messages_created_at 
ON messages(created_at DESC);