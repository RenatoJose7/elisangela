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
      "Metade das células-filhas será radioativa e a outra metade não",
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
    id: 10,
    category: "mitose_profase",
    categoryLabel: "Mitose — Prófase",
    question:
      "(ENEM adaptado) Um pesquisador observou ao microscópio uma célula animal em divisão com cromossomos condensados, nucléolo ausente e fuso mitótico em formação, mas com o envelope nuclear ainda parcialmente intacto. Essa célula está em qual fase?",
    options: [
      "Metáfase",
      "Prometáfase (prófase tardia)",
      "Anáfase",
      "Telófase",
    ],
    correctIndex: 1,
    explanation:
      "A descrição corresponde à prometáfase (ou prófase tardia), quando os cromossomos já estão condensados, o nucléolo desapareceu e o fuso está se formando, mas o envelope nuclear ainda está em processo de fragmentação. Na metáfase, o envelope nuclear já está completamente desintegrado e os cromossomos estão alinhados na placa equatorial.",
  },

  // ── MITOSE — METÁFASE ─────────────────────────────────────
  {
    id: 11,
    category: "mitose_metafase",
    categoryLabel: "Mitose — Metáfase",
    question:
      "A metáfase é considerada a fase ideal para a análise do cariótipo humano. Por que os cromossomos são mais facilmente estudados nessa fase?",
    options: [
      "Porque os cromossomos estão em processo de duplicação, facilitando a contagem",
      "Porque os cromossomos estão no máximo de condensação e alinhados na placa equatorial, permitindo visualização clara de sua morfologia",
      "Porque o envelope nuclear está intacto, protegendo os cromossomos de danos",
      "Porque as cromátides-irmãs já se separaram, reduzindo a complexidade da análise",
    ],
    correctIndex: 1,
    explanation:
      "Na metáfase, os cromossomos atingem o máximo de condensação e se alinham na placa metafásica (equatorial), onde ficam suspensos pelas fibras do fuso ligadas aos cinetócoros. Essa organização permite visualizar claramente o número, tamanho e morfologia de cada cromossomo, sendo ideal para a elaboração do cariótipo.",
  },
  {
    id: 12,
    category: "mitose_metafase",
    categoryLabel: "Mitose — Metáfase",
    question:
      "O checkpoint da metáfase (spindle assembly checkpoint — SAC) é um mecanismo de controle essencial. Ele é ativado quando:",
    options: [
      "Os cromossomos estão todos corretamente ligados ao fuso mitótico",
      "Há cromossomos com cinetócoros não ligados ou incorretamente ligados às fibras do fuso",
      "O DNA apresenta danos causados por radiação",
      "A célula não atingiu tamanho suficiente para a divisão",
    ],
    correctIndex: 1,
    explanation:
      "O SAC (Spindle Assembly Checkpoint) monitora a ligação correta dos cinetócoros às fibras do fuso. Enquanto houver cinetócoros livres ou mal ligados, o complexo mitótico de checkpoint (MCC) inibe o APC/C, impedindo a degradação da securina e da ciclina B. Isso bloqueia a separação das cromátides e a saída da metáfase, garantindo a distribuição correta dos cromossomos.",
  },

  // ── MITOSE — ANÁFASE ──────────────────────────────────────
  {
    id: 13,
    category: "mitose_anafase",
    categoryLabel: "Mitose — Anáfase",
    question:
      "Na anáfase da mitose, as cromátides-irmãs se separam e migram para polos opostos da célula. Qual proteína é degradada para permitir o início da anáfase?",
    options: [
      "Tubulina, permitindo a despolimerização do fuso",
      "Securina, liberando a separase que cliva a coesina",
      "Ciclina D, ativando o complexo CDK4/6",
      "Histona H3, descondensando os cromossomos",
    ],
    correctIndex: 1,
    explanation:
      "A transição metáfase-anáfase é desencadeada pela ativação do APC/C (Complexo Promotor de Anáfase), que ubiquitina e marca para degradação a securina. A securina é um inibidor da separase. Com sua degradação, a separase fica ativa e cliva a coesina (proteína que mantém as cromátides-irmãs unidas), permitindo a separação e migração para os polos.",
  },
  {
    id: 14,
    category: "mitose_anafase",
    categoryLabel: "Mitose — Anáfase",
    question:
      "Uma célula humana normal com 46 cromossomos está na anáfase da mitose. Quantas cromátides estão sendo puxadas para cada polo nesse momento?",
    options: ["23", "46", "92", "184"],
    correctIndex: 1,
    explanation:
      "Na anáfase da mitose, as 46 cromátides de cada polo (que eram cromátides-irmãs) se separam. Como cada cromossomo tinha 2 cromátides, e há 46 cromossomos, há 92 cromátides no total — 46 migrando para cada polo. Ao final da mitose, cada célula-filha terá 46 cromossomos (cada um com uma única cromátide).",
  },

  // ── MITOSE — TELÓFASE ─────────────────────────────────────
  {
    id: 15,
    category: "mitose_telofase",
    categoryLabel: "Mitose — Telófase",
    question:
      "A telófase é a última fase da divisão nuclear (cariocinese). Quais eventos caracterizam essa fase?",
    options: [
      "Condensação máxima dos cromossomos e formação do fuso mitótico",
      "Descondensação dos cromossomos, reconstituição do envelope nuclear e reaparecimento do nucléolo",
      "Separação das cromátides-irmãs e formação do anel contrátil",
      "Alinhamento dos cromossomos na placa equatorial",
    ],
    correctIndex: 1,
    explanation:
      "Na telófase, os cromossomos chegam aos polos e começam a se descondenssar. O envelope nuclear se reconstitui ao redor de cada conjunto de cromossomos, o nucléolo reaparece e as fibras do fuso se despolimerizam. Essa fase marca o fim da cariocinese (divisão do núcleo), que será seguida pela citocinese (divisão do citoplasma).",
  },

  // ── MITOSE — CITOCINESE ───────────────────────────────────
  {
    id: 16,
    category: "mitose_citocinese",
    categoryLabel: "Mitose — Citocinese",
    question:
      "A citocinese difere entre células animais e vegetais. Qual é a principal diferença no mecanismo de divisão citoplasmática entre esses dois tipos celulares?",
    options: [
      "Células animais formam a placa celular, enquanto células vegetais formam o anel contrátil",
      "Células animais formam o anel contrátil de actina e miosina, enquanto células vegetais formam a placa celular (fragmoplasto)",
      "Ambas formam o anel contrátil, mas com proteínas diferentes",
      "Células vegetais não realizam citocinese, apenas cariocinese",
    ],
    correctIndex: 1,
    explanation:
      "Em células animais, a citocinese ocorre por estrangulamento: um anel contrátil de filamentos de actina e miosina se forma na região equatorial e se contrai, dividindo a célula. Em células vegetais, a parede celular rígida impede esse mecanismo; em vez disso, vesículas do complexo de Golgi se fundem na região equatorial, formando a placa celular (fragmoplasto), que origina a nova parede celular.",
  },
  {
    id: 17,
    category: "mitose_citocinese",
    categoryLabel: "Mitose — Citocinese",
    question:
      "(ENEM adaptado) Em determinadas condições experimentais, a cariocinese ocorre normalmente, mas a citocinese é inibida. Qual seria o resultado desse processo?",
    options: [
      "Células com metade do número normal de cromossomos",
      "Células binucleadas (com dois núcleos) ou células com múltiplos núcleos (polinucleadas)",
      "Células que entram imediatamente em apoptose",
      "Células com DNA de fita simples",
    ],
    correctIndex: 1,
    explanation:
      "Se a cariocinese (divisão nuclear) ocorre normalmente mas a citocinese (divisão citoplasmática) é bloqueada, os dois núcleos formados permanecem dentro da mesma célula, resultando em células binucleadas. Se esse processo se repetir, a célula pode se tornar polinucleada. Esse fenômeno ocorre naturalmente em algumas células, como os osteoclastos e as fibras musculares esqueléticas.",
  },

  // ── MEIOSE I ──────────────────────────────────────────────
  {
    id: 18,
    category: "meiose_i",
    categoryLabel: "Meiose I",
    question:
      "A meiose I é denominada divisão reducional porque reduz o número de cromossomos à metade. O que ocorre especificamente na anáfase I que justifica essa denominação?",
    options: [
      "As cromátides-irmãs se separam, como na mitose",
      "Os cromossomos homólogos (bivalentes) se separam e migram para polos opostos, mantendo as cromátides-irmãs unidas",
      "O DNA é replicado pela segunda vez para garantir material suficiente",
      "Os cromossomos se descondensam e o envelope nuclear se reconstitui",
    ],
    correctIndex: 1,
    explanation:
      "Na anáfase I, os cromossomos homólogos (que formaram os bivalentes durante a prófase I) se separam e migram para polos opostos. Crucialmente, as cromátides-irmãs permanecem unidas pelo centrômero. Isso reduz o número de cromossomos de 2n para n em cada polo. A separação das cromátides-irmãs só ocorre na anáfase II.",
  },
  {
    id: 19,
    category: "meiose_i",
    categoryLabel: "Meiose I",
    question:
      "A prófase I da meiose é a fase mais longa e complexa da meiose. Ela é subdividida em cinco estágios. O estágio em que ocorre o crossing over é:",
    options: ["Leptóteno", "Zigóteno", "Paquíteno", "Diplóteno"],
    correctIndex: 2,
    explanation:
      "O crossing over ocorre no paquíteno, quando os cromossomos homólogos estão completamente pareados formando os bivalentes (tétrades). As cromátides não-irmãs se entrelaçam nos quiasmas e trocam segmentos de DNA. No diplóteno, os homólogos começam a se repelir, mas permanecem unidos nos quiasmas, que são as marcas visíveis do crossing over.",
  },
  {
    id: 20,
    category: "meiose_i",
    categoryLabel: "Meiose I",
    question:
      "(ENEM 2015 adaptado) Uma espécie de organismo possui 2n = 8 cromossomos. Após a meiose I completa, cada célula resultante conterá:",
    options: [
      "8 cromossomos, cada um com uma cromátide",
      "4 cromossomos, cada um com duas cromátides-irmãs",
      "8 cromossomos, cada um com duas cromátides-irmãs",
      "2 cromossomos, cada um com quatro cromátides",
    ],
    correctIndex: 1,
    explanation:
      "Após a meiose I (divisão reducional), o número de cromossomos é reduzido à metade: de 2n=8 para n=4. Porém, cada cromossomo ainda possui duas cromátides-irmãs unidas pelo centrômero (pois a separação das cromátides ocorre apenas na meiose II). Portanto, cada célula terá 4 cromossomos, cada um com 2 cromátides.",
  },

  // ── MEIOSE II ─────────────────────────────────────────────
  {
    id: 21,
    category: "meiose_ii",
    categoryLabel: "Meiose II",
    question:
      "A meiose II é semelhante à mitose em seus mecanismos. Qual é a principal diferença entre a meiose II e uma mitose convencional?",
    options: [
      "Na meiose II, ocorre nova replicação do DNA antes da divisão",
      "Na meiose II, as células que se dividem são haploides (n), enquanto na mitose as células são diploides (2n)",
      "Na meiose II, os cromossomos homólogos se separam, enquanto na mitose as cromátides-irmãs se separam",
      "A meiose II não forma fuso mitótico",
    ],
    correctIndex: 1,
    explanation:
      "A meiose II é mecanicamente semelhante à mitose: as cromátides-irmãs se separam na anáfase II, como na anáfase mitótica. A principal diferença é que as células que entram na meiose II são haploides (n cromossomos, cada um com 2 cromátides), enquanto as células que realizam mitose são normalmente diploides (2n). Além disso, não há replicação de DNA entre meiose I e meiose II.",
  },
  {
    id: 22,
    category: "meiose_ii",
    categoryLabel: "Meiose II",
    question:
      "Considerando uma célula humana com 2n = 46 cromossomos que inicia a meiose, ao final da meiose II completa, quantas células serão produzidas e qual será o número de cromossomos em cada uma?",
    options: [
      "2 células com 46 cromossomos cada",
      "4 células com 23 cromossomos cada",
      "4 células com 46 cromossomos cada",
      "2 células com 23 cromossomos cada",
    ],
    correctIndex: 1,
    explanation:
      "A meiose completa produz 4 células haploides. A meiose I divide a célula diploide (2n=46) em duas células haploides (n=23, cada uma com cromossomos de 2 cromátides). A meiose II divide cada uma dessas células em duas, separando as cromátides-irmãs. Resultado final: 4 células com n=23 cromossomos cada (com 1 cromátide por cromossomo).",
  },
  {
    id: 23,
    category: "meiose_ii",
    categoryLabel: "Meiose II",
    question:
      "(ENEM adaptado) Em um erro meiótico conhecido como não-disjunção na meiose II, as cromátides-irmãs de um cromossomo não se separam. Qual seria o resultado em termos de número de cromossomos nas células produzidas?",
    options: [
      "Duas células normais (n) e duas células aneuploides (uma com n+1 e outra com n-1)",
      "Quatro células com número anormal de cromossomos",
      "Duas células com 2n cromossomos e duas células sem cromossomos",
      "Nenhuma alteração, pois o erro é corrigido pelo checkpoint",
    ],
    correctIndex: 0,
    explanation:
      "Na não-disjunção na meiose II, apenas uma das duas células que entram na meiose II sofre o erro. Dessa célula, resultam duas células aneuploides: uma com n+1 (recebeu as duas cromátides que deveriam se separar) e outra com n-1 (não recebeu nenhuma cromátide). As outras duas células, provenientes da célula que realizou a meiose II corretamente, são normais (n).",
  },

  // ── CROSSING OVER ─────────────────────────────────────────
  {
    id: 24,
    category: "crossing_over",
    categoryLabel: "Crossing Over",
    question:
      "O crossing over (recombinação homóloga) é um processo fundamental que ocorre durante a meiose. Qual é a principal importância biológica desse processo?",
    options: [
      "Garantir que as células-filhas recebam exatamente o mesmo material genético da célula-mãe",
      "Aumentar a variabilidade genética ao criar novas combinações de alelos nos cromossomos recombinantes",
      "Corrigir erros de replicação do DNA ocorridos na fase S",
      "Reduzir o número de cromossomos à metade durante a meiose I",
    ],
    correctIndex: 1,
    explanation:
      "O crossing over é fundamental para a variabilidade genética: ao trocar segmentos entre cromátides não-irmãs de cromossomos homólogos, cria novas combinações de alelos que não existiam nos cromossomos parentais. Isso gera gametas com combinações únicas de genes, sendo uma das principais fontes de variação genética em organismos de reprodução sexuada, essencial para a evolução.",
  },
  {
    id: 25,
    category: "crossing_over",
    categoryLabel: "Crossing Over",
    question:
      "O crossing over ocorre entre cromátides não-irmãs de cromossomos homólogos. Qual estrutura proteica facilita o alinhamento preciso dos cromossomos homólogos durante a prófase I, permitindo que o crossing over ocorra?",
    options: [
      "Centrômero",
      "Complexo sinaptonêmico",
      "Cinetócoro",
      "Fuso mitótico",
    ],
    correctIndex: 1,
    explanation:
      "O complexo sinaptonêmico é uma estrutura proteica tripartite que se forma entre os cromossomos homólogos durante o zigóteno e paquíteno da prófase I. Ele funciona como um 'zíper molecular', alinhando precisamente os homólogos ao longo de toda sua extensão, o que é essencial para que o crossing over ocorra em posições correspondentes. Sem o complexo sinaptonêmico, a recombinação homóloga seria imprecisa.",
  },
  {
    id: 26,
    category: "crossing_over",
    categoryLabel: "Crossing Over",
    question:
      "(ENEM 2018 adaptado) Dois genes, A e B, estão localizados no mesmo cromossomo (ligados). Após análise de descendentes de um cruzamento, observou-se que uma pequena porcentagem apresentava combinações de alelos diferentes das parentais (recombinantes). Isso ocorre porque:",
    options: [
      "Os genes ligados sempre se separam durante a meiose I",
      "O crossing over entre os loci dos genes A e B durante a prófase I pode separar alelos que estavam no mesmo cromossomo",
      "A mutação espontânea alterou os alelos durante a replicação do DNA",
      "A assortação independente de Mendel se aplica a genes ligados",
    ],
    correctIndex: 1,
    explanation:
      "Genes ligados (no mesmo cromossomo) tendem a ser herdados juntos, mas o crossing over pode separar alelos que estavam no mesmo cromossomo. A frequência de recombinação entre dois genes é proporcional à distância entre eles no cromossomo — quanto mais distantes, maior a chance de crossing over entre eles. Isso é a base da cartografia genética (mapeamento de genes).",
  },
  {
    id: 27,
    category: "crossing_over",
    categoryLabel: "Crossing Over",
    question:
      "Considere uma célula com 2n = 4 (dois pares de cromossomos homólogos). Desconsiderando o crossing over, quantas combinações diferentes de cromossomos são possíveis nos gametas produzidos pela assortação independente?",
    options: ["2", "4", "8", "16"],
    correctIndex: 1,
    explanation:
      "Para cada par de homólogos, há 2 possibilidades de qual cromossomo vai para cada gameta. Com 2 pares independentes, o número de combinações é 2² = 4. Para humanos (n=23 pares), seriam 2²³ ≈ 8,4 milhões de combinações apenas pela assortação independente — sem contar o crossing over, que aumenta exponencialmente a variabilidade.",
  },
  {
    id: 28,
    category: "meiose_i",
    categoryLabel: "Meiose I",
    question:
      "A sinapsis é o processo de pareamento de cromossomos homólogos durante a prófase I da meiose. Qual é a consequência direta de uma falha na sinapsis?",
    options: [
      "Aumento do número de gametas produzidos",
      "Impossibilidade de crossing over e possível não-disjunção, levando a gametas com número anormal de cromossomos",
      "Aceleração da meiose II",
      "Transformação da meiose em mitose",
    ],
    correctIndex: 1,
    explanation:
      "A sinapsis correta é pré-requisito para o crossing over e para a segregação adequada dos cromossomos homólogos. Se a sinapsis falha, os cromossomos não se alinham corretamente, o crossing over não ocorre ou ocorre em posições erradas, e a segregação na anáfase I é comprometida. Isso resulta em não-disjunção e gametas aneuploides, que podem originar zigotos com síndromes cromossômicas (como a Síndrome de Down, com trissomia do cromossomo 21).",
  },
  {
    id: 29,
    category: "mitose_profase",
    categoryLabel: "Mitose — Prófase",
    question:
      "Os centrossomos desempenham papel fundamental na organização do fuso mitótico. Em células animais, os centrossomos são duplicados durante:",
    options: [
      "A prófase, quando o fuso começa a se formar",
      "A fase S da interfase, concomitantemente à replicação do DNA",
      "A metáfase, quando os cromossomos se alinham",
      "A telófase, para preparar as células-filhas",
    ],
    correctIndex: 1,
    explanation:
      "Os centrossomos são duplicados durante a fase S da interfase, ao mesmo tempo em que o DNA é replicado. Cada centrossomo duplicado consiste em dois centríolos. Na prófase, os dois centrossomos se separam e migram para polos opostos, nucleando os microtúbulos que formarão o fuso mitótico.",
  },
  {
    id: 30,
    category: "mitose_citocinese",
    categoryLabel: "Mitose — Citocinese",
    question:
      "(ENEM adaptado) A colchicina é um alcaloide que inibe a polimerização de tubulinas, impedindo a formação do fuso mitótico. Se células em divisão forem tratadas com colchicina, qual será o resultado esperado?",
    options: [
      "As células completarão a mitose normalmente, pois o fuso não é essencial",
      "As células ficarão bloqueadas na metáfase, com cromossomos condensados mas sem segregação",
      "As células entrarão em apoptose imediatamente",
      "A replicação do DNA será inibida",
    ],
    correctIndex: 1,
    explanation:
      "A colchicina impede a formação do fuso mitótico ao inibir a polimerização das tubulinas. Sem o fuso, as fibras não conseguem se ligar aos cinetócoros dos cromossomos. O checkpoint de montagem do fuso (SAC) é ativado e bloqueia a célula na metáfase — os cromossomos ficam condensados mas não conseguem segregar. Essa propriedade é usada em citogenética para obter preparações com cromossomos em metáfase para análise de cariótipos.",
  },
];

export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getQuestionForSquare(squareIndex: number): Question {
  return questions[squareIndex % questions.length];
}
