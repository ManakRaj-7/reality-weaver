import { supabase } from "@/integrations/supabase/client";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: 'calendar' | 'globe' | 'cpu' | 'users';
}

export interface AlternateReality {
  scenario: string;
  headline: string;
  summary: string;
  timeline: TimelineEvent[];
  consequences: {
    cultural: string;
    technological: string;
    political: string;
  };
}

export const generateReality = async (scenario: string): Promise<AlternateReality> => {
  const { data, error } = await supabase.functions.invoke('generate-reality', {
    body: { scenario }
  });

  if (error) {
    console.error('Error generating reality:', error);
    
    // Check for specific error types
    const errorMessage = error.message?.toLowerCase() || '';
    if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    }
    if (errorMessage.includes('credits') || errorMessage.includes('402')) {
      throw new Error('AI service temporarily unavailable. Please try again later.');
    }
    
    throw new Error('Failed to generate reality. Please try again.');
  }

  if (data?.error) {
    // Handle specific error messages from edge function
    if (data.error.includes('Rate limit')) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    }
    if (data.error.includes('credits')) {
      throw new Error('AI service temporarily unavailable. Please try again later.');
    }
    throw new Error(data.error);
  }

  return data as AlternateReality;
};
