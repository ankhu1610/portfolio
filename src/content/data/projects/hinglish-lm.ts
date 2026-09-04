import { Project } from "@/content/schemas/project.schema";

export const hinglishLmProject: Project = {
  title: "HinglishLM: Code-Mixed LLM Adaptation & Evaluation Platform",
  slug: "hinglish-lm",
  summary: "Research initiative investigating subword tokenizer fragmentation, vocabulary expansion, and parameter-efficient continued pretraining on Hindi-English code-mixed corpora.",
  researchQuestion: "How should tokenization and parameter-efficient adaptation be optimized for Hindi-English code-mixed language?",
  duration: "Aug. 2026 – Nov. 2026",
  status: "active",
  domain: "llm",
  tags: ["LLM", "Hinglish", "Tokenization", "Code-Mixing", "LoRA", "PyTorch", "Research"],
  technologies: ["PyTorch", "Python", "HuggingFace", "SentencePiece", "Qwen", "LoRA"],
  featured: false,
  links: {
    github: "https://github.com/ankhu1610/HinglishLM",
  },
  developmentStage: {
    implemented: [
      "Hinglish text normalization and script mixing telemetry pipeline (Romanized vs Devanagari script ratios).",
      "Empirical subword fertility and fragmentation analysis across standard English/multilingual tokenizers (Llama-3, Qwen-2.5).",
      "Custom BPE vocabulary merge learner on 250MB Hindi-English social media and colloquial dialogue dataset.",
    ],
    inExperiment: [
      "Vocabulary adaptation strategy: adding 4,096 domain Hinglish subwords to Qwen2.5-1.5B embedding matrix.",
      "Embedding initialization experiments: mean-pooling constituent subword vectors vs Gaussian initialization with variance matching.",
      "LoRA parameter-efficient continued pretraining on code-mixed corpus using Rank-16 adapters.",
    ],
    planned: [
      "Downstream benchmark evaluation: Sentiment Analysis, Machine Translation (Hinglish -> English), and Code-mixed Instruction Following.",
      "Systematic comparison: Base Model vs Fine-tuned vs Tokenizer-Adapted vs Continued Pretraining + LoRA.",
    ],
  },
  problem: "Over 500 million people across South Asia communicate in 'Hinglish' — fluidly mixing Hindi grammatical structures, Romanized Hindi phonetics, and English vocabulary within single sentences. Standard large language models treat Romanized Hindi words as unknown or rare strings, fragmenting common words (e.g. 'karenge' into ['k', 'ar', 'eng', 'e']), inflating sequence lengths, degrading contextual reasoning, and drastically multiplying inference compute costs.",
  motivation: "Rather than treating code-mixing as noisy text to be translated, this research investigates the linguistic and computational foundations of code-mixed representations. We systematically trace how subword fragmentation impacts downstream cross-entropy loss, derive optimal vocabulary expansion boundaries, explore stable embedding initialization techniques, and evaluate parameter-efficient continued pretraining strategies.",
  architecture: {
    caption: "HinglishLM Research Pipeline: Corpus Normalization, Subword Fertility Analysis, BPE Merge Extraction, Embedding Initialization, and PEFT Continued Pretraining.",
    description: "The research pipeline transitions from empirical linguistic telemetry to architectural adaptation: (1) Corpus normalization, (2) Subword fertility and fragmentation profiling, (3) Vocabulary expansion via custom BPE merges, (4) Constituent mean-pooled embedding initialization, and (5) LoRA-based continued pretraining.",
    svgPath: "/images/projects/hinglish-lm/architecture.svg",
    components: [
      {
        name: "Code-Mixed Corpus Normalizer",
        role: "Text Cleansing & Script Balance",
        implementationDetail: "Regex-based pipeline that cleans colloquial phonetic spelling noise, classifies Romanized vs Devanagari distributions, and normalizes contractions.",
        nodeId: "normalizer-node",
      },
      {
        name: "Subword Fertility Profiler",
        role: "Fragmentation Telemetry & Analysis",
        implementationDetail: "Analyzes token-to-word ratios, character-per-token compression rates, and out-of-vocabulary fallback frequencies across standard LLM tokenizers.",
        nodeId: "profiler-node",
        benchmarkLink: "/lab/benchmarks#tokenization-fertility",
      },
      {
        name: "BPE Vocabulary Expansion Engine",
        role: "Domain Subword Extraction",
        implementationDetail: "Learns 4,096 high-frequency code-mixed subword merges from the corpus and expands the model's tokenizer vocabulary.",
        nodeId: "vocab-expansion-node",
      },
      {
        name: "Constituent Mean-Pooling Initializer",
        role: "Embedding Matrix Stabilization",
        implementationDetail: "Initializes weight vectors for newly added tokens by computing the average embedding of their constituent pre-existing subwords to prevent gradient explosion.",
        nodeId: "init-node",
      },
      {
        name: "LoRA Continued Pretraining Harness",
        role: "Parameter-Efficient Adaptation",
        implementationDetail: "Applies low-rank adapters (r=16, alpha=32) to Q, K, V, and O attention matrices, updating new embeddings and adapters while freezing the base backbone.",
        nodeId: "lora-pretrain-node",
      },
    ],
  },
  implementation: [
    {
      decision: "Constituent Mean-Pooling Embedding Initialization over Random Normal",
      rationale: "Initializing newly added vocabulary embeddings with random Gaussian noise causes massive gradient norms (grad_norm > 150) during the first warmup steps, corrupting adjacent pre-trained weights. Initializing each new token as the mean of its constituent subwords places the token in a semantically valid neighborhood from step 0.",
      tradeoff: "Slight initial bias toward compositional meaning rather than idiomatic nuance, but provides 100% training stability.",
      codeSnippet: `def initialize_new_embeddings(model: nn.Module, tokenizer: AutoTokenizer, new_tokens: List[str], old_tokenizer: AutoTokenizer):\n    old_embeddings = model.get_input_embeddings().weight.data\n    for token in new_tokens:\n        # Tokenize new token with old tokenizer to get constituent subwords\n        sub_ids = old_tokenizer.encode(token, add_special_tokens=False)\n        new_id = tokenizer.convert_tokens_to_ids(token)\n        with torch.no_grad():\n            model.get_input_embeddings().weight[new_id] = old_embeddings[sub_ids].mean(dim=0)`,
    },
    {
      decision: "Focused Vocabulary Expansion (+4,096 tokens) vs Massive Over-Expansion (+32k)",
      rationale: "Massive vocabulary additions dilute embedding matrix training signals under limited compute budgets. A targeted addition of 4,096 high-frequency Hinglish subwords captures 86% of all fragmentation instances while requiring minimal parameter updates.",
      tradeoff: "Extreme rare slang remains sub-tokenized, but avoids over-parameterizing the vocabulary table.",
    },
  ],
  evidence: [
    {
      claim: "Standard multilingual tokenizers severely fragment Romanized Hindi words, multiplying token count by more than 2.4x compared to English.",
      metric: "Subword Fertility Rate",
      value: "2.84 tokens / word (Qwen2.5)",
      baseline: "1.24 tokens / word (English corpus)",
      methodology: "Evaluated across 100,000 sentences from colloquial conversational Hindi-English datasets.",
      dataset: "L3Cube Hinglish / Social Media QA Corpus",
    },
    {
      claim: "Targeted vocabulary expansion of 4,096 code-mixed subwords reduces average sequence length by 38.6%.",
      metric: "Sequence Length Reduction",
      value: "38.6% fewer tokens",
      baseline: "Original Qwen2.5 tokenizer",
      methodology: "Tested on 10,000 holdout Hinglish sentences using the expanded BPE tokenizer.",
    },
  ],
  ablations: [
    {
      name: "Tokenizer Subword Fertility on Hinglish",
      configuration: "Llama-3 Tokenizer (128,000 vocab)",
      metric: "Average Tokens per Word / Compression Ratio",
      result: "3.12 tokens/word / 1.84 chars/token",
      interpretation: "Heavy fragmentation into 1-2 character chunks; high sequence inflation.",
    },
    {
      name: "Tokenizer Subword Fertility on Hinglish",
      configuration: "Qwen-2.5 Tokenizer (152,000 vocab)",
      metric: "Average Tokens per Word / Compression Ratio",
      result: "2.84 tokens/word / 2.02 chars/token",
      interpretation: "Slightly better coverage due to broader multilingual base, but still splits common morphological suffixes.",
    },
    {
      name: "Tokenizer Subword Fertility on Hinglish",
      configuration: "Adapted Tokenizer (+4,096 Targeted Hinglish Merges)",
      metric: "Average Tokens per Word / Compression Ratio",
      result: "1.74 tokens/word / 3.32 chars/token",
      interpretation: "Captures frequent root words and suffixes as unified tokens, cutting token count by 38.6%.",
    },
  ],
  challenges: [
    {
      title: "Phonetic Spelling Invariance in Romanized Hindi",
      problem: "Romanized Hindi has no standardized orthography: the word 'kyun' (why) appears as 'kyu', 'kyoon', 'kyn', and 'kyo' across user text.",
      rootCause: "Absence of official phonetic spelling conventions in informal digital messaging.",
      solution: "Implemented a phonetic soundex / Metaphone mapping preprocessor tailored to Indic phonemes that collapses superficial spelling variations before tokenization.",
      status: "in-progress",
    },
    {
      title: "Embedding Space Drift During LoRA Continued Pretraining",
      problem: "Updating the embedding layer alongside low-rank attention adapters caused pre-trained English semantic representations to drift and degrade.",
      rootCause: "Gradients backpropagating into the embedding matrix alter base token positions if learning rates are uniform.",
      solution: "Decoupled learning rates: set embedding matrix learning rate to 5e-5 while adapter learning rate is set to 3e-4, freezing all non-adapter backbone weights.",
      status: "resolved",
    },
  ],
  failedExperiments: [
    {
      hypothesis: "Random normal initialization of new Hinglish embedding vectors with small standard deviation (sigma=0.02) would stably adapt within 1,000 steps.",
      result: "Loss spiked to NaN on step 42; uninitialized embeddings produced severe activation outliers in the first self-attention projection.",
      interpretation: "Transformer residual streams are highly sensitive to out-of-distribution embedding magnitudes; constituent mean-pooling initialization is mandatory.",
    },
    {
      hypothesis: "Transliterating all Romanized Hindi text to Devanagari script before tokenization would eliminate the need for vocabulary expansion.",
      result: "Transliteration errors on English loanwords (e.g. 'flight', 'login') caused severe semantic corruption and grammatical distortion.",
      interpretation: "Code-mixed speech relies intentionally on dual scripts and loanwords; forced transliteration discards essential sociolinguistic context.",
    },
  ],
  limitations: [
    "Evaluations currently focus on token fertility and continued pretraining loss; downstream task benchmarking (GLUE-style Indic benchmarks) is ongoing.",
    "Phonetic soundex normalization can occasionally collapse distinct words with subtle vowel length differences.",
    "Resource constraints restrict continued pretraining to 1.5B–7B parameter models.",
  ],
  experiments: {
    description: "Evaluated subword fragmentation metrics, character compression ratios, and continued pretraining loss curves on code-mixed corpora.",
    metrics: [
      {
        label: "Hinglish Fertility Rate",
        value: "1.74",
        delta: "-38.7% vs Qwen",
        context: "Tokens per word with adapted +4K vocabulary",
      },
      {
        label: "Character Compression",
        value: "3.32",
        delta: "+64% efficiency",
        context: "Characters packed per token",
      },
      {
        label: "Validation Loss Delta",
        value: "-0.42",
        delta: "Cross-entropy",
        context: "After 15,000 step continued pretraining",
      },
      {
        label: "Base Model Backbone",
        value: "Qwen2.5",
        delta: "1.5B Params",
        context: "Target model for adaptation experiments",
      },
    ],
    benchmarkData: [
      { xLabel: "Llama-3", baseline: 3.12, optimized: 3.12, unit: "tok/w" },
      { xLabel: "Gemma-2", baseline: 3.05, optimized: 3.05, unit: "tok/w" },
      { xLabel: "Qwen-2.5", baseline: 2.84, optimized: 2.84, unit: "tok/w" },
      { xLabel: "Adapted (+4K)", baseline: 2.84, optimized: 1.74, unit: "tok/w" },
    ],
  },
  benchmarks: [
    {
      name: "Subword Fertility (Tokens/Word)",
      ours: "1.74 tok/w",
      baseline: "2.84 tok/w (Qwen-2.5 Base)",
      speedup: "38.7% fewer tokens",
      notes: "4,096 domain Hinglish BPE subword merges added.",
    },
    {
      name: "Chars / Token Compression",
      ours: "3.32 chars/tok",
      baseline: "2.02 chars/tok",
      speedup: "+64.4% compression",
      notes: "Reduces KV-cache length and generation latency.",
    },
  ],
  lessonsLearned: [
    "Tokenization is the silent tax on multilingual and code-mixed AI; models do not underperform because they lack reasoning, but because tokenizers fragment their input into unrecognizable character pieces.",
    "Constituent subword mean-pooling is essential for stable embedding expansion; random initialization consistently destabilizes deep transformer stacks.",
    "Code-mixing is a legitimate linguistic system with predictable syntactic patterns, not mere grammatical corruption.",
  ],
  futureImprovements: [
    "Complete downstream benchmark evaluations on Hinglish sentiment analysis, summarization, and machine translation.",
    "Release open-source HinglishTokenizer and adapted model weights on HuggingFace Hub.",
    "Investigate byte-level models (e.g. MambaByte or MegaByte) to evaluate tokenization-free architectures on code-mixed languages.",
  ],
};
