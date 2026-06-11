# 網頁設計 — 學期作業回顧

**董書瑋** · 國立金門大學 資工系 · 114-2

---

## 這學期做了什麼

從完全沒用過vscode，到生出一個可以註冊、發文、按讚、私訊的社群網站。回頭看這學期的作業，其實每一份都在補足不同的能力。

### 作業一覽

| 作業 | 在學什麼 |
|------|----------|
| 01 HTML 履歷 | 網頁長什麼樣子 |
| 02 HTML 表單 | 使用者怎麼輸入資料 |
| 03 Node.js 入門 | 確定電腦能跑 JavaScript |
| 04 JS 基礎 | 程式語言的基礎邏輯 |
| 05 Blog 系統 | 第一次寫有後台的網站 |
| 06 JS 進階 | 函式還能這樣用 |
| 07 Node.js 進階 | 物件跟非同步的概念 |
| 期中考 WeiGram | 從零做一個完整的社群平台 |

---

## 各作業的實際狀況

### 01 · 個人履歷

**檔案：** `aboutme.html`

第一個作業，就是寫一份自己的履歷網頁。那時候還不太會切版，就是用最簡單的 HTML 標籤加上一些 CSS 把它弄得能看。

學到的事情：
- HTML 的標籤怎麼用
- CSS 可以把東西排整齊
- 原來網頁是用這種方式刻出來的

---

### 02 · 表單

**檔案：** `form.html`

這份是顧客滿意度問卷，把各種表單元素全部塞進去。文字框、下拉選單、單選鈕、複選鈕、顏色選取器、滑桿都用上了。

學到的事情：
- form 跟 input 的各種 type
- required 可以直接擋掉空值
- CSS 可以讓表單好看一點

---

### 03 · Node.js 入門

**檔案：** `hello.js`

一行程式碼：

```javascript
console.log('hello 你好')
```

只是為了確認 Node.js 可以跑。沒什麼特別的，但這是後端的第一步。

---

### 04 · JavaScript 基礎

**檔案：** `score01.js` ~ `score10.js`

10 題 JS 練習，從奇偶數判斷寫到平均分數計算。回頭看這些題目其實很基本，但那時候光是弄懂 for 迴圈怎麼跑就卡了一下。

印象比較深的：
- 物件跟 JSON 的轉換，那時候搞不太清楚兩者差別
- 最後一題的學生平均分數，要把陣列跟物件混著用

```javascript
function getAverage(student) {
    let sum = 0;
    for (let i = 0; i < student.scores.length; i++) {
        sum += student.scores[i];
    }
    return sum / student.scores.length;
}
```

---

### 05 · Blog 社群部落格

**檔案夾：** `blog/` `blog1/` `blog2/` `blog3/`

這是我第一次碰到「後端」。之前的作業都是靜態網頁，從這裡開始真的有伺服器、資料庫、登入系統。

總共迭代了 4 次：
1. **blog1** — 什麼認證都沒有，就是個可以發文的基本 Blog
2. **blog2** — 加了 bcrypt 密碼加密跟 session 登入
3. **blog3** — 改 UI 成暗色主題，類似 Threads 的樣子
4. **blog** — 加上使用者個人檔案頁面

學到最多的東西：
- Express 怎麼接 request 跟 response
- SQLite 不用裝資料庫軟體就能用，對初學者很友善
- 參數化查詢可以防止 SQL 注入
- session 跟 cookie 的概念

```javascript
db.run('INSERT INTO posts (user_id, content) VALUES (?, ?)',
    [req.session.user.id, content], callback);
```

那行 `?` 就是參數化查詢，一開始不懂為什麼不直接串字串，後來才知道是安全問題。

---

### 06 · JavaScript 進階

**檔案：** `score01.js` ~ `score10.js`

這份作業的主題是 Higher-Order Function 跟 Closure。抽象程度比之前的練習高了一層。

比較有感覺的題目：
- **乘法器（Closure）：** 一個函式回傳另一個函式，還記得外面變數的值。第一次看到覺得很神奇。
- **自訂過濾器：** 自己實作 filter 而不是用 Array.filter()，才理解底層怎麼運作。
- **購物車折扣：** callback + reduce 組合技。

```javascript
function multiplier(factor) {
    return n => n * factor;
}
const double = multiplier(2);
console.log(double(10)); // 20
```

那時候花了一些時間才看懂 closure 在幹嘛，後來用 `double` 去呼叫的時候才理解「原來 factor=2 被記住了」。

---

### 07 · Node.js 進階

**檔案：** `score01.js` ~ `score10.js`

這份其實跟 06 內容差不多（03~10 題一模一樣），但多了物件操作跟解構賦值兩題新的。

```javascript
const post = {
    id: 1,
    title: "Hello World",
    content: "Markdown content"
};
console.log(post.title);      // 點符號
console.log(post["title"]);   // 中括號
```

解構賦值那題模擬了 Express 的 `req.body`，那時候才發現原來寫法是這樣來的。

---

### 期中考 · WeiGram 社群平台

**檔案夾：** `instagram/`

這是最認真的一份作業。做了一個類似 Instagram 的網站，有貼文、讚、留言、追蹤、私訊。

用的是 Python 的 FastAPI，不是 Node.js。前端是用純 JavaScript 寫 SPA（單頁應用），沒有框架。

**功能列表：**
- 註冊/登入（JWT 認證，30 天效期）
- 發文（可以傳圖片）
- 按讚 / 取消讚
- 留言 / 刪除留言
- 追蹤 / 取消追蹤
- 個人檔案（頭貼、簡介、貼文牆）
- 搜尋使用者
- 私訊聊天
- 三種語言切換（繁中、簡中、英文）
- 全站暗色主題

**技術上學到最多的：**
- FastAPI 比 Express 還直覺，型別檢查寫下去就會自動驗證
- SQLAlchemy ORM 操作資料庫比直接寫 SQL 方便，但要學的東西也更多
- JWT 不用記 session，前端自己存 token 就好
- 前端 SPA 用 hash routing 可以不用後端配合
- 多國語系（i18n）其實就是一個 object 搞定

**心得：**

這個專案大部分是用 AI 生成的，但也不是丟一句話就全部跑出來。過程中一直在調整 prompt，後來發現用條列式的方式描述需求最有效。而且 AI 給的程式碼還是要看得懂才能 debug，有時候它會寫錯或寫了不必要的東西。

---

## 學期總結

從 `console.log('hello 你好')` 到做出一個完整的社群網站，回頭看這學期其實學了不少。

**困難的地方：**
- 物件跟陣列的參考傳遞搞了一陣子才懂
- 非同步的 callback 跟 setTimeout 的執行順序
- Session 跟 JWT 的差別

**有幫助的習慣：**
- AI 可以幫忙生程式碼，但要自己看得懂才能用
- 寫程式的時候把需求條列出來比較不會亂
- 版本迭代開發，先求有再求好

最後，這份 README 本身就是期末作業。也算是有始有終。

---

*2026 · 金門*
