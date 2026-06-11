const API = window.location.origin;

// ─── i18n ────────────────────────────────────────
const LANG_KEY = 'lang';
const LANGUAGES = ['zh-TW', 'zh-CN', 'en'];
const LANG_LABELS = { 'zh-TW': '繁中', 'zh-CN': '简中', 'en': 'EN' };

const LOCALE = {
  'zh-TW': {
    appName: 'WeiGram',
    username: '使用者名稱',
    email: '電子郵件 (隨便填)',
    password: '密碼',
    logIn: '登入',
    signUp: '註冊',
    loggingIn: '登入中...',
    signingUp: '註冊中...',
    noAccount: '還沒有帳號？',
    haveAccount: '已經有帳號？',
    feed: '動態',
    explore: '探索',
    profile: '個人檔案',
    logOut: '登出',
    searchUsers: '搜尋使用者...',
    loading: '載入中...',
    loadingFeed: '載入動態...',
    loadingProfile: '載入個人檔案...',
    newPost: '新貼文',
    noPostsYet: '尚無貼文',
    noPostsHint: '追蹤一些使用者或建立你的第一篇貼文！',
    createPost: '建立貼文',
    addComment: '新增留言...',
    post: '送出',
    likes: '個讚',
    justNow: '剛剛',
    mAgo: '分鐘前',
    hAgo: '小時前',
    dAgo: '天前',
    posts: '貼文',
    followers: '追蹤者',
    following: '追蹤中',
    editProfile: '編輯個人檔案',
    follow: '追蹤',
    followingBtn: '追蹤中',
    createNewPost: '建立新貼文',
    writeCaption: '寫一段說明...',
    cancel: '取消',
    share: '分享',
    uploading: '上傳中...',
    pleaseSelectImage: '請選擇一張圖片',
    uploadFailed: '上傳失敗',
    bio: '自我介紹',
    save: '儲存',
    saving: '儲存中...',
    saveFailed: '儲存失敗',
    deleteThisPost: '確定刪除這篇貼文？',
    error: '錯誤',
    requestFailed: '請求失敗',
    noPosts: '尚無貼文',
    language: '語言',
    messages: '訊息',
    noMessages: '尚無訊息',
    sendMessage: '傳送訊息',
    typeMessage: '輸入訊息...',
    inbox: '收件匣',
  },
  'zh-CN': {
    appName: 'WeiGram',
    username: '用户名',
    email: '电子邮件 (随便填)',
    password: '密码',
    logIn: '登录',
    signUp: '注册',
    loggingIn: '登录中...',
    signingUp: '注册中...',
    noAccount: '还没有账号？',
    haveAccount: '已有账号？',
    feed: '动态',
    explore: '探索',
    profile: '个人档案',
    logOut: '登出',
    searchUsers: '搜索用户...',
    loading: '加载中...',
    loadingFeed: '加载动态...',
    loadingProfile: '加载个人档案...',
    newPost: '新帖子',
    noPostsYet: '暂无帖子',
    noPostsHint: '关注一些用户或创建你的第一篇帖子！',
    createPost: '创建帖子',
    addComment: '添加评论...',
    post: '发送',
    likes: '个赞',
    justNow: '刚刚',
    mAgo: '分钟前',
    hAgo: '小时前',
    dAgo: '天前',
    posts: '帖子',
    followers: '粉丝',
    following: '关注中',
    editProfile: '编辑资料',
    follow: '关注',
    followingBtn: '关注中',
    createNewPost: '创建新帖子',
    writeCaption: '写一段说明...',
    cancel: '取消',
    share: '分享',
    uploading: '上传中...',
    pleaseSelectImage: '请选择一张图片',
    uploadFailed: '上传失败',
    bio: '个人简介',
    save: '保存',
    saving: '保存中...',
    saveFailed: '保存失败',
    deleteThisPost: '确定删除这篇帖子？',
    error: '错误',
    requestFailed: '请求失败',
    noPosts: '暂无帖子',
    language: '语言',
    messages: '消息',
    noMessages: '暂无消息',
    sendMessage: '发送消息',
    typeMessage: '输入消息...',
    inbox: '收件箱',
  },
  'en': {
    appName: 'WeiGram',
    username: 'Username',
    email: 'Email (any text)',
    password: 'Password',
    logIn: 'Log In',
    signUp: 'Sign Up',
    loggingIn: 'Logging in...',
    signingUp: 'Signing up...',
    noAccount: "Don't have an account?",
    haveAccount: 'Have an account?',
    feed: 'Feed',
    explore: 'Explore',
    profile: 'Profile',
    logOut: 'Log out',
    searchUsers: 'Search users...',
    loading: 'Loading...',
    loadingFeed: 'Loading feed...',
    loadingProfile: 'Loading profile...',
    newPost: 'New Post',
    noPostsYet: 'No posts yet',
    noPostsHint: 'Follow some users or create your first post!',
    createPost: 'Create Post',
    addComment: 'Add a comment...',
    post: 'Post',
    likes: 'likes',
    justNow: 'just now',
    mAgo: 'm ago',
    hAgo: 'h ago',
    dAgo: 'd ago',
    posts: 'posts',
    followers: 'followers',
    following: 'following',
    editProfile: 'Edit Profile',
    follow: 'Follow',
    followingBtn: 'Following',
    createNewPost: 'Create new post',
    writeCaption: 'Write a caption...',
    cancel: 'Cancel',
    share: 'Share',
    uploading: 'Uploading...',
    pleaseSelectImage: 'Please select an image',
    uploadFailed: 'Upload failed',
    bio: 'Bio',
    save: 'Save',
    saving: 'Saving...',
    saveFailed: 'Save failed',
    deleteThisPost: 'Delete this post?',
    error: 'Error',
    requestFailed: 'Request failed',
    noPosts: 'No posts yet',
    language: 'Language',
    messages: 'Messages',
    noMessages: 'No messages',
    sendMessage: 'Send Message',
    typeMessage: 'Type a message...',
    inbox: 'Inbox',
  },
};

function getLang() { return localStorage.getItem(LANG_KEY) || 'zh-TW'; }
function setLang(l) { localStorage.setItem(LANG_KEY, l); }

function t(key) {
  const lang = getLang();
  const m = LOCALE[lang];
  return (m && m[key]) || LOCALE['en'][key] || key;
}

// ─── State ──────────────────────────────────────
let currentUser = null;
let currentPage = 'feed';
let feedPosts = [];
let profileUser = null;
let profilePosts = [];
let searchTimeout = null;
let navTargetId = null;


// ─── DOM refs ───────────────────────────────────
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// ─── Auth helpers ───────────────────────────────
function getToken() { return localStorage.getItem('token'); }
function isLoggedIn() { return !!getToken(); }

function apiHeaders() {
  const h = { 'Content-Type': 'application/json' };
  if (isLoggedIn()) h['Authorization'] = `Bearer ${getToken()}`;
  return h;
}

async function api(url, opts = {}) {
  const res = await fetch(url, {
    headers: { ...apiHeaders(), ...opts.headers },
    ...opts,
  });
  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    showPage('login');
    throw new Error(t('error'));
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: t('requestFailed') }));
    throw new Error(err.detail || t('requestFailed'));
  }
  if (opts.raw) return res;
  return res.json();
}

// ─── Navigation ─────────────────────────────────
function showPage(page) {
  const app = $('#app');
  if (page === 'login' || page === 'register') {
    if (page === 'login') renderLogin();
    else renderRegister();
    return;
  }
  renderApp();
  if (page === 'feed') showFeed();
  else if (page === 'profile') showProfile(navTargetId || currentUser.id);
  else if (page === 'explore') showExplore();
  else if (page === 'messages') showMessages();
}

function navigateTo(page, targetId) {
  $$('.modal-overlay').forEach(o => o.remove());
  navTargetId = targetId || null;
  currentPage = page;
  window.location.hash = page;
  showPage(page);
}

// ─── Router ─────────────────────────────────────
function handleRoute() {
  const hash = window.location.hash.slice(1) || 'feed';
  if (!isLoggedIn()) {
    if (hash === 'register') { renderRegister(); return; }
    renderLogin();
    return;
  }
  if (hash === 'login' || hash === 'register') { renderFeed(); return; }
  if (currentPage === hash) return;
  currentPage = hash;
  showPage(hash);
}

window.addEventListener('hashchange', handleRoute);

// ─── Init ───────────────────────────────────────
async function init() {
  if (getToken()) {
    try {
      const user = await api('/api/users/me');
      currentUser = user;
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.id);
      currentPage = window.location.hash.slice(1) || 'feed';
      showPage(currentPage);
    } catch {
      localStorage.removeItem('token');
      renderLogin();
    }
  } else {
    const hash = window.location.hash.slice(1);
    if (hash === 'register') { renderRegister(); return; }
    renderLogin();
  }
}

// ─── Lang selector ──────────────────────────────
function renderLangSelector(container) {
  const current = getLang();
  container.innerHTML = `
    <div style="display:flex;gap:4px;justify-content:center;margin-top:16px;font-size:12px">
      ${LANGUAGES.map(l => `
        <span style="cursor:pointer;padding:2px 6px;border-radius:4px;${l === current ? 'background:#333;color:#fff;font-weight:600' : 'color:#8e8e8e'}" onclick="switchLang('${l}')">${LANG_LABELS[l]}</span>
      `).join('')}
    </div>
  `;
}

function switchLang(l) {
  setLang(l);
  showPage(currentPage);
}

// ─── Render: Login ──────────────────────────────
function renderLogin() {
  const lang = getLang();
  $('#app').innerHTML = `
    <div class="auth-container">
      <div class="auth-box">
        <h1>${t('appName')}</h1>
        <form id="login-form">
          <input type="text" id="login-username" placeholder="${t('username')}" required>
          <input type="password" id="login-password" placeholder="${t('password')}" required>
          <button type="submit">${t('logIn')}</button>
          <div class="error" id="login-error"></div>
        </form>
        <p>${t('noAccount')} <a href="javascript:void(0)" onclick="navigateTo('register')">${t('signUp')}</a></p>
        <div id="lang-selector"></div>
      </div>
    </div>
  `;
  renderLangSelector(document.getElementById('lang-selector'));

  $('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true; btn.textContent = t('loggingIn');
    try {
      const data = await api('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          username: $('#login-username').value,
          password: $('#login-password').value,
        }),
      });
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('userId', data.user_id);
      currentUser = await api('/api/users/me');
      navigateTo('feed');
    } catch (err) {
      $('#login-error').textContent = err.message;
    } finally {
      btn.disabled = false; btn.textContent = t('logIn');
    }
  });
}

function renderRegister() {
  $('#app').innerHTML = `
    <div class="auth-container">
      <div class="auth-box">
        <h1>${t('appName')}</h1>
        <form id="register-form">
          <input type="text" id="reg-username" placeholder="${t('username')}" required>
          <input type="text" id="reg-email" placeholder="${t('email')}" required>
          <input type="password" id="reg-password" placeholder="${t('password')}" required>
          <button type="submit">${t('signUp')}</button>
          <div class="error" id="reg-error"></div>
        </form>
        <p>${t('haveAccount')} <a href="javascript:void(0)" onclick="navigateTo('login')">${t('logIn')}</a></p>
        <div id="lang-selector"></div>
      </div>
    </div>
  `;
  renderLangSelector(document.getElementById('lang-selector'));

  $('#register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true; btn.textContent = t('signingUp');
    try {
      const data = await api('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username: $('#reg-username').value,
          email: $('#reg-email').value,
          password: $('#reg-password').value,
        }),
      });
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('userId', data.user_id);
      currentUser = await api('/api/users/me');
      navigateTo('feed');
    } catch (err) {
      $('#reg-error').textContent = err.message;
    } finally {
      btn.disabled = false; btn.textContent = t('signUp');
    }
  });
}

// ─── Render: App Shell ──────────────────────────
function renderApp() {
  const username = localStorage.getItem('username') || '';
  const initial = username.charAt(0).toUpperCase();
  const navAvatar = currentUser && currentUser.avatar
    ? `<img src="${currentUser.avatar}" alt="" style="width:28px;height:28px;border-radius:50%;object-fit:cover">`
    : `<div class="initial-avatar">${initial}</div>`;

  $('#app').innerHTML = `
    <div class="top-nav">
      <div class="top-nav-inner">
        <h1 onclick="navigateTo('feed')">${t('appName')}</h1>
        <div class="nav-search">
          <div style="position:relative">
            <input type="text" id="search-input" placeholder="${t('searchUsers')}">
            <div class="search-results" id="search-results"></div>
          </div>
          <div class="nav-user" onclick="navigateTo('profile')">
            ${navAvatar}
            <span>${username}</span>
          </div>
          <span id="nav-lang-switch" style="cursor:pointer;font-size:12px;color:#8e8e8e;padding:4px 6px;border:1px solid #333;border-radius:4px" onclick="switchLang(getLang() === 'zh-TW' ? 'zh-CN' : getLang() === 'zh-CN' ? 'en' : 'zh-TW')">${LANG_LABELS[getLang()]}</span>
          <button class="logout-btn" onclick="logout()">${t('logOut')}</button>
        </div>
      </div>
    </div>
    <div class="app-container">
      <div class="sidebar">
        <ul>
          <li class="active" id="nav-feed" onclick="navigateTo('feed')">
            <span class="icon">🏠</span> ${t('feed')}
          </li>
          <li id="nav-explore" onclick="navigateTo('explore')">
            <span class="icon">🔍</span> ${t('explore')}
          </li>
          <li id="nav-profile" onclick="navigateTo('profile')">
            <span class="icon">👤</span> ${t('profile')}
          </li>
          <li id="nav-messages" onclick="navigateTo('messages')">
            <span class="icon">✉️</span> ${t('messages')}
          </li>
          <li style="margin-top:20px;color:#555;font-size:12px;cursor:default;padding:12px 16px">
            ${LANGUAGES.map(l => `<span style="cursor:pointer;margin-right:8px;${l === getLang() ? 'color:#0095f6;font-weight:600' : 'color:#555'}" onclick="switchLang('${l}')">${LANG_LABELS[l]}</span>`).join('')}
          </li>
          <li style="color:#555;font-size:12px;cursor:default;padding:0 16px">
            &copy; 2026 WeiGram
          </li>
        </ul>
      </div>
      <div class="main-content" id="main-content">
        <div class="loading">${t('loading')}</div>
      </div>
    </div>
  `;

  // Search
  const searchInput = $('#search-input');
  const searchResults = $('#search-results');
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const q = searchInput.value.trim();
    if (!q) { searchResults.classList.remove('show'); return; }
    searchTimeout = setTimeout(async () => {
      try {
        const users = await api(`/api/users/search/${encodeURIComponent(q)}`);
        searchResults.innerHTML = users.map(u => {
          const searchAvatar = u.avatar
            ? `<img src="${u.avatar}" alt="" style="width:36px;height:36px;border-radius:50%;object-fit:cover;background:#333">`
            : `<div class="initial-avatar-sm">${u.username.charAt(0).toUpperCase()}</div>`;
          return `
          <div class="search-item" onclick="navigateTo('profile', ${u.id})">
            ${searchAvatar}
            <div>
              <div style="font-weight:600;font-size:14px">${u.username}</div>
              <div style="font-size:12px;color:#666">${u.email}</div>
            </div>
          </div>`;
        }).join('');
        searchResults.classList.add('show');
      } catch { searchResults.classList.remove('show'); }
    }, 300);
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-search')) searchResults.classList.remove('show');
  });
}

// ─── Feed ────────────────────────────────────────
async function showFeed() {
  setActiveNav('nav-feed');
  const mc = $('#main-content');
  mc.innerHTML = `<div class="loading">${t('loadingFeed')}</div>`;
  try {
    const posts = await api('/api/posts');
    feedPosts = posts;
    renderFeedPosts(mc, posts);
  } catch (err) {
    mc.innerHTML = `<div style="text-align:center;padding:40px;color:#8e8e8e">${err.message}</div>`;
  }
}

function renderFeedPosts(container, posts) {
  if (!posts.length) {
    container.innerHTML = `
      <div class="story-bar">
        <div class="story-item" onclick="showCreatePostModal()">
          <div class="story-circle"><div class="story-inner"><span class="add-icon">+</span></div></div>
          <span>${t('newPost')}</span>
        </div>
      </div>
      <div style="text-align:center;padding:60px 20px;color:#8e8e8e">
        <p style="font-size:18px;margin-bottom:8px">${t('noPostsYet')}</p>
        <p>${t('noPostsHint')}</p>
        <button onclick="showCreatePostModal()" style="margin-top:16px;background:#0095f6;color:#fff;border:none;border-radius:8px;padding:10px 24px;font-size:14px;font-weight:600;cursor:pointer">${t('createPost')}</button>
      </div>
    `;
    return;
  }

  let html = `
    <div class="story-bar">
      <div class="story-item" onclick="showCreatePostModal()">
        <div class="story-circle"><div class="story-inner"><span class="add-icon">+</span></div></div>
        <span>${t('newPost')}</span>
      </div>
    </div>
  `;
  html += posts.map(post => renderPost(post)).join('');
  container.innerHTML = html;

  // Attach comment form handlers
  posts.forEach(post => {
    const form = document.getElementById(`comment-form-${post.id}`);
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const text = input.value.trim();
        if (!text) return;
        const btn = form.querySelector('button');
        btn.disabled = true;
        try {
          await api(`/api/posts/${post.id}/comments`, {
            method: 'POST',
            body: JSON.stringify({ text }),
          });
          input.value = '';
          const commentsDiv = document.getElementById(`comments-${post.id}`);
          const allComments = await api(`/api/posts/${post.id}/comments`);
          commentsDiv.innerHTML = allComments.map(c => `
            <div class="comment">
              <span class="username" onclick="navigateTo('profile', ${c.user_id})">${c.username}</span>
              ${c.text}
            </div>
          `).join('');
          const countEl = document.getElementById(`comments-count-${post.id}`);
          if (countEl) countEl.textContent = allComments.length;
          if (allComments.length > 2) {
            commentsDiv.innerHTML = allComments.slice(-2).map(c => `
              <div class="comment">
                <span class="username" onclick="navigateTo('profile', ${c.user_id})">${c.username}</span>
                ${c.text}
              </div>
            `).join('');
          }
        } catch (err) { alert(err.message); }
        finally { btn.disabled = false; }
      });
    }
  });
}

function renderPost(post) {
  const timeAgo = getTimeAgo(post.created_at);
  const initial = post.username.charAt(0).toUpperCase();
  const avatarHtml = post.avatar
    ? `<img src="${post.avatar}" alt="" onclick="navigateTo('profile', ${post.user_id})">`
    : `<div class="initial-avatar" onclick="navigateTo('profile', ${post.user_id})">${initial}</div>`;

  const isMine = currentUser && currentUser.id === post.user_id;
  const likedClass = post.is_liked ? 'liked' : '';

  return `
    <div class="post" id="post-${post.id}">
      <div class="post-header">
        ${avatarHtml}
        <span class="username" onclick="navigateTo('profile', ${post.user_id})">${post.username}</span>
        ${isMine ? `<button class="delete-btn" onclick="deletePost(${post.id})">🗑️</button>` : ''}
      </div>
      <img class="post-image" src="${post.image_url}" alt="Post image" loading="lazy">
      <div class="post-actions">
        <button class="${likedClass}" onclick="toggleLike(${post.id}, this)">
          ${post.is_liked ? '❤️' : '🤍'}
        </button>
        <button onclick="document.getElementById('comment-input-${post.id}').focus()">💬</button>
        <span class="like-count" id="likes-count-${post.id}">${post.likes_count} ${t('likes')}</span>
        <span class="spacer"></span>
      </div>
      ${post.caption ? `
        <div class="post-caption">
          <span class="username" onclick="navigateTo('profile', ${post.user_id})">${post.username}</span>
          ${post.caption}
        </div>
      ` : ''}
      <div class="post-comments" id="comments-${post.id}"></div>
      <div class="post-time">${timeAgo}</div>
      <form class="comment-form" id="comment-form-${post.id}">
        <input type="text" id="comment-input-${post.id}" placeholder="${t('addComment')}">
        <button type="submit" disabled>${t('post')}</button>
      </form>
    </div>
  `;
}

// ─── Explore ─────────────────────────────────────
async function showExplore() {
  setActiveNav('nav-explore');
  const mc = $('#main-content');
  mc.innerHTML = `<div class="loading">${t('loading')}</div>`;
  try {
    const posts = await api('/api/feed');
    mc.innerHTML = `
      <h2 style="margin-bottom:16px;font-size:18px">${t('explore')}</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">
        ${posts.map(p => `
          <img src="${p.image_url}" style="width:100%;aspect-ratio:1;object-fit:cover;cursor:pointer;background:#262626"
               onclick="showPostDetail(${p.id})" loading="lazy">
        `).join('')}
        ${!posts.length ? `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#8e8e8e">${t('noPosts')}</div>` : ''}
      </div>
    `;
  } catch (err) {
    mc.innerHTML = `<div style="text-align:center;padding:40px;color:#8e8e8e">${err.message}</div>`;
  }
}

// ─── Messages ─────────────────────────────────────
let activeConversationId = null;

async function showMessages() {
  setActiveNav('nav-messages');
  const mc = $('#main-content');
  mc.innerHTML = `<div class="loading">${t('loading')}</div>`;
  try {
    const convos = await api('/api/conversations');
    renderInbox(mc, convos);
  } catch (err) {
    mc.innerHTML = `<div style="text-align:center;padding:40px;color:#8e8e8e">${err.message}</div>`;
  }
}

function renderInbox(container, convos) {
  container.innerHTML = `
    <h2 style="margin-bottom:16px;font-size:18px">${t('inbox')}</h2>
    <div id="inbox-list">
      ${convos.length ? convos.map(c => {
        const convAvatar = c.avatar
          ? `<img src="${c.avatar}" alt="" class="conv-avatar-img">`
          : `<div class="conv-avatar">${c.username.charAt(0).toUpperCase()}</div>`;
        return `
        <div class="conv-item" onclick="openConversation(${c.user_id})">
          ${convAvatar}
          <div class="conv-info">
            <div class="conv-name">${c.username}${c.unread_count ? ` <span class="unread-badge">${c.unread_count}</span>` : ''}</div>
            <div class="conv-preview">${c.last_message}</div>
            <div class="conv-time">${getTimeAgo(c.last_message_at)}</div>
          </div>
        </div>`;
      }).join('') : `<div style="text-align:center;padding:40px;color:#8e8e8e">${t('noMessages')}</div>`}
    </div>
  `;
}

async function openConversation(userId) {
  activeConversationId = userId;
  const mc = $('#main-content');
  mc.innerHTML = `<div class="loading">${t('loading')}</div>`;
  try {
    const msgs = await api(`/api/messages/${userId}`);
    const user = await api(`/api/users/${userId}`);
    renderConversation(mc, user, msgs);
  } catch (err) {
    mc.innerHTML = `<div style="text-align:center;padding:40px;color:#8e8e8e">${err.message}</div>`;
  }
}

function renderConversation(container, user, msgs) {
  container.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;cursor:pointer" onclick="navigateTo('profile', ${user.id})">
      <button style="background:none;border:none;color:#8e8e8e;font-size:18px;cursor:pointer;padding:4px" onclick="event.stopPropagation();showMessages()">←</button>
      ${user.avatar
        ? `<img src="${user.avatar}" alt="" style="width:36px;height:36px;border-radius:50%;object-fit:cover">`
        : `<div class="conv-avatar" style="width:36px;height:36px;font-size:14px">${user.username.charAt(0).toUpperCase()}</div>`}
      <span style="font-weight:600;font-size:16px">${user.username}</span>
    </div>
    <div id="msg-list" style="flex:1;overflow-y:auto;padding:12px 0;display:flex;flex-direction:column;gap:8px;min-height:300px;max-height:calc(100vh - 280px)">
      ${msgs.map(m => `
        <div class="msg ${m.sender_id === currentUser.id ? 'msg-out' : 'msg-in'}">
          <div class="msg-text">${m.text}</div>
          <div class="msg-time">${getTimeAgo(m.created_at)}</div>
        </div>
      `).join('')}
    </div>
    <form id="msg-form" style="display:flex;gap:8px;border-top:1px solid #333;padding:12px 0">
      <input type="text" id="msg-input" placeholder="${t('typeMessage')}" style="flex:1;padding:10px 14px;border:1px solid #333;border-radius:20px;background:#262626;color:#f5f5f5;outline:none;font-size:14px">
      <button type="submit" style="background:#0095f6;color:#fff;border:none;border-radius:20px;padding:10px 20px;font-size:14px;font-weight:600;cursor:pointer">${t('sendMessage')}</button>
    </form>
  `;

  document.getElementById('msg-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('msg-input');
    const text = input.value.trim();
    if (!text) return;
    try {
      await api('/api/messages', {
        method: 'POST',
        body: JSON.stringify({ receiver_id: activeConversationId, text }),
      });
      input.value = '';
      openConversation(activeConversationId);
    } catch (err) { alert(err.message); }
  });

  const msgList = document.getElementById('msg-list');
  msgList.scrollTop = msgList.scrollHeight;
}

// ─── Profile ─────────────────────────────────────
async function showProfile(userId) {
  setActiveNav('nav-profile');
  const mc = $('#main-content');
  mc.innerHTML = `<div class="loading">${t('loadingProfile')}</div>`;
  try {
    const user = await api(`/api/users/${userId}`);
    const posts = await api(`/api/users/${userId}/posts`);
    profileUser = user;
    profilePosts = posts;
    renderProfile(mc, user, posts);
  } catch (err) {
    mc.innerHTML = `<div style="text-align:center;padding:40px;color:#8e8e8e">${err.message}</div>`;
  }
}

function renderProfile(container, user, posts) {
  const initial = user.username.charAt(0).toUpperCase();
  const avatarHtml = user.avatar
    ? `<img src="${user.avatar}" alt="" class="profile-avatar">`
    : `<div class="initial-avatar-lg">${initial}</div>`;

  const isMe = currentUser && currentUser.id === user.id;
  const followBtnClass = user.is_followed ? 'following' : '';
  const followBtnText = user.is_followed ? t('followingBtn') : t('follow');

  container.innerHTML = `
    <div class="profile">
      <div class="profile-header">
        ${avatarHtml}
        <div class="profile-info">
          <h2>${user.username}</h2>
          <div class="profile-stats">
            <span>${user.posts_count} <span style="font-weight:400">${t('posts')}</span></span>
            <span>${user.followers_count} <span style="font-weight:400">${t('followers')}</span></span>
            <span>${user.following_count} <span style="font-weight:400">${t('following')}</span></span>
          </div>
          <div class="profile-bio">${user.bio || ''}</div>
          <div class="profile-actions">
            ${isMe ? `
              <button class="edit-btn" onclick="showEditProfileModal()">${t('editProfile')}</button>
              <button onclick="showCreatePostModal()">${t('newPost')}</button>
            ` : `
              <button id="follow-btn" class="${followBtnClass}" onclick="toggleFollow(${user.id})">${followBtnText}</button>
              <button onclick="navigateTo('messages');openConversation(${user.id})">${t('sendMessage')}</button>
            `}
          </div>
        </div>
      </div>
    </div>
    <div class="profile-posts">
      ${posts.map(p => `
        <img src="${p.image_url}" loading="lazy" onclick="showPostDetail(${p.id})">
      `).join('')}
      ${!posts.length ? `<div class="empty-posts">${t('noPosts')}</div>` : ''}
    </div>
  `;
}

// ─── Post Detail Modal ──────────────────────────
async function showPostDetail(postId) {
  try {
    const comments = await api(`/api/posts/${postId}/comments`);
    const allPosts = [...feedPosts, ...profilePosts];
    let post = allPosts.find(p => p.id === postId);
    if (!post) {
      const feed = await api('/api/feed');
      post = feed.find(p => p.id === postId);
    }
    if (!post) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const initial = post.username.charAt(0).toUpperCase();
    const likedClass = post.is_liked ? 'liked' : '';
    const isMine = currentUser && currentUser.id === post.user_id;

    overlay.innerHTML = `
      <div class="modal" style="max-width:600px">
        <div class="post" style="border:none;margin-bottom:0">
          <div class="post-header">
            ${post.avatar ? `<img src="${post.avatar}" alt="">` : `<div class="initial-avatar">${initial}</div>`}
            <span class="username" onclick="navigateTo('profile', ${post.user_id})">${post.username}</span>
            ${isMine ? `<button class="delete-btn" onclick="deletePost(${post.id})">🗑️</button>` : ''}
            <button style="background:none;border:none;font-size:20px;cursor:pointer" onclick="this.closest('.modal-overlay').remove()">✕</button>
          </div>
          <img class="post-image" src="${post.image_url}" alt="">
          <div class="post-actions">
            <button class="${likedClass}" onclick="toggleLike(${post.id}, this)">${post.is_liked ? '❤️' : '🤍'}</button>
            <span class="like-count" id="detail-likes-${post.id}">${post.likes_count} ${t('likes')}</span>
          </div>
          ${post.caption ? `<div class="post-caption"><span class="username">${post.username}</span> ${post.caption}</div>` : ''}
          <div class="post-comments" id="detail-comments-${post.id}">
            ${comments.map(c => `
              <div class="comment">
                <span class="username" onclick="navigateTo('profile', ${c.user_id})">${c.username}</span>
                ${c.text}
              </div>
            `).join('')}
          </div>
          <form class="comment-form" onsubmit="addCommentFromDetail(event, ${post.id})">
            <input type="text" id="detail-comment-input-${post.id}" placeholder="${t('addComment')}">
            <button type="submit">${t('post')}</button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  } catch (err) { alert(err.message); }
}

async function addCommentFromDetail(e, postId) {
  e.preventDefault();
  const input = document.getElementById(`detail-comment-input-${postId}`);
  const text = input.value.trim();
  if (!text) return;
  try {
    await api(`/api/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    input.value = '';
    const comments = await api(`/api/posts/${postId}/comments`);
    const div = document.getElementById(`detail-comments-${postId}`);
    div.innerHTML = comments.map(c => `
      <div class="comment">
        <span class="username" onclick="navigateTo('profile', ${c.user_id})">${c.username}</span>
        ${c.text}
      </div>
    `).join('');
  } catch (err) { alert(err.message); }
}

// ─── Create Post Modal ──────────────────────────
function showCreatePostModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <h2>${t('createNewPost')}</h2>
      <input type="file" id="post-image-input" accept="image/*">
      <img class="preview-img hidden" id="post-preview">
      <textarea id="post-caption" placeholder="${t('writeCaption')}"></textarea>
      <div class="modal-actions">
        <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${t('cancel')}</button>
        <button class="btn-primary" id="post-submit-btn" onclick="submitPost()">${t('share')}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const fileInput = overlay.querySelector('#post-image-input');
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = overlay.querySelector('#post-preview');
        preview.src = e.target.result;
        preview.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }
  });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

async function submitPost() {
  const overlay = document.querySelector('.modal-overlay');
  const fileInput = overlay.querySelector('#post-image-input');
  const caption = overlay.querySelector('#post-caption').value.trim();
  const btn = overlay.querySelector('#post-submit-btn');

  if (!fileInput.files[0]) { alert(t('pleaseSelectImage')); return; }
  btn.disabled = true; btn.textContent = t('uploading');

  try {
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('caption', caption);
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData,
    });
    if (!res.ok) { const err = await res.json(); throw new Error(err.detail || t('uploadFailed')); }
    overlay.remove();
    if (currentPage === 'feed') showFeed();
    else if (currentPage === 'profile') showProfile(currentUser.id);
    else navigateTo('feed');
  } catch (err) { alert(err.message); }
  finally { btn.disabled = false; btn.textContent = t('share'); }
}

// ─── Edit Profile Modal ─────────────────────────
function showEditProfileModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <h2>${t('editProfile')}</h2>
      <input type="file" id="edit-avatar-input" accept="image/*">
      <textarea id="edit-bio" placeholder="${t('bio')}">${currentUser.bio || ''}</textarea>
      <div class="modal-actions">
        <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${t('cancel')}</button>
        <button class="btn-primary" onclick="submitEditProfile(this.closest('.modal-overlay'))">${t('save')}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

async function submitEditProfile(overlay) {
  const fileInput = overlay.querySelector('#edit-avatar-input');
  const bio = overlay.querySelector('#edit-bio').value.trim();
  const btn = overlay.querySelector('.btn-primary');
  btn.disabled = true; btn.textContent = t('saving');

  try {
    const formData = new FormData();
    formData.append('bio', bio);
    if (fileInput.files[0]) formData.append('avatar', fileInput.files[0]);
    const res = await fetch('/api/users/me', {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData,
    });
    if (!res.ok) { const err = await res.json(); throw new Error(err.detail || t('saveFailed')); }
    overlay.remove();
    currentUser = await api('/api/users/me');
    showProfile(currentUser.id);
  } catch (err) { alert(err.message); }
  finally { btn.disabled = false; btn.textContent = t('save'); }
}

// ─── Like / Unlike ──────────────────────────────
async function toggleLike(postId, btn) {
  try {
    const wasLiked = btn.classList.contains('liked');
    if (wasLiked) {
      await api(`/api/posts/${postId}/like`, { method: 'DELETE' });
      btn.classList.remove('liked');
      btn.textContent = '🤍';
    } else {
      await api(`/api/posts/${postId}/like`, { method: 'POST' });
      btn.classList.add('liked');
      btn.textContent = '❤️';
    }
    const countEl = document.getElementById(`likes-count-${postId}`) || document.getElementById(`detail-likes-${postId}`);
    if (countEl) {
      let count = parseInt(countEl.textContent) || 0;
      count = wasLiked ? count - 1 : count + 1;
      countEl.textContent = `${count} ${t('likes')}`;
    }
  } catch (err) { alert(err.message); }
}

// ─── Follow / Unfollow ──────────────────────────
async function toggleFollow(userId) {
  const btn = document.getElementById('follow-btn');
  if (!btn) return;
  try {
    if (btn.classList.contains('following')) {
      await api(`/api/follow/${userId}`, { method: 'DELETE' });
      btn.classList.remove('following');
      btn.textContent = t('follow');
    } else {
      await api(`/api/follow/${userId}`, { method: 'POST' });
      btn.classList.add('following');
      btn.textContent = t('followingBtn');
    }
  } catch (err) { alert(err.message); }
}

// ─── Delete Post ────────────────────────────────
async function deletePost(postId) {
  if (!confirm(t('deleteThisPost'))) return;
  try {
    await api(`/api/posts/${postId}`, { method: 'DELETE' });
    const postEl = document.getElementById(`post-${postId}`);
    if (postEl) postEl.remove();
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(o => o.remove());
    if (currentPage === 'profile') showProfile(currentUser.id);
  } catch (err) { alert(err.message); }
}

// ─── Logout ─────────────────────────────────────
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
  currentUser = null;
  renderLogin();
}

// ─── Utils ─────────────────────────────────────
function setActiveNav(id) {
  $$('.sidebar li').forEach(li => li.classList.remove('active'));
  const el = $(`#${id}`);
  if (el) el.classList.add('active');
}

function getTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return t('justNow');
  if (diff < 3600) return `${Math.floor(diff / 60)}${t('mAgo')}`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}${t('hAgo')}`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}${t('dAgo')}`;
  return date.toLocaleDateString();
}

// ─── Start ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
