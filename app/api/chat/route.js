import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Use Node.js runtime for streaming

const SYSTEM_PROMPT = `
You are the core intelligence engine for The One-Person Agency Launchkit. Your job is to help independent freelancers and devs eliminate onboarding bottlenecks by converting their vague, hourly services into fixed-price, productized packages. Apply these structural rules to your output markdown:
1. DIAGNOSIS: Analyze how their positioning causes friction.
2. PRODUCTIZATION ENGINE: Split their skills into exactly 3 rigid, fixed-scope tiers using realistic local Indian pricing structures (INR/₹).
3. INTAKE ALIGNMENT: Provide exactly 3 binary, objective questions they should put in their Jotform intake layer for their flagship tier.
`;

// Simulated stream generator in case no API key is provided
function generateMockStream(description) {
  const responses = [
    `# AI Productization Framework\n\n`,
    `## 1. DIAGNOSIS\n`,
    `Your current description ("${description.substring(0, 100)}...") describes a classic manual delivery setup. By offering open-ended hours, you suffer from:\n`,
    `- **Constant Scope Creep:** Clients assume additional feature iterations are free.\n`,
    `- **Screenshot Verification Grind:** Manually checking bank apps for UPI transfers slows project kicks.\n`,
    `- **Negotiation Friction:** Pricing based on manual negotiation instead of transparent, productized service tiers.\n\n`,
    `## 2. PRODUCTIZATION ENGINE\n`,
    `We have divided your skillset into 3 structured, fixed-scope tiers:\n\n`,
    `| Tier | Scope | Target Price |\n`,
    `| --- | --- | --- |\n`,
    `| **01 / Essential Landing Setup** | 1 Single-Page portfolio site, basic copy optimization, Hosting mapping. | **₹35,000** upfront |\n`,
    `| **02 / Scale Onboarding Pipeline (Flagship)** | Full 3-page high-converting shopfront, automated Jotform CRM routing, 50% deposit gate. | **₹75,000** (50% upfront deposit) |\n`,
    `| **03 / Complete Operations Redesign** | Custom custom dashboard systems, webhook accounting, automated Slack workspace onboarding. | **₹1,50,000** (50% upfront deposit) |\n\n`,
    `## 3. INTAKE ALIGNMENT\n`,
    `Insert these 3 binary qualifying questions into your Jotform intake form to auto-filter prospects for your Flagship Tier:\n`,
    `1. *Are your brand assets (logos, typography files, copy drafts) fully prepared for upload?* (Yes/No)\n`,
    `2. *Is your maximum project budget allocated above ₹50,000?* (Yes/No)\n`,
    `3. *Can you designate one single primary decision-maker to authorize scope checkpoints?* (Yes/No)\n`
  ];

  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      for (const response of responses) {
        // Stream chunk-by-chunk with a slight delay
        controller.enqueue(encoder.encode(response));
        await new Promise((r) => setTimeout(r, 150));
      }
      controller.close();
    }
  });
}

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Fall back to simulated stream if no API Key is available
    if (!apiKey) {
      const stream = generateMockStream(message);
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Call standard Gemini API endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${SYSTEM_PROMPT}\n\nUser Business/Services Description:\n${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API returned error status:', response.status, errorText);
      // Fallback to mock on API error
      const stream = generateMockStream(message);
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    // Stream the text response back to client to match streaming format
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(replyText));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in chat API handler:', error);
    return NextResponse.json({ error: 'Server internal error' }, { status: 500 });
  }
}
