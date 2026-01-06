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

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateReality = async (scenario: string): Promise<AlternateReality> => {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`Retry attempt ${attempt}...`);
        await sleep(RETRY_DELAY * attempt);
      }
      
      const { data, error } = await supabase.functions.invoke('generate-reality', {
        body: { scenario }
      });

      if (error) {
        console.error('Error generating reality:', error);
        
        const errorMessage = error.message?.toLowerCase() || '';
        
        // Don't retry rate limits or credit issues
        if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        if (errorMessage.includes('credits') || errorMessage.includes('402')) {
          throw new Error('AI service temporarily unavailable. Please try again later.');
        }
        
        // Retry on other errors
        lastError = new Error('Failed to generate reality. Please try again.');
        continue;
      }

      if (data?.error) {
        if (data.error.includes('Rate limit')) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        if (data.error.includes('credits')) {
          throw new Error('AI service temporarily unavailable. Please try again later.');
        }
        
        lastError = new Error(data.error);
        continue;
      }

      // Success
      return data as AlternateReality;
      
    } catch (err) {
      if (err instanceof Error && 
          (err.message.includes('Too many requests') || err.message.includes('AI service temporarily'))) {
        throw err; // Don't retry these
      }
      lastError = err instanceof Error ? err : new Error('Unknown error');
    }
  }
  
  throw lastError || new Error('Failed to generate reality after multiple attempts.');
};
