---
title: "How does Event Loop works: 宏任務（Macro Task) 和 微任務 (Micro Task)"
lang: "zh-TW"
publish_at: 2024-12-03
category: "frontend"
Author: "@Emily D."
description: "How does Event Loop works: 宏任務（Macro Task) 和 微任務 (Micro Task)"
visibility: true
cover_image_path: "/image/upload/t_samller%20size%201200x800/v1733217347/%E6%88%AA%E5%9C%96_2024-12-03_%E4%B8%8B%E5%8D%885.15.39_rzu9c8.png"
slug: "how-does-event-loop-works"
---

### 什麼是Event Loop?
讓非同步操作在不阻塞主執行緒的情況下執行，同時仍保持 JavaScript 是單執行緒的特性。
想像一個廚房，一名廚師（Call Stack) 一次只能處理一件事，但訂單（Task) 會不斷送進廚房，進入隊列（Task Queue）。有些料理可以馬上完成（同步函式），有些則需要花比較多時間（非同步函式），這時廚師可能會把這些料理送到烤箱或電鍋去處理（Web Apis) ，等到他有空閒時會處理下一張單。


### Event Loop 的組成

- `Call Stack` :  LIFO (Last In First Out) 的堆疊，儲存當前被呼叫執行的同步函式。像是在疊盤子，最晚疊上來的會最先被抽走。
  
- `Task Queue (Callback Queue)` :   任務的序列，存放非同步函式的 callback。FIFO (First In First Out) 設計，先來的會先執行。
  
- `Web Apis`:  由瀏覽器或Runtime（如Node.js) 提供，分為 callback-based 和 promise-based，callback-based 如 setTimeout, DOM操作。promise-based 如 fetch 發送請求。當web api 被呼叫時，實際的執行是在瀏覽器的背景線程中進行的，不會阻塞主執行緒。舉個例子，當 setTimeout被呼叫倒數100毫秒，實際上倒數的任務是 web api 自己的 thread去處理，而不是在 Task Queue處理。這些 web api 的 callback 函式會進到 Task Queue （也稱為宏任務）。
  
- `Micro Task Queue` : 優先於 Task Queue 的任務序列，FIFO (First In First Out) 設計。當 Call Stack 空閒時，會優先檢查這裡有沒有待執行的任務（也稱為微任務）。會進入 Micro Task Queue 的有：Promise 的 callback ( .then, .catch, .finally )、 Async / Await 的 callback 、MutationObserver（會在 DOM 有變化時被呼叫）的callback、queueMicrotask（一個直接將callback 加入 Micro Task Queue 的 API) 的 callback。

簡易圖示：

![https://res.cloudinary.com/dyrubjejf/image/upload/t_samller%20size%201200x800/v1733217347/%E6%88%AA%E5%9C%96_2024-12-03_%E4%B8%8B%E5%8D%885.15.39_rzu9c8.png](https://res.cloudinary.com/dyrubjejf/image/upload/t_samller%20size%201200x800/v1733217347/%E6%88%AA%E5%9C%96_2024-12-03_%E4%B8%8B%E5%8D%885.15.39_rzu9c8.png)

### 宏任務（Macro Tasks）與微任務（Micro Tasks）的區分

JavaScript 的任務分為兩類：

- **宏任務（Macro Tasks）**：包括整個 script 的執行、`setTimeout`, `setInterval` 等。
- **微任務（Micro Tasks）**：包括 `Promise` 的callback（`.then`, `.catch`, `.finally`）、`MutationObserver`、`queueMicrotask` 等。
  
Event Loop 在每個宏任務完成後，會優先處理所有的微任務隊列，確保微任務在下一個宏任務之前全部執行完畢。這樣可以保證更高優先級的任務（微任務）先於普通任務（宏任務）執行。

### 完整流程

1. 執行同步函式，加入 Call Stack。
2. 呼叫非同步函式，相關callback被推入相應的 Queue。
3. 同步函式執行完畢，Event Loop 開始檢查 Micro Task Queue。
4. 執行所有 Micro Task Queue 的任務（微任務）。
5. 從 Task Queue 取下一個任務，加入 Call Stack 執行。
6. 重複步驟 3 - 5。


### 範例


```javascript
console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

Promise.resolve().then(() => {
  console.log('C');
});

console.log('D');

```


**答案** : ADCB

**解釋**：
1. 同步函式 `console.log('A')` 執行。
2. `setTimeout` 被放入 web api 執行，callback `()=>console.log('B')` 進入 Task Queue。
3. `Promise.resolve()` 被調用， `.then()` callback 進入 Micro Task Queue。
4.  同步函式 `console.log('D')` 執行。
5. Call Stack 空閒，先處理 Micro Task 中的微任務。 `console.log('C')` 印出。
6. Call Stack 空閒，Micro Task 沒有任務， 取出宏任務執行， `console.log('B')` 印出。



---


```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
  
  setTimeout(() => {
    console.log('Timeout 2');
  }, 0);
  
  Promise.resolve().then(() => {
    console.log('Promise 2');
  });
});

console.log('End');

```

**答案** : `Start, End, Promise 1, Promise2, Timeout 1, Timeout 2`

**解釋**：
1. 同步函式 `console.log('Start')` 執行。
2. `setTimeout 1` 被放入 web api 執行，callback `()=>console.log('Timeout 1')` 進入 Task Queue。
3. `Promise.resolve()` 被調用， `.then()` callback 進入 Micro Task Queue。
4.  同步函式 `console.log('End')` 執行。
5. Call Stack 空閒，先處理 Micro Task 中的微任務，外層的 Promise.then callback 被執行。 `console.log('Promise 1')` 被印出。
6. 在 .then callback 往下執行時遇到 setTimeout 2，其 callback被放入 Task Queue。
7. 再往下執行遇到內層的Promise.resolve，其 .then() callback 被放入 Mirco Task Queue。
8. Call Stack 空閒，先處理 Micro Task 中的微任務，內層的 Promise.then callback 被執行。 `console.log('Promise 2')` 被印出。
9. Call Stack 空閒，先鑒察 Micro Task ，沒有任務後，處理 Task Queue 的任務， `Timeout 1` 被印出。
10.  Call Stack 空閒，先鑒察 Micro Task ，沒有任務後，處理 Task Queue 的任務， `Timeout 2` 被印出。


---


進階題

```javascript
console.log('X');

async function foo() {
  console.log('Y');
  await bar();
  console.log('Z');
}

async function bar() {
  console.log('W');
}

foo();

Promise.resolve().then(() => {
  console.log('V');
});

console.log('U');

```

**答案** :  `X, Y, W, U, V, Z `

**解釋**：
1. 同步函式 `console.log('X')` 執行。
2. `foo` 被呼叫， `console.log('Y')` 被印出。
3. `bar` 被呼叫，`console.log('W')` 被印出。
4. `bar` 是非同步函式，回傳一個resolved Promise，這使得 `foo` 中在 `await bar()` 後面的程式碼被阻塞，並放進 Micro Task Queue 作為微任務。當 JavaScript 遇到 `await` 時，它會暫停 `async` 函式的執行，等待 `await` 後面的 Promise 被解析（resolved）或被拒絕（rejected），然後再繼續執行剩下的程式。
5. `Promise.resolve().then()` 的 callback 進入 Micro Task Queue。
6. `console.log('U')` 被印出。
7. Call Stack 空閒，首先執行 `Promise.resolve().then()` 的 callback ，`console.log('V')` 被印出。
8. 再來執行 `foo()` 剩餘的程式碼， `console.log('Z')` 被印出。



---


以下推薦參考資料，來自 [Lydia Hallie](https://www.youtube.com/@theavocoder) 的影片，真的非常清楚好懂，基本上多看幾遍就能夠掌握整個Event Loop 的流程。

- [JavaScript Visualized - Event Loop, Web APIs, (Micro)task Queue](https://youtu.be/eiC58R16hb8?si=uSpkxjcqcCVXplij)

同場加映 Promise Execution，一樣解釋非常清楚！
- [JavaScript Visualized - Promise Execution](https://youtu.be/Xs1EMmBLpn4?si=zzp49TvZhDENJW-e)