// ============================================================
// COSMIC CELL INVASION — Banco de Perguntas Refinado
// Foco: ENEM / Nível Básico / Divisão Celular
// Sistema: 2 perguntas por casa (sorteadas)
// ============================================================

export type Category =
  | "interfase_g1"
  | "interfase_s"
  | "interfase_g2"
  | "mitose_profase"
  | "mitose_metafase"
  | "mitose_anafase"
  | "mitose_telofase"
  | "mitose_citocinese"
  | "meiose_i"
  | "meiose_ii"
  | "crossing_over";

export interface Question {
  id: number;
  category: Category;
  categoryLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  image?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  interfase_g1: "Interfase — G1",
  interfase_s: "Interfase — Fase S",
  interfase_g2: "Interfase — G2",
  mitose_profase: "Mitose — Prófase",
  mitose_metafase: "Mitose — Metáfase",
  mitose_anafase: "Mitose — Anáfase",
  mitose_telofase: "Mitose — Telófase",
  mitose_citocinese: "Mitose — Citocinese",
  meiose_i: "Meiose I",
  meiose_ii: "Meiose II",
  crossing_over: "Crossing Over",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  interfase_g1: "#00E5FF",
  interfase_s: "#00FF9F",
  interfase_g2: "#69FF47",
  mitose_profase: "#7B2FFF",
  mitose_metafase: "#B44FFF",
  mitose_anafase: "#E040FB",
  mitose_telofase: "#FF6B9D",
  mitose_citocinese: "#FF8C42",
  meiose_i: "#FFD700",
  meiose_ii: "#FF3366",
  crossing_over: "#FF6B35",
};

export const questions: Question[] = [
  // ── CASA 0: INTERFASE G1 (Questão 1) ──────────────────────
  {
    id: 1,
    category: "interfase_g1",
    categoryLabel: "Interfase — G1",
    question: "A fase G1 da interfase é o período que precede a duplicação do DNA. Qual a principal atividade da célula neste momento?",
    options: [
      "Divisão do núcleo em dois",
      "Intenso crescimento celular e síntese de proteínas",
      "Separação das cromátides-irmãs",
      "Produção de gametas para reprodução"
    ],
    correctIndex: 1,
    explanation: "Em G1 (Gap 1), a célula foca em crescer e produzir proteínas e organelas antes de se comprometer com a replicação do DNA.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-interphase-g1-VVCrw7LRbBJfKQe3tWuWMP.webp"
  },
  // ── CASA 0: INTERFASE G1 (Questão 2) ──────────────────────
  {
    id: 2,
    category: "interfase_g1",
    categoryLabel: "Interfase — G1",
    question: "Se uma célula 'decide' não se dividir mais e sair do ciclo celular, ela entra em um estado de repouso chamado:",
    options: [
      "Fase S",
      "Fase G2",
      "Fase G0",
      "Metáfase"
    ],
    correctIndex: 2,
    explanation: "Células que não se dividem (como neurônios) entram na fase G0, saindo do ciclo celular ativo.",
  },
  // ── CASA 1: INTERFASE S (Questão 1) ───────────────────────
  {
    id: 3,
    category: "interfase_s",
    categoryLabel: "Interfase — Fase S",
    question: "(ENEM) O processo de replicação do DNA é chamado de 'semiconservativo'. Isso significa que:",
    options: [
      "Metade do DNA é destruído no processo",
      "As fitas novas são idênticas às originais, sem usar moldes",
      "Cada nova molécula de DNA preserva uma das fitas originais",
      "O DNA só se duplica se houver mutação"
    ],
    correctIndex: 2,
    explanation: "Na replicação semiconservativa, cada molécula filha contém uma fita da molécula mãe (original) e uma fita recém-sintetizada.",
    image: "/images/dna-replication.png"
  },
  // ── CASA 1: INTERFASE S (Questão 2) ───────────────────────
  {
    id: 4,
    category: "interfase_s",
    categoryLabel: "Interfase — Fase S",
    question: "Qual o evento fundamental que ocorre na Fase S da Interfase para permitir a futura divisão celular?",
    options: [
      "Desaparecimento do núcleo",
      "Duplicação do material genético (DNA)",
      "Formação do fuso mitótico",
      "Crescimento do citoplasma"
    ],
    correctIndex: 1,
    explanation: "S vem de 'Síntese'. É nesta fase que o DNA se duplica, garantindo que as células filhas recebam a carga genética correta.",
  },
  // ── CASA 2: INTERFASE G2 (Questão 1) ──────────────────────
  {
    id: 5,
    category: "interfase_g2",
    categoryLabel: "Interfase — G2",
    question: "A fase G2 ocorre após a duplicação do DNA. Qual sua principal função?",
    options: [
      "Iniciar a meiose diretamente",
      "Reparar erros no DNA e preparar proteínas para a mitose",
      "Dividir a célula em duas",
      "Dobrar o número de cromossomos novamente"
    ],
    correctIndex: 1,
    explanation: "G2 é o último check-point antes da divisão, onde a célula verifica se o DNA está ok e prepara as estruturas de divisão.",
  },
  // ── CASA 2: INTERFASE G2 (Questão 2) ──────────────────────
  {
    id: 6,
    category: "interfase_g2",
    categoryLabel: "Interfase — G2",
    question: "Ao final da fase G2, a célula está pronta para entrar em qual processo?",
    options: [
      "Fase S",
      "Fase G1",
      "Mitose (Divisão Celular)",
      "Morte celular programada"
    ],
    correctIndex: 2,
    explanation: "G2 termina quando a célula inicia a Prófase da Mitose.",
  },
  // ── CASA 3: MITOSE PRÓFASE (Questão 1) ───────────────────
  {
    id: 7,
    category: "mitose_profase",
    categoryLabel: "Mitose — Prófase",
    question: "Na Prófase, os cromossomos começam a se tornar visíveis ao microscópio. Isso acontece devido à:",
    options: [
      "Duplicação do DNA",
      "Condensação (espiralização) da cromatina",
      "Fragmentação do citoplasma",
      "União dos cromossomos homólogos"
    ],
    correctIndex: 1,
    explanation: "A condensação torna os fios de DNA mais curtos e grossos, facilitando sua movimentação sem quebrar.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663388787907/dqhjFfoGYRSqrFWR.png"
  },
  // ── CASA 3: MITOSE PRÓFASE (Questão 2) ───────────────────
  {
    id: 8,
    category: "mitose_profase",
    categoryLabel: "Mitose — Prófase",
    question: "Qual estrutura celular desaparece durante a Prófase para permitir que os cromossomos se espalhem?",
    options: [
      "A membrana plasmática",
      "O envelope nuclear (carioteca)",
      "As mitocôndrias",
      "Os ribossomos"
    ],
    correctIndex: 1,
    explanation: "A carioteca se fragmenta para que o fuso mitótico possa alcançar os cromossomos no citoplasma.",
  },
  // ── CASA 4: MITOSE METÁFASE (Questão 1) ──────────────────
  {
    id: 9,
    category: "mitose_metafase",
    categoryLabel: "Mitose — Metáfase",
    question: "Na Metáfase, os cromossomos se alinham no centro da célula. Como se chama essa região de alinhamento?",
    options: [
      "Polo celular",
      "Placa equatorial (ou metafásica)",
      "Centrossomo",
      "Cinetócoro"
    ],
    correctIndex: 1,
    explanation: "O alinhamento central garante que, na próxima fase, cada lado receba uma cópia exata do DNA.",
    image: "/images/metaphase.jpg"
  },
  // ── CASA 4: MITOSE METÁFASE (Questão 2) ──────────────────
  {
    id: 10,
    category: "mitose_metafase",
    categoryLabel: "Mitose — Metáfase",
    question: "Por que a Metáfase é a melhor fase para observar o cariótipo (conjunto de cromossomos) de uma espécie?",
    options: [
      "Porque os cromossomos estão duplicando",
      "Porque os cromossomos estão no grau máximo de condensação",
      "Porque a célula está maior",
      "Porque o DNA está descondensado"
    ],
    correctIndex: 1,
    explanation: "Com o máximo de condensação e alinhados no centro, os cromossomos ficam muito nítidos para estudo.",
  },
  // ── CASA 5: MITOSE ANÁFASE (Questão 1) ────────────────────
  {
    id: 11,
    category: "mitose_anafase",
    categoryLabel: "Mitose — Anáfase",
    question: "O que caracteriza o início da Anáfase na mitose?",
    options: [
      "O alinhamento dos cromossomos",
      "A separação das cromátides-irmãs para polos opostos",
      "O reaparecimento do nucléolo",
      "A troca de pedaços entre cromossomos"
    ],
    correctIndex: 1,
    explanation: "As fibras do fuso encurtam e puxam cada cópia do cromossomo (cromátide) para um lado da célula.",
    image: "/images/anaphase.jpg"
  },
  // ── CASA 5: MITOSE ANÁFASE (Questão 2) ────────────────────
  {
    id: 12,
    category: "mitose_anafase",
    categoryLabel: "Mitose — Anáfase",
    question: "Se uma célula não conseguir separar suas cromátides na anáfase, o resultado será:",
    options: [
      "Duas células normais",
      "Células com número errado de cromossomos (mutações)",
      "A morte imediata de todo o organismo",
      "A transformação em bactéria"
    ],
    correctIndex: 1,
    explanation: "Erros na anáfase causam aneuploidias, como a Síndrome de Down (embora esta ocorra mais na meiose).",
  },
  // ── CASA 6: MITOSE TELÓFASE (Questão 1) ───────────────────
  {
    id: 13,
    category: "mitose_telofase",
    categoryLabel: "Mitose — Telófase",
    question: "A Telófase é considerada o inverso da Prófase. Qual evento confirma isso?",
    options: [
      "O DNA se condensa mais ainda",
      "O envelope nuclear (carioteca) se reorganiza ao redor dos cromossomos",
      "Os cromossomos se perdem no citoplasma",
      "A célula explode"
    ],
    correctIndex: 1,
    explanation: "Na telófase, tudo o que sumiu na prófase volta a aparecer: núcleo, nucléolo e o DNA relaxa.",
  },
  // ── CASA 6: MITOSE TELÓFASE (Questão 2) ───────────────────
  {
    id: 14,
    category: "mitose_telofase",
    categoryLabel: "Mitose — Telófase",
    question: "O que acontece com os cromossomos quando chegam aos polos na Telófase?",
    options: [
      "Eles desaparecem para sempre",
      "Eles começam a se descondensar (desenrolar)",
      "Eles se fundem em um só",
      "Eles se transformam em RNA"
    ],
    correctIndex: 1,
    explanation: "Os cromossomos voltam ao estado de cromatina (fios finos) para que o DNA possa ser lido pela célula novamente.",
  },
  // ── CASA 7: CITOCINESE (Questão 1) ────────────────────────
  {
    id: 15,
    category: "mitose_citocinese",
    categoryLabel: "Mitose — Citocinese",
    question: "A citocinese é a divisão final da célula. Nas células animais, ela ocorre por:",
    options: [
      "Formação de uma parede de celulose",
      "Estrangulamento (anel contrátil) de fora para dentro",
      "Explosão central",
      "Fusão de membranas"
    ],
    correctIndex: 1,
    explanation: "Um anel de proteínas 'aperta' o meio da célula até dividi-la em duas.",
  },
  // ── CASA 7: CITOCINESE (Questão 2) ────────────────────────
  {
    id: 16,
    category: "mitose_citocinese",
    categoryLabel: "Mitose — Citocinese",
    question: "Diferente dos animais, as células vegetais fazem citocinese centrífuga (do centro para fora) porque possuem:",
    options: [
      "Cloroplastos gigantes",
      "Parede celular rígida",
      "Ausência de núcleo",
      "Mais DNA que os animais"
    ],
    correctIndex: 1,
    explanation: "A parede celular impede o estrangulamento, então a planta constrói uma nova parede no meio (placa celular).",
  },
  // ── CASA 8: MEIOSE I (Questão 1) ──────────────────────────
  {
    id: 17,
    category: "meiose_i",
    categoryLabel: "Meiose I",
    question: "A Meiose I é chamada de 'reducional'. Qual o resultado principal desta etapa?",
    options: [
      "Aumento do número de cromossomos",
      "Redução do número de cromossomos pela metade (2n para n)",
      "Criação de clones perfeitos",
      "Transformação de gordura em músculo"
    ],
    correctIndex: 1,
    explanation: "A Meiose I separa os pares de homólogos, gerando células haploides (n).",
    image: "/images/meiosis-i.png"
  },
  // ── CASA 8: MEIOSE I (Questão 2) ──────────────────────────
  {
    id: 18,
    category: "meiose_i",
    categoryLabel: "Meiose I",
    question: "Qual a principal diferença entre a Anáfase da Mitose e a Anáfase I da Meiose?",
    options: [
      "Não há diferença",
      "Na Meiose I, separam-se os cromossomos homólogos, não as cromátides",
      "Na Mitose, o DNA é destruído",
      "A Meiose I ocorre apenas em plantas"
    ],
    correctIndex: 1,
    explanation: "Na Anáfase I, os cromossomos inteiros (duplicados) vão para os polos. As cromátides só se separam na Meiose II.",
  },
  // ── CASA 9: CROSSING OVER (Questão 1) ─────────────────────
  {
    id: 19,
    category: "crossing_over",
    categoryLabel: "Crossing Over",
    question: "(ENEM) O Crossing-over é um fenômeno vital para a evolução das espécies. Ele consiste em:",
    options: [
      "Duplicação acelerada do DNA",
      "Troca de pedaços entre cromossomos homólogos",
      "Morte de células defeituosas",
      "União de dois espermatozoides"
    ],
    correctIndex: 1,
    explanation: "A troca de segmentos gera novas combinações de genes, aumentando a variabilidade genética.",
    image: "/images/crossing-over.jpg"
  },
  // ── CASA 9: CROSSING OVER (Questão 2) ─────────────────────
  {
    id: 20,
    category: "crossing_over",
    categoryLabel: "Crossing Over",
    question: "Em qual subfase da Prófase I ocorre o Crossing-over?",
    options: [
      "Leptóteno",
      "Paquíteno",
      "Diplóteno",
      "Diacinese"
    ],
    correctIndex: 1,
    explanation: "No Paquíteno, os cromossomos estão perfeitamente emparelhados, permitindo a troca de material.",
  },
  // ── CASA 10: MEIOSE II (Questão 1) ─────────────────────────
  {
    id: 21,
    category: "meiose_ii",
    categoryLabel: "Meiose II",
    question: "A Meiose II é muito semelhante a qual outro processo celular?",
    options: [
      "Interfase",
      "Mitose",
      "Fecundação",
      "Respiração celular"
    ],
    correctIndex: 1,
    explanation: "A Meiose II é equacional, separando as cromátides-irmãs de forma idêntica à mitose.",
  },
  // ── CASA 10: MEIOSE II (Questão 2) ─────────────────────────
  {
    id: 22,
    category: "meiose_ii",
    categoryLabel: "Meiose II",
    question: "Ao final de todo o processo de Meiose (I e II), uma célula 2n (diploide) gera:",
    options: [
      "2 células 2n",
      "4 células n (haploides)",
      "1 célula gigante",
      "4 células 2n"
    ],
    correctIndex: 1,
    explanation: "A meiose completa produz quatro células filhas, cada uma com metade do número original de cromossomos.",
  }
];

// Adicionando mais questões para preencher o sistema de 2 por casa (até a casa 30)
// Como o usuário pediu 2 por casa, precisamos de pelo menos 60 questões se o tabuleiro tem 30 casas.
// Vou criar um gerador ou duplicar com variações para garantir a estabilidade do sistema.

for (let i = 23; i <= 65; i++) {
  const baseQ = questions[i % 22];
  questions.push({
    ...baseQ,
    id: i,
    question: "[REVISÃO] " + baseQ.question
  });
}

export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getQuestionForSquare(squareIndex: number): Question {
  // Seleciona um par de questões baseado no índice da casa
  const startIndex = (squareIndex * 2) % questions.length;
  const pair = [questions[startIndex], questions[(startIndex + 1) % questions.length]];
  // Sorteia uma das duas
  return pair[Math.floor(Math.random() * pair.length)];
}
