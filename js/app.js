/* =============================================
   Signal — Main App JavaScript
   ============================================= */

'use strict';

// ==================== STATE ====================
const state = {
  name: '',
  gender: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  category: '',
  question: '',
  currentResult: null,
  history: [],
  selectedPlan: 'monthly'
};

// ==================== CATEGORY CONFIG ====================
const CATEGORIES = {
  love:       { label: '연애',       emoji: '💕' },
  marriage:   { label: '결혼',       emoji: '💍' },
  divorce:    { label: '이혼·별거',  emoji: '💔' },
  family:     { label: '가족',       emoji: '🏠' },
  friend:     { label: '친구',       emoji: '👫' },
  relation:   { label: '관계',       emoji: '🤝' },
  career:     { label: '커리어',     emoji: '💼' },
  startup:    { label: '창업·사업',  emoji: '🚀' },
  invest:     { label: '투자',       emoji: '📈' },
  money:      { label: '돈·재정',    emoji: '💰' },
  realestate: { label: '부동산',     emoji: '🏢' },
  legal:      { label: '법률·분쟁',  emoji: '⚖️' },
  debt:       { label: '빚·채무',    emoji: '📋' },
  health:     { label: '건강',       emoji: '🌿' },
  mind:       { label: '마음·감정',  emoji: '🌙' },
  trauma:     { label: '트라우마',   emoji: '🩹' },
  study:      { label: '공부·시험',  emoji: '📚' },
  success:    { label: '성공·목표',  emoji: '🏆' },
  future:     { label: '미래·방향',  emoji: '🔭' },
};

// Quick chips per category
const QUICK_CHIPS = {
  love:       ['그 사람에게 연락해도 될까?', '고백해도 괜찮은 타이밍일까?', '이 관계, 더 가도 될까?', '나를 좋아하는 걸까?', '감정을 표현해도 될까?'],
  marriage:   ['이 사람과 결혼해도 될까?', '지금 프로포즈해도 될까?', '결혼 시기를 미뤄야 할까?', '부모님께 말해도 될까?'],
  divorce:    ['이혼을 결심해도 되는 걸까?', '지금 말하면 상황이 더 나빠질까?', '별거를 먼저 해봐야 할까?', '아이 문제를 어떻게 풀어야 할까?', '지금이 변호사 선임 타이밍일까?'],
  family:     ['가족에게 말해도 될까?', '이 상황을 어떻게 풀어야 할까?', '거리를 둬야 할까?', '솔직하게 털어놔도 될까?'],
  friend:     ['이 친구와 계속 채워도 될까?', '먼저 연락하면 이상해 보일까?', '이 친구 나를 진짜 친구로 보는 걸까?', '이 관계 정리해야 할까?', '사과하면 받아줄까?'],
  relation:   ['내가 사과하면 받아줄까?', '이 관계를 정리해야 할까?', '먼저 연락해도 괜찮을까?', '오해를 풀 수 있을까?'],
  career:     ['이 제안을 받아들여야 할까?', '이직 타이밍이 맞을까?', '지금 말해도 될까?', '더 기다려야 할까?'],
  startup:    ['지금 창업해도 될까?', '공동창업자를 믿어도 될까?', '지금 자금 상황에서 버틸 수 있을까?', '사업을 접어야 할 시기일까?', '이 아이디어, 시장이 받아줄까?'],
  invest:     ['지금 투자해도 괜찮을까?', '이 결정이 충동인지 아닌지?', '더 기다리는 게 맞을까?', '리스크를 감수해야 할까?'],
  money:      ['이 선택이 나에게 이득일까?', '지금 결정해도 될까?', '더 정보를 모아야 할까?', '이 지출이 맞는 걸까?'],
  realestate: ['지금 집을 사야 할까?', '이 가격이 적정한 걸까?', '전세 vs 월세 어떤 게 나을까?', '대출을 더 받아도 괜찮을까?', '지금 팔아야 할 타이밍일까?'],
  legal:      ['법적 대응을 해야 할까?', '지금 합의하는 게 맞을까?', '변호사 없이 혼자 해결할 수 있을까?', '내가 법적으로 불리한 건 아닐까?', '고소·고발을 해야 할 상황인가?'],
  debt:       ['지금 빚을 갚을 수 있을까?', '대출을 받아서 메워야 할까?', '개인회생을 고려해봐야 할까?', '채권자와 협상이 가능할까?', '이 상황에서 버틸 수 있을까?'],
  health:     ['몸 상태를 무시해도 될까?', '지금 쉬어야 할까?', '병원에 가야 할 타이밍일까?', '이 상태가 오래 갈까?'],
  mind:       ['이 감정이 지나갈까?', '혼자 버텨도 될까?', '누군가에게 말해야 할까?', '지금 감정이 맞는 걸까?'],
  trauma:     ['이 기억에서 벗어날 수 있을까?', '전문가의 도움이 필요한 걸까?', '가까운 사람에게 말해도 될까?', '지금 내 반응이 정상인 걸까?', '이 감정을 어떻게 다뤄야 할까?'],
  study:      ['지금 이 방식으로 계속해도 될까?', '집중력이 왜 이렇게 안 될까?', '포기하면 안 되는 걸까?', '우선순위를 바꿔야 할까?'],
  success:    ['지금 이 방향이 맞을까?', '포기하고 새 길을 찾아야 할까?', '조금 더 버텨야 할까?', '이 목표가 나에게 맞을까?'],
  future:     ['이 선택이 장기적으로 맞을까?', '지금 변화가 필요한 걸까?', '더 고민해야 할까?', '이 방향이 나답을까?'],
  default:    ['그 사람에게 연락해도 될까?', '지금 말해도 되는 타이밍일까?', '기다리는 게 맞아, 끝내는 게 맞아?', '내가 사과하면 받아줄까?', '이 선택, 지금 나에게 맞을까?', '이 관계, 더 가도 될까?']
};

// ==================== SIGNAL ANALYSIS DATA ====================
const ANALYSIS = {
  love: {
    summaries: [
      { text: '흐름이 열려 있어', sub: '가볍게 먼저 닿아보는 쪽이 훨씬 좋아 보여.' },
      { text: '지금은 조금 이른 흐름이야', sub: '분위기를 더 쌓아두고 나서 움직이는 게 나아.' },
      { text: '상대가 반응하고 있어', sub: '지금 이 타이밍을 놓치지 마.' },
      { text: '조심스러운 신호가 있어', sub: '무리하지 않고 천천히 가는 쪽이 맞아.' },
    ],
    flows: [
      '상대가 완전히 닫혀 있는 건 아닌데, 지금 바로 결론을 내려고 하면 부담이 커질 수 있어. 가벼운 접점을 먼저 만드는 쪽이 좋아.',
      '최근 반응은 나쁘지 않지만, 부담이 커지는 질문에는 방어가 올라갈 가능성이 있어. 자연스럽게 연결을 유지하는 편이 좋아.',
      '흐름이 좋을 때 한 발 더 나아가는 건 맞는데, 너무 빠르면 역효과야. 한 단계씩이 좋아.',
      '지금은 감정보다 관계의 편안함이 먼저야. 먼저 편한 사이라는 인상을 쌓아야 해.',
    ],
    nexts: [
      ['오늘은 가벼운 안부가 좋아', '결론을 묻기보다 분위기를 여는 질문이 맞아', '이번엔 설득보다 공감이 먼저야'],
      ['만나는 자리를 자연스럽게 만들어봐', '큰 고백보다 작은 제안으로 시작해', '상대의 반응을 보면서 천천히 나아가'],
      ['지금 이 타이밍에 먼저 연락해봐', '가벼운 약속을 먼저 잡아봐', '상대가 편하게 받을 수 있는 제안을 해'],
      ['지금은 기다리는 타이밍이야', '자연스러운 접점을 늘려가는 게 먼저야', '부담 없이 존재감을 유지해'],
    ],
    phrases: [
      ['요즘 어때? 잘 지내고 있어?', '이번에 같이 밥 한번 먹을까?', '생각나서 연락했어. 오늘 뭐해?'],
      ['오늘 좋은 거 먹었어? 맛있는 거 생각나서', '이번 주말에 시간 있어?', '너 요즘 뭐에 빠져 있어?'],
      ['솔직히 말하면, 자꾸 생각나더라', '같이 있으면 편한데 그냥 좋더라', '한번 만날 수 있을까?'],
    ],
    avoids: [
      ['나 좋아해?처럼 결론을 강요하는 질문', '감정이 너무 강하게 드러나는 표현', '답을 강요하거나 몰아붙이는 상황'],
      ['먼저 연락하지도 않고 기다리기만 하는 것', '과한 선물이나 갑작스러운 고백', '한 번에 모든 감정을 다 쏟아내는 것'],
    ]
  },

  invest: {
    summaries: [
      { text: '충분히 생각하고 움직이는 게 맞아', sub: '지금 충동적인 결정보다 한 발 더 멈추는 게 이득일 수 있어.' },
      { text: '정보가 더 필요한 상태야', sub: '지금 결정하기엔 변수가 많아 보여.' },
      { text: '리스크를 감수할 준비가 됐다면', sub: '단, 잃어도 괜찮은 범위 안에서 움직여야 해.' },
    ],
    flows: [
      '투자 결정은 감정보다 시스템이 먼저야. 지금 느끼는 긴박감이 실제 기회인지 조급함인지 한 번 더 확인해봐.',
      '정보가 충분하지 않은 상태에서 내리는 결정은 도박이 될 수 있어. 분석이 끝난 뒤 움직여도 늦지 않아.',
      '리스크와 기대 수익의 비율을 먼저 따져봐. 손실이 났을 때도 감당할 수 있는 범위인지가 핵심이야.',
    ],
    nexts: [
      ['결정 전에 손실 시나리오를 먼저 적어봐', '한 가지 정보만 더 확인하고 결정해', '24시간 뒤에도 같은 생각이면 그때 결정해'],
      ['소액으로 먼저 경험해봐', '전문가 의견을 하나 더 들어봐', '감정이 가라앉은 상태에서 다시 생각해'],
    ],
    phrases: [
      ['지금 이 결정, 1년 후에도 후회 없을까?', '손실이 나도 괜찮은 금액인지 한 번 더 봐', '충동인지 확신인지 하루 자고 판단해'],
    ],
    avoids: [
      ['FOMO(놓칠 것 같은 두려움)에 기반한 결정', '한꺼번에 다 걸어버리는 선택', '손실이 났을 때 버티지 못할 수준의 투자'],
    ]
  },

  career: {
    summaries: [
      { text: '지금 움직이기 좋은 흐름이야', sub: '타이밍을 놓치지 않는 게 중요해.' },
      { text: '한 발 물러서서 볼 필요가 있어', sub: '감정적인 결정보다 전략적인 판단이 필요한 시기야.' },
      { text: '더 많은 정보가 필요해', sub: '충분히 준비된 뒤에 움직이는 게 맞아.' },
    ],
    flows: [
      '커리어 결정은 지금 당장보다 3년 후를 봐야 해. 지금 선택이 어느 방향으로 이어질지를 먼저 그려봐.',
      '좋은 기회도 타이밍이 맞지 않으면 리스크야. 지금 내 상태와 준비도를 함께 봐야 해.',
      '이직이나 전환은 도망이 아니라 전략이어야 해. 지금 결정이 어느 쪽인지 한 번만 더 돌아봐.',
    ],
    nexts: [
      ['3년 후 원하는 모습을 먼저 적어봐', '지금 선택이 그 방향과 맞는지 확인해', '한 명에게 솔직하게 털어놓고 조언을 들어봐'],
      ['구체적인 정보를 더 모아봐', '현재 위치에서 할 수 있는 최선을 먼저 해봐', '타이밍을 조금 더 지켜봐'],
    ],
    phrases: [
      ['이 선택이 장기적으로 나에게 맞는지 한 번 더 봐', '지금 현실적인 조건을 하나씩 적어봐', '결정 전에 신뢰하는 사람의 의견을 들어봐'],
    ],
    avoids: [
      ['감정적인 상태에서 내리는 즉흥적 결정', '주변 시선이나 비교에서 나온 결정', '현실적인 준비 없이 뛰어드는 것'],
    ]
  },

  friend: {
    summaries: [
      { text: '이 우정, 아직 살아 있어',       sub: '지금 가볍게 먼저 닿아봐. 기다리는 것보다 낫어.' },
      { text: '서로 거리가 생긴 것 같아',       sub: '억지로 붙잡기보단 자연스러운 접점을 만드는 게 나아.' },
      { text: '이 친구, 네 마음을 모르고 있어', sub: '솔직하게 털어놓으면 의외로 쉽게 풀릴 수 있어.' },
      { text: '지금은 각자의 시간이 필요해',    sub: '잠깐 떨어져 있는 것도 우정을 지키는 방법이야.' },
    ],
    flows: [
      '친구 관계는 연애처럼 고백이 필요하지 않아. 가벼운 안부 하나가 쌓인 거리를 단번에 좁힐 수 있어. 오늘 짧은 메시지 하나가 시작이야.',
      '가까운 친구일수록 오해가 쌓이면 말하기 더 어려워져. 하지만 오래 묵힐수록 더 어색해져. 지금 솔직하게 한마디가 나중보다 훨씬 쉬워.',
      '모든 우정이 같은 속도로 유지될 필요는 없어. 지금 멀어진 게 끝이 아니야. 서로 자리를 지키고 있으면 언젠가 다시 연결돼.',
    ],
    nexts: [
      ['오늘 안부 메시지 하나만 보내봐', '같이 뭔가 할 수 있는 제안을 해봐', '억지로 설명하려 하지 말고 그냥 연락해'],
      ['솔직하게 "요즘 좀 어색한 것 같아서"라고 말해봐', '상대 입장을 한 번 더 생각해봐', '작은 오해라면 지금 바로 풀어도 돼'],
      ['지금은 기다리는 타이밍이야', '각자 바쁜 시기를 이해해줘', '억지로 채우려 하지 않아도 돼'],
    ],
    phrases: [
      ['요즘 어때? 생각나서 연락했어.', '오랜만에 밥 한번 먹을까?', '별거 아닌데 그냥 보고 싶었어.'],
    ],
    avoids: [
      ['왜 연락 안 했어?처럼 따지는 말투', '서운함을 한꺼번에 쏟아내는 것', '억지로 만남을 강요하는 것'],
    ]
  },

  divorce: {
    summaries: [
      { text: '마음이 이미 결론에 가 있어', sub: '지금 느끼는 감정은 충동이 아니라 누적된 신호야.' },
      { text: '아직 결정할 타이밍이 아니야', sub: '감정이 가라앉은 상태에서 다시 봐야 해.' },
      { text: '법적 준비가 먼저야', sub: '감정보다 현실적인 준비가 지금 네 방패야.' },
      { text: '혼자 감당하기엔 너무 무거워', sub: '전문가 도움을 받는 게 지금 할 수 있는 최선이야.' },
    ],
    flows: [
      '이혼을 결심했다면, 감정보다 절차가 먼저야. 재산·양육·위자료 관련 증거를 지금부터 차분히 모아두는 게 나중에 훨씬 유리해.',
      '아직 결심이 서지 않았다면, 잠깐 별거 기간을 두는 것도 방법이야. 거리를 두면 더 명확하게 보이는 게 있어.',
      '상대방이 먼저 이혼을 요구하는 상황이라면 절대 감정적으로 반응하지 마. 법적으로 불리해지지 않도록 먼저 전문가와 상의해.',
    ],
    nexts: [
      ['혼인 중 재산 증거부터 정리해봐', '법률 상담은 무료도 많으니 일단 전화해봐', '아이 문제는 감정 아닌 현실 기준으로 생각해'],
      ['지금 당장 결정 안 해도 괜찮아', '신뢰할 수 있는 사람 한 명에게 털어놔봐', '내 감정을 글로 먼저 정리해봐'],
      ['법적 권리를 먼저 파악해', '상대방 동의 없이도 가능한 절차를 알아봐', '감정적 대응은 잠깐 미뤄둬'],
    ],
    phrases: [
      ['지금 내 감정이 맞아. 억누르지 않아도 돼.', '한 번에 다 해결 안 해도 돼.', '이 결정, 네가 틀린 게 아니야.'],
    ],
    avoids: [
      ['감정적인 상태에서 서류에 서명하는 것', '증거 없이 구두 합의만 믿는 것', '아이를 협상 수단으로 사용하는 것'],
    ]
  },

  startup: {
    summaries: [
      { text: '지금 이 아이디어, 시장이 원하고 있어', sub: '타이밍이 맞는 흐름이야. 너무 오래 고민하지 마.' },
      { text: '검증이 먼저야', sub: '열정만큼 현실적인 수치도 함께 봐야 해.' },
      { text: '자금보다 사람이 먼저야', sub: '믿을 수 있는 팀이 없으면 돈도 소용없어.' },
      { text: '지금은 버티는 게 전략이야', sub: '포기선을 정해두고, 그 전까지는 끝까지 가봐.' },
    ],
    flows: [
      '창업은 아이디어가 아니라 실행이야. 완벽한 준비보다 작은 테스트를 먼저 해봐. 시장 반응이 진짜 답이야.',
      '공동창업자와의 갈등은 초기에 명확하게 해야 해. 지분·역할·의사결정 방식을 구두가 아닌 문서로 정리해둬.',
      '사업이 어렵다고 느껴질 때는 숫자를 봐. 감이 아니라 데이터가 방향을 알려줘. 지금 핵심 지표가 뭔지 다시 확인해봐.',
    ],
    nexts: [
      ['MVP 하나만 먼저 시장에 내놔봐', '고객 인터뷰 5명만 해봐', '이번 달 버텨낼 현금 흐름부터 계산해'],
      ['공동창업자와 역할 문서화를 먼저 해', '투자보다 매출이 먼저야', '작은 성공 하나를 만들어 자신감을 쌓아'],
    ],
    phrases: [
      ['완벽하지 않아도 지금 내놓는 게 맞아.', '한 명의 팬을 먼저 만들어봐.', '지금 아니면 언제? 타이밍은 기다리지 않아.'],
    ],
    avoids: [
      ['검증 없이 대규모 투자를 유치하려는 것', '공동창업자 지분을 대화로만 정하는 것', '고객 없이 기능만 계속 추가하는 것'],
    ]
  },

  realestate: {
    summaries: [
      { text: '지금 시장 흐름, 신중하게 봐야 해', sub: '감정이 아니라 데이터 기반으로 움직여야 할 시기야.' },
      { text: '타이밍이 맞을 수 있어', sub: '단, 대출 한도와 상환 능력을 먼저 따져봐.' },
      { text: '정보가 더 필요한 상태야', sub: '지금 결정은 이르고, 한 단계 더 분석이 필요해.' },
      { text: '지금 팔기보다 버티는 게 맞아', sub: '단기 손실에 흔들리지 마.' },
    ],
    flows: [
      '부동산 결정은 10년을 보는 게 기본이야. 단기 시세 변동보다 그 지역의 인프라, 인구 흐름, 개발 계획이 더 중요해.',
      '전세·매매·청약 중 어떤 선택이든, 지금 내 현금 흐름과 대출 상환 능력을 먼저 정확하게 파악해야 해.',
      '부동산 시장 정보는 빠르게 변해. 지금 계약하기 전에 등기부등본, 실거래가, 세금 관련 사항을 꼭 확인해봐.',
    ],
    nexts: [
      ['국토부 실거래가 사이트에서 3년치 시세 확인해봐', '대출 상환 시뮬레이션을 먼저 돌려봐', '공인중개사 최소 3곳에 물어봐'],
      ['청약 당첨 가점부터 먼저 계산해봐', '전세보증보험 가입 여부 확인해봐', '등기부등본의 근저당 설정 여부 확인이 필수야'],
    ],
    phrases: [
      ['서두르지 마. 좋은 매물은 또 나와.', '한 달만 더 보고 결정해도 늦지 않아.', '숫자가 맞아야 마음이 편해.'],
    ],
    avoids: [
      ['급매라는 말에 서두르는 것', '등기부등본 확인 없이 계약하는 것', '감당 못 할 대출로 무리하게 매수하는 것'],
    ]
  },

  legal: {
    summaries: [
      { text: '법적 대응이 필요한 흐름이야', sub: '시간이 지날수록 불리해질 수 있어. 지금 움직여야 해.' },
      { text: '먼저 증거를 확보해야 해', sub: '아무리 억울해도 증거 없이는 싸우기 어려워.' },
      { text: '합의가 더 유리할 수 있어', sub: '장기전보다 현실적인 선택이 나을 때도 있어.' },
      { text: '전문가 없이는 혼자 판단하기 어려워', sub: '무료 법률 상담부터 시작해봐.' },
    ],
    flows: [
      '법적 분쟁에서 가장 중요한 건 타이밍이야. 시효가 있는 사안은 지금 바로 움직여야 하고, 대화보다 문서가 먼저야.',
      '상대방이 유리한 위치에 있더라도 증거가 있으면 싸울 수 있어. 카톡·이메일·영수증·녹음 — 지금 당장 다 모아둬.',
      '법정 싸움은 돈과 시간이 많이 들어. 합의로 끝낼 수 있는 수준이라면, 먼저 합의 시도 후 거절 시 법적 절차를 밟는 게 현실적이야.',
    ],
    nexts: [
      ['관련 대화·증거 스크린샷을 지금 저장해봐', '대한법률구조공단 무료 상담(국번없이 132) 전화해봐', '시효 기간을 먼저 확인해봐'],
      ['내용증명부터 발송하는 것도 방법이야', '고소와 민사 중 어떤 절차가 맞는지 확인해봐', '변호사 없이도 소액사건은 혼자 진행 가능해'],
    ],
    phrases: [
      ['억울하더라도 감정적으로 대응하면 져.', '증거가 쌓일 때까지는 조용히 준비해.', '너만 당하는 게 아니야. 법은 있어.'],
    ],
    avoids: [
      ['상대방 말만 믿고 구두 합의로 끝내는 것', '화가 나서 SNS에 바로 폭로하는 것', '시효를 놓치도록 미루는 것'],
    ]
  },

  debt: {
    summaries: [
      { text: '지금 상황, 혼자 감당하기 어려운 수준이야', sub: '숨기지 말고 전문가와 현실적인 방법을 찾아봐.' },
      { text: '버틸 수 있어, 단 전략이 필요해', sub: '막연히 버티는 게 아니라 계획이 있어야 해.' },
      { text: '우선순위 정리가 먼저야', sub: '이자율 높은 빚부터 순서대로 정리하는 게 핵심이야.' },
      { text: '법적 제도를 활용할 수 있어', sub: '개인회생·파산이 끝이 아니라 새 시작일 수 있어.' },
    ],
    flows: [
      '빚이 있다고 모든 게 끝난 게 아니야. 지금 중요한 건 현실을 직시하는 것. 총 부채 규모, 이자율, 월 상환액을 한 번에 적어봐.',
      '다중 채무 상태라면 고금리 빚부터 갚는 게 원칙이야. 대환대출이나 서민금융 상품으로 이자 부담을 먼저 줄여봐.',
      '상환이 불가능한 수준이라면 개인회생이나 워크아웃 제도를 알아봐. 부끄러운 게 아니라 법이 마련한 회복 제도야.',
    ],
    nexts: [
      ['총 부채와 이자를 한 장에 정리해봐', '서민금융진흥원(1397) 무료 상담 받아봐', '신용회복위원회 채무조정 제도 알아봐'],
      ['현재 지출 중 줄일 수 있는 항목을 먼저 찾아봐', '추가 대출보다 상환 우선순위를 정해', '가족·지인 차용 전 문서화는 필수야'],
    ],
    phrases: [
      ['빚이 있다고 네 가치가 줄어드는 게 아니야.', '이 상황, 혼자 해결 안 해도 돼.', '한 발씩, 갚을 수 있어.'],
    ],
    avoids: [
      ['새 대출로 기존 빚을 막는 돌려막기', '채권자 연락을 무시하고 숨는 것', '시효 소멸 전에 갚을 의사 표시를 잘못 하는 것'],
    ]
  },

  trauma: {
    summaries: [
      { text: '그 감정, 네가 약한 게 아니야', sub: '충분히 힘든 상황을 겪었고, 지금 반응은 자연스러운 거야.' },
      { text: '혼자 감당하기엔 너무 무거워', sub: '전문 상담사의 도움을 받는 게 지금 할 수 있는 가장 용감한 선택이야.' },
      { text: '회복은 직선이 아니야', sub: '좋았다 나빴다를 반복해도 괜찮아. 그게 정상이야.' },
      { text: '지금 네 몸이 먼저야', sub: '마음보다 먼저 몸의 신호를 챙겨야 할 때야.' },
    ],
    flows: [
      '트라우마는 의지로 극복하는 게 아니야. 뇌와 몸의 반응이기 때문에 제대로 된 도움을 받는 게 훨씬 효과적이야.',
      '지금 당장 말하기 어렵다면 글로 먼저 써봐. 혼자서도 감정을 정리하는 데 도움이 돼. 그 다음 단계를 그때 결정해도 늦지 않아.',
      '회복 중에 주변에 말하기 어려울 수 있어. 국가 정신건강 위기상담 전화(1577-0199)는 24시간이야. 혼자가 아니야.',
    ],
    nexts: [
      ['지금 느끼는 감정을 3줄로만 써봐', '정신건강위기상담전화(1577-0199) 저장해둬', '오늘 하루 몸을 쉬게 해주는 것부터 해봐'],
      ['믿을 수 있는 사람 한 명에게 짧게 털어놔봐', '상담 센터 예약 하나만 잡아봐', '지금 이 감정이 이상한 게 아님을 알아줘'],
    ],
    phrases: [
      ['네가 잘못한 게 아니야.', '이 고통, 영원하지 않아.', '도움을 요청하는 게 용기 있는 거야.'],
    ],
    avoids: [
      ['억지로 감정을 없애려는 것', '혼자 다 이겨내려는 것', '술이나 자극으로 감각을 무디게 하는 것'],
    ]
  },

  default: {
    summaries: [
      { text: '지금 흐름은 나쁘지 않아', sub: '조심스럽게 한 발 더 나아가볼 수 있어.' },
      { text: '조금 더 기다려보는 게 맞아', sub: '지금은 상황이 더 무르익을 시간이 필요해.' },
      { text: '방향은 맞아, 타이밍이 중요해', sub: '지금 이 순간이 움직이기 좋은 타이밍이야.' },
      { text: '한 발 물러서서 보는 게 좋아', sub: '지금은 결정보다 관찰이 더 유리한 상태야.' },
    ],
    flows: [
      '지금 상황의 핵심은 타이밍이야. 너무 앞서가지도, 너무 늦지도 않게 움직이는 게 중요해. 상대나 상황의 신호를 한 번 더 확인해봐.',
      '지금 느끼는 불확실함은 정보가 부족해서가 아니라, 결정에 대한 두려움일 수 있어. 최악의 시나리오를 먼저 적어보면 훨씬 명확해져.',
      '좋은 결정은 빠른 결정이 아니야. 지금 서두르지 않고 한 박자 여유를 두는 게 오히려 더 나은 결과로 이어질 수 있어.',
      '지금 이 상황에서 가장 중요한 건 관계야. 결과보다 신뢰를 먼저 챙기면 나머지가 훨씬 수월해질 거야.',
    ],
    nexts: [
      ['오늘은 작은 한 가지만 해봐', '결론보다 분위기를 먼저 만들어', '상대의 반응을 한 번 더 확인해'],
      ['지금 당장 결정하지 않아도 돼', '더 많은 정보를 모아봐', '믿을 수 있는 사람에게 조언을 구해봐'],
      ['지금 이 타이밍에 움직여', '준비가 됐으면 한 발 더 나아가', '너무 오래 기다리지 마'],
      ['잠깐 멈추고 전체 그림을 봐', '감정이 가라앉은 뒤에 결정해', '급하게 결론 내리지 않아도 돼'],
    ],
    phrases: [
      ['지금 어때? 요즘 잘 지내고 있어?', '한번 가볍게 만나볼까?', '편하게 얘기할 수 있을까?'],
      ['솔직하게 말해도 될까?', '잠깐 시간 있어? 할 말이 있어', '부담 없이 들어줄 수 있어?'],
    ],
    avoids: [
      ['감정이 가득한 상태에서 결론을 강요하는 것', '너무 많은 것을 한꺼번에 요구하는 것', '상대의 반응을 무시하고 밀어붙이는 것'],
      ['아무 행동도 하지 않고 기다리기만 하는 것', '주변 눈치를 너무 보는 것', '완벽한 순간을 기다리다가 기회를 놓치는 것'],
    ]
  }
};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  initYearDropdown();
  initDayDropdown();
  loadProfile();
  loadHistory();
  initParticles();
  initTextarea();
  updateProfileDisplay();
});

function initYearDropdown() {
  const sel = document.getElementById('birthYear');
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 1940; y--) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = `${y}년`;
    sel.appendChild(opt);
  }
}

function initDayDropdown() {
  updateDays();
}

function updateDays() {
  const yearEl = document.getElementById('birthYear');
  const monthEl = document.getElementById('birthMonth');
  const dayEl = document.getElementById('birthDay');

  const year = parseInt(yearEl.value) || 2000;
  const month = parseInt(monthEl.value) || 1;
  const daysInMonth = new Date(year, month, 0).getDate();

  const prevDay = dayEl.value;
  dayEl.innerHTML = '<option value="">일</option>';
  for (let d = 1; d <= daysInMonth; d++) {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = `${d}일`;
    dayEl.appendChild(opt);
  }
  if (prevDay && parseInt(prevDay) <= daysInMonth) dayEl.value = prevDay;
}

function loadProfile() {
  const saved = localStorage.getItem('signal_profile');
  if (!saved) return;
  try {
    const p = JSON.parse(saved);
    state.name = p.name || '';
    state.gender = p.gender || '';
    state.birthYear = p.birthYear || '';
    state.birthMonth = p.birthMonth || '';
    state.birthDay = p.birthDay || '';
    state.category = p.category || '';

    if (state.name) document.getElementById('inputName').value = state.name;
    if (state.gender) {
      const btn = document.querySelector(`.gender-btn[data-value="${state.gender}"]`);
      if (btn) { document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
    }
    if (state.birthYear) { document.getElementById('birthYear').value = state.birthYear; updateDays(); }
    if (state.birthMonth) document.getElementById('birthMonth').value = state.birthMonth;
    if (state.birthDay) document.getElementById('birthDay').value = state.birthDay;
    if (state.category) {
      const chip = document.querySelector(`.cat-chip[data-value="${state.category}"]`);
      if (chip) { document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active')); chip.classList.add('active'); }
      updateQuickChips(state.category);
    }
  } catch(e) {}
}

function saveProfile() {
  state.name = document.getElementById('inputName').value.trim();
  state.birthYear = document.getElementById('birthYear').value;
  state.birthMonth = document.getElementById('birthMonth').value;
  state.birthDay = document.getElementById('birthDay').value;
  localStorage.setItem('signal_profile', JSON.stringify({
    name: state.name,
    gender: state.gender,
    birthYear: state.birthYear,
    birthMonth: state.birthMonth,
    birthDay: state.birthDay,
    category: state.category,
  }));
}

function loadHistory() {
  try {
    const h = localStorage.getItem('signal_history');
    if (h) state.history = JSON.parse(h);
  } catch(e) { state.history = []; }
}

function saveHistory() {
  localStorage.setItem('signal_history', JSON.stringify(state.history.slice(0, 50)));
}

// ==================== TEXTAREA ====================
function initTextarea() {
  const ta = document.getElementById('questionInput');
  ta.addEventListener('input', () => {
    document.getElementById('charCount').textContent = ta.value.length;
  });
  ta.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') startAnalysis();
  });
}

// ==================== INPUTS ====================
function selectGender(btn) {
  document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.gender = btn.dataset.value;
  saveProfile();
}

function selectCategory(chip) {
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  state.category = chip.dataset.value;
  updateQuickChips(state.category);
  saveProfile();
}

function updateQuickChips(cat) {
  const chips = QUICK_CHIPS[cat] || QUICK_CHIPS.default;
  const container = document.getElementById('quickChips');
  container.innerHTML = chips.map(q =>
    `<button type="button" class="quick-chip" onclick="setQuestion(this.textContent)">${q}</button>`
  ).join('');
}

function setQuestion(text) {
  const ta = document.getElementById('questionInput');
  ta.value = text;
  document.getElementById('charCount').textContent = text.length;
  ta.focus();
}

// ==================== SCREEN MANAGEMENT ====================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`screen-${name}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (name === 'history') { renderHistory(); updateTabActive('history'); }
  if (name === 'settings') { updateProfileDisplay(); updateTabActive(null); }
  if (name === 'home')    updateTabActive('home');
  if (name === 'result')  updateTabActive(null);
  if (name === 'chat')    updateTabActive('chat');
}

// ==================== BOTTOM TAB ====================
function switchTab(tab) {
  if (tab === 'home') {
    showScreen('home');
  } else if (tab === 'history') {
    showScreen('history');
  } else if (tab === 'chat') {
    showScreen('chat');
    initChatPage();
    // 입력창 포커스
    setTimeout(() => {
      const inp = document.getElementById('chatPageInput');
      if (inp) inp.focus();
    }, 200);
  }
  updateTabActive(tab);
}

function updateTabActive(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (tab) {
    const btn = document.getElementById(`tab-${tab}`);
    if (btn) btn.classList.add('active');
  }
}

// ==================== CHAT PAGE (단독) ====================
let chatPageInited = false;

function initChatPage() {
  // 결과가 없어도 기본 대화 가능
  if (!chatPageInited) {
    chatPageInited = true;
    // 첫 메시지는 HTML에 이미 있음
  }
  // 분석 결과가 있으면 컨텍스트 동기화
  if (state.currentResult) {
    CHAT_CONTEXT.result = state.currentResult;
  }
}

function handleChatPageKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChatPage();
  }
}

async function sendChatPage() {
  const input = document.getElementById('chatPageInput');
  const text  = input.value.trim();
  if (!text) return;
  input.value = '';

  // 입력창 일시 비활성화
  input.disabled = true;

  appendChatPageMsg('user', text);
  CHAT_CONTEXT.history.push({ role: 'user', text });

  // typing indicator
  const typingId = showChatPageTyping();

  let reply = null;

  // ── LLM API 호출 ──
  if (LLM_ENABLED) {
    reply = await _callLlmApi(text, CHAT_CONTEXT.result, CHAT_CONTEXT.history);
  }

  // ── fallback ──
  if (!reply) {
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    if (CHAT_CONTEXT.result) {
      reply = generateChatReply(text, CHAT_CONTEXT.result, CHAT_CONTEXT.history);
    } else {
      reply = generateNakedChatReply(text);
    }
  }

  removeChatPageTyping(typingId);
  CHAT_CONTEXT.history.push({ role: 'signal', text: reply });
  appendChatPageMsg('signal', reply);

  // 입력창 재활성화
  input.disabled = false;
  input.focus();
}

function appendChatPageMsg(role, text) {
  const container = document.getElementById('chatPageMessages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${role === 'signal' ? 'signal-msg' : 'user-msg'}`;
  div.innerHTML = `<div class="msg-bubble">${escapeHtml(text).replace(/\n/g, '<br>')}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showChatPageTyping() {
  const container = document.getElementById('chatPageMessages');
  if (!container) return '';
  const id = 'cpt-' + Date.now();
  const div = document.createElement('div');
  div.className = 'chat-msg signal-msg';
  div.id = id;
  div.innerHTML = `<div class="typing-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeChatPageTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// 분석 결과 없이도 기본 답변
function generateNakedChatReply(text) {
  const q = text.toLowerCase();
  if (/안녕|hi|hello|ㅎㅎ|ㅋㅋ/.test(q))
    return '🔮 어서 와요. 여기 Signal에는 연애·결혼·이혼, 투자·재물, 커리어·창업, 법률·채무, 마음·트라우마 분야의 신점 보살·도사들이 함께해요. 어떤 고민이 있어서 오셨어요? 홈에서 상황 먼저 적어봐요.';
  if (/기능|어떻게|뭐야|뭐하는|Signal/.test(q))
    return '🔮 Signal은 지금 이 상황의 기운을 읽어주는 곳이에요. 연애부터 돈, 일, 마음까지 — 각 분야 신점을 30년 이상 봐온 보살·도사들이 흐름을 같이 봐드려요. 홈에서 고민 먼저 적어봐요.';
  if (/연애|고백|좋아해|사랑|이별|헤어/.test(q))
    return '너의 운의 시그널을 보면,\n\n인연 고민이구나. 기운을 제대로 읽으려면 상황을 먼저 알아야 해요. 홈에서 구체적으로 적어봐요. 그래야 제대로 봐줄 수 있어요.';
  if (/투자|주식|코인|ETF|펀드/.test(q))
    return '너의 운의 시그널을 보면,\n\n재물 기운 보고 싶구나. 홈에서 상황 먼저 적어봐요. 지금 들어갈 타이밍인지, 빠져야 할 타이밍인지 기운을 읽어줄게요.';
  if (/창업|사업|스타트업/.test(q))
    return '너의 운의 시그널을 보면,\n\n사업 기운이 있구나. 홈에서 지금 상황을 적어봐요. 흐름이 열려 있는지, 타이밍이 맞는지 같이 봐줄게요.';
  if (/이직|커리어|직장|취업/.test(q))
    return '너의 운의 시그널을 보면,\n\n직업 운 보러 왔구나. 홈에서 지금 상황 적어봐요. 이 직장이 맞는 건지, 지금 나가야 할 타이밍인지 기운을 읽어줄게요.';
  if (/법|소송|분쟁|변호사|고소/.test(q))
    return '너의 운의 시그널을 보면,\n\n송사 기운이 복잡하구나. 홈에서 상황 먼저 적어봐요. 이 싸움이 유리하게 흘러갈지, 합의가 나을지 기운을 봐줄게요.';
  if (/우울|불안|힘들|마음|감정/.test(q))
    return '너의 운의 시그널을 보면,\n\n많이 지쳐 있구나... 홈에서 지금 상황 적어봐요. 이 감정이 어디서 오는 건지, 어떻게 풀어야 하는지 같이 봐줄게요.';
  if (/트라우마|상처|과거/.test(q))
    return '너의 운의 시그널을 보면,\n\n오래된 상처구나. 홈에서 상황 먼저 적어봐요. 이 상처가 어떻게 흐르고 있는지, 어디서부터 풀어야 하는지 같이 봐줄게요.';
  if (/부동산|집|아파트|전세|매매/.test(q))
    return '너의 운의 시그널을 보면,\n\n터 기운 보러 왔구나. 홈에서 상황 적어봐요. 지금 이 자리가 맞는 터인지, 타이밍이 맞는지 읽어줄게요.';
  const defaults = [
    '🔮 어떤 고민이에요? 홈에서 상황 먼저 적어봐요. 기운을 읽으려면 상황을 알아야 해요.',
    '🔮 말하기 어려운 고민이 있구나. 홈에서 적어봐요. 뭐든 같이 봐줄게요.',
    '🔮 어떤 흐름인지 기운을 읽어줄게요. 홈에서 지금 상황을 적어봐요.',
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

// ==================== ANALYSIS ====================
function startAnalysis() {
  state.question = document.getElementById('questionInput').value.trim();
  if (!state.question) {
    showToast('고민을 입력해줘 😊');
    document.getElementById('questionInput').focus();
    return;
  }
  saveProfile();
  showScreen('loading');

  const name = document.getElementById('inputName').value.trim();
  const loadText = name ? `${name}의 흐름을 읽는 중이야...` : '흐름을 읽는 중이야...';
  document.getElementById('loadingName').textContent = loadText;

  const delay = 1800 + Math.random() * 800;
  setTimeout(() => {
    const result = calculateSignal();
    state.currentResult = result;
    showScreen('result');           // 화면 먼저 전환
    requestAnimationFrame(() => {   // DOM 표시 후 렌더링
      renderResult(result);
    });
  }, delay);
}

function getAge() {
  const year = parseInt(document.getElementById('birthYear').value);
  if (!year) return null;
  const age = new Date().getFullYear() - year;
  if (age < 10 || age > 110) return null;
  return age;
}

function getAgeGroup(age) {
  if (!age) return '';
  if (age < 20) return '10대';
  if (age < 30) return '20대';
  if (age < 40) return '30대';
  if (age < 50) return '40대';
  if (age < 60) return '50대';
  return '60대 이상';
}

function calculateSignal() {
  const cat = state.category || 'default';
  const q = state.question.toLowerCase();
  const age = getAge();
  const name = document.getElementById('inputName').value.trim();
  const gender = state.gender;

  // --- Base accept probability ---
  let accept = 40 + Math.floor(Math.random() * 35);

  // Question sentiment keywords
  const positiveKw = ['잘', '좋아', '됩니까', '될까', '가도', '해도', '있을까', '괜찮', '맞을까', '타이밍'];
  const negativeKw = ['싫어', '힘들', '어려', '불안', '걱정', '모르겠', '두려', '망설'];

  positiveKw.forEach(kw => { if (q.includes(kw)) accept += 4; });
  negativeKw.forEach(kw => { if (q.includes(kw)) accept -= 5; });

  // Category-based bias
  const catBias = {
    love: 5, marriage: 3, divorce: -10, family: 4, friend: 3, relation: 3,
    career: 0, startup: -5, invest: -8, money: -5, realestate: -6,
    legal: -12, debt: -15, health: -2, mind: -3, trauma: -10,
    study: 2, success: 0, future: 2
  };
  accept += (catBias[cat] || 0);

  // Age adjustment (gentle)
  if (age) {
    if (age < 25) accept += 5;
    else if (age > 50) accept -= 5;
  }

  // Clamp
  accept = Math.min(Math.max(accept, 15), 88);

  // --- Risk ---
  let risk = 20 + Math.floor(Math.random() * 30);
  const riskKw = ['고백', '부탁', '거절', '싫어', '강요', '화', '갑자기', '무조건'];
  riskKw.forEach(kw => { if (q.includes(kw)) risk += 6; });
  risk += Math.max(0, 80 - accept) / 5;
  risk = Math.min(Math.max(risk, 8), 80);

  // --- Analysis text ---
  const data = ANALYSIS[cat] || ANALYSIS.default;
  const summaryIdx = accept >= 65 ? 0 : accept >= 50 ? 2 : accept >= 35 ? 1 : 3;
  const summaryList = data.summaries || ANALYSIS.default.summaries;
  const summary = summaryList[summaryIdx % summaryList.length];

  const flows = data.flows || ANALYSIS.default.flows;
  const flow = flows[Math.floor(Math.random() * flows.length)];

  const nextsSet = data.nexts || ANALYSIS.default.nexts;
  const nextIdx = accept >= 60 ? 0 : accept >= 45 ? 1 : 2;
  const nextItems = nextsSet[nextIdx % nextsSet.length];

  const phrasesSet = data.phrases || ANALYSIS.default.phrases;
  const phrases = phrasesSet[Math.floor(Math.random() * phrasesSet.length)];

  const avoidsSet = data.avoids || ANALYSIS.default.avoids;
  const avoids = avoidsSet[Math.floor(Math.random() * avoidsSet.length)];

  // Personalize summary
  const firstName = name ? name : null;
  const summaryText = firstName ? `${firstName}, ${summary.text}` : summary.text;

  // Badge text
  const ageGroup = getAgeGroup(age);
  const catObj = CATEGORIES[cat];
  const genderLabel = gender === 'male' ? '남성' : gender === 'female' ? '여성' : gender === 'other' ? '기타' : '';
  let badge = [];
  if (ageGroup) badge.push(ageGroup);
  if (genderLabel) badge.push(genderLabel);
  if (catObj) badge.push(`${catObj.emoji} ${catObj.label}`);
  if (name) badge.push(`${name} 님`);
  const badgeText = badge.length ? badge.join(' · ') + ' 기반 분석' : '흐름 분석 결과';

  return { accept, risk, summaryText, summarySub: summary.sub, flow, nextItems, phrases, avoids, badgeText, cat, question: state.question, fortune: pickFortune(cat, accept) };
}

function renderResult(r) {
  document.getElementById('resultBadge').textContent = r.badgeText;
  document.getElementById('summaryText').textContent = r.summaryText;
  document.getElementById('summarySub').textContent = r.summarySub;
  document.getElementById('flowText').textContent = r.flow;

  // Signal meters — animate after paint
  document.getElementById('acceptValue').textContent = '0%';
  document.getElementById('riskValue').textContent = '0%';
  document.getElementById('acceptBar').style.width = '0%';
  document.getElementById('riskBar').style.width = '0%';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animateValue('acceptValue', 0, r.accept, 1200);
      animateValue('riskValue', 0, r.risk, 1200);
      document.getElementById('acceptBar').style.width = `${r.accept}%`;
      document.getElementById('riskBar').style.width = `${r.risk}%`;
    });
  });

  // Fortune cookie
  document.getElementById('fortuneText').textContent = r.fortune;

  // Oracle signal cards: 버튼을 눌러야 카드가 펼쳐지도록 트리거 초기화
  initOracleTrigger(r);

  // Chat reset
  resetChat(r);
}

function animateValue(elId, from, to, duration) {
  const el = document.getElementById(elId);
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${Math.round(from + (to - from) * eased)}%`;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ==================== COPY PHRASE ====================
function copyPhrase(btn) {
  const text = btn.querySelector('.phrase-text').textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('📋 클립보드에 복사됐어!'));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('📋 클립보드에 복사됐어!');
  }
  btn.style.borderColor = 'var(--mint)';
  setTimeout(() => { btn.style.borderColor = ''; }, 1500);
}

// ==================== SAVE / NEW ====================
function saveResult() {
  if (!state.currentResult) return;
  const r = state.currentResult;
  const item = {
    id: Date.now(),
    date: new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }),
    question: r.question,
    accept: r.accept,
    risk: r.risk,
    cat: r.cat,
    summary: r.summaryText,
    flow: r.flow,
    nextItems: r.nextItems,
    fortune: r.fortune,
    oracleCard: window._selectedOracleCard || null,
    chatHistory: CHAT_CONTEXT.history ? [...CHAT_CONTEXT.history] : [],
  };
  state.history.unshift(item);
  saveHistory();
  showToast('✨ 흐름이 저장됐어!');
  document.querySelector('.save-btn').disabled = true;
  document.querySelector('.save-btn').style.opacity = '0.5';
}

function newQuestion() {
  document.getElementById('questionInput').value = '';
  document.getElementById('charCount').textContent = '0';
  state.currentResult = null;
  state._viewingHistoryId = null;
  showScreen('home');
  setTimeout(() => document.getElementById('questionInput').focus(), 300);
}

// ==================== HISTORY ====================
function renderHistory() {
  const container = document.getElementById('historyList');
  if (!state.history.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🌙</div>
        <p class="empty-text">아직 저장된 흐름이 없어</p>
        <p class="empty-sub">질문을 입력하고 분석을 저장해봐</p>
      </div>`;
    return;
  }

  container.innerHTML = state.history.map(item => {
    const catObj = CATEGORIES[item.cat] || {};
    return `
      <div class="history-item" onclick="viewHistory(${item.id})">
        <div class="history-content">
          <div class="history-question">${escapeHtml(item.question)}</div>
          <div class="history-meta">
            ${catObj.label ? `<span class="history-cat">${catObj.emoji || ''} ${catObj.label}</span>` : ''}
            <span class="history-date">${item.date}</span>
          </div>
        </div>
        <div class="history-signals">
          <div class="hist-signal">
            <span class="hist-signal-val mint">${item.accept}%</span>
            <span class="hist-signal-label">가능성</span>
          </div>
          <div class="hist-signal">
            <span class="hist-signal-val coral">${item.risk}%</span>
            <span class="hist-signal-label">리스크</span>
          </div>
        </div>
      </div>`;
  }).join('');
}

function viewHistory(id) {
  const item = state.history.find(h => h.id === id);
  if (!item) return;
  state.currentResult = { ...item, badgeText: '저장된 흐름', summarySub: item.flow, fortune: item.fortune || pickFortune(item.cat, item.accept) };
  // 기록에서 열 때는 채팅 히스토리를 복원할 것임을 표시
  state._viewingHistoryId = id;
  showScreen('result');
  requestAnimationFrame(() => {
    renderResult(state.currentResult);
    // 저장된 카드가 있으면 새로 뽑지 않고 바로 복원
    if (item.oracleCard) {
      restoreOracleCard(item.oracleCard);
    }
    // 저장된 채팅 히스토리 복원
    if (item.chatHistory && item.chatHistory.length > 0) {
      restoreChatHistory(item.chatHistory, id);
    }
  });
}

function restoreOracleCard(card) {
  // 트리거 버튼 숨기기
  const trigger = document.getElementById('oracleTrigger');
  if (trigger) trigger.style.display = 'none';

  // 카드 래퍼 보이기
  const wrap = document.getElementById('oracleCardsWrap');
  if (wrap) {
    wrap.style.display = 'block';
    wrap.classList.add('oracle-cards-wrap');
  }

  // 선택된 카드 1장만 표시 (이미 뒤집힌 상태)
  const container = document.getElementById('oracleCards');
  if (!container) return;
  container.innerHTML = `
    <div class="oracle-card-wrap selected-wrap" data-index="0">
      <div class="oracle-card flipped selected"
           data-msg="${escapeAttr(card.msg)}"
           data-sub="${escapeAttr(card.sub)}"
           data-name="${escapeAttr(card.name)}">
        <div class="card-inner">
          <div class="card-face card-front">
            <div class="card-svg-wrap">${card.svgHtml}</div>
            <div class="card-front-tap">tap to reveal</div>
          </div>
          <div class="card-face card-back-img">
            <div class="card-svg-wrap selected-svg">${card.svgHtml}</div>
          </div>
        </div>
      </div>
      <div class="card-name-tag">${card.name}</div>
    </div>`;

  // 힌트 숨기기
  const hint = document.getElementById('oracleHint');
  if (hint) hint.classList.add('hidden');

  // 해석 패널 복원
  const existingPanel = document.getElementById('oracleRevealPanel');
  if (existingPanel) existingPanel.remove();

  const panel = document.createElement('div');
  panel.id = 'oracleRevealPanel';
  panel.className = 'oracle-reveal-panel visible';
  panel.innerHTML = `
    <div class="reveal-inner">
      <div class="reveal-name">${card.name}</div>
      <div class="reveal-divider"></div>
      <p class="reveal-msg">${card.msg}</p>
      <p class="reveal-sub">${card.sub}</p>
      <div class="reveal-boost-hint">
        <div class="reveal-boost-icon">✦</div>
        <p class="reveal-boost-text">이 카드를 <strong>잘 보이는 곳</strong>에 두면<br>오늘의 가능성이 더 높아질 거야 🌙</p>
        <p class="reveal-boost-sub">끌어당김의 법칙 — 자꾸 눈에 보이는 것이 현실이 돼</p>
      </div>
    </div>`;
  container.after(panel);
}

function restoreChatHistory(chatHistory, historyId) {
  // CHAT_CONTEXT에 히스토리 복원 (이어서 대화 가능하도록)
  CHAT_CONTEXT.history = [...chatHistory];

  const container = document.getElementById('chatMessages');
  if (!container) return;

  // 기존 인트로 메시지 제거 후 저장된 대화 내역으로 교체
  container.innerHTML = '';

  if (chatHistory.length === 0) {
    // 대화 없이 저장된 경우 — 기본 인사 메시지
    const name = document.getElementById('inputName') ? document.getElementById('inputName').value.trim() : '';
    const greeting = name
      ? `${name}, 이어서 궁금한 게 있으면 말해줘.`
      : '이어서 궁금한 게 있으면 말해줘.';
    container.innerHTML = `<div class="chat-msg signal-msg"><div class="msg-bubble">${greeting}</div></div>`;
    return;
  }

  // 저장된 대화 메시지 순서대로 렌더링
  chatHistory.forEach(msg => {
    const div = document.createElement('div');
    div.className = `chat-msg ${msg.role === 'signal' ? 'signal-msg' : 'user-msg'}`;
    div.innerHTML = `<div class="msg-bubble">${escapeHtml(msg.text)}</div>`;
    container.appendChild(div);
  });

  // 마지막에 이어가기 안내 메시지
  const continueDiv = document.createElement('div');
  continueDiv.className = 'chat-msg signal-msg chat-continue-notice';
  continueDiv.innerHTML = `<div class="msg-bubble msg-bubble--continue">— 대화를 이어갈 수 있어 💬</div>`;
  container.appendChild(continueDiv);

  container.scrollTop = container.scrollHeight;

  // 채팅 제목 업데이트
  const chatTitle = document.querySelector('#chatSection .chat-title');
  if (chatTitle) chatTitle.textContent = '대화 이어가기';
}

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

// ==================== PROFILE DISPLAY ====================
function updateProfileDisplay() {
  const name = localStorage.getItem('signal_profile') ? JSON.parse(localStorage.getItem('signal_profile')).name : '';
  const data = localStorage.getItem('signal_profile') ? JSON.parse(localStorage.getItem('signal_profile')) : {};

  const avatarEl = document.getElementById('profileAvatar');
  const nameEl = document.getElementById('profileName');
  const detailEl = document.getElementById('profileDetail');

  if (name) {
    avatarEl.textContent = name.charAt(0);
    nameEl.textContent = name;
  } else {
    avatarEl.textContent = '?';
    nameEl.textContent = '이름을 설정해봐';
  }

  const parts = [];
  if (data.birthYear) parts.push(`${data.birthYear}년생`);
  const gMap = { male: '남성', female: '여성', other: '기타' };
  if (data.gender) parts.push(gMap[data.gender] || '');
  if (data.category) { const c = CATEGORIES[data.category]; if (c) parts.push(`${c.emoji} ${c.label} 고민`); }
  detailEl.textContent = parts.length ? parts.join(' · ') : '정보 없음';
}

// ==================== PREMIUM ====================
function selectPlan(type) {
  state.selectedPlan = type;
  document.getElementById('monthlyPlan').classList.toggle('selected', type === 'monthly');
  document.getElementById('yearlyPlan').classList.toggle('selected', type === 'yearly');
}

function startTrial() {
  showToast('🌙 준비 중이야. 곧 오픈할게!');
}

// ==================== MODAL ====================
const MODAL_CONTENT = {
  privacy: {
    title: '개인정보 처리방침',
    body: `
      <h4>수집하는 정보</h4>
      Signal은 서비스 제공을 위해 닉네임, 생년월일, 성별, 고민 카테고리를 수집할 수 있습니다. 모든 항목은 선택사항이며, 기기 로컬스토리지에만 저장됩니다.
      <h4>이용 목적</h4>
      수집된 정보는 분석 결과 개인화에만 사용되며, 제3자에게 제공되지 않습니다.
      <h4>보관 및 삭제</h4>
      설정 > 데이터 초기화를 통해 언제든지 모든 데이터를 삭제할 수 있습니다.
      <h4>문의</h4>
      개인정보 관련 문의는 앱 내 문의 기능을 이용해 주세요.
    `
  },
  terms: {
    title: '이용약관',
    body: `
      <h4>서비스 목적</h4>
      Signal은 사용자의 상황 분석과 대화 가이드를 제공하는 참고용 서비스입니다.
      <h4>이용 제한</h4>
      타인을 조종하거나 해를 끼치는 목적으로 사용할 수 없습니다. 불법적인 목적의 사용은 금지됩니다.
      <h4>면책 사항</h4>
      Signal의 분석 결과는 참고용이며, 실제 상황의 결과를 보장하지 않습니다. 중요한 결정은 전문가와 상의하시기 바랍니다.
      <h4>서비스 변경</h4>
      서비스 내용은 사전 공지 없이 변경될 수 있습니다.
    `
  },
  ai: {
    title: 'AI 한계 안내',
    body: `
      <h4>Signal의 분석은 참고용이에요</h4>
      Signal은 사람의 심리를 정확히 예측하거나, 특정 결과를 보장하지 않아요. 분석 결과는 행동과학 연구와 설득 원리를 기반으로 한 참고 정보예요.
      <h4>전문적인 조언을 대체하지 않아요</h4>
      심리, 법률, 의료, 재정 등 전문적인 도움이 필요한 상황에서는 반드시 전문가와 상담하세요.
      <h4>위기 상황 안내</h4>
      정신건강 위기 상황이라면 자살예방상담전화 1393, 정신건강 위기상담 전화 1577-0199로 연락하세요. 24시간 운영됩니다.
      <h4>상대방의 동의</h4>
      Signal의 분석은 상대방의 명시적 동의와 안전을 최우선으로 합니다. 스토킹, 강압, 조종 목적의 사용은 엄격히 금지됩니다.
    `
  }
};

function showModal(type) {
  const content = MODAL_CONTENT[type];
  if (!content) return;
  document.getElementById('modalTitle').textContent = content.title;
  document.getElementById('modalBody').innerHTML = content.body;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function hideModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ==================== FORTUNE COOKIE DATA ====================
const FORTUNES = {
  love: [
    '꽃이 피려면 비가 먼저 와야 해.',
    '말 한마디보다 먼저 닿는 건 분위기야.',
    '서두르는 씨앗은 뿌리를 내리지 못해.',
    '가장 진한 감정도 천천히 말할 때 전해져.',
    '가까워질수록 더 조심스럽게 걸어야 해.',
    '적절한 침묵도 하나의 신호야.',
    '한 발 물러나는 것도 용기야.',
    '오늘의 작은 씨앗이 내일의 나무가 돼.',
  ],
  invest: [
    '두려움도, 탐욕도 좋은 나침반이 아니야.',
    '잃어도 괜찮은 것만 걸어야 편하게 자.',
    '서두르는 손은 늘 중요한 것을 흘려.',
    '결정 전 하루를 더 자는 사람이 덜 후회해.',
    '정보가 많을수록 결정은 단순해져.',
  ],
  career: [
    '방향이 맞으면 속도는 나중에 맞춰도 돼.',
    '지금 자리에서 최선을 다한 사람이 더 멀리 가.',
    '기회는 준비된 사람 앞에 조용히 와.',
    '급한 전환보다 명확한 목적이 먼저야.',
    '3년 후의 나를 보고 오늘의 선택을 해.',
  ],
  relation: [
    '진심은 말투보다 타이밍이 더 중요해.',
    '관계는 정답이 아니라 이해로 이어져.',
    '먼저 손 내밀 수 있는 사람이 더 강해.',
    '오해를 방치하면 벽이 쌓여.',
  ],
  divorce: [
    '끝이 아니야. 다른 시작으로 가는 문이야.',
    '감정이 결론을 서두르게 하지 않도록 해.',
    '이 선택, 네가 틀린 게 아니야.',
    '혼자 감당하지 않아도 돼.',
    '법은 억울한 사람 편이야. 준비만 잘 해.',
  ],
  startup: [
    '완벽한 준비보다 빠른 실험이 먼저야.',
    '한 명의 팬이 천 명의 시작이야.',
    '지금 아이디어, 세상이 기다리고 있을 수도 있어.',
    '실패는 낭비가 아니라 데이터야.',
    '두려움을 느끼는 건 진지하게 하고 있다는 증거야.',
  ],
  realestate: [
    '서두르는 계약은 후회를 부른다.',
    '등기부등본이 진짜 말을 해.',
    '10년 후 그 동네를 상상해봐.',
    '좋은 매물은 준비된 사람에게 와.',
    '숫자가 맞아야 마음이 편해.',
  ],
  legal: [
    '증거가 목소리보다 크게 말해.',
    '억울해도 침착한 사람이 이겨.',
    '시효를 놓치면 기회도 놓쳐.',
    '혼자 싸우지 않아도 돼. 도움을 받는 게 강함이야.',
    '법은 준비된 사람에게 기회를 줘.',
  ],
  debt: [
    '빚이 있어도 네 가치는 줄지 않아.',
    '한 발씩. 방향만 잡으면 반드시 빠져나와.',
    '숨기는 것보다 직면하는 게 더 빨리 끝내.',
    '제도가 있어. 혼자 해결 안 해도 돼.',
    '지금 이 상황이 영원하지 않아.',
  ],
  trauma: [
    '그 감정, 당연한 거야. 네가 약한 게 아니야.',
    '회복은 직선이 아니야. 구불구불해도 가고 있어.',
    '도움을 요청하는 건 용기 있는 선택이야.',
    '이 고통도 언젠가 네 강점이 될 거야.',
    '지금은 그냥 쉬어도 돼.',
  ],
  money: [
    '작은 구멍이 배를 침몰시켜.',
    '지금의 작은 절약이 미래를 바꿔.',
    '지출 기록 하나가 삶을 바꿀 수 있어.',
    '감당할 수 있는 것만 걸어.',
    '돈은 도구야. 목적이 아니야.',
  ],
  mind: [
    '이 감정도 지나가. 파도처럼.',
    '억누르는 것보다 느끼고 흘려보내.',
    '네 마음이 보내는 신호를 무시하지 마.',
    '스스로에게 더 따뜻하게 대해줘도 돼.',
    '감정을 갖는 건 인간이 살아있다는 증거야.',
  ],
  family: [
    '가장 가까운 사람일수록 더 솔직하게 말해봐.',
    '이해가 해결의 첫 열쇠야.',
    '잠시 멀어지는 게 더 가까워지는 방법일 때도 있어.',
    '가족이라서 다 알 거라고 생각하지 마.',
    '진심이 담긴 한마디가 벽을 허물어.',
  ],
  friend: [
    '가벼운 안부 하나가 멀어진 거리를 좁혀.',
    '먼저 연락하는 사람이 더 용감한 거야.',
    '진짜 친구는 어색한 시간도 이겨내.',
    '오래된 친구일수록 별말 없이도 통해.',
    '그냥 보고 싶다는 말, 이상한 게 아니야.',
  ],
  default: [
    '지금 이 순간, 답은 이미 너 안에 있어.',
    '흔들릴 때일수록 더 단단하게 서.',
    '모든 선택엔 이유가 있고, 결과도 있어.',
    '느린 것이 틀린 게 아니야.',
    '오늘 하지 않아도 돼. 하지만 너무 오래 미루지는 마.',
    '한 가지 확실한 건 너는 이미 고민하고 있다는 거야.',
    '진심은 늦어도 언제나 통해.',
    '신호는 항상 먼저 와. 잘 읽으면 돼.',
    '지금 느끼는 불안은 네가 그만큼 중요하게 생각한다는 뜻이야.',
    '완벽한 타이밍을 기다리지 마. 지금이 가장 빠른 시작이야.',
  ]
};

function pickFortune(cat, accept) {
  const pool = FORTUNES[cat] || FORTUNES.default;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ==================== ORACLE / TAROT CARDS ====================
// ── SVG 타로 일러스트 라이브러리 (빈티지 흑백 판화 스타일) ──
// 공통 구조: 크림(#F5F0E8) 배경 / 짙은 선(#1a1a1a) 이중 프레임 / 코너 다이아몬드 / 흑백 선화 일러스트 / 하단 세리프 라벨
// viewBox="0 0 120 180"
// 공통 헬퍼 매크로 (인라인 사용)
// frame: <rect fill="#F5F0E8"/> <rect outer stroke="#1a1a1a"/> <rect inner stroke="#1a1a1a" thin/> corner diamonds
// ==================== TAROT SVG CARD LIBRARY (50 cards) ====================
// 스타일: 크림/아이보리(#F5F0E8) 배경, 짙은 선(#1a1a1a) 이중 프레임,
//         코너 다이아몬드, 흑백 세밀 선화 일러스트, 하단 세리프 라벨
// viewBox="0 0 120 180"
const TAROT_SVG = {

  THE_HEART: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 여성 인물: 후드+긴머리 -->
    <ellipse cx="60" cy="62" rx="18" ry="20" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 후드 -->
    <path d="M38,52 Q42,30 60,28 Q78,30 82,52" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <path d="M40,54 Q44,34 60,32 Q76,34 80,54" fill="#e8e0d0" stroke="#1a1a1a" stroke-width="0.7"/>
    <!-- 머리카락 -->
    <path d="M42,62 Q34,80 36,110 Q40,130 46,140" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <path d="M44,62 Q36,82 38,112 Q42,132 48,142" fill="none" stroke="#1a1a1a" stroke-width="0.6"/>
    <path d="M78,62 Q86,80 84,110 Q80,130 74,140" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <path d="M76,62 Q84,82 82,112 Q78,132 72,142" fill="none" stroke="#1a1a1a" stroke-width="0.6"/>
    <!-- 얼굴 -->
    <ellipse cx="60" cy="64" rx="14" ry="16" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 눈썹 -->
    <path d="M51,57 Q55,55 58,57" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <path d="M62,57 Q65,55 69,57" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 눈 -->
    <ellipse cx="55" cy="62" rx="4" ry="3" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.8"/>
    <circle cx="55" cy="62" r="2" fill="#1a1a1a"/>
    <circle cx="56" cy="61" r="0.7" fill="#F5F0E8"/>
    <ellipse cx="65" cy="62" rx="4" ry="3" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.8"/>
    <circle cx="65" cy="62" r="2" fill="#1a1a1a"/>
    <circle cx="66" cy="61" r="0.7" fill="#F5F0E8"/>
    <!-- 코 -->
    <path d="M59,65 Q60,70 61,65" fill="none" stroke="#1a1a1a" stroke-width="0.6"/>
    <!-- 입 -->
    <path d="M56,74 Q60,77 64,74" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 이마 십자 -->
    <line x1="60" y1="49" x2="60" y2="55" stroke="#1a1a1a" stroke-width="1"/>
    <line x1="57" y1="52" x2="63" y2="52" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 목 십자 -->
    <line x1="60" y1="82" x2="60" y2="87" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="57.5" y1="84.5" x2="62.5" y2="84.5" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 옷깃 장식 -->
    <path d="M48,82 Q55,90 60,88 Q65,90 72,82" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <path d="M50,84 Q57,94 60,92 Q63,94 70,84" fill="none" stroke="#1a1a1a" stroke-width="0.6"/>
    <!-- 가슴 장식 별 -->
    <path d="M60,105 L61.5,109 L66,109 L62.5,111.5 L64,116 L60,113.5 L56,116 L57.5,111.5 L54,109 L58.5,109 Z" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <!-- 해칭 배경 음영 -->
    <line x1="14" y1="30" x2="18" y2="26" stroke="#1a1a1a" stroke-width="0.25" opacity="0.3"/>
    <line x1="22" y1="30" x2="26" y2="26" stroke="#1a1a1a" stroke-width="0.25" opacity="0.3"/>
    <line x1="30" y1="30" x2="34" y2="26" stroke="#1a1a1a" stroke-width="0.25" opacity="0.3"/>
    <!-- 하단 장식선 -->
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE HEART</text>
  </svg>`,

  THE_MOON: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 여성 인물: 달의 여사제 -->
    <path d="M36,50 Q38,32 60,29 Q82,32 84,50" fill="#e8e0d0" stroke="#1a1a1a" stroke-width="1.1"/>
    <ellipse cx="60" cy="64" rx="15" ry="17" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 머리카락 -->
    <path d="M45,58 Q36,78 38,115 Q42,135 50,145" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <path d="M47,58 Q38,80 40,117" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
    <path d="M75,58 Q84,78 82,115 Q78,135 70,145" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <path d="M73,58 Q82,80 80,117" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
    <!-- 눈 -->
    <ellipse cx="54" cy="62" rx="4" ry="3" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.8"/>
    <circle cx="54" cy="62" r="2" fill="#1a1a1a"/>
    <circle cx="55" cy="61" r="0.7" fill="#F5F0E8"/>
    <ellipse cx="66" cy="62" rx="4" ry="3" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.8"/>
    <circle cx="66" cy="62" r="2" fill="#1a1a1a"/>
    <circle cx="67" cy="61" r="0.7" fill="#F5F0E8"/>
    <!-- 코/입 -->
    <path d="M59,66 Q60,70 61,66" fill="none" stroke="#1a1a1a" stroke-width="0.6"/>
    <path d="M56,74 Q60,77 64,74" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 달 크라운 -->
    <path d="M48,46 Q54,38 60,42 Q66,38 72,46" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <circle cx="60" cy="41" r="4" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 이마 십자 -->
    <line x1="60" y1="49" x2="60" y2="55" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="57" y1="52" x2="63" y2="52" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 초승달 목 장식 -->
    <path d="M55,82 Q60,79 65,82" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 옷깃 -->
    <path d="M46,82 Q53,95 60,91 Q67,95 74,82" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 가슴 별 -->
    <path d="M60,108 L61.5,112 L66,112 L62.5,114.5 L64,119 L60,116.5 L56,119 L57.5,114.5 L54,112 L58.5,112 Z" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <!-- 별 장식 -->
    <path d="M25,35 L26,38 L29,38 L26.5,40 L27.5,43 L25,41 L22.5,43 L23.5,40 L21,38 L24,38 Z" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
    <path d="M91,32 L92,35 L95,35 L92.5,37 L93.5,40 L91,38 L88.5,40 L89.5,37 L87,35 L90,35 Z" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE MOON</text>
  </svg>`,

  THE_SIGNAL: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg_sig" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EEF9F6"/>
        <stop offset="100%" stop-color="#E4F5F0"/>
      </linearGradient>
      <radialGradient id="glow_sig" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#26A896" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#26A896" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="120" height="180" rx="6" fill="url(#bg_sig)"/>
    <rect x="4" y="4" width="112" height="172" rx="5" fill="none" stroke="#C9A84C" stroke-width="1.4"/>
    <rect x="8" y="8" width="104" height="164" rx="4" fill="none" stroke="#E8C97D" stroke-width="0.6"/>
    <circle cx="12" cy="12" r="2" fill="#C9A84C" opacity="0.8"/>
    <circle cx="108" cy="12" r="2" fill="#C9A84C" opacity="0.8"/>
    <circle cx="12" cy="168" r="2" fill="#C9A84C" opacity="0.8"/>
    <circle cx="108" cy="168" r="2" fill="#C9A84C" opacity="0.8"/>
    <text x="60" y="24" text-anchor="middle" font-size="5.5" fill="#C9A84C" font-family="Georgia,serif" letter-spacing="3" font-weight="bold">✦ SIGNAL ✦</text>
    <line x1="16" y1="28" x2="104" y2="28" stroke="#E8C97D" stroke-width="0.5"/>
    <!-- 전파 원 -->
    <ellipse cx="60" cy="82" rx="32" ry="32" fill="url(#glow_sig)"/>
    <circle cx="60" cy="82" r="8" fill="none" stroke="#26A896" stroke-width="1.8" opacity="0.9"/>
    <circle cx="60" cy="82" r="16" fill="none" stroke="#26A896" stroke-width="1" opacity="0.65"/>
    <circle cx="60" cy="82" r="24" fill="none" stroke="#26A896" stroke-width="0.7" opacity="0.4"/>
    <circle cx="60" cy="82" r="32" fill="none" stroke="#26A896" stroke-width="0.4" opacity="0.22"/>
    <!-- 중심점 -->
    <circle cx="60" cy="82" r="4" fill="#26A896"/>
    <circle cx="60" cy="82" r="2" fill="#FDF6E3"/>
    <!-- 십자선 -->
    <line x1="60" y1="50" x2="60" y2="114" stroke="#26A896" stroke-width="0.5" opacity="0.35"/>
    <line x1="28" y1="82" x2="92" y2="82" stroke="#26A896" stroke-width="0.5" opacity="0.35"/>
    <!-- 스캔 라인 -->
    <line x1="60" y1="82" x2="84" y2="58" stroke="#26A896" stroke-width="1.2" opacity="0.8"/>
    <!-- 장식별 -->
    <circle cx="26" cy="50" r="1.2" fill="#C9A84C" opacity="0.7"/>
    <circle cx="92" cy="54" r="1" fill="#C9A84C" opacity="0.6"/>
    <circle cx="20" cy="118" r="1" fill="#C9A84C" opacity="0.5"/>
    <circle cx="98" cy="116" r="1.2" fill="#C9A84C" opacity="0.6"/>
    <!-- 파형 하단 -->
    <path d="M20 132 L30 132 L35 122 L40 142 L45 122 L50 142 L55 132 L100 132" fill="none" stroke="#26A896" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>
    <line x1="16" y1="148" x2="104" y2="148" stroke="#E8C97D" stroke-width="0.5"/>
    <rect x="16" y="150" width="88" height="22" rx="2" fill="#FDF6E3" stroke="#C9A84C" stroke-width="0.8"/>
    <text x="60" y="164" text-anchor="middle" font-size="7" fill="#7A5C1E" font-family="Georgia,serif" letter-spacing="2" font-weight="bold">THE SIGNAL</text>
  </svg>`,

  THE_MIRROR: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 거울 (손잡이 달린 손거울) -->
    <ellipse cx="60" cy="72" rx="26" ry="28" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <ellipse cx="60" cy="72" rx="22" ry="24" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.6"/>
    <!-- 거울 안 여성 얼굴 윤곽 -->
    <ellipse cx="60" cy="68" rx="12" ry="14" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <ellipse cx="60" cy="60" rx="9" ry="8" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.8"/>
    <ellipse cx="55.5" cy="59" rx="2.5" ry="2" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <circle cx="55.5" cy="59" r="1.2" fill="#1a1a1a"/>
    <ellipse cx="64.5" cy="59" rx="2.5" ry="2" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <circle cx="64.5" cy="59" r="1.2" fill="#1a1a1a"/>
    <path d="M57,64 Q60,66 63,64" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <!-- 거울 손잡이 -->
    <rect x="57" y="100" width="6" height="22" rx="3" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.9"/>
    <rect x="54" y="120" width="12" height="5" rx="2" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 거울 광택 선 -->
    <path d="M46,58 Q42,64 44,72" fill="none" stroke="#1a1a1a" stroke-width="0.4" opacity="0.45"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="94" y1="28" x2="98" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="102" y1="28" x2="106" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE MIRROR</text>
  </svg>`,

  THE_TIDE: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 초승달 -->
    <circle cx="60" cy="50" r="20" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="1.1"/>
    <circle cx="68" cy="46" r="17" fill="#F5F0E8"/>
    <circle cx="60" cy="50" r="20" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 달빛 줄기 -->
    <line x1="60" y1="32" x2="60" y2="25" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <line x1="76" y1="38" x2="82" y2="33" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="44" y1="38" x2="38" y2="33" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 파도 -->
    <path d="M10,90 Q28,80 46,90 Q64,100 82,90 Q98,82 112,90" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
    <path d="M10,102 Q30,92 50,102 Q70,112 90,102 Q106,94 112,102" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <path d="M10,114 Q32,104 54,114 Q74,124 94,114 Q106,108 112,114" fill="none" stroke="#1a1a1a" stroke-width="0.8" opacity="0.6"/>
    <path d="M10,126 Q34,118 58,126 Q78,132 98,126 Q106,122 112,126" fill="none" stroke="#1a1a1a" stroke-width="0.55" opacity="0.4"/>
    <!-- 수평선 해칭 -->
    <line x1="14" y1="140" x2="106" y2="140" stroke="#1a1a1a" stroke-width="0.3" opacity="0.3"/>
    <line x1="14" y1="145" x2="106" y2="145" stroke="#1a1a1a" stroke-width="0.2" opacity="0.2"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE TIDE</text>
  </svg>`,

  THE_SCALE: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 저울 기둥 -->
    <rect x="59" y="48" width="2.5" height="82" fill="#1a1a1a"/>
    <circle cx="60" cy="46" r="5" fill="#1a1a1a"/>
    <circle cx="60" cy="46" r="2.5" fill="#F5F0E8"/>
    <!-- 저울대 (살짝 기울어짐) -->
    <line x1="16" y1="66" x2="104" y2="70" stroke="#1a1a1a" stroke-width="1.8" stroke-linecap="round"/>
    <!-- 실 -->
    <line x1="18" y1="66" x2="18" y2="96" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="102" y1="70" x2="102" y2="108" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 왼쪽 접시 -->
    <path d="M10,96 Q18,104 26,96" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <ellipse cx="18" cy="96" rx="10" ry="3" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.8"/>
    <circle cx="15" cy="93" r="1.5" fill="#1a1a1a" opacity="0.5"/>
    <circle cx="20" cy="92" r="1" fill="#1a1a1a" opacity="0.4"/>
    <!-- 오른쪽 접시 -->
    <path d="M94,108 Q102,116 110,108" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <ellipse cx="102" cy="108" rx="10" ry="3" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.8"/>
    <circle cx="100" cy="105" r="1.2" fill="#1a1a1a" opacity="0.4"/>
    <!-- 저울 받침 -->
    <rect x="51" y="130" width="18" height="3" rx="1.5" fill="#1a1a1a" opacity="0.7"/>
    <rect x="46" y="133" width="28" height="3" rx="1.5" fill="#1a1a1a" opacity="0.6"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE SCALE</text>
  </svg>`,

  THE_HOURGLASS: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 모래시계 상단 -->
    <path d="M30,42 L90,42 L60,88 Z" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 모래시계 하단 -->
    <path d="M30,138 L90,138 L60,88 Z" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 상단 모래 채움 (해칭) -->
    <path d="M33,44 L87,44 L62,80 L58,80 Z" fill="#1a1a1a" opacity="0.12"/>
    <line x1="40" y1="44" x2="38" y2="52" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="52" y1="44" x2="49" y2="56" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="64" y1="44" x2="60" y2="60" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="76" y1="44" x2="70" y2="62" stroke="#1a1a1a" stroke-width="0.4" opacity="0.3"/>
    <!-- 흘러내리는 모래 -->
    <line x1="60" y1="86" x2="60" y2="98" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 하단 쌓인 모래 (해칭) -->
    <path d="M33,136 Q60,116 87,136 Z" fill="#1a1a1a" opacity="0.15"/>
    <line x1="40" y1="136" x2="44" y2="128" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="52" y1="136" x2="57" y2="124" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="64" y1="136" x2="70" y2="122" stroke="#1a1a1a" stroke-width="0.4" opacity="0.3"/>
    <!-- 상/하단 막대 -->
    <rect x="27" y="38" width="66" height="5" rx="2.5" fill="#1a1a1a"/>
    <rect x="27" y="138" width="66" height="5" rx="2.5" fill="#1a1a1a"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="6.5" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1">THE HOURGLASS</text>
  </svg>`,

  THE_KEY: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 열쇠 고리 -->
    <circle cx="60" cy="65" rx="20" ry="20" fill="none" stroke="#1a1a1a" stroke-width="2.2"/>
    <circle cx="60" cy="65" rx="12" ry="12" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <!-- 열쇠 구멍 -->
    <circle cx="60" cy="63" r="4.5" fill="#1a1a1a"/>
    <rect x="57.5" y="63" width="5" height="7" rx="1.5" fill="#1a1a1a"/>
    <!-- 열쇠 몸통 -->
    <rect x="57.5" y="86" width="5" height="44" rx="2.5" fill="#1a1a1a"/>
    <!-- 열쇠 날 -->
    <rect x="62.5" y="98" width="9" height="4" rx="2" fill="#1a1a1a"/>
    <rect x="62.5" y="108" width="7" height="4" rx="2" fill="#1a1a1a"/>
    <rect x="62.5" y="118" width="9" height="4" rx="2" fill="#1a1a1a"/>
    <!-- 방사선 장식 -->
    <line x1="38" y1="45" x2="32" y2="38" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <line x1="82" y1="45" x2="88" y2="38" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <line x1="60" y1="44" x2="60" y2="36" stroke="#1a1a1a" stroke-width="0.6" opacity="0.45"/>
    <!-- 해칭 -->
    <line x1="14" y1="130" x2="18" y2="126" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="130" x2="26" y2="126" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE KEY</text>
  </svg>`,

  THE_STAR: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 큰 별 (5각형) 선화 -->
    <polygon points="60,36 67,60 92,60 72,75 80,100 60,86 40,100 48,75 28,60 53,60" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <!-- 별 내부 선 -->
    <line x1="60" y1="36" x2="60" y2="86" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="28" y1="60" x2="80" y2="100" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="92" y1="60" x2="40" y2="100" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <!-- 중심 점 -->
    <circle cx="60" cy="72" r="4" fill="#1a1a1a" opacity="0.75"/>
    <circle cx="60" cy="72" r="2" fill="#F5F0E8"/>
    <!-- 빛 줄기 -->
    <line x1="60" y1="25" x2="60" y2="18" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="88" y1="44" x2="95" y2="37" stroke="#1a1a1a" stroke-width="0.6" opacity="0.4"/>
    <line x1="32" y1="44" x2="25" y2="37" stroke="#1a1a1a" stroke-width="0.6" opacity="0.4"/>
    <!-- 주변 작은 별들 -->
    <path d="M28,40 L29.2,44 L33,44 L30.4,46.5 L31.6,50.5 L28,48 L24.4,50.5 L25.6,46.5 L23,44 L26.8,44 Z" fill="#1a1a1a" opacity="0.5"/>
    <path d="M92,36 L93,40 L97,40 L94.5,42 L95.5,46 L92,43.5 L88.5,46 L89.5,42 L87,40 L91,40 Z" fill="#1a1a1a" opacity="0.4"/>
    <path d="M24,112 L25,116 L29,116 L26.5,118 L27.5,122 L24,119.5 L20.5,122 L21.5,118 L19,116 L23,116 Z" fill="#1a1a1a" opacity="0.35"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="120" x2="18" y2="116" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="120" x2="26" y2="116" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE STAR</text>
  </svg>`,

  THE_SPARK: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 번개 볼트 선화 -->
    <polygon points="68,36 50,82 64,82 48,136 84,72 68,72 80,36" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <!-- 번개 내부 해칭 -->
    <line x1="60" y1="38" x2="56" y2="50" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="65" y1="40" x2="60" y2="56" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="62" y1="84" x2="58" y2="96" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="67" y1="86" x2="62" y2="102" stroke="#1a1a1a" stroke-width="0.4" opacity="0.3"/>
    <!-- 방전 불꽃 -->
    <line x1="82" y1="52" x2="97" y2="43" stroke="#1a1a1a" stroke-width="0.9" opacity="0.6"/>
    <line x1="85" y1="64" x2="101" y2="61" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="38" y1="54" x2="23" y2="45" stroke="#1a1a1a" stroke-width="0.9" opacity="0.6"/>
    <line x1="35" y1="66" x2="19" y2="63" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <!-- 충격파 동심원 -->
    <circle cx="60" cy="88" r="30" fill="none" stroke="#1a1a1a" stroke-width="0.5" opacity="0.3"/>
    <circle cx="60" cy="88" r="40" fill="none" stroke="#1a1a1a" stroke-width="0.35" opacity="0.2"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE SPARK</text>
  </svg>`,

  THE_COMPASS: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 나침반 원 -->
    <circle cx="60" cy="82" r="34" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
    <circle cx="60" cy="82" r="30" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <!-- 방위 눈금 -->
    <line x1="60" y1="48" x2="60" y2="54" stroke="#1a1a1a" stroke-width="1.8"/>
    <line x1="60" y1="110" x2="60" y2="116" stroke="#1a1a1a" stroke-width="1.8"/>
    <line x1="26" y1="82" x2="32" y2="82" stroke="#1a1a1a" stroke-width="1.8"/>
    <line x1="88" y1="82" x2="94" y2="82" stroke="#1a1a1a" stroke-width="1.8"/>
    <!-- 부방위 눈금 -->
    <line x1="84" y1="58" x2="82" y2="62" stroke="#1a1a1a" stroke-width="0.8" opacity="0.6"/>
    <line x1="84" y1="106" x2="82" y2="102" stroke="#1a1a1a" stroke-width="0.8" opacity="0.6"/>
    <line x1="36" y1="58" x2="38" y2="62" stroke="#1a1a1a" stroke-width="0.8" opacity="0.6"/>
    <line x1="36" y1="106" x2="38" y2="102" stroke="#1a1a1a" stroke-width="0.8" opacity="0.6"/>
    <!-- N S E W 텍스트 -->
    <text x="60" y="57" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" font-weight="bold">N</text>
    <text x="60" y="122" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif">S</text>
    <text x="96" y="85" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif">E</text>
    <text x="24" y="85" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif">W</text>
    <!-- 나침반 바늘 북쪽 -->
    <polygon points="60,63 57,82 60,77 63,82" fill="#1a1a1a"/>
    <!-- 나침반 바늘 남쪽 (해칭) -->
    <polygon points="60,101 57,82 60,87 63,82" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 중심점 -->
    <circle cx="60" cy="82" r="4" fill="#1a1a1a"/>
    <circle cx="60" cy="82" r="2" fill="#F5F0E8"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="6.5" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1">THE COMPASS</text>
  </svg>`,

  THE_PEACE: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 비둘기 선화 -->
    <ellipse cx="60" cy="82" rx="20" ry="13" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 날개 왼쪽 -->
    <path d="M40,80 Q22,62 30,50 Q42,64 54,77 Z" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 날개 깃털 선 -->
    <line x1="44" y1="78" x2="36" y2="66" stroke="#1a1a1a" stroke-width="0.5" opacity="0.5"/>
    <line x1="48" y1="75" x2="40" y2="60" stroke="#1a1a1a" stroke-width="0.5" opacity="0.5"/>
    <!-- 날개 오른쪽 -->
    <path d="M80,80 Q98,62 90,50 Q78,64 66,77 Z" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <line x1="76" y1="78" x2="84" y2="66" stroke="#1a1a1a" stroke-width="0.5" opacity="0.5"/>
    <line x1="72" y1="75" x2="80" y2="60" stroke="#1a1a1a" stroke-width="0.5" opacity="0.5"/>
    <!-- 머리 -->
    <circle cx="77" cy="76" r="8" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 눈 -->
    <circle cx="80" cy="74" r="2" fill="#1a1a1a"/>
    <circle cx="80.8" cy="73.2" r="0.6" fill="#F5F0E8"/>
    <!-- 부리 -->
    <path d="M84,76 L90,75 L84,79 Z" fill="#1a1a1a" opacity="0.8"/>
    <!-- 올리브 가지 선화 -->
    <path d="M84,78 Q93,82 96,92" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <ellipse cx="96" cy="92" rx="4" ry="2.5" fill="none" stroke="#1a1a1a" stroke-width="0.8" transform="rotate(20 96 92)"/>
    <ellipse cx="90" cy="88" rx="3.5" ry="2" fill="none" stroke="#1a1a1a" stroke-width="0.8" transform="rotate(-10 90 88)"/>
    <!-- 꼬리 깃털 -->
    <path d="M40,84 Q28,94 26,106" fill="none" stroke="#1a1a1a" stroke-width="1.2" opacity="0.7"/>
    <path d="M40,87 Q30,98 31,113" fill="none" stroke="#1a1a1a" stroke-width="0.8" opacity="0.5"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE PEACE</text>
  </svg>`,

  THE_BOND: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 두 원 (베른 다이어그램) 선화 -->
    <circle cx="44" cy="80" r="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <circle cx="76" cy="80" r="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 교집합 해칭 -->
    <path d="M60,60 Q73,80 60,100 Q47,80 60,60 Z" fill="none" stroke="#1a1a1a" stroke-width="0.4" opacity="0"/>
    <line x1="58" y1="62" x2="62" y2="62" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="56" y1="68" x2="64" y2="68" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="55" y1="74" x2="65" y2="74" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="55" y1="80" x2="65" y2="80" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="55" y1="86" x2="65" y2="86" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="56" y1="92" x2="64" y2="92" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="58" y1="98" x2="62" y2="98" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <!-- 내부 이중 원 -->
    <circle cx="44" cy="80" r="14" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <circle cx="76" cy="80" r="14" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <!-- 중심 교차점 -->
    <circle cx="60" cy="80" r="5" fill="#1a1a1a" opacity="0.7"/>
    <circle cx="60" cy="80" r="2.5" fill="#F5F0E8"/>
    <!-- 연결 줄기 -->
    <line x1="60" y1="102" x2="60" y2="132" stroke="#1a1a1a" stroke-width="0.9" opacity="0.6"/>
    <circle cx="60" cy="135" r="3.5" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE BOND</text>
  </svg>`,

  THE_GROWTH: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 나무 줄기 -->
    <rect x="58" y="92" width="5" height="46" rx="2" fill="#1a1a1a"/>
    <!-- 뿌리 -->
    <path d="M58,136 Q45,145 37,150" fill="none" stroke="#1a1a1a" stroke-width="1.4" opacity="0.6"/>
    <path d="M62,138 Q72,147 82,150" fill="none" stroke="#1a1a1a" stroke-width="1.4" opacity="0.6"/>
    <path d="M60,140 Q60,150 60,153" fill="none" stroke="#1a1a1a" stroke-width="0.9" opacity="0.5"/>
    <!-- 나무 둥근 캐노피 (선화) -->
    <circle cx="60" cy="68" r="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <circle cx="60" cy="68" r="22" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
    <!-- 잎맥 해칭 -->
    <line x1="60" y1="40" x2="60" y2="96" stroke="#1a1a1a" stroke-width="0.45" opacity="0.4"/>
    <line x1="42" y1="60" x2="60" y2="68" stroke="#1a1a1a" stroke-width="0.45" opacity="0.4"/>
    <line x1="78" y1="60" x2="60" y2="68" stroke="#1a1a1a" stroke-width="0.45" opacity="0.4"/>
    <line x1="43" y1="76" x2="60" y2="68" stroke="#1a1a1a" stroke-width="0.45" opacity="0.4"/>
    <line x1="77" y1="76" x2="60" y2="68" stroke="#1a1a1a" stroke-width="0.45" opacity="0.4"/>
    <line x1="36" y1="68" x2="60" y2="68" stroke="#1a1a1a" stroke-width="0.45" opacity="0.35"/>
    <line x1="84" y1="68" x2="60" y2="68" stroke="#1a1a1a" stroke-width="0.45" opacity="0.35"/>
    <!-- 새싹 -->
    <circle cx="60" cy="40" r="7" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <circle cx="60" cy="40" r="3.5" fill="#1a1a1a" opacity="0.6"/>
    <!-- 지면 해칭 -->
    <path d="M14,136 Q60,128 106,136" fill="none" stroke="#1a1a1a" stroke-width="0.8" opacity="0.5"/>
    <line x1="14" y1="140" x2="20" y2="136" stroke="#1a1a1a" stroke-width="0.3" opacity="0.3"/>
    <line x1="28" y1="140" x2="34" y2="133" stroke="#1a1a1a" stroke-width="0.3" opacity="0.3"/>
    <line x1="42" y1="138" x2="48" y2="132" stroke="#1a1a1a" stroke-width="0.3" opacity="0.3"/>
    <line x1="56" y1="137" x2="62" y2="131" stroke="#1a1a1a" stroke-width="0.3" opacity="0.3"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE GROWTH</text>
  </svg>`,

  THE_FLOW: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 흐름 곡선 선화 -->
    <path d="M14,48 Q38,38 58,48 Q78,58 106,48" fill="none" stroke="#1a1a1a" stroke-width="1.6"/>
    <path d="M14,64 Q38,54 58,64 Q78,74 106,64" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <path d="M14,80 Q38,70 58,80 Q78,90 106,80" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <path d="M14,96 Q38,86 58,96 Q78,106 106,96" fill="none" stroke="#1a1a1a" stroke-width="0.75"/>
    <path d="M14,112 Q38,102 58,112 Q78,122 106,112" fill="none" stroke="#1a1a1a" stroke-width="0.55" opacity="0.6"/>
    <path d="M14,128 Q38,118 58,128 Q78,138 106,128" fill="none" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <!-- 중심 반짝 -->
    <circle cx="60" cy="80" r="5" fill="#1a1a1a" opacity="0.6"/>
    <circle cx="60" cy="80" r="2.5" fill="#F5F0E8"/>
    <!-- 화살 방향 -->
    <line x1="62" y1="48" x2="84" y2="35" stroke="#1a1a1a" stroke-width="1" opacity="0.6"/>
    <polygon points="84,35 77,39 80,31" fill="#1a1a1a" opacity="0.6"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE FLOW</text>
  </svg>`,

  THE_PAUSE: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 일시정지 바 왼쪽 선화 -->
    <rect x="34" y="46" width="18" height="72" rx="8" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 일시정지 바 오른쪽 선화 -->
    <rect x="68" y="46" width="18" height="72" rx="8" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 해칭 (정지 표현) -->
    <line x1="36" y1="54" x2="50" y2="54" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="60" x2="50" y2="60" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="66" x2="50" y2="66" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="72" x2="50" y2="72" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="78" x2="50" y2="78" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="84" x2="50" y2="84" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="90" x2="50" y2="90" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="96" x2="50" y2="96" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="102" x2="50" y2="102" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="70" y1="54" x2="84" y2="54" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="70" y1="60" x2="84" y2="60" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="70" y1="66" x2="84" y2="66" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="70" y1="72" x2="84" y2="72" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="70" y1="78" x2="84" y2="78" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="70" y1="84" x2="84" y2="84" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="70" y1="90" x2="84" y2="90" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="70" y1="96" x2="84" y2="96" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="70" y1="102" x2="84" y2="102" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <!-- 배경 동심 타원 -->
    <ellipse cx="60" cy="82" rx="44" ry="50" fill="none" stroke="#1a1a1a" stroke-width="0.45" opacity="0.3"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE PAUSE</text>
  </svg>`,

  THE_VISION: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 큰 눈 선화 -->
    <path d="M16,80 Q60,48 104,80" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="1.4"/>
    <path d="M16,80 Q60,110 104,80" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="1.4"/>
    <!-- 홍채 -->
    <circle cx="60" cy="80" r="19" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 동공 -->
    <circle cx="60" cy="80" r="10" fill="#1a1a1a" opacity="0.85"/>
    <circle cx="60" cy="80" r="5" fill="#F5F0E8" opacity="0.3"/>
    <!-- 눈 반사 광 -->
    <circle cx="65" cy="74" r="3.5" fill="#F5F0E8" opacity="0.5"/>
    <circle cx="55" cy="84" r="2" fill="#F5F0E8" opacity="0.3"/>
    <!-- 홍채 방사선 패턴 -->
    <line x1="44" y1="68" x2="56" y2="76" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="76" y1="68" x2="64" y2="76" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="44" y1="92" x2="56" y2="84" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="76" y1="92" x2="64" y2="84" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="60" y1="62" x2="60" y2="74" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="60" y1="98" x2="60" y2="86" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <!-- 속눈썹 -->
    <line x1="30" y1="68" x2="26" y2="60" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="42" y1="60" x2="41" y2="52" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="60" y1="57" x2="60" y2="49" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="78" y1="60" x2="79" y2="52" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="90" y1="68" x2="94" y2="60" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 눈썹 -->
    <path d="M24,56 Q60,42 96,56" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <!-- 하단 장식 -->
    <line x1="14" y1="118" x2="18" y2="114" stroke="#1a1a1a" stroke-width="0.2" opacity="0.2"/>
    <line x1="22" y1="118" x2="26" y2="114" stroke="#1a1a1a" stroke-width="0.2" opacity="0.2"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE VISION</text>
  </svg>`,

  THE_CHANGE: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 나선 (황금 나선) 선화 -->
    <path d="M60,82 Q73,70 73,82 Q73,98 60,98 Q44,98 44,80 Q44,59 62,59 Q83,59 83,80 Q83,112 60,112 Q36,112 36,80 Q36,56 62,54" fill="none" stroke="#1a1a1a" stroke-width="1.8"/>
    <!-- 화살표 끝 -->
    <polygon points="62,54 55,62 71,62" fill="#1a1a1a"/>
    <!-- 중심 원 -->
    <circle cx="60" cy="82" r="6" fill="#1a1a1a" opacity="0.7"/>
    <circle cx="60" cy="82" r="3" fill="#F5F0E8"/>
    <!-- 나선 틱 마크 -->
    <line x1="73" y1="82" x2="77" y2="82" stroke="#1a1a1a" stroke-width="0.6" opacity="0.45"/>
    <line x1="60" y1="98" x2="60" y2="102" stroke="#1a1a1a" stroke-width="0.6" opacity="0.45"/>
    <line x1="44" y1="80" x2="40" y2="80" stroke="#1a1a1a" stroke-width="0.6" opacity="0.45"/>
    <line x1="62" y1="59" x2="62" y2="55" stroke="#1a1a1a" stroke-width="0.6" opacity="0.45"/>
    <!-- 장식 점 -->
    <circle cx="30" cy="58" r="1.5" fill="#1a1a1a" opacity="0.5"/>
    <circle cx="92" cy="56" r="1.2" fill="#1a1a1a" opacity="0.45"/>
    <circle cx="24" cy="110" r="1" fill="#1a1a1a" opacity="0.4"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE CHANGE</text>
  </svg>`,

  THE_TRUTH: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 장미 줄기 선화 -->
    <line x1="60" y1="106" x2="60" y2="138" stroke="#1a1a1a" stroke-width="1.6"/>
    <!-- 가시 -->
    <path d="M60,122 Q50,116 48,124" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <path d="M60,130 Q70,123 72,131" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 잎 선화 -->
    <ellipse cx="46" cy="124" rx="7" ry="3.5" fill="none" stroke="#1a1a1a" stroke-width="0.8" transform="rotate(-20 46 124)"/>
    <ellipse cx="74" cy="130" rx="7" ry="3.5" fill="none" stroke="#1a1a1a" stroke-width="0.8" transform="rotate(20 74 130)"/>
    <!-- 장미꽃 선화 (러프한 페탈들) -->
    <ellipse cx="60" cy="70" rx="13" ry="15" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <ellipse cx="48" cy="74" rx="11" ry="13" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <ellipse cx="72" cy="74" rx="11" ry="13" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <ellipse cx="60" cy="64" rx="10" ry="12" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <ellipse cx="50" cy="81" rx="9" ry="10" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <ellipse cx="70" cy="81" rx="9" ry="10" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 중심 꽃술 -->
    <ellipse cx="60" cy="73" rx="5" ry="5" fill="#1a1a1a" opacity="0.55"/>
    <ellipse cx="60" cy="73" rx="2.5" ry="2.5" fill="#F5F0E8"/>
    <!-- 이슬방울 -->
    <circle cx="42" cy="66" r="1.8" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <circle cx="42" cy="68" r="0.6" fill="#1a1a1a" opacity="0.4"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE TRUTH</text>
  </svg>`,

  THE_NOW: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 시계 원 -->
    <circle cx="60" cy="82" r="34" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
    <circle cx="60" cy="82" r="30" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <!-- 12 눈금 -->
    <line x1="60" y1="48" x2="60" y2="55" stroke="#1a1a1a" stroke-width="1.8"/>
    <line x1="60" y1="109" x2="60" y2="116" stroke="#1a1a1a" stroke-width="1.8"/>
    <line x1="26" y1="82" x2="33" y2="82" stroke="#1a1a1a" stroke-width="1.8"/>
    <line x1="87" y1="82" x2="94" y2="82" stroke="#1a1a1a" stroke-width="1.8"/>
    <!-- 부수 눈금 -->
    <line x1="83" y1="55" x2="81" y2="59" stroke="#1a1a1a" stroke-width="0.8" opacity="0.6"/>
    <line x1="37" y1="55" x2="39" y2="59" stroke="#1a1a1a" stroke-width="0.8" opacity="0.6"/>
    <line x1="83" y1="109" x2="81" y2="105" stroke="#1a1a1a" stroke-width="0.8" opacity="0.6"/>
    <line x1="37" y1="109" x2="39" y2="105" stroke="#1a1a1a" stroke-width="0.8" opacity="0.6"/>
    <!-- 시침 -->
    <line x1="60" y1="82" x2="60" y2="58" stroke="#1a1a1a" stroke-width="2.8" stroke-linecap="round"/>
    <!-- 분침 -->
    <line x1="60" y1="82" x2="84" y2="82" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
    <!-- 초침 -->
    <line x1="60" y1="82" x2="44" y2="67" stroke="#1a1a1a" stroke-width="0.9" stroke-linecap="round"/>
    <!-- 중심점 -->
    <circle cx="60" cy="82" r="4" fill="#1a1a1a"/>
    <circle cx="60" cy="82" r="2" fill="#F5F0E8"/>
    <!-- 12시 숫자 표시 (선택적) -->
    <text x="60" y="58" text-anchor="middle" font-size="5.5" fill="#1a1a1a" font-family="Georgia,serif">XII</text>
    <text x="88" y="85" text-anchor="middle" font-size="5.5" fill="#1a1a1a" font-family="Georgia,serif">III</text>
    <text x="60" y="118" text-anchor="middle" font-size="5.5" fill="#1a1a1a" font-family="Georgia,serif">VI</text>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE NOW</text>
  </svg>`,

  // ── 추가 카드 30장 (흑백 빈티지 스타일) ──

  THE_CROWN: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 왕관 -->
    <path d="M24,100 L24,70 L42,84 L60,52 L78,84 L96,70 L96,100 Z" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
    <!-- 왕관 밴드 -->
    <rect x="24" y="100" width="72" height="12" rx="2" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 보석 장식 -->
    <circle cx="42" cy="106" r="4" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <circle cx="42" cy="106" r="2" fill="#1a1a1a" opacity="0.5"/>
    <circle cx="60" cy="106" r="4" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <circle cx="60" cy="106" r="2" fill="#1a1a1a" opacity="0.5"/>
    <circle cx="78" cy="106" r="4" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <circle cx="78" cy="106" r="2" fill="#1a1a1a" opacity="0.5"/>
    <!-- 왕관 꼭대기 별 -->
    <path d="M60,52 L61.5,56 L66,56 L62.5,58.5 L64,63 L60,60 L56,63 L57.5,58.5 L54,56 L58.5,56 Z" fill="#1a1a1a" opacity="0.7"/>
    <!-- 측면 별 -->
    <path d="M42,84 L43,87.5 L46.5,87.5 L44,90 L45,93.5 L42,91 L39,93.5 L40,90 L37.5,87.5 L41,87.5 Z" fill="#1a1a1a" opacity="0.5"/>
    <path d="M78,84 L79,87.5 L82.5,87.5 L80,90 L81,93.5 L78,91 L75,93.5 L76,90 L73.5,87.5 L77,87.5 Z" fill="#1a1a1a" opacity="0.5"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE CROWN</text>
  </svg>`,

  THE_SWORD: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 검 몸통 -->
    <polygon points="60,32 63,100 60,105 57,100" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <!-- 검 날 해칭 -->
    <line x1="59" y1="40" x2="61" y2="40" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="58.5" y1="52" x2="61.5" y2="52" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="58" y1="64" x2="62" y2="64" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="57.5" y1="76" x2="62.5" y2="76" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <line x1="57" y1="88" x2="63" y2="88" stroke="#1a1a1a" stroke-width="0.4" opacity="0.4"/>
    <!-- 손잡이 가드 -->
    <line x1="36" y1="105" x2="84" y2="105" stroke="#1a1a1a" stroke-width="2.2" stroke-linecap="round"/>
    <!-- 손잡이 -->
    <rect x="56" y="105" width="8" height="22" rx="4" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 손잡이 그립 감기 선 -->
    <line x1="56" y1="110" x2="64" y2="110" stroke="#1a1a1a" stroke-width="0.5" opacity="0.5"/>
    <line x1="56" y1="115" x2="64" y2="115" stroke="#1a1a1a" stroke-width="0.5" opacity="0.5"/>
    <line x1="56" y1="120" x2="64" y2="120" stroke="#1a1a1a" stroke-width="0.5" opacity="0.5"/>
    <!-- 검 끝 빛 -->
    <line x1="60" y1="32" x2="60" y2="25" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="56" y1="35" x2="52" y2="28" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="64" y1="35" x2="68" y2="28" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 가드 장식 원 -->
    <circle cx="36" cy="105" r="3" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <circle cx="84" cy="105" r="3" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE SWORD</text>
  </svg>`,

  THE_TOWER: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 탑 몸통 -->
    <rect x="36" y="50" width="48" height="90" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <!-- 탑 꼭대기 -->
    <polygon points="28,50 92,50 80,34 40,34" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 성벽 돌 해칭 -->
    <line x1="36" y1="60" x2="84" y2="60" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="70" x2="84" y2="70" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="80" x2="84" y2="80" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="90" x2="84" y2="90" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="100" x2="84" y2="100" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="110" x2="84" y2="110" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="120" x2="84" y2="120" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="60" y1="50" x2="60" y2="140" stroke="#1a1a1a" stroke-width="0.3" opacity="0.25"/>
    <!-- 창문 -->
    <rect x="48" y="62" width="10" height="14" rx="5" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <rect x="62" y="62" width="10" height="14" rx="5" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <rect x="54" y="88" width="12" height="16" rx="6" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 탑 깃발 -->
    <line x1="60" y1="34" x2="60" y2="22" stroke="#1a1a1a" stroke-width="0.8"/>
    <path d="M60,22 L74,26 L60,30 Z" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE TOWER</text>
  </svg>`,

  THE_SUN: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 태양 원 -->
    <circle cx="60" cy="78" r="28" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
    <circle cx="60" cy="78" r="22" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
    <!-- 태양 내부 해칭 -->
    <line x1="36" y1="78" x2="84" y2="78" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <line x1="60" y1="52" x2="60" y2="104" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <line x1="40" y1="58" x2="80" y2="98" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <line x1="80" y1="58" x2="40" y2="98" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <!-- 중심 얼굴 -->
    <circle cx="60" cy="78" r="12" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.9"/>
    <ellipse cx="55" cy="75" rx="2.5" ry="2" fill="#1a1a1a" opacity="0.7"/>
    <ellipse cx="65" cy="75" rx="2.5" ry="2" fill="#1a1a1a" opacity="0.7"/>
    <path d="M55,82 Q60,86 65,82" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 태양 광선 (직선) -->
    <line x1="60" y1="49" x2="60" y2="40" stroke="#1a1a1a" stroke-width="1.2"/>
    <line x1="80" y1="55" x2="87" y2="47" stroke="#1a1a1a" stroke-width="1.2"/>
    <line x1="88" y1="78" x2="98" y2="78" stroke="#1a1a1a" stroke-width="1.2"/>
    <line x1="80" y1="101" x2="87" y2="109" stroke="#1a1a1a" stroke-width="1.2"/>
    <line x1="60" y1="107" x2="60" y2="116" stroke="#1a1a1a" stroke-width="1.2"/>
    <line x1="40" y1="101" x2="33" y2="109" stroke="#1a1a1a" stroke-width="1.2"/>
    <line x1="32" y1="78" x2="22" y2="78" stroke="#1a1a1a" stroke-width="1.2"/>
    <line x1="40" y1="55" x2="33" y2="47" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE SUN</text>
  </svg>`,

  THE_WHEEL: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 바퀴 외륜 -->
    <circle cx="60" cy="80" r="38" fill="none" stroke="#1a1a1a" stroke-width="1.6"/>
    <circle cx="60" cy="80" r="32" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
    <!-- 바퀴 살 8개 -->
    <line x1="60" y1="42" x2="60" y2="118" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="22" y1="80" x2="98" y2="80" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="33" y1="53" x2="87" y2="107" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="87" y1="53" x2="33" y2="107" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 내부 허브 -->
    <circle cx="60" cy="80" r="10" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <circle cx="60" cy="80" r="4" fill="#1a1a1a" opacity="0.6"/>
    <circle cx="60" cy="80" r="2" fill="#F5F0E8"/>
    <!-- 바퀴 살 장식 점 -->
    <circle cx="60" cy="50" r="2" fill="#1a1a1a" opacity="0.5"/>
    <circle cx="87" cy="62" r="2" fill="#1a1a1a" opacity="0.5"/>
    <circle cx="87" cy="98" r="2" fill="#1a1a1a" opacity="0.5"/>
    <circle cx="60" cy="110" r="2" fill="#1a1a1a" opacity="0.5"/>
    <circle cx="33" cy="98" r="2" fill="#1a1a1a" opacity="0.5"/>
    <circle cx="33" cy="62" r="2" fill="#1a1a1a" opacity="0.5"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE WHEEL</text>
  </svg>`,

  THE_HERMIT: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 노인 지팡이 -->
    <line x1="82" y1="48" x2="78" y2="140" stroke="#1a1a1a" stroke-width="1.4"/>
    <!-- 지팡이 상단 꼬임 -->
    <path d="M82,48 Q88,42 84,36 Q80,30 86,26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 등불 -->
    <rect x="84" y="58" width="14" height="18" rx="3" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="91" y1="50" x2="91" y2="58" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 등불 빛 -->
    <line x1="98" y1="62" x2="104" y2="60" stroke="#1a1a1a" stroke-width="0.5" opacity="0.5"/>
    <line x1="98" y1="67" x2="105" y2="67" stroke="#1a1a1a" stroke-width="0.5" opacity="0.5"/>
    <line x1="98" y1="72" x2="104" y2="74" stroke="#1a1a1a" stroke-width="0.5" opacity="0.5"/>
    <!-- 노인 인물 (후드) -->
    <path d="M36,46 Q40,28 60,26 Q80,28 84,46" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <ellipse cx="60" cy="60" rx="16" ry="17" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 수염 -->
    <path d="M48,68 Q46,76 44,85 Q48,90 52,88" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <path d="M72,68 Q74,76 76,85 Q72,90 68,88" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <path d="M52,70 Q52,84 56,92" fill="none" stroke="#1a1a1a" stroke-width="0.6"/>
    <path d="M68,70 Q68,84 64,92" fill="none" stroke="#1a1a1a" stroke-width="0.6"/>
    <!-- 눈 (선화) -->
    <path d="M52,57 Q56,54 59,57" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <path d="M61,57 Q64,54 68,57" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <circle cx="55" cy="59" r="2" fill="#1a1a1a"/>
    <circle cx="65" cy="59" r="2" fill="#1a1a1a"/>
    <!-- 로브 -->
    <path d="M44,78 Q38,100 36,130 Q50,128 60,125 Q70,128 84,130 Q82,100 76,78" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 로브 주름 -->
    <line x1="50" y1="82" x2="48" y2="120" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="60" y1="84" x2="60" y2="124" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="70" y1="82" x2="72" y2="120" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE HERMIT</text>
  </svg>`,

  THE_FOOL: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 산 절벽 -->
    <path d="M14,140 L14,110 L40,80 L60,100 L80,60 L106,90 L106,140 Z" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 인물 (절벽 끝에 서있는) -->
    <circle cx="82" cy="55" r="8" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 인물 몸통 -->
    <path d="M78,63 Q72,78 68,95" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <path d="M86,63 Q90,76 92,90" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 팔 (춤추듯) -->
    <line x1="79" y1="70" x2="64" y2="64" stroke="#1a1a1a" stroke-width="1"/>
    <line x1="85" y1="72" x2="100" y2="65" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 지팡이 + 보따리 -->
    <line x1="99" y1="65" x2="106" y2="92" stroke="#1a1a1a" stroke-width="1.2"/>
    <circle cx="108" cy="60" r="8" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <line x1="100" y1="65" x2="104" y2="60" stroke="#1a1a1a" stroke-width="0.7"/>
    <!-- 인물 얼굴 -->
    <ellipse cx="53" cy="53" rx="3.5" ry="3" fill="#1a1a1a" opacity="0.5"/>
    <ellipse cx="60" cy="53" rx="3.5" ry="3" fill="#1a1a1a" opacity="0.5"/>
    <!-- 광대 모자 -->
    <path d="M74,47 Q78,32 82,27 Q86,32 90,47" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <circle cx="82" cy="26" r="2.5" fill="#1a1a1a" opacity="0.6"/>
    <!-- 구름 -->
    <path d="M14,42 Q22,36 30,42 Q36,36 44,42 Q50,36 58,42" fill="none" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE FOOL</text>
  </svg>`,

  THE_FLAME: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 큰 불꽃 -->
    <path d="M60,130 Q36,110 38,80 Q40,55 52,40 Q48,60 60,65 Q58,45 70,30 Q75,55 80,65 Q92,55 90,82 Q88,110 60,130 Z" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
    <!-- 내부 불꽃 -->
    <path d="M60,120 Q46,104 48,84 Q50,68 58,58 Q56,72 62,76 Q64,62 72,52 Q74,66 78,76 Q84,68 82,86 Q80,106 60,120 Z" fill="none" stroke="#1a1a1a" stroke-width="0.8" opacity="0.55"/>
    <!-- 최내부 불꽃 -->
    <path d="M60,108 Q52,96 54,84 Q56,74 60,68 Q64,74 66,84 Q68,96 60,108 Z" fill="#1a1a1a" opacity="0.15"/>
    <!-- 불꽃 빛 줄기 -->
    <line x1="46" y1="82" x2="36" y2="80" stroke="#1a1a1a" stroke-width="0.6" opacity="0.4"/>
    <line x1="48" y1="70" x2="38" y2="65" stroke="#1a1a1a" stroke-width="0.6" opacity="0.4"/>
    <line x1="74" y1="82" x2="84" y2="80" stroke="#1a1a1a" stroke-width="0.6" opacity="0.4"/>
    <line x1="72" y1="70" x2="82" y2="65" stroke="#1a1a1a" stroke-width="0.6" opacity="0.4"/>
    <!-- 해칭 배경 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="22" y1="28" x2="26" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE FLAME</text>
  </svg>`,

  THE_ROSE: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 장미 줄기 -->
    <path d="M60,112 Q58,124 60,140" fill="none" stroke="#1a1a1a" stroke-width="1.6"/>
    <!-- 가시들 -->
    <path d="M60,118 Q50,112 48,120" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <path d="M60,128 Q70,122 72,130" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 잎 -->
    <ellipse cx="45" cy="120" rx="10" ry="5" fill="none" stroke="#1a1a1a" stroke-width="0.9" transform="rotate(-30 45 120)"/>
    <line x1="48" y1="117" x2="42" y2="125" stroke="#1a1a1a" stroke-width="0.4" opacity="0.5"/>
    <ellipse cx="75" cy="130" rx="10" ry="5" fill="none" stroke="#1a1a1a" stroke-width="0.9" transform="rotate(30 75 130)"/>
    <line x1="72" y1="127" x2="78" y2="135" stroke="#1a1a1a" stroke-width="0.4" opacity="0.5"/>
    <!-- 장미꽃 (큰, 중앙) -->
    <circle cx="60" cy="76" r="28" fill="none" stroke="#1a1a1a" stroke-width="0.3" opacity="0.2"/>
    <!-- 바깥 꽃잎들 -->
    <ellipse cx="60" cy="52" rx="10" ry="14" fill="none" stroke="#1a1a1a" stroke-width="1" transform="rotate(0 60 52)"/>
    <ellipse cx="79" cy="61" rx="10" ry="14" fill="none" stroke="#1a1a1a" stroke-width="1" transform="rotate(72 79 61)"/>
    <ellipse cx="72" cy="84" rx="10" ry="14" fill="none" stroke="#1a1a1a" stroke-width="1" transform="rotate(144 72 84)"/>
    <ellipse cx="48" cy="84" rx="10" ry="14" fill="none" stroke="#1a1a1a" stroke-width="1" transform="rotate(216 48 84)"/>
    <ellipse cx="41" cy="61" rx="10" ry="14" fill="none" stroke="#1a1a1a" stroke-width="1" transform="rotate(288 41 61)"/>
    <!-- 내부 꽃잎들 -->
    <ellipse cx="60" cy="62" rx="7" ry="10" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <ellipse cx="69" cy="74" rx="7" ry="10" fill="none" stroke="#1a1a1a" stroke-width="0.8" transform="rotate(72 69 74)"/>
    <ellipse cx="51" cy="74" rx="7" ry="10" fill="none" stroke="#1a1a1a" stroke-width="0.8" transform="rotate(-72 51 74)"/>
    <!-- 꽃술 -->
    <circle cx="60" cy="72" r="6" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="60" cy="72" r="3" fill="#F5F0E8"/>
    <circle cx="60" cy="72" r="1.5" fill="#1a1a1a" opacity="0.6"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE ROSE</text>
  </svg>`,

  THE_GATE: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 문 아치 왼쪽 기둥 -->
    <rect x="22" y="62" width="16" height="80" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 문 아치 오른쪽 기둥 -->
    <rect x="82" y="62" width="16" height="80" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 아치 -->
    <path d="M22,62 Q60,28 98,62" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
    <!-- 아치 내부 이중선 -->
    <path d="M28,65 Q60,36 92,65" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <!-- 빛 (아치 안쪽) -->
    <line x1="42" y1="50" x2="78" y2="50" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <line x1="38" y1="56" x2="82" y2="56" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <!-- 기둥 장식선 -->
    <line x1="22" y1="72" x2="38" y2="72" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="82" y1="72" x2="98" y2="72" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="22" y1="82" x2="38" y2="82" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="82" y1="82" x2="98" y2="82" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 아치 꼭대기 장식 -->
    <circle cx="60" cy="36" r="5" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <circle cx="60" cy="36" r="2.5" fill="#1a1a1a" opacity="0.5"/>
    <!-- 바닥 계단 -->
    <line x1="14" y1="142" x2="106" y2="142" stroke="#1a1a1a" stroke-width="1.2"/>
    <line x1="18" y1="136" x2="102" y2="136" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE GATE</text>
  </svg>`,

  THE_ANGEL: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 천사 날개 왼쪽 -->
    <path d="M60,72 Q38,60 20,42 Q28,58 36,68 Q24,62 18,70 Q30,72 38,80 Q28,82 22,92 Q36,88 48,90" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 날개 깃털 선 -->
    <line x1="36" y1="68" x2="30" y2="58" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="38" y1="76" x2="30" y2="70" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 천사 날개 오른쪽 -->
    <path d="M60,72 Q82,60 100,42 Q92,58 84,68 Q96,62 102,70 Q90,72 82,80 Q92,82 98,92 Q84,88 72,90" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <line x1="84" y1="68" x2="90" y2="58" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="82" y1="76" x2="90" y2="70" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 인물 머리 + 후광 -->
    <circle cx="60" cy="56" r="12" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.9"/>
    <circle cx="60" cy="56" r="18" fill="none" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 얼굴 -->
    <ellipse cx="55" cy="54" rx="2.5" ry="2" fill="#1a1a1a" opacity="0.7"/>
    <ellipse cx="65" cy="54" rx="2.5" ry="2" fill="#1a1a1a" opacity="0.7"/>
    <path d="M55,60 Q60,63 65,60" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 몸통 + 로브 -->
    <path d="M50,68 Q44,90 42,130" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <path d="M70,68 Q76,90 78,130" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <line x1="44" y1="80" x2="76" y2="80" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="43" y1="95" x2="77" y2="95" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 트럼펫 -->
    <path d="M76,80 Q88,76 98,72 Q94,80 84,84" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <ellipse cx="98" cy="72" rx="5" ry="3" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE ANGEL</text>
  </svg>`,

  THE_SERPENT: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 뱀 몸통 (둥글게 감긴) -->
    <path d="M60,44 Q80,44 84,58 Q88,72 74,80 Q60,88 48,80 Q34,72 38,56 Q42,38 60,36 Q84,34 92,52 Q100,70 86,88 Q72,106 54,110 Q36,114 28,100 Q20,86 34,74" fill="none" stroke="#1a1a1a" stroke-width="2.2"/>
    <!-- 뱀 머리 -->
    <ellipse cx="34" cy="72" rx="8" ry="5" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="1" transform="rotate(-30 34 72)"/>
    <!-- 뱀 눈 -->
    <circle cx="30" cy="70" r="1.5" fill="#1a1a1a"/>
    <!-- 뱀 혀 -->
    <path d="M26,73 L22,71 M26,73 L22,75" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <!-- 비늘 패턴 점 -->
    <circle cx="60" cy="44" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="74" cy="52" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="80" cy="66" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="70" cy="80" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="54" cy="84" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="42" cy="74" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="40" cy="58" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="52" cy="46" r="1" fill="#1a1a1a" opacity="0.4"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="6.5" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1">THE SERPENT</text>
  </svg>`,

  THE_CHALICE: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 성배 컵 -->
    <path d="M36,44 Q34,72 42,84 Q50,96 60,98 Q70,96 78,84 Q86,72 84,44 Z" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <!-- 성배 내부 -->
    <path d="M40,50 Q38,72 46,82 Q54,92 60,92 Q66,92 74,82 Q82,72 80,50" fill="none" stroke="#1a1a1a" stroke-width="0.5" opacity="0.5"/>
    <!-- 성배 스템 -->
    <line x1="60" y1="98" x2="60" y2="122" stroke="#1a1a1a" stroke-width="1.8"/>
    <!-- 성배 기반 -->
    <ellipse cx="60" cy="125" rx="24" ry="6" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <ellipse cx="60" cy="128" rx="20" ry="4" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <!-- 성배 장식 선 -->
    <line x1="36" y1="70" x2="84" y2="70" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 성배 안 물결 -->
    <path d="M42,50 Q50,44 60,48 Q70,44 78,50" fill="none" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <!-- 별 장식 -->
    <path d="M56,36 L57.5,40 L62,40 L58.5,42.5 L60,47 L56,44 L52,47 L53.5,42.5 L50,40 L54.5,40 Z" fill="#1a1a1a" opacity="0.5"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="6.5" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1">THE CHALICE</text>
  </svg>`,

  THE_LANTERN: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 등불 손잡이 -->
    <path d="M50,44 Q60,36 70,44" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <line x1="60" y1="36" x2="60" y2="26" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 등불 몸통 -->
    <rect x="38" y="50" width="44" height="60" rx="4" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <!-- 등불 상단 캡 -->
    <path d="M34,50 Q60,40 86,50" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 등불 하단 베이스 -->
    <rect x="42" y="110" width="36" height="8" rx="2" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 등불 수직 창살 -->
    <line x1="52" y1="50" x2="52" y2="110" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <line x1="68" y1="50" x2="68" y2="110" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <!-- 등불 수평 창살 -->
    <line x1="38" y1="70" x2="82" y2="70" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <line x1="38" y1="90" x2="82" y2="90" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <!-- 불꽃 -->
    <path d="M60,76 Q54,68 56,60 Q60,66 64,60 Q66,68 60,76 Z" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <circle cx="60" cy="76" r="3" fill="#1a1a1a" opacity="0.5"/>
    <!-- 빛 줄기 -->
    <line x1="36" y1="68" x2="28" y2="64" stroke="#1a1a1a" stroke-width="0.5" opacity="0.45"/>
    <line x1="36" y1="80" x2="26" y2="80" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="84" y1="68" x2="92" y2="64" stroke="#1a1a1a" stroke-width="0.5" opacity="0.45"/>
    <line x1="84" y1="80" x2="94" y2="80" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="6.5" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1">THE LANTERN</text>
  </svg>`,

  THE_ANCHOR: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 닻 링 -->
    <circle cx="60" cy="44" r="8" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <!-- 닻 십자 -->
    <line x1="36" y1="56" x2="84" y2="56" stroke="#1a1a1a" stroke-width="2"/>
    <!-- 닻 기둥 -->
    <line x1="60" y1="56" x2="60" y2="118" stroke="#1a1a1a" stroke-width="1.8"/>
    <!-- 닻 하단 (U형) -->
    <path d="M36,102 Q36,120 60,126 Q84,120 84,102" fill="none" stroke="#1a1a1a" stroke-width="1.8"/>
    <!-- 닻 가로대 끝 -->
    <circle cx="36" cy="56" r="3" fill="#1a1a1a" opacity="0.6"/>
    <circle cx="84" cy="56" r="3" fill="#1a1a1a" opacity="0.6"/>
    <!-- 닻 가로대 지지 -->
    <line x1="36" y1="56" x2="38" y2="60" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="84" y1="56" x2="82" y2="60" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 로프 감기 -->
    <path d="M60,52 Q66,56 60,60 Q54,56 60,52" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <!-- 파도 배경 -->
    <path d="M14,134 Q30,128 46,134 Q62,140 78,134 Q94,128 106,134" fill="none" stroke="#1a1a1a" stroke-width="0.7" opacity="0.4"/>
    <path d="M14,142 Q32,136 50,142 Q68,148 86,142 Q100,136 106,142" fill="none" stroke="#1a1a1a" stroke-width="0.5" opacity="0.3"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE ANCHOR</text>
  </svg>`,

  THE_VEIL: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 두 기둥 -->
    <rect x="20" y="36" width="14" height="106" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <rect x="86" y="36" width="14" height="106" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 기둥 장식 선 -->
    <line x1="20" y1="50" x2="34" y2="50" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="86" y1="50" x2="100" y2="50" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="20" y1="120" x2="34" y2="120" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="86" y1="120" x2="100" y2="120" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 베일 (휘장) -->
    <path d="M34,36 Q44,68 40,100 Q38,120 36,142" fill="none" stroke="#1a1a1a" stroke-width="0.8" opacity="0.6"/>
    <path d="M36,36 Q46,70 42,102 Q40,122 38,142" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.4"/>
    <path d="M86,36 Q76,68 80,100 Q82,120 84,142" fill="none" stroke="#1a1a1a" stroke-width="0.8" opacity="0.6"/>
    <path d="M84,36 Q74,70 78,102 Q80,122 82,142" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.4"/>
    <!-- 베일 사이 여성 -->
    <ellipse cx="60" cy="66" rx="14" ry="16" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.9"/>
    <ellipse cx="54" cy="63" rx="2.5" ry="2" fill="#1a1a1a" opacity="0.7"/>
    <ellipse cx="66" cy="63" rx="2.5" ry="2" fill="#1a1a1a" opacity="0.7"/>
    <path d="M54,70 Q60,73 66,70" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 이마 십자 -->
    <line x1="60" y1="54" x2="60" y2="59" stroke="#1a1a1a" stroke-width="0.9"/>
    <line x1="57.5" y1="56.5" x2="62.5" y2="56.5" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 로브 -->
    <path d="M46,82 Q42,108 40,140" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <path d="M74,82 Q78,108 80,140" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 달 크라운 -->
    <path d="M48,55 Q60,46 72,55" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <circle cx="60" cy="46" r="4" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE VEIL</text>
  </svg>`,

  THE_OWL: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 올빼미 몸통 -->
    <ellipse cx="60" cy="88" rx="28" ry="36" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 배 무늬 -->
    <ellipse cx="60" cy="96" rx="16" ry="20" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <!-- 깃털 패턴 -->
    <path d="M36,70 Q32,82 36,94" fill="none" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <path d="M84,70 Q88,82 84,94" fill="none" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="36" y1="80" x2="44" y2="82" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="36" y1="86" x2="44" y2="88" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="84" y1="80" x2="76" y2="82" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="84" y1="86" x2="76" y2="88" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <!-- 올빼미 머리 -->
    <circle cx="60" cy="60" r="20" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 귀 깃털 뿔 -->
    <path d="M44,44 L40,32 L48,40" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <path d="M76,44 L80,32 L72,40" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 큰 눈 -->
    <circle cx="52" cy="60" r="9" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <circle cx="52" cy="60" r="6" fill="none" stroke="#1a1a1a" stroke-width="0.6"/>
    <circle cx="52" cy="60" r="3.5" fill="#1a1a1a" opacity="0.8"/>
    <circle cx="53.5" cy="58.5" r="1" fill="#F5F0E8" opacity="0.7"/>
    <circle cx="68" cy="60" r="9" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <circle cx="68" cy="60" r="6" fill="none" stroke="#1a1a1a" stroke-width="0.6"/>
    <circle cx="68" cy="60" r="3.5" fill="#1a1a1a" opacity="0.8"/>
    <circle cx="69.5" cy="58.5" r="1" fill="#F5F0E8" opacity="0.7"/>
    <!-- 부리 -->
    <path d="M56,68 L60,74 L64,68" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 나뭇가지 위에 앉아있는 발 -->
    <line x1="24" y1="124" x2="96" y2="124" stroke="#1a1a1a" stroke-width="2"/>
    <path d="M50,124 L46,132 M54,124 L54,132 M50,124 L56,132" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <path d="M66,124 L62,132 M70,124 L70,132 M66,124 L72,132" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 달 배경 -->
    <circle cx="22" cy="50" r="12" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.4"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE OWL</text>
  </svg>`,

  THE_LABYRINTH: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 미로 (동심원 패턴) -->
    <circle cx="60" cy="80" r="42" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <circle cx="60" cy="80" r="35" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <circle cx="60" cy="80" r="28" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <circle cx="60" cy="80" r="21" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <circle cx="60" cy="80" r="14" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <circle cx="60" cy="80" r="7" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 미로 입구 (갭) -->
    <line x1="60" y1="38" x2="60" y2="45" stroke="#F5F0E8" stroke-width="2.5"/>
    <line x1="60" y1="45" x2="60" y2="52" stroke="#F5F0E8" stroke-width="2.5"/>
    <line x1="86" y1="68" x2="92" y2="68" stroke="#F5F0E8" stroke-width="2.5"/>
    <line x1="60" y1="87" x2="60" y2="93" stroke="#F5F0E8" stroke-width="2.5"/>
    <line x1="34" y1="80" x2="40" y2="80" stroke="#F5F0E8" stroke-width="2.5"/>
    <!-- 중심점 -->
    <circle cx="60" cy="80" r="4" fill="#1a1a1a" opacity="0.7"/>
    <circle cx="60" cy="80" r="2" fill="#F5F0E8"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="6" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1">THE LABYRINTH</text>
  </svg>`,

  THE_COMET: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 혜성 꼬리들 -->
    <path d="M36,44 L84,90" fill="none" stroke="#1a1a1a" stroke-width="0.5" opacity="0.35"/>
    <path d="M30,48 L78,92" fill="none" stroke="#1a1a1a" stroke-width="0.45" opacity="0.3"/>
    <path d="M32,38 L82,82" fill="none" stroke="#1a1a1a" stroke-width="0.4" opacity="0.28"/>
    <path d="M26,44 L74,88" fill="none" stroke="#1a1a1a" stroke-width="0.35" opacity="0.25"/>
    <path d="M22,50 L68,90" fill="none" stroke="#1a1a1a" stroke-width="0.3" opacity="0.22"/>
    <path d="M20,40 L66,84" fill="none" stroke="#1a1a1a" stroke-width="0.25" opacity="0.2"/>
    <path d="M40,34 L88,80" fill="none" stroke="#1a1a1a" stroke-width="0.4" opacity="0.28"/>
    <path d="M44,30 L92,74" fill="none" stroke="#1a1a1a" stroke-width="0.35" opacity="0.25"/>
    <!-- 혜성 핵 -->
    <circle cx="88" cy="90" r="14" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <circle cx="88" cy="90" r="10" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
    <circle cx="88" cy="90" r="5" fill="#1a1a1a" opacity="0.6"/>
    <circle cx="88" cy="90" r="2.5" fill="#F5F0E8"/>
    <!-- 혜성 광환 -->
    <circle cx="88" cy="90" r="18" fill="none" stroke="#1a1a1a" stroke-width="0.35" opacity="0.25"/>
    <!-- 별 배경 -->
    <circle cx="24" cy="112" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="36" cy="126" r="0.8" fill="#1a1a1a" opacity="0.35"/>
    <circle cx="50" cy="116" r="0.7" fill="#1a1a1a" opacity="0.3"/>
    <circle cx="70" cy="120" r="0.9" fill="#1a1a1a" opacity="0.35"/>
    <circle cx="100" cy="42" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="16" cy="80" r="0.8" fill="#1a1a1a" opacity="0.35"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE COMET</text>
  </svg>`,

  THE_ABYSS: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 심연 (동심원들이 안쪽으로 좁아지는) -->
    <ellipse cx="60" cy="82" rx="44" ry="36" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <ellipse cx="60" cy="82" rx="36" ry="30" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <ellipse cx="60" cy="82" rx="28" ry="24" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <ellipse cx="60" cy="82" rx="20" ry="18" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <ellipse cx="60" cy="82" rx="12" ry="12" fill="none" stroke="#1a1a1a" stroke-width="0.6"/>
    <ellipse cx="60" cy="82" rx="6" ry="6" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
    <!-- 중심 어둠 -->
    <circle cx="60" cy="82" r="4" fill="#1a1a1a" opacity="0.8"/>
    <!-- 방사선 -->
    <line x1="60" y1="46" x2="60" y2="56" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="60" y1="108" x2="60" y2="118" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="16" y1="82" x2="26" y2="82" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="94" y1="82" x2="104" y2="82" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 별 빛 -->
    <circle cx="24" cy="50" r="1.5" fill="#1a1a1a" opacity="0.5"/>
    <circle cx="96" cy="46" r="1.2" fill="#1a1a1a" opacity="0.45"/>
    <circle cx="18" cy="116" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="100" cy="118" r="0.9" fill="#1a1a1a" opacity="0.4"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE ABYSS</text>
  </svg>`,

  THE_PHOENIX: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 불사조 날개 왼쪽 -->
    <path d="M60,72 Q40,54 16,44 Q24,60 32,70 Q18,64 14,76 Q28,76 40,84" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 날개 불꽃 깃털 -->
    <path d="M30,60 Q24,50 26,42" fill="none" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <path d="M22,68 Q16,60 18,52" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.45"/>
    <!-- 불사조 날개 오른쪽 -->
    <path d="M60,72 Q80,54 104,44 Q96,60 88,70 Q102,64 106,76 Q92,76 80,84" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <path d="M90,60 Q96,50 94,42" fill="none" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <path d="M98,68 Q104,60 102,52" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.45"/>
    <!-- 불사조 몸통 -->
    <ellipse cx="60" cy="82" rx="16" ry="20" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 꼬리 불꽃 -->
    <path d="M52,100 Q44,114 42,130" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <path d="M60,102 Q58,118 58,136" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <path d="M68,100 Q76,114 78,130" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <path d="M56,104 Q48,120 46,138" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <path d="M64,104 Q72,120 74,138" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.5"/>
    <!-- 불사조 머리 -->
    <circle cx="60" cy="64" r="10" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 볏 -->
    <path d="M54,56 Q58,46 64,44 Q68,50 72,48 Q66,56 60,58" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 눈 -->
    <circle cx="57" cy="63" r="2" fill="#1a1a1a"/>
    <circle cx="63" cy="63" r="2" fill="#1a1a1a"/>
    <circle cx="57.7" cy="62.3" r="0.6" fill="#F5F0E8" opacity="0.7"/>
    <circle cx="63.7" cy="62.3" r="0.6" fill="#F5F0E8" opacity="0.7"/>
    <!-- 부리 -->
    <path d="M58,68 L60,73 L62,68" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE PHOENIX</text>
  </svg>`,

  THE_CRYSTAL: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 크리스탈 (큰, 중앙) -->
    <polygon points="60,32 80,68 80,108 60,140 40,108 40,68" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
    <!-- 크리스탈 상단 cap -->
    <polygon points="60,32 74,56 60,52 46,56" fill="none" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <!-- 크리스탈 면 분할 선 -->
    <line x1="60" y1="32" x2="60" y2="140" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="40" y1="68" x2="80" y2="68" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="40" y1="108" x2="80" y2="108" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="40" y1="68" x2="60" y2="52" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="80" y1="68" x2="60" y2="52" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <!-- 크리스탈 반사광 -->
    <line x1="46" y1="72" x2="52" y2="80" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <line x1="48" y1="86" x2="54" y2="96" stroke="#1a1a1a" stroke-width="0.3" opacity="0.25"/>
    <!-- 빛 줄기 -->
    <line x1="60" y1="32" x2="60" y2="24" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="54" y1="35" x2="48" y2="27" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <line x1="66" y1="35" x2="72" y2="27" stroke="#1a1a1a" stroke-width="0.5" opacity="0.4"/>
    <!-- 작은 크리스탈들 -->
    <polygon points="24,80 30,92 24,104 18,92" fill="none" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <polygon points="96,72 102,84 96,96 90,84" fill="none" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE CRYSTAL</text>
  </svg>`,

  THE_BRIDGE: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 다리 아치 -->
    <path d="M14,100 Q60,52 106,100" fill="none" stroke="#1a1a1a" stroke-width="1.6"/>
    <!-- 다리 바닥 -->
    <line x1="14" y1="100" x2="106" y2="100" stroke="#1a1a1a" stroke-width="1.2"/>
    <line x1="14" y1="106" x2="106" y2="106" stroke="#1a1a1a" stroke-width="0.8" opacity="0.5"/>
    <!-- 교각 수직선들 -->
    <line x1="26" y1="80" x2="26" y2="100" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="38" y1="68" x2="38" y2="100" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="50" y1="60" x2="50" y2="100" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="60" y1="57" x2="60" y2="100" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="70" y1="60" x2="70" y2="100" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="82" y1="68" x2="82" y2="100" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="94" y1="80" x2="94" y2="100" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <!-- 강물 -->
    <path d="M14,116 Q36,110 58,116 Q80,122 106,116" fill="none" stroke="#1a1a1a" stroke-width="0.8" opacity="0.5"/>
    <path d="M14,126 Q38,120 62,126 Q86,132 106,126" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.4"/>
    <path d="M14,136 Q40,130 66,136 Q90,142 106,136" fill="none" stroke="#1a1a1a" stroke-width="0.5" opacity="0.3"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE BRIDGE</text>
  </svg>`,

  THE_LOTUS: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 연꽃 (선화) -->
    <!-- 줄기 -->
    <line x1="60" y1="112" x2="60" y2="140" stroke="#1a1a1a" stroke-width="1.4"/>
    <!-- 잎 -->
    <path d="M60,130 Q38,120 30,132 Q44,136 60,130 Z" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <path d="M60,130 Q82,120 90,132 Q76,136 60,130 Z" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 바깥 꽃잎 5장 -->
    <path d="M60,112 Q50,96 44,84 Q54,90 60,100 Z" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <path d="M60,112 Q70,96 76,84 Q66,90 60,100 Z" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <path d="M60,112 Q38,98 34,86 Q46,96 56,104 Z" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <path d="M60,112 Q82,98 86,86 Q74,96 64,104 Z" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <path d="M60,112 Q58,94 50,82 Q56,94 58,104 Z" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <path d="M60,112 Q62,94 70,82 Q64,94 62,104 Z" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 중간 꽃잎 3장 -->
    <path d="M60,104 Q52,90 50,76 Q58,88 60,98 Z" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <path d="M60,104 Q68,90 70,76 Q62,88 60,98 Z" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <path d="M60,104 Q60,88 60,72 Z" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 중심 꽃봉오리 -->
    <ellipse cx="60" cy="84" rx="8" ry="12" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <ellipse cx="60" cy="84" rx="4" ry="7" fill="#1a1a1a" opacity="0.2"/>
    <!-- 꽃술 -->
    <circle cx="60" cy="78" r="3" fill="#1a1a1a" opacity="0.5"/>
    <!-- 연못 물 -->
    <path d="M14,140 Q36,134 58,140 Q80,146 106,140" fill="none" stroke="#1a1a1a" stroke-width="0.7" opacity="0.4"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE LOTUS</text>
  </svg>`,

  THE_FORTRESS: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 성채 외벽 -->
    <rect x="18" y="72" width="84" height="70" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 성채 흉벽 (위) -->
    <path d="M18,72 L18,60 L28,60 L28,72 M38,60 L38,72 L48,72 L48,60 M58,60 L58,72 L68,72 L68,60 M78,60 L78,72 L88,72 L88,60 M98,60 L98,72 L102,72 L102,60" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 가로선 (성벽 높이) -->
    <line x1="18" y1="60" x2="102" y2="60" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 중앙 탑 -->
    <rect x="44" y="42" width="32" height="72" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
    <!-- 중앙 탑 흉벽 -->
    <path d="M44,42 L44,32 L52,32 L52,42 M60,32 L60,42 L68,42 L68,32 M76,32 L76,42 L76,42" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <line x1="44" y1="32" x2="76" y2="32" stroke="#1a1a1a" stroke-width="0.8"/>
    <!-- 중앙 탑 문 -->
    <path d="M52,114 Q60,106 68,114 L68,142 L52,142 Z" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 창문 -->
    <rect x="50" y="54" width="8" height="10" rx="4" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <rect x="62" y="54" width="8" height="10" rx="4" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <rect x="26" y="84" width="8" height="10" rx="4" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <rect x="86" y="84" width="8" height="10" rx="4" fill="none" stroke="#1a1a1a" stroke-width="0.7"/>
    <!-- 성채 벽돌 해칭 -->
    <line x1="18" y1="82" x2="44" y2="82" stroke="#1a1a1a" stroke-width="0.3" opacity="0.3"/>
    <line x1="76" y1="82" x2="102" y2="82" stroke="#1a1a1a" stroke-width="0.3" opacity="0.3"/>
    <line x1="18" y1="96" x2="44" y2="96" stroke="#1a1a1a" stroke-width="0.3" opacity="0.3"/>
    <line x1="76" y1="96" x2="102" y2="96" stroke="#1a1a1a" stroke-width="0.3" opacity="0.3"/>
    <!-- 기를 -->
    <line x1="60" y1="32" x2="60" y2="20" stroke="#1a1a1a" stroke-width="0.8"/>
    <path d="M60,20 L74,23 L60,28 Z" fill="none" stroke="#1a1a1a" stroke-width="0.6"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="6.5" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1">THE FORTRESS</text>
  </svg>`,

  THE_ECLIPSE: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 태양 코로나 광선 -->
    <circle cx="60" cy="78" r="44" fill="none" stroke="#1a1a1a" stroke-width="0.3" opacity="0.25"/>
    <line x1="60" y1="34" x2="60" y2="24" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="91" y1="47" x2="99" y2="39" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="104" y1="78" x2="114" y2="78" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="91" y1="109" x2="99" y2="117" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="60" y1="122" x2="60" y2="132" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="29" y1="109" x2="21" y2="117" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="16" y1="78" x2="6" y2="78" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <line x1="29" y1="47" x2="21" y2="39" stroke="#1a1a1a" stroke-width="0.7" opacity="0.5"/>
    <!-- 태양 외곽 -->
    <circle cx="60" cy="78" r="34" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 달이 태양을 가리는 -->
    <circle cx="60" cy="78" r="30" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="1.4"/>
    <!-- 코로나 얇은 선들 -->
    <circle cx="60" cy="78" r="32" fill="none" stroke="#1a1a1a" stroke-width="0.4" opacity="0.3"/>
    <!-- 달 가장자리 빛 (일식 링) -->
    <circle cx="63" cy="76" r="30" fill="#F5F0E8" stroke="none"/>
    <!-- 해칭 배경 (어두워진 하늘) -->
    <line x1="14" y1="40" x2="30" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.2"/>
    <line x1="22" y1="40" x2="38" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.2"/>
    <line x1="86" y1="40" x2="102" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.2"/>
    <line x1="14" y1="130" x2="30" y2="144" stroke="#1a1a1a" stroke-width="0.2" opacity="0.2"/>
    <line x1="86" y1="130" x2="102" y2="144" stroke="#1a1a1a" stroke-width="0.2" opacity="0.2"/>
    <!-- 별들 (일식 중) -->
    <circle cx="24" cy="50" r="1.2" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="96" cy="48" r="1" fill="#1a1a1a" opacity="0.35"/>
    <circle cx="20" cy="112" r="1" fill="#1a1a1a" opacity="0.35"/>
    <circle cx="98" cy="114" r="0.8" fill="#1a1a1a" opacity="0.3"/>
    <!-- 해칭 -->
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE ECLIPSE</text>
  </svg>`,

  THE_WELL: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 우물 지붕 삼각형 -->
    <path d="M22,60 L60,34 L98,60" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 우물 지붕 기둥 -->
    <line x1="22" y1="60" x2="22" y2="82" stroke="#1a1a1a" stroke-width="1.3"/>
    <line x1="98" y1="60" x2="98" y2="82" stroke="#1a1a1a" stroke-width="1.3"/>
    <!-- 두레박 축 -->
    <line x1="36" y1="60" x2="84" y2="60" stroke="#1a1a1a" stroke-width="1.5"/>
    <circle cx="60" cy="60" r="5" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 로프 -->
    <line x1="60" y1="65" x2="60" y2="88" stroke="#1a1a1a" stroke-width="0.9"/>
    <!-- 두레박 -->
    <rect x="50" y="88" width="20" height="14" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    <!-- 우물 테두리 -->
    <ellipse cx="60" cy="110" rx="36" ry="10" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <!-- 우물 몸통 -->
    <line x1="24" y1="110" x2="24" y2="140" stroke="#1a1a1a" stroke-width="1.2"/>
    <line x1="96" y1="110" x2="96" y2="140" stroke="#1a1a1a" stroke-width="1.2"/>
    <ellipse cx="60" cy="140" rx="36" ry="10" fill="none" stroke="#1a1a1a" stroke-width="0.8" opacity="0.5"/>
    <!-- 우물 벽 돌 무늬 -->
    <line x1="24" y1="120" x2="96" y2="120" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <line x1="24" y1="130" x2="96" y2="130" stroke="#1a1a1a" stroke-width="0.4" opacity="0.35"/>
    <!-- 물 반사 (우물 안) -->
    <ellipse cx="60" cy="110" rx="28" ry="7" fill="none" stroke="#1a1a1a" stroke-width="0.4" opacity="0.3"/>
    <!-- 지면 -->
    <path d="M14,140 Q60,134 106,140" fill="none" stroke="#1a1a1a" stroke-width="0.6" opacity="0.4"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE WELL</text>
  </svg>`,

  THE_VOID: `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="4" fill="#F5F0E8"/>
    <rect x="4" y="4" width="112" height="172" rx="3" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
    <rect x="8" y="8" width="104" height="164" rx="2" fill="none" stroke="#1a1a1a" stroke-width="0.45"/>
    <path d="M60,3 L63,6 L60,9 L57,6 Z" fill="#1a1a1a"/>
    <path d="M60,171 L63,174 L60,177 L57,174 Z" fill="#1a1a1a"/>
    <path d="M3,90 L6,87 L9,90 L6,93 Z" fill="#1a1a1a"/>
    <path d="M111,90 L114,87 L117,90 L114,93 Z" fill="#1a1a1a"/>
    <!-- 빈 공간 (원형 구멍) -->
    <circle cx="60" cy="80" r="36" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
    <!-- 구멍 내부 깊이 표현 해칭 -->
    <line x1="26" y1="68" x2="94" y2="68" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <line x1="24" y1="74" x2="96" y2="74" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <line x1="24" y1="80" x2="96" y2="80" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <line x1="24" y1="86" x2="96" y2="86" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <line x1="26" y1="92" x2="94" y2="92" stroke="#1a1a1a" stroke-width="0.35" opacity="0.3"/>
    <!-- 중심 어둠 -->
    <circle cx="60" cy="80" r="20" fill="#1a1a1a" opacity="0.08"/>
    <circle cx="60" cy="80" r="10" fill="#1a1a1a" opacity="0.12"/>
    <circle cx="60" cy="80" r="4" fill="#1a1a1a" opacity="0.2"/>
    <!-- 구멍 가장자리 광택 -->
    <circle cx="60" cy="80" r="34" fill="none" stroke="#1a1a1a" stroke-width="0.3" opacity="0.25"/>
    <!-- 주변 별들 -->
    <circle cx="22" cy="46" r="1.2" fill="#1a1a1a" opacity="0.5"/>
    <circle cx="38" cy="34" r="0.8" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="82" cy="34" r="1" fill="#1a1a1a" opacity="0.45"/>
    <circle cx="98" cy="48" r="0.9" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="22" cy="116" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="36" cy="128" r="0.8" fill="#1a1a1a" opacity="0.35"/>
    <circle cx="84" cy="126" r="1" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="98" cy="112" r="0.9" fill="#1a1a1a" opacity="0.35"/>
    <!-- 해칭 -->
    <line x1="14" y1="28" x2="18" y2="24" stroke="#1a1a1a" stroke-width="0.2" opacity="0.25"/>
    <line x1="20" y1="148" x2="100" y2="148" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="20" y1="151" x2="100" y2="151" stroke="#1a1a1a" stroke-width="0.25"/>
    <rect x="14" y="155" width="92" height="18" fill="#F5F0E8" stroke="#1a1a1a" stroke-width="0.7"/>
    <text x="60" y="167.5" text-anchor="middle" font-size="7" fill="#1a1a1a" font-family="Georgia,serif" letter-spacing="1.5">THE VOID</text>
  </svg>`,
};

// 카드 데이터에 svgKey 추가
const ORACLE_CARD_DATA = {
  love: [
    { svgKey: 'THE_HEART',  name: 'THE HEART',  msg: '이 카드가 선택된 건 우연이 아니야',   sub: '오늘의 감정 에너지가 이 카드를 불렀어. 가능성을 끌어올리는 흐름이 담겨 있어.' },
    { svgKey: 'THE_MOON',   name: 'THE MOON',   msg: '달이 차오르듯 가능성도 오르고 있어',    sub: '이 카드를 곁에 두면 그 흐름이 더 빠르게 무르익어.' },
    { svgKey: 'THE_SIGNAL', name: 'THE SIGNAL', msg: '네 시그널이 이미 발신되고 있어',      sub: '이 카드는 상대에게 닿는 주파수를 높여주는 에너지야.' },
    { svgKey: 'THE_MIRROR', name: 'THE MIRROR', msg: '진심은 거울처럼 결국 돌아와',        sub: '이 카드를 자주 보면 그 진심의 파장이 증폭돼.' },
    { svgKey: 'THE_TIDE',   name: 'THE TIDE',   msg: '지금 이 흐름, 올라타야 할 때야',      sub: '이 카드가 그 파도의 타이밍을 알려주고 있어.' },
  ],
  invest: [
    { svgKey: 'THE_SCALE',     name: 'THE SCALE',     msg: '균형 잡힌 판단이 가능성을 높여',    sub: '이 카드는 흔들리지 않는 눈을 만들어주는 에너지야.' },
    { svgKey: 'THE_HOURGLASS', name: 'THE HOURGLASS', msg: '때를 아는 사람이 기회를 잡아',    sub: '이 카드를 곁에 두면 타이밍을 읽는 감이 예리해져.' },
    { svgKey: 'THE_KEY',       name: 'THE KEY',       msg: '이 카드가 잠긴 기회의 문을 열어', sub: '결정의 가능성을 높이는 에너지가 이 카드에 담겨 있어.' },
    { svgKey: 'THE_VISION',    name: 'THE VISION',    msg: '멀리 보는 눈이 수익을 만들어',    sub: '이 카드를 자주 보면 장기 흐름이 보이기 시작해.' },
    { svgKey: 'THE_STAR',      name: 'THE STAR',      msg: '별은 방향을 알고 있어',           sub: '이 카드가 가리키는 쪽으로 움직이면 가능성이 올라가.' },
  ],
  career: [
    { svgKey: 'THE_STAR',    name: 'THE STAR',    msg: '네 별이 지금 가장 밝게 빛나고 있어', sub: '이 카드를 곁에 두면 그 빛이 기회로 이어져.' },
    { svgKey: 'THE_SPARK',   name: 'THE SPARK',   msg: '이 불꽃, 지금 꺼지면 안 돼',        sub: '이 카드의 에너지가 커리어 가능성을 끌어올려.' },
    { svgKey: 'THE_COMPASS', name: 'THE COMPASS', msg: '방향을 아는 사람이 빨리 도착해',     sub: '이 카드를 보고 결정하면 오차가 줄어들어.' },
    { svgKey: 'THE_KEY',     name: 'THE KEY',     msg: '이 카드가 다음 문을 열어줄 거야',    sub: '기회의 문 앞에 있을 때 이 카드를 떠올려봐.' },
    { svgKey: 'THE_GROWTH',  name: 'THE GROWTH',  msg: '성장의 씨앗이 지금 싹트고 있어',    sub: '이 카드를 자주 보면 성장의 속도가 달라져.' },
  ],
  relation: [
    { svgKey: 'THE_PEACE',  name: 'THE PEACE',  msg: '이 카드가 관계의 문을 다시 열어줘',   sub: '화해의 에너지가 담긴 카드야. 곁에 두면 흐름이 풀려.' },
    { svgKey: 'THE_BOND',   name: 'THE BOND',   msg: '연결의 에너지가 이 카드에 담겼어',    sub: '이 카드를 자주 보면 관계 회복 가능성이 높아져.' },
    { svgKey: 'THE_GROWTH', name: 'THE GROWTH', msg: '관계도 키우는 사람이 따로 있어',      sub: '이 카드를 곁에 두면 그 능력이 자연스럽게 생겨.' },
    { svgKey: 'THE_SIGNAL', name: 'THE SIGNAL', msg: '네 진심이 상대에게 닿고 있어',        sub: '이 카드가 그 신호를 더 선명하게 만들어줘.' },
    { svgKey: 'THE_MIRROR', name: 'THE MIRROR', msg: '상대의 마음이 이미 움직이고 있어',    sub: '이 카드를 보면 그 신호를 더 잘 읽을 수 있게 돼.' },
  ],
  divorce: [
    { svgKey: 'THE_MIRROR', name: 'THE MIRROR', msg: '진실은 거울 앞에서 분명해져',        sub: '이 카드를 보면 감정 속에 묻힌 진짜 답이 떠올라.' },
    { svgKey: 'THE_SCALE',  name: 'THE SCALE',  msg: '유리한 방향은 이미 정해져 있어',      sub: '이 카드를 곁에 두면 현실적인 판단력이 높아져.' },
    { svgKey: 'THE_KEY',    name: 'THE KEY',    msg: '이 카드가 출구를 열어줘',             sub: '막혀 있던 상황이 이 에너지로 풀리기 시작해.' },
    { svgKey: 'THE_CHANGE', name: 'THE CHANGE', msg: '전환의 에너지가 이미 흐르고 있어',    sub: '이 카드를 보면 새로운 흐름이 더 빨리 찾아와.' },
    { svgKey: 'THE_FLOW',   name: 'THE FLOW',   msg: '흐름은 막을 수 없어, 타야 해',        sub: '이 카드가 더 나은 방향으로 이끄는 에너지야.' },
  ],
  startup: [
    { svgKey: 'THE_SPARK',   name: 'THE SPARK',   msg: '이 불꽃이 성공의 신호야',           sub: '이 카드를 곁에 두면 실행의 에너지가 꺼지지 않아.' },
    { svgKey: 'THE_COMPASS', name: 'THE COMPASS', msg: '시장의 방향이 보이기 시작해',        sub: '이 카드를 자주 보면 결정의 가능성이 올라가.' },
    { svgKey: 'THE_GROWTH',  name: 'THE GROWTH',  msg: '성장의 씨앗이 이미 심어졌어',        sub: '이 카드가 그 씨앗에 물을 주는 에너지야.' },
    { svgKey: 'THE_KEY',     name: 'THE KEY',     msg: '이 카드가 투자자의 문을 열어줘',     sub: '좋은 기회 앞에 설 때 이 카드의 에너지를 떠올려봐.' },
    { svgKey: 'THE_STAR',    name: 'THE STAR',    msg: '네 아이디어의 별이 뜨고 있어',       sub: '이 카드를 곁에 두면 그 빛이 더 밝아져.' },
  ],
  realestate: [
    { svgKey: 'THE_KEY',       name: 'THE KEY',       msg: '이 카드가 좋은 매물의 문을 열어', sub: '이 카드를 보고 결정하면 놓쳤던 기회가 다시 와.' },
    { svgKey: 'THE_HOURGLASS', name: 'THE HOURGLASS', msg: '완벽한 타이밍이 다가오고 있어',    sub: '이 카드를 곁에 두면 그 순간을 놓치지 않게 돼.' },
    { svgKey: 'THE_VISION',    name: 'THE VISION',    msg: '10년 뒤가 지금 보이기 시작해',     sub: '이 카드의 에너지가 장기 판단력을 높여줘.' },
    { svgKey: 'THE_TRUTH',     name: 'THE TRUTH',     msg: '숫자 뒤에 숨은 진짜가 보여',       sub: '이 카드를 자주 보면 실수를 줄이는 감이 생겨.' },
    { svgKey: 'THE_STAR',      name: 'THE STAR',      msg: '이 결정, 별이 이끌고 있어',        sub: '이 카드를 곁에 두면 부동산 흐름이 더 잘 읽혀.' },
  ],
  legal: [
    { svgKey: 'THE_SCALE',  name: 'THE SCALE',  msg: '저울은 이미 네 쪽으로 기울고 있어',  sub: '이 카드를 곁에 두면 유리한 흐름이 더 강해져.' },
    { svgKey: 'THE_SPARK',  name: 'THE SPARK',  msg: '지금이 움직일 가장 좋은 타이밍이야', sub: '이 카드가 결정적인 행동의 에너지를 불어넣어줘.' },
    { svgKey: 'THE_KEY',    name: 'THE KEY',    msg: '이 카드가 승소의 문을 열어줄 거야',  sub: '이 카드를 보면 놓쳤던 핵심이 보이기 시작해.' },
    { svgKey: 'THE_TRUTH',  name: 'THE TRUTH',  msg: '진실은 결국 드러나게 되어 있어',     sub: '이 카드를 곁에 두면 증거가 더 선명해지는 흐름이 와.' },
    { svgKey: 'THE_VISION', name: 'THE VISION', msg: '전략의 눈이 뜨이고 있어',            sub: '이 카드를 자주 보면 유리한 전략이 떠올라.' },
  ],
  debt: [
    { svgKey: 'THE_FLOW',    name: 'THE FLOW',    msg: '돈의 흐름이 다시 열리고 있어',     sub: '이 카드를 곁에 두면 막혔던 흐름이 풀려.' },
    { svgKey: 'THE_KEY',     name: 'THE KEY',     msg: '이 카드가 출구를 알려줘',          sub: '이 카드를 보면 몰랐던 해결책이 눈에 들어와.' },
    { svgKey: 'THE_GROWTH',  name: 'THE GROWTH',  msg: '회복의 씨앗이 이미 심어졌어',      sub: '이 카드를 자주 보면 회복 가능성이 올라가.' },
    { svgKey: 'THE_STAR',    name: 'THE STAR',    msg: '어두운 밤에도 별은 떠 있어',        sub: '이 카드가 다시 방향을 잡아주는 빛이 돼줄 거야.' },
    { svgKey: 'THE_COMPASS', name: 'THE COMPASS', msg: '나아갈 방향이 보이기 시작해',       sub: '이 카드를 곁에 두면 올바른 선택의 가능성이 높아져.' },
  ],
  trauma: [
    { svgKey: 'THE_MOON',   name: 'THE MOON',   msg: '가장 긴 밤도 결국 새벽이 와',        sub: '이 카드를 자주 보면 회복의 에너지가 쌓여.' },
    { svgKey: 'THE_HEART',  name: 'THE HEART',  msg: '이 카드가 상처를 감싸줄 거야',        sub: '치유의 에너지가 담긴 카드야. 곁에 두면 달라져.' },
    { svgKey: 'THE_GROWTH', name: 'THE GROWTH', msg: '이 고통 뒤에 성장이 기다리고 있어',   sub: '이 카드를 보면 회복의 방향이 더 빨리 보여.' },
    { svgKey: 'THE_FLOW',   name: 'THE FLOW',   msg: '자연스러운 흐름이 회복을 이끌어',     sub: '이 카드를 곁에 두면 막힌 감정이 흐르기 시작해.' },
    { svgKey: 'THE_STAR',   name: 'THE STAR',   msg: '어둠 속에서 네 별이 가장 빛나',       sub: '이 카드가 그 빛을 잃지 않게 지켜줄 거야.' },
  ],
  money: [
    { svgKey: 'THE_SCALE',     name: 'THE SCALE',     msg: '균형이 돈을 끌어당겨',           sub: '이 카드를 곁에 두면 수입과 지출의 흐름이 맞춰져.' },
    { svgKey: 'THE_HOURGLASS', name: 'THE HOURGLASS', msg: '지금이 바로 그 타이밍이야',       sub: '이 카드를 보면 돈이 들어오는 흐름이 보이기 시작해.' },
    { svgKey: 'THE_KEY',       name: 'THE KEY',       msg: '이 카드가 재정의 문을 열어줘',    sub: '잠겨 있던 기회가 이 에너지와 함께 열려.' },
    { svgKey: 'THE_FLOW',      name: 'THE FLOW',      msg: '돈이 흐르는 방향이 보여',         sub: '이 카드를 자주 보면 재정 흐름이 탄탄해져.' },
    { svgKey: 'THE_STAR',      name: 'THE STAR',      msg: '풍요의 별이 네 위에 떠 있어',     sub: '이 카드를 곁에 두면 그 에너지가 증폭돼.' },
  ],
  mind: [
    { svgKey: 'THE_MOON',   name: 'THE MOON',   msg: '이 카드가 마음의 안정을 불러줘',     sub: '감정이 잔잔해질수록 선택의 가능성도 올라가.' },
    { svgKey: 'THE_HEART',  name: 'THE HEART',  msg: '네 마음이 이미 답을 알고 있어',      sub: '이 카드를 자주 보면 그 답이 더 선명해져.' },
    { svgKey: 'THE_TIDE',   name: 'THE TIDE',   msg: '감정의 파도가 잦아들고 있어',         sub: '이 카드를 곁에 두면 흔들림이 줄어들어.' },
    { svgKey: 'THE_GROWTH', name: 'THE GROWTH', msg: '마음이 성장할수록 모든 게 달라져',    sub: '이 카드가 그 성장을 가속시켜주는 에너지야.' },
    { svgKey: 'THE_MIRROR', name: 'THE MIRROR', msg: '내면의 빛이 밖으로 퍼지고 있어',      sub: '이 카드를 보면 무엇이 나를 막고 있는지 보여.' },
  ],
  family: [
    { svgKey: 'THE_BOND',   name: 'THE BOND',   msg: '이 카드가 가족의 마음을 이어줘',      sub: '연결의 에너지가 담긴 카드야. 곁에 두면 흐름이 열려.' },
    { svgKey: 'THE_PEACE',  name: 'THE PEACE',  msg: '화해의 물꼬가 트이고 있어',           sub: '이 카드를 자주 보면 관계 회복 가능성이 높아져.' },
    { svgKey: 'THE_GROWTH', name: 'THE GROWTH', msg: '가족이라는 나무가 다시 자라고 있어',  sub: '이 카드가 그 성장을 이끄는 에너지야.' },
    { svgKey: 'THE_MIRROR', name: 'THE MIRROR', msg: '서로의 마음이 비치기 시작해',          sub: '이 카드를 보면 상대 입장이 더 잘 읽혀.' },
    { svgKey: 'THE_HEART',  name: 'THE HEART',  msg: '진심이 결국 닿게 되어 있어',           sub: '이 카드를 곁에 두면 그 타이밍이 더 빨리 와.' },
  ],
  friend: [
    { svgKey: 'THE_BOND',   name: 'THE BOND',   msg: '이 카드가 우정을 다시 이어줘',        sub: '연결 에너지가 담긴 카드야. 곁에 두면 거리가 좁혀져.' },
    { svgKey: 'THE_HEART',  name: 'THE HEART',  msg: '진심은 언제나 전해지게 돼 있어',      sub: '이 카드를 자주 보면 그 타이밍이 더 빨리 찾아와.' },
    { svgKey: 'THE_SIGNAL', name: 'THE SIGNAL', msg: '네 신호가 이미 상대에게 닿고 있어',   sub: '이 카드를 보면 그 주파수가 더 선명해져.' },
    { svgKey: 'THE_PEACE',  name: 'THE PEACE',  msg: '이 카드가 오해를 풀어주는 에너지야',  sub: '이 카드를 곁에 두면 막혔던 대화가 열려.' },
    { svgKey: 'THE_TIDE',   name: 'THE TIDE',   msg: '우정의 밀물이 다시 밀려오고 있어',    sub: '이 카드를 보면 그 흐름을 더 빨리 탈 수 있어.' },
  ],
  default: [
    { svgKey: 'THE_FLOW',   name: 'THE FLOW',   msg: '이 카드가 흐름을 열어줄 거야',         sub: '막혀 있던 에너지가 이 카드와 함께 풀려.' },
    { svgKey: 'THE_STAR',   name: 'THE STAR',   msg: '네 별이 지금 가장 밝아',               sub: '이 카드를 곁에 두면 그 빛이 길을 만들어줘.' },
    { svgKey: 'THE_VISION', name: 'THE VISION', msg: '답이 보이기 시작하고 있어',             sub: '이 카드를 자주 보면 선택의 가능성이 올라가.' },
    { svgKey: 'THE_SPARK',  name: 'THE SPARK',  msg: '이 불꽃이 변화를 만들어',               sub: '이 카드를 곁에 두면 좋은 흐름이 더 빨리 와.' },
    { svgKey: 'THE_KEY',    name: 'THE KEY',    msg: '이 카드가 다음 문을 열어줄 거야',        sub: '기회의 문 앞에 설 때 이 카드를 떠올려봐.' },
    { svgKey: 'THE_NOW',    name: 'THE NOW',    msg: '지금 이 순간이 가장 강한 타이밍이야',    sub: '이 카드를 보면 지금 해야 할 것이 보여.' },
  ]
};

/* 결과가 렌더링될 때 카드 트리거(버튼) 상태로 초기화 */
function initOracleTrigger(r) {
  const trigger = document.getElementById('oracleTrigger');
  const wrap    = document.getElementById('oracleCardsWrap');
  const hint    = document.getElementById('oracleHint');
  const cards   = document.getElementById('oracleCards');
  const panel   = document.getElementById('oracleRevealPanel');

  // 트리거 버튼 보이기 (opacity/transform 초기화 포함)
  if (trigger) {
    trigger.style.cssText = 'display:flex; opacity:1; transform:none;';
  }
  // 카드 래퍼 완전 숨기기
  if (wrap) {
    wrap.style.display = 'none';
    wrap.classList.remove('oracle-cards-wrap');
  }
  if (hint)  { hint.textContent = '카드를 하나 골라봐 ✦'; hint.classList.remove('hidden'); }
  if (cards) { cards.innerHTML = ''; }
  if (panel) { panel.remove(); }

  // 결과 캐싱
  window._oracleResultCache = r;
  // 선택 카드 초기화
  window._selectedOracleCard = null;
}

/* 버튼 클릭 시 호출: 카드 3장 펼치기 */
function openOracleCards() {
  const r = window._oracleResultCache;
  if (!r) return;

  // 1. 트리거 버튼 숨기기
  const trigger = document.getElementById('oracleTrigger');
  if (trigger) trigger.style.display = 'none';

  // 2. 카드 래퍼 보이기
  const wrap = document.getElementById('oracleCardsWrap');
  if (wrap) {
    wrap.style.display = 'block';
    wrap.classList.add('oracle-cards-wrap');
  }

  // 3. 카드 렌더링 (rAF로 paint 후 실행)
  requestAnimationFrame(() => {
    renderOracleCards(r);
  });
}

function renderOracleCards(r) {
  const pool = ORACLE_CARD_DATA[r.cat] || ORACLE_CARD_DATA.default;
  if (!pool || pool.length === 0) { console.warn('[Oracle] pool 없음:', r.cat); return; }
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
  const container = document.getElementById('oracleCards');
  if (!container) { console.warn('[Oracle] #oracleCards 없음'); return; }

  // 카드 + 이름 묶음으로 렌더링
  container.innerHTML = shuffled.map((card, i) => {
    const svgMarkup = TAROT_SVG[card.svgKey] || TAROT_SVG['THE_FLOW'];
    return `
      <div class="oracle-card-wrap" data-index="${i}">
        <div class="oracle-card" onclick="selectOracleCard(this)"
             data-msg="${escapeAttr(card.msg)}"
             data-sub="${escapeAttr(card.sub)}"
             data-name="${escapeAttr(card.name)}">
          <div class="card-inner">
            <!-- 앞면: SVG 타로 일러스트 -->
            <div class="card-face card-front">
              <div class="card-svg-wrap">${svgMarkup}</div>
              <div class="card-front-tap">tap to reveal</div>
            </div>
            <!-- 뒷면: 선택 후 이미지 + 작은 텍스트 -->
            <div class="card-face card-back-img">
              <div class="card-svg-wrap selected-svg">${svgMarkup}</div>
            </div>
          </div>
        </div>
        <!-- 카드 이름 (항상 표시) -->
        <div class="card-name-tag">${card.name}</div>
      </div>`;
  }).join('');

  // 해석 패널 (초기 숨김)
  const existingPanel = document.getElementById('oracleRevealPanel');
  if (existingPanel) existingPanel.remove();

  const panel = document.createElement('div');
  panel.id = 'oracleRevealPanel';
  panel.className = 'oracle-reveal-panel';
  panel.style.display = 'none';
  container.after(panel);

  // hint 초기화
  const hint = document.getElementById('oracleHint');
  if (hint) { hint.textContent = '카드를 하나 골라봐 ✦'; hint.classList.remove('hidden'); }
}

function escapeAttr(str) {
  return (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function selectOracleCard(el) {
  const wrap = el.closest('.oracle-card-wrap');
  const container = document.getElementById('oracleCards');

  // 이미 선택된 카드가 있으면 무시
  if (container.querySelector('.oracle-card.selected')) return;
  if (el.classList.contains('dismissed')) return;

  // 카드 플립 + 선택 마킹
  el.classList.add('flipped', 'selected');
  wrap.classList.add('selected-wrap');

  // 나머지 카드 dismissed
  container.querySelectorAll('.oracle-card').forEach(card => {
    if (card !== el) card.classList.add('dismissed');
  });
  container.querySelectorAll('.oracle-card-wrap').forEach(w => {
    if (w !== wrap) w.classList.add('dismissed-wrap');
  });

  // 힌트 숨기기
  const hint = document.getElementById('oracleHint');
  if (hint) hint.classList.add('hidden');

  // 해석 패널 표시 (카드 아래에)
  const msg  = el.dataset.msg;
  const sub  = el.dataset.sub;
  const name = el.dataset.name;

  // 선택된 카드 정보를 저장 (기록 저장에 활용)
  const svgWrap = el.querySelector('.card-svg-wrap');
  window._selectedOracleCard = {
    name,
    msg,
    sub,
    svgHtml: svgWrap ? svgWrap.innerHTML : ''
  };

  const panel = document.getElementById('oracleRevealPanel');
  if (panel) {
    panel.innerHTML = `
      <div class="reveal-inner">
        <div class="reveal-name">${name}</div>
        <div class="reveal-divider"></div>
        <p class="reveal-msg">${msg}</p>
        <p class="reveal-sub">${sub}</p>
        <div class="reveal-boost-hint">
          <div class="reveal-boost-icon">✦</div>
          <p class="reveal-boost-text">이 카드를 <strong>잘 보이는 곳</strong>에 두면<br>오늘의 가능성이 더 높아질 거야 🌙</p>
          <p class="reveal-boost-sub">끌어당김의 법칙 — 자꾸 눈에 보이는 것이 현실이 돼</p>
        </div>
      </div>`;
    panel.style.display = 'block';
    // 애니메이션
    requestAnimationFrame(() => panel.classList.add('visible'));
    // 스크롤
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 200);
  }
}

// ==================== CHAT ENGINE ====================
const CHAT_CONTEXT = {
  result: null,
  history: []
};

// ==================== LLM CONFIG ====================
// Vercel Function 엔드포인트 (배포 후 자동으로 같은 도메인 사용)
// 로컬 개발 시에는 기존 로컬 엔진으로 fallback
const LLM_ENDPOINT = '/api/chat';
const LLM_ENABLED  = true;  // false 로 바꾸면 로컬 엔진만 사용

/**
 * 카테고리 키 → LLM 시스템 프롬프트용 그룹 매핑
 */
function _catToLlmGroup(cat) {
  const LOVE_CATS   = ['love','marriage','divorce','family','friend','relation'];
  const MONEY_CATS  = ['money','invest','realestate','debt','startup','legal'];
  const WORK_CATS   = ['career','study','success','future'];
  const HEALTH_CATS = ['health','mind','trauma'];
  if (LOVE_CATS.includes(cat))   return 'love';
  if (MONEY_CATS.includes(cat))  return 'money';
  if (WORK_CATS.includes(cat))   return 'work';
  if (HEALTH_CATS.includes(cat)) return 'health';
  return 'general';
}

/**
 * 대화 히스토리를 OpenAI messages 배열 형식으로 변환
 * CHAT_CONTEXT.history: [{ role:'user'|'signal', text:'...' }]
 */
function _historyToMessages(history) {
  return history.map(h => ({
    role: h.role === 'signal' ? 'assistant' : 'user',
    content: h.text
  }));
}

/**
 * Vercel Function(LLM)에 메시지 전송 — Promise 반환
 * 실패 시 null 반환 → 호출부에서 로컬 엔진으로 fallback
 */
async function _callLlmApi(userText, r, history) {
  try {
    const cat       = r?.cat || 'general';
    const llmGroup  = _catToLlmGroup(cat);
    const messages  = _historyToMessages(history);

    // 카드 리딩 컨텍스트 구성
    let cardReading = null;
    if (r) {
      const parts = [];
      if (r.question)     parts.push(`질문: ${r.question}`);
      if (r.accept != null) parts.push(`수락 가능성: ${r.accept}%`);
      if (r.risk   != null) parts.push(`리스크 지수: ${r.risk}%`);
      if (r.summaryText)  parts.push(`요약: ${r.summaryText}`);
      if (r.flow)         parts.push(`흐름 리딩: ${r.flow}`);
      if (parts.length)   cardReading = parts.join('\n');
    }

    const res = await fetch(LLM_ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message:     userText,
        history:     messages,
        category:    llmGroup,
        cardReading: cardReading
      })
    });

    if (!res.ok) {
      console.warn('[Signal LLM] API 오류:', res.status);
      return null;
    }

    const data = await res.json();
    return data.reply || null;
  } catch (err) {
    console.warn('[Signal LLM] 네트워크 오류, 로컬 엔진으로 fallback:', err.message);
    return null;
  }
}

function resetChat(r) {
  CHAT_CONTEXT.result = r;
  CHAT_CONTEXT.history = [];

  const container = document.getElementById('chatMessages');
  const name = document.getElementById('inputName').value.trim();
  const greeting = name
    ? `${name}, 분석 결과를 보고 더 궁금한 게 있으면 말해줘. 뭐든 같이 볼게.`
    : '분석 결과를 보고 더 궁금한 게 있으면 말해줘. 뭐든 같이 볼게.';

  container.innerHTML = `
    <div class="chat-msg signal-msg">
      <div class="msg-bubble">${greeting}</div>
    </div>`;
  document.getElementById('chatInput').value = '';
  const sendBtn = document.querySelector('.chat-send-btn');
  if (sendBtn) sendBtn.disabled = false;

  // 채팅 제목 원래대로 복원
  const chatTitle = document.querySelector('#chatSection .chat-title');
  if (chatTitle) chatTitle.textContent = 'Signal에게 더 물어봐';
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChat();
  }
}

async function sendChat() {
  const input = document.getElementById('chatInput');
  const text  = input.value.trim();
  if (!text) return;

  input.value = '';

  // 입력창 일시 비활성화 (중복 전송 방지)
  input.disabled = true;
  const sendBtn = document.querySelector('.chat-send-btn');
  if (sendBtn) sendBtn.disabled = true;

  // "이어가기" 안내 메시지 제거
  const continueNotice = document.querySelector('.chat-continue-notice');
  if (continueNotice) continueNotice.remove();

  appendChatMsg('user', text);
  CHAT_CONTEXT.history.push({ role: 'user', text });

  // typing indicator 표시
  const typingId = showTyping();

  let reply = null;

  // ── LLM API 호출 (활성화된 경우) ──
  if (LLM_ENABLED) {
    reply = await _callLlmApi(text, CHAT_CONTEXT.result, CHAT_CONTEXT.history);
  }

  // ── LLM 실패 시 로컬 엔진 fallback ──
  if (!reply) {
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    reply = generateChatReply(text, CHAT_CONTEXT.result, CHAT_CONTEXT.history);
  }

  removeTyping(typingId);
  appendChatMsg('signal', reply);
  CHAT_CONTEXT.history.push({ role: 'signal', text: reply });

  // 입력창 재활성화
  input.disabled = false;
  if (sendBtn) sendBtn.disabled = false;
  input.focus();

  // 기록에서 열었다면 chatHistory 실시간 동기화
  if (state._viewingHistoryId) {
    const histItem = state.history.find(h => h.id === state._viewingHistoryId);
    if (histItem) {
      histItem.chatHistory = [...CHAT_CONTEXT.history];
      saveHistory();
    }
  }
}

function appendChatMsg(role, text) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role === 'signal' ? 'signal-msg' : 'user-msg'}`;
  div.innerHTML = `<div class="msg-bubble">${escapeHtml(text).replace(/\n/g, '<br>')}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById('chatMessages');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'chat-msg signal-msg';
  div.id = id;
  div.innerHTML = `
    <div class="typing-bubble">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/* ── 가능성 수치 심층 설명 ── */
function _getAcceptExplanation(accept, risk, cat, namePrefix, r) {
  const catLabel = (CATEGORIES[cat] || {}).label || '이 상황';

  // ── 수치 근거 설명 (학습 + 운의 흐름)
  const basisLine = `이 수치는 두 가지를 합산한 결과야. 하나는 생년월일, 성별, 고민 내용, 카테고리 등과 사람들의 통계, 검색 정보를 학습해서 나온 값이고, 다른 하나는 지금 이 순간 너의 운의 흐름을 읽은 값이야. 두 신호를 합쳐서 나온 가능성이 ${accept}%야.`;

  // 수치 구간별 해석
  let coreLine = '';
  if (accept >= 70) {
    coreLine = `가능성 ${accept}%는 꽤 높은 편이야. 지금 흐름이 분명히 열려 있다는 신호야.`;
  } else if (accept >= 55) {
    coreLine = `가능성 ${accept}%야. 열려 있는 흐름이야. 완전히 닫혀 있진 않아.`;
  } else if (accept >= 40) {
    coreLine = `가능성 ${accept}%야. 중간 아래 수준이야. 타이밍과 방식이 결과를 가르는 상태야.`;
  } else {
    coreLine = `가능성 ${accept}%야. 지금 흐름이 조금 이른 감이 있어. 준비가 더 필요한 시점이야.`;
  }

  // 카테고리별 운의 흐름 해석
  const catContextMap = {
    love:       `연애 흐름에서 지금 너의 에너지는 ${accept >= 55 ? '상대에게 닿을 수 있는 상태야' : '아직 준비가 무르익는 중이야'}. 감정적으로 열려 있는 타이밍일수록 수치가 올라가.`,
    friend:     `친구 관계에서 지금 운의 흐름은 ${accept >= 55 ? '먼저 닿아도 자연스러운 타이밍이야' : '조금 더 기다리는 게 맞는 흐름이야'}. 관계의 온도가 수치에 반영됐어.`,
    invest:     `투자 흐름에서 ${accept}%는 지금 시장과 너의 판단 사이의 에너지 합산이야. 운의 흐름이 좋을 때일수록 수치가 올라가지만, 리스크는 항상 별도로 봐야 해.`,
    legal:      `법률 고민에서 ${accept}%는 지금 이 상황이 긍정적으로 풀릴 수 있는 흐름의 세기야. 운의 흐름이 준비와 만날 때 수치가 높아져.`,
    debt:       `채무 상황에서 ${accept}%는 지금 이 흐름에서 출구를 찾을 수 있는 에너지 수준이야. 낮더라도 방법이 없다는 뜻이 아니야.`,
    startup:    `창업 흐름에서 ${accept}%는 지금 네 아이디어와 실행 에너지가 시장과 맞닿는 정도야. 운의 흐름이 실행력을 만나면 수치가 올라가.`,
    realestate: `부동산에서 ${accept}%는 지금 이 결정이 좋은 방향으로 흘러갈 에너지 수준이야. 타이밍과 준비 상태가 운의 흐름과 맞아야 높아져.`,
    trauma:     `지금 너의 운의 흐름에서 ${accept}%는 회복으로 나아갈 수 있는 에너지가 ${accept >= 50 ? '충분히 있다' : '천천히 쌓이는 중이다'}는 신호야.`,
    divorce:    `이 흐름에서 ${accept}%는 지금 결정이 긍정적인 방향으로 흘러갈 수 있는 에너지야. 감정보다 준비가 운의 흐름을 더 높여줘.`,
    mind:       `마음·감정 흐름에서 ${accept}%는 지금 네 내면의 에너지 상태야. 감정이 안정될수록, 도움을 받을수록 수치가 올라가는 구조야.`,
  };
  const catContext = catContextMap[cat] ||
    `${catLabel} 고민에서 지금 너의 운의 흐름은 ${accept >= 55 ? '움직임을 지지하는 방향이야' : '조금 더 준비가 필요한 상태야'}.`;

  // 리스크와의 관계 코멘트
  let comboHint = '';
  if (accept >= 60 && risk <= 35) {
    comboHint = `리스크도 ${risk}%로 낮아. 가능성과 리스크 모두 지금 움직이기 좋은 상태야.`;
  } else if (accept >= 55 && risk >= 50) {
    comboHint = `리스크가 ${risk}%로 높아. 가능성은 열려 있지만 방식을 신중하게 가야 해.`;
  } else if (accept < 45 && risk >= 50) {
    comboHint = `리스크도 ${risk}%야. 가능성과 리스크 모두 지금은 서두르기보단 흐름이 더 무르익기를 기다려.`;
  } else {
    comboHint = `가능성 ${accept}%와 리스크 ${risk}%를 같이 보면, 지금 흐름에서 어떻게 움직이느냐가 핵심이야.`;
  }

  return `${namePrefix}${basisLine}\n\n${coreLine} ${catContext}\n\n${comboHint}`;
}

/* ── 리스크 수치 심층 설명 ── */
function _getRiskExplanation(accept, risk, cat, namePrefix, r) {
  const catLabel = (CATEGORIES[cat] || {}).label || '이 상황';

  // 수치 구간별 핵심 문장
  let coreLine = '';
  if (risk <= 20) {
    coreLine = `리스크가 ${risk}%야. 아주 낮은 편이야. 지금 움직여도 크게 어긋날 가능성은 낮아.`;
  } else if (risk <= 40) {
    coreLine = `리스크 ${risk}%야. 적당한 수준이야. 과하지 않게 접근하면 충분히 감당할 수 있어.`;
  } else if (risk <= 60) {
    coreLine = `리스크가 ${risk}%야. 무시할 수준은 아니야. 방식과 타이밍을 조심해야 해.`;
  } else {
    coreLine = `리스크가 ${risk}%야. 꽤 높아. 지금 섣불리 움직이면 역효과가 날 수 있어.`;
  }

  // 리스크 요인 설명 (카테고리별)
  const riskContextMap = {
    love:       `연애에서 리스크는 주로 상대방의 방어심, 타이밍 부적합, 감정 표현 강도에서 나와. 지금 고민에서 이런 요소가 감지됐어.`,
    friend:     `친구 사이에서 리스크는 상대가 부담을 느끼거나 어색함이 커지는 상황이야. 너무 강하게 접근하면 오히려 거리가 더 멀어질 수 있어.`,
    invest:     `투자 리스크는 시장 변동성과 감정적 판단에서 나와. ${risk}%는 지금 결정에서 예상치 못한 손실이 생길 가능성이야.`,
    legal:      `법적 리스크는 증거 부족, 시효, 잘못된 대응에서 커져. ${risk}%는 지금 상태에서 불리하게 흘러갈 수 있는 변수를 뜻해.`,
    startup:    `창업 리스크는 자금 고갈, 팀 갈등, 시장 검증 실패에서 나와. ${risk}%는 지금 이 조건에서 예상되는 불확실성이야.`,
    realestate: `부동산 리스크는 대출 부담, 시장 하락, 계약 관련 분쟁에서 발생해. ${risk}%는 지금 이 결정에서 마주칠 수 있는 위험 수준이야.`,
    debt:       `채무 리스크는 상환 불능, 신용 손상, 법적 문제로 이어질 수 있어. ${risk}%는 지금 상황이 더 악화될 가능성이야.`,
    divorce:    `이혼 과정의 리스크는 법적 불리함, 자녀 문제, 재산 분쟁에서 나와. ${risk}%는 지금 결정이 이런 문제로 이어질 가능성이야.`,
    trauma:     `트라우마 리스크는 혼자 감당하다가 상태가 악화되는 것이야. ${risk}%는 지금 도움을 받지 않을 경우 더 힘들어질 가능성이야.`,
  };
  const riskContext = riskContextMap[cat] ||
    `${catLabel}에서 리스크는 지금 행동했을 때 역효과나 부작용이 생길 가능성이야.`;

  // 가능성과 리스크 관계 코멘트
  let comboHint = '';
  if (accept >= 60 && risk <= 30) {
    comboHint = `가능성은 ${accept}%로 좋고, 리스크도 낮아. 지금이 움직이기 좋은 타이밍이야.`;
  } else if (accept >= 50 && risk >= 50) {
    comboHint = `가능성 ${accept}%에 리스크도 높아. 열려 있지만 조심해서 가야 해.`;
  } else if (accept < 45) {
    comboHint = `가능성도 ${accept}%로 높지 않아. 지금은 서두르지 않는 게 맞아.`;
  } else {
    comboHint = `가능성 ${accept}%랑 같이 보면, 지금 흐름에서 어느 정도 감수할 수 있는 수준이야.`;
  }

  return `${namePrefix}${coreLine}\n\n${riskContext}\n\n${comboHint}`;
}

/* ── 가능성 + 리스크 조합 해석 ── */
function _getCombinedSignalComment(accept, risk, cat, namePrefix) {
  const catLabel = (CATEGORIES[cat] || {}).label || '이 상황';
  const basisLine = `두 수치 모두 생년월일, 성별, 고민 내용, 카테고리 등과 사람들의 통계, 검색 정보를 학습한 결과와, 지금 이 순간 너의 운의 흐름을 읽은 값을 합산한 거야.`;

  // 4분면 해석
  if (accept >= 60 && risk <= 35) {
    return `${namePrefix}가능성 ${accept}%, 리스크 ${risk}% — 가장 좋은 조합이야.\n\n${basisLine}\n\n학습 결과와 운의 흐름 모두 지금 움직임을 지지하고 있어. 너무 오래 기다리면 오히려 타이밍을 놓칠 수 있어.`;
  }
  if (accept >= 60 && risk > 35) {
    return `${namePrefix}가능성은 ${accept}%로 좋은데, 리스크가 ${risk}%야.\n\n${basisLine}\n\n운의 흐름은 열려 있어. 근데 지금 네 상황에서 접근 방식을 잘못 잡으면 역효과가 날 수 있어. "어떻게 하느냐"가 핵심이야.`;
  }
  if (accept < 50 && risk <= 30) {
    return `${namePrefix}가능성은 ${accept}%로 높진 않지만, 리스크는 ${risk}%로 낮아.\n\n${basisLine}\n\n운의 흐름이 아직 완전히 열리진 않았지만, 크게 잃을 것도 없어. 가볍게 시도해보는 건 나쁘지 않아.`;
  }
  if (accept < 50 && risk > 50) {
    return `${namePrefix}가능성 ${accept}%, 리스크 ${risk}% — 지금은 조심해야 해.\n\n${basisLine}\n\n학습 결과와 운의 흐름 모두 "지금 당장"보다 준비가 더 필요하다는 신호야. 흐름이 더 무르익기를 기다려봐.`;
  }

  return `${namePrefix}가능성 ${accept}%, 리스크 ${risk}%야.\n\n${basisLine}\n\n지금 ${catLabel} 흐름은 ${accept >= 50 ? '절반 이상 열려 있고' : '아직 완전히 열리진 않았고'}, 리스크는 ${risk <= 40 ? '감당할 수 있는 수준이야' : '무시하기 어려운 수준이야'}. 방식을 신중하게 잡으면 충분히 가볼 수 있어.`;
}

// ==================== 점쟁이 페르소나 ====================
const EXPERT_PERSONA = {
  love:       { name: '월하 보살',    title: '연애·인연 신점',     years: 32 },
  marriage:   { name: '혜원 보살',    title: '혼인·궁합 신점',     years: 35 },
  divorce:    { name: '자인 보살',    title: '이별·분리 신점',     years: 30 },
  family:     { name: '혜경 보살',    title: '가족·혈연 신점',     years: 33 },
  friend:     { name: '소담 보살',    title: '인연·관계 신점',     years: 31 },
  relation:   { name: '소담 보살',    title: '인연·관계 신점',     years: 31 },
  career:     { name: '정도 도사',    title: '직업·운로 신점',     years: 30 },
  startup:    { name: '천기 도사',    title: '사업·재물 신점',     years: 32 },
  invest:     { name: '재운 도사',    title: '재물·투자 신점',     years: 35 },
  money:      { name: '재운 도사',    title: '돈·재물 신점',       years: 33 },
  realestate: { name: '지운 도사',    title: '터·부동산 신점',     years: 30 },
  legal:      { name: '명경 보살',    title: '송사·분쟁 신점',     years: 34 },
  debt:       { name: '명경 보살',    title: '채무·빚 신점',       years: 30 },
  health:     { name: '청아 보살',    title: '몸·건강 신점',       years: 31 },
  mind:       { name: '청아 보살',    title: '마음·감정 신점',     years: 36 },
  trauma:     { name: '혜심 보살',    title: '상처·치유 신점',     years: 32 },
  study:      { name: '문창 도사',    title: '학업·시험 신점',     years: 30 },
  success:    { name: '문창 도사',    title: '성취·목표 신점',     years: 33 },
  future:     { name: '천기 도사',    title: '미래·방향 신점',     years: 31 },
  default:    { name: 'Signal 보살', title: '종합 신점',           years: 30 },
};

function _expertWrap(cat, body) {
  const p = EXPERT_PERSONA[cat] || EXPERT_PERSONA.default;
  return `🔮 ${p.name} · ${p.title} ${p.years}년\n\n너의 운의 시그널을 보면,\n\n${body}`;
}

// ==================== CHAT REPLY ENGINE v4 (문장 의미 기반 대화 엔진) ====================

// ── 문장 의미 파서: 유저가 무엇을 원하는지 도출 ──
// 키워드 단위가 아닌 문장 전체 구조(want + topic)로 판단
function _parseUserIntent(raw) {
  const q = raw.toLowerCase().trim();

  // ── WANT: 무엇을 원하는가 ──
  const wantToKnowHow  = /뭐라고|어떻게 말|말하는 법|어떻게 얘기|뭐라 해야|말해야 할까|말해야 해|말해야 하나|어떻게 하면|어떻게 해야|어떻게 해$|어떻게 할까|방법이 뭐|어떻게 하나|어떻게 접근|어떻게 꺼내/.test(q);
  const wantPermission = /해도 될까|해도 돼|해도 되나|해도 괜찮|괜찮을까|해야 할까|할까요|해야 하나|해도 괜찮을까/.test(q);
  const wantDecision   = /할지 말지|해야 할지|할지 모르겠|어떡해야|결정을 못|선택을 못|어떻게 해야 할지|결정해줘|정해줘/.test(q);
  const wantAdvice     = /알려줘|추천해|조언해|어떡해|도움줘|같이 봐줘|봐줘|조언 좀|알고 싶어|궁금해/.test(q);
  const wantReason     = /왜|이유가|어떻게 나온|기준이|근거가|왜 이렇게|어떻게 된 거야|왜 그래/.test(q);
  const wantNumbers    = /가능성|리스크|확률|퍼센트|몇\s*%/.test(q);

  const isEmotional    = /힘들어|속상해|불안해|무서워|외로워|지쳐|괴로워|답답해|우울해|모르겠어|막막해/.test(q);
  const isGratitude    = /고마워|감사해|도움됐|좋았어|잘됐어|고마웠어|최고야/.test(q);
  const isYes          = /^(네|예|응|어|맞아|그래|그렇지|맞아요|ㅇㅇ|ㄴ네|맞죠|그렇죠)$/.test(q);
  const isNo           = /^(아니|아니요|아닌데|ㄴㄴ|아님|틀려|아니에요|달라)$/.test(q);
  const isCard         = /시그널 카드|카드 뽑/.test(q);

  // ── TOPIC: 무엇에 대해 말하는가 ──
  const aboutMoney     = /돈|자금|금액|비용|수익|매출|투자금|현금/.test(q);
  const aboutBorrow    = /빌리|빌려|빌릴|대출|꿔|꾸다|빌리고 싶/.test(q);
  const aboutFriend    = /친구|지인|동생|형|오빠|누나|언니|사람한테|아는 사람/.test(q);
  const aboutLove      = /좋아해|고백|이별|헤어지|사귀|연애|썸|감정이/.test(q);
  const aboutContact   = /연락|문자|카톡|전화|먼저 연락|연락할까|연락해야|연락해도/.test(q);
  const aboutApology   = /사과|미안|잘못|화해|사과해야/.test(q);
  const aboutReject    = /거절|싫다|못하겠|안 된다|거절해야|싫어/.test(q);
  const aboutItem      = /아이템|제품|서비스|뭘 팔|무슨 사업|사업 아이템|창업 아이템/.test(q);
  const aboutJob       = /이직|퇴사|회사|직장|취업|면접|커리어|일 그만/.test(q);
  const aboutInvest    = /투자|주식|코인|etf|부동산|자산|종목/.test(q);
  const aboutDebt      = /빚|채무|갚아야|상환|이자/.test(q);
  const aboutNumbers   = /가능성.*리스크|리스크.*가능성|두\s*수치|둘 다/.test(q) && wantNumbers;

  return {
    q, raw,
    wantToKnowHow, wantPermission, wantDecision, wantAdvice, wantReason, wantNumbers,
    isEmotional, isGratitude, isYes, isNo, isCard,
    aboutMoney, aboutBorrow, aboutFriend, aboutLove, aboutContact,
    aboutApology, aboutReject, aboutItem, aboutJob, aboutInvest, aboutDebt, aboutNumbers,
  };
}

// ── 대화 히스토리 요약 (마지막 N턴) ──
function _summarizeHistory(history, turns) {
  const msgs = (history || []).filter(h => h.role === 'user' || h.role === 'signal');
  return msgs.slice(-turns * 2);
}

// ── Signal이 마지막으로 한 말에서 질문 추출 ──
function _getLastSignalQuestion(history) {
  const signals = (history || []).filter(h => h.role === 'signal');
  const last = signals[signals.length - 1]?.text || '';
  const sentences = last.split(/[.\n]/).map(s => s.trim()).filter(Boolean);
  const lastSentence = sentences[sentences.length - 1] || '';
  return { full: last, lastSentence, isQuestion: /\?|어때요|말해봐|얘기해봐|뭐예요|뭐야|어디야|어떤|얼마/.test(last) };
}

// ── 이전 대화에서 언급된 주제 추출 ──
function _extractTopics(history) {
  const allText = (history || []).map(h => h.text || '').join(' ').toLowerCase();
  return {
    mentionedMoney: /돈|자금|투자|자본|비용|수익/.test(allText),
    mentionedTeam: /팀|파트너|공동|직원|사람/.test(allText),
    mentionedTiming: /타이밍|시기|언제|지금|나중/.test(allText),
    mentionedFear: /무서|두려|걱정|불안|망설/.test(allText),
    mentionedProduct: /제품|서비스|아이템|아이디어|상품/.test(allText),
    mentionedEx: /전 남자친구|전 여자친구|전 남친|전 여친|전 연인|헤어진/.test(allText),
    mentionedContact: /연락|문자|카톡|전화/.test(allText),
    mentionedJob: /이직|퇴사|직장|회사|취업/.test(allText),
    turnCount: Math.floor(history?.filter(h => h.role === 'user').length || 0),
  };
}

// ==================== CHAT REPLY ENGINE v4 — 메인 디스패처 ====================
// 핵심 원칙: 키워드 매칭이 아닌 "무엇을 원하는가(want) + 무엇에 대해(topic)" 조합으로 응답
function generateChatReply(userText, r, history) {
  if (!r) return '아직 분석 결과가 없어. 먼저 고민을 입력해줘.';

  const intent  = _parseUserIntent(userText);
  const q       = intent.q;
  const rawText = userText.trim();
  const cat     = r.cat || 'default';
  const accept  = r.accept;
  const risk    = r.risk;
  const name    = document.getElementById('inputName')?.value?.trim() || '';
  const nn      = name ? `${name}씨` : '손님';
  const np      = name ? `${name}, ` : '';
  const catLabel = (CATEGORIES[cat] || {}).label || '이 상황';

  const lastSignal = _getLastSignalQuestion(history);
  const topics     = _extractTopics(history);
  const turnCount  = topics.turnCount;

  // ══ 0순위: 인사·감사·마무리 (대화 자체 반응) ══
  if (intent.isGratitude)
    return _expertWrap(cat, `${nn}, 얘기 나눠줘서 고마워요. 기운이 좋은 방향으로 흘러가길 바라요. 또 막히는 거 생기면 언제든 와요.`);
  if (intent.isEmotional)
    return _expertWrap(cat, _replyToEmotion(cat, q, nn, accept, risk));
  if (intent.isCard)
    return _expertWrap(cat, `시그널 카드는 지금 내면의 에너지를 뽑아내는 거예요. 머리로 고르지 말고 직감으로 — 처음 눈에 들어오는 카드가 지금 ${nn} 안에서 가장 원하는 방향이에요.`);

  // ══ 1순위: 수치(가능성·리스크) 직접 질문 ══
  if (intent.aboutNumbers)
    return _expertWrap(cat, _getCombinedSignalComment(accept, risk, cat, np));
  if (/가능성|확률|퍼센트|몇\s*%|왜\s*이렇게|어떻게\s*나온/.test(q) && !/리스크|위험/.test(q))
    return _expertWrap(cat, _getAcceptExplanation(accept, risk, cat, np, r));
  if (/리스크|위험|역효과|망하|부작용/.test(q) && !/가능성|확률/.test(q))
    return _expertWrap(cat, _getRiskExplanation(accept, risk, cat, np, r));

  // ══ 2순위: want × topic 조합 기반 직접 답변 ══
  const intentReply = _v4IntentReply(intent, cat, accept, risk, nn, np, history, topics, r);
  if (intentReply) return _expertWrap(cat, intentReply);

  // ══ 3순위: 짧은 예/아니오 → 이전 Signal 질문 맥락으로 이어가기 ══
  if ((intent.isYes || intent.isNo) && lastSignal.isQuestion && turnCount > 0) {
    const contextReply = _replyInContext(cat, q, rawText, accept, risk, nn, np, lastSignal, topics, r);
    if (contextReply) return _expertWrap(cat, contextReply);
  }

  // ══ 4순위: 이전 Signal 질문이 있고 유저가 답했을 때 (맥락 이어가기) ══
  if (lastSignal.isQuestion && turnCount > 0) {
    const contextReply = _replyInContext(cat, q, rawText, accept, risk, nn, np, lastSignal, topics, r);
    if (contextReply) return _expertWrap(cat, contextReply);
  }

  // ══ 5순위: 카테고리 전문 키워드 답변 ══
  const catReply = _getCatExpertReply(cat, q, accept, risk, np, r, catLabel);
  if (catReply) return _expertWrap(cat, catReply);

  // ══ 6순위: 자유형 대화 (첫 대화·미분류) ══
  return _expertWrap(cat, _freeformReply(cat, q, rawText, accept, risk, nn, np, r, topics, turnCount, lastSignal));
}

// ==================== v4 핵심: want × topic 조합 답변 ====================
// 유저 문장을 want(무엇을 원하는가) + topic(무엇에 대해) 두 차원으로 읽어
// 맥락에 맞는 답변 생성. 키워드 단어 하나가 아닌 조합으로 판단.
function _v4IntentReply(intent, cat, accept, risk, nn, np, history, topics, r) {
  const {
    q,
    wantToKnowHow, wantPermission, wantDecision, wantAdvice, wantReason,
    aboutMoney, aboutBorrow, aboutFriend, aboutLove, aboutContact,
    aboutApology, aboutReject, aboutItem, aboutJob, aboutInvest, aboutDebt,
  } = intent;

  // ══════════════════════════════════════════════════════════
  // [1] wantToKnowHow — "어떻게 말해야 해?", "뭐라고 해야 해?"
  //    → 상황별 구체적 스크립트·방법 제공
  // ══════════════════════════════════════════════════════════
  if (wantToKnowHow) {

    // 친구한테 돈 빌리는 말 (최우선: want×topic 조합의 핵심 케이스)
    if (aboutBorrow && aboutFriend)
      return `${nn}, 친구한테 돈 얘기 꺼내는 거 진짜 쉽지 않죠.\n\n이렇게 해봐요:\n"나 지금 잠깐 급한 게 생겼어. 부탁해도 될까? 부담되면 솔직하게 말해줘도 돼."\n\n핵심은 — 금액 먼저 말하면 상대가 부담 느껴요. 먼저 의사를 물어보고, 상대가 괜찮다고 하면 그때 금액이랑 언제 갚을지 명확하게. 이게 관계 안 망가지는 방법이에요.\n\n얼마 정도 필요해요?`;

    // 돈 빌리는 말 (상대 불명확)
    if (aboutBorrow || (aboutMoney && /빌리|꿔|달라/.test(q)))
      return `${nn}, 돈 얘기 꺼낼 때 제일 중요한 건 솔직함이에요.\n\n"나 지금 잠깐 급한 게 생겼어. 솔직히 부탁해도 될까?" — 이렇게 먼저 의사를 물어봐요.\n\n금액부터 말하면 상대가 부담 느껴요. 먼저 가능한지 물어보고, 괜찮다고 하면 — 금액이랑 언제 갚을지 명확하게. 관계 안 망가지는 방법이에요.\n\n누구한테 빌리려는 거예요?`;

    // 사과·화해하는 말
    if (aboutApology)
      return `${nn}, 사과할 때 제일 중요한 건 — 변명 없이 딱 이것만 해요.\n\n"내가 그때 그랬던 거 미안해. 그게 잘못이었어."\n\n이유 설명하려 하거나 상대 탓을 조금이라도 섞으면 사과가 아니에요. 짧고 명확하게, 내 잘못만. 그게 제일 강하게 전달돼요.`;

    // 거절하는 말
    if (aboutReject)
      return `${nn}, 거절할 때 가장 좋은 방법은 — 미안함을 너무 많이 담지 않는 거예요.\n\n"나는 지금 그게 어려워. 미안해." — 이걸로 충분해요.\n\n길게 설명하면 협상 여지를 주는 거거든. 짧고 따뜻하게, 그게 서로한테 제일 나아요.`;

    // 고백하는 말
    if (aboutLove && /고백|좋아해|마음|사랑/.test(q))
      return `${nn}, 고백은 길게 하면 할수록 오히려 부담이에요.\n\n"너 나 좋아해. 사귀고 싶어." — 이게 전부야.\n\n당황할 수도 있어요. 그래도 괜찮아요. 당황하는 건 관심 없다는 게 아니거든. "바로 답 안 해도 돼, 생각해봐" 이 한마디 추가하면 돼요.`;

    // 헤어지는 말
    if (/헤어지|이별|끝내|그만하자/.test(q))
      return `${nn}, 헤어지는 말은 문자로 하면 안 돼요. 직접 만나서 해야 해요.\n\n"나 더 이상 이 관계를 이어가기 어려울 것 같아. 헤어지자."\n\n이유 길게 설명하려 하면 협상이 돼버려요. 결심이 섰다면 말은 짧고 단호하게, 상대 감정은 충분히 받아줘요.`;

    // 연락하는 말
    if (aboutContact)
      return `${nn}, 연락할 때 길게 쓰면 오히려 역효과야.\n\n"요즘 어때?" — 이 한 마디가 제일 강해요. 부담 없이 상대가 답할 수 있거든.\n\n결론 담으려 하지 말고, 딱 이 온도로 먼저 닿아봐요. 기운이 ${accept}%면 ${accept >= 55 ? '지금 닿아도 돼요.' : '조금 더 기다렸다 가는 게 나아요.'}`;

    // 이직·퇴사 얘기 꺼내는 법
    if (aboutJob)
      return `${nn}, 이직이나 퇴사 얘기 꺼낼 때 — 감정으로 하면 안 돼요.\n\n"저 더 성장하고 싶어서 새로운 기회를 찾아보려고 합니다." — 이런 식으로 이유를 긍정적으로 말해요.\n\n절대 하면 안 되는 말은 "여기 더 있기 싫어서요." — 퇴사 후 레퍼런스 체크 때 불이익 받을 수 있거든요.`;

    // 아이템 추천 (창업)
    if (aboutItem)
      return `${nn}, 아이템은 내가 골라주는 게 아니에요. 고객이 골라주는 거야.\n\n이 세 가지 먼저 봐봐요:\n하나, 내가 제일 잘 아는 분야가 뭐야?\n둘, 주변 사람들이 나한테 제일 많이 물어보는 게 뭐야?\n셋, 시장에서 불편한데 아무도 안 해결해준 게 뭐야?\n\n이 세 가지 겹치는 지점이 아이템이에요. 지금 떠오르는 게 있어요?`;

    // 그 외 → 상황 더 물어보기
    return `${nn}, 어떤 말을 해야 하는 거예요? 상황을 좀 더 말해줘봐요. 뭐라고 해야 할지 같이 찾아볼게요.`;
  }

  // ══════════════════════════════════════════════════════════
  // [2] wantPermission — "해도 될까?", "연락해도 돼?", "빌려줘도 돼?"
  //    → 기운 수치 기반 허가·조언
  // ══════════════════════════════════════════════════════════
  if (wantPermission) {

    if (aboutContact || aboutLove) {
      if (accept >= 60) return `${nn}, 기운이 ${accept}%면 연락해도 돼요. 근데 무겁게 가지 말고 — 부담 없는 말 한마디로 가볍게 닿아봐요. "요즘 어때?" 이 정도면 충분해요.`;
      if (accept >= 45) return `${nn}, 연락할 수 있는 기운이긴 한데 — 결론 내려는 내용은 안 돼요. 가벼운 안부 정도로만, 상대가 편하게 답할 수 있는 걸로 해봐요.`;
      return `${nn}, 솔직히 말할게요. 지금은 연락 안 하는 게 나아요. 기운이 ${accept}%야. 먼저 닿으면 역효과가 날 수 있어. 조금만 더 기다려봐요.`;
    }

    if (aboutBorrow || /빌려줘도|빌려줄까|빌려달래/.test(q))
      return `${nn}, 돈 빌려줄 때 원칙 하나만 기억해요.\n\n"못 받아도 괜찮은 금액"만 빌려줘요. 돌려받을 거라고 생각하고 빌려주면 관계가 망가져요.\n\n그 사람이랑 관계가 얼마나 소중해요?`;

    if (aboutInvest) {
      if (accept >= 65 && risk <= 40) return `${nn}, 기운이 ${accept}%면 들어가도 돼요. 근데 전체 자산의 20% 이내로, 분할해서 들어가봐요. 한 번에 몰빵은 절대 안 돼요.`;
      if (accept >= 45) return `${nn}, 고려할 수 있는 기운이에요. 근데 리스크가 ${risk}%야. 잃어도 감당되는 금액만 분할 매수로 접근해봐요.`;
      return `${nn}, 지금은 좀 기다려요. 기운이 ${accept}%밖에 안 돼. 기회는 한 번이 아니에요. 조금 더 지켜봐요.`;
    }

    // 일반 허가 질문
    if (accept >= 65) return `${nn}, 기운이 ${accept}%면 해도 돼요. 지금 흐름이 열려 있어요. 너무 오래 망설이면 타이밍이 지나가거든. 지금 가볍게 시작해봐요.`;
    if (accept >= 45) return `${nn}, 할 수 있긴 한데 — 방식이 중요해요. 어떻게 하려고 했어요? 말해봐요, 같이 볼게요.`;
    return `${nn}, 지금은 조금 더 기다리는 게 맞아요. 기운이 ${accept}%야. 서두르면 오히려 일이 틀어질 수 있어. 타이밍을 좀 더 봐요.`;
  }

  // ══════════════════════════════════════════════════════════
  // [3] wantDecision — "할지 말지 모르겠어", "어떡해야 해"
  //    → 기운 기반 결정 도움 + 카테고리별 심화
  // ══════════════════════════════════════════════════════════
  if (wantDecision) {
    if (aboutJob) {
      if (accept >= 60) return `${nn}, 이직 기운이 열려 있어요. ${accept}%면 움직여도 돼. 근데 도망치는 이직인지 성장하는 이직인지 — 그거 먼저 솔직하게 봐봐요. 이직하려는 진짜 이유가 뭐예요?`;
      return `${nn}, 지금은 이직보다 현재 자리에서 뭔가 만들어내는 게 더 맞아요. 기운이 ${accept}%야. 조금 더 준비하고 움직여봐요.`;
    }
    if (aboutInvest) {
      if (accept >= 60 && risk <= 40) return `${nn}, 들어가도 되는 기운이에요. ${accept}%면 흐름이 열려 있고 리스크도 ${risk}%로 감당돼. 근데 분할 매수로, 전체의 20% 이내로 가봐요.`;
      return `${nn}, 지금은 좀 기다리는 게 맞아요. 기운이 ${accept}%야. 확실해 보일 때가 사실 제일 위험한 타이밍이거든.`;
    }
    if (aboutContact || aboutLove) {
      if (accept >= 55) return `${nn}, 기운이 ${accept}%면 연락해도 돼요. 근데 결론 담은 내용은 안 되고 — 가볍게 안부로 시작해봐요.`;
      return `${nn}, 지금은 기다리는 게 맞아요. 기운이 ${accept}%야. 조금만 더 두고 봐요.`;
    }
    if (accept >= 60 && risk <= 40)
      return `${nn}, 기운 보면 해도 돼요. ${accept}%면 흐름이 열려 있고 리스크도 ${risk}%로 감당할 수 있어. 지금 망설이는 진짜 이유가 뭐예요?`;
    if (accept >= 50)
      return `${nn}, 할 수 있는 기운이긴 한데 방식을 잘 잡아야 해요. 어떻게 하려고 생각하고 있어요?`;
    return `${nn}, 지금은 좀 더 봐야 할 것 같아요. 기운이 ${accept}%야. 급하게 결정하면 나중에 후회할 수 있어. 지금 제일 걸리는 게 뭐예요?`;
  }

  // ══════════════════════════════════════════════════════════
  // [4] wantAdvice — "추천해줘", "알려줘", "조언해줘"
  //    → 카테고리 + 토픽별 구체적 행동 조언
  // ══════════════════════════════════════════════════════════
  if (wantAdvice) {

    if (aboutItem) {
      if (cat === 'startup')
        return `${nn}, 아이템은 내가 고르는 게 아니에요. 고객이 고르는 거야.\n\n이 세 가지 먼저 봐봐요:\n하나, 내가 제일 잘 아는 분야가 뭐야?\n둘, 주변 사람들이 나한테 제일 많이 물어보는 게 뭐야?\n셋, 시장에서 불편한데 아무도 안 해결해준 게 뭐야?\n\n이 세 가지 겹치는 지점이 아이템이에요. 지금 떠오르는 게 있어요?`;
      return `${nn}, 어떤 분야 아이템이에요? 상황 좀 더 말해줘봐요. 맥락 알아야 같이 볼 수 있어요.`;
    }

    if (aboutDebt)
      return `${nn}, 빚 문제는 숨기면 커져요. 드러내야 줄어들어.\n\n지금 당장 전체 채무 목록이랑 이자율 정리해요. 이자 제일 높은 것부터 갚는 게 원칙이야.\n\n혼자 힘들면 신용회복위원회(1600-5500) 상담해봐요. 방법은 반드시 있어요.`;

    if (aboutInvest)
      return `${nn}, 투자에서 가장 중요한 원칙 세 가지.\n\n하나, 잃어도 되는 돈으로만. 전체 자산의 20% 이내.\n둘, 한 번에 몰빵 절대 금지. 분할 매수.\n셋, 들어가기 전에 손절 기준 먼저 정하기.\n\n지금 어떤 자산 생각하고 있어요?`;

    const advices = {
      startup: `${nn}, 내가 딱 보면 지금 제일 필요한 게 세 가지야.\n\n하나, 고객 한 명한테 실제로 팔아봐요. 돈 받는 순간 진짜 사업이 시작되는 거야.\n둘, 6개월 버틸 자금이 있는지 확인해요. 돈 떨어지면 판단력이 흐려지거든.\n셋, 왜 내가 해야 하는지 — 한 문장으로 말할 수 있어야 해요.\n\n지금 이 세 가지가 어떻게 돼요?`,
      love: `${nn}, 연애에서 제일 통하는 건 밀지 않는 거야.\n\n자꾸 확인하고 매달리면 상대는 숨어요. 대신 자연스럽게 좋은 에너지 보여주면서 상대가 먼저 다가오게 만드는 거야.\n\n지금 상대가 어떤 상태인지 말해봐요.`,
      invest: `${nn}, 투자에서 가장 중요한 원칙 세 가지.\n\n하나, 잃어도 되는 돈으로만. 전체 자산의 20% 이내.\n둘, 한 번에 몰빵 절대 금지. 분할 매수.\n셋, 들어가기 전에 손절 기준 먼저 정하기.\n\n지금 어떤 자산 생각하고 있어요?`,
      career: `${nn}, 커리어에서 지금 당장 할 수 있는 것.\n\n하나, 이직 준비하면서도 지금 자리에서 성과 하나 만들어두기.\n둘, 시장에서 내 몸값이 얼마인지 알아보기. 면접 한 번 나가봐요.\n셋, 이직하려는 진짜 이유 명확히 하기. 도망이면 다음 직장도 똑같아.\n\n어떤 직종이에요?`,
      debt: `${nn}, 빚 문제는 숨기면 커져요. 드러내야 줄어들어.\n\n지금 당장 전체 채무 목록이랑 이자율 정리해요. 이자 제일 높은 것부터 갚는 게 원칙.\n\n혼자 힘들면 신용회복위원회(1600-5500) 상담해봐요.`,
      money: `${nn}, 재정 정리 제일 먼저 할 것 — 지금 고정 지출 목록 정리해봐요. 줄일 수 있는 게 반드시 보여요.\n\n저축은 남으면 하는 게 아니라 먼저 떼어놓고 나머지로 사는 거야.`,
    };
    return advices[cat] || `${nn}, 기운 보면 ${accept >= 60 ? '흐름이 열려 있어요.' : '아직 준비가 더 필요해요.'} 지금 제일 급한 게 뭔지 하나만 말해봐요. 거기서부터 같이 봐볼게요.`;
  }

  // ══════════════════════════════════════════════════════════
  // [5] wantReason — "왜?", "이유가 뭐야?"
  //    → 기운 수치 근거 설명
  // ══════════════════════════════════════════════════════════
  if (wantReason) {
    if (/가능성|확률|%/.test(q)) return null; // 1순위 수치 처리로
    if (accept >= 60)
      return `${nn}, 기운이 ${accept}%면 흐름이 열려 있다는 거야. 이 타이밍에 여러 흐름이 맞아 떨어지고 있어요. 근데 기운이 좋다고 다 되는 건 아니야. 어떻게 움직이느냐가 핵심이에요. 지금 어떤 방식으로 접근하려 해요?`;
    return `${nn}, ${accept}%면 아직 완전히 무르익지 않은 거야. 내외부 상황이 맞아 떨어지는 게 부족해요. 어떤 부분이 제일 걸려요?`;
  }

  // ══════════════════════════════════════════════════════════
  // [6] want 없이 topic만 있는 경우 — 상황 파악 질문
  // ══════════════════════════════════════════════════════════
  if (aboutBorrow && aboutFriend)
    return `${nn}, 친구한테 돈 빌리려는 거예요? 상황 좀 말해봐요. 어떻게 말할지 같이 생각해볼게요.`;
  if (aboutBorrow)
    return `${nn}, 돈을 빌리려는 거예요, 빌려주려는 거예요? 상황 말해줘봐요.`;
  if (aboutContact && !wantPermission && !wantToKnowHow)
    return `${nn}, 연락 얘기 나왔는데 — 먼저 연락하려는 거예요, 아니면 연락이 안 와서 고민인 거예요?`;

  // 매칭 안 됨 → 다음 순위로
  return null;
}

// _getDirectAnswer() → v4 _v4IntentReply()로 완전 통합 (더 이상 사용 안 함)

// ── 감정 답변 ──
function _replyToEmotion(cat, q, nn, accept, risk) {
  const emotional = {
    startup: `${nn}... 그 마음 느껴져요. 창업은 원래 외롭고 무섭고 불안한 거야. 그 감정이 있다는 건 그만큼 이게 진짜 내 일이라는 거야. 지금 제일 무거운 게 뭐예요? 말해봐요.`,
    love: `${nn}... 그 감정이 얼마나 오래된 거예요. 내가 보면 다 느껴져요. 상대 때문에 힘든 거예요, 아니면 내 마음이 정리가 안 돼서 힘든 거예요?`,
    invest: `${nn}, 돈 문제가 불안하면 잠도 못 자잖아요. 지금 그 불안이 "잃을까봐"예요, 아니면 "놓칠까봐"예요? 이 둘은 완전히 다른 문제야.`,
    career: `${nn}... 직장 일로 지치면 집에 와서도 머릿속에서 안 떠나잖아요. 지금 제일 힘든 게 뭐예요? 사람이에요, 일이에요?`,
  };
  return emotional[cat] || `${nn}... 그 마음 느껴져요. 잠깐 숨 고르고 말해봐요. 지금 제일 무거운 게 뭔지.`;
}

// ── 맥락 기반 이어가기 (핵심 함수) ──
function _replyInContext(cat, q, rawText, accept, risk, nn, np, lastSignal, topics, r) {
  const lastQ = lastSignal.lastSentence.toLowerCase();
  const isShortYes = /^(네|예|응|어|맞아|그래|그렇지|ㅇㅇ|맞아요)$/.test(q);
  const isShortNo = /^(아니|아니요|아닌데|ㄴㄴ|노|틀려)$/.test(q);

  // 짧은 동의 → 더 깊이 물어보기
  if (isShortYes) {
    const deepens = {
      startup: `그렇구나. 그럼 그게 얼마나 됐어요? 처음 그 아이디어 떠올렸을 때 어떤 느낌이었어요?`,
      love: `그렇구나. 그 사람 만난 지 얼마나 됐어요? 처음엔 어땠어요?`,
      career: `그렇구나. 그럼 그 회사에서 얼마나 됐어요? 처음 입사했을 때랑 지금이 많이 달라요?`,
      invest: `그렇구나. 그 종목이나 자산에 처음 관심 갖게 된 게 언제예요?`,
    };
    return deepens[cat] || `그렇구나. 그럼 좀 더 구체적으로 말해줘봐요. 언제부터 이 고민이 시작됐어요?`;
  }

  // 짧은 부정 → 방향 재설정
  if (isShortNo) {
    return `아, 내가 잘못 읽었구나. 미안해요. 그럼 어떤 상황인지 다시 말해줘봐요. 처음부터 얘기해도 돼요.`;
  }

  // Signal이 선택지를 물었고 → 유저가 선택지 중 하나를 말했을 때
  if (/돈이에요|팀이에요|시장이에요|방향이에요/.test(q)) {
    if (/돈/.test(q)) return `돈 문제구나. 지금 자금이 얼마나 남았어요? 몇 달치 버틸 수 있어요?`;
    if (/팀|사람/.test(q)) return `팀 문제구나. 어떤 상황이에요? 신뢰 문제예요, 역할 문제예요?`;
    if (/시장|고객/.test(q)) return `시장 문제구나. 실제로 고객한테 팔아봤어요? 반응이 어땠어요?`;
    if (/방향|아이디어/.test(q)) return `방향이 흔들리는 거구나. 지금 하고 있는 게 처음 생각했던 거랑 많이 달라요?`;
  }

  if (/사람 문제|일 문제|돈 문제|성장/.test(q)) {
    if (/사람/.test(q)) return `사람 문제가 제일 힘들죠. 특정 누군가 때문이에요, 아니면 전체 분위기가 문제예요?`;
    if (/일|업무/.test(q)) return `업무 자체가 문제구나. 일이 너무 많아서예요, 아니면 하는 일이 맞지 않아서예요?`;
    if (/돈|연봉/.test(q)) return `연봉 때문이구나. 시장 대비 얼마나 낮다고 느껴요? 다른 곳 오퍼 받아본 적 있어요?`;
    if (/성장|미래/.test(q)) return `성장이 안 된다고 느끼는 거구나. 지금 거기서 몇 년 됐어요? 처음이랑 지금 많이 달라요?`;
  }

  // 구체적 상황 설명 (긴 답변) → 핵심 파악 후 심화 질문
  if (rawText.length > 15) {
    return _deepDiveReply(cat, q, rawText, accept, risk, nn, np, topics, r);
  }

  return null; // 매칭 안 되면 freeform으로
}

// ── 심화 질문 (유저가 구체적으로 말했을 때) ──
function _deepDiveReply(cat, q, rawText, accept, risk, nn, np, topics, r) {
  // 상황을 설명한 경우 → 핵심 포인트 짚어주기
  const depthReplies = {
    startup: () => {
      if (/아이템|제품|서비스|앱|플랫폼/.test(q)) return `그 아이템 기운 읽어봤어요. 지금 실제로 돈 낸 고객이 있어요, 아니면 아직 아이디어 단계예요?`;
      if (/매출|수익|돈/.test(q)) return `매출 얘기구나. 지금 손익분기점은 어느 정도예요? 매달 얼마 들어오고 나가요?`;
      if (/경쟁자|시장|트렌드/.test(q)) return `시장 얘기구나. 지금 이 분야에 비슷한 사람들이 이미 있는 거예요? 그 사람들이 못하는 게 뭔지 알아요?`;
      if (/투자|VC|엔젤|데모데이/.test(q)) return `투자 받으려는 거구나. 지금 IR 자료 있어요? 어느 단계예요 — 초기 투자예요, 시리즈예요?`;
      return `들었어요, ${nn}. 기운 읽어보면 — 지금 이 사업에서 ${nn}가 확신이 있는 부분이랑 흔들리는 부분이 뭐예요? 두 가지 다 말해봐요.`;
    },
    love: () => {
      if (/연락|문자|카톡|전화/.test(q)) return `연락 얘기구나. 마지막으로 연락한 게 언제예요? 먼저 한 쪽이 ${nn}예요, 상대예요?`;
      if (/만났|봤어|데이트/.test(q)) return `만났구나. 그때 분위기가 어땠어요? 어색했어요, 아니면 예전이랑 비슷했어요?`;
      if (/좋아해|감정|고백/.test(q)) return `그 감정 얼마나 됐어요? 처음 그 사람 봤을 때 어떤 느낌이었어요?`;
      if (/싫어|차갑|변했|멀어/.test(q)) return `상대가 변한 것 같은 거구나. 언제부터 그랬어요? 뭔가 계기가 있었어요?`;
      return `들었어요, ${nn}. 그 사람이랑 지금 어떤 상태예요? 연락은 되고 있어요?`;
    },
    career: () => {
      if (/이직|퇴사|나가/.test(q)) return `이직 생각이 있구나. 지금 이직하려는 진짜 이유가 뭐예요? 사람, 일, 돈, 성장 — 이 네 가지 중에 뭐가 제일 커요?`;
      if (/상사|대표|팀장|동료/.test(q)) return `사람 때문에 힘든 거구나. 그 사람이랑 언제부터 문제가 생겼어요?`;
      if (/연봉|돈|급여/.test(q)) return `연봉 문제구나. 지금 연봉이 얼마예요? 시장 대비 어느 정도라고 생각해요?`;
      return `들었어요, ${nn}. 지금 거기서 얼마나 됐어요? 처음에 이 회사 들어왔을 때랑 지금 많이 달라요?`;
    },
    invest: () => {
      if (/주식|코인|ETF|부동산/.test(q)) return `어떤 자산이에요? 지금 얼마나 들어가 있어요? 전체 자산 대비 비율로 말해봐요.`;
      if (/손실|마이너스|떨어/.test(q)) return `지금 손실 상태구나. 얼마나 빠졌어요? 지금 감정이 어때요 — 버텨야겠다 싶어요, 아니면 나와야겠다 싶어요?`;
      if (/수익|올라|플러스/.test(q)) return `수익 났구나. 지금 팔아야 할지 고민이에요, 아니면 더 넣을지 고민이에요?`;
      return `들었어요, ${nn}. 지금 그 투자에서 가장 불안한 게 뭐예요?`;
    },
  };

  const fn = depthReplies[cat];
  if (fn) return fn();

  // 기본 심화
  return `들었어요, ${nn}. 기운 보면 — 지금 ${nn}가 말한 것 중에 제일 핵심이 있어요. 이게 언제부터 시작된 거예요? 그 시작을 알아야 흐름을 제대로 읽을 수 있거든.`;
}

// ── 자유형 대화 (첫 턴 or 매칭 안 되는 경우) ──
function _freeformReply(cat, q, rawText, accept, risk, nn, np, r, topics, turnCount, lastSignal) {

  // 조언/추천 요청
  if (/추천|알려줘|어떻게 해야|뭘 해야|방법이|해줘/.test(q)) {
    const advices = {
      startup: `${nn}, 내가 딱 보면 지금 제일 필요한 게 세 가지야.\n\n하나, 고객 한 명한테 실제로 팔아봐요. 돈 받는 순간 진짜 사업이 시작되는 거야.\n둘, 6개월 버틸 자금이 있는지 확인해요. 돈 떨어지면 판단력이 흐려지거든.\n셋, 왜 내가 해야 하는지 — 한 문장으로 말할 수 있어야 해요.\n\n지금 이 세 가지가 어떻게 돼요?`,
      invest: `${nn}, 투자에서 가장 중요한 원칙 세 가지.\n\n하나, 잃어도 되는 돈으로만. 전체 자산의 20% 이내.\n둘, 한 번에 몰빵 절대 금지. 분할 매수.\n셋, 들어가기 전에 손절 기준 먼저 정하기.\n\n지금 어떤 자산 생각하고 있어요?`,
      love: `${nn}, 연애에서 제일 통하는 건 밀지 않는 거야.\n\n자꾸 확인하고 매달리면 상대는 숨어요. 대신 자연스럽게 좋은 에너지 보여주면서 상대가 먼저 다가오게 만드는 거야.\n\n지금 상대가 어떤 상태인지 말해봐요.`,
      career: `${nn}, 커리어에서 지금 당장 할 수 있는 것.\n\n하나, 이직 준비하면서도 지금 자리에서 성과 하나 만들어두기.\n둘, 시장에서 내 몸값이 얼마인지 알아보기. 면접 한 번 나가봐요.\n셋, 이직하려는 진짜 이유 명확히 하기. 도망이면 다음 직장도 똑같아.\n\n어떤 직종이에요?`,
    };
    return advices[cat] || `${nn}, 지금 기운 읽어봤어요. ${accept >= 60 ? '흐름이 열려 있어요.' : '아직 준비가 더 필요해요.'} 지금 제일 급한 게 뭔지 하나만 말해봐요. 거기서부터 같이 봐볼게요.`;
  }

  // 왜/이유 질문
  if (/왜|이유|근거|어떻게 된|뭔데/.test(q)) {
    if (accept >= 60) return `${nn}, 기운이 ${accept}%면 흐름이 열려 있다는 거야. 이게 나온 이유를 보면 — 지금 이 타이밍에 여러 흐름이 맞아 떨어지고 있어요. 근데 기운이 좋다고 다 되는 건 아니야. 어떻게 움직이느냐가 핵심이에요. 지금 어떤 방식으로 접근하려 해요?`;
    return `${nn}, ${accept}%면 아직 완전히 무르익지 않은 거야. 지금 내외부 상황이 맞아 떨어지는 게 부족해요. 어떤 부분이 제일 걸려요?`;
  }

  // 대화 턴이 쌓인 상태에서 새로운 말
  if (turnCount >= 3) {
    const deepTopics = {
      startup: topics.mentionedMoney
        ? `${nn}, 아까 돈 얘기 했잖아요. 지금 자금 상황이 제일 급한 거죠? 구체적으로 얼마나 버틸 수 있어요?`
        : `${nn}, 얘기 들으면서 기운 계속 읽고 있어요. 지금 이 시점에서 가장 먼저 해결해야 할 게 딱 보여요. ${np}가 지금 가장 확신 없는 게 뭐야?`,
      love: topics.mentionedContact
        ? `${nn}, 아까 연락 얘기 했잖아요. 그 이후로 어떻게 됐어요?`
        : `${nn}, 얘기 들으면서 기운 읽고 있어요. 상대 마음이 완전히 닫힌 건 아닌데 — 지금 ${np}가 제일 두려운 게 뭐야?`,
      career: topics.mentionedJob
        ? `${nn}, 이직 얘기 계속 나오네. 지금 구체적으로 어디 알아보고 있어요?`
        : `${nn}, 얘기 나누면서 보면 — 지금 ${np}한테 제일 중요한 게 뭔지 알아요?`,
    };
    if (deepTopics[cat]) return deepTopics[cat];
  }

  // 첫 번째 ~ 두 번째 대화 (오프너)
  const starters = {
    startup: `${nn}, 사업 기운 읽어봤어요. 지금 어느 단계예요? 아이디어만 있는 단계예요, 이미 시작했어요?`,
    invest: `${nn}, 재물 기운 읽어봤어요. 지금 어떤 자산 생각하고 있어요?`,
    love: `${nn}, 인연 기운 읽어봤어요. 지금 만나고 있는 사람 얘기예요, 아니면 새로운 인연이에요?`,
    career: `${nn}, 직업 기운 읽어봤어요. 지금 다니고 있는 직장 얘기예요, 이직 생각 중이에요?`,
    money: `${nn}, 재정 기운 읽어봤어요. 지금 제일 급한 게 수입 늘리는 거예요, 지출 줄이는 거예요?`,
    marriage: `${nn}, 혼인 기운 읽어봤어요. 결혼 얘기예요, 아니면 지금 관계 자체에 대한 고민이에요?`,
    divorce: `${nn}, 이별 기운 읽어봤어요. 지금 결심이 어느 정도 서 있어요?`,
    family: `${nn}, 가족 기운 읽어봤어요. 누구 때문에 힘든 거예요?`,
    friend: `${nn}, 인연 기운 읽어봤어요. 특정 친구 얘기예요?`,
    health: `${nn}, 몸 기운 읽어봤어요. 지금 몸에 신호가 오고 있는 거예요?`,
    mind: `${nn}, 마음 기운 읽어봤어요. 지금 그 감정이 언제부터 시작됐어요?`,
    trauma: `${nn}, 상처 기운 읽어봤어요. 지금 과거 일이 자꾸 떠오르는 거예요?`,
    study: `${nn}, 학업 기운 읽어봤어요. 지금 시험 준비 중이에요?`,
    success: `${nn}, 성취 기운 읽어봤어요. 지금 목표가 있는데 안 되고 있는 거예요, 아니면 목표 자체를 못 찾고 있어요?`,
    future: `${nn}, 방향 기운 읽어봤어요. 지금 뭔가 선택해야 하는 상황이에요?`,
    realestate: `${nn}, 부동산 기운 읽어봤어요. 지금 매수 고민이에요, 매도 고민이에요?`,
    legal: `${nn}, 송사 기운 읽어봤어요. 지금 법적으로 진행 중인 게 있어요?`,
    debt: `${nn}, 채무 기운 읽어봤어요. 지금 어느 정도 됐어요?`,
    relation: `${nn}, 관계 기운 읽어봤어요. 특정 사람 때문에 온 거예요?`,
  };

  return starters[cat] || `${nn}, 기운 읽어봤어요. 지금 이 상황에서 제일 걱정되는 게 뭐야? 솔직하게 말해봐요.`;
}

// ==================== 카테고리별 점쟁이 핵심 답변 ====================
function _getCatExpertReply(cat, q, accept, risk, namePrefix, r, catLabel) {
  const N = namePrefix ? namePrefix.replace(/,\s*$/, '') : '';
  const nn = N ? `${N}씨` : '손님';

  // ── 연애 (love) ──
  if (cat === 'love') {
    if (/연락|먼저|문자|메시지|톡/.test(q)) {
      if (accept >= 65) return `아이고, ${nn}. 내가 딱 보니까 상대방도 지금 ${nn} 생각 하고 있어요. 근데 먼저 연락하기가 겁나는 거잖아요, 맞죠? 기운이 ${accept}%나 열려 있어. 지금 이 타이밍에 가볍게 닿아봐요. "요즘 어때?" 한 마디면 충분해. 긴 말 하려고 준비하지 말고. 짧을수록 더 자연스럽게 들어가거든.`;
      if (accept >= 45) return `흠... 연락하고 싶은 마음이 굴뚝같은데 선뜻 못 하고 있구나. 기운이 완전히 닫힌 건 아니야. ${accept}%면 가볍게 닿을 수는 있어. 근데 결론 내려는 내용은 절대 안 돼요. 부담 없이, 짧게, 상대가 편하게 답할 수 있는 내용으로 가야 해.`;
      return `${nn}, 솔직하게 말할게요. 지금 연락하면 역효과 나요. 기운이 ${accept}%밖에 안 돼 있거든. 공백이 있어야 상대도 ${nn} 생각을 하게 되는 거예요. 지금은 기다리는 게 맞아. 기다리는 것도 전략이야.`;
    }
    if (/고백|감정|마음|좋아해/.test(q)) {
      if (accept >= 65) return `${nn}, 이 감정 이미 상대한테 다 보여요. 내가 보면 다 보이거든. 기운이 ${accept}%면 상대도 ${nn} 마음 어느 정도 눈치채고 있는 상태야. 지금 표현해도 돼요. 근데 길게 말하면 오히려 부담돼. 짧게, 진심으로, 딱 한 마디로 해봐요. 그게 훨씬 강하게 들어가.`;
      if (accept >= 45) return `마음이 있는 건 알겠는데... 지금 바로 "좋아해"라고 하면 상대가 당황할 수 있어요. 기운이 아직 완전히 열리진 않았거든. 대신 자연스럽게 감정을 흘려봐요. "네가 요즘 자꾸 생각나더라" 이런 식으로. 상대가 스스로 느끼게 만드는 게 더 강해.`;
      return `지금은 감정 표현 참아야 해요. 기운이 ${accept}%밖에 없어. 지금 고백하면 상대가 부담 느끼고 오히려 거리 둘 수 있어. 조금만 더 분위기 무르익게 하고, 상대가 먼저 신호 보낼 때까지 기다려봐요.`;
    }
    if (/상대|그 사람|마음|생각|좋아하/.test(q)) {
      if (accept >= 60) return `${nn}, 내가 기운 읽어보니까요. 상대가 ${nn} 완전히 무관심한 건 아니에요. 어딘가 마음이 걸려 있는 상태야. 근데 상대도 확신이 없는 거야. 지금은 상대가 "이 사람이 날 좋아하는 게 맞나?" 하고 관찰하는 중이거든. 자꾸 확인하려 들지 말고, 자연스럽게 좋은 에너지 보여줘봐요.`;
      return `솔직히 말하면, 상대 마음이 아직 흔들리는 중이야. ${accept}% — 열려 있긴 한데 완전히 기울진 않았어. 지금 "넌 나를 어떻게 생각해?" 이런 거 물어보면 안 돼요. 압박 느끼면 더 멀어져. 함께하는 시간 늘리면서 편안한 사람이 된 다음에 봐야 해.`;
    }
    if (/포기|끝내|그만|내려놓/.test(q)) {
      if (accept < 35) return `${nn}... 이 감정 얼마나 오래 붙들고 있었어요? 기운 보면 다 느껴져요. 근데 지금 흐름에서는 더 밀면 오히려 상대가 더 멀어지는 구조야. 포기가 아니라 잠깐 놓아주는 거예요. 거리 두면 오히려 상대가 먼저 생각나게 되는 경우를 내가 얼마나 많이 봤는지 몰라.`;
      return `포기는 아직 일러요. 기운이 ${accept}%야. 근데 지금 방식대로 계속 가면 결과가 달라지기 어려워. 접근 방식을 바꿔봐요. 밀지 말고, 당겨지게 만들어야 해. 어떻게 했는지 말해봐요, 같이 봐볼게요.`;
    }
    if (/왜|연락없|차갑|변했/.test(q)) {
      if (accept >= 55) return `${nn}, 상대가 갑자기 달라진 것 같아서 불안하죠? 근데 기운 읽어보면 상대가 ${nn}를 싫어하게 된 게 아니에요. 뭔가 본인 사정이 생겼거나, 아니면 잠깐 숨고 싶은 거야. 지금 자꾸 확인하려 들면 더 멀어져요. 좀 내버려 둬봐. 기다리는 게 지금 제일 좋은 전략이야.`;
      return `음... 기운이 좀 흔들리고 있어요. 상대가 뭔가 느끼는 게 있는 것 같아. 지금 상대가 정리가 안 된 상태일 수 있거든. 억지로 확인하려 하지 말고 상대가 스스로 나올 공간을 줘봐요.`;
    }
    if (/지금|당장|해야|시작/.test(q)) {
      if (accept >= 60 && risk <= 40) return `${nn}, 지금이야. 이 타이밍 놓치면 흐름이 식어요. 기운이 ${accept}%면 움직여도 돼. 너무 준비하려고 하지 말고 지금 가볍게 시작해봐요.`;
      if (accept >= 45) return `지금 해도 나쁘진 않은데, 방식이 중요해요. 결론부터 꺼내지 말고 자연스럽게 분위기부터 만들어봐요.`;
      return `조금만 더 기다려요, ${nn}. 지금 급하게 가면 준비 안 된 상태에서 시작하는 거라 오히려 일이 틀어질 수 있어.`;
    }
  }

  // ── 결혼 (marriage) ──
  if (cat === 'marriage') {
    if (/결혼|프로포즈|청혼/.test(q)) {
      if (accept >= 65) return `${nn}, 두 사람 궁합 기운이 딱 맞는 시기야. 내가 보니까 상대도 마음의 준비가 어느 정도 돼 있어요. ${accept}%면 흐름이 열려 있다는 거야. 지금 이 타이밍에 자연스럽게 미래 얘기 꺼내봐요. 거창하게 하려고 준비하지 말고, 진심이 담긴 말 한마디가 더 강하거든.`;
      if (accept >= 45) return `결혼하고 싶은 마음이 있는데 확신이 안 서는 거죠? 기운은 있어요. 근데 두 사람 사이에 아직 맞춰야 할 게 있는 것 같아. 돈, 생활 방식, 집안 — 이 세 가지가 어느 정도 맞아야 오래 가거든. 그 부분 먼저 대화해봐요.`;
      return `지금 당장 결혼 결정 서두르지 마요. ${nn}, 기운이 아직 완전히 무르익지 않았어. 두 사람이 함께 그리는 미래가 얼마나 겹치는지 먼저 확인해봐요. 결혼은 하루의 결심이 아니라 매일의 선택이거든.`;
    }
    if (/시기|미루|나중|언제/.test(q)) {
      return `${nn}, 결혼 타이밍 고민되죠? 기운 보면 ${accept >= 55 ? '지금이 흐름이 열려 있는 시기야. 너무 미루면 이 온기가 식어버려요. 미루는 데도 이유가 있겠지만, 그 이유가 진짜인지 핑계인지 한번 솔직하게 봐봐요.' : '조금 더 준비가 필요한 시기인 것 같아. 감정이 뜨겁다고 바로 결정하면 나중에 흔들려요. 기반이 갖춰진 다음에 가는 게 더 오래 가.'}`;
    }
    if (/부모|가족|반대/.test(q)) {
      return `부모님 반대... 쉽지 않죠, ${nn}. 근데 내가 수십 년 동안 이런 경우 많이 봤는데, 말로 설득하려 하면 오히려 더 단단히 막혀요. 가장 효과적인 건 시간이야. 상대를 자주 자연스럽게 보여주면서 익숙해지게 만드는 거. 처음엔 반대해도 사람이 보이면 마음이 열리거든.`;
    }
  }

  // ── 이혼·별거 (divorce) ──
  if (cat === 'divorce') {
    if (/이혼|결심|결정|말해야/.test(q)) {
      if (accept >= 60) return `${nn}... 많이 지쳐 있구나. 기운 보면 이미 마음속에서 결정이 어느 정도 서 있는 것 같아요. 지금 중요한 건 "할까 말까"가 아니라 어떻게 가장 안전하게 나오느냐야. 재산, 자녀, 법적 절차 — 이 순서로 미리미리 준비해놓고 움직여야 해요. 감정에 이끌려 급하게 가면 나중에 불리해질 수 있어.`;
      return `${nn}, 아직 내면에서 흔들리고 있는 게 느껴져요. 이 결정이 충동인지 진짜 결심인지 — 조금 더 봐야 해. 별거를 먼저 경험해보거나, 상담을 통해 이 관계가 회복이 가능한지 아닌지를 먼저 확인해보는 과정이 필요해요.`;
    }
    if (/아이|자녀|양육/.test(q)) {
      return `아이 얘기 나오면 제일 복잡하죠, ${nn}. 근데 내가 오랫동안 이런 상황 많이 봐왔는데, 결국 아이 중심으로 결정한 경우가 모든 사람한테 제일 나은 결과를 낳더라고요. 지금 아이의 안정이 첫 번째야. 나머지는 그 다음에 정리해도 늦지 않아요.`;
    }
    if (/변호사|법적|소송|재산/.test(q)) {
      return `법적인 부분은 감정보다 빠르게 움직여야 해요, ${nn}. 재산 분할이랑 친권은 특히 초반 대응이 결과를 완전히 바꿔놓거든. 지금 당장 전문가 조언 받아봐요. 대한법률구조공단(132)에서 무료 상담 됩니다.`;
    }
  }

  // ── 가족 (family) ──
  if (cat === 'family') {
    if (/말해야|털어놔|말하면|솔직/.test(q)) {
      if (accept >= 55) return `${nn}, 말하고 싶은데 어떻게 꺼낼지 몰라서 계속 담아두고 있었던 거잖아요. 기운 보면 지금 말해도 돼요. 근데 방식이 중요해. 비난하는 말투로 시작하면 방어심 올라와서 대화가 안 돼요. "나는 이럴 때 힘들어" — 이렇게 내 감정 중심으로 시작해봐요.`;
      return `말하고 싶은 마음은 알겠는데, 지금 감정이 많이 올라온 상태에서 꺼내면 대화가 아니라 싸움이 될 수 있어요. 두 사람 다 좀 안정됐을 때, 조용한 자리에서 꺼내는 게 맞아요.`;
    }
    if (/거리|경계|선 긋기/.test(q)) {
      return `가족이라고 해서 모든 걸 다 받아줘야 하는 건 아니에요, ${nn}. 경계를 두는 건 관계를 끊는 게 아니야. 오히려 오래 이어가려면 경계가 있어야 해요. "이건 괜찮은데 이건 힘들어" — 이걸 말할 수 있어야 진짜 관계가 유지돼요.`;
    }
    if (/해결|풀어야|어떻게/.test(q)) {
      return `가족 갈등은 한 번 대화로 해결 안 돼요, ${nn}. 그렇게 생각하면 실망하게 돼 있어. 작은 대화를 반복하면서 조금씩 녹이는 거야. 오늘 당장 큰 결론 내려고 하지 말고, 오늘 할 수 있는 가장 작은 한 마디부터 해봐요.`;
    }
  }

  // ── 친구 (friend) ──
  if (cat === 'friend') {
    if (/연락|먼저|문자|카톡/.test(q)) {
      if (accept >= 55) return `${nn}, 먼저 연락해도 이상한 거 없어요. 기운 보면 상대도 ${nn} 생각을 안 하는 건 아니야. 근데 연락할 때 무거운 얘기로 시작하지 말고, 가볍게 — 재밌는 거 공유하거나 근황 묻는 거로 자연스럽게 시작해봐요.`;
      return `${nn}, 솔직히 말할게요. 먼저 연락하기가 불편하다면, 그건 이 관계에서 이미 뭔가 균형이 맞지 않는다는 신호일 수 있어요. 연락하기 전에 이 관계가 ${nn}한테 진짜 어떤 의미인지 먼저 생각해봐요.`;
    }
    if (/정리|끝내|그만|멀어지/.test(q)) {
      return `${nn}가 이 관계를 정리하고 싶다는 생각을 하고 있구나. 기운 보면 이미 마음이 조금씩 떠나고 있는 것 같아. 굳이 "우리 이제 그만 보자" 선언 안 해도 돼요. 자연스럽게 거리를 두면서 관계의 온도가 낮아지게 놔두는 게 서로한테 덜 상처야.`;
    }
    if (/진짜 친구|어떻게 생각|나를/.test(q)) {
      return `${nn}, 진짜 친구인지 아닌지는 말로 알 수 없어요. 내가 힘들 때 어떻게 반응했는지, 내 얘기를 기억하는지 — 이 두 가지가 다 보여줘요. 기억해봐요, 가장 힘들었을 때 그 친구가 어디 있었는지.`;
    }
  }

  // ── 관계 (relation) ──
  if (cat === 'relation') {
    if (/사과|화해|오해/.test(q)) {
      if (accept >= 55) return `${nn}, 먼저 손 내미는 게 지는 게 아니에요. 기운 보면 상대도 사실 이 상황이 불편한 거야. 근데 먼저 사과할 때 변명이 들어가면 안 돼요. "내가 그때 그랬던 거 미안해" — 딱 이것만. 이유 설명하려 하면 오히려 더 꼬여요.`;
      return `사과하고 싶은 마음은 알겠는데, 상대가 지금 받을 준비가 됐는지 먼저 봐야 해요. 감정이 아직 뜨거운 상태에서 가면 오히려 더 어색해질 수 있어.`;
    }
    if (/정리|끝내|관계/.test(q)) {
      return `${nn}, 이 관계가 ${nn}한테 에너지를 주고 있어요, 아니면 뺏어가고 있어요? 솔직하게 느껴봐요. 뺏어가고 있다면 정리가 맞아요. 관계 정리하고 나서 오히려 삶이 가벼워졌다는 사람을 내가 얼마나 많이 봤는지 몰라요.`;
    }
  }

  // ── 커리어 (career) ──
  if (cat === 'career') {
    if (/이직|그만두|퇴사|옮겨/.test(q)) {
      if (accept >= 60) return `${nn}, 이직 기운이 열려 있어요. ${accept}%면 나쁘지 않아. 근데 중요한 건 "어디로 가느냐"야. 지금 다니는 곳에서 도망치는 거라면 다음 직장에서도 똑같은 문제 만나요. 이직하려는 진짜 이유가 뭔지 먼저 솔직하게 봐봐요.`;
      if (accept >= 45) return `이직 타이밍이 완전히 나쁜 건 아닌데, 지금 나가면 다음 직장에서도 비슷한 상황 마주칠 수 있어요. 내가 이직을 원하는 진짜 이유가 뭔지 먼저 명확히 해봐요.`;
      return `${nn}, 지금은 이직보다 지금 있는 자리에서 뭔가 만들어내는 게 더 맞아요. 도망치듯 나가면 커리어에 흔적이 남거든. 조금 더 준비하고 움직여봐요.`;
    }
    if (/제안|오퍼|조건|연봉/.test(q)) {
      return `${nn}, 연봉만 보고 결정하면 후회해요. 그 직장에서 3년 후 내가 어떤 사람이 돼 있을지를 봐야 해. 성장할 수 있는 환경인지, 사람들이 좋은지, 대표가 어떤 사람인지 — 이게 다 맞아야 오래 버텨요.`;
    }
    if (/승진|인정|어필/.test(q)) {
      if (accept >= 55) return `지금 어필해도 돼요, ${nn}. 근데 "나 잘했잖아요"가 아니라 내가 기여한 것들을 숫자와 결과로 보여주는 게 훨씬 설득력 있어요.`;
      return `조금만 더 기다려봐요. 지금보다 눈에 보이는 성과 하나 더 만들고 나서 움직이는 게 훨씬 강하게 인정받아요.`;
    }
    if (/지금|당장|시작|해야/.test(q)) {
      if (accept >= 60) return `${nn}, 지금 흐름이 열려 있어요. 100% 준비될 때를 기다리면 영원히 못 움직여요. 지금 시작해봐요.`;
      return `조금 더 준비하고 가요. 커리어는 타이밍보다 준비가 맞아야 오래 가거든요.`;
    }
  }

  // ── 창업·사업 (startup) ──
  if (cat === 'startup') {
    if (/창업|사업|시작/.test(q)) {
      if (accept >= 65) return `${nn}, 사업 기운이 열려 있어요. ${accept}%면 흐름이 좋아. 근데 창업에서 아이디어보다 중요한 게 실행이거든요. 지금 당장 세 가지만 확인해봐요 — 고객이 실제로 돈 낼 의향이 있는지, 나한테 6개월 버틸 자금이 있는지, 그리고 왜 지금 경쟁자들이 못하고 있는지. 이 셋이 맞으면 가도 돼요.`;
      if (accept >= 45) return `창업 마음이 있군요. 기운은 있어요. 근데 ${nn}, 제품 만들기 전에 먼저 10명한테 팔아봐요. 돈 낸 사람이 한 명이라도 있으면 그때 본격적으로 가는 거야. 아이디어가 좋아도 시장이 원하지 않으면 소용없거든.`;
      return `지금 바로 창업 뛰어들기엔 기운이 아직 준비가 안 된 것 같아요, ${nn}. 아이디어 검증하고, 자금 계획 세우고, 함께할 사람 구하는 것부터 해봐요. 서두르는 게 가장 큰 창업 실패 원인이야.`;
    }
    if (/동업|파트너|공동창업/.test(q)) {
      return `${nn}, 동업자는 배우자보다 더 신중하게 골라야 해요. 내가 수십 년 보면서 동업 실패의 대부분이 역할 정리 안 됐거나, 돈 문제거나, 결정 방식이 달라서 깨지더라고요. 지금 당장 역할, 수익 배분, 탈출 조건 — 이 세 가지를 문서로 정리해두고 시작해봐요.`;
    }
    if (/자금|버틸|투자받/.test(q)) {
      return `${nn}, 지금 몇 달치 버틸 수 있어요? 6개월 미만이면 지금 당장 매출을 만들거나 투자를 받아야 해요. 아이디어보다 살아남는 게 먼저야. 죽으면 아무것도 못 해요.`;
    }
    if (/접어야|그만|포기|사업 정리/.test(q)) {
      if (risk >= 65) return `${nn}... 많이 지쳐 있구나. 기운 보면 이미 한계에 와 있는 것 같아요. 사업 접는 게 실패가 아니에요. 내가 본 창업자 중에 두 번째 사업에서 성공한 사람이 훨씬 많아. 지금 방향 전환이 가능한지 먼저 보고, 아니면 깔끔하게 정리하고 다음을 준비하는 게 맞아요.`;
      return `아직 접을 때는 아닌 것 같아요. 근데 지금 방향이 맞는지를 냉정하게 봐봐요. 계속 밀어야 하는 건지, 방향을 틀어야 하는 건지 — 데이터로 판단해봐요.`;
    }
    if (/아이디어|시장|팔릴까/.test(q)) {
      return `${nn}, 아이디어 가치는 본인이 판단하는 게 아니에요. 고객이 판단하는 거야. 지금 당장 10명한테 보여주고 "이거 살 거야?" 물어봐요. 돈 낼 사람이 없다면 아이디어를 바꿔야 해요.`;
    }
  }

  // ── 투자 (invest) ──
  if (cat === 'invest') {
    if (/투자|들어가|시작|사야/.test(q)) {
      if (accept >= 65 && risk <= 40) return `${nn}, 재물 기운이 열려 있어요. ${accept}%면 흐름이 좋아. 근데 한꺼번에 몰빵하는 건 절대 안 돼요. 전체 자산의 20% 이내에서, 분할해서 들어가봐요. 욕심이 가장 큰 적이거든.`;
      if (accept >= 50) return `투자 고려할 수 있는 기운이에요. 근데 리스크가 ${risk}%야. 손실 났을 때 감당할 수 있는 금액만, 분할 매수로 접근해봐요. 감정으로 결정하면 항상 후회해요.`;
      return `${nn}, 지금은 좀 기다려요. 기운이 ${accept}%밖에 안 돼. 모든 게 확실해 보일 때가 사실 가장 위험한 타이밍이거든요. 기회는 한 번이 아니에요. 조금 더 지켜봐요.`;
    }
    if (/팔아야|손절|나와야/.test(q)) {
      if (risk >= 60) return `리스크가 ${risk}%나 돼요, ${nn}. 감정으로 버티지 말고, 손절 기준을 지금 딱 정해봐요. "여기까지 내려가면 나온다" — 이걸 정해놔야 감정에 안 끌려다녀요.`;
      return `지금 바로 나와야 할 신호는 아닌 것 같아요. 근데 매도 기준을 감정이 아니라 숫자로 미리 정해두는 게 맞아요.`;
    }
    if (/충동|급해|욕심/.test(q)) {
      return `${nn}, 지금 흥분 상태에서 내리는 결정은 나중에 거의 다 후회해요. 24시간만 기다려봐요. 내일도 같은 확신이 있으면 그때 결정하는 거야.`;
    }
  }

  // ── 돈·재정 (money) ──
  if (cat === 'money') {
    if (/빌려|대출|갚아야/.test(q)) {
      return `${nn}, 돈 문제 쉽지 않죠. 내가 솔직하게 말할게요 — 돈은 못 받아도 괜찮을 때만 빌려줘요. 대출은 월 상환액이 소득의 30% 넘으면 위험해. 지금 그 비율이 어느 정도 돼요?`;
    }
    if (/저축|돈 모아|재정/.test(q)) {
      return `${nn}, 저축은 남으면 하는 게 아니에요. 먼저 떼어놓고 나머지로 사는 거야. 지금 당장 고정 지출 목록부터 정리해봐요. 줄일 수 있는 게 반드시 보여요.`;
    }
    if (/지금|결정|어떻게/.test(q)) {
      if (accept >= 60) return `${nn}, 기운이 열려 있어요. 움직여도 돼. 근데 재정 결정 전에 항상 최악의 경우를 먼저 그려봐요. 그걸 감당할 수 있으면 가는 거야.`;
      return `재정 결정은 신중해야 해요. 지금 조금 더 데이터 모으고 나서 결정하는 게 나아요. 서두르면 항상 후회하더라고요.`;
    }
  }

  // ── 부동산 (realestate) ──
  if (cat === 'realestate') {
    if (/살까|사야|매수/.test(q)) {
      if (accept >= 60 && risk <= 45) return `${nn}, 부동산 기운이 나쁘지 않아요. ${accept}%면 움직일 수 있어. 근데 대출 비율이 매입가의 60% 넘으면 금리 조금만 올라도 흔들려요. 상환 여력 먼저 점검해봐요.`;
      if (accept >= 45) return `지금 매수 고려할 수 있는 흐름인데, 리스크가 ${risk}%야. 2~3년 안에 팔아야 하는 상황이 생길 것 같으면 조금 더 기다리는 게 나아요.`;
      return `${nn}, 지금은 보고만 있어요. 부동산 서두르면 반드시 후회해요. 기운이 더 열릴 때까지 시장 지켜보는 게 맞아.`;
    }
    if (/팔까|매도/.test(q)) {
      if (risk >= 55) return `리스크가 높아요, ${nn}. 오래 들고 가는 것보다 지금 정리하고 현금화하는 게 나을 수 있어. 단, 매도 후 어디에 넣을지 계획이 있어야 해요.`;
      return `지금 바로 팔 이유는 없어 보여요. 근데 "이 가격 되면 판다"는 기준을 미리 숫자로 정해둬요. 감정으로 결정하면 타이밍 항상 놓쳐요.`;
    }
    if (/전세|계약|임대/.test(q)) {
      return `${nn}, 계약 전에 등기부등본 꼭 확인해요. 집주인 대출이 전세금보다 크면 전세보증보험 반드시 들어야 해요. 이거 안 하면 나중에 진짜 힘들어져요.`;
    }
  }

  // ── 법률·분쟁 (legal) ──
  if (cat === 'legal') {
    if (/소송|고소|법적|변호사/.test(q)) {
      if (accept >= 60) return `${nn}, 법적으로 대응할 수 있는 기운이 있어요. ${accept}%면 여지가 있어. 근데 법 싸움에서 증거가 전부예요. 지금 당장 문자, 카톡, 이메일, 서류 — 다 백업해두는 게 최우선이야.`;
      return `${nn}, 이 싸움이 감정인지 실익인지 먼저 구분해봐요. 법적 절차는 시간이랑 돈이 많이 들거든. 합의로 풀 수 있는 여지가 있다면 그것도 생각해봐요.`;
    }
    if (/증거|서류/.test(q)) {
      return `지금 당장 할 것 — 모든 대화 내역 캡처, 거래 내역 정리, 계약서 원본 확보. 이거 잘 정리해두는 것만으로도 결과가 크게 달라져요, ${nn}.`;
    }
    if (/합의|화해/.test(q)) {
      return `합의가 약한 게 아니에요, ${nn}. 좋은 합의가 긴 소송보다 훨씬 나은 경우가 많아요. 근데 합의는 내가 유리한 상태에서 해야 해요. 지금 내 입장이 강한지 약한지부터 파악해봐요.`;
    }
    if (/시효|늦었/.test(q)) {
      return `시효 놓치면 아무것도 못 해요, ${nn}. 지금 당장 대한법률구조공단(132) 전화해서 시효 확인해요. 무료야.`;
    }
  }

  // ── 빚·채무 (debt) ──
  if (cat === 'debt') {
    if (/빚|채무|갚아야|상환/.test(q)) {
      if (accept >= 55) return `${nn}... 빚 문제 혼자 안고 얼마나 힘들었어요. 기운 보면 해결 가능한 방법이 있어요. 지금 당장 전체 채무 목록이랑 이자율을 정리해봐요. 이자 제일 높은 것부터 갚는 게 원칙이야.`;
      return `빚은 숨기면 커져요, ${nn}. 드러내야 줄어들어. 개인회생, 채무 조정, 파산 — 이 세 가지 옵션을 전문가랑 같이 검토해봐요. 방법은 반드시 있어요.`;
    }
    if (/회생|파산|신용/.test(q)) {
      return `${nn}, 개인회생이나 파산은 끝이 아니에요. 새 시작이야. 내가 수십 년 봐온 사람들 중에 이 과정 거치고 재기한 분들이 훨씬 많아요. 신용회복위원회(1600-5500) 상담해봐요.`;
    }
  }

  // ── 건강 (health) ──
  if (cat === 'health') {
    if (/병원|진료|검사|치료/.test(q)) {
      return `${nn}, 몸이 신호 보내고 있는 거야. 무시하면 안 돼요. 결과가 나쁠까봐 두렵겠지만, 모르는 것보다 아는 게 훨씬 낫거든. 지금 당장 병원 가봐요.`;
    }
    if (/습관|식단|운동/.test(q)) {
      return `${nn}, 한꺼번에 다 바꾸려 하지 마요. 작은 습관 하나만 3개월 지속하면 진짜 변화가 시작돼요. 지금 당장 할 수 있는 가장 작은 것 하나만 골라봐요.`;
    }
  }

  // ── 마음·감정 (mind) ──
  if (cat === 'mind') {
    if (/우울|불안|힘들|지쳐|무기력/.test(q)) {
      return `${nn}... 많이 지쳐 있구나. 그 감정 판단하지 말아요. 지금 힘든 건 약한 게 아니에요. 이 감정이 보내는 신호를 무시하지 말고, 혼자 버티려 하지 말아요. 정신건강 위기상담 전화 1577-0199, 24시간 받아줘요.`;
    }
    if (/감정|마음|내면/.test(q)) {
      return `감정은 옳고 그름이 없어요, ${nn}. 억누르면 결국 더 크게 터져요. 지금 느끼는 걸 그대로 인정하는 것부터 시작해봐요. "나는 지금 이런 감정이야" — 이 말 한마디가 치유의 시작이에요.`;
    }
    if (/상담|도움|어디/.test(q)) {
      return `상담 받는 게 용기 있는 거예요, ${nn}. 도움 먼저 구한 사람이 훨씬 빠르게 나아지더라고요. 지역 정신건강복지센터는 무료야. 정신건강 위기상담 1577-0199도 있어요.`;
    }
  }

  // ── 트라우마 (trauma) ──
  if (cat === 'trauma') {
    if (/트라우마|상처|과거|잊히지/.test(q)) {
      return `${nn}... 그 상처 얼마나 오래됐어요. 기운 보면 아직도 그게 몸 안에 남아 있는 게 느껴져요. 트라우마는 의지로 극복하는 게 아니에요. 전문 치료가 필요한 거야. 혼자 버티는 게 가장 힘든 방법이에요.`;
    }
    if (/회복|나아질|괜찮아질/.test(q)) {
      return `${nn}, 회복은 직선이 아니에요. 올라갔다 내려갔다 하면서 조금씩 나아지는 게 정상이야. 회복 못 한 사람은 없어요. 시간이랑 적절한 도움이 있으면 반드시 나아져요.`;
    }
  }

  // ── 공부·시험 (study) ──
  if (cat === 'study') {
    if (/시험|합격|공부/.test(q)) {
      if (accept >= 60) return `${nn}, 합격 기운이 있어요. ${accept}%면 가능해. 근데 지금 가장 중요한 건 범위를 줄이는 거야. 다 하려 하지 말고, 가장 취약한 부분에 집중해봐요.`;
      return `지금 방법을 바꿔야 해요, ${nn}. 공부 시간보다 공부 질이 더 중요해. 제일 취약한 영역 하나 골라서 깊게 파봐요.`;
    }
    if (/방법|전략|효율/.test(q)) {
      return `${nn}, 공부한 내용을 책 덮고 기억하려는 연습이 제일 효과적이에요. 단순히 반복해서 읽는 것보다 기억에 훨씬 강하게 남거든. 지금 당장 읽은 거 덮고 기억해봐요.`;
    }
  }

  // ── 성공·목표 (success) ──
  if (cat === 'success') {
    if (/목표|성공|이루고|꿈/.test(q)) {
      if (accept >= 60) return `${nn}, 기운이 열려 있어요. ${accept}%면 흐름이 좋아. 목표는 크게 세우되 행동은 아주 작게 쪼개야 해요. 지금 이 순간 할 수 있는 가장 작은 행동 하나가 뭔지 말해봐요.`;
      return `목표 이루는 데 가장 큰 장애물은 외부가 아니라 내가 정한 "나중에"야, ${nn}. 지금 할 수 있는 가장 작은 것부터 시작해봐요. 시작해야 기운이 생겨요.`;
    }
    if (/포기|그만|힘들어/.test(q)) {
      return `${nn}, 포기하고 싶은 지금 이 순간이 딱 성장이 일어나는 직전이에요. 기운 보면 느껴져요. 지금 가장 힘든 이유가 뭔지 말해봐요. 같이 봐볼게요.`;
    }
  }

  // ── 미래·방향 (future) ──
  if (cat === 'future') {
    if (/방향|미래|뭘 해야|어떻게/.test(q)) {
      return `${nn}, 정답은 밖에 없어요. 안에 있어. 지금 가장 설레는 것과 가장 잘할 수 있는 것이 겹치는 지점 — 그게 방향이에요. 억지로 찾으려 하지 말고, 지금 가장 끌리는 게 뭔지 솔직하게 봐봐요.`;
    }
    if (/불안|막막|두려|모르겠/.test(q)) {
      return `${nn}, 미래가 불확실한 건 당연해요. 미래를 완전히 알고 움직인 사람은 없어. 지금 할 수 있는 최선을 다하는 것 — 그게 미래를 가장 잘 준비하는 방법이야.`;
    }
  }

  return null;
}

// ==================== 카테고리별 Fallback 답변 ====================
function _getCatFallbacks(cat, accept, risk, r, namePrefix, catLabel) {
  const N = namePrefix ? namePrefix.replace(/,\s*$/, '') : '';
  const nn = N ? `${N}씨` : '손님';

  return [
    `${nn}, 기운 보면 ${accept >= 60 ? '지금 이 흐름이 나쁘지 않아요. 어떤 부분이 제일 걸려요? 더 얘기해봐요.' : '아직 좀 더 준비가 필요한 시기인 것 같아요. 가장 막막한 부분이 뭐예요?'}`,
    `${catLabel} 고민이구나. 리스크가 ${risk}%야. ${risk >= 55 ? '이 부분은 신중하게 가야 해요. 어떻게 접근하고 있어요?' : '감당할 수 있는 수준이에요. 두려움이 과하면 오히려 기회를 놓쳐요.'}`,
    `${r.flow ? r.flow.split('.')[0] + '.' : '지금 흐름을 잘 읽어봐요.'} ${r.nextItems && r.nextItems.length ? '지금 당장 할 수 있는 건 — ' + r.nextItems[0] + '.' : ''}`,
    `${nn}, 이 고민을 하고 있다는 것 자체가 이미 앞으로 나아가고 있는 거예요. 어떤 부분이 제일 무거워요? 더 구체적으로 얘기해봐요.`,
    `기운이 ${accept}%야. ${accept >= 55 ? '흐름은 열려 있어요. 어떻게 접근하느냐가 핵심이에요.' : '아직 무르익는 중이에요. 준비에 집중하는 게 맞아요.'}`,
  ];
}

// ==================== CLEAR DATA ====================
function clearData() {
  if (confirm('모든 데이터를 초기화할까? 기록과 프로필이 모두 삭제돼.')) {
    localStorage.removeItem('signal_profile');
    localStorage.removeItem('signal_history');
    state.history = [];
    state.name = ''; state.gender = ''; state.birthYear = ''; state.birthMonth = ''; state.birthDay = ''; state.category = '';
    showToast('🗑️ 데이터가 초기화됐어');
    updateProfileDisplay();
  }
}

// ==================== TOAST ====================
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ==================== PARTICLES ====================
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', () => { resize(); initP(); });

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
  }

  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) this.x = W;
    if (this.x > W) this.x = 0;
    if (this.y < 0) this.y = H;
    if (this.y > H) this.y = 0;
  };

  function initP() {
    const count = Math.min(60, Math.floor(W * H / 15000));
    particles = [];
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  initP();

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => p.update());

    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(110,231,216,${(1 - dist / 120) * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(110,231,216,${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}
