-- Add user_id column
ALTER TABLE public.instruments
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Update existing records (for seed data)
UPDATE public.instruments
SET user_id = (SELECT id FROM auth.users LIMIT 1);

-- Make user_id required for future inserts
ALTER TABLE public.instruments
ALTER COLUMN user_id SET NOT NULL;

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Public instruments are viewable by everyone" ON public.instruments;
DROP POLICY IF EXISTS "Authenticated users can create instruments" ON public.instruments;

-- Add new RLS policies
CREATE POLICY "Users can view their own instruments"
ON public.instruments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own instruments"
ON public.instruments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own instruments"
ON public.instruments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own instruments"
ON public.instruments FOR DELETE
USING (auth.uid() = user_id);