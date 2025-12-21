-- Create simulation_settings table
CREATE TABLE IF NOT EXISTS simulation_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  product_description TEXT,
  product_price_range TEXT,
  prospect_role TEXT,
  prospect_industry TEXT,
  prospect_personality TEXT CHECK (prospect_personality IN ('friendly', 'neutral', 'short-tempered', 'curious', 'skeptical')),
  prospect_tone TEXT CHECK (prospect_tone IN ('casual', 'professional', 'high-energy')),
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  objections_level TEXT CHECK (objections_level IN ('low', 'medium', 'high')),
  objections_list TEXT[] NOT NULL DEFAULT '{}',
  goals TEXT,
  practice_areas TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_simulation_settings_user_id ON simulation_settings(user_id);

-- Enable Row Level Security
ALTER TABLE simulation_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only read their own simulation settings
CREATE POLICY "Users can view their own simulation settings"
  ON simulation_settings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own simulation settings
CREATE POLICY "Users can insert their own simulation settings"
  ON simulation_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own simulation settings
CREATE POLICY "Users can update their own simulation settings"
  ON simulation_settings
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own simulation settings
CREATE POLICY "Users can delete their own simulation settings"
  ON simulation_settings
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_simulation_settings_updated_at
  BEFORE UPDATE ON simulation_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

