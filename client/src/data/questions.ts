// ============================================================
// COSMIC CELL INVASION — Banco de Perguntas
// Estilo: Arcade Cósmico Neon Brutalist
// Nível: ENEM / 3º Ano Ensino Médio
// Temas: Interfase (G1, S, G2), Mitose, Meiose I e II, Crossing Over
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
  // ── INTERFASE G1 ──────────────────────────────────────────
  {
    id: 1,
    category: "interfase_g1",
    categoryLabel: "Interfase — G1",
    question:
      "Durante a fase G1 da interfase, a célula realiza intensa síntese proteica e crescimento citoplasmático. Qual é o principal evento que caracteriza essa fase e a distingue das demais subfases da interfase?",
    options: [
      "A duplicação do DNA cromossômico",
      "O crescimento celular e a produção de proteínas necessárias para a divisão",
      "A condensação dos cromossomos em preparação para a mitose",
      "A separação das cromátides-irmãs",
    ],
    correctIndex: 1,
    explanation:
      "A fase G1 (Gap 1) é marcada pelo intenso crescimento celular e síntese de proteínas e organelas. A célula aumenta de tamanho e produz os componentes necessários para a futura divisão. A duplicação do DNA ocorre na fase S, e a condensação dos cromossomos ocorre na prófase da mitose.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663455764094/i5Xqf5jxVFYckbTeTeoqYj/cell-interphase-g1-VVCrw7LRbBJfKQe3tWuWMP.webp",
  },
  {
    id: 2,
    category: "interfase_g1",
    categoryLabel: "Interfase — G1",
    question:
      "O ponto de restrição (ponto R) é um checkpoint crucial localizado na fase G1. Sobre esse mecanismo de controle do ciclo celular, é CORRETO afirmar que:",
    options: [
      "Verifica se o DNA foi corretamente duplicado antes de prosseguir para a fase S",
      "Avalia se a célula tem tamanho e recursos suficientes para comprometer-se com a divisão celular",
      "Controla a separação dos cromossomos durante a anáfase",
      "Regula exclusivamente a apoptose em células tumorais",
    ],
    correctIndex: 1,
    explanation:
      "O ponto de restrição (R) em G1 é o principal checkpoint onde a célula avalia se possui tamanho, nutrientes e sinais de crescimento suficientes para se comprometer com a divisão. Se as condições não forem favoráveis, a célula entra em G0 (quiescência). A verificação da duplicação do DNA ocorre no checkpoint G2/M.",
  },
  {
    id: 3,
    category: "interfase_g1",
    categoryLabel: "Interfase — G1",
    question:
      "(ENEM adaptado) Células-tronco embrionárias possuem ciclos celulares muito curtos, com fase G1 extremamente reduzida. Isso ocorre porque:",
    options: [
      "Essas células não precisam crescer antes de se dividir, pois já possuem todos os recursos necessários",
      "A fase G1 curta impede a ocorrência de mutações no DNA",
      "Células embrionárias realizam meiose em vez de mitose",
      "A ausência de G1 garante maior variabilidade genética",
    ],
    correctIndex: 0,
    explanation:
      "Em células-tronco embrionárias, a G1 é muito curta porque essas células já possuem reservas maternas de proteínas, mRNAs e organelas suficientes para sustentar múltiplas divisões sem necessidade de crescimento prévio. Isso permite divisões rápidas durante o desenvolvimento embrionário precoce.",
  },

  // ── INTERFASE S ───────────────────────────────────────────
  {
    id: 4,
    category: "interfase_s",
    categoryLabel: "Interfase — Fase S",
    question:
      "A fase S (síntese) da interfase é caracterizada pela replicação semiconservativa do DNA. Ao final dessa fase, uma célula humana somática com 46 cromossomos apresentará:",
    options: [
      "46 cromossomos, cada um com duas cromátides-irmãs unidas pelo centrômero",
      "92 cromossomos independentes",
      "23 cromossomos duplicados e 23 não duplicados",
      "46 cromossomos com DNA de fita simples",
    ],
    correctIndex: 0,
    explanation:
      "Após a fase S, cada um dos 46 cromossomos passa a ser formado por duas cromátides-irmãs geneticamente idênticas, unidas pelo centrômero. O número de cromossomos permanece 46, mas o conteúdo de DNA dobra (de 2n para 4C). As cromátides só se separam na anáfase da mitose.",
  },
  {
    id: 5,
    category: "interfase_s",
    categoryLabel: "Interfase — Fase S",
    question:
      "A replicação do DNA na fase S é semiconservativa. Isso significa que, após uma rodada de replicação:",
    options: [
      "As duas fitas da dupla-hélice original são destruídas e duas novas são sintetizadas",
      "Cada molécula-filha contém uma fita parental e uma fita nova",
      "Apenas metade do DNA é replicada por ciclo celular",
      "A replicação ocorre de forma aleatória, sem padrão definido",
    ],
    correctIndex: 1,
    explanation:
      "Na replicação semiconservativa, as duas fitas da dupla-hélice parental se separam, e cada uma serve de molde para a síntese de uma nova fita complementar. Assim, cada molécula-filha contém uma fita original (parental) e uma fita recém-sintetizada. Esse modelo foi comprovado pelo experimento de Meselson e Stahl (1958).",
  },
  {
    id: 6,
    category: "interfase_s",
    categoryLabel: "Interfase — Fase S",
    question:
      "(ENEM 2019 adaptado) A timidina tritiada é um análogo radioativo da timina que se incorpora ao DNA durante a replicação. Se células em cultura forem expostas a timidina tritiada durante a fase S e, em seguida, lavadas com timidina não radioativa, qual será o resultado após uma divisão mitótica completa?",
    options: [
      "Todas as células-filhas serão radioativas",
      "Nenhuma célula-filha será radioativa",
      "Metade das células-filhas será radioativas e a outra metade não",
      "Apenas as células que completaram a fase S serão radioativas",
    ],
    correctIndex: 0,
    explanation:
      "Como a replicação é semiconservativa, após a fase S com timidina tritiada, cada cromossomo terá uma cromátide com DNA marcado e outra sem marcação. Após a mitose, cada célula-filha receberá um cromossomo com uma cromátide marcada — portanto, TODAS as células-filhas serão radioativas, mas com metade do sinal original.",
  },

  // ── INTERFASE G2 ──────────────────────────────────────────
  {
    id: 7,
    category: "interfase_g2",
    categoryLabel: "Interfase — G2",
    question:
      "A fase G2 da interfase precede imediatamente a mitose. Qual é a principal função dessa fase no ciclo celular?",
    options: [
      "Duplicar o DNA para garantir que cada célula-filha receba o material genético completo",
      "Verificar a integridade do DNA replicado e sintetizar proteínas necessárias para a divisão, como as tubulinas",
      "Realizar a citocinese e separar os citoplasmas das células-filhas",
      "Condensar os cromossomos e formar o fuso mitótico",
    ],
    correctIndex: 1,
    explanation:
      "Em G2, a célula verifica se o DNA foi corretamente duplicado (checkpoint G2/M), repara eventuais danos e sintetiza proteínas essenciais para a divisão, como as tubulinas (componentes do fuso mitótico) e as ciclinas mitóticas. A condensação dos cromossomos e a formação do fuso ocorrem na prófase da mitose.",
  },
  {
    id: 8,
    category: "interfase_g2",
    categoryLabel: "Interfase — G2",
    question:
      "O checkpoint G2/M é ativado quando há danos no DNA após a replicação. A proteína p53, um supressor tumoral, desempenha papel central nesse processo. Qual é a consequência direta da ativação desse checkpoint?",
    options: [
      "A célula acelera a mitose para corrigir os erros durante a divisão",
      "A célula é impedida de entrar em mitose até que os danos sejam reparados ou, em casos graves, é direcionada à apoptose",
      "A célula retorna à fase S para replicar novamente o DNA danificado",
      "O crossing over é ativado para aumentar a variabilidade genética",
    ],
    correctIndex: 1,
    explanation:
      "Quando o checkpoint G2/M detecta danos no DNA, a proteína p53 é estabilizada e ativa genes que bloqueiam a entrada em mitose (como o inibidor p21, que inativa o complexo Cdk1-Ciclina B). Isso dá tempo para o reparo do DNA. Se os danos forem irreparáveis, p53 ativa a via apoptótica, eliminando a célula danificada e prevenindo a transmissão de mutações.",
  },

  // ── MITOSE — PRÓFASE ──────────────────────────────────────
  {
    id: 9,
    category: "mitose_profase",
    categoryLabel: "Mitose — Prófase",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663388787907/dqhjFfoGYRSqrFWR.png",
    question:
      "A prófase é a primeira fase da mitose. Quais são os principais eventos que caracterizam essa fase?",
    options: [
      "Alinhamento dos cromossomos na placa metafásica e formação do fuso completo",
      "Condensação dos cromossomos, início da formação do fuso mitótico e desintegração do nucléolo",
      "Separação das cromátides-irmãs e migração para os polos opostos",
      "Descondensação dos cromossomos e reconstituição do envelope nuclear",
    ],
    correctIndex: 1,
    explanation:
      "Na prófase, os cromossomos (já duplicados na fase S) se condensam e tornam-se visíveis ao microscópio. O nucléolo desaparece, o fuso mitótico começa a se formar a partir dos centrossomos (que se duplicaram em G2), e o envelope nuclear começa a se fragmentar (na prometáfase, em eucariotos superiores).",
  },
  {
    id: 31,
    category: "mitose_metafase",
    categoryLabel: "Mitose — Metáfase",
    question: "Na metáfase mitótica, os cromossomos atingem seu grau máximo de condensação. Qual estrutura é responsável por conectar os microtúbulos do fuso aos cromossomos?",
    options: [
      "Centrossomo",
      "Cinetócoro",
      "Nucléolo",
      "Telômero"
    ],
    correctIndex: 1,
    explanation: "O cinetócoro é uma estrutura proteica localizada no centrômero de cada cromátide, onde os microtúbulos do fuso se ligam para orientar o movimento dos cromossomos.",
    image: "/images/metaphase.jpg"
  },
  {
    id: 32,
    category: "meiose_i",
    categoryLabel: "Meiose I",
    question: "A Meiose I é chamada de divisão reducional. Por que esse termo é utilizado para descrever essa etapa?",
    options: [
      "Porque reduz a quantidade de citoplasma nas células-filhas",
      "Porque reduz o número de cromossomos pela metade (de 2n para n)",
      "Porque reduz a velocidade de duplicação do DNA",
      "Porque reduz o tamanho dos cromossomos durante a anáfase"
    ],
    correctIndex: 1,
    explanation: "A Meiose I separa os cromossomos homólogos, resultando em duas células-filhas com metade do número original de cromossomos, passando de diploide (2n) para haploide (n).",
    image: "/images/meiosis-i.png"
  },
  {
    id: 33,
    category: "crossing_over",
    categoryLabel: "Crossing Over",
    question: "O crossing over (ou permutação) ocorre em qual subfase específica da Prófase I da Meiose?",
    options: [
      "Leptóteno",
      "Zigóteno",
      "Paquíteno",
      "Diplóteno"
    ],
    correctIndex: 2,
    explanation: "O crossing over, que é a troca de segmentos entre cromátides não-irmãs de cromossomos homólogos, ocorre durante o Paquíteno da Prófase I.",
    image: "/images/crossing-over.jpg"
  },
  {
    id: 34,
    category: "mitose_anafase",
    categoryLabel: "Mitose — Anáfase",
    question: "O que caracteriza a Anáfase da mitose e a diferencia da Anáfase I da meiose?",
    options: [
      "Na mitose ocorre a separação de cromossomos homólogos",
      "Na mitose ocorre a separação das cromátides-irmãs",
      "Na mitose os cromossomos se descondensam",
      "Na mitose o envelope nuclear se reconstitui"
    ],
    correctIndex: 1,
    explanation: "Na Anáfase da mitose, as cromátides-irmãs são separadas e puxadas para polos opostos. Na Anáfase I da meiose, são os cromossomos homólogos que se separam.",
    image: "/images/anaphase.jpg"
  },
  {
    id: 35,
    category: "interfase_s",
    categoryLabel: "Interfase — Fase S",
    question: "Se uma droga inibe a enzima DNA polimerase, em qual fase do ciclo celular a célula ficará estagnada?",
    options: [
      "G1",
      "S",
      "G2",
      "Mitose"
    ],
    correctIndex: 1,
    explanation: "A DNA polimerase é essencial para a replicação do DNA, que ocorre exclusivamente na fase S (Síntese) da interfase.",
    image: "/images/dna-replication.png"
  },
  {
    id: 36,
    category: "meiose_ii",
    categoryLabel: "Meiose II",
    question:
      "A Meiose II é frequentemente comparada à mitose. Qual é o principal evento que ocorre na Anáfase II da meiose?",
    options: [
      "Separação dos cromossomos homólogos",
      "Duplicação do DNA",
      "Separação das cromátides-irmãs",
      "Formação de tétrades e crossing over",
    ],
    correctIndex: 2,
    explanation:
      "Na Anáfase II da meiose, as cromátides-irmãs se separam e migram para os polos opostos da célula, de forma semelhante ao que ocorre na anáfase da mitose. Isso resulta na formação de quatro células haploides, cada uma com cromossomos simples.",
  },
  {
    id: 37,
    category: "meiose_ii",
    categoryLabel: "Meiose II",
    question:
      "Ao final da Meiose II, qual é o número de células e o tipo de ploidia (n ou 2n) esperado em um organismo diploide (2n) que iniciou o processo?",
    options: [
      "Duas células diploides (2n)",
      "Quatro células diploides (2n)",
      "Duas células haploides (n)",
      "Quatro células haploides (n)",
    ],
    correctIndex: 3,
    explanation:
      "A Meiose II resulta na formação de quatro células haploides (n), cada uma contendo um conjunto simples de cromossomos. Este é o resultado final da meiose, que produz gametas ou esporos.",
  },
  {
    id: 38,
    category: "mitose_citocinese",
    categoryLabel: "Mitose — Citocinese",
    question:
      "A citocinese é o processo de divisão do citoplasma que geralmente acompanha a mitose. Como esse processo difere entre células animais e vegetais?",
    options: [
      "Em células animais, forma-se uma placa celular; em vegetais, um anel contrátil.",
      "Em células animais, ocorre por invaginação da membrana; em vegetais, por formação de uma parede celular.",
      "Em células animais, envolve microtúbulos; em vegetais, microfilamentos.",
      "Em células animais, não ocorre citocinese; em vegetais, sim.",
    ],
    correctIndex: 1,
    explanation:
      "Em células animais, a citocinese ocorre por estrangulamento da membrana plasmática, formando um sulco de clivagem devido à contração de um anel de actina e miosina. Em células vegetais, a presença da parede celular impede o estrangulamento, e a citocinese ocorre pela formação de uma placa celular (fragmoplasto) no centro da célula, que se expande até fundir-se com a parede existente.",
  },
  {
    id: 39,
    category: "mitose_citocinese",
    categoryLabel: "Mitose — Citocinese",
    question:
      "Qual a principal consequência de uma falha na citocinese após a mitose?",
    options: [
      "Formação de células haploides",
      "Formação de células com múltiplos núcleos (multinucleadas)",
      "Aumento da taxa de mutação do DNA",
      "Redução do número de cromossomos",
    ],
    correctIndex: 1,
    explanation:
      "Se a mitose (divisão nuclear) ocorrer normalmente, mas a citocinese (divisão citoplasmática) falhar, a célula resultante terá dois ou mais núcleos, tornando-se multinucleada. Isso pode levar a problemas no funcionamento celular e está associado a certas condições patológicas.",
  },
  {
    id: 40,
    category: "mitose_telofase",
    categoryLabel: "Mitose — Telófase",
    question:
      "A telófase é a fase final da mitose. Quais eventos caracterizam essa fase?",
    options: [
      "Condensação dos cromossomos e formação do fuso mitótico",
      "Alinhamento dos cromossomos na placa metafásica",
      "Descondensação dos cromossomos, reconstituição do envelope nuclear e reaparecimento do nucléolo",
      "Separação das cromátides-irmãs e migração para os polos opostos",
    ],
    correctIndex: 2,
    explanation:
      "Na telófase, os cromossomos que chegaram aos polos opostos começam a se descondensar. O envelope nuclear se reconstitui ao redor de cada conjunto de cromossomos, e o nucléolo reaparece. O fuso mitótico se desintegra, e a citocinese geralmente começa durante ou logo após a telófase.",
  },
  {
    id: 41,
    category: "mitose_telofase",
    categoryLabel: "Mitose — Telófase",
    question:
      "Em qual fase do ciclo celular a célula retorna a um estado de menor atividade metabólica e prepara-se para a citocinese?",
    options: [
      "Prófase",
      "Metáfase",
      "Anáfase",
      "Telófase",
    ],
    correctIndex: 3,
    explanation:
      "A telófase marca o retorno da célula a um estado mais próximo da interfase, com a descondensação dos cromossomos e a reconstituição das estruturas nucleares. É também a fase em que a citocinese se inicia, dividindo o citoplasma e completando a formação das duas células-filhas.",
  },
];

export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getQuestionForSquare(squareIndex: number): Question {
  return questions[squareIndex % questions.length];
}
