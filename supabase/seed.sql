-- First, ensure we have at least one user in auth.users
INSERT INTO auth.users (id, email)
SELECT 
  '00000000-0000-0000-0000-000000000000'::uuid,
  'seed@example.com'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users LIMIT 1
);

-- Seed data for instruments table with the demo user_id
INSERT INTO public.instruments (name, user_id) VALUES
  ('Piano', (SELECT id FROM auth.users LIMIT 1)),
  ('Guitar', (SELECT id FROM auth.users LIMIT 1)),
  ('Violin', (SELECT id FROM auth.users LIMIT 1)),
  ('Drums', (SELECT id FROM auth.users LIMIT 1)),
  ('Bass', (SELECT id FROM auth.users LIMIT 1)),
  ('Saxophone', (SELECT id FROM auth.users LIMIT 1)),
  ('Trumpet', (SELECT id FROM auth.users LIMIT 1)),
  ('Flute', (SELECT id FROM auth.users LIMIT 1));
