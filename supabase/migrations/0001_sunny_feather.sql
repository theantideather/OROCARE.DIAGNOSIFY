/*
  # Chat System Schema

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `content` (text)
      - `image_url` (text, optional)
      - `created_at` (timestamp)
    - `chat_users`
      - `id` (uuid, primary key)
      - `username` (text)
      - `avatar_url` (text)
      - `last_seen` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  
  -- Add a constraint to ensure either content or image_url is present
  CONSTRAINT message_content_check CHECK (
    content IS NOT NULL OR image_url IS NOT NULL
  )
);

-- Create chat users table
CREATE TABLE IF NOT EXISTS chat_users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  username text UNIQUE NOT NULL,
  avatar_url text,
  last_seen timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_users ENABLE ROW LEVEL SECURITY;

-- Policies for messages
CREATE POLICY "Anyone can read messages"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for chat users
CREATE POLICY "Anyone can read chat users"
  ON chat_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON chat_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON chat_users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);