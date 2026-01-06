import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `You are an alternate reality generator. Given a "What if?" scenario, you create detailed, imaginative, and internally consistent alternate timelines.

Your response MUST be valid JSON matching this exact structure:
{
  "scenario": "A short title summarizing the alternate reality (without 'What if')",
  "headline": "A compelling news headline that could appear in this alternate reality today",
  "summary": "A 2-3 sentence overview of how this change affected history",
  "timeline": [
    {
      "year": "The year or time period",
      "title": "Event title",
      "description": "What happened and why it matters",
      "icon": "calendar" | "globe" | "cpu" | "users"
    }
  ],
  "consequences": {
    "cultural": "How society, art, and daily life changed",
    "technological": "How technology evolved differently",
    "political": "How power structures and governance changed"
  }
}

Guidelines:
- Create 4-5 timeline events spanning from the divergence point to present day
- Be creative but logical - each event should follow from the previous
- The headline should be attention-grabbing and feel authentic to that reality
- Use varied icons: "calendar" for key dates, "globe" for global events, "cpu" for tech, "users" for social changes
- Keep descriptions concise but evocative
- Be bold and imaginative - this is speculative fiction, not academic history`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scenario } = await req.json();
    
    if (!scenario) {
      return new Response(
        JSON.stringify({ error: 'Scenario is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('API key not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating reality, input length:', scenario.length);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: scenario }
        ],
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      console.error('AI gateway error:', response.status);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to generate reality' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('Empty AI response');
      return new Response(
        JSON.stringify({ error: 'Failed to generate reality content' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON from the response, handling potential markdown code blocks
    let reality;
    try {
      // Remove markdown code blocks if present
      let jsonString = content;
      if (content.includes('```')) {
        jsonString = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      }
      reality = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('JSON parse error');
      return new Response(
        JSON.stringify({ error: 'Failed to parse reality data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Reality generated successfully');

    return new Response(
      JSON.stringify(reality),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Generation error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'Failed to generate reality' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
