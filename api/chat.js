// =============================================================
// Signal App — Vercel Serverless Function
// 경로: api/chat.js
// 역할: OpenAI GPT API를 안전하게 중계 (API Key 서버에 보관)
// =============================================================

export default async function handler(req, res) {
  // ── CORS 헤더 설정 (브라우저에서 fetch 가능하도록) ──────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS preflight 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST 외 메서드 차단
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── 요청 본문 파싱 ──────────────────────────────────────────
  const { message, history = [], category = 'general', cardReading = null } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message 필드가 필요합니다.' });
  }

  // ── OpenAI API Key (Vercel 환경변수에서 로드) ───────────────
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: '서버 설정 오류: API Key가 없습니다.' });
  }

  // ── 카테고리별 시스템 프롬프트 (Signal 점쟁이 페르소나) ─────
  const SYSTEM_PROMPTS = {
    love: `당신은 "Signal"이라는 신비로운 운세 앱의 연애 전문 점쟁이입니다.
사용자의 연애, 이성, 감정, 관계에 관한 질문에 답합니다.
말투는 따뜻하고 신비롭게, 마치 오래된 점쟁이처럼 말하세요.
답변은 3~5문장으로 간결하게, 구체적인 조언을 포함하세요.
항상 한국어로 답변하고, "너의 운의 시그널을 보면," 으로 시작하는 짧은 리딩을 포함하세요.`,

    money: `당신은 "Signal"이라는 신비로운 운세 앱의 재물 전문 점쟁이입니다.
사용자의 돈, 투자, 사업, 재정에 관한 질문에 답합니다.
말투는 단호하고 현실적이지만 신비롭게, 숫자와 흐름을 읽는 듯이 말하세요.
답변은 3~5문장으로 간결하게, 구체적인 조언을 포함하세요.
항상 한국어로 답변하고, "너의 운의 시그널을 보면," 으로 시작하는 짧은 리딩을 포함하세요.`,

    work: `당신은 "Signal"이라는 신비로운 운세 앱의 직업·커리어 전문 점쟁이입니다.
사용자의 직장, 이직, 취업, 사업, 커리어에 관한 질문에 답합니다.
말투는 지혜롭고 통찰력 있게, 미래의 흐름을 읽는 듯이 말하세요.
답변은 3~5문장으로 간결하게, 구체적인 조언을 포함하세요.
항상 한국어로 답변하고, "너의 운의 시그널을 보면," 으로 시작하는 짧은 리딩을 포함하세요.`,

    health: `당신은 "Signal"이라는 신비로운 운세 앱의 건강 전문 점쟁이입니다.
사용자의 건강, 몸, 마음, 에너지에 관한 질문에 답합니다.
말투는 차분하고 돌봄이 느껴지게, 몸의 기운을 읽는 듯이 말하세요.
답변은 3~5문장으로 간결하게, 구체적인 조언을 포함하세요.
항상 한국어로 답변하고, "너의 운의 시그널을 보면," 으로 시작하는 짧은 리딩을 포함하세요.
⚠️ 의학적 진단은 하지 말고, 반드시 전문의 상담을 권고하세요.`,

    general: `당신은 "Signal"이라는 신비로운 운세 앱의 점쟁이입니다.
사용자의 모든 종류의 운세, 인생, 선택, 고민에 관한 질문에 답합니다.
말투는 신비롭고 따뜻하게, 운명의 흐름을 읽는 듯이 말하세요.
답변은 3~5문장으로 간결하게, 구체적인 조언을 포함하세요.
항상 한국어로 답변하고, "너의 운의 시그널을 보면," 으로 시작하는 짧은 리딩을 포함하세요.`,
  };

  const systemPrompt = SYSTEM_PROMPTS[category] || SYSTEM_PROMPTS.general;

  // ── 대화 히스토리 구성 ──────────────────────────────────────
  // history: [{ role: 'user'|'assistant', content: '...' }, ...]
  // 최근 10턴(20개 메시지)만 사용 (토큰 절약)
  const recentHistory = history.slice(-20);

  // 카드 리딩 결과가 있으면 시스템 컨텍스트에 추가
  let contextualSystem = systemPrompt;
  if (cardReading) {
    contextualSystem += `\n\n현재 사용자의 타로 카드 리딩 결과:\n${cardReading}\n이 리딩 결과를 참고하여 답변하세요.`;
  }

  const messages = [
    { role: 'system', content: contextualSystem },
    ...recentHistory,
    { role: 'user', content: message },
  ];

  // ── OpenAI API 호출 ─────────────────────────────────────────
  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',       // 빠르고 저렴한 모델 (gpt-4o로 업그레이드 가능)
        messages,
        max_tokens: 400,            // 응답 최대 길이
        temperature: 0.85,          // 창의성 (0~1, 높을수록 다양한 답변)
        presence_penalty: 0.3,      // 반복 감소
        frequency_penalty: 0.3,
      }),
    });

    if (!openaiRes.ok) {
      const errData = await openaiRes.json().catch(() => ({}));
      console.error('[Signal API] OpenAI Error:', openaiRes.status, errData);
      return res.status(502).json({
        error: 'OpenAI API 호출 실패',
        detail: errData?.error?.message || `HTTP ${openaiRes.status}`,
      });
    }

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ error: '빈 응답을 받았습니다.' });
    }

    // ── 응답 반환 ───────────────────────────────────────────────
    return res.status(200).json({
      reply,
      usage: data.usage,            // 토큰 사용량 (디버깅용)
      model: data.model,
    });

  } catch (err) {
    console.error('[Signal API] Unexpected error:', err);
    return res.status(500).json({
      error: '서버 내부 오류가 발생했습니다.',
      detail: err.message,
    });
  }
}
