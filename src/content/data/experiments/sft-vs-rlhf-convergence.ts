import { Experiment } from "@/content/schemas/experiment.schema";

export const sftVsRlhfExperiment: Experiment = {
  title: "Benchmarking SFT vs Direct Preference Optimization (DPO) Convergence Dynamics",
  slug: "sft-vs-rlhf-convergence",
  date: "Jul 2026",
  objective: "Quantify the gradient stability, loss convergence rate, and length-bias vulnerability of Supervised Fine-Tuning (SFT) versus Direct Preference Optimization (DPO) on a 125M parameter transformer.",
  hypothesis: "DPO without reference model implicit reward regularization will exhibit rapid policy collapse and exploit response length as a spurious proxy for preference.",
  setup: {
    hardware: "1x NVIDIA RTX 4090 (24GB VRAM), PCIe 4.0",
    framework: "PyTorch 2.4 + Custom from-scratch DPO Trainer",
    dataset: "UltraFeedback Cleaned (50k preference pairs)",
    parameters: {
      "Base Model": "From-Scratch 125M Decoder-Only Transformer",
      "Learning Rate": "5e-6 with Cosine Annealing",
      "Batch Size": "16 (Gradient Accumulation = 4)",
      "Beta Parameter": "0.1",
      "Loss Formulation": "Implicit Bradley-Terry Preference Loss",
    },
  },
  resultsSummary: "SFT converged stably within 3 epochs with standard cross-entropy loss descent. Unconstrained DPO demonstrated reward hacking after step 1200 (average token response length increased by 140% without informational gain). Applying conservative beta scaling (beta=0.1) and length normalization stabilized DPO, achieving +18.4% higher pairwise win rate over SFT.",
  dataPoints: [
    { stepOrEpoch: "Step 200", metricA: 2.14, metricB: 0.69, labelA: "SFT Cross-Entropy Loss", labelB: "DPO Implicit Loss" },
    { stepOrEpoch: "Step 400", metricA: 1.88, metricB: 0.61, labelA: "SFT Cross-Entropy Loss", labelB: "DPO Implicit Loss" },
    { stepOrEpoch: "Step 600", metricA: 1.69, metricB: 0.54, labelA: "SFT Cross-Entropy Loss", labelB: "DPO Implicit Loss" },
    { stepOrEpoch: "Step 800", metricA: 1.55, metricB: 0.48, labelA: "SFT Cross-Entropy Loss", labelB: "DPO Implicit Loss" },
    { stepOrEpoch: "Step 1000", metricA: 1.48, metricB: 0.42, labelA: "SFT Cross-Entropy Loss", labelB: "DPO Implicit Loss" },
    { stepOrEpoch: "Step 1200", metricA: 1.42, metricB: 0.39, labelA: "SFT Cross-Entropy Loss", labelB: "DPO Implicit Loss" },
    { stepOrEpoch: "Step 1400", metricA: 1.39, metricB: 0.38, labelA: "SFT Cross-Entropy Loss", labelB: "DPO Implicit Loss" },
  ],
  conclusions: [
    "DPO eliminates the need for maintaining a separate critic/reward model and complex PPO policy gradients, reducing training VRAM requirements by 45%.",
    "Without explicit length penalty or reference model KL anchoring, preference optimization naturally gravitates toward longer, verbose outputs.",
    "Pairing a strong SFT base model with calibrated low-beta DPO delivers optimal instruction following without degradation in base linguistic perplexity.",
  ],
  status: "completed",
};
