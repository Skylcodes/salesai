-- Add dedicated columns for prospect_details, scenario, and objectives
ALTER TABLE simulation_settings
ADD COLUMN IF NOT EXISTS prospect_details TEXT,
ADD COLUMN IF NOT EXISTS scenario TEXT DEFAULT 'cold-call',
ADD COLUMN IF NOT EXISTS call_objectives JSONB DEFAULT '[]'::jsonb;

-- Drop constraints that might be violated if we move data
-- (Not strictly necessary if we are just adding columns, but good practice if we were migrating data and enforcing non-nulls later)

-- No data migration needed as previous data in 'goals' can stay there or be ignored. 
-- We will switch the application to use these new columns.
