const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const SYSTEM_PROMPT =
  'You are a helpful assistant. Write a thoughtful, concise reply to this social media post. Match the tone of the platform. Keep it under 3 sentences unless more is needed.';

async function generateReply(postText, apiKey) {
  const headers = {
    'Content-Type': 'application/json',
  };
  headers.Authorization = 'Bearer ' + apiKey;

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: postText },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || '';
}

self.generateReply = generateReply;
