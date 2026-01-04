-- Add is_public column to realities for sharing
ALTER TABLE public.realities ADD COLUMN is_public BOOLEAN NOT NULL DEFAULT false;

-- Add share_slug for friendly URLs
ALTER TABLE public.realities ADD COLUMN share_slug TEXT UNIQUE;

-- Create index for public realities
CREATE INDEX idx_realities_public ON public.realities(is_public) WHERE is_public = true;

-- Policy to allow anyone to view public realities
CREATE POLICY "Anyone can view public realities" 
ON public.realities FOR SELECT 
USING (is_public = true);

-- Enable realtime for realities
ALTER PUBLICATION supabase_realtime ADD TABLE public.realities;