-- Create trading messages table
CREATE TABLE IF NOT EXISTS trading_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create traders table
CREATE TABLE IF NOT EXISTS traders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_url text,
  expertise text[] NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create trader support messages table
CREATE TABLE IF NOT EXISTS trader_support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  trader_id uuid REFERENCES traders,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE trading_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE traders ENABLE ROW LEVEL SECURITY;
ALTER TABLE trader_support_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for trading messages
CREATE POLICY "Anyone can read trading messages"
  ON trading_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own messages"
  ON trading_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS policies for traders
CREATE POLICY "Anyone can view traders"
  ON traders FOR SELECT
  TO authenticated
  USING (true);

-- RLS policies for trader support messages
CREATE POLICY "Users can see their own support messages"
  ON trader_support_messages FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM traders t
      WHERE t.id = trader_id AND t.id IN (
        SELECT trader_id FROM trader_support_messages
        WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can insert support messages"
  ON trader_support_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);