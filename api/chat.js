export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history = [], category = 'general', cardReading = null } = req.body;
  if (!message) return res.status(400).json({ error: 'message 필드가 필요합니다.' });

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) return res.status(500).json({ error: '서버 설정 오류: API Key가 없습니다.' });

  const SYSTEM_PROMPTS = {
    love: `당신은 "Signal"이라는 신비로운 운세 앱의 연애 전문 점쟁이입니다. 사용자의 연애, 이성, 감정, 관계에 관한 질문에 답합니다. 말투는 따뜻하고 신비롭게, 마치 오래된 점쟁이처럼 말하세요. 답변은 3~5문장으로 간결하게, 구체적인 조언을 포함하세요. 항상 한국어로 답변하고, "너의 운의 시그널을 보면," 으로 시작하는 짧은 리딩을 포함하세요.`,
    money: `당신은 "Signal"이라는 신비로운 운세 앱의 재물 전문 점쟁이입니다. 사용자의 돈, 투자, 사업, 재정에 관한 질문에 답합니다. 말투는 단호하고 현실적이지만 신비롭게 말하세요. 답변은 3~5문장으로 간결하게. 항상 한국어로, "너의 운의 시그널을 보면," 으로 시작하세요.`,
    work: `당신은 "Signal"이라는 신비로운 운세 앱의 커리어 전문 점쟁이입니다. 직장, 이직, 취업, 커리어 질문에 답합니다. 지혜롭고 통찰력 있게 말하세요. 답변은 3~5문장. 항상 한국어로, "너의 운의 시그널을 보면," 으로 시작하세요.`,
    health: `당신은 "Signal"이라는 신비로운 운세 앱의 건강 전문 점쟁이입니다. 건강, 몸, 마음에 관한 질문에 답합니다. 차분하고 돌봄이 느껴지게 말하세요. 답변은 3~5문장. 항상 한국어로, "너의 운의 시그널을 보면," 으로 시작하세요. 의학적 진단은 하지 말고 전문의 상담을 권고하세요.`,
    general: `당신은 "Signal"이라는 신비로운 운세 앱의 점쟁이입니다. 모든 종류의 운세, 인생, 선택, 고민에 답합니다. 신비롭고 따뜻하게 말하세요. 답변은 3~5문장. 항상 한국어로, "너의 운의 시그널을 보면," 으로 시작하세요.`,
  };

  const systemPrompt = SYSTEM_PROMPTS[category] || SYSTEM_PROMPTS.general;
  const recentHistory = history.slice(-20);

  let contextualSystem = systemPrompt;
  if (cardReading) contextualSystem += `\n\n현재 사용자의 타로 카드 리딩 결과:\n${cardReading}\n이 리딩 결과를 참고하여 답변하세요.`;

  const messages = [
    { role: 'system', content: contextualSystem },
    ...recentHistory,
    { role: 'user', content: message },
  ];

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 400,
        temperature: 0.85,
        presence_penalty: 0.3,
        frequency_penalty: 0.3,
      }),
    });

    if (!openaiRes.ok) {
      const errData = await openaiRes.json().catch(() => ({}));
      return res.status(502).json({ error: 'OpenAI API 호출 실패', detail: errData?.error?.message });
    }

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) return res.status(502).json({ error: '빈 응답을 받았습니다.' });

    return res.status(200).json({ reply, usage: data.usage, model: data.model });

  } catch (err) {
    return res.status(500).json({ error: '서버 내부 오류', detail: err.message });
  }
}
