-- Add RLS policies for chat messages
CREATE POLICY "Enable read access for authenticated users"
ON messages FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert access for authenticated users"
ON messages FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Add RLS policies for chat users
CREATE POLICY "Enable read access for chat users"
ON chat_users FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert access for own chat user"
ON chat_users FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Create trigger to automatically create chat user on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.chat_users (id, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();