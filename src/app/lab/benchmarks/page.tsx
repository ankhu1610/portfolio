import React from "react";
import Link from "next/link";
import { getAllProjects } from "@/lib/content-api";
import { ExperimentGraph } from "@/components/project/ExperimentGraph";
import { MetricCard } from "@/components/ui/MetricCard";
import { ArrowLeft, Cpu, HardDrive, Zap, BarChart3, CheckCircle2, Server } from "lucide-react";
import { TypewriterHeading } from "@/components/ui/TypewriterHeading";

export const metadata = {
  title: "Benchmarks",
  description: "Systems Profiling & Benchmark Suite — Throughput, latency, VRAM allocation, and ablation comparisons.",
};

export default function BenchmarksPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-14">
      {/* Back Button */}
      <div className="text-xs font-mono text-text-secondary pb-4 border-b border-border-subtle">
        <Link
          href="/lab"
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to ML Systems Lab Hub</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-emerald-700 dark:text-emerald-400">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>SYSTEMS PROFILING // REPRODUCIBLE BENCHMARKS</span>
        </div>

        <TypewriterHeading
          as="h1"
          className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight"
          segments={[
            { text: "Systems " },
            {
              text: "Benchmark Suite",
              className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300",
            },
          ]}
          speed={32}
        />

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Aggregated performance measurements, inference speedup metrics, memory allocation curves, and ablation comparisons across all active and shipped architectures.
        </p>
      </div>

      {/* Top Level Metric Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Transformer Peak Throughput"
          value="88.4 tok/s"
          delta="+280%"
          context="Static KV-Cache on RTX 4090 @ 512 ctx"
        />
        <MetricCard
          label="RAG Diagnostic F1"
          value="91.8%"
          delta="+27.3% gain"
          context="RAGDoctor fault isolation across 245 cases"
        />
        <MetricCard
          label="LoRA Hot-Swap Latency"
          value="85 ms"
          delta="-97.4%"
          context="ProductStudio AI in-place DMA transfer"
        />
        <MetricCard
          label="Sequential RecSys Recall@10"
          value="34.2%"
          delta="+131% vs MF"
          context="NextSense SASRec self-attention"
        />
      </div>

      {/* Hardware Profile Specs */}
      <div className="p-4 rounded-lg bg-surface border border-border-subtle text-xs font-mono space-y-2">
        <div className="flex items-center gap-2 text-text-primary font-semibold">
          <Server className="w-3.5 h-3.5 text-accent" />
          <span>BENCHMARKING ENVIRONMENT SPECIFICATIONS</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-text-secondary pt-1">
          <div>Primary GPU: NVIDIA RTX 4090 (24GB VRAM, 1008 GB/s)</div>
          <div>Interconnect: PCI-e Gen4 x16 (31.5 GB/s bidirectional)</div>
          <div>Host System: AMD EPYC 7763, 128GB DDR4 RAM, Linux kernel 6.8</div>
        </div>
      </div>

      {/* 1. LLM Systems Benchmarks */}
      <section id="kv-cache" className="space-y-4 pt-2 scroll-mt-24">
        <div className="border-b border-border-subtle pb-2">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-0.5">
            LLM SYSTEMS // AUTOREGRESSIVE GENERATION
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
            LLM From Scratch: Decode Throughput Scaling
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Comparing token generation rate between naive tensor concatenation and pre-allocated static contiguous KV-cache memory pools across sequence lengths [512, 1024, 2048, 4096].
        </p>

        <ExperimentGraph
          title="Autoregressive Decode Throughput (tokens/s)"
          data={[
            { xLabel: "512 tokens", baseline: 24.2, optimized: 88.4, unit: "tok/s", notes: "Low cache pressure; 3.65x speedup" },
            { xLabel: "1024 tokens", baseline: 21.5, optimized: 86.1, unit: "tok/s", notes: "Zero tensor reallocations; 4.00x speedup" },
            { xLabel: "2048 tokens", baseline: 16.8, optimized: 84.6, unit: "tok/s", notes: "Naive dynamic cat suffers memory thrashing; 5.03x speedup" },
            { xLabel: "4096 tokens", baseline: 8.4, optimized: 72.1, unit: "tok/s", notes: "Maintains 72+ tok/s with Grouped-Query Attention; 8.58x speedup" },
          ]}
          baselineLabel="Naive Tensor Concatenation"
          optimizedLabel="Static Pre-Allocated KV-Cache"
        />
      </section>

      {/* 2. RAGDoctor Diagnostic Benchmarks */}
      <section id="rag-retrieval" className="space-y-4 pt-4 scroll-mt-24">
        <div className="border-b border-border-subtle pb-2">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-0.5">
            APPLIED ML SYSTEMS // EVALUATION TELEMETRY
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
            RAGDoctor: Diagnostic Failure Mode Isolation
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Evaluating root-cause diagnostic accuracy (Macro-F1 %) across 245 controlled fault-injected cases as probe pipeline layers are progressively enabled.
        </p>

        <ExperimentGraph
          title="Diagnostic Fault Isolation Accuracy (Macro-F1 %)"
          data={[
            { xLabel: "BM25 Alone", baseline: 50.0, optimized: 68.2, unit: "%", notes: "Catches exact keyword omissions; blind to paraphrases" },
            { xLabel: "FAISS Dense Alone", baseline: 50.0, optimized: 72.4, unit: "%", notes: "Captures semantic proximity; misses out-of-vocabulary acronyms" },
            { xLabel: "BM25 + FAISS + RRF", baseline: 50.0, optimized: 83.5, unit: "%", notes: "Reciprocal Rank Fusion merges signals without score scaling distortion" },
            { xLabel: "+ Cross-Encoder Reranker", baseline: 50.0, optimized: 88.6, unit: "%", notes: "Filters false-positive distractor documents" },
            { xLabel: "Full (+ DeBERTa NLI Verifier)", baseline: 50.0, optimized: 91.8, unit: "%", notes: "Isolates pure generator hallucination from context omission" },
          ]}
          baselineLabel="Random Baseline (50%)"
          optimizedLabel="Cumulative Probe Accuracy"
          unit="%"
        />
      </section>

      {/* 3. ProductStudio LoRA Hot-Swapping Latency */}
      <section id="lora-switching" className="space-y-4 pt-4 scroll-mt-24">
        <div className="border-b border-border-subtle pb-2">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-0.5">
            DIFFUSION INFRASTRUCTURE // INFERENCE ACCELERATION
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
            ProductStudio AI: LoRA Adapter Hot-Swap Latency
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Measuring multi-tenant adapter transition time: comparing cold model loading against page-locked host memory DMA transfer and fused CUDA weight mutation.
        </p>

        <ExperimentGraph
          title="Tenant Adapter Switch Time (Lower is Better)"
          data={[
            { xLabel: "Cold Disk Load", baseline: 3240, optimized: 3240, unit: "ms", notes: "Reloads full UNet from disk; 3.2s stall" },
            { xLabel: "Pageable RAM DMA", baseline: 3240, optimized: 210, unit: "ms", notes: "OS virtual memory intermediate copy" },
            { xLabel: "Pinned Host DMA", baseline: 3240, optimized: 85, unit: "ms", notes: "Direct DMA transfer + in-place delta kernel (97.4% reduction)" },
            { xLabel: "Cached Delta", baseline: 3240, optimized: 42, unit: "ms", notes: "Adapter delta already cached in device register memory" },
          ]}
          baselineLabel="Cold Disk Load Baseline"
          optimizedLabel="Our Streaming Architecture"
          lowerIsBetter={true}
          unit="ms"
        />
      </section>

      {/* 4. NextSense Sequential Recommendation */}
      <section id="recsys-ranking" className="space-y-4 pt-4 scroll-mt-24">
        <div className="border-b border-border-subtle pb-2">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-0.5">
            SEQUENTIAL RECOMMENDATION // TEMPORAL EVALUATION
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
            NextSense: Candidate Generation Recall@10
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Comparing next-item candidate generation accuracy on chronological holdout sessions against non-personalized and static matrix factorization baselines.
        </p>

        <ExperimentGraph
          title="Holdout Next-Item Candidate Recall@10 (%)"
          data={[
            { xLabel: "Global Popularity", baseline: 8.2, optimized: 8.2, unit: "%", notes: "Non-personalized frequency ranking" },
            { xLabel: "BPR Matrix Factorization", baseline: 8.2, optimized: 14.8, unit: "%", notes: "Static latent factors miss session context" },
            { xLabel: "GRU4Rec Sequential", baseline: 8.2, optimized: 28.5, unit: "%", notes: "Recurrent transition modeling (+92.5% over MF)" },
            { xLabel: "SASRec Causal Transformer", baseline: 8.2, optimized: 34.2, unit: "%", notes: "Dynamic self-attention across past clicks (+131% over MF)" },
          ]}
          baselineLabel="Popularity Baseline"
          optimizedLabel="Sequential Model Architecture"
          unit="%"
        />
      </section>

      {/* 5. HinglishLM Tokenization Fertility */}
      <section id="tokenization-fertility" className="space-y-4 pt-4 scroll-mt-24">
        <div className="border-b border-border-subtle pb-2">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-0.5">
            MULTILINGUAL TOKENIZATION // CODE-MIXING RESEARCH
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
            HinglishLM: Subword Tokenizer Fertility Rate
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Measuring tokens per word on Hindi-English code-mixed sentences (Lower is Better). Demonstrating the severe fragmentation tax imposed by standard multilingual tokenizers.
        </p>

        <ExperimentGraph
          title="Subword Fertility Rate on Hinglish (Lower is Better)"
          data={[
            { xLabel: "Llama-3 (128K Vocab)", baseline: 3.12, optimized: 3.12, unit: "tok/w", notes: "Severe fragmentation into 1-2 character byte pieces" },
            { xLabel: "Gemma-2 (256K Vocab)", baseline: 3.05, optimized: 3.05, unit: "tok/w", notes: "Broad multilingual base still fragments code-mixed suffixes" },
            { xLabel: "Qwen-2.5 (152K Vocab)", baseline: 2.84, optimized: 2.84, unit: "tok/w", notes: "2.84 tokens/word (2.4x higher than standard English)" },
            { xLabel: "Adapted Hinglish (+4K BPE)", baseline: 2.84, optimized: 1.74, unit: "tok/w", notes: "Targeted vocabulary expansion cuts token length by 38.7%" },
          ]}
          baselineLabel="Qwen-2.5 Baseline"
          optimizedLabel="Targeted Vocabulary Adaptation"
          lowerIsBetter={true}
          unit="tok/w"
        />
      </section>
    </div>
  );
}
