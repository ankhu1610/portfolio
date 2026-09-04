import { Experiment } from "@/content/schemas/experiment.schema";

export const ragFailureDiagnosisExperiment: Experiment = {
  title: "Ablation and Fault Injection Benchmarking Across 245 RAG Failure Cases",
  slug: "rag-failure-mode-diagnosis",
  date: "Aug 2026",
  objective: "Quantify diagnostic classification accuracy (Macro-F1) when isolating retrieval omission, reranking dropping, and generator hallucinations across controlled perturbed queries.",
  hypothesis: "Multi-stage deterministic probes combining Reciprocal Rank Fusion, Cross-Encoder reranking, and NLI verification will achieve >90% Macro-F1 in fault localization, outperforming monolithic LLM-as-judge baselines.",
  setup: {
    hardware: "NVIDIA RTX 4090 (24GB VRAM) + Dual 16-core AMD EPYC Host",
    framework: "PyTorch 2.4 + FAISS + DeBERTa-v3-large NLI + HuggingFace",
    dataset: "245 Controlled Synthetic RAG Test Cases with Ground-Truth Injected Faults",
    parameters: {
      "Dense Embeddings": "BAAI/bge-large-en-v1.5 (1024-dim)",
      "Sparse Index": "BM25 with k1=1.5, b=0.75",
      "RRF Constant k": "60",
      "Cross-Encoder": "cross-encoder/ms-marco-MiniLM-L-6-v2",
      "NLI Evaluator": "MoritzLaurer/DeBERTa-v3-large-mnli-fever-anli",
    },
  },
  resultsSummary: "The full probe pipeline achieved 91.8% Macro-F1 across all 245 failure scenarios. Pure BM25 alone achieved 68.2% F1, FAISS dense alone achieved 72.4% F1, RRF fusion raised accuracy to 83.5%, and adding the Cross-Encoder and NLI verifier closed the remaining gap by cleanly distinguishing generator fabrication from retrieval omission.",
  dataPoints: [
    { stepOrEpoch: "BM25 Alone", metricA: 68.2, metricB: 71.4, labelA: "Failure Localization F1 (%)", labelB: "Retrieval Recall (%)" },
    { stepOrEpoch: "Dense Alone", metricA: 72.4, metricB: 74.8, labelA: "Failure Localization F1 (%)", labelB: "Retrieval Recall (%)" },
    { stepOrEpoch: "Linear Blend", metricA: 79.1, metricB: 81.2, labelA: "Failure Localization F1 (%)", labelB: "Retrieval Recall (%)" },
    { stepOrEpoch: "RRF Fusion", metricA: 83.5, metricB: 89.4, labelA: "Failure Localization F1 (%)", labelB: "Retrieval Recall (%)" },
    { stepOrEpoch: "+ Cross-Encoder", metricA: 88.6, metricB: 89.4, labelA: "Failure Localization F1 (%)", labelB: "Retrieval Recall (%)" },
    { stepOrEpoch: "Full (+ NLI)", metricA: 91.8, metricB: 89.4, labelA: "Failure Localization F1 (%)", labelB: "Retrieval Recall (%)" },
  ],
  conclusions: [
    "Reciprocal Rank Fusion (RRF) eliminates score distribution calibration issues between sparse BM25 and dense cosine distances.",
    "Cross-Encoder self-attention removes distractor documents that fool dense bi-encoders, elevating context precision to 94.2%.",
    "NLI verification provides atomic claim-level attribution that reliably catches subtle hallucinations where all entities exist but semantic relationships are inverted.",
  ],
  status: "completed",
};
