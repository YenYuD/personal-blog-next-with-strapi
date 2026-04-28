---
title: "什麼是 Harness Engineering？ 以前端開發為例"
lang: "zh-TW"
publish_at: 2026-04-29
category: "AI"
Author: "@Emily D."
description: "什麼是 Harness Engineering？ 以前端開發為例"
visibility: true
cover_image_path: "/image/upload/v1773981938/1764942801000_R0014130_gkamgc.jpg"
slug: "what-is-harness-engineering"
---  

如果你最近在嘗試使用 AI Agent 開發前端功能，可能曾遇過這樣的挫折：模型明明在對話時看起來很聰明，但真的交給它去修 Bug 或寫專案時，它卻開始胡言亂語、幻想出不存在的元件，甚至在任務快完成時突然「罷工」。

很多工程師會直覺認為是「模型不夠強」或是「提示詞（Prompt）沒寫好」。但在 AI 工程界，一個新的共識正在成形：**真正決定系統穩定性的，往往不是模型本身，而是模型外面那套運行的系統——這就是所謂的「Harness Engineering（駕馭工程）」。**

---

## 為什麼需要駕馭工程？

我們常說 AI 模型就像一匹充滿力量的**馬**，而「Harness」在英文原意中指的就是**馬具**（如韁繩、馬鞍）。沒有馬具，你無法引導強大的馬匹朝正確方向前進。

在實際開發中，單靠提示詞工程（Prompt Engineering）或上下文工程（Context Engineering）已經遇到瓶頸，主要體現在三個痛點：

**1. 上下文焦慮（Context Anxiety）** 當對話記錄變長，模型會因為「壓力」而開始遺漏細節，甚至為了盡快結束任務而隨便交差。

**2. 自回歸失效（Autoregressive Drift）** AI 是「逐字接龍」，一旦中間出錯就「覆水難收」，它會順著錯誤一路錯下去。

**3. 自我感覺良好（Overconfident Self-Assessment）** 模型很難客觀評估自己的產出，即便程式碼有明顯 Bug，它也常會自信地宣稱「任務已完成」。

**駕馭工程的目標，就是透過建立一套標準化、可觀測的運行環境，讓模型在多輪對話中穩定地完成任務。**

---

## 具體該怎麼做？

### 一、建立認知框架：`AGENTS.md` 與 `CLAUDE.md`

不要把所有規則塞進幾千字的 Prompt 裡。相反地，幫 AI 準備一份「員工手冊」，也就是現在社群普遍採用的 `AGENTS.md` 或 `CLAUDE.md` 格式。

這兩個檔案長得很像，但分工不同，搞清楚差別能讓你事半功倍：

#### `AGENTS.md`：跨工具的「通用規範書」

`AGENTS.md` 是一個**開放標準**，由 Sourcegraph、OpenAI、Google、Cursor 等公司共同制定，現由 Linux Foundation 旗下的 Agentic AI Foundation 維護。它的核心理念很簡單：**一個檔案，讓所有 AI 工具都看得懂**。

在你的前端專案中，如果同時用了 Claude Code、Cursor、GitHub Copilot，你只需要維護一份 `AGENTS.md`，讓 `CLAUDE.md`、`.cursorrules` 等各工具的設定檔都去「引用」它，就不需要重複維護多份相同的規則。

**前端專案的 `AGENTS.md` 適合放：**

- **專案總覽（一行描述）**：例如 `Next.js 電商平台，搭配 Stripe 金流與 Supabase 後端。`
- **架構路徑**：元件放在哪、API 層在哪、狀態管理用什麼。例如：`元件統一放 /src/components/，狀態管理使用 Zustand`。
- **常用指令（完整字串）**：AI 會原文照用這些指令。例如 `pnpm dev`、`pnpm test`、`pnpm lint:fix`。
- **命名慣例**：`元件用 PascalCase，工具函式用 camelCase`。
- **Agent 行為邊界**：哪些操作需要先詢問，例如 `執行 git push 或安裝套件前必須先確認`。

**不適合放進去的：** 程式碼縮排、引號風格這類格式問題，交給 ESLint/Prettier 處理就好。放進 `AGENTS.md` 只會浪費 context window，讓模型在真正重要的指令上注意力下降。

#### `CLAUDE.md`：Claude 的「私人客製化設定」

`CLAUDE.md` 是專為 Claude Code 設計的設定檔，支援更細緻的階層結構：

- 根目錄的 `CLAUDE.md`：整個專案共用的規則
- 子目錄的 `CLAUDE.md`：針對特定資料夾的規則，例如 `/src/components/CLAUDE.md` 可以專門規範元件的撰寫方式
- `CLAUDE.local.md`：個人設定，加入 `.gitignore`，不提交到版本庫

一個推薦的前端實作方式是：讓 `CLAUDE.md` 保持精簡（**30 行以內為佳**），主要功能是作為「入口點」，指引 AI 去讀取其他更詳細的文件：

```markdown
# CLAUDE.md
請嚴格遵守 ./AGENTS.md 的通用規範。

進行元件開發時，請參閱 @docs/component-patterns.md
進行 API 串接時，請參閱 @docs/api-conventions.md
```

這種「按需載入」的設計，讓 AI 只在需要的時候才讀取相關文件，避免 context window 被塞滿無關資訊。

**口訣：** `AGENTS.md` 放「所有工具都需要知道的事」；`CLAUDE.md` 放「只有 Claude 才需要知道的事」，以及「去哪裡查更多資料的地圖」。

---

### 二、採用 Planner-Generator-Evaluator 工作流

不要讓同一個 AI 同時當設計師、碼農和測試員。成熟的駕馭工程會將角色拆分：

- **規劃者（Planner）**：負責將模糊的需求拆解成細碎的子任務清單（Sprint）。
- **生成者（Generator）**：每次只執行一個小任務，專注產出內容。
- **評估者（Evaluator）**：必須獨立，能主動操作環境，找出生成者的錯誤並提供回饋。

---

### 三、視覺回饋：讓 AI「看到」它寫出來的東西

這是前端工程師最需要掌握的進階技巧，也是駕馭工程中最有力的一塊拼圖。

傳統的 AI 工作流只會「讀」程式碼。但前端開發有一個本質上的挑戰：**程式碼語法完全正確，執行出來卻是錯的。** 這就是所謂的「先知差距」（Oracle Gap）：按鈕重疊了、動畫不自然、手機版版面跑版。這些問題，不跑起來你根本發現不了。

解決方案是「視覺回饋」（Visual Feedback），學術上又稱為「知覺自我反思」（Perceptual Self-Reflection）。簡單說就是：讓 AI 把網頁**跑起來看一眼**，根據看到的畫面來決定如何修正。

#### 實作四步驟

**Step 1：程式碼生成（Generator）** AI 根據需求寫出前端程式碼（HTML/CSS/JS 或 React 元件）。

**Step 2：自動化渲染與截圖（Rendering & Screenshotting）** 系統利用 Playwright 或 Puppeteer 等工具，在沙盒環境中啟動瀏覽器並執行程式碼。這一步的關鍵：**讓評估者具備「動手操作環境」的能力**，自動對執行中的頁面截圖，或錄製動畫影格。

**Step 3：視覺分析（Perceptual Analysis）** 將截圖丟給一個具備視覺能力的語言模型（Vision-Language Model）。評估者會像人類 QA 一樣「看著畫面」分析：佈局是否整齊？配色是否符合設計稿？動畫物理是否自然？

**Step 4：文字化回饋與修正（Textual Feedback & Revision）** 視覺模型將發現的「視覺錯誤」轉化為具體的文字描述，回饋給生成者，形成自動修正循環（R-loop）。

#### 具體範例：自動修正「按鈕重疊」問題

你要求 AI 幫你寫一個響應式導覽列，但它寫出來的 CSS 在手機版會讓 Logo 跟漢堡選單重疊。

**傳統做法的困境：** 跑單元測試或語法檢查（Linting），系統會顯示「通過」，因為 CSS 語法沒有錯誤。

**視覺回饋的解法：**

1. **執行**：AI Agent 啟動 Playwright，模擬 375px 手機尺寸並截圖。
2. **判讀**：視覺評估者看到截圖，識別出兩個元件的座標重疊。
3. **指令**：評估者給出回饋：「在 375px 寬度下，Logo (left: 10px) 與 Menu (left: 15px) 發生重疊，請將 Menu 改為 right: 10px」。
4. **修正**：AI 根據具體的視覺指令修改 CSS，重新截圖，直到評估者滿意為止。

#### 為什麼這很有效？

**突破語法檢查的限制**：它能抓到那些「程式能跑，但結果很醜」的 Bug，是 Linter 永遠做不到的。

**物理規律校正**：在科學或動畫模擬中，模型能透過觀察動畫發現不自然的震動或路徑，比直接閱讀複雜的計算公式更容易發現錯誤。

**獨立審查機制**：將「寫 Code 的人」與「看圖的人」分開（由不同模型或角色扮演），是提升穩定性的關鍵——因為模型通常對自己的產出過於樂觀。

---

### 四、對抗上下文焦慮：重啟 Agent（Context Resets）

前端開發常常是一個漫長的任務，在做大型重構或多頁面開發時，你可能會遇到 AI 突然「變笨」——開始遺漏細節、前後矛盾，甚至任務還沒完成就宣稱做好了。

這就是「上下文焦慮」（Context Anxiety）**：當 context window 逐漸填滿，模型感受到「空間壓力」，表現會明顯下滑。

很多人的直覺解法是「壓縮（Compaction）」——把先前的對話摘要一下。但這只是把對話變短，模型仍在同一個 session 中運行，那種「焦慮感」並不會完全消除。

**更有效的解法：徹底重啟 Agent（Context Resets）**。

#### 如何讓重啟不讓工作斷掉？三個步驟

**Step 1：即時存檔——讓 AI 在工作過程中持續記錄狀態**

在你的 `AGENTS.md` 或任務指令中，要求 AI 在每個里程碑後更新一份狀態檔，例如 `fix_plan.md`：

```markdown
# fix_plan.md（由 AI 維護）
## 目前進度
- [x] 完成導覽列元件重構
- [x] 修正手機版 RWD 問題
- [ ] 進行中：商品列表頁 Skeleton Loading

## 下一步行動
整合 Zustand store，讓 loading 狀態全域共享。

## 已知問題
ProductCard 在 Safari 上有陰影渲染異常，暫時擱置。
```

**Step 2：主動觸發重啟——別等到 AI 變笨才行動**

在 Claude Code 中，善用 `/clear` 指令，在不相關的任務之間主動清空 context。與其等 AI 開始出錯再補救，不如**在每個大任務完成後就重啟**，讓新 session 從乾淨的起點開始。

**Step 3：結構化交接（Structured Handoff）——給新 Agent 一塊「乾淨的白板」**

重啟後，把 `fix_plan.md` 的內容直接貼入新 session 的第一個 prompt，讓新 Agent 快速進入狀況：

```
請閱讀 fix_plan.md，從「下一步行動」繼續執行任務。
```

根據 Anthropic 的實驗，這種重啟機制在 Claude 3.5 Sonnet 等模型上尤其有效，能顯著提升長鏈路開發任務的成功率。

---

### 五、建立自動化回饋機制（R-loop）

這就像 AI 版的 CI/CD。當 Evaluator 發現錯誤時，它不會放棄，而是把錯誤訊息（如截圖描述、編譯錯誤）自動回饋給模型，讓它修正。

這種「生成 → 出錯 → 回饋 → 修正」**的循環，被稱為「文字上的梯度」（Textual Gradient），讓模型能在循環中逐漸逼近正確答案。


## 效果如何？

當你建好這套系統後，效果通常令人驚訝：

- **小模型也能打大仗**：即便是輕量模型，只要加上行為規範（先 `ls` 觀察環境、先 `cat` 讀檔再修改），就能正確完成原本大模型都可能出錯的 Bug 修復任務。
- **成功率大幅提升**：有開發團隊透過改造 Harness，讓 Agent 的任務成功率從 70% 拉升到 **95% 以上**。
- **全自動開發複雜應用**：透過良好的駕馭設計，AI 能在無人干預下連續運行數小時，從零建構出功能完備的應用程式。
