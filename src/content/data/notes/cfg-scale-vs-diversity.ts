import { Note } from "@/content/schemas/note.schema";

export const cfgScaleNote: Note = {
  title: "CFG Scale vs Sample Diversity: Navigating the Precision-Recall Frontier in Latent Diffusion",
  slug: "cfg-scale-vs-diversity",
  excerpt: "A quantitative analysis of Classifier-Free Guidance extrapolation, mode coverage collapse, and the mechanics of dynamic thresholding.",
  date: "Apr 2026",
  topic: "Diffusion Dynamics & Generation Controllability",
  tags: ["CFG", "Diffusion Models", "Sample Diversity", "CLIP", "Sampling"],
  relatedProjectSlug: "stable-diffusion-from-scratch",
  content: `
Classifier-Free Guidance (CFG) is the standard method for steering diffusion models toward a text conditioning prompt without relying on an external discriminator or classifier network.

### The Formulation

During training, the conditioning vector $c$ is randomly dropped with probability $p_{uncond} \\approx 0.1$, replacing it with an empty null token $\\varnothing$. At inference time, the guided score estimate is:

$$\\tilde{\\epsilon}_\\theta(z_t, c, t) = \\epsilon_\\theta(z_t, \\varnothing, t) + w \\cdot \\big( \\epsilon_\\theta(z_t, c, t) - \\epsilon_\\theta(z_t, \\varnothing, t) \\big)$$

Where $w \\ge 1.0$ is the guidance scale parameter.

### The Tradeoff Dynamics

- **Low Guidance ($w \\in [1.0, 3.0]$)**: High sample diversity, rich textures, and wide exploration of data modes, but lower semantic adherence to complex compositional prompts.
- **Optimal Guidance ($w \\in [5.0, 7.5]$)**: Sharp alignment with text prompts, high perceptual contrast, and high aesthetic scoring.
- **Over-Guidance ($w > 8.0$)**: Mode collapse toward high-density mean representations, color saturation blowups, and extreme high-frequency noise artifacts caused by latent activation values exceeding the normalization bounds of the VAE decoder.
  `,
  keyTakeaways: [
    "CFG is fundamentally an extrapolation technique: it moves probability mass from unconditional regions toward conditioned modes.",
    "Dynamic thresholding clips extreme latent quantiles, allowing high CFG values ($w > 10.0$) without color saturation or boundary artifacts.",
    "Scheduling CFG dynamically across time steps (e.g. high guidance at early $t$, low guidance during fine-detail final $t$) achieves both prompt alignment and fine textural variance.",
  ],
  mathOrCodeFormula: "\\tilde{\\epsilon} = \\epsilon_{uncond} + w \\cdot (\\epsilon_{cond} - \\epsilon_{uncond})",
};
