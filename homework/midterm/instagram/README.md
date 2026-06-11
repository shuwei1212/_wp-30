# 期中專題：社群媒體網站 WeiGram

## AI 使用聲明

本作業有使用 AI 輔助開發。

- **使用工具：** GitHub Copilot (opencode/big-pickle 模型)，透過 opencode CLI 以對話方式生成程式碼。
- **使用方式：** 以英文對話描述需求，AI 產生程式碼片段與檔案，經手動檢視、修改後採用。
- **對話記錄：** 保留在本機終端機紀錄中，未使用網站版，故無分享連結。以下為主要對話摘要。

### AI 協助範圍

| 功能 | AI 協助程度 | 說明 |
|------|------------|------|
| 專案初始架構 | 全部由 AI 生成 | FastAPI + SPA 前端骨架 |
| 使用者認證 (註冊/登入) | 全部由 AI 生成 | JWT + bcrypt |
| 貼文功能 (CRUD、圖片上傳) | 全部由 AI 生成 | 含 Feed / Explore |
| 讚與留言 | 全部由 AI 生成 | 切換讚、新增/刪除留言 |
| 追蹤系統 | 全部由 AI 生成 | 互追邏輯 |
| 個人檔案 (含頭像) | 全部由 AI 生成 | 編輯個人資料 |
| 搜尋使用者 | 全部由 AI 生成 | 即時搜尋 |
| 暗色主題 | 全部由 AI 生成 | CSS 暗色主題 |
| 多國語系 (繁中/簡中/EN) | 全部由 AI 生成 | i18n 切換 |
| 直接訊息 | 全部由 AI 生成 | 即時傳送、收件匣 |
| README 文件 | 全部由 AI 生成 | 本文件 |
| Bug 修復 (路由、導航、按鈕衝突) | 由 AI 診斷並修復 | 多次反覆除錯 |
| 頭像同步顯示 | 由 AI 診斷並修復 | 各頁面統一使用頭像圖片 |

### 複製聲明

- **沒有複製同學的程式碼。**
- **沒有直接複製網路上的程式碼。** FastAPI 與 SPA 模式為常見開發方式，但本專案所有程式碼皆由 AI 生成或經由提示逐步產生，未自任何單一網路來源整段貼上。
- **個人貢獻：** 提出需求、審查產出程式碼、決定架構方向、測試與驗證功能、反饋修改意見。

---

## WeiGram 社群媒體網站

一個基於 FastAPI + Vanilla JavaScript SPA 的社群媒體網站。

### 功能

- **使用者認證** — 註冊、登入、登出 (JWT)
- **貼文** — 建立、按讚、留言（含圖片上傳）
- **動態牆 (Feed)** — 顯示追蹤中使用者的貼文
- **探索 (Explore)** — 瀏覽所有公開貼文
- **追蹤系統** — 追蹤／取消追蹤
- **個人檔案** — 自訂頭像、自我介紹、貼文牆
- **搜尋** — 依使用者名稱搜尋
- **直接訊息** — 與任何使用者私訊
- **多國語系** — 繁體中文 / 简体中文 / English
- **暗色主題** — 全站暗色 UI

### 技術棧

| 層級 | 技術 |
|------|------|
| 後端 | Python 3.11, FastAPI, SQLAlchemy, SQLite |
| 前端 | Vanilla JS (SPA, hash routing), HTML5, CSS3 |
| 認證 | JWT (python-jose), bcrypt (passlib) |
| 檔案上傳 | python-multipart，存放於 `uploads/` |

### 專案結構

```
instagram/
├── backend/
│   ├── __init__.py
│   ├── main.py          # FastAPI 路由與進入點
│   ├── models.py        # SQLAlchemy 資料表模型
│   ├── schemas.py       # Pydantic 請求/回應結構
│   ├── auth.py          # JWT 建立與驗證
│   └── database.py      # SQLite 引擎與 session
├── frontend/
│   ├── index.html       # SPA 進入點
│   ├── app.js           # 所有前端邏輯 (路由、渲染、i18n)
│   └── style.css        # 暗色主題樣式
├── uploads/             # 貼文圖片與使用者頭像
├── requirements.txt
└── instagram.db         # SQLite 資料庫（自動建立）
```

### 開始使用

#### 環境需求

- Python 3.11+
- pip

#### 安裝與執行

```bash
# 安裝相依套件
pip install -r requirements.txt

# 啟動伺服器（第一次啟動會自動建立資料表）
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8080
```

開啟瀏覽器前往 **http://127.0.0.1:8080**。

停止伺服器：在終端機按 `Ctrl+C`。

### API 一覽

| Method | Route | 說明 |
|--------|-------|------|
| POST | `/api/register` | 註冊 |
| POST | `/api/login` | 登入，回傳 JWT |
| GET | `/api/users/me` | 取得當前使用者 |
| PUT | `/api/users/me` | 更新個人資料 (bio, avatar) |
| GET | `/api/users/{id}` | 取得使用者資料 |
| GET | `/api/users/search/{q}` | 搜尋使用者 |
| POST | `/api/posts` | 建立貼文 (multipart) |
| GET | `/api/posts` | 取得所有貼文 (Explore) |
| GET | `/api/feed` | 取得追蹤中動態 |
| GET | `/api/users/{id}/posts` | 取得特定使用者貼文 |
| POST | `/api/posts/{id}/like` | 切換讚 |
| POST | `/api/posts/{id}/comments` | 新增留言 |
| GET | `/api/posts/{id}/comments` | 取得留言 |
| DELETE | `/api/posts/{id}/comments/{cid}` | 刪除自己的留言 |
| POST | `/api/follow/{id}` | 切換追蹤 |
| POST | `/api/messages` | 傳送訊息 |
| GET | `/api/conversations` | 取得對話列表 |
| GET | `/api/messages/{user_id}` | 取得與某人的對話 |

除 `/api/register` 與 `/api/login` 外，所有 API 都需要 `Authorization: Bearer <token>` 標頭。
