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
    throw new Error(error.message || 'Failed to generate reality');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data as AlternateReality;
};
