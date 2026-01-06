import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
- Create 4–5 timeline events spanning from the divergence point to present day
- Be creative but logical — each event must follow from the previous
- Do NOT omit timeline or consequences
- Be bold, vivid, and detailed`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  /* ───── AUTH GUARD ───── */
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { scenario } = await req.json();

    /* ───── INPUT VALIDATION (PATCHED) ───── */
    if (
      typeof scenario !== 'string' ||
      scenario.trim().length < 5 ||
      scenario.length > 1200
    ) {
      return new Response(
        JSON.stringify({ error: 'Invalid scenario input' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        temperature: 0.75,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: scenario }
        ],
      }),
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'AI generation failed' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Empty AI response');
    }

    if (content.includes('```')) {
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    }

    const reality = JSON.parse(content);

    /* ───── AI QUALITY ENFORCEMENT (KEY FIX) ───── */
    if (
      !reality.timeline ||
      !Array.isArray(reality.timeline) ||
      reality.timeline.length < 4 ||
      !reality.consequences
    ) {
      return new Response(
        JSON.stringify({ error: 'AI response incomplete, please retry' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(reality), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate reality' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
