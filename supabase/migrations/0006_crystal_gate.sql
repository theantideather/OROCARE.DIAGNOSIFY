-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can read trading messages" ON trading_messages;
DROP POLICY IF EXISTS "Users can insert their own messages" ON trading_messages;

-- Create new table structure for anonymous chat
CREATE TABLE IF NOT EXISTS anonymous_trading_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  username text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Copy existing messages to new table with default username
INSERT INTO anonymous_trading_messages (content, username, created_at)
SELECT 
  content,
  'trader_' || substr(user_id::text, 1, 8),
  created_at
FROM trading_messages;

-- Drop old table and rename new one
DROP TABLE trading_messages;
ALTER TABLE anonymous_trading_messages RENAME TO trading_messages;

-- Enable RLS on new table
ALTER TABLE trading_messages ENABLE ROW LEVEL SECURITY;

-- Create new policies for anonymous access
CREATE POLICY "Anyone can read trading messages"
  ON trading_messages FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert messages"
  ON trading_messages FOR INSERT
  TO anon
  WITH CHECK (true);