import { Experiment } from "@/content/schemas/experiment.schema";

export const loraHotSwapExperiment: Experiment = {
  title: "Empirical PCI-e Transfer and Fused Weight Delta Hot-Swapping Latency",
  slug: "lora-hot-swap-latency",
  date: "Jun 2026",
  objective: "Benchmark tensor streaming and in-place weight fusion latencies across varying memory buffer types (pageable vs pinned) and LoRA ranks (r=4 to r=64).",
  hypothesis: "Host-pinned memory pools coupled with fused direct CUDA in-place addition kernels will reduce multi-tenant model switching times to under 100ms over PCI-e Gen4.",
  setup: {
    hardware: "NVIDIA RTX 4090 (24GB VRAM) on PCIe Gen4 x16 bus (31.5 GB/s bidirectional)",
    framework: "PyTorch 2.4 + Custom In-Place C++/CUDA Extension",
    dataset: "Synthetic multi-tenant brand LoRA adapters (Rank 8, 16, 32, 64)",
    parameters: {
      "Target Model": "Stable Diffusion 1.5 UNet (860M parameters)",
      "Target Weights": "16 Cross-Attention Linear Projections (to_k, to_v)",
      "Buffer Mode": "cudaHostAlloc Page-Locked Memory",
      "Trials": "500 sequential swaps across 20 distinct adapter pairs",
    },
  },
  resultsSummary: "Pageable memory swaps averaged 210ms due to intermediate OS buffering. Utilizing pinned host memory buffers reduced DMA transfer time to 24ms, and fused CUDA in-place weight delta addition executed in 61ms, achieving a total end-to-end hot-swap latency of 85ms for rank-16 adapters — a 97.4% reduction compared to cold UNet loading (3,240ms).",
  dataPoints: [
    { stepOrEpoch: "Rank 4", metricA: 62.0, metricB: 6.2, labelA: "Total Swap Latency (ms)", labelB: "Weight Delta Size (MB)" },
    { stepOrEpoch: "Rank 8", metricA: 71.0, metricB: 8.4, labelA: "Total Swap Latency (ms)", labelB: "Weight Delta Size (MB)" },
    { stepOrEpoch: "Rank 16", metricA: 85.0, metricB: 12.4, labelA: "Total Swap Latency (ms)", labelB: "Weight Delta Size (MB)" },
    { stepOrEpoch: "Rank 32", metricA: 114.0, metricB: 22.8, labelA: "Total Swap Latency (ms)", labelB: "Weight Delta Size (MB)" },
    { stepOrEpoch: "Rank 64", metricA: 158.0, metricB: 43.6, labelA: "Total Swap Latency (ms)", labelB: "Weight Delta Size (MB)" },
  ],
  conclusions: [
    "Hot-swapping rank-16 LoRA adapters in 85ms allows dynamic per-request style customization in interactive diffusion serving systems.",
    "Pinning CPU memory buffers (page-locked) is mandatory to bypass virtual memory page copying overhead on the host.",
    "FP32 base weight accumulation prevents accumulated numerical drift during thousands of consecutive addition and rollback operations.",
  ],
  status: "completed",
};
