---
title: "What is Harness Engineering? Taking Frontend Development as an Example"
lang: "en-US"
publish_at: 2026-04-29
category: "AI"
Author: "@Emily D."
description: "Defining Harness Engineering and its critical role in building stable AI Agent systems for frontend development."
visibility: true
cover_image_path: "/image/upload/v1773981938/1764942801000_R0014130_gkamgc.jpg"
slug: "what-is-harness-engineering"
---

If you've recently tried using AI Agents to develop frontend features, you might have experienced this frustration: the model seems brilliant during conversation, but when tasked with fixing bugs or writing a real project, it starts hallucinating non-existent components or suddenly "quits" just as the mission is nearly complete.

Many engineers instinctively blame the "weak model" or "poor prompts." However, in the realm of AI engineering, a new consensus is forming: **What truly determines system stability is often not the model itself, but the system running around it—this is known as "Harness Engineering."**

---

## Why Do We Need Harness Engineering?

In English, a "harness" refers to the straps and gear used to control and direct a powerful **horse**. Without a harness, you cannot lead a strong horse in the right direction.

In practical development, Prompt Engineering or Context Engineering alone has hit a bottleneck, primarily manifested in three pain points:

**1. Context Anxiety:** As conversation history grows longer, the model begins to miss details due to "pressure" or rushes to finish the task carelessly.

**2. Autoregressive Drift:** AI works by "token-by-token prediction." Once an error occurs in the middle, it's often irreversible—the model continues to build upon that error.

**3. Overconfident Self-Assessment:** Models find it difficult to objectively evaluate their own output. Even if the code has obvious bugs, they often confidently declare, "Task completed."

**The goal of Harness Engineering is to establish a standardized, observable execution environment that allows the model to complete tasks stably across multiple turns of dialogue.**

---

## How to Implement It?

### 1. Establish a Cognitive Framework: `AGENTS.md` and `CLAUDE.md`

Don't cram all rules into a prompt thousands of words long. Instead, prepare an "employee handbook" for the AI, using the `AGENTS.md` or `CLAUDE.md` formats now widely adopted by the community.

These two files look similar but serve different purposes. Understanding the distinction will make you much more efficient:

#### `AGENTS.md`: Cross-Tool "General Specification"

`AGENTS.md` is an **open standard** co-developed by companies like Sourcegraph, OpenAI, Google, and Cursor, now maintained by the Agentic AI Foundation under the Linux Foundation. Its core concept is simple: **One file that all AI tools can understand.**

In your frontend project, if you use Claude Code, Cursor, and GitHub Copilot simultaneously, you only need to maintain one `AGENTS.md`. You can have `CLAUDE.md`, `.cursorrules`, etc., "reference" it, eliminating the need to maintain duplicate rules.

**What fits in a frontend `AGENTS.md`:**

- **Project Overview (one-liner):** e.g., `Next.js E-commerce platform with Stripe and Supabase.`
- **Architecture Paths:** Where components go, the API layer, and state management. e.g., `Components in /src/components/, state management via Zustand.`
- **Common Commands (full strings):** AI will use these verbatim. e.g., `pnpm dev`, `pnpm test`, `pnpm lint:fix`.
- **Naming Conventions:** `PascalCase for components, camelCase for utils.`
- **Agent Behavior Boundaries:** Which operations require prior confirmation, e.g., `Always ask before running git push or installing packages.`

**What DOESN'T fit:** Formatting issues like indentation or quote styles—leave those to ESLint/Prettier. Putting them in `AGENTS.md` wastes context window and distracts the model from important instructions.

#### `CLAUDE.md`: Claude's "Personal Custom Settings"

`CLAUDE.md` is a configuration file specifically designed for Claude Code, supporting a more granular hierarchy:

- Root `CLAUDE.md`: Rules shared across the entire project.
- Subdirectory `CLAUDE.md`: Rules for specific folders, e.g., `/src/components/CLAUDE.md` for component standards.
- `CLAUDE.local.md`: Personal settings, added to `.gitignore` and not committed.

A recommended frontend approach is to keep `CLAUDE.md` concise (**ideally under 30 lines**), acting primarily as an "entry point" guiding the AI to other detailed documents:

```markdown
# CLAUDE.md
Strictly follow the general specifications in ./AGENTS.md.

For component development, refer to @docs/component-patterns.md
For API integration, refer to @docs/api-conventions.md
```

This "on-demand loading" design keeps the context window from being cluttered with irrelevant information.

**Mnemonic:** `AGENTS.md` is for "what all tools need to know"; `CLAUDE.md` is for "only what Claude needs to know" and a "map for finding more data."

---

### 2. Adopt the Planner-Generator-Evaluator Workflow

Don't let the same AI act as designer, coder, and tester simultaneously. Mature Harness Engineering splits these roles:

- **Planner:** Responsible for breaking vague requirements into a modular checklist of sub-tasks (Sprints).
- **Generator:** Executes one small task at a time, focusing solely on production.
- **Evaluator:** Must be independent, capable of actively interacting with the environment to find errors and provide feedback to the Generator.

---

### 3. Visual Feedback: Letting the AI "See" What It Built

This is a high-level technique essential for frontend engineers and the most powerful piece of the Harness Engineering puzzle.

Traditional AI workflows only "read" code. But frontend development has a fundamental challenge: **Code can be syntactically perfect but visually wrong.** This is the "Oracle Gap": overlapping buttons, unnatural animations, or broken layouts on mobile. You simply can't discover these without running the code.

The solution is "Visual Feedback" (academically known as "Perceptual Self-Reflection"). Simply put: let the AI **run the page and take a look** to decide how to fix it.

#### Implementation in Four Steps

**Step 1: Code Generation (Generator)** AI writes the frontend code (HTML/CSS/JS or React components) based on requirements.

**Step 2: Automated Rendering & Screenshotting** The system uses tools like Playwright or Puppeteer to launch a browser and execute the code in a sandbox. The key here is **giving the Evaluator the ability to "interact with the environment,"** automatically taking screenshots or recording animation frames.

**Step 3: Visual Analysis (Perceptual Analysis)** The screenshots are sent to a Vision-Language Model (VLM). The Evaluator analyzes the visuals like a human QA: Is the layout tidy? Do colors match the design? Is the animation physics natural?

**Step 4: Textual Feedback & Revision** The vision model translates "visual bugs" into specific textual descriptions, feeding them back to the Generator to form an automated correction loop (R-loop).

#### Example: Automatically Fixing "Overlapping Buttons"

You ask AI to write a responsive navigation bar, but the resulting CSS causes the Logo and Burger Menu to overlap on mobile.

**The Traditional Dilemma:** Unit tests or Linting will show "Pass" because the CSS syntax is valid.

**The Visual Feedback Solution:**

1. **Execute:** The AI Agent launches Playwright, simulates a 375px mobile screen, and takes a screenshot.
2. **Interpret:** The Visual Evaluator identifies that the coordinates of two components overlap.
3. **Instruct:** The Evaluator provides feedback: "At 375px width, the Logo (left: 10px) overlaps with the Menu (left: 15px). Reposition the Menu to right: 10px."
4. **Revise:** The AI modifies the CSS based on specific visual instructions and re-screenshots until the Evaluator is satisfied.

#### Why Is This So Effective?

- **Breaks Syntax Check Limits:** It catches "code that runs but looks ugly" bugs—something Linters can't do.
- **Physical Law Correction:** In science or animation simulations, models detect unnatural vibrations or paths more easily by observing animations than by reading complex formulas.
- **Independent Review:** separating the "Coder" from the "Viewer" (using different models or roles) is key to stability, as models are often over-optimistic about their own output.

---

### 4. Combating Context Anxiety: Context Resets

Frontend development is often a long-haul task. During massive refactors or multi-page development, you might find the AI suddenly getting "stupid"—missing details, contradicting itself, or declaring completion prematurely.

This is **"Context Anxiety"**: as the context window fills up, the model feels "spatial pressure," and performance drops significantly.

Many people's instinct is "Compaction"—summarizing previous dialogue. But that only shortens the text; the model is still in the same session, and the "anxiety" doesn't fully disappear.

**A more effective solution: Thorough Agent Context Resets.**

#### How to Reset Without Losing Work? Three Steps

**Step 1: Real-time Saving—Let AI track state during the process**

In your `AGENTS.md` or task instructions, require the AI to update a state file, like `fix_plan.md`, after every milestone:

```markdown
# fix_plan.md (Maintained by AI)
## Progress
- [x] Completed Nav-bar refactor
- [x] Fixed mobile RWD issues
- [ ] In Progress: Product List Skeleton Loading

## Next Steps
Integrate Zustand store to share loading state globally.

## Known Issues
ProductCard shadow rendering is glitchy on Safari; deferred for now.
```

**Step 2: Proactive Resets—Don't wait for the AI to get stupid**

In tools like Claude Code, use the `/clear` command to proactively clear context between unrelated tasks. Instead of waiting for errors to occur, **reset after every major task completion** to give the new session a clean start.

**Step 3: Structured Handoff—Giving the new Agent a "Clean Slate"**

After resetting, paste the contents of `fix_plan.md` into the first prompt of the new session:

```
Read fix_plan.md and continue execution from "Next Steps."
```

According to Anthropic's experiments, this reset mechanism is particularly effective for models like Claude 3.5 Sonnet, significantly improving the success rate of long-chain development tasks.

---

### 5. Establish an Automated Feedback Loop (R-loop)

This is like CI/CD for AI. When the Evaluator finds an error, it doesn't give up; it feeds the error message (screenshot descriptions, compilation errors) back to the model for correction.

This "Generate → Error → Feedback → Revise" cycle is known as a **"Textual Gradient,"** allowing the model to gradually converge on the correct answer within the loop.

---

## How Effective Is It?

Once you build this system, the results are often surprising:

- **Small Models Can Win Big Wars:** Even lightweight models can correctly complete bug-fix tasks that might trip up large models, provided they follow behavioral norms (e.g., `ls` first to observe, `cat` before modifying).
- **Massive Success Rate Boosts:** Some teams have raised Agent task success rates from 70% to **over 95%** by redesigning their Harness.
- **Fully Automated Complex Builds:** With good Harness design, AI can run for hours without intervention, building feature-complete applications from scratch.
