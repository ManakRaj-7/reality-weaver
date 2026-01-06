-- Add UPDATE policy for realities table
CREATE POLICY "Users can update their own realities" 
ON public.realities 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add DELETE policy for profiles table
CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = user_id);