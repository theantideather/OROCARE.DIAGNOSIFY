/*
  # Update Chat System

  1. Changes
    - Add messages table if not exists
    - Add chat_users table if not exists
    - Enable RLS on tables
    - Add policies with existence checks
*/

-- Create messages table if not exists
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create chat users table if not exists
CREATE TABLE IF NOT EXISTS chat_users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  username text UNIQUE NOT NULL,
  avatar_url text,
  last_seen timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Anyone can read messages" ON messages;
    DROP POLICY IF EXISTS "Users can insert their own messages" ON messages;
    DROP POLICY IF EXISTS "Anyone can read chat users" ON chat_users;
    DROP POLICY IF EXISTS "Users can update their own profile" ON chat_users;
    DROP POLICY IF EXISTS "Users can insert their own profile" ON chat_users;
END $$;

-- Create new policies
CREATE POLICY "Anyone can read messages"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read chat users"
  ON chat_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON chat_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON chat_users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);